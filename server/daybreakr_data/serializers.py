from rest_framework import serializers
from .models import LazyAlarm

class MetadataSerializer(serializers.Serializer):
    api = serializers.CharField()
    branch = serializers.CharField()


class MessageSerializer(serializers.Serializer):
    text = serializers.CharField()
    metadata = MetadataSerializer()

class LazyAlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = LazyAlarm
        fields = '__all__'
