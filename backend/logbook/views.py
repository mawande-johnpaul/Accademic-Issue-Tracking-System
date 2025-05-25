from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, login
from django.utils import timezone
from .serializers import *
from .models import *
from rest_framework.parsers import MultiPartParser, FormParser
from PIL import Image
from django.core.files.uploadedfile import UploadedFile
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import get_random_string
from django.http import JsonResponse
import json
from django.core.cache import cache
#use Custom user model
User = get_user_model()

@csrf_exempt
def send_reset_code(request):
    # Sends a 6-digit password reset code to user's email
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
        # Generate and store reset code in cache for 10 minutes
        code = get_random_string(6, allowed_chars="0123456789")
        cache.set(f"reset_code_{email}", code, timeout=600)
        #send code via email
        send_mail(
            "Your Password Reset Code",
            f"Your password reset code is: {code}",
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        return JsonResponse({"message": "Code sent."})
    return JsonResponse({"error": "Invalid request."}, status=400)

@csrf_exempt
def verify_reset_code(request):
     # Verifies the reset code sent to email
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        code = data.get("code")
        cached_code = cache.get(f"reset_code_{email}")
        if cached_code and code == cached_code:
            return JsonResponse({"message": "Code verified."})
        return JsonResponse({"error": "Invalid code."}, status=400)
    return JsonResponse({"error": "Invalid request."}, status=400)

@csrf_exempt
def reset_password(request):
    # Resets the user's password after verifying code
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        code = data.get("code")
        new_password = data.get("new_password")
        cached_code = cache.get(f"reset_code_{email}")
        if not (cached_code and code == cached_code):
            return JsonResponse({"error": "Invalid code."}, status=400)
        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            cache.delete(f"reset_code_{email}")
            return JsonResponse({"message": "Password reset successful."})
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
    return JsonResponse({"error": "Invalid request."}, status=400)

def validate_attachment(file: UploadedFile):
    # Verifies that the uploaded file is a valid image
    try:
        Image.open(file).verify()
    except Exception:
        pass   # Silently ignore invalid files (could log if needed)


def send_notification(sender, receiver, content, email=False):
    # Creates a notification entry in the database
    try:
        Notification.objects.create(
            sender=sender,
            user_id_receiver=receiver,
            content=content,
        )
    except Exception as e:
        log_error(f"Notification error: {str(e)}")

def log_action(user, action):
     # Logs user actions for audit or tracking
    try:
        Log.objects.create(user_id=user, action=action)
    except Exception as e:
        log_error(f"Log action error: {str(e)}")

def log_error(message):
    # Placeholder for actual logging mechanism
    print(f"ERROR: {message}")

class IsRegistrar(permissions.BasePermission):
     # Custom permission for users with the 'registrar' role
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'registrar'

class RegisterView(generics.CreateAPIView):
     # Handles user registration
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
        # Generate JWT tokens and login user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            login(request, user)
            
            # Log and notify user
            log_action(user, "User registered successfully.")
            send_notification(
                sender='System',
                receiver=user,
                content=f"Welcome {user.first_name}, you have successfully registered.",
                email=True
            )
            return Response({
                'token': access_token,
                'user': RegisterSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            log_error(f"Register error: {str(e)}")
            return Response({"error": "internal_server_error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(generics.GenericAPIView):
     # Handles user login
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Authenticate user and return JWT tokens
        try:
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
        except Exception as e:
            log_error(f"Login error: {str(e)}")
            return Response({"error": "internal_server_error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Return list of all users
      
        try:
            return super().get(request, *args, **kwargs)
        except Exception as e:
            log_error(f"User list error: {str(e)}")
            return Response({"error": "internal_server_error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
          #Return details of a specific user by ID 
        try:
            return super().get(request, *args, **kwargs)
        except Exception as e:
            log_error(f"User detail error: {str(e)}")
            return Response({"error": "internal_server_error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Issue Management
class IssueListCreate(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # To handle file uploads

    def get_queryset(self):
        # List issues created by current user
        return super().get_queryset().filter(created_by=self.request.user)

    def perform_create(self, serializer):
         # Validate attachment and create issue
        attachment = self.request.FILES.get('attachments', None)
        
        if attachment:
            try:
                validate_attachment(attachment)
            except ValidationError as e:
                raise ValidationError({'attachments': str(e)})

        issue = serializer.save(created_by=self.request.user, attachment=attachment)
        log_action(self.request.user, f"Issue created with ID {issue.id}.")
        send_notification(
                sender='System',
                receiver=self.request.user,
                content=f"Successfully logged issue. You will be notified when it is resolved.",
                email=True
            )
        return Response({'message': 'Issue created successfully', 'code': 'ISSUE_CREATED'}, status=status.HTTP_201_CREATED)
        

class IssueList(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  # Runs if the request method is GET
        # Filter issues by status and department from URL params
        status = self.kwargs['status']  # Get the status from the URL
        return Issue.objects.filter(status=status, department=self.kwargs['college'])  # Filter issues by status
    
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
class IsStudent(permissions.BasePermission):
    """Custom permission to restrict students from removing or assigning issues."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

class IsLecturer(permissions.BasePermission):
    """Custom permission to grant lecturers specific privileges."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'lecturer'

class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer

    def get_permissions(self):
        # Assign permissions dynamically based on method and user role
        if self.request.method in ['DELETE', 'PATCH']:
            if self.request.user.role == 'student':
                return [permissions.IsAuthenticated(), IsStudent()]
            elif self.request.user.role == 'lecturer':
                return [permissions.IsAuthenticated(), IsLecturer()]
            elif self.request.user.role == 'registrar':
                return [permissions.IsAuthenticated(), IsRegistrar()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        # Use all issues for update/delete actions
        return Issue.objects.all()

    def patch(self, request, *args, **kwargs):
         # Handle issue assignment and progress update actions
        pk = kwargs.get('pk')
        action = kwargs.get('action')
        if not pk or not action:
            return Response({'error': 'Missing required parameters.', 'code': 'MISSING_PARAMETERS'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            issue = Issue.objects.get(pk=pk)
        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found.', 'code': 'ISSUE_NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

        if action == "assign":
             # Registrar assigns issue to user
            if request.user.role != 'registrar':
                return Response({'error': 'Permission denied.', 'code': 'PERMISSION_DENIED'}, status=status.HTTP_403_FORBIDDEN)
            
            assigned_to_id = request.data.get('assigned_to')
            if not assigned_to_id:
                return Response({'error': 'Assigned user ID is required.', 'code': 'MISSING_ASSIGNED_USER'}, status=status.HTTP_400_BAD_REQUEST)

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
                    email=False
                )

                serializer = self.get_serializer(issue)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({'error': 'Assigned user not found.', 'code': 'USER_NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

        elif action == "progress":
            # Update issue progress
            progress = request.data.get("progress")
            if not progress:
                return Response({'error': 'Progress value is required.', 'code': 'MISSING_PROGRESS'}, status=status.HTTP_400_BAD_REQUEST)

            issue.progress = progress
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

        return Response({'error': 'Invalid action.', 'code': 'INVALID_ACTION'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
         # Delete an issue if authorized that is not by  student
        pk = kwargs.get('pk')
        if not pk:
            return Response({'error': 'Missing issue ID.', 'code': 'MISSING_ISSUE_ID'}, status=status.HTTP_400_BAD_REQUEST)

        if request.user.role == 'student':
            return Response({'error': 'Permission denied.', 'code': 'PERMISSION_DENIED'}, status=status.HTTP_403_FORBIDDEN)

        try:
            issue = Issue.objects.get(pk=pk)
            issue.delete()
            log_action(request.user, f"Issue '{issue.title}' deleted.")
            student = User.objects.filter(pk=issue.created_by)
            lecturer = User.objects.filter(pk=issue.assigned_to)
             # Notify involved users about issue closure
            send_notification(
                sender='System',
                receiver=student,
                content=f"Issue with the following title has been closed or rejected; {issue.title}",
                email=True
            )
            send_notification(
                sender='System',
                receiver=lecturer,
                content=f"Issue with the following title has been closed or rejected; {issue.title}",
                email=True
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Issue.DoesNotExist:
            return Response({'error': 'Issue not found.', 'code': 'ISSUE_NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

# Notifications
class NotificationsListCreate(generics.ListCreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # List notifications for a specific user
        pk = self.kwargs['pk']
        if not pk:
            return Notification.objects.none()

        return Notification.objects.filter(user_id_receiver=pk)

    def post(self, request, **kwargs):
         # Create notification from registrar to lecturer about issue progress request
        pk = self.kwargs['pk']
        ipk = self.kwargs['id']
        if not pk and ipk:
            return Response({'error': 'User ID is required.', 'code': 'MISSING_USER_ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(pk=ipk)
            issue = Issue.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found.', 'code': 'USER_NOT_FOUND'}, status=status.HTTP_404_NOT_FOUND)

        Notification.objects.create(
            sender='Registrar',
            user_id_receiver=user, 
            content=f"Registrar requested progess on issue entitled: {issue.title}",
        )
        return Response({'message': 'Notification sent to the lecturer.', 'code': 'NOTIFICATION_SENT'}, status=status.HTTP_201_CREATED)

        
class NotificationDestroy(generics.DestroyAPIView):
    # Delete a notification
    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_204_NO_CONTENT)

# Logs
class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerializer
    permission_classes = [AllowAny]

    def delete(self, request, *args, **kwargs):
         # Delete a log entry
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        # Update log entry fields
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
         # Create new log entry
        return super().perform_create(serializer)
    
class EmailView(APIView):
     # Utility to send emails
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

# Lecturer List filtered by Issue's department
class LecturerList(generics.ListAPIView):
    serializer_class = LecturerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        issue = Issue.objects.get(pk=self.kwargs['id'])
        return User.objects.filter(role='lecturer', department=issue.department)

# Signal handlers for Issue model

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
        # Notify creator when issue is resolved
        if instance.status == "Resolved" and instance.created_by:
            send_notification(
                sender='System',
                receiver=instance.created_by,
                content=f"Your issue '{instance.title}' has been resolved.",
                email=True
            )

        if instance.status == "Seen" and instance.assigned_to:
            send_notification(
                sender='System',
                receiver=instance.assigned_to,
                content=f"You've been assigned the issue: {instance.title}",
                email=True
            )
