// Transcrypt'ed from Python, 2021-02-03 21:30:26
var datetime = {};
var math = {};
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_math__ from './math.js';
__nest__ (math, '', __module_math__);
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
import * as __module_datetime__ from './datetime.js';
__nest__ (datetime, '', __module_datetime__);
var __name__ = '__main__';
export var trkpt_str = '    <trkpt lon="{0}" lat="{1}">\n        <time>{2}</time>\n        <ele>{3}</ele>\n    </trkpt>\n';
export var gpx_start = '<gpx version="1.1">\n  <metadata>\n    <desc>Asics Arena Workout</desc>\n    <time>{0}</time>\n  </metadata>\n  <trk>\n    <name>workout</name>\n    <type>Running</type>\n    <trkseg>\n';
export var gpx_end = '    </trkseg>\n  </trk>\n</gpx>\n';
export var timestamp_for_gpx = function (starting_time) {
	return datetime.datetime.fromtimestamp (starting_time).strftime ('%Y-%m-%dT%H:%M:%SZ');
};
export var draw_circle_of_points = function (start_x, start_y, number_of_points, radius) {
	var degree_step = 360 / number_of_points;
	var current_degrees = -(90);
	var x = [];
	var y = [];
	for (var _ = 0; _ < number_of_points; _++) {
		var current_radians = (current_degrees * math.pi) / 180;
		x.append (start_x + math.cos (current_radians) * radius);
		y.append (start_y + math.sin (current_radians) * radius);
		current_degrees += degree_step;
	}
	return tuple ([x, y]);
};
export var draw_point_with_offset_in_gps_coordinates = function (start_lat, start_lon, x_offset, y_offset) {
	var meters_to_the_x = 0.001 * x_offset;
	var meters_to_the_y = 0.001 * y_offset;
	var r_earth = 6378;
	var new_lat = start_lat + (meters_to_the_x / r_earth) * (180 / math.pi);
	var new_lon = start_lon + ((meters_to_the_y / r_earth) * (180 / math.pi)) / math.cos ((start_lat * math.pi) / 180);
	return tuple ([new_lat, new_lon]);
};
export var asics_lap = function (starting_time, time_taken) {
	var __left0__ = tuple ([23.366119, 42.684413]);
	var center_of_asics_arena_x = __left0__ [0];
	var center_of_asics_arena_y = __left0__ [1];
	var __left0__ = draw_circle_of_points (0, 0, 100, 36 / 2);
	var list_x = __left0__ [0];
	var list_y = __left0__ [1];
	var list_coords_lat = [];
	var list_coords_lon = [];
	var length_of_straight = 130 / 2;
	for (var i = 0; i < Math.floor (len (list_x) / 2); i++) {
		var __left0__ = draw_point_with_offset_in_gps_coordinates (center_of_asics_arena_x, center_of_asics_arena_y, list_x [i] + length_of_straight / 2, list_y [i]);
		var x = __left0__ [0];
		var y = __left0__ [1];
		list_coords_lat.append (x);
		list_coords_lon.append (y);
	}
	for (var i = 1; i < 51; i++) {
		var j = Math.floor (len (list_x) / 2);
		var __left0__ = draw_point_with_offset_in_gps_coordinates (center_of_asics_arena_x, center_of_asics_arena_y, (list_x [j] + length_of_straight / 2) - (length_of_straight * i) / 50, list_y [j]);
		var x = __left0__ [0];
		var y = __left0__ [1];
		list_coords_lat.append (x);
		list_coords_lon.append (y);
	}
	for (var i = Math.floor (len (list_x) / 2); i < len (list_x); i++) {
		var __left0__ = draw_point_with_offset_in_gps_coordinates (center_of_asics_arena_x, center_of_asics_arena_y, list_x [i] - length_of_straight / 2, list_y [i]);
		var x = __left0__ [0];
		var y = __left0__ [1];
		list_coords_lat.append (x);
		list_coords_lon.append (y);
	}
	for (var i = 1; i < 51; i++) {
		var j = len (list_x) - 1;
		var __left0__ = draw_point_with_offset_in_gps_coordinates (center_of_asics_arena_x, center_of_asics_arena_y, (list_x [j] - length_of_straight / 2) + (length_of_straight * i) / 50, list_y [j]);
		var x = __left0__ [0];
		var y = __left0__ [1];
		list_coords_lat.append (x);
		list_coords_lon.append (y);
	}
	var resulting_string = '';
	for (var i = 0; i < len (list_coords_lat); i++) {
		var time_str = timestamp_for_gpx (starting_time + ((1 / 200) * i) * time_taken);
		resulting_string += trkpt_str.format (list_coords_lat [i], list_coords_lon [i], time_str, 561);
	}
	return resulting_string;
};
export var asics_laps_gpx = function (starting_time, lap_times) {
	var final_file_as_string = '';
	final_file_as_string += gpx_start.format (timestamp_for_gpx (starting_time));
	var current_starting_time = starting_time;
	for (var lap_time of lap_times) {
		final_file_as_string += asics_lap (current_starting_time, lap_time);
		current_starting_time += lap_time;
	}
	final_file_as_string += gpx_end;
	return final_file_as_string;
};
export var create_gpx = function (list_of_lap_times) {
	var lap_times = [];
	for (var lap_time of list_of_lap_times) {
		var mins = int (''.join (lap_time.__getslice__ (0, 2, 1)));
		var secs = int (''.join (lap_time.__getslice__ (3, 5, 1)));
		var millis = int (''.join (lap_time.__getslice__ (6, 8, 1)));
		lap_times.append ((60 * mins + secs) + millis / 100);
	}
	var gpx_file = asics_laps_gpx (time.time (), lap_times);
	return gpx_file;
};

//# sourceMappingURL=laps_counter.map