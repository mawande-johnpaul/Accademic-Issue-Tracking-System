from django.contrib import admin
from .models import *

#class CustomAdmin(admin.ModelAdmin):
    #list_display = ('name', 'department')
    #search_fields = ('name')
    #list_filter = ('department')

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Issue)
admin.site.site_header = "Academic Issue Tracking System"
admin.site.site_title = "AITS Admin"
admin.site.index_title = "Welcome to AITS Panel"
#admin.site.register(CustomUser, CustomAdmin)
#admin can create users
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    pass
