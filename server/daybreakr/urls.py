from django.urls import path, include

urlpatterns = [
    path('tr/admin/', include('tr_admin.urls')),    #Profile / account related endpoints
    path('data/', include('daybreakr_data.urls')),  #Daybreakr data model CRUD endpoints
    path('sound/', include('daybreakr_sound_search.urls'))  #Spotify sound search endpoints
]

