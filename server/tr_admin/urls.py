from django.urls import path

from .views import ProfileView, ProfileImageView, ProfilePasswordView


urlpatterns = [
    path('profile', ProfileView.as_view(), name='profile'),     #getting/setting a user's own data
    path('profile-image', ProfileImageView.as_view(), name='profile-image'),    #getting/setting a user's own picture
    path('profile-password', ProfilePasswordView.as_view(), name='profile-password'),   #handle password reset requests
]
