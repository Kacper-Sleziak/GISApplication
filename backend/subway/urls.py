from django.urls import path
from .views import SubwayStationsInAreaView, SubwayStationList

urlpatterns = [
    path("", SubwayStationList.as_view()),
    path("area/", SubwayStationsInAreaView.as_view())
]
