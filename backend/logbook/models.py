from django.db import models
from django.contrib.auth.models import AbstractUser
import os
from django.core.exceptions import ValidationError
# Function to determine upload path for attachments
def upload_to(instance, filename):
    return os.path.join('data', filename)


DEPARTMENT_CHOICES = [
    ('COCIS', 'COCIS'),
    ('COBAMS', 'COBAMS'),
    ('CONAS', 'CONAS'),
    ('CEDAT', 'CEDAT'),
    ('CAES', 'CAES'),
    ('CHUSS', 'CHUSS'),
    ('CHS', 'CHS'),
    ('LAW', 'LAW'),
    ('SCHOOL_OF_EDUCATION', 'School of Education'),
    ('SCHOOL_OF_BUSINESS', 'School of Business'),
    ('SCHOOL_OF_BUILT_ENVIRONMENT', 'School of Built Environment')
]
# Predefined issue categories
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
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    course = models.CharField(max_length=100, default='none')

    def __str__(self):
        return self.username  # Returns username when object is printed
# Model to track issues submitted by users
class Issue(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=ISSUE_CATEGORIES, default='student')
    description = models.TextField()
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    course_unit = models.CharField(max_length=100, default='none')
    semester = models.CharField(max_length=100, default='none')
    year = models.CharField(max_length=100, default='none')
    assigned_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_issue', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True) # Timestamp when issue was created
    updated_at = models.DateTimeField(auto_now=True)     # Timestamp when issue was last updated
    status = models.CharField(max_length=10, default='Unseen')
    priority = models.CharField(max_length=10, default='Low')  # Priority level: Low, Medium, High
    deadline = models.DateField(auto_now=True) # Deadline for resolving the issue
    progress = models.CharField(default="", max_length=1000)
    attachment = models.FileField(upload_to=upload_to, null=True, blank=True)

    def __str__(self):
        return self.title  # Show issue title in admin/list views
    
    # Validate uploaded file extension
    def clean(self):
        if self.attachment:
            ext = os.path.splitext(self.attachment.name)[1].lower()
            if ext not in ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.ppt', '.pptx', '.txt']:
                raise ValidationError("Unsupported file type.")
# Model to log system/user actions for auditing
class Log(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.SET_NULL)
    action = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.timestamp # For easier viewing in admin panel
# Model for storing user notifications
class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.CharField(max_length=10, default="")
    user_id_receiver = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.SET_NULL)
    content = models.CharField(max_length=1000, default="")

    def __str__(self):
        return self.sender   # Display sender in admin/list view
