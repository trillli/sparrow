from rest_framework import serializers
from models import LazyAlarms
class LazyAlarmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LazyAlarms
        fields = ["serialization"]