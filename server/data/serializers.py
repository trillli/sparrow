from rest_framework import serializers
from .models import *

class LazyAlarmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LazyAlarms
        fields = '__all__'