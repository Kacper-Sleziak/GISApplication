from django.db import connection
from .utils import convert_coords_arr_to_string

def get_subway_stations_as_geogs():
    """
    return list of tuples in format (x_coordinate, y_coordinate, subway_name)
    """
    with connection.cursor() as cursor:
        cursor.execute(
        """
        SELECT 
            ST_X (ST_Transform (geom, 4326)),
            ST_Y (ST_Transform (geom, 4326)),
	        name
        FROM nyc_subway_stations
        """
        )
        rows = cursor.fetchall()

    return rows

def get_subway_stations_as_geogs_in_area(X, Y, radius):
    """
    return list of tuples in format (x_coordinate, y_coordinate, subway_name)
    for given paramaters X, Y and radius of circle area where X and Y are center of the circle 
    """
    with connection.cursor() as cursor:
        cursor.execute(
        """
        SELECT 
            ST_X (ST_Transform (geom, 4326)),
            ST_Y (ST_Transform (geom, 4326)),
            name
        FROM nyc_subway_stations
        WHERE ST_DWithin(geom, ST_Transform(ST_GeomFromText('POINT(%f %f)',4326),ST_SRID(geom)), %f)
        """ % (
            X,
            Y,
            radius
        ))
        rows = cursor.fetchall()

    return rows

def get_subway_stations_as_geogs_in_polygon_area(coords):
    coords = convert_coords_arr_to_string(coords)

    with connection.cursor() as cursor:
        cursor.execute(
        """
        SELECT 
            ST_X (ST_Transform (geom, 4326)),
            ST_Y (ST_Transform (geom, 4326)),
            name
        FROM nyc_subway_stations
        WHERE ST_Intersects(geom, ST_Transform(ST_GeomFromText('POLYGON((%s))',4326),ST_SRID(geom)))
        """ % (
            coords
        )) 
        rows = cursor.fetchall()

    return rows
