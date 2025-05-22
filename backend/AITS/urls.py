from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from logbook.views import *
from django.conf import settings
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
    path('issues/', IssueListCreate.as_view(), name='issues'),
    path('issues/<int:pk>/', IssueList2.as_view(), name='assigned_issues'),
    path('issues/<int:pk>/<str:status>/', IssueList3.as_view(), name='resolved_issues'),
    path('issues/<str:status>/<str:college>', IssueList.as_view(), name='issue_status'),
    path('issues/<str:action>/<int:pk>/', IssueUpdateDestroy.as_view(), name='edit_issue'),
    path('issues/remove/<int:pk>/', IssueUpdateDestroy.as_view(), name='remove'),
    path('issues/notify/<int:pk>/', NotificationsListCreate.as_view(), name='notify_lecturer'),
    path('notifications/<int:pk>/', NotificationsListCreate.as_view(), name='notifications'),
    path('notifications/remove/<int:pk>', NotificationDestroy.as_view(), name='delete_notification'),
    path('lecturers/<str:college>', LecturerList.as_view(), name='list_lecturers'),
    
    # Password reset views
    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
