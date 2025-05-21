from django.shortcuts import render,redirect
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import *
from logbook.permissions import *
from django.dispatch import receiver
from django.utils import timezone
from django.db.models.signals import post_save
from django.contrib import admin
from django.http import HttpResponseNotFound
import logging
from rest_framework.throttling import AnonRateThrottle
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.http import JsonResponse
from django.conf.urls.static import static
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from rest_framework.decorators import api_view, permission_classes


logger = logging.getLogger(__name__)






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
    verify_url = f"http://aitsysten.up.railway.app/verify-email/{uid}/{token}"
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


# I changed from ModelViewSet to generics because of its descriptive and more specialized methods.

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

        return Response({
            'token': access_token,
            'timestamp':timezone.now(), #adds current date and time the user was created
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_201_CREATED)


#admin can create a user
class AdminCreateUserView(generics.CreateAPIView):
    # only users with 'admin'role can access this endpoint
    permission_classes = [IsAdmin]
    def post(self, request, *args, **kwargs):
        #double checking if current user really has an admin role
        if request.user.role!='admin':
             return Response({"error": "You aren't authorized to perform this action"}, status=status.HTTP_403_FORBIDDEN)
        serializer = AdminCreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User created successfully",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                    
                }
            },status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Login
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle] # regulation of login requests

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        login(request, user)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'access_token': access_token,
            'refresh_token': str(refresh),
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_200_OK)
        
    



# Issue Management
class IssueListCreate(generics.ListCreateAPIView): #View to list or create an issue
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #Runs if the request method is GET
        return super().get_queryset().filter(created_by=self.request.user)  # Ensure filtering works

    def perform_create(self, serializer): #Runs if request is POST
        serializer.save(created_by=self.request.user)
        
#editing and deleting issues
class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.state = request.data.get('state', instance.state)
        instance.updated_at = timezone.now()
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.state = request.data.get('state', instance.state)
        instance.updated_at = timezone.now()
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_queryset(self):  
        return Issue.objects.filter(created_by=self.request.user)  # student cant view another student issue which they didn't create
         


# Notifications
class NotificationsListDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = NotificationSerializer  # Fixed typo
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class NotificationsCreate(generics.CreateAPIView):
    serializer_class = NotificationSerializer  # Fixed typo
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return super().perform_create(serializer)


# Logs
class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerializer  # Fixed typo
    permission_classes = [IsAuthenticated]

# creates a log entry whenever an issue is updated or resolved
@receiver(post_save, sender=Issue)
def create_log_entry(sender, instance, created, **kwargs):
    if not created:
        Log.objects.create(
            user_id=instance.created_by,
            action="Issue updated",
            timestamp=timezone.now() #adds the current time
        )



    

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
    serializer_class = LogSerializer  # Fixed typo
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        return super().perform_create(serializer)
    
    #checks for validity of the log data
    def create(self,request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response
        return Response({'error':'Invalid log data',details:'serializer.errors'},status=400)
    
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

class ChangePasswordAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm password")

        if not current_password or not new_password or not confirm-password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({'error': 'Incorrect current password'}, status=status.HTTP_400_BAD_REQUEST)
        #code to confirm the new password
        if new_password != confirm_password:
            return Response(
                {"error": "New password and confirmation do not match"},
                status=status.HTTP_400_BAD_REQUEST
            )
            try: 
                validate_password(new_password,user)
            except ValidationError as e:
                return Response({"error":list(e)},status=400)
        user.set_password(new_password)
        user.save()
        #shows general events like changing password when they happen
        logger.info(f"User {user.email} changed their password.")
        # notifications for the change of password and should be inside the method(function) to avoid user not found error
        Notification.objects.create(
            user=user,
            title="Password Changed",
            message="Your password was successfully updated.",
            type="account"
)
        return Response({'success': 'Password updated successfully'}, status=status.HTTP_200_OK)

def custom_404_redirect(request, exception):
    return redirect('home')


def home_view(request):   # direct to the home view once server runs
    return render(request, 'home.html')

class UpdateRecoveryInfoView(APIView):
    permission_classes = [IsAuthenticated] #only allows authenticated users

    def put(self, request):
        user = request.user
        recovery_email = request.data.get("recovery_email")
        recovery_phone = request.data.get("recovery_phone")

        if recovery_email:
            #validate recovery email
            try:
                validate_email(recovery_email)
                user.recovery_email = recovery_email
            except ValidationError:
                return Response({"error":"Invalid email format"},status=400)
            #validate  recovery phone and its format
        if recovery_phone and recovery_phone.isdigit():
            user.recovery_phone = recovery_phone
        user.save()
        return Response({"success": "Recovery info updated successfully."}, status=200)
            
                

class ChangeUsernameAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self,request):
        user = request.user
        new_username = request.data.get("new_username")
        if not new_username:
            return Response({"error":"New user name is required"})
        #check if the new username is taken
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if User.objects.filter(username=new_username).exclude(id=user.id).exists():
            return Response({"error": "Username is already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user.username = new_username
        user.save()

        return Response({"success": "Username changed successfully"}, status=status.HTTP_200_OK)
    
class UpdateEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        new_email = request.data.get("new_email")

        if not new_email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        # logic for verifying the updated email
        try:
            validate_email(new_email)
        except ValidationError:
            return Response({"error":"Invalid email format"},status=status.HTTP_400_BAD_REQUEST)
        #logic to ensure that one doesn't enter the old email they had as the new one
        if user.email == new_email:
            return Response({"error":"This is your current email.Please get a new one"},status=status.HTTP_400_BAD_REQUEST)
        #logic to prevent duplicate updated email entry 
        if User.objects.filter(email=new_email).exclude(id=user.id).exists():
            return Response({"error":"This email is already taken by another user"})
        #save 
        user.email = new_email
        user.save()

        return Response({"success": "Email updated successfully"}, status=status.HTTP_200_OK)
    
# class UpdateThemeView(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request):
#         user = request.user
#         new_theme = request.data.get("theme")

#         if new_theme not in ['light', 'dark']:
#             return Response({"error": "Invalid theme selected."}, status=400)

#         user.theme = new_theme
#         user.save()

#         # create  log & notify
#         Log.objects.create(
#             user=user,
#             action="Changed theme",
#             description=f"{user.username} changed theme to {new_theme}"
#         )

#         Notification.objects.create(
#             user=user,
#             title="Theme Changed",
#             message=f"Your theme has been changed to {new_theme}.",
#             type="account"
#         )

#         return Response({"success": f"Theme updated to {new_theme}"}, status=200)

from rest_framework.parsers import MultiPartParser

# class UpdateProfilePictureView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser]

#     def patch(self, request):
#         user = request.user
#         profile_picture = request.FILES.get('profile_picture')
    
#         if profile_picture:
#             user.profile_picture = profile_picture
#             user.save()
#             return Response({"success":"Profile picture updated"},status=200)
#         return Response({"error":"no file uploaded"},status=400)
        
