from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from logbook.views import *
from logbook import views

urlpatterns = [
    path('', views.frontend_view, name='frontend'),
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('issues/', IssueListCreate.as_view(), name='issues'),
    path('issues/all/', IssueList.as_view(), name='issue_assigned'),
    path('issues/<int:pk>/', IssueUpdateDestroy.as_view(), name='issue_detail'),
    path('notifications/', NotificationsListDestroy.as_view(), name='notifications'),
    path('notifications/create/', NotificationsCreate.as_view(), name='create_notification'),
    path('logs/', LogListUpdateDelete.as_view(), name='logs'),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
