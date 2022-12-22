from django.urls import path
from .views import SubwayStationList, SubwayStationsGeogs, SubwayStationsGeogsInArea

urlpatterns = [
    path("", SubwayStationsGeogs.as_view()),
    path("area/", SubwayStationsGeogsInArea.as_view())
]