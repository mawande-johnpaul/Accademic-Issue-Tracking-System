from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from logbook.views import *
from django.conf import settings
from django.conf.urls.static import static
from logbook.views import custom_404_redirect


urlpatterns = [
    path('admin/', admin.site.urls),
     path('tech_admin/create_user/',AdminCreateUserView.as_view(),name='admin_create_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('issues/', IssueListCreate.as_view(), name='issues'),
    path('issues/<int:pk>/', IssueUpdateDestroy.as_view(), name='issue_detail'),
    path('notifications/', NotificationsListDestroy.as_view(), name='notifications'),
    path('notifications/create/', NotificationsCreate.as_view(), name='create_notification'),
    path('logs/', LogListUpdateDelete.as_view(), name='logs'),
    path('api/settings/change-password/', ChangePasswordAPIView.as_view(), name='api_change_password'),
    path('', home_view, name='home'),  # Root URL
    path('home/', home_view, name='home'),  # Optional, in case you want /home/ to work too
    path("account/update-recovery/", UpdateRecoveryInfoView.as_view(), name="update_recovery"),
    path("api/settings/change-username/",ChangeUsernameAPIView.as_view(),name='api_change_username'),
    path("api/settings/change-email/",UpdateEmailView.as_view(),name='change_email'),
    path('api/settings/change-theme/', UpdateThemeView.as_view(), name='change_theme'),
    path('api/settings/profile-picture/', UpdateProfilePictureView.as_view(), name='update_profile_picture'),
    






    
    
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

handler404 = 'logbook.views.custom_404_redirect'
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)