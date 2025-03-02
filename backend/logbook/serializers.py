from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'role', 'department')
        extra_kwargs = {'password': {'write_only': True}}

    def is_valid(self, data):
        user = User.objects.filter(username=data['username'])
        if user:
            raise serializers.ValidationError('Username already exists')
        
        return data

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def is_valid(self, data):
            user = authenticate(username=data['username'], password=data['password'])

            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User deactivated')
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
            
            return data

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

    def perform_create():
        issue = Issue.objects.create()

    