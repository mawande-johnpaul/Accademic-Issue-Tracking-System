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

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=128)

    def validate(self, data):
        username=data.get("username")
        password=data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)

            if  user is None:
                raise serializers.ValidationError('Invalid credentials')
        else:
            raise serializers.ValidationError(f'Unable to log in with provided credentials. -{username}- -{password}-')
        
        data['user'] = user
        return data

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class LogSerialier(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'    

class NotificationSerialier(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'  

    