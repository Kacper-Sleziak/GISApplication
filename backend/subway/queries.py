from django.db import connection

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

def get_subway_stations_as_geogs_with_parameters(point, radius):
    pass
