from django.urls import path, include

urlpatterns = [
    path('tr/', include('trillli.urls')),
    path('data/', include('daybreakr_data.urls')),
    path('sound/', include('daybreakr_sound_search.urls'))
]

