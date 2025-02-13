from django.contrib import admin
from .models import Student, Registrar, Lecturer, Issue, Notification, Log

# Register your models here.
admin.site.register(Student)
admin.site.register(Registrar)
admin.site.register(Lecturer)
admin.site.register(Issue)
admin.site.register(Notification)
admin.site.register(Log)
