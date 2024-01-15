from django.db import models
from trillli_rest.models import TrillliEntity
from .alarm_configuration import AlarmConfiguration

class Alarm(TrillliEntity):
    name = models.TextField(default = 'Unnamed Alarm')
    alarm_configuration_id = models.ForeignKey(AlarmConfiguration, on_delete=models.PROTECT)