from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Issue)
admin.site.register(Log)
admin.site.register(Notification)