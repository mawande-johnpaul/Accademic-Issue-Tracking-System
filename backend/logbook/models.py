from django.db import models
from django.contrib.auth.models import AbstractUser

DEPARTMENT_CHOICES = [('COCIS','COCIS'), ('COBAMS', 'COBAMS'), ('CONAS', 'CONAS')]
ISSUE_CATEGORIES = [('Marks','Marks'), ('Attendance','Attendance'), ('Resources','Resources'), ('Environmental','Environmental'), ('Conduct','Conduct'), ('Schedules','Schedules'), ('Other','Other')]

# Create your models here.
class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100, default='none')
    last_name = models.CharField(max_length=100, default='none')
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    webmail = models.CharField(max_length=100, unique=True, blank=True, null=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='student')
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES)
    course = models.CharField(max_length=100, default='none')

    def __str__(self):
        return self.username

class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=ISSUE_CATEGORIES, default='student')
    description = models.TextField()
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES)
    course_unit = models.CharField(max_length=100, default='none')
    semester = models.CharField(max_length=100, default='none')
    year = models.CharField(max_length=100, default='none')
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_issue', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, default='Unseen')
    priority = models.CharField(max_length=10, default='Low')
    deadline = models.DateField(auto_now=True)

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
