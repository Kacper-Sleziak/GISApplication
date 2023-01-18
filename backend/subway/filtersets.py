import django_filters

from .models import NycSubwayStations

class SubwayFilter(django_filters.FilterSet):
    EXPRESS_CHOICES = (
            ('express', 'express'),
        )

    BOROUGH_CHOICES = (
            ('Bronx', 'Bronx'),
            ('Brooklyn', 'Brooklyn'),
            ('Manhattan', 'Manhattan'),
            ('Queens', 'Queens'),
            ('Staten Island', 'Staten Island')
        )

    name = django_filters.CharFilter(lookup_expr="icontains")
    borough = django_filters.ChoiceFilter(
        choices=BOROUGH_CHOICES
        )
    express = django_filters.ChoiceFilter(
        choices=EXPRESS_CHOICES, null_label='None', null_value='None'
        )

    class Meta:
        model = NycSubwayStations
        fields = ["name", 'borough', 'express']
