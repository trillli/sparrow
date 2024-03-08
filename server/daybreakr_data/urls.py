from django.urls import path
from .views import LazyAlarmView

urlpatterns = [
    path('lazyalarm', LazyAlarmView.as_view(), name='lazy-alarms')
]