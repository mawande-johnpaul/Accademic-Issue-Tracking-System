from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny, AllowAny
from django.contrib.auth import get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from django.conf.urls.static import static

User = get_user_model()

# I changed from ModelViewSet to enerics because of its descriptive and ore specialied mrthods.

def index(request):
    return render(request, 'index.html')


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
    permission_classes = [AllowAny]

    def get_queryset(self): #Runs if the request method is GET
        return super().get_queryset().filter(created_by=self.request.user)  # Ensure filtering works

    def perform_create(self, serializer): #Runs if request is POST
        serializer.save(created_by=self.request.user)

class IssueList(generics.ListAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):  # Runs if the request method is GET
        status = self.kwargs['status']  # Get the status from the URL
        return Issue.objects.filter(status=status)  # Filter issues by status

# What data exactly is returned, which function does what, notifications on successful action
class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):  # Runs if the request method is GET
        pk = self.kwargs['pk']  # Get the status from the URL
        return Issue.objects.filter(pk=pk)  # Filter issues by status

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.assigned_to = request.data.get('assigned_to', instance.assigned_to)
        instance.deadline = request.data.get('deadline', instance.deadline)
        instance.priority = request.data.get('priority', instance.priority)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        queryset = Issue.objects.all().filter(pk=self.kwargs['pk'])
        instance = self.get_object()
        instance.status = self.kwargs['status']
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Notifications
class NotificationsListDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = NotificationSerializer  # Fixed typo
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class NotificationsCreate(generics.CreateAPIView):
    serializer_class = NotificationSerializer  # Fixed typo
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        return super().perform_create(serializer)


# Logs
class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerializer  # Fixed typo
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
    serializer_class = LogSerializer  # Fixed typo
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