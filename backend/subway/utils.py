def convert_coords_arr_to_string(coords_arr):
    coords_arr = coords_arr[0]
    last_index = len(coords_arr) - 1
    coords_string = ""

    for index, coords in enumerate(coords_arr):
        coords_string += f"{coords[0]} {coords[1]}"
        if index != last_index:
            coords_string += ", "

    return coords_string
