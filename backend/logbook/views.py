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


logger = logging.getLogger(__name__)






User = get_user_model()

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
            timestamp=timezone.now()
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


def home_view(request):
    return render(request, 'home.html')

class UpdateRecoveryInfoView(APIView):
    permission_classes = [IsAuthenticated]

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
            
                
                
                
        
    
