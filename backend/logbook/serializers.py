from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from logbook.permissions import *
from django.contrib.auth.models import Permission
from django.contrib.auth.hashers import make_password


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
    
    #ensures that password is more than 6 characters and that it is not entirely numeric
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long.")
        if value.isdigit():
            raise serializers.ValidationError("Password cannot be entirely numeric.")
        return make_password(value)  # Hash password after validating


    def create(self, validated_data):  # Corrected indentation
        webmail=validated_data['webmail']  #Create role based on webmail
        webmail_suffix = webmail.split('@')[1]  #extracts the part of the email after @
        if webmail_suffix == 'students.mak.ac.ug':  # for student
            roles = 'student'
            
        elif '@' not in webmail:
            roles = 'registrar'
            
        else:
            roles = 'lecturer'
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            role=roles,
            department=validated_data.get('department', None),
            password=validated_data['password'],  # `create_user` automatically hashes the password
            
        )
        return user
            
            
            
            
# serializer for admin(technical personnel)
class AdminCreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def validate_password(self,value):
        return make_password(value) #encrypts the password using Django's hashing system
    def create(self, validated_data):
        validated_data['role'] = 'admin'  # Set the role to 'admin'
        return CustomUser.objects.create_user(**validated_data)

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
#Logic to ensure that students do not submit massive files 
    def validate_attachment(self, value):
        max_size = 10 * 1024 * 1024  # 10 MB
        if value and value.size > max_size: 
            raise serializers.ValidationError("Attachment file size must not exceed 10MB")
        return value

    def validate_image(self, value):
        max_size = 10 * 1024 * 1024  # 10 MB
        if value and value.size > max_size:
            raise serializers.ValidationError("Image file size must not exceed 10MB")
        return value



class LogSerializer(serializers.ModelSerializer):  # Fixed typo in class name
    class Meta:
        model = Log
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):  # Fixed typo in class name
    class Meta:
        model = Notification
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'profile_picture', ...]

           
            
