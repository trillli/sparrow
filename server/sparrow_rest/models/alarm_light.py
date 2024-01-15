from django.db import models
from trillli_rest.models import TrillliEntity

class AlarmLight(TrillliEntity):
    brightness = models.DecimalField(max_digits = 5, decimal_places = 2)

