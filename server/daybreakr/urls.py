from django.urls import path, include

urlpatterns = [
    path('tr/', include('trillli.urls')),
    path('data/', include('daybreakr_data.urls'))
]

