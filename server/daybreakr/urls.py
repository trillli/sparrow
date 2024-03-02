from django.urls import path, include

urlpatterns = [
    path('tr/admin/', include('tr_admin.urls')),
    path('data/', include('daybreakr_data.urls')),
    path('sound/', include('daybreakr_sound_search.urls'))
]

