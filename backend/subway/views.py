from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.gis.db.models.functions import Transform
from django_filters.rest_framework import DjangoFilterBackend

from .queries import get_subway_stations_as_geogs, get_subway_stations_as_geogs_in_polygon_area
from .models import NycSubwayStations
from .serializers import StationSerializer
from .filtersets import SubwayFilter



def tuple_to_subway_dict(tuple):
    """
    Common function for views that return subway stations.
    Converts tuple given from data base query to python dict/JSON format
    """
    x = tuple[0]
    y = tuple[1]
    name = tuple[2]
    borough = tuple[3]
    express = tuple[4]

    dict = {
        "coordinates": [x, y],
        "name": name,
        "borough": borough,
        "express": express
    }
    return dict

class SubwayStationList(generics.ListAPIView):
    serializer_class = StationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SubwayFilter
    
    def get_queryset(self):
        queryset = NycSubwayStations.objects.all()
        queryset = queryset.extra(select={'geom': 'ST_Transform(geom, 4326)'})
        return queryset       

class SubwayStationsGeogsInArea(APIView):
    """
    View returns all subways stations in area.
    Area is defined as a circle by X, Y and radius parameteres in body
    """

    def post(self, request):
        try:
            coords = request.data['coords']
            radius = int(request.data['radius'])
        except (MultiValueDictKeyError, ValueError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        subways = get_subway_stations_as_geogs_in_polygon_area(coords, radius)

        for i, tuple in enumerate(subways):
            subways[i] = tuple_to_subway_dict(tuple)

        return Response(status=status.HTTP_200_OK, data=subways)
