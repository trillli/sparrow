from django.urls import path

from .views import ProfileView, ProfileImageView, ProfilePasswordView


urlpatterns = [
    path('profile', ProfileView.as_view(), name='profile'),
    path('profile-image', ProfileImageView.as_view(), name='profile-image'),
    path('profile-password', ProfilePasswordView.as_view(), name='profile-password'),
]
