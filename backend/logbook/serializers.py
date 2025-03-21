from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('Username already exists')
        return data

    def create(self, validated_data):  # Corrected indentation
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data.get('role', None),
            department=validated_data.get('department', None),
            password=validated_data['password']  # `create_user` automatically hashes the password
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=128)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if user is None or not user.is_active:  # Added check for active status
                raise serializers.ValidationError('Invalid credentials or inactive account.')
        else:
            raise serializers.ValidationError('Both username and password are required.')

        data['user'] = user
        return data


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'


class LogSerializer(serializers.ModelSerializer):  # Fixed typo in class name
    class Meta:
        model = Log
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):  # Fixed typo in class name
    class Meta:
        model = Notification
        fields = '__all__'
