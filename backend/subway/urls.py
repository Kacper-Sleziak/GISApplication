from django.urls import path
from .views import SubwayStationsGeogsInArea, SubwayStationList

urlpatterns = [
    path("", SubwayStationList.as_view()),
    path("area/", SubwayStationsGeogsInArea.as_view())
]
