from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NycSubwayStations,NycSubwayStationsGeog
from .serializers import StationSerializer
from .queries import get_subway_stations_as_geogs, get_subway_stations_as_geogs_in_area
from django.utils.datastructures import MultiValueDictKeyError


class SubwayStationList(generics.ListAPIView):
    queryset = NycSubwayStations.objects.all()
    serializer_class = StationSerializer


def tuple_to_subway_dict(tuple):

    x = tuple[0]
    y = tuple[1]
    name = tuple[2]
    
    dict = {
        "coordinates": [x, y],
        "name": name
    }
    return dict

class SubwayStationsGeogs(APIView):
    def get(self, request):
        subways = get_subway_stations_as_geogs()

        for i, tuple in enumerate(subways):
            subways[i] = tuple_to_subway_dict(tuple)
        
        return Response(status=status.HTTP_200_OK, data=subways)

class SubwayStationsGeogsInArea(APIView):
        def post(self, request):
            try:
                X = float(request.data['X'])
                Y = float(request.data['Y'])
                radius = float(request.data['radius'])
            except (MultiValueDictKeyError, ValueError):
                return Response(status=status.HTTP_400_BAD_REQUEST)
         
            subways = get_subway_stations_as_geogs_in_area(X, Y, radius)

            for i, tuple in enumerate(subways):
                subways[i] = tuple_to_subway_dict(tuple)
            
            return Response(status=status.HTTP_200_OK, data=subways)
        