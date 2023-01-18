from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.gis.geos import Polygon
from django_filters.rest_framework import DjangoFilterBackend

from .models import NycSubwayStations
from .serializers import StationSerializer
from .filtersets import SubwayFilter

class SubwayStationList(generics.ListAPIView):
    """
    View returns all subways stations with given filters
    filter as a paramas:
    - borough
    - name
    - expres
    """
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
    Area is defined as a Polygon and radius parameteres in body
    """

    def post(self, request):
        try:
            coords = request.data['coords']
            radius = int(request.data['radius'])
        except (MultiValueDictKeyError, ValueError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        drawn_area = Polygon([tuple(x) for x in coords[0]])

        if radius !=0:
            buffer_width = radius / 40000000.0 * 360.0
            drawn_area = drawn_area.buffer(buffer_width)

        subways = NycSubwayStations.objects.all()
        subways = subways.extra(select={'geom': 'ST_Transform(geom, 4326)'})

        subways_in_area = []

        for sub in subways:
            if drawn_area.contains(sub.geom):
                subways_in_area.append(sub)
        
        serializer = StationSerializer(subways_in_area, many=True)

        return Response(status=status.HTTP_200_OK, data=serializer.data)
