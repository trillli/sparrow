from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class LazyAlarms(models.Model):
    serialization = models.TextField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmLight(models.Model):
    brightness = models.DecimalField(max_digits = 5, decimal_places = 2)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class DeviceType(models.Model):
    type_name = models.TextField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmDevice(models.Model):
    device_type_id = models.ForeignKey(DeviceType, on_delete = models.PROTECT)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class SoundSource(models.Model):
    source_name = models.CharField(max_length=200)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmSound(models.Model):
    volume = models.DecimalField(max_digits = 5, decimal_places = 2)
    sound_source_id = models.ForeignKey(SoundSource, on_delete = models.PROTECT)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmTime(models.Model):
    alarm_time = models.DateTimeField()
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmVibration(models.Model):
    enable = models.BooleanField(default = False)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

class AlarmConfiguration(models.Model):
    name = models.TextField(default='Unnamed Alarm')
    alarm_device_id = models.ForeignKey(AlarmDevice, on_delete = models.PROTECT)
    alarm_light_id = models.ForeignKey(AlarmLight, on_delete = models.PROTECT)
    alarm_sound_id = models.ForeignKey(AlarmSound, on_delete = models.PROTECT)
    alarm_time_id = models.ForeignKey(AlarmTime, on_delete = models.PROTECT)
    alarm_vibration_id = models.ForeignKey(AlarmVibration, on_delete = models.PROTECT)
    updated = models.DateTimeField(auto_now = True, blank = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)