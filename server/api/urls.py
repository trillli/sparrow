from django.urls import path

from .views import SoundSearchView

urlpatterns = [
    path('sound_search', SoundSearchView.as_view(), name='sound-search')
    # path()
]