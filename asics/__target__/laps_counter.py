#!/usr/bin/python3
import datetime
import time
import math

trkpt_str = """    <trkpt lon="{0}" lat="{1}">
        <time>{2}</time>
        <ele>{3}</ele>
    </trkpt>
"""

gpx_start = """<gpx version="1.1">
  <metadata>
    <desc>Asics Arena Workout</desc>
    <time>{0}</time>
  </metadata>
  <trk>
    <name>workout</name>
    <type>Running</type>
    <trkseg>
"""

gpx_end = """    </trkseg>
  </trk>
</gpx>
"""

def timestamp_for_gpx(starting_time):
    return datetime.datetime.fromtimestamp(starting_time).strftime('%Y-%m-%dT%H:%M:%SZ')

def draw_circle_of_points(start_x, start_y, number_of_points, radius):
    degree_step = 360 / (number_of_points)
    current_degrees = -90
    x = []
    y = []
    for _ in range(number_of_points):
        current_radians = current_degrees * math.pi / 180
        x.append(start_x + math.cos(current_radians) * radius)
        y.append(start_y + math.sin(current_radians) * radius)
        current_degrees += degree_step
    return x, y

def draw_point_with_offset_in_gps_coordinates(start_lat, start_lon, x_offset, y_offset):
    meters_to_the_x = 0.001 * x_offset
    meters_to_the_y = 0.001 * y_offset
    r_earth = 6378 # km 
    new_lat  = start_lat  + (meters_to_the_x / r_earth) * (180 / math.pi)
    new_lon = start_lon + (meters_to_the_y / r_earth) * (180 / math.pi) / math.cos(start_lat * math.pi/180)
    return new_lat, new_lon


def asics_lap(starting_time, time_taken):
    center_of_asics_arena_x, center_of_asics_arena_y = 23.366119, 42.684413
    list_x, list_y = draw_circle_of_points(0, 0, 100, 36 / 2)

    list_coords_lat = []
    list_coords_lon = []

    length_of_straight = 130 / 2
    # print first half of the circle
    for i in range(len(list_x) // 2):
        x, y = draw_point_with_offset_in_gps_coordinates(center_of_asics_arena_x, center_of_asics_arena_y, list_x[i] + length_of_straight / 2, list_y[i])
        list_coords_lat.append(x)
        list_coords_lon.append(y)

    for i in range(1, 51):
        j = len(list_x) // 2
        x, y = draw_point_with_offset_in_gps_coordinates(center_of_asics_arena_x, center_of_asics_arena_y, list_x[j] + length_of_straight / 2 - length_of_straight*i/50, list_y[j])
        list_coords_lat.append(x)
        list_coords_lon.append(y)

    for i in range(len(list_x) // 2, len(list_x)):
        x, y = draw_point_with_offset_in_gps_coordinates(center_of_asics_arena_x, center_of_asics_arena_y, list_x[i] - length_of_straight / 2 , list_y[i])
        list_coords_lat.append(x)
        list_coords_lon.append(y)

    for i in range(1, 51):
        j = len(list_x) - 1
        x, y = draw_point_with_offset_in_gps_coordinates(center_of_asics_arena_x, center_of_asics_arena_y, list_x[j] - length_of_straight / 2 + length_of_straight * i / 50, list_y[j])
        list_coords_lat.append(x)
        list_coords_lon.append(y)


    resulting_string = ""
    for i in range(len(list_coords_lat)):
        time_str = timestamp_for_gpx( starting_time + ( 1/200 * i * time_taken ) )
        resulting_string += trkpt_str.format(list_coords_lat[i], list_coords_lon[i], time_str, 561)
    
    return resulting_string

def asics_laps_gpx(starting_time, lap_times):
    final_file_as_string = ""
    final_file_as_string += gpx_start.format(timestamp_for_gpx(starting_time))
    current_starting_time = starting_time
    for lap_time in lap_times:
        final_file_as_string += asics_lap(current_starting_time, lap_time)
        current_starting_time += lap_time
    final_file_as_string += gpx_end
    return final_file_as_string

def create_gpx(list_of_lap_times):
    lap_times = []
    for lap_time in list_of_lap_times:
        mins = int(''.join(lap_time[0:2]))
        secs = int(''.join(lap_time[3:5]))
        millis = int(''.join(lap_time[6:8]))
        lap_times.append(60 * mins + secs + millis / 100)

    gpx_file = asics_laps_gpx(time.time(), lap_times)
    return gpx_file
