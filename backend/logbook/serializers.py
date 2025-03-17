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
        user = User.objects.filter(username=data['username']).exists()
        if user:
            raise serializers.ValidationError('Username already exists')
        
        return data
    
def create(self, validated_data):
    user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        role=validated_data.get('role', None),  # Use .get() to avoid KeyError if field is optional
        department=validated_data.get('department', None),  # Use .get() for optional fields
        password=validated_data['password']  # No need to call set_password()
    )
    return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=128)

    def validate(self, data):
        username=data.get("username")
        password=data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if  user is None:
                raise serializers.ValidationError(f'Invalid credentials -{username}- -{password}-')
        else:
            raise serializers.ValidationError(f'Unable to log in with provided credentials. -{username}- -{password}-')
        
        data['user'] = user
        return data

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class LogSerialier(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'    

class NotificationSerialier(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'  

    