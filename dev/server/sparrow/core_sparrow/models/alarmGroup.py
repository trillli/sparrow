from django.db import models
from api.models import TrillliEntity

class AlarmGroup(TrillliEntity):
    name = models.CharField(max_length=200)
