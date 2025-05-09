from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.http import JsonResponse
from django.conf.urls.static import static
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator


User = get_user_model()

def index(request):
    return render(request, 'index.html')

from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return f"{user.pk}{timestamp}{user.is_email_verified}"  # Removed last_login

email_verification_token = EmailVerificationTokenGenerator()


def send_notification(sender, receiver, content, email=False):
    Notification.objects.create(
        sender=sender,
        user_id_receiver=receiver,
        content=content,
    )
    
def send_verification_email(id, **kwargs):
    user = get_object_or_404(CustomUser, pk=id)
    token = email_verification_token.make_token(user)  # Custom token generator
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verify_url = f"http://127.0.0.1:8000/verify-email/{uid}/{token}"
    send_mail(
        subject="Verify your email",
        message=f"Click here to verify: {verify_url}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def verify_email(request, uid, token):
    try:
        uid_decoded = urlsafe_base64_decode(uid).decode()
        user = CustomUser.objects.get(pk=uid_decoded)
    except Exception:
        return JsonResponse({"error": "Invalid UID"}, status=400)

    # Use the custom token generator for validation
    if email_verification_token.check_token(user, token):
        user.is_email_verified = True
        user.save()
        login(request, user)  # Log the user in after email verification
        log_action(user, "Email verified successfully.")
        return JsonResponse({"message": "Email verified successfully. You can now return to the signup Page"}, status=200)

    return JsonResponse({"error": "Invalid or expired token"}, status=400)


def log_action(user, action):
    Log.objects.create(
        user_id=user,
        action=action
    )


# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all() #Focus on all user objects
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny] #Anyone can acess this signup view

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        log_action(user, "User registered successfully.")
        send_notification(
            sender='System',
            receiver=user,
            content=f"Welcome {user.first_name}, you have successfully registered.",
            email=True
        )
        send_verification_email(id=user.id)
        return Response({
            'token': access_token,
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_201_CREATED)


# User Login
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)
        log_action(user, "User logged in.")


        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'access_token': access_token,
            'refresh_token': str(refresh),
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_200_OK)
    
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        if not pk:
            return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        log_action(request.user, "User details updated.")
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        log_action(request.user, "User deleted.")
        return Response(status=status.HTTP_204_NO_CONTENT)


# Issue Management
class IssueListCreate(generics.ListCreateAPIView): #View to list or create an issue
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self): #Runs if the request method is GET
        return super().get_queryset().filter(created_by=self.request.user)  # Ensure filtering works

def perform_create(self, serializer):
    issue = serializer.save(created_by=self.request.user)
    log_action(self.request.user, f"Issue created.")

        

class IssueList(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  # Runs if the request method is GET
        status = self.kwargs['status']  # Get the status from the URL
        return Issue.objects.filter(status=status)  # Filter issues by status
    
class IssueList2(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  # Runs if the request method is GET
        pk = self.kwargs['pk']  # Get the status from the URL
        return Issue.objects.filter(assigned_to=pk)  # Filter issues by status
    
class IssueList3(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  # Runs if the request method is GET
        pk = self.kwargs['pk']  # Get the assigned_to from the URL
        return Issue.objects.filter(assigned_to=pk, status='Resolved')  # Filter issues by assigned_to and status

# What data exactly is returned, which function does what, notifications on successful action
class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Issue.objects.all()

    def patch(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        action = kwargs.get('action')
        try:
            issue = Issue.objects.get(pk=pk)
        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found.'}, status=status.HTTP_404_NOT_FOUND)

        if action == "assign":
            assigned_to_id = request.data.get('assigned_to')
            try:
                user = User.objects.get(pk=assigned_to_id)
                issue.assigned_to = user
                issue.status = "Seen"
                issue.deadline = request.data.get('deadline', issue.deadline)
                issue.priority = request.data.get('priority', issue.priority)
                issue.save()
                log_action(request.user, f"Issue '{issue.title}' assigned to {user.username}.")


                send_notification(
                    sender='Registrar',
                    receiver=user,
                    content=f"You have been assigned a new issue: {issue.title}",
                    email=True
                )

                serializer = self.get_serializer(issue)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'Assigned user not found.'}, status=status.HTTP_404_NOT_FOUND)

        elif action == "progress":
            issue.progress = request.data.get("progress", issue.progress)
            issue.save()
            log_action(request.user, f"Progress updated on issue '{issue.title}'.")


            # Notify creator (student)
            if issue.created_by:
                send_notification(
                    sender='System',
                    receiver=issue.created_by,
                    content=f"Progress updated on your issue: {issue.title}",
                    email=True
                )

            serializer = self.get_serializer(issue)
            return Response(serializer.data)

        return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            issue = Issue.objects.get(pk=pk)
            issue.delete()
            log_action(request.user, f"Issue '{issue.title}' deleted.")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found.'}, status=status.HTTP_404_NOT_FOUND)

# Notifications
class NotificationsListCreate(generics.ListCreateAPIView):
    serializer_class = NotificationSerializer  # Fixed typo
    permission_classes = [AllowAny]

    def get_queryset(self):
        pk=self.kwargs['pk']
        return Notification.objects.filter(user_id_receiver=pk)

def post(self, request, *args, **kwargs):
    pk = kwargs.get('pk')
    if not pk:
        return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        issue = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response({'error': 'Issue not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    Notification.objects.create(
        sender='Registrar',
        user_id_receiver=user, 
        content=f"You have been assigned a new issue: {issue.title}",
    )
    return Response({'message': 'Notification sent to the lecturer.'}, status=status.HTTP_201_CREATED)

        
class NotificationDestroy(generics.DestroyAPIView):
    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_204_NO_CONTENT)

# Logs
class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerializer
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.state = request.data.get('state', instance.state)
        instance.timestamp = timezone.now()
        instance.action = request.data.get('action', instance.action)
        user = request.data.get('user')
        user_id = user.id
        instance.user_id = request.data.get('action', instance.user_id)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class LogCreate(generics.CreateAPIView):
    serializer_class = LogSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
class EmailView(APIView):
    def send_email(self, subject, message, to):
        send_mail(subject, message, from_email=None, recipient_list=[to], fail_silently=False, auth_user=None, auth_password=None, connection=None, html_message=None)




# django signals
from django.db.models.signals import post_save
from django.dispatch import receiver

'''class Signal:
    @receiver(post_save, sender=Issue)
    def issue_post_save(sender, instance, created, **kwargs):
        if created:
            EmailView.send_email('New Issue', 'A new issue has been created', User'''


class LecturerList(generics.ListAPIView):
    serializer_class = LecturerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  
        return User.objects.filter(role='lecturer')
    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Issue)
def notify_on_issue_change(sender, instance, created, **kwargs):
    if created:
        # Notify all registrars
        registrars = User.objects.filter(role='registrar')
        for registrar in registrars:
            send_notification(
                sender='System',
                receiver=registrar,
                content=f"New issue submitted: {instance.title}",
                email=True
            )
    else:
        if instance.status == "Resolved" and instance.created_by:
            send_notification(
                sender='System',
                receiver=instance.created_by,
                content=f"Your issue '{instance.title}' has been marked as resolved.",
                email=True
            )

        if instance.status == "Seen" and instance.assigned_to:
            send_notification(
                sender='System',
                receiver=instance.assigned_to,
                content=f"You've been assigned the issue: {instance.title}",
                email=True
            )
