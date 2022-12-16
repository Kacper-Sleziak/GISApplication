from django.contrib.gis.db import models

class NycSubwayStationEvents(models.Model):
    subways_gid = models.IntegerField(primary_key=True)
    streets_gid = models.IntegerField(blank=True, null=True)
    measure = models.FloatField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nyc_subway_station_events'


class NycSubwayStations(models.Model):
    gid = models.AutoField(primary_key=True)
    objectid = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    id = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    name = models.CharField(max_length=31, blank=True, null=True)
    alt_name = models.CharField(max_length=38, blank=True, null=True)
    cross_st = models.CharField(max_length=27, blank=True, null=True)
    long_name = models.CharField(max_length=60, blank=True, null=True)
    label = models.CharField(max_length=50, blank=True, null=True)
    borough = models.CharField(max_length=15, blank=True, null=True)
    nghbhd = models.CharField(max_length=30, blank=True, null=True)
    routes = models.CharField(max_length=20, blank=True, null=True)
    transfers = models.CharField(max_length=25, blank=True, null=True)
    color = models.CharField(max_length=30, blank=True, null=True)
    express = models.CharField(max_length=10, blank=True, null=True)
    closed = models.CharField(max_length=10, blank=True, null=True)
    geom = models.PointField(srid=26918, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nyc_subway_stations'


class NycSubwayStationsGeog(models.Model):
    geog = models.GeometryField(geography=True, srid=0, dim=None, blank=True, null=True)
    name = models.CharField(max_length=31, blank=True, null=True)
    routes = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nyc_subway_stations_geog'


class SubwayLines(models.Model):
    route = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subway_lines'
