from rest_framework import serializers
from .models import LazyAlarm

class LazyAlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = LazyAlarm
        fields = '__all__'
