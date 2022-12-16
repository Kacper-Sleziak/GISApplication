from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NycSubwayStations,NycSubwayStationsGeog
from .serializers import StationSerializer
from .queries import get_subway_stations_as_geogs

class SubwayStationList(generics.ListAPIView):
    queryset = NycSubwayStations.objects.all()
    serializer_class = StationSerializer

class SubwayStationsGeogs(APIView):
    @staticmethod
    def tuple_to_subway_dict(tuple):

        x = tuple[0]
        y = tuple[1]
        name = tuple[2]

        dict = {
            "coordinates": [x, y],
            "name": name
        }

        return dict

    def get(self, request):
        subways = get_subway_stations_as_geogs()

        for i, tuple in enumerate(subways):
            subways[i] = SubwayStationsGeogs.tuple_to_subway_dict(tuple)
        
        return Response(status=status.HTTP_200_OK, data=subways)