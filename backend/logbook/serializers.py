from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('student','Student'),('lecturer','Lecturer'),('admin','Admin')],default='student')
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}} # this hides pswd from response

    def validate_username(self, data):
        user = User.objects.filter(username=data['username']).exists()
        if user:
            raise serializers.ValidationError('Username already exists')
        return data
        
    
    def validate_email(self,data):
        if User.objects.filter(email=data).exists():
            raise serializers.ValidationError("Email already exists. Please use another email.")
        return data
    
    def validate_password(self,data):  #validate the strength of the pswd
        validate_password(data)       #Django built in password validation
        return data
    
    def create(self,validated_data):
        """Create and return a new user with an encrypted password"""
        user = User.objects.create(
            username= validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])  #ensures encrypted password
        user.save()
        return user
        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(write_only=True, max_length=128)
    role = serializers.ChoiceField(choices=[('student','Student'),('lecturer','Lecturer'),('admin','Admin')])

    def validate(self, data):
        username=data.get("username")
        password=data.get("password")
        role = data.get("role")  #ensures one logs in using the role they registered with

        if username and password:
            user = authenticate(username=username, password=password)

            if  user is None:
                raise serializers.ValidationError('Invalid username or password')
        else:
            raise serializers.ValidationError(f'Unable to log in with provided credentials. -{username}- -{password}-')
            if user.role !=role:
                raise serializers.ValidationError(f'Incorrect role. You are registered as a {user.role}.')
        
        data['user'] = user
        return data

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ['created_by','created_at','updated_at'] # prevents users from modifying them

class LogSerialier(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'   
        read_only_fields = ['user_id','action','timestamp'] 
    def validate(self,data):
        """ this prevents users from altering logs manually"""
        raise serializers.ValidationError("Logs canno tbe modified manually")
    
class NotificationSerialier(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'  
        read_only_fields = ['user_id_receiver','user_id_sender']
    def validate(self,data):
        """ Only users can get their own notifications"""
        request = self.context.get('request')
        if request.user != self.instance.user_id_receiver:
            raise serializers.ValidationError("You can only access your own notifications")
        return data
    