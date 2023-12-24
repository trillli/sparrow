from django.db import models
from api.models import TrillliEntity

class Alarm(TrillliEntity):
    name = models.CharField(max_length=200)
