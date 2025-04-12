from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

#class CustomAdmin(admin.ModelAdmin):
    #list_display = ('name', 'department')
    #search_fields = ('name')
    #list_filter = ('department')

# Register your models here.
# admin.site.register(CustomUser)
admin.site.register(Issue)
admin.site.site_header = "Academic Issue Tracking System"

#admin.site.register(CustomUser, CustomAdmin)

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    pass
