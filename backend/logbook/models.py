from django.db import models


# Parent User model
class User(models.Model):
    class Meta:
        abstract = True
        
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

# Child models
class Student(User):
    role = models.CharField(default="student", max_length=20)

    def submit_issue(self):
        pass

    def followup_issue(self):
        pass

    def check_status(self):
        pass

    def remove_issue(self):
        pass


class Registrar(User):
    role = models.CharField(default="registrar", max_length=20)

    def assign_issue(self):
        pass

    def followup_issue(self):
        pass

    def check_status(self):
        pass

    def remove_issue(self):
        pass


class Lecturer(User):
    role = models.CharField(default="lecturer", max_length=20)

    def resolve_issue(self):
        pass

    def change_issue(self):
        pass


# Notification model
class Notification(models.Model):
    user_id = models.CharField(max_length=100)
    message = models.CharField(max_length=200)

    def send(self):
        pass

    def delete_notification(self):
        pass


# Issue model
class Issue(models.Model):
    category = models.CharField(max_length=100)
    summary = models.CharField(max_length=100)
    description = models.TextField(max_length=1000)
    attachments = models.FileField(upload_to="attachments/")
    status = models.CharField(default="Pending", max_length=20)

    def submit(self):
        pass

    def update(self):
        pass

    def delete_issue(self):
        pass

    def resolve(self):
        pass


# Log model
class Log(models.Model):
    user_id = models.CharField(max_length=100)
    action = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def record(self):
        pass

    def provide_log(self):
        pass
