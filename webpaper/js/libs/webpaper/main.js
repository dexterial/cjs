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



var eventLoader = loadEvents();
if (eventLoader !== true) {
    //alert(eventLoader);
}
var eventholder;
var loadedPageInit = {};
var interval1, interval2;

var GLOBAL_IE = detectIE();


var GLOBAL_Path2D = checkPath2D();
//console.log(GLOBAL_Path2D);
var GLOBAL_delay0 = new Date();
var GLOBAL_delay1 = new Date();
var GLOBAL_delay2 = new Date();
var GLOBAL_delay3 = new Date();
var GLOBAL_rem = getRootElementFontSize();

//alert(window.devicePixelRatio);

var GLOBAL_loaded = false;
var GLOBAL_renderer = false;
paper.install(window);


//window.setInterval(function(){cdebug("zz",false,true)},100);

// load json from file, to be changed to allow loading json from external file or from local storage or from server directly
$.getJSON(loadedFile, function (jsonPage) {
    
    if(boolEditMode){
    
        $.getJSON(editorFile, function (jsonPageEditor) {

            document.title = "<EDIT MODE>" + jsonPage.title;
            pre_load_children(jsonPageEditor);
            
            loadedPage = $.extend(true,{},jsonPage);
            loadedPage.shape.masspoint = [0.5,0.25];
            loadedPage.shape.scale = [loadedPage.shape.scale[0]/2,loadedPage.shape.scale[1]/2];

            loadPageInEditor(false);
            
            //GLOBAL_debugger = true;
        });
    }else{

            //clearInterval(interval1);
            document.title = jsonPage.title;
            //GLOBAL_debugger = jsonPage.debug;
            pre_load_children(jsonPage);
            GLOBAL_renderer = true;
            //renderer([jsonPage.name]);
            //renderer([jsonPage.name]);
            
            drawProjects(paper);
            
            //interval1 = setInterval(function(){renderer([jsonPage.name]);},GLOBAL_rendertime);
 
    };
});

function renderer(arrPages){
    try {
        if(GLOBAL_renderer){
            //cdebug("RENDER START",true,false,2)();
            for(var i = 0,len = arrPages.length;i<len;i++){
                if(window[arrPages[i]]){
                    drawChildren(window[arrPages[i]]);
                    //paper.view.draw();
                }
            }
            GLOBAL_loaded = true;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function remloadedPage(cEl,pageId){
        
    try{
        //window["eventholder"] = {"cElHover":[],"cElFocus":[],"cElActive":[]};
        if(!cEl){
            cEl = loadedPageAct;
        }else{
            cEl = window[cEl.pageId];
        }
        if(!pageId)pageId = "Z";
        //if(!window[pageId])return false;
        //console.log(cEl.tag);
        
        
        var boolAllIsWell = true;
        switch(cEl.tag){
            case "page": //draw envelope element
                if(!window[pageId])return false;
                delete window[pageId];
                window["editorPage_fabric"].children = [];
                window["editorPage_fabric"].shape.redraw = true;
            break;
            case "canvas": //draw canvas element
                //console.log(pageId + "_" + cEl.name + "_project");
                delete window[pageId + "_" + cEl.name];
                var child = document.getElementById(pageId + "_" + cEl.name + "_project");
                if(child)document.body.removeChild(child);
            break;
            case "shape": //draw shape 
                delete window[cEl.parentName + "_" + cEl.name ];
            break; 
        }
        
        if(cEl.children){
            for(var i = 0, len = cEl.children.length ;i < len; i++){
                boolAllIsWell = (boolAllIsWell && remloadedPage(cEl.children[i],pageId));
            };
        }
        
        
        
        return boolAllIsWell;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function loadPageInEditor(boolRemFirst) {
    
    try {
        
        //clearInterval(interval1);
        //clearInterval(interval2);
        //drawChildren(loadedPageAct,"Z");

        if(boolRemFirst){
            remloadedPage(loadedPageAct,"Z");
        }
        //fabric.children = [];
        loadedPageAct = $.extend(true, {}, loadedPage);
        
        var jsonPageEditor = window["editorPage"];
        
        jsonPageEditor.elements = $.extend(true, jsonPageEditor.elements, loadedPageAct.elements);
        //jsonPageEditor.states = $.extend(true, jsonPageEditor.states, loadedPageAct.states);
        //jsonPageEditor.state = $.extend(true, jsonPageEditor.state, loadedPageAct.state);
        jsonPageEditor.shapes = $.extend(true, jsonPageEditor.shapes, loadedPageAct.shapes);
        
        var preview = loadedPageAct.children[loadcanvas];
        pre_load_children(loadedPageAct,"Z");
        
        var fabric = window["editorPage_fabric"];
        fabric.shape.points = preview.shape.points;
        fabric.shape.scale = [preview.shape.scale[0]/2,preview.shape.scale[1]/2];


        fabric.children = preview.children;
        fabric.children = $.extend(true,[],preview.children);
        resetEditorCEls(fabric,preview);
        
        
        pre_load_children(fabric,"editorPage","fabric");
        
        GLOBAL_renderer = true;
        renderer(["Z","editorPage"]);
        //renderer(["Z","editorPage"]);
        //interval1 = setInterval(function(){renderer(["Z","editorPage"]);},GLOBAL_rendertime);
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function resetEditorCEls(fabric,preview) {
        
    try {
        
        if(fabric.children){
            //cdebug(fabric.children.length)();
            for (var i = 0; i < fabric.children.length; i++) {
                //if(preview.children){
                    fabric.children[i].enabled = false;
                    fabric.children[i].events = null;
                    fabric.children[i].states = null;
                    fabric.children[i].shape = preview.children[i].shape;
                    fabric.children[i].shape.redraw = true;
                    resetEditorCEls(fabric.children[i],preview.children[i]);
                //}
            }
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



function getRootElementFontSize() {
    // Returns a number
    return parseFloat(window.getComputedStyle(document.documentElement).fontSize)/window.devicePixelRatio;//Math.parseFloat(
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}



//var context = "ALIASED LOG:"
//var logalias;
//
//if (console.log.bind === 'undefined') { // IE < 10
//    logalias = Function.prototype.bind.call(console.log, console, context);
//}
//else {
//    logalias = console.log.bind(console, context);
//}
//
//logalias('Hello, world!');

//define([], function () {
//
//    var enableDebug = true;
//    var separator = ">";    
//
//    function bind(f, thisArg, ctx) {
//        if (f.bind !== 'undefined') { // IE < 10
//            return Function.prototype.bind.call(f, thisArg, ctx);
//        }
//        else {
//            return f.bind(thisArg, ctx);
//        }
//    }
//
//    function newConsole(context, parentConsole) {
//        var log;
//        var debug;
//        var warn;
//        var error;
//
//        if (!parentConsole) {
//            parentConsole = console;
//        }
//
//        context = context + separator;
//
//
//        if (enableDebug) {
//            debug = bind(console.log, console, context + "DEBUG" + separator);
//        } else {
//            debug = function () {
//                // suppress all debug messages
//            };
//        }
//
//        log = bind(console.log, console, context);
//
//        warn = bind(console.warn, console, context);
//
//        error = bind(console.error, console, context);
//
//        return {
//            debug: debug,
//            info: log,
//            log: log,
//            warn: warn,
//            error: error,
//            /* access console context information */
//            context: context,
//            /* create a new console with nested context */
//            nest: function (subContext) {
//                return newConsole(context + subContext, this);
//            },
//            parent: parentConsole
//        };
//    }
//
//    return newConsole("");
//});

/**
 * Function cdebug
 * Description This function
 * @param {type} msg
 * @param {type} clearMe
 * @param {type} boolConsole
 * @param {type} intConsoleNo
 */
var cdebug = function() {
    // Put your extension code here
    //var args = Array.prototype.slice.call(arguments);		
    //args.unshift(console);
    //0-msg, 1-clearMe, 2-boolConsole, 3-intConsoleNo
    try {
        var d = new Date();
        var intConsoleNo = arguments[3] ? arguments[3] :1;
        var dl = window["GLOBAL_delay" + intConsoleNo];
        var strDelay  =  Math.abs(d.getTime() - dl.getTime());
        strDelay = String("00000" + strDelay).slice(-5);
        var strNow =  [d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
        strNow =  String("00" + strNow[0]).slice(-2) + ":" + String("00" + strNow[1]).slice(-2) + ":" + String("00" + strNow[2]).slice(-2) + ":" + String("000" + strNow[3]).slice(-3);

        var cEl_debug = window["editorPage_stats_log"+intConsoleNo];
        var msg = arguments[0];
        if(kind(msg)==="Object" || kind(msg)==="Array"){
            msg = JSON.stringify(msg);
        }

        var strMsgOld = "";
        var strMsg = "";
        var clearMe = arguments[1] ? arguments[1] :false;
        var boolConsole = arguments[2] ? arguments[1] :false;

        if(cEl_debug && GLOBAL_debugger){
            strMsgOld = cEl_debug.data.values.text;
            if(strMsgOld && (strMsgOld.length>GLOBAL_debugger_maxlen))clearMe = true;

            if (clearMe){
                if(clearMe)console.API.clear();
                strMsg = strNow + "(" + strDelay + "): " + msg + "\\n" + strNow + "(" + strDelay + ")";
            }else{
                //make append text function
                strMsg =  strNow + "(" + strDelay + "): " + msg + "\\n" + strMsgOld;
            }

            if(cEl_debug.data.values.temp){
                //set_cEl_text(cEl_debug, strMsg);
                cEl_debug.data.values.temp.valueOld = null;
                cEl_debug.data.values.text = strMsg;
                //cEl_debug.shape.redraw = true;
                cEl_debug.style.redraw = true;
                window[cEl_debug.parentName].shape.redraw = true;
                drawChildren(cEl_debug);

            }
        }else{
            if(GLOBAL_debugger){
                boolConsole = true;
            }
        }
        
        if(boolConsole){
            strMsg =  strNow + "(" + strDelay + "): " + msg;
            window["GLOBAL_delay" + intConsoleNo] = d
            if (console.log.bind === 'undefined') { // IE < 10
                return Function.prototype.bind.apply(console.log, console, strMsg);
            }else {
                return console.log.bind(console, strMsg);
            }  
        }else{
            window["GLOBAL_delay" + intConsoleNo] = d;
            return console.log;
        }
        
    } catch (e) {
        var err = listError(e);
        console.log(err.message);
        return err;
    }
};

// Note the extra () to call the original console.log
//cdebug("Foo")();


//function cdebug(arg1,arg2,arg3,arg4,arg5){
//    log("test " + arg1)();
//}


if (typeof console._commandLineAPI !== 'undefined') {
    console.API = console._commandLineAPI; //chrome
} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
    console.API = console._inspectorCommandLineAPI; //Safari
} else if (typeof console.clear !== 'undefined') {
    console.API = console;
}



function listError(e,boolFullStack){
    
    try {
        var eDesc = {} , stack , stackLines;
        eDesc.name = e["name"];
        eDesc.message = e["message"];
        stack = e["stack"] || e["stacktrace"] || "";
        if (!stack && (window.opera || e.message)) { //Opera
            stack = e.message;
        }
        if (stack) {
            eDesc["stack"] = getStack(stack,boolFullStack);
        }else{
            eDesc["stack"] = "no stack";
        }
        return eDesc;
        
    } catch (e) {
        console.log(e);
    }
}
function getStack(stack,boolFullStack){
    
    try {
        
        var lines, stackOut = [];
        //console.log(stack);
        lines = stack.split('\n');
        
        var len = boolFullStack ? lines.length : 2;
        for (var i=1 , line , subline; i<len; i++) {
            line = lines[i];
            
            if(line.split("(").length===2){
                stackOut.push(getStackLineObj(line));
            }else{
                subline = line.substring(line.indexOf(" at ",line.indexOf("(",2)+1),line.lastIndexOf(")",line.length - 2)+1);
                line = line.substring(0,line.indexOf("(",2)+1) + line.substring(line.lastIndexOf(")",line.length - 2)+3);

                stackOut.push(getStackLineObj(line,boolFullStack));
                if(!stackOut[i-1].substacks){
                    stackOut[i-1].substacks = [];
                }
                stackOut[i-1].substacks.push(getStackLineObj(subline,boolFullStack));
            }
        }
        //console.log(JSON.stringify(stackOut));
        return stackOut;
        
    } catch (e) {
        console.log(e);
    }
}

function getStackLineObj(line,boolFullStack){
    try {
        var fname, url, filename, lineno, column, startIndex, endIndex;
        startIndex = line.indexOf(" at ") + 4;
        endIndex = line.indexOf("(")-1;
        fname = line.substring(startIndex, endIndex) || 'anonymous';
        startIndex = endIndex + 2;
        endIndex = line.indexOf("(")-1;

        startIndex = line.lastIndexOf(":")+1;
        column = line.substring(startIndex,line.length -1);

        endIndex = startIndex-1;
        startIndex =  line.lastIndexOf(":",endIndex-1);
        lineno = line.substring(startIndex,endIndex);

        endIndex = startIndex;
        startIndex =  line.lastIndexOf("/",endIndex-1)+1;
        if(0<startIndex && startIndex<endIndex){
            filename = line.substring(startIndex,endIndex);
            endIndex = startIndex;
            startIndex =  line.indexOf("(")+1;
            if(0<startIndex && startIndex<endIndex && boolFullStack)url = line.substring(startIndex,endIndex);
        }
        return {"function":fname,"lineno":lineno,"column":column,"filename":filename,"url":url};

    } catch (e) {
        console.log(e);
    }
}

/**
 * Function kind
 * Description This function
 * @param {type} item
 */
function kind(item) {
    try {
        
        var getPrototype = function(item) {
            return Object.prototype.toString.call(item).slice(8, -1);
        };
        var kind, Undefined;
        if (item === null ) {
            kind = 'null';
        } else {
            if ( item === Undefined ) {
                kind = 'undefined';
            } else {
                var prototype = getPrototype(item);
                if ( ( prototype === 'Number' ) && isNaN(item) ) {
                    kind = 'NaN';
                } else {
                    kind = prototype;
                }
            }
        }
        return kind;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

/**
 * Function isNumber
 * Description This function
 * @param {type} n
 */
function isNumber(n) {
    try{
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }catch(e){
        return false;
    }
} 

/**
 * Function showProps
 * @param {type} obj
 * @param {type} arrLvl
 * @param {type} arrMaxLen
 */
function showProps(obj,arrLvl,arrMaxLen) {
    try {
        
        //return JSON.stringify(obj);
        return JSON.prune(obj,arrLvl,arrMaxLen);
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function mirror(strJson) {
    try {
        return strJson;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}




function getSetHtmlEl(cEl,parentName){
    try {
        
        //cdebug(cEl.tag)();
        switch(cEl.tag){
            case "page": //draw canvas element
                
            break;
            case "project": //draw canvas element

                var canvEl = document.getElementById(parentName + "_" + cEl.name+"_project");
                if(!canvEl){
                    var canvEl = document.createElement("canvas");
                    canvEl.style.position = "absolute";
                    document.body.appendChild(canvEl);
                    canvEl.id = parentName + "_" + cEl.name + "_project";
                }
                return canvEl;
                
            break;
        }    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function setGetPage(cEl){
    try {
        
        paper.name = cEl.name;
        paper.parentName = "";
        paper.tag = cEl.tag;
        paper.class = cEl.class;
        
        //cdebug(paper.tag)();
        
        paper.shape = $.extend(true,{},cEl.shape);
        paper.style = $.extend(true,{},cEl.style);
        
        paper.data = {
            "text" : $.extend(true,{},cEl.text),
            "clipboard" : $.extend(true,{},cEl.clipboard),
            "styles" : $.extend(true,{},cEl.styles),
            
            "rules" : $.extend(true,{},cEl.rules),
            "state" : $.extend(true,{},cEl.state),
            "states" : $.extend(true,{},cEl.states),
            "shapes" : $.extend(true,{},cEl.shapes),
            "elements" : $.extend(true,{},cEl.elements)
        };
        paper.loaded = true;
        
        return paper;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function projectSwitch(toProject){
    try {
        
        if(paper.project && paper.project.name && paper.project.name===toProject){
            return true;//paper.project;
        }
        
        var projects = paper.projects;
        for(var i = 0; i<projects.length; i++){
            if(projects[i].name && projects[i].name === toProject){
                projects[i].activate();
                //cdebug("project switch " + projects[i].name)();
                return projects[i];
            }
        }
        return null;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }  
}


function setGetProject(cEl,parentName){
    try {
        
        //cdebug(cEl.tag + "  of   " + cEl.name)();
        
        var project = projectSwitch(cEl.name);
        if(project)return project;
        //cdebug(cEl.tag + "  of   " + cEl.name)();
        
        var cEl_canv = getSetHtmlEl(cEl,parentName);
        
        //cdebug(paper.projects.length + " setGetProject " + cEl.name + " >>> tag:" + cEl.tag + " on canvas " + cEl_canv.id)();
        
        paper.setup(cEl_canv);
        project = paper.project;
        
        //var project = paper.project;
        
        //var project = paper.project;
        project.debug = cEl.debug;
        project.tab = cEl.tab;
        
        project.name = cEl.name;
        project.tag = cEl.tag;
        project.class = cEl.class;
        
        
        project.visible = cEl.visible;
        project.focus = cEl.focus;
        project.hover = cEl.hover;
        project.active = cEl.active;
        
        project.style = $.extend(true,{},cEl.style);
        project.events = $.extend(true,{},cEl.events);
        project.data = $.extend(true,{},cEl.data);
        project.shape = $.extend(true,{},cEl.shape);
        
        return project;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 

function setGetLayer(cEl){
    
    try {
        var layers = paper.project.layers;
        var actLayer = paper.project.activeLayer;
        for(var i = 0; i<layers.length; i++){
            if(layers[i].name && layers[i].name === cEl.name){
                if(actLayer.name && actLayer.name!==cEl.name){
                    if(layers[i].visible){
                        cdebug(" layer change from " + actLayer.name + " to " + layers[i].name)();
                        layers[i].activate();
                    } 
                }
                return layers[i];
            }
        }
        
        var layer = new Layer;
        layer.name = cEl.name;
        layer.tab = cEl.tab;
        layer.debug = cEl.debug;
        
        layer.tag = cEl.tag;
        layer.class = cEl.class;
        
        layer.visible = cEl.visible;
        layer.focus = cEl.focus;
        layer.hover = cEl.hover;
        layer.active = cEl.active;
        
        layer.shape = cEl.shape;
        
        paper.project.addLayer(layer);
        //layer.activate();
        
        
        return layer;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 


function setGetShape(cEl){
    try {

        var shape = new paper.Path();
        shape.name = cEl.name;
        shape.tab = cEl.tab;
        shape.debug = cEl.debug;
        
        shape.name = cEl.name;
        shape.tag = cEl.tag;
        shape.class = cEl.class;
        
        shape.visible = cEl.visible;
        shape.focus = cEl.focus;
        shape.hover = cEl.hover;
        shape.active = cEl.active;
        
        shape.events = $.extend(true,{},cEl.events);
        shape.data = $.extend(true,{},cEl.data);
        shape.shape = $.extend(true,{},cEl.shape);
        shape.rules = $.extend(true,{},cEl.rules);
        shape.states = $.extend(true,{},cEl.states);
        

        return shape;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 


function pre_load_children(cEl,parentName){
    try{
        if(!cEl)return true;
        var boolAllIsWell = true;
        
        
        
        if(cEl.elId){
            if(!cEl.loaded){
                //cdebug(cEl.name)();
                cEl = $.extend(true, cEl, paper.data.elements[cEl.elId]);
                //cEl.loaded = true;
            }
        }
        
        //cdebug(cEl.tag + ": " + cEl.name + " >>> parentName: " + parentName)();
        
        switch(cEl.tag){
            
            case "page":
                parentName = "";
                var page = setGetPage(cEl);
                
                //cdebug()();
                
                setEventHolder(page.name);
                
                setStyle_cEl(page);
                
                //cdebug(cEl.style)();
                
                
                page.loaded = true;
                
            break;
            
            case "project": //draw page element
                
                
                
                // attach project.name to paper global scope
                var project = setGetProject(cEl,parentName);
                
                //cdebug(paper.projects.length + " setup project " + cEl.name)();
                
                project.parentName = parentName;
                
                setStyle_cEl(project);
                
                // add parentName
                

//                var path = new paper.Path.Rectangle([75, 75], [100, 100]);
//		path.strokeColor = 'black';
//                path.name ="zzz";
//
//                var items = project.getItem({
//                    "id" :1
//                });
//                cdebug(items)();

                //cdebug(paper.project.name)();
                
                
                project.loaded = true;
                
            break;
            case "layer": //draw canvas element
                
//                var layer = setGetLayer(cEl);
//                //cdebug(paper.project.layers)();
//                layer.parentName = parentName;
//                
//                setStyle_cEl(layer);
//                
//                layer.loaded = true;
                
            break;
            case "shape": //draw shape
                
                var shape = setGetShape(cEl);
                
                //paper.activeLayer.addChild();
                
                shape.parentName = parentName;
                shape.projectName = paper.project.name;
                
                setStyle_cEl(shape);
                
                //cdebug(shape.parentName + "_" +shape.name)();
                //cdebug(paper.project.activeLayer.getItem({"name":shape.name}))();
                
                shape.loaded = true;
                
            break; 
        }
        
        
        var boolChildren = cEl.children ? true: false;
        //cdebug(cEl.parentName + "_" + cEl.name + " " + boolChildren,false,true,1)();
        if(boolChildren){
            for(var i = 0, len = cEl.children.length ;i < len; i++){
                boolAllIsWell = (boolAllIsWell && pre_load_children(cEl.children[i],parentName + "_" + cEl.name));
            };
        }
        return boolAllIsWell;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function drawProjects(cEl,boolRedraw){
    
    try{
        
        //if(!cEl)return true;
        var boolAllIsWell = true;
        //if(cEl.tag === "layer"){boolRedraw = cEl.shape.redraw;};
        boolAllIsWell = (boolAllIsWell && draw_cEl(cEl,boolRedraw));
        
        
        
        var boolHasChildren = cEl.children ? true: false;
        var boolHasLayers = cEl.layers ? true: false;
        var boolHasProjects = cEl.projects ? true: false;
        
        //cdebug(cEl.name + " " + boolHasProjects + " " + boolHasLayers + " " + boolHasChildren)();
        
        
        if(boolHasProjects){
            for(var i = 0;i < cEl.projects.length; i++){
                //if(cEl.layers[i].visible){
                    boolAllIsWell = (boolAllIsWell && drawProjects(cEl.projects[i],boolRedraw));
                //}
            };
            
        }

        if(boolHasLayers){
            for(var i = 0;i < cEl.layers.length; i++){
                //if(cEl.layers[i].visible){
                    boolAllIsWell = (boolAllIsWell && drawProjects(cEl.layers[i],boolRedraw));
                //}
            };
        }
        
        if(boolHasChildren){
            for(var i = 0;i < cEl.children.length; i++){
                //cdebug(cEl.children[i].name)();
                //if(cEl.children[i].visible){
                    boolAllIsWell = (boolAllIsWell && drawProjects(cEl.children[i],boolRedraw));
                //}
            };
        }
        
        
        return boolAllIsWell;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


//function drawChildren(cEl,boolRedraw){
//    
//    try{
//        //if(!cEl)return true;
//        var boolAllIsWell = true;
//        if(cEl.tag === "layer"){boolRedraw = cEl.shape.redraw;};
//        boolAllIsWell = (boolAllIsWell && draw_cEl(cEl,boolRedraw));
//        
//        var boolHasChildren = cEl.children ? true: false;
//        
//        if(boolHasChildren){
//            for(var i = 0;i < cEl.children.length; i++){
//                boolAllIsWell = (boolAllIsWell && drawChildren(cEl.children[i],boolRedraw));
//            };
//        }
//        
//        return boolAllIsWell;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};


function draw_cEl(cEl,boolRedraw){
    try{
        //if(!cEl){return false;};
        
        switch(cEl.tag){
            
            case "page":
                
                if(!cEl.shape.redraw){return true;};
                
                if(cEl.style.redraw){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                
                draw_cEl_page(cEl);
                //cdebug(cEl.shape)();
                cEl.shape.redraw = false;
            
            break;
            case "project": //draw page element
                if(!cEl.shape.redraw){return true;};
                //cdebug("draw project " + cEl.name)();
//                cdebug("draw page " + cEl.name,true,false,2)();
                // compute style
                if(cEl.style.redraw){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                draw_cEl_project(cEl);
                
                cEl.shape.redraw = false;
            break;
            case "layer": //draw canvas element
//                if(!cEl.shape.redraw){return true;};
//                
//                if(cEl.style.redraw){
//                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
//                }
//                
//                //cdebug("draw canvas")();
//                draw_cEl_layer(cEl);
//                cEl.style.redraw = false;
            break;
            case "shape": //draw shape
                
//                //it renders all shape elements if layer is reset ..... so the shape.redraw does not do much, 
//                //perhaps load the image of the shape in a temp value of the cel.shape element and 
//                //just repaint the canvas as the old time, that can speed up stuff.
//              

                if(boolRedraw){
                    //cEl.shape.redraw = true;
                }else{
                    if(!cEl.shape.redraw){
                        return true;
                    };
                }
                // compute style
                if(cEl.style.redraw){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":null,"border-top-width":"0px","border-top-color":null});
                }
                
                //cdebug(cEl.shape)();
                
////                if(cEl.layerId !== "control" && cEl.layerId !== "stats" )cdebug("draw shape " + cEl.name + " , redraw " + cEl.shape.redraw,false,false,2)();
                draw_cEl_shape(cEl);
                cEl.shape.redraw = false;
                cEl.style.redraw = false;
                //cdebug("END draw shape " + cEl.name + " , redraw " + cEl.shape.redraw,false,false,2)();
            break;
        }
        
        
        // TODO, implement a better logic for failure
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function draw_cEl_page(cEl){
    
    try {
        
        var w = window.innerWidth;
        var h = window.innerHeight;
        
        if (!cEl.shape.points){
            cEl.shape.points = paper.data.shapes[cEl.shape.name];
        }
        
        //cdebug(cEl.style)();
        
        var borderTop = cEl.style.calc["border-top-width"] ? size2px(cEl.style.calc["border-top-width"],false):0;
        var borderRight = cEl.style.calc["border-right-width"] ? size2px(cEl.style.calc["border-right-width"],false):0;
        var borderBottom = cEl.style.calc["border-bottom-width"] ? size2px(cEl.style.calc["border-bottom-width"],false):0;
        var borderLeft = cEl.style.calc["border-left-width"] ? size2px(cEl.style.calc["border-left-width"],false):0;
        
//        cdebug(borderTop + " " +borderRight + " " +borderBottom + " " +borderLeft)();

        w = w - borderRight - borderLeft;
        h = h - borderTop - borderBottom;

        


        if(!cEl.shape.w>0){
            //cEl.shape.w = w;
            cEl.shape.w = Math.floor(w * cEl.shape.scale[0] * Math.abs(cEl.shape.points[2][0]-cEl.shape.points[0][0])) ;
        }; 
        if(!cEl.shape.h>0){
            //cEl.shape.h = h;
            cEl.shape.h = Math.floor(h * cEl.shape.scale[1] * Math.abs(cEl.shape.points[2][1]-cEl.shape.points[0][1])) ;
        };
        
        cEl.shape.left = Math.floor(w * cEl.shape.masspoint[0] + cEl.shape.w * cEl.shape.points[0][0]) ;
        cEl.shape.top = Math.floor(h * cEl.shape.masspoint[1] + cEl.shape.h * cEl.shape.points[0][1]) ;
        
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function draw_cEl_project(cEl){
    
    try {
        
        if(!cEl.shape.redraw){return true;};
        if(!cEl.visible){
            //cdebug("not visible")();
            cEl.view.element.style.visibility = "hidden";
            return true;
        }
        //cdebug("draw_cEl_project" + cEl.name)();
        
        //setGetProject(cEl,cEl.name);
        projectSwitch(cEl.name);
        
        //paper.project.activeLayer.removeChildren();
        //paper.project.activeLayer.removeChildren();

        if(cEl.view.element.style.visibility === "hidden")
            cEl.view.element.style.visibility = "visible";
        
        
        //cdebug(paper.shape)();
        
        var w = paper.shape.w;
        var h = paper.shape.h;
        
        //setGetProject(cEl,cEl.parentName);
        
        
        if (!cEl.shape.points){
            cEl.shape.points = paper.data.shapes[cEl.shape.name];
        }
        
        var borderTop = cEl.style.calc["border-top-width"] ? size2px(cEl.style.calc["border-top-width"],false):0;
        var borderRight = cEl.style.calc["border-right-width"] ? size2px(cEl.style.calc["border-right-width"],false):0;
        var borderBottom = cEl.style.calc["border-bottom-width"] ? size2px(cEl.style.calc["border-bottom-width"],false):0;
        var borderLeft = cEl.style.calc["border-left-width"] ? size2px(cEl.style.calc["border-left-width"],false):0;
        
//        cdebug(borderTop + " " +borderRight + " " +borderBottom + " " +borderLeft)();

        w = w - borderRight - borderLeft;
        h = h - borderTop - borderBottom;

        


        if(!cEl.shape.w>0){
            //cEl.shape.w = w;
            cEl.shape.w = Math.floor(w * cEl.shape.scale[0] * Math.abs(cEl.shape.points[2][0]-cEl.shape.points[0][0])) ;
        }; 
        if(!cEl.shape.h>0){
            //cEl.shape.h = h;
            cEl.shape.h = Math.floor(h * cEl.shape.scale[1] * Math.abs(cEl.shape.points[2][1]-cEl.shape.points[0][1])) ;
        };
        
        cEl.shape.left = Math.floor(w * cEl.shape.masspoint[0] + cEl.shape.w * cEl.shape.points[0][0]) ;
        cEl.shape.top = Math.floor(h * cEl.shape.masspoint[1] + cEl.shape.h * cEl.shape.points[0][1]) ;
        
        
        
        //if(!cEl.shape.redraw){return true;};
        
//        var cEl_canv = document.getElementById(cEl.name + "_project");
//        
//        //cdebug("here " +cEl_canv.id)();
//        
//        
//        if(!cEl_canv){
//            return false;
//        }
//        
//        if(!cEl.visible && cEl.loaded){
//            if(cEl_canv.style.visibility !== "hidden")cEl_canv.style.visibility = "hidden";
//            cEl.shape.redraw = false;
//            return true;
//        }else{
//            if(cEl_canv.style.visibility !== "visible")cEl_canv.style.visibility = "visible";
//        }
        
        

        //console.log(cEl.shape.w + " " + cEl.shape.h);
//        cEl.shape.temp = {
//            "cpBorder":{
//                "x":cEl.shape.left + Math.floor(cEl.shape.w * cEl.shape.masspoint[0] + cEl.shape.w * cEl.shape.points[0][0]),
//                "y":cEl.shape.top + Math.floor(cEl.shape.h * cEl.shape.masspoint[1] + cEl.shape.h * cEl.shape.points[0][1])
//            }
//        };
//        cEl.shape.temp.cpBorder.x1=cEl.shape.temp.cpBorder.x+cEl.shape.w;
//        cEl.shape.temp.cpBorder.y1=cEl.shape.temp.cpBorder.y+cEl.shape.h;
        
        // reset canvas on resize or move ???
        
        //cdebug(cEl.shape)();
        
        //cdebug(cEl.visible)();
        
        //cEl.visible = cEl.visible;
        
        cEl.view.viewSize.width = cEl.shape.w;
        cEl.view.viewSize.height = cEl.shape.h;
        
        
        
        

        //cEl_canv.width = cEl.shape.w;
        //cEl_canv.height = cEl.shape.h;
        
//        var cEl_ctx = cEl_canv.getContext('2d');
//        cEl_ctx.textBaseline="alphabetic";
//        cEl_ctx.textAlign="left";
        
        //cEl_canv.contentEditable = true;

        // reset canvas style stuff
        //cdebug(cEl.shape.left)();
        
        var cEl_canv = cEl.view.element;
        if(cEl.style.calc["box-shadow"])cEl_canv.style.boxShadow = cEl.style.calc["box-shadow"];
//        //console.log(JSON.stringify(cEl.style.calc));
        cEl_canv.style.border = "solid " + cEl.style.calc["border-top-width"] + " " + cEl.style.calc["border-top-color"] ;
        cEl_canv.style.left = cEl.shape.left + "px";
        cEl_canv.style.top =  cEl.shape.top + "px";
        
        //cEl_canv.style.border = "solid 1px blue";//cEl_canv.cStyle["border"];

//        if(cEl.debug){
//            drawGrid(cEl_canv);
//            if(!cEl.data.temp)cEl.data.temp = {"drawPoints":null,"rf":[]};
//        }
        
        
        if(cEl.style.calc["background-image"]){
            var url = cEl.style.calc["background-image"];
            url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];

            //cdebug(cEl.name + " >>> " + url + " start on " + paper.project.name)();

    //            layer.addChild(new paper.Raster(url, paper.view.bounds.center));

    //            // TODO , add more logic from css with scale "auto" stuff
            var raster = new paper.Raster(url);
            raster.sourceUrl = url;
            raster.onLoad = function(){

    //                var scaleX = paper.view.bounds.width/raster.width;
    //                var scaleY = paper.view.bounds.height/raster.height;
    //                raster.scale([scaleX,scaleY]);
                raster.fitBounds(cEl.view.bounds,true);
                //cdebug(cEl.name + " >>> " + raster.sourceUrl +" end on " + paper.project.name)();
                //boolImgLoaded=true;
            };
        }

        
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}


//var boolImgLoaded = false;




function draw_cEl_layer(cEl) {
    
    try {
        
        var layer = setGetLayer(cEl);
        //cdebug("layer " + cEl.name)();
        //cdebug(cEl.style.calc)();
        
        if(cEl.style.calc["background-image"]){
            var url = cEl.style.calc["background-image"];
            url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];
            
            cdebug(cEl.name + " >>> " + url + " start on " + paper.project.activeLayer.name)();
            
//            layer.addChild(new paper.Raster(url, paper.view.bounds.center));
            
//            // TODO , add more logic from css with scale "auto" stuff
            var raster = new paper.Raster(url);
            raster.sourceUrl = url;
            raster.onLoad = function(){
                
//                var scaleX = paper.view.bounds.width/raster.width;
//                var scaleY = paper.view.bounds.height/raster.height;
//                raster.scale([scaleX,scaleY]);
                //raster.fitBounds(paper.view.bounds.center,false);
                setGetLayer(cEl);
                cdebug(cEl.name + " >>> " + raster.sourceUrl +" end on " + paper.project.activeLayer.name)();
                //boolImgLoaded=true;
            };
            
            //new paper.Raster(image.dataURL,
            //                    paper.view.bounds.center)
            
            
            layer.addChild(raster);
            
            
            //raster.width = 100;
            //raster.height = 100;
            
            
            
            //raster
            
            
//            if(!cEl.image){
//                cEl.image = new Image();
//                cEl.image.src = url;
//            }else if(cEl.image.src !== url){
//                cEl.image.src = url;
//            }
//            cEl.image.onload = function(){boolImgLoaded=true;};
//            //console.log(cEl.style.calc["background-image"]);
//            cEl_ctx.drawImage(cEl.image, 0, 0,cEl.shape.w,cEl.shape.h); //,cEl.shape.w,cEl.shape.h
            boolRedraw = true;
        }else{
            boolRedraw = true;
        }
        
        //if(boolImgLoaded || boolRedraw)
        cEl.shape.redraw = false;
        
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return false;
    }
}

function draw_cEl_shape(cEl) {
    
    try {
        
        //cdebug(cEl.name,false,true,3)();
        projectSwitch(cEl.projectName);
        
        var cEl_layer = paper.project;
        var cEl_page = paper.data;

        cEl_presets(cEl,cEl_page);
        
        if(!cEl_layer.debug){
            if(!cEl.visible || !cEl_layer.visible){
                cEl.shape.redraw = false;
                return true;
            };
        }
        
        //if(cEl.shape.redraw === true){
          

        var boolDrawCp = false;

        //cdebug(cEl.shape.rotation,false,true,3)();
        
        //cdebug(cEl_layer.name +  " >>>  " + cEl.name +  " on " + cEl.projectName)();
        
        cEl_setPaperPath(cEl, cEl.shape, true, false);
        
        var fillColor, strokeColor, lineWidth;
//        if(cEl_layer.debug){
//            var editIndex = cEl_layer.data.editIndex ? cEl_layer.data.editIndex : null;
//            var cEl_index = window[editIndex];
//            boolDrawCp = cEl_index ? true : false;
//            
//            boolDrawCp = boolDrawCp && (cEl_index.parentName + cEl_index.name === cEl.parentName + cEl.name);
//            if(boolDrawCp){
//                fillColor = cEl.style.default.calc["background-color"] ? cEl.style.default.calc["background-color"] : null;
//                lineWidth = cEl.style.default.calc["border-top-width"] ? cEl.style.default.calc["border-top-width"].replace("px",'') : 1;
//                strokeColor = cEl.style.default.calc["border-top-color"] ? cEl.style.default.calc["border-top-color"] : null;
//            }else{
//                fillColor = cEl.visible? "rgba(0,0,0,0.1)" : "rgba(255,0,0,0.1)";
//                lineWidth = 1;
//                strokeColor = "rgba(0,0,0,0.5)";
//            }
//        }else{
            fillColor = cEl.style.calc["background-color"];
            lineWidth = 1;//cEl.style.calc["border-top-width"].replace("px",'');
            strokeColor = cEl.style.calc["border-top-color"];
//        }
        
        if(fillColor){
            cEl.fillColor = fillColor;
        }
        if(strokeColor){
            cEl.strokeColor = strokeColor;
            cEl.strokeWidth = lineWidth;
        }
        
        
        
        //var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_project"];
        //var cEl_ctx = cEl_canv.getContext('2d');
        cEl_postsets(cEl,boolDrawCp);
        //cdebug(paper.project.activeLayer.children.length)();
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}




//cdebug(getShadowObj("5px 5px 7px 5px rgba(218,165,32,0.5),7px 7px 12px 7px rgba(32,165,218,0.5)"),false,true)();

function getShadowObj(strShadowCSS,scale){
    try{
//        if(strShadowCSS.indexOf(",")>-1){
            
            var retObj = strShadowCSS.split(/,(?![^\(]*\))/);
            for(var i = 0, len = retObj.length,strSubShadowCSS,shadowSubObj,arrShadow;i<len;i++){
                strSubShadowCSS = retObj[i].trim();
                shadowSubObj = {};
                arrShadow = strSubShadowCSS.split(/ (?![^\(]*\))/);
                shadowSubObj.shadowColor = arrShadow[0];
                shadowSubObj.shadowOffsetX= arrShadow[1] ? size2px(arrShadow[1],false,scale) : 0;
                shadowSubObj.shadowOffsetY= arrShadow[2] ? size2px(arrShadow[2],false,scale) : 0;
                if(arrShadow[3] ==="inset"){
                    shadowSubObj.shadowBlur= 0;
                    shadowSubObj.shadowSpread= 0;
                    shadowSubObj.shadowInset = true;
                }else{
                    shadowSubObj.shadowBlur= arrShadow[3] ? size2px(arrShadow[3],false,scale) : 0;
                    shadowSubObj.shadowSpread= arrShadow[4] ? size2px(arrShadow[4],false,scale) : 0;
                    shadowSubObj.shadowInset = false;
                }
                if(arrShadow[4] ==="inset"){
                    shadowSubObj.shadowSpread= 0;
                    shadowSubObj.shadowInset = true;
                }else{
                    shadowSubObj.shadowSpread= arrShadow[4] ? size2px(arrShadow[4],false,scale) : 0;
                    shadowSubObj.shadowInset = false;
                }
                
                
                
                retObj[i] = shadowSubObj;
            }
            return retObj;
//        }else{
//            var arrShadow = strShadowCSS.split(" ");
//            var retObj = [{}];
//            retObj[0].shadowColor=arrShadow[0];
//            retObj[0].shadowOffsetX=5;
//            retObj[0].shadowOffsetY=15;
//            retObj[0].shadowBlur=22;
//            retObj[0].shadowSpread=12;
//
//            return retObj;
//        }
        
        
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function getKeys(obj) {
//    var r = [];
//    for (var k in obj) {
//        if (!obj.hasOwnProperty(k)) 
//            continue
//        r.push(k);
//    }
//    return r;
//    var keyString = '';
//    for(var k in obj){
//        if(obj[k])keyString+=(','+k);
//    }
//    return keyString.slice(1);
    
    return Object.keys(obj);
}


function cEl_presets(cEl,cEl_page){
    try{
        // reset states
        if(cEl.states){
            var stateNames = getKeys(cEl.states);
            //cdebug(stateNames)(); 
            for(var i=0,cEl_stateId,cEl_state;i< stateNames.length; i++){

                if(cEl.states[stateNames[i]] && cEl_page.state[stateNames[i]]){

                    cEl_stateId = cEl.states[stateNames[i]][cEl_page.state[stateNames[i]][0]];
                    cEl_state = cEl_page.states[cEl_stateId];
                    cEl = $.extend(true,cEl,cEl_state);
                }
            }
        }

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_postsets(cEl,boolDrawCp){
    try{
        switch(cEl.data.type){
            case "text":
                draw_cEl_text(cEl,boolDrawCp);
                return true;
            break;
            default:
                return true;
            break;
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

/**
 * Function setStyleGlobal
 * Description This function gets all styles from all CSS sheets
 * @param {type} GLOBAL_styles 
 * @param {type} cId 
 * @param {type} cClass
 * @param {type} tag
 */
function setStyleGlobal(GLOBAL_styles, cId, cClass, tag) {
    try {
        var x, sheets, cSSSelectors, intMaxSelectors;
        
        for( sheets=document.styleSheets.length-1; sheets>=0; sheets-- ){
            cSSSelectors = document.styleSheets[sheets].rules || document.styleSheets[sheets].cssRules;
            for(var x=0, intMaxSelectors = cSSSelectors.length;x<intMaxSelectors;x++) {
                //cdebug(arrStyle);
                switch(cSSSelectors[x].selectorText){
                    case "#" + cId:
                    case "." + cClass:
                    case tag :
                    case "#"+cId + ":hover":
                    case "."+cClass + ":hover":
                    case tag + ":hover":
                    case "#" +cId+ ":active":
                    case "." +cClass+ ":active":
                    case tag + ":active":
                    case "#" + cId + ":focus":
                    case "." + cClass + ":focus":
                    case tag + ":focus":
                        
                        var ruleStyle = cSSSelectors[x].style ? cSSSelectors[x].style : cSSSelectors[x];
                        var strCIdStyle = ruleStyle.cssText;
                        
                        if(strCIdStyle){
                            
                            if(!GLOBAL_styles[cSSSelectors[x].selectorText]){
                                //addToGlobalStyle("{" + strCIdStyle + "}",cSSSelectors[x].selectorText);
                                var ruleContainer = {};
                                for (var keyname in ruleStyle){
                                    //console.log(keyname);
                                    if(isNumber(keyname)){
                                        //console.log(strCIdStyle);
                                        //console.log(keyname + "  >>>>>>> " + ruleStyle[keyname]);
                                        ruleContainer[ruleStyle[keyname]]=ruleStyle[ruleStyle[keyname]];
                                    }
                                }
                                GLOBAL_styles[cSSSelectors[x].selectorText] = $.extend(true,GLOBAL_styles[cSSSelectors[x].selectorText],ruleContainer);
//                                console.log(cSSSelectors[x].selectorText + " vs " + ruleContainer["border-top-color"]);
                            }
                        }else{
                            if(!GLOBAL_styles[cSSSelectors[x].selectorText]){
                                GLOBAL_styles[cSSSelectors[x].selectorText] ={};
                            }
                        }
                        
                    break;
                }
            }
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

/**
 * Function addToGlobalStyle
 * Description This function gets Style array from loaded CSS file
 * @param {type} GLOBAL_styles
 * @param {type} strCIdStyle
 * @param {type} selectorText
 */
function addToGlobalStyle(GLOBAL_styles,strCIdStyle,selectorText) {
    
    try {
        
        
        strCIdStyle=strCIdStyle.split("{")[1];
        strCIdStyle=strCIdStyle.split("}")[0];
        var arrStylePairs = strCIdStyle.split(";");
        
        var objTemp = {};
        for(var x=0,arrStylePair, styleKey, styleVal, len = arrStylePairs.length-1;x<len;x++) {
            arrStylePair = arrStylePairs[x].split(":");
            styleKey = arrStylePair[0].trim();
            styleVal = arrStylePair[1].trim();
            objTemp[styleKey] = styleVal;
        }
        GLOBAL_styles[selectorText] = objTemp;
        //console.log(objTemp);
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

/**
 * Function setStyle_cEl
 * Description This function returns the style attributes of an alement
 * @param {type} cEl
 */
function setStyle_cEl(cEl) {
    try {

        var cEl_fullId = cEl.parentName + "_" + cEl.name;
        
        //cdebug(cEl_fullId  + " " + cEl.tag)();
        
        var GLOBAL_styles = paper.data.styles;
        
        cEl.style = {};
        cEl.style.default = {};
        cEl.style.hover = {};
        cEl.style.active = {};
        cEl.style.focus = {};
        cEl.style.redraw = true;
        
        if(!GLOBAL_styles["#" + cEl_fullId]){
            // just make an entry inside the main Global style variable
            setStyleGlobal(GLOBAL_styles,cEl_fullId, cEl.class, cEl.tag);
        }
        
        

        cEl.style.default.tag =  GLOBAL_styles[cEl.tag];
        cEl.style.default.class = GLOBAL_styles["." + cEl.class];
        cEl.style.default.name = GLOBAL_styles["#" + cEl_fullId];
        
        cEl.style.hover.tag =  GLOBAL_styles[cEl.tag + ":hover"];
        cEl.style.hover.class = GLOBAL_styles["." + cEl.class + ":hover"];
        cEl.style.hover.name = GLOBAL_styles["#" + cEl_fullId + ":hover"];
        
        cEl.style.focus.tag =  GLOBAL_styles[cEl.tag + ":focus"];
        cEl.style.focus.class = GLOBAL_styles["." + cEl.class + ":focus"];
        cEl.style.focus.name = GLOBAL_styles["#" + cEl_fullId + ":focus"];
        
        cEl.style.active.tag =  GLOBAL_styles[cEl.tag + ":active"];
        cEl.style.active.class = GLOBAL_styles["." + cEl.class + ":active"];
        cEl.style.active.name = GLOBAL_styles["#" + cEl_fullId + ":active"];
         
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_Calc_Style(cEl,objKeysDefs){
    
    try{

        
        //cdebug(state_global,false,true,0);
        //precompute style from global container
        
        
        
        cEl.style.default.calc = $.extend(true,{},cEl.style.default.tag,cEl.style.default.class,cEl.style.default.name,cEl.style.custom);
        cEl.style.calc = $.extend(true,objKeysDefs,cEl.style.default.calc);
        
        if (cEl.hover){ //.states.global.hover.
            cEl.style.hover.calc = $.extend(true,{},cEl.style.hover.tag,cEl.style.hover.class,cEl.style.hover.name);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.hover.calc);
        };
        if (cEl.focus){ //.states.global.hover.
            cEl.style.focus.calc = $.extend(true,{},cEl.style.focus.tag,cEl.style.focus.class,cEl.style.focus.name);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.focus.calc);
        };
        if (cEl.active){ //.states.global.hover.
            cEl.style.active.calc = $.extend(true,{},cEl.style.active.tag,cEl.style.active.class,cEl.style.active.name);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.active.calc);
        };
        
        cEl.style.redraw = false;
        
        return true;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_getChildById(cEl,childId){
    
    try{
        if(cEl.name === childId)return cEl;
        if (cEl.children){
            for (var i = cEl.children.length - 1; i >= 0; i--) {
                if(cEl.children[i].name===childId){
                    return cEl.children[i];
                }
            }
        }
        return null;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function size2px(remVal, boolPxOut, scaleFactor){
    
    try{
        var pxOut = boolPxOut?"px":0;
        if(!GLOBAL_rem)GLOBAL_rem  = getRootElementFontSize();
        if(!remVal)return GLOBAL_rem + pxOut;
        if(remVal.indexOf("em") > -1){
            if(!scaleFactor)scaleFactor = 1;
            return (parseFloat(remVal) * GLOBAL_rem * scaleFactor) + pxOut;
        }else{
            //cdebug(remVal,false,false,0);
            return parseFloat(remVal) + pxOut;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



function lineDelta( pointArr1, pointArr2 ){
    try{
        var xs;
        var ys;
        xs = pointArr1[0] - pointArr2[0];
        xs = Math.abs(xs);
        ys = pointArr1[1] - pointArr2[1];
        ys = Math.abs(ys);
        return xs + ys;
    } catch (e) {
            var err = listError(e);
            cdebug(err,false,false,3)();
        return err;
    }
}

function setState(cEl_caller,stateName){
    
    try {
        // uses rules defined in the states space of the caller, but affects the parent then subsequently all children
        
        //cdebug(cEl_caller.states)();
        
        if(!cEl_caller.states[stateName])return false;
        
        
        var cEl_page = paper.data;
        
        
        var stateFrom = cEl_page.state[stateName][0];
        //cdebug(cEl_caller.rules)();
        
        var rule = cEl_page.rules[cEl_caller.rules[stateName]];
        
        
        var stateTo;
// 
        if(rule.from === stateFrom){
            stateTo = rule.to;
        }else{
            stateTo = rule.other;
        }
        // exit if same state
        if (stateTo === stateFrom) return false;
        
        // update history
        if(rule.usehistory && cEl_page.state[stateName].length > 1){
            cEl_page.state[stateName].shift();
            cEl_page.state[stateName].push(stateTo);
        }else{
            cEl_page.state[stateName].unshift(stateTo);
        }
        if(cEl_page.state[stateName].length>2)cEl_page.state[stateName].pop();
        
//        cdebug(cEl_caller.name, false,true,0);
//        cdebug(stateFrom + " vs " + stateTo, false,true,0);
//        cdebug(cEl_page.state[stateName], false,true,0);

        var cEl_layer = cEl_caller.project;
        cEl_layer.shape.redraw = true;
        
        return true;
        
    } catch (e){
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function reset_shape_stuff(cEl,boolParent,boolMP,boolRedraw,boolPoints){
    
    try{
        
        if(boolParent){
            if(boolMP)cEl.shape.masspoint = null;
            if(boolRedraw)cEl.shape.redraw = true;
            if(boolPoints)cEl.shape.points = null;
        }
        if (cEl.children){
            for (var i = cEl.children.length - 1; i >= 0; i--) {
                reset_shape_stuff(cEl.children[i],true,boolMP,boolRedraw,boolPoints);
            }
        }
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


//function checkPointInBorder(x,y,x1,y1,xy){
//    
//    try{
//        if(x<=xy[0] && x1>=xy[0] && y<=xy[1] && y1>=xy[1]){
//            return true;
//        }
//        return false;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


//function checkPointInPath(cEl,shapeContainer,xy){
//    
//    try{
////        var cEl_ctx = document.getElementById(cEl.pageId + "_" + cEl.layerId + "_project").getContext('2d');
////        cEl_setPath(cEl_ctx, cEl,shapeContainer, false, false);
////        if(GLOBAL_Path2D){
////            if(cEl_ctx.isPointInPath(cEl.shape.path,xy[0],xy[1])){
////                return true;
////            }
////        }else{
////            if(cEl_ctx.isPointInPath(xy[0],xy[1])){
////                return true;
////            }
////        }
//        return false;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

//function checkPointInStroke(cEl,shapeContainer,xy){
//    
//    try{
////        var cEl_ctx = document.getElementById(cEl.pageId + "_" + cEl.layerId + "_project").getContext('2d');
////        cEl_setPath(cEl_ctx, cEl, shapeContainer, false, false);
////        if(GLOBAL_Path2D){
////            if(cEl_ctx.isPointInStroke(cEl.shape.path,xy[0],xy[1])){
////                return true;
////            }
////        }else{
////            if(cEl_ctx.isPointInStroke(xy[0],xy[1])){
////                return true;
////            }
////        }
//        return false;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

//function checkPointInShape(cEl){
//    
//    try{
//        
//        if(!cEl || !cEl.visible)return false;
//        //cdebug("checkPointInShape  " + cEl.pageId + "_" + cEl.layerId + "_canvas    vs    " + cEl.name + "  " + cEl.tag,true,true);
//        switch(cEl.tag){
//            case "shape":// Poligon Shape Lines
//                //&& window[cEl.parentName].visible && window[cEl.parentName].events && window[cEl.parentName].enabled
//                if(cEl.enabled){ //&& cEl.events
////                    switch(cEl.shape.detection){
////                        case "border":
////                            return checkPointInBorder(cEl.shape.temp.cpBorder.x,cEl.shape.temp.cpBorder.y,cEl.shape.temp.cpBorder.x1,cEl.shape.temp.cpBorder.y1,eventholder.metrics.xy);
////                        break;
////                        case "bordersquare":
////                            var intSqrSide = Math.max(cEl.shape.temp.cpBorder.x1-cEl.shape.temp.cpBorder.x,cEl.shape.temp.cpBorder.y1-cEl.shape.temp.cpBorder.y)/2;
////                            var xyCenter = [(cEl.shape.temp.cpBorder.x1+cEl.shape.temp.cpBorder.x)/2,(cEl.shape.temp.cpBorder.y1+cEl.shape.temp.cpBorder.y)/2];
////                            return checkPointInBorder(xyCenter[0]-intSqrSide,xyCenter[1]-intSqrSide,xyCenter[0]+intSqrSide,xyCenter[1]+intSqrSide,eventholder.metrics.xy);
////                        break;
////                        case "bordercircle":
////                            // TODO implement detection for circle around the border
////                        break;
////                        case "shape":
//                            return checkPointInPath(cEl,cEl.shape,eventholder.metrics.xy);
////                        break;
////                        default:
////                            // undefined shape detection type
////                            return checkPointInPath(cEl,cEl.shape,eventholder.metrics.xy);
////                        break;
////                    }
//                }
//            break;
//            case "canvas":
//                //return checkPointInBorder(cEl.shape.temp.cpBorder.x,cEl.shape.temp.cpBorder.y,cEl.shape.temp.cpBorder.x1,cEl.shape.temp.cpBorder.y1,eventholder.metrics.xyAbs);
//            break;
//            case "page":
//                
//                return true;
//            break;
//        }
//        return false;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};



function checkPath2D( ) {
    'use strict';
    try{
        var test = new Path2D();
        return true;
    } catch (e) {
        return false;
    }
}

function cEl_setPaperPath(cEl, shapeContainer, boolReset, boolSetCP){
    //'use strict';
    try{
        //var shapeContainer = cEl.shape;
        // exit if path already exists
        if(!shapeContainer.temp){
            shapeContainer.temp = {"cpMp":[0,0]};
        }else{
            // exit if path already exists
            if(!boolReset){
                return true;
            }
        }
        
        var x0,y0,x,y,x1,y1,x2,y2,wF,hF,cpMP;
        var i=0;
        var scaleCP=[1,1];
        
//        if(!shapeContainer.segments){
//            
//        }
        
        if(cEl.segments.length){
            cEl.removeSegments();
        }
        
        
        
        var cEl_layer = paper.project;
        //var cEl_parent = cEl.parent;
        var cEl_page = paper.data;
        
        if (!shapeContainer.points){
            shapeContainer.points = $.extend(true,[],cEl_page.shapes[cEl.shape.name]);
        }
        
        //cdebug(cEl.shape.name)();
        
        var points = shapeContainer.points;
        var pointsLen = points.length;
        
        wF=cEl_layer.shape.w;
        hF=cEl_layer.shape.h;
        
        
        
        if(!shapeContainer.scale[1]){
            shapeContainer.scale[1] = shapeContainer.scale[0] * wF/hF;
        }
        
        scaleCP = [shapeContainer.scale[0]*wF,shapeContainer.scale[1]*hF];
        
        var flipXY = shapeContainer.flipXY?shapeContainer.flipXY:[false,false];

        if(!shapeContainer.masspoint){
            shapeContainer.masspoint = $.extend(true,[],cEl_layer.shape.masspoint);
        }
        
        if(shapeContainer.parentoffsetMp){
            //console.log(points[shapeContainer.parentoffsetMp.pointindex][0]*shapeContainer.scale[0]);
            var parentMp = cEl_layer.shape.masspoint;
            var parentCp = cEl_layer.shape.points[shapeContainer.parentoffsetMp.pointindex];
            //if(!parentCp)cdebug(cEl_layer.shape.points)();
            //if(!parentCp)cdebug(cEl_layer.shape.points)();
            
            //cdebug(parentMp)();
            
            shapeContainer.masspoint = [cEl_layer.shape.scale[0]*parentCp[0] + parentMp[0] + shapeContainer.parentoffsetMp.x, cEl_layer.shape.scale[1]*parentCp[1] + parentMp[1] + shapeContainer.parentoffsetMp.y];
        }
        
        shapeContainer.temp.cpMp = [wF*shapeContainer.masspoint[0], hF*shapeContainer.masspoint[1] ,3];
        
        cpMP = shapeContainer.temp.cpMp;
        //cElPath.name = cEl.parentName + "_" + cEl.name;
        
        
        
        switch(shapeContainer.type){

            case "poligon":// Poligon Shape Lines

                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                cEl.moveTo(x, y);
                
                for(i = 1; i < pointsLen; i = i + 1){
                    x = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
                    cEl.lineTo(x, y); 
                }
                //cElPath.closed = true;
                
            break;
                
            case "quadratic":// Poligon  Shape Quadratic Points

                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                
                cEl.moveTo(x, y);

                for(i = 0; i < pointsLen - 2; i = i + 2){ //len
                    x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                    x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                    y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                    cEl.quadraticCurveTo(x,y,x1,y1); 
                }
                switch(pointsLen-i){
                    case 2:

                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        cEl.quadraticCurveTo(x,y,x1,y1);
                    break;
                    case 1:
                        
                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        cEl.lineTo(x, y);
                    break;
                }
                //cElPath.closed = true;
            break;

            case "bezier":// Poligon  Poligon  Shape Bezier Points
                
                //                x=scaleCP[0]*points[0][0]+cpMP[0];
//                y=scaleCP[1]*points[0][1]+cpMP[1];
                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                cEl.moveTo(x, y);
                

                
                for(i = 0; i < pointsLen - 3; i = i + 3){

//                    x=scaleCP[0]*points[i+1][0]+cpMP[0];
//                    y=scaleCP[1]*points[i+1][1]+cpMP[1];
//                    x1=scaleCP[0]*points[i+2][0]+cpMP[0];
//                    y1=scaleCP[1]*points[i+2][1]+cpMP[1];
//                    x2=scaleCP[0]*points[i+3][0]+cpMP[0];
//                    y2=scaleCP[1]*points[i+3][1]+cpMP[1];
                    
                    x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                    x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                    y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                    x2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,0);
                    y2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,1);
                    
                    
                    //cEl_ctx.bezierCurveTo(x,y,x1,y1,x2,y2);
                    cEl.cubicCurveTo(x,y,x1,y1,x2,y2); 
                }
                switch(pointsLen-i){
                    case 3:
                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                        x2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        
                        //cEl_ctx.bezierCurveTo(x,y,x1,y1,x2,y2);
                        cEl.cubicCurveTo(x,y,x1,y1,x2,y2);
                        
                    break;
                    case 2:
//                        x=scaleCP[0]*points[i+1][0]+cpMP[0];
//                        y=scaleCP[1]*points[i+1][1]+cpMP[1];
//                        x1=scaleCP[0]*points[0][0]+cpMP[0];
//                        y1=scaleCP[1]*points[0][1]+cpMP[1];

                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        
                        //cEl_ctx.quadraticCurveTo(x,y,x1,y1);
                        cEl.quadraticCurveTo(x,y,x1,y1);

                    break;
                    case 1:
//                        x=scaleCP[0]*points[0][0]+cpMP[0];
//                        y=scaleCP[1]*points[0][1]+cpMP[1];
                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        
                        //cEl_ctx.lineTo(x, y);
                        cEl.lineTo(x, y);
                        
                    break;
                
//                for(i = 0; i < pointsLen - 4; i = i + 3){
//
//
////                    var strSVG = "M";
////                    strSVG += point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
////                    strSVG += ",";
////                    strSVG += point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
////                    strSVG += " C";
////                    strSVG +=  point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
////                    strSVG += ",";
////                    strSVG +=  point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
////                    strSVG += " ";
////                    strSVG +=  point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
////                    strSVG += ",";
////                    strSVG +=  point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
////                    strSVG += " ";
////                    strSVG +=  point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,0);
////                    strSVG += ",";
////                    strSVG +=  point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,1);
////                    var path = new paper.Path(strSVG);
////                    cElPath.children.push(path);
//                    
//                    
//                    x0 = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
//                    y0 = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
//                    x1 = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                    y1 = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                    x2 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
//                    y2 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
//                    x = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
//                    y = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
//                    
//                    var point0 = new paper.Point(x0,y0);
//                    var point1 = new paper.Point(x1-x0,y1-y0);
//                    var point2 = new paper.Point(x-x2,y-y2);
//                    var point = new paper.Point(x,y);
////                    
////                    //"M100,250 C100,100 400,100 400,250"
////
////                    var firstSegment = new paper.Segment(point0, null, point1);
////                    var secondSegment = new paper.Segment(point, point2, null);
//                   // var strSVG = "M"+x0+",",250 C100,100 400,100 400,250"
//                    
//                    //path.closePath() ;// = false;
//                    //var path = new paper.Path(firstSegment, secondSegment);
//                    
////                    var curve = new paper.Curve(point0,point1,point2,point);
////                    cElPath.addSegments([curve.segment1, curve.segment2]);
//
//                    var firstPoint = point0;
//                    var firstSegment = new paper.Segment(firstPoint, null, point1);
//                    var secondPoint = point;
//                    var secondSegment = new paper.Segment(secondPoint, point2, null);
//                    cElPath.addSegments([firstSegment, secondSegment]);
//                    
                }
                //cElPath.closed = true;
            break;
        };
        //cElPath.closePath();

        if(boolSetCP){
            cEl.selected = true;
        }
        
        //shapeContainer.temp.fp = [point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0),point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1)];
        
        //shapeContainer.path = cElPath;
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};



function point_get_cpXY(point,scale,cpMp,flipXY,index){
    
    try{    
        if(point.length===2){
            if(flipXY[index]){
                return cpMp[index] - scale[index]*point[index];
            }else{
                return cpMp[index] + scale[index]*point[index];
            }
        }else{
            if(flipXY[index]){
                return cpMp[index] - point[2+index] - scale[index]*point[index];
            }else{
                return cpMp[index] + point[2+index] + scale[index]*point[index];
            } 
        }
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_set_CpBorder(cpBorder,x,y){
    
    try{    
        if(cpBorder.x > x){ cpBorder.x = x;}
        if(cpBorder.y > y){ cpBorder.y = y;}
        if(cpBorder.x1 < x){ cpBorder.x1 = x;}
        if(cpBorder.y1 < y){ cpBorder.y1 = y;}
        return cpBorder;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function getProperties(o) {
    
    try{
        var seenobj = new Set();
        var seenprop = new Set();
        function _proto(obj) {
            return obj instanceof Object ?
                Object.getPrototypeOf(obj) :
                obj.constructor.prototype;
        }
        function _properties(obj) {
            var ret = [];
            if (obj === null || seenobj.has(obj)) { return ret; }
            seenobj.add(obj);
            if (obj instanceof Object) {
                var ps = Object.getOwnPropertyNames(obj);
                for (var i = 0; i < ps.length; ++i) {
                    if (!seenprop.has(ps[i])) {
                        ret.push(ps[i]);
                        seenprop.add(ps[i]);
                    }
                }
            }
            return ret.concat(_properties(_proto(obj)));
        }
        return _properties(o);
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function showObject(obj) {
    try{
        var result = "";
        for (var p in obj) {
            if( obj.hasOwnProperty(p) ) {
                result += p + " , " + obj[p] + "\n";
            } 
        }              
        return result;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function showObjectjQuery(obj) {
    try{
        var result = '{';
        $.each(obj, function(k, v) {
            result += '"' + k + '":' + v + ",";
        });
        result += '}';
        return result;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function checkDelta(xy1,xy2,delta,offset,index){
    
    try{
        return (Math.abs(xy1[index]-xy2[index]-offset[0])<=delta[index]);
    } catch (e) {
        
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function mergeIntArrays(a,b){
    
    try{
        // looks like a 3*O alg
        var hash = {}, i, c = [];
        for (i=0; i<a.length; i++) {
            hash[a[i]]=true;
        } 
        for (i=0; i<b.length; i++) {
            hash[b[i]]=true;
        }
        c = Object.keys(hash);
        for (i=0; i<c.length; i++) {
            c[i] = parseInt(c[i]);
        }
        return c;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

//console.log(mergeIntArrays([1,1,2,3,4,8,9,11,15,16],[8,9,10,11,12]));

function getIntArray(val1,val2,boolLeft){
    
    try{
        
        var a = [];
        var l = Math.abs(val1-val2)+1;
        if(val1>val2){
            while(l--)a[l]=l+val2;
        }else if (val2>val1){
            while(l--)a[l]=l+val1;
        }else{
            a[0] = val1;
        }
        // TODO check bellow logic in all scenarios
        //cdebug(a,true,true);
        //cdebug(boolLeft,true,true);
        if(boolLeft && val1<=val2){a.pop();};
        return a;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function runEval(actEl, evtType){
    
    try{
        //cdebug(actEl);
        if(!actEl || !actEl.events)return null;
        var strEval = actEl.events[evtType];

        if(strEval && actEl.enabled){
            
            var fctName = strEval.split("(")[0];
            var args = strEval.split("(")[1];
            var args = args.split(")")[0];
            args = args.split(",");
            for(var i = 0 ;i<args.length;i++){
                if(args[i] === "this"){
                    args[i] = actEl;
                    //cdebug(args[i])();
                }else{
                    args[i] = eval(args[i]);
                }
                //cdebug(args[i])();
            }
            //cdebug(args)();
//            cdebug("runEval " + actEl.name + ", event " + strEval + ", evtType " + evtType + " >>> fctName:" + fctName + " args >>>" + args)();
            
//            
//            if(actEl.tag==="canvas"){
//                strEval = strEval.replace("this",actEl.pageId+"_"+actEl.name);
//            }else if(actEl.tag==="page"){
//                strEval = strEval.replace("this",actEl.pageId);
//            }else{
//                strEval = strEval.replace("this",actEl.parentName+"_"+actEl.name);
//            };
//            return eval(strEval);
            
            //return window[fctName](args);
            return executeFunctionByName2(fctName,args);
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function executeFunctionByName2(fname , args){
    
    try{ 
        var arr = fname.split('.');
        var fn = window[ arr[0] ];
        for (var i = 1; i < arr.length; i++)
        { fn = fn[ arr[i] ]; }
        return fn.apply(window, args);
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function executeFunctionByName(functionName, context /*, args */) {
    
    try{    
        //executeFunctionByName("My.Namespace.functionName", window, arguments);
        var args = [].slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

//function executeFunctionByName(functionName, context /*, args */) {
//    
//    try{
//        return window["functionName"](arguments);
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


function resetCursor(cEl){
    
    try{
        //var actCanv = getSetHtmlEl(cEl);
        //cdebug(cEl.pageId + "_" + cEl.layerId + "_project");
        
        if(cEl.tag!=="page"){
            //cdebug(cEl.style.calc["cursor"])();
            document.body.style.cursor = cEl.style.calc["cursor"];
        }
        //else{
            //window[cEl.pageId + "_" + cEl.layerId + "_project"].style.cursor = cEl.style.calc["cursor"];
        //}
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
    
}




function id_generator(prefix, idLength){
    try{
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        idLength -= prefix.length;
        for( var i=0; i < idLength; i++ ){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return prefix + text;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function getCentroidPoint(cShapeDots){ 
    
    try{
        
        var lenCShapeDots = cShapeDots.length;
        var xCentroid = 0;
        var yCentroid = 0;

        var areaFact = 0;
        var multyFact = 0;
        for(var i = 0; i < lenCShapeDots - 1 ; i++){
            multyFact = cShapeDots[i][0]*cShapeDots[i+1][1] - cShapeDots[i+1][0]*cShapeDots[i][1];
            areaFact = areaFact + multyFact;
            xCentroid = xCentroid + (cShapeDots[i][0]+cShapeDots[i+1][0])*multyFact;
            yCentroid = yCentroid + (cShapeDots[i][1]+cShapeDots[i+1][1])*multyFact;
        };
        multyFact = cShapeDots[lenCShapeDots-1][0]*cShapeDots[0][1] - cShapeDots[0][0]*cShapeDots[lenCShapeDots-1][1];
        areaFact = areaFact + multyFact;
        xCentroid = xCentroid + (cShapeDots[lenCShapeDots-1][0]+cShapeDots[0][0])*multyFact;
        yCentroid = yCentroid + (cShapeDots[lenCShapeDots-1][1]+cShapeDots[0][1])*multyFact;

        areaFact = (1/3)/areaFact;
        xCentroid = Math.floor(xCentroid*areaFact);
        yCentroid = Math.floor(yCentroid*areaFact);

        return [xCentroid,yCentroid];
    }catch(err){
        return err;
    }
}


function trim(text){
    text = text.replace(/^\s+/, "");
    for (var i = text.length - 1; i >= 0; i--) {
        if (/\S/.test(text.charAt(i))) {
            text = text.substring(0, i + 1);
            break;
        }
    }
    return text;
}
