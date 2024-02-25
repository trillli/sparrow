from django.urls import path, include

urlpatterns = [
    path('tr/', include('trillli.urls')),
    path('api/messages/', include('daybreakr_data.urls'))
]

