from django.db import models
from trillli_rest.models import TrillliEntity
from .sound_source import SoundSource

class AlarmSound(TrillliEntity):
    volume = models.DecimalField(max_digits = 5, decimal_places = 2)
    sound_source_id = models.ForeignKey(SoundSource, on_delete = models.PROTECT)
