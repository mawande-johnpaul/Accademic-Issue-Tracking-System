from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, get_user_model, login
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        return  Response(serializer.errors, status=400)

class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']

            login(request, user)

            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                    'department': user.department,
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=400)

class IssueListCreate(generics.ListCreateAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Issue.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

class NotificationsListDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = NotificationSerialier
    permission_classes = [IsAuthenticated]

class NotificationsCreate(generics.CreateAPIView):
    serializer_class = NotificationSerialier
    permission_classes = [IsAuthenticated]

class DepartmentList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = DepartmentSerializer

class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerialier
    permission_classes = [IsAuthenticated]
