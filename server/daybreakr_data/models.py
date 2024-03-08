from django.db import models

class LazyAlarm(models.Model):
    user_id = models.CharField(max_length=512, primary_key=True)
    alarms_json = models.TextField()

