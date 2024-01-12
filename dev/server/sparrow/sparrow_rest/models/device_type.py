from django.db import models
from trillli_rest.models import TrillliEntity

class DeviceType(TrillliEntity):
    type_name = models.TextField()
