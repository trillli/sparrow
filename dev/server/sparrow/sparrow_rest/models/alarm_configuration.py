from django.db import models
from trillli_rest.models import TrillliEntity
from .alarm_device import AlarmDevice
from .alarm_light import AlarmLight
from .alarm_sound import AlarmSound
from .alarm_time import AlarmTime
from .alarm_vibration import AlarmVibration


class AlarmConfiguration(TrillliEntity):
    name = models.TextField(default='Unnamed Alarm')
    alarm_device_id = models.ForeignKey(AlarmDevice, on_delete = models.PROTECT)
    alarm_light_id = models.ForeignKey(AlarmLight, on_delete = models.PROTECT)
    alarm_sound_id = models.ForeignKey(AlarmSound, on_delete = models.PROTECT)
    alarm_time_id = models.ForeignKey(AlarmTime, on_delete = models.PROTECT)
    alarm_vibration_id = models.ForeignKey(AlarmVibration, on_delete = models.PROTECT)