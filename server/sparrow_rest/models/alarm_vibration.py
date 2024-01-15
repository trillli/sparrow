from django.db import models
from trillli_rest.models import TrillliEntity

class AlarmVibration(TrillliEntity):
    enable = models.BooleanField(default = False)