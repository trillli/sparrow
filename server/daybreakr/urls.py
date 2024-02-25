from django.urls import path, include

urlpatterns = [
    
    path('tr/', include('tr_admin.urls')),
    path('api/messages/', include('daybreakr_data.urls'))
]

