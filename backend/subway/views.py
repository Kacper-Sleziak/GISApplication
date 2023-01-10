from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.datastructures import MultiValueDictKeyError

from .queries import get_subway_stations_as_geogs, get_subway_stations_as_geogs_in_polygon_area

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


class SubwayStationsGeogs(APIView):
    """
    View returns all subway stations
    """

    def get(self, request):
        "Getting paramas"
        borough = request.GET.get('borough')
        express = request.GET.get('express')
        name = request.GET.get('name')

        subways = get_subway_stations_as_geogs(borough, name, express)

        for i, tuple in enumerate(subways):
            subways[i] = tuple_to_subway_dict(tuple)

        return Response(status=status.HTTP_200_OK, data=subways)


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
