"""
URL configuration for AITS project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from logbook import views
from logbook.views import *
from django.urls import path, include, re_path
from django.contrib import admin
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'Student', StudentViewSet)
router.register(r'Issue', IssueViewSet)
router.register(r'Registrar', RegistrarViewSet)
router.register(r'Lecturer', LecturerViewSet)
router.register(r'Notification', NotificationViewSet)
router.register(r'Log', LogViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login, name='login'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('signup/', views.signup, name='signup'),
    path('api/student/', include(router.urls), name='student_api'),
    path('api/issue/', include(router.urls), name='issue_api'),
    path('api/lecturer/', include(router.urls), name='lecturer_api'),
    path('api/registrar/', include(router.urls), name='registrar_api'),
    path('api/notification/', include(router.urls), name='notification_api'),
    path('api/log/', include(router.urls), name='log_api'),
]
