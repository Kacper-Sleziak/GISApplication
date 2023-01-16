from rest_framework import serializers
from .models import NycSubwayStations

class StationSerializer(serializers.ModelSerializer):
    objectid = serializers.DecimalField(max_digits=10, decimal_places=0)
    id = serializers.DecimalField(max_digits=10, decimal_places=0)

    class Meta:
        model = NycSubwayStations
        geo_field = "point"
        fields = "__all__"