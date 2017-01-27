//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//Copyright 2016 Dan Ionel Blaguiescu (dan.blaguiescu@dexterial.com)


var editorFile = 'editor.json';
//var editorFile = 'listing.json';
//var pagefile = 'editor.json';


var loadedFile = 'Dexterial.json';
var loadedFile = 'tests.json';
//var loadedFile = 'editor.json';


var loadcanvas = 0;
var boolEditMode = false;
var GLOBAL_rendertime = 50/3; // 50/3 = 60 fps
var GLOBAL_debugger_maxlen = 2000;
var GLOBAL_debugger = true;

var GlobalEditRadius = 8;
var GlobalEditColorBKG = "rgba(255,255,255,0.5)";
var GlobalEditColorCorner = "rgba(111,111,111,0.7)";
var GlobalEditColorBorder = "rgba(111,111,111,0.4)";

var GlobalEditColorBKGSel = "rgba(111,11,11,0.4)";