from django.urls import path
from .views import SubwayStationList, SubwayStationsGeogs

urlpatterns = [
    path("", SubwayStationsGeogs.as_view())
]