from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Issue(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    department = models.CharField(max_length=100)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class Department(models.Model):
    name = models.CharField(max_length=100)
    registrar = models.CharField(max_length=100)
    lecturers = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    issues = models.ForeignKey(Issue, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name
    
class Log(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    action = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

class Notification(models.Model):
    user_id_receiver = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    user_id_sender = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    content = models.CharField(max_length=1000)
