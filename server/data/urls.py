from django.urls import path, include

from .views import *

urlpatterns = [
    path('lazyalarms', LazyAlarmsView.as_view())
]