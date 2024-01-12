from django.db import models
from trillli_rest.models import TrillliEntity

class SoundSource(TrillliEntity):
    source_name = models.CharField(max_length=200)