from rest_framework import serializers
from .models import NycSubwayStations

class StationSerializer(serializers.ModelSerializer):
    objectid = serializers.DecimalField(max_digits=65535, decimal_places=65530, rounding="ROUND_FLOOR")
    id = serializers.DecimalField(max_digits=65535, decimal_places=65530)

    class Meta:
        model = NycSubwayStations
        geo_field = "point"
        fields = "__all__"