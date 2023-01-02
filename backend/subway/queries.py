from django.db import connection
from .utils import convert_coords_arr_to_string
import inspect

def get_subway_stations_as_geogs(borough, name, express):
    """
    return list of tuples in format (x_coordinate, y_coordinate, subway_name)
    with filters given as arguments
    """
    # Getting all arguments
    frame = inspect.currentframe()
    args, _, _, values = inspect.getargvalues(frame)
    args_dict = {}

    # Addint not None args to query
    for i in args:
        if values[i] != None:
            args_dict[i] = values[i]

    query = """
        SELECT 
            ST_X (ST_Transform (geom, 4326)),
            ST_Y (ST_Transform (geom, 4326)),
	        name,
            borough,
            express
        FROM nyc_subway_stations
    """
    
    paramas = 0
    
    for key, value in args_dict.items():
        if paramas >= 1:
            query += "AND "
        else:
            query += "WHERE "
        
        if key == 'name':
            query += f"name LIKE '%{value}%'"
        elif value == 'NULL':
            query += "%s IS NULL " %(key)
        else:
            query += "%s = '%s' " %(key, value)
        
        paramas += 1
    
    with connection.cursor() as cursor:
        cursor.execute(
            query
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
            name,
            borough,
            express
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
            name,
            borough,
            express
        FROM nyc_subway_stations
        WHERE ST_Intersects(geom, ST_Transform(ST_GeomFromText('POLYGON((%s))',4326),ST_SRID(geom)))
        """ % (
            coords
        )) 
        rows = cursor.fetchall()

    return rows
