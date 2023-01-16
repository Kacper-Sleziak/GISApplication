import django_filters

from .models import NycSubwayStations

class SubwayFilter(django_filters.FilterSet):
    EXPRESS_CHOICES = (
            ('express', 'express'),
        )
    name = django_filters.CharFilter(lookup_expr="icontains")
    express = django_filters.ChoiceFilter(
        choices=EXPRESS_CHOICES, null_label='None', null_value='None'
        )

    class Meta:
        model = NycSubwayStations
        fields = ["name", 'borough', 'express']
