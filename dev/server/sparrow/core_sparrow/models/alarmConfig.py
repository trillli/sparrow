from django.db import models
from api.models import TrillliEntity

class AlarmConfig(TrillliEntity):
    alarmId = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
