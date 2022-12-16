# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


# class Airports(models.Model):
#     code = models.CharField(primary_key=True, max_length=3, blank=True, null=True)
#     geog = models.PointField(geography=True, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'airports'

# class Geometries(models.Model):
#     name = models.CharField(max_length=-1, blank=True, null=True)
#     geom = models.GeometryField(srid=0, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'geometries'


class NycCensusBlocks(models.Model):
    gid = models.AutoField(primary_key=True)
    blkid = models.CharField(max_length=15, blank=True, null=True)
    popn_total = models.FloatField(blank=True, null=True)
    popn_white = models.FloatField(blank=True, null=True)
    popn_black = models.FloatField(blank=True, null=True)
    popn_nativ = models.FloatField(blank=True, null=True)
    popn_asian = models.FloatField(blank=True, null=True)
    popn_other = models.FloatField(blank=True, null=True)
    boroname = models.CharField(max_length=32, blank=True, null=True)
    geom = models.MultiPolygonField(srid=26918, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'nyc_census_blocks'


# class NycCensusBlocksMerge(models.Model):
#     geom = models.GeometryField(srid=0, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_census_blocks_merge'


# class NycCensusCounties(models.Model):
#     geom = models.MultiPolygonField(srid=26918, blank=True, null=True)
#     countyid = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_census_counties'


# class NycCensusSociodata(models.Model):
#     tractid = models.CharField(max_length=-1, blank=True, null=True)
#     transit_total = models.IntegerField(blank=True, null=True)
#     transit_private = models.IntegerField(blank=True, null=True)
#     transit_public = models.IntegerField(blank=True, null=True)
#     transit_walk = models.IntegerField(blank=True, null=True)
#     transit_other = models.IntegerField(blank=True, null=True)
#     transit_none = models.IntegerField(blank=True, null=True)
#     transit_time_mins = models.FloatField(blank=True, null=True)
#     family_count = models.IntegerField(blank=True, null=True)
#     family_income_median = models.IntegerField(blank=True, null=True)
#     family_income_mean = models.IntegerField(blank=True, null=True)
#     family_income_aggregate = models.IntegerField(blank=True, null=True)
#     edu_total = models.IntegerField(blank=True, null=True)
#     edu_no_highschool_dipl = models.IntegerField(blank=True, null=True)
#     edu_highschool_dipl = models.IntegerField(blank=True, null=True)
#     edu_college_dipl = models.IntegerField(blank=True, null=True)
#     edu_graduate_dipl = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_census_sociodata'


# class NycCensusTractGeoms(models.Model):
#     geom = models.GeometryField(srid=0, blank=True, null=True)
#     tractid = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_census_tract_geoms'


# class NycCensusTracts(models.Model):
#     geom = models.GeometryField(srid=0, blank=True, null=True)
#     tractid = models.CharField(max_length=-1, blank=True, null=True)
#     transit_total = models.IntegerField(blank=True, null=True)
#     transit_private = models.IntegerField(blank=True, null=True)
#     transit_public = models.IntegerField(blank=True, null=True)
#     transit_walk = models.IntegerField(blank=True, null=True)
#     transit_other = models.IntegerField(blank=True, null=True)
#     transit_none = models.IntegerField(blank=True, null=True)
#     transit_time_mins = models.FloatField(blank=True, null=True)
#     family_count = models.IntegerField(blank=True, null=True)
#     family_income_median = models.IntegerField(blank=True, null=True)
#     family_income_mean = models.IntegerField(blank=True, null=True)
#     family_income_aggregate = models.IntegerField(blank=True, null=True)
#     edu_total = models.IntegerField(blank=True, null=True)
#     edu_no_highschool_dipl = models.IntegerField(blank=True, null=True)
#     edu_highschool_dipl = models.IntegerField(blank=True, null=True)
#     edu_college_dipl = models.IntegerField(blank=True, null=True)
#     edu_graduate_dipl = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_census_tracts'


# class NycHomicides(models.Model):
#     gid = models.AutoField(primary_key=True)
#     incident_d = models.DateField(blank=True, null=True)
#     boroname = models.CharField(max_length=13, blank=True, null=True)
#     num_victim = models.CharField(max_length=1, blank=True, null=True)
#     primary_mo = models.CharField(max_length=20, blank=True, null=True)
#     id = models.FloatField(blank=True, null=True)
#     weapon = models.CharField(max_length=16, blank=True, null=True)
#     light_dark = models.CharField(max_length=1, blank=True, null=True)
#     year = models.FloatField(blank=True, null=True)
#     geom = models.PointField(srid=26918, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_homicides'


# class NycNeighborhoods(models.Model):
#     gid = models.AutoField(primary_key=True)
#     boroname = models.CharField(max_length=43, blank=True, null=True)
#     name = models.CharField(max_length=64, blank=True, null=True)
#     geom = models.MultiPolygonField(srid=26918, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_neighborhoods'


# class NycStreets(models.Model):
#     gid = models.AutoField(primary_key=True)
#     id = models.FloatField(blank=True, null=True)
#     name = models.CharField(max_length=200, blank=True, null=True)
#     oneway = models.CharField(max_length=10, blank=True, null=True)
#     type = models.CharField(max_length=50, blank=True, null=True)
#     geom = models.MultiLineStringField(srid=26918, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'nyc_streets'

