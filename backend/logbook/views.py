from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model, login
from rest_framework_simplejwt.tokens import Token, RefreshToken

User = get_user_model()

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'token': access_token,
            'access_token': str(refresh.access_token),
            'user': RegisterSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        print(request)
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
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.request.user:
            queryset = queryset.filter(created_by=self.request.user)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class IssueUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Issue.objects.filter(created_by=self.request.user)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class NotificationsListDestroy(generics.RetrieveDestroyAPIView):
    serializer_class = NotificationSerialier
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class NotificationsCreate(generics.CreateAPIView):
    serializer_class = NotificationSerialier
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class LogListUpdateDelete(generics.RetrieveUpdateAPIView):
    serializer_class = LogSerialier
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
