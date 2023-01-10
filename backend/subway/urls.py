from django.urls import path
from .views import SubwayStationsGeogs, SubwayStationsGeogsInArea

urlpatterns = [
    path("", SubwayStationsGeogs.as_view()),
    path("area/", SubwayStationsGeogsInArea.as_view())
]
