from django.db import models
from django.contrib.auth.models import AbstractUser

DEPARTMENT_CHOICES = [('cocis','CoCIS'), ('cobams','CoBAMS'), ('conas','CoNAS'), ('cedat','CEDAT')]
COURSES = [('CC1000','Electrical'), ('CC1100','Civil'), ('CC1200','Mechanical'), ('CC1300','Chemical')]
ROLES = [('student','Student'), ('lecturer','Lecturer'), ('registrar','Registrar'), ('admin','Admin')]
ISSUE_CATEGORIES = [('marks','Missing Marks'), ('attendance','Attendance'), ('resources','Resources'), ('environment','Environmental'), ('conduct','Conduct'), ('schedules','Schedules')]

# Create your models here.
class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    webmail = models.CharField(max_length=100, unique=True, blank=True, null=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100, choices=ROLES)
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES)
    course = models.CharField(max_length=100, choices=COURSES, default='none')

    def __str__(self):
        return self.username

class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=ISSUE_CATEGORIES, default='student')
    description = models.TextField()
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES)
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_issue', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, default='Unseen')
    attachmet = models.FileField(upload_to='issue_attachments/', null=True, blank=True) 
    image = models.ImageField(upload_to='issue_images/', null=True, blank=True)
    

    def __str__(self):
        return self.title
    

class Log(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    action = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    user_id_receiver = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    user_id_sender = models.ForeignKey(CustomUser, related_name='sent_notifications', on_delete=models.DO_NOTHING)
    content = models.CharField(max_length=1000)
    category = models.CharField(max_length=50, choices=[('message','Message'),('announcement','Announcement'),('notification','Notification')]) #message or announcement or notification
