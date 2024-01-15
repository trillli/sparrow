from django.db import models
from trillli_rest.models import TrillliEntity
from .device_type import DeviceType

class AlarmDevice(TrillliEntity):
    device_type_id = models.ForeignKey(DeviceType, on_delete = models.PROTECT)
    