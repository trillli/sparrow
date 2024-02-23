from django.db import models
from trillli_rest.models import TrillliEntity

class LazyAlarms(TrillliEntity):
    serialization = models.TextField
