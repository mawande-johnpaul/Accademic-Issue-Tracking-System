from django.contrib import admin
from .models import *

#class CustomAdmin(admin.ModelAdmin):
    #list_display = ('name', 'department')
    #search_fields = ('name')
    #list_filter = ('department')

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Issue)
#admin.site.register(CustomUser, CustomAdmin)