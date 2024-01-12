from django.db import models
from trillli_rest.models import TrillliEntity

class AlarmTime(TrillliEntity):
    alarm_time = models.DateTimeField()