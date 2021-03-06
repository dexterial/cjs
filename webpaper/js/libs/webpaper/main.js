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
paper.settings.handleSize =7;
paper.settings.handleLength =15;

paper.rerender = false;

//window.setInterval(function(){cdebug("zz",false,true)},100);

// load json from file, to be changed to allow loading json from external file or from local storage or from server directly
function start(){
    $.getJSON(loadedFile, function (jsonPage) {

        if(boolEditMode){

    //        $.getJSON(editorFile, function (jsonPageEditor) {
    //
    //            document.title = "<EDIT MODE>" + jsonPage.title;
    //            pre_load_children(jsonPageEditor);
    //            
    //            loadedPage = $.extend(true,{},jsonPage);
    //            loadedPage.shape.masspoint = [0.5,0.25];
    //            loadedPage.shape.scale = [loadedPage.shape.scale[0]/2,loadedPage.shape.scale[1]/2];
    //
    //            loadPageInEditor(false);
    //            
    //            //GLOBAL_debugger = true;
    //        });
        }else{

                //clearInterval(interval1);
                document.title = jsonPage.title;
                //GLOBAL_debugger = jsonPage.debug;
                pre_load_children(jsonPage);

                GLOBAL_renderer = true;
                //renderer([jsonPage.name]);
                //renderer([jsonPage.name]);

                //console.log(paper.version);

                drawProjects(paper,true);

                //interval1 = setInterval(function(){renderer([jsonPage.name]);},GLOBAL_rendertime);

        };
    });
};

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
                window["editorPage_fabric"].reset.layout_shape = true;
            break;
            case "canvas": //draw canvas element
                //console.log(pageId + "_" + cEl.name + "_project");
                delete window[pageId + "_" + cEl.name];
                var child = document.getElementById(pageId + "_" + cEl.name + "_project");
                if(child)document.body.removeChild(child);
            break;
            case "group": //draw shape 
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
                    fabric.children[i].reset.layout_shape = true;
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
        var intConsoleNo = arguments[3] ? arguments[3] :0;
        var dl = window["GLOBAL_delay" + intConsoleNo];
        var strDelay  =  Math.abs(d.getTime() - dl.getTime());
        strDelay = String("00000" + strDelay).slice(-5);
        var strNow =  [d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()];
        strNow =  String("00" + strNow[0]).slice(-2) + ":" + String("00" + strNow[1]).slice(-2) + ":" + String("00" + strNow[2]).slice(-2) + ":" + String("000" + strNow[3]).slice(-3);

        var cEl_debug = window["logger"+intConsoleNo];
        if(!cEl_debug && paper.projects[1]){
            cEl_debug = paper.projects[1].getItem({name:"log"+intConsoleNo});
            window["logger"+intConsoleNo] = cEl_debug;
            //console.log(JSON.stringify(cEl_debug));
        }
        
        var msg = arguments[0];
        if(kind(msg)==="Object" || kind(msg)==="Array"){
            msg = JSON.stringify(msg);
        }

        var strMsgOld = "";
        var strMsg = "";
        var clearMe = arguments[1] ? arguments[1] :false;
        if(clearMe)console.clear();
        
        var boolConsole = arguments[2] ? arguments[1] :false;

        if(cEl_debug && GLOBAL_debugger){
            strMsgOld = cEl_debug.data.values.text;
            if(strMsgOld && (strMsgOld.length>GLOBAL_debugger_maxlen))clearMe = true;

            if (clearMe){
                strMsg = strNow + "(" + strDelay + "): " + msg + "\\n" + strNow + "(" + strDelay + ")";
            }else{
                //make append text function
                strMsg =  strNow + "(" + strDelay + "): " + msg + "\\n" + strMsgOld;
            }
            
            
            set_cEl_text(cEl_debug,paper.data.text,strMsg);
            
            //draw_cEl_text(cEl_debug,strMsg);
            
        }else{
            if(GLOBAL_debugger){
                boolConsole = true;
            }
        }
        
        if(boolConsole){
            strMsg =  strNow + "(" + strDelay + "): " + msg;
            window["GLOBAL_delay" + intConsoleNo] = d;
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
            "elements" : $.extend(true,{},cEl.elements),
            "menus" : $.extend(true,{},cEl.menus)
        };
        
        paper.reset = {"layout_shape":true,"layout_css":true,"text":true,"text_shape":true,"text_css":true,"selection":false,"text_draw":true,"cursor":false};
        
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
            return paper.project;//paper.project;
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


function projectGet(nameProject){
    try {
        
        if(paper.project && paper.project.name && paper.project.name===nameProject){
            return paper.project;//paper.project;
        }
        
        var projects = paper.projects;
        for(var i = 0; i<projects.length; i++){
            //cdebug("found " + nameProject)();
            if(projects[i].name && projects[i].name === nameProject){
                
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


function layerSwitch(toLayer){
    try {
        
        if(paper.project.activeLayer && paper.project.activeLayer.name && paper.project.activeLayer.name===toLayer){
            return paper.project.activeLayer;//paper.project;
        }
        
        var layers = paper.project.layers;
        for(var i = 0; i<layers.length; i++){
            if(layers[i].name && layers[i].name === toLayer){
                
                //cdebug("layer switch from "+ paper.project.activeLayer.name + " to " + layers[i].name)();
                
                layers[i].activate();
                
                return layers[i];
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
//        cdebug("load project " + parentName + "_" + cEl.name)();
        //var project = paper.project;
        
        //var project = paper.project;
        project.debug = cEl.debug;
        project.tab = cEl.tab;
        
        project.name = cEl.name;
        project.parentName = parentName;
        project.projectName = paper.project.name;
        
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
        
        // add group holder                      cEl_group.children["ShapePath"]
//        var tempShape = new paper.Group();
//        tempShape.name = project.parentName + "_" + project.name + ".reserved1";
        
        project.reset = {"layout_shape":true,"layout_css":true,"text":true,"text_shape":true,"text_css":true,"selection":false,"text_draw":true,"cursor":false};
        
        return project;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 

function setGetLayer(cEl,parentName){
    
    try {
       
        var layer = layerSwitch(cEl.name);
        if(layer)return layer;
        
        
        
        if(!paper.project.activeLayer.name && paper.project.layers.length===1){
            layer = paper.project.activeLayer;
        }else{
//            cdebug(paper.version)();
            layer = paper.project.addLayer(new paper.Layer);
//            cdebug("test2")();
            layer.activate();
        }
//        cdebug("load layer " + parentName + "_" + cEl.name )();
        
        layer.debug = cEl.debug;
        layer.tab = cEl.tab;
        
        layer.name = cEl.name;
        layer.parentName = parentName;
        layer.projectName = paper.project.name;
        layer.layerName = cEl.name;
        
        layer.tag = cEl.tag;
        layer.class = cEl.class;
        
        
        layer.visible = cEl.visible;
        layer.focus = cEl.focus;
        layer.hover = cEl.hover;
        layer.active = cEl.active;
        layer.enabled = cEl.enabled;
        
        layer.style = $.extend(true,{},cEl.style);
        layer.events = $.extend(true,{},cEl.events);
        layer.data = $.extend(true,{},cEl.data);
        layer.shape = $.extend(true,{},cEl.shape);
        
        // add group holder                      cEl_group.children["ShapePath"]
        var tempShape = new paper.Group();
        tempShape.name = layer.parentName + "_" + layer.name + ".G_BKG";
        
        layer.reset = {"layout_shape":true,"layout_css":true,"text":true,"text_shape":true,"text_css":true,"selection":false,"text_draw":true,"cursor":false};
        

        return layer;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 


function setGetShape(cEl,parentName){
    try {

        var cEl_group = new paper.Group();
        
        cEl_group.tab = cEl.tab;
        cEl_group.debug = cEl.debug;
        
        cEl_group.tag = cEl.tag;
        cEl_group.class = cEl.class;
        
        cEl_group.visible = cEl.visible;
        cEl_group.focus = cEl.focus;
        cEl_group.hover = cEl.hover;
        cEl_group.active = cEl.active;
        
        cEl_group.events = $.extend(true,{},cEl.events);
        cEl_group.data = $.extend(true,{},cEl.data);
        cEl_group.shape = $.extend(true,{},cEl.shape);
        cEl_group.rules = $.extend(true,{},cEl.rules);
        cEl_group.states = $.extend(true,{},cEl.states);
        

        cEl_group.name = cEl.name;
        cEl_group.parentName = parentName;
        cEl_group.projectName = paper.project.name;
        cEl_group.layerName = paper.project.activeLayer.name;
        
        //cdebug("load group " + parentName + "_" + cEl.name + " on " + cEl_group.layerName)();
        
        var tempShape,cEl_groupFullName;
        //cEl_groupFullName = cEl_group.parentName + "_" + cEl_group.name;
        
        //cEl_group.applyMatrix = true;
        
        // add holder of path                    cEl_group.children["ShapeRaster"]
        tempShape = cEl_group.addChild(new paper.Group());
        tempShape.name = "ShapeRaster";
        //tempShape.applyMatrix = true;
        
        // add holder of path                    cEl_group.children["ShapePath"]
        tempShape = cEl_group.addChild(new paper.CompoundPath());
        tempShape.name = "ShapePath";
        //tempShape.applyMatrix = true;
        
        // add holder of text paths              cEl_group.children["TextPath"]
        tempShape = cEl_group.addChild(new paper.CompoundPath());
        tempShape.name = "TextPath";
        //tempShape.applyMatrix = true;
        
        // add holder of text symbols            cEl_group.children["TextSelection"]
        tempShape = cEl_group.addChild(new paper.Group());
        tempShape.name = "TextSelection";
        //tempShape.applyMatrix = true;
        
        // add holder of text selection          cEl_group.children["TextSymbols"]
        tempShape = cEl_group.addChild(new paper.Group());
        tempShape.name = "TextSymbols";
        //tempShape.applyMatrix = true;
        
//        // add holder of control points          cEl_group.children["ControlPoints"]
//        tempShape = cEl_group.addChild(new paper.Group());
//        tempShape.name = "ControlGuides";
//        
//        tempShape = cEl_group.addChild(new paper.Group());
//        tempShape.name = "ControlPoints";
        
        tempShape = cEl_group.addChild(new paper.Group());
        tempShape.name = "Items";
        
        switch(cEl.data.type){
            case "text":
                cEl_group.data.values.temp = {};
            break;
            default:
            break;
        }
        cEl_group.reset = {"layout_shape":true,"layout_css":true,"text":true,"text_shape":true,"text_css":true,"selection":false,"text_draw":true};
        
        return cEl_group;
        
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
                cEl = $.extend(true,{},paper.data.elements[cEl.elId],cEl);
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
                
                //cEl.parentName = parentName;
                var project = setGetProject(cEl,parentName);
                setStyle_cEl(project);
                project.loaded = true;
                
            break;
            case "layer": //draw canvas element
                
                //cEl.parentName = parentName;
                var layer = setGetLayer(cEl,parentName);
                setStyle_cEl(layer);
                layer.loaded = true;
                
            break;
            case "group": //draw shape
                
                
                var cEl_group = setGetShape(cEl,parentName);
                setStyle_cEl(cEl_group);
                
                //cdebug(cEl_group.parentName + "_" +cEl_group.name)();
                //cdebug(paper.project.activeLayer.getItem({"name":shape.name}))();
                
                cEl_group.loaded = true;
                
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
        
        //if(cEl.tag === "layer"){boolRedraw = cEl.reset.layout_shape;};
        //if(cEl.tag === "project"){boolRedraw = cEl.reset.layout_shape;};
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.children["ShapePath"],true)();
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.reset)();
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.shape)();
        boolAllIsWell = (boolAllIsWell && draw_cEl(cEl,boolRedraw));
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.reset)();
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.children["ShapePath"])();
//        if(cEl.name === "tabTRLabel1")cdebug(cEl.shape)();

        
        var boolHasChildren = cEl.children ? true: false;
        var boolHasLayers = cEl.layers ? true: false;
        var boolHasProjects = cEl.projects ? true: false;
        
        //cdebug(cEl.name + " " + boolHasProjects + " " + boolHasLayers + " " + boolHasChildren)();
        
        
        if(boolHasProjects){
            for(var i = 0;i < cEl.projects.length; i++){
//                if(cEl.visible){
                    boolAllIsWell = (boolAllIsWell && drawProjects(cEl.projects[i],boolRedraw));
//                }
            };
        }

        if(boolHasLayers){
            for(var i = 0;i < cEl.layers.length; i++){
//                if(cEl.visible){
                    boolAllIsWell = (boolAllIsWell && drawProjects(cEl.layers[i],boolRedraw));
//                }
            };
        }
        
        if(boolHasChildren){
            if(cEl.visible){
                for(var i = 0;i < cEl.children.length; i++){
                    if(cEl.children[i].tag === "group"){
                        boolAllIsWell = (boolAllIsWell && drawProjects(cEl.children[i],boolRedraw));
                    }
                };
            }
        }
        
        if(cEl.tag === "project"){
            if(paper.rerender){
                //cdebug(paper.rerender, true)();
                //project.view.force = true;
                paper.project.view._needsUpdate = true;
                paper.project.view.requestUpdate();
                paper.rerender = false;
            }
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
//        if(cEl.tag === "layer"){boolRedraw = cEl.reset.layout_shape;};
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
                
                if(cEl.reset.layout_css){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                resetCursor(cEl);
                if(!cEl.reset.layout_shape){return true;};
                
                draw_cEl_page(cEl);
                //cdebug(cEl.shape)();
                
                cEl.reset.layout_shape = false;
                cEl.reset.layout_css = false;
            
            break;
            case "project": //draw page element
                // compute style
                if(cEl.reset.layout_css){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                resetCursor(cEl);
                if(!cEl.reset.layout_shape){return true;};
                //cdebug("draw project " + cEl.name)();
//                cdebug("draw page " + cEl.name,true,false,2)();
                
                draw_cEl_project(cEl);
                

                cEl.reset.layout_shape = false;
                cEl.reset.layout_css = false;
                
            break;
            case "layer": //draw canvas element
                
                
                if(cEl.reset.layout_css){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                resetCursor(cEl);
                
                if(!cEl.reset.layout_shape){return true;};
                //cdebug("draw canvas")();
                draw_cEl_layer(cEl);
                
                
                cEl.reset.layout_shape = false;
                cEl.reset.layout_css = false;
            break;
            case "group": //draw group
                
//                //it renders all shape elements if layer is reset ..... so the shape.redraw does not do much, 
//                //perhaps load the image of the shape in a temp value of the cel.shape element and 
//                //just repaint the canvas as the old time, that can speed up stuff.
//              
                // compute style
                if(cEl.reset.layout_css){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":null,"border-top-width":"0px","border-top-color":null});
                    resetCursor(cEl);
                }
                
                
                //
                if(boolRedraw){
                    cEl.reset.layout_shape = true;
                }
                
////                if(cEl.layerId !== "control" && cEl.layerId !== "stats" )cdebug("draw shape " + cEl.name + " , redraw " + cEl.reset.layout_shape,false,false,2)();
                //
                
                
                draw_cEl_group(cEl);
                
                
                cEl.reset.layout_shape = false;
                cEl.reset.layout_css = false;
                cEl.reset.debug = false;
                
                //cdebug("END draw shape " + cEl.name + " , redraw " + cEl.reset.layout_shape,false,false,2)();
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

function draw_cEl_project(cEl_project){
    
    try {
        
        if(!cEl_project.reset.layout_shape){return true;};
        if(!cEl_project.visible){
            //cdebug("not visible")();
            cEl_project.view.element.style.visibility = "hidden";
            return true;
        }
        //cdebug("draw_cEl_project" + cEl_project.name)();
        
        //setGetProject(cEl,cEl_project.name);
        projectSwitch(cEl_project.name);
        
        //paper.project.activeLayer.removeChildren();
        //paper.project.activeLayer.removeChildren();

        if(cEl_project.view.element.style.visibility === "hidden")
            cEl_project.view.element.style.visibility = "visible";
        
        
        //cdebug(paper.shape)();
        
        var w = paper.shape.w;
        var h = paper.shape.h;
        
        //setGetProject(cEl,cEl_project.parentName);
        
        
        if (!cEl_project.shape.points){
            cEl_project.shape.points = paper.data.shapes[cEl_project.shape.name];
        }
        
        var borderTop = cEl_project.style.calc["border-top-width"] ? size2px(cEl_project.style.calc["border-top-width"],false):0;
        var borderRight = cEl_project.style.calc["border-right-width"] ? size2px(cEl_project.style.calc["border-right-width"],false):0;
        var borderBottom = cEl_project.style.calc["border-bottom-width"] ? size2px(cEl_project.style.calc["border-bottom-width"],false):0;
        var borderLeft = cEl_project.style.calc["border-left-width"] ? size2px(cEl_project.style.calc["border-left-width"],false):0;
        
//        cdebug(borderTop + " " +borderRight + " " +borderBottom + " " +borderLeft)();

        w = w - borderRight - borderLeft;
        h = h - borderTop - borderBottom;

        


        if(!cEl_project.shape.w>0){
            //cEl_project.shape.w = w;
            cEl_project.shape.w = Math.floor(w * cEl_project.shape.scale[0] * Math.abs(cEl_project.shape.points[2][0]-cEl_project.shape.points[0][0])) ;
        }; 
        if(!cEl_project.shape.h>0){
            //cEl_project.shape.h = h;
            cEl_project.shape.h = Math.floor(h * cEl_project.shape.scale[1] * Math.abs(cEl_project.shape.points[2][1]-cEl_project.shape.points[0][1])) ;
        };
        
        cEl_project.shape.left = Math.floor(w * cEl_project.shape.masspoint[0] + cEl_project.shape.w * cEl_project.shape.points[0][0]) ;
        cEl_project.shape.top = Math.floor(h * cEl_project.shape.masspoint[1] + cEl_project.shape.h * cEl_project.shape.points[0][1]) ;
        
        
        
        //if(!cEl_project.reset.layout_shape){return true;};
        
//        var cEl_canv = document.getElementById(cEl_project.name + "_project");
//        
//        //cdebug("here " +cEl_canv.id)();
//        
//        
//        if(!cEl_canv){
//            return false;
//        }
//        
//        if(!cEl_project.visible && cEl_project.loaded){
//            if(cEl_canv.style.visibility !== "hidden")cEl_canv.style.visibility = "hidden";
//            cEl_project.reset.layout_shape = false;
//            return true;
//        }else{
//            if(cEl_canv.style.visibility !== "visible")cEl_canv.style.visibility = "visible";
//        }
        
        

        //console.log(cEl_project.shape.w + " " + cEl_project.shape.h);
//        cEl_project.shape.temp = {
//            "cpBorder":{
//                "x":cEl_project.shape.left + Math.floor(cEl_project.shape.w * cEl_project.shape.masspoint[0] + cEl_project.shape.w * cEl_project.shape.points[0][0]),
//                "y":cEl_project.shape.top + Math.floor(cEl_project.shape.h * cEl_project.shape.masspoint[1] + cEl_project.shape.h * cEl_project.shape.points[0][1])
//            }
//        };
//        cEl_project.shape.temp.cpBorder.x1=cEl_project.shape.temp.cpBorder.x+cEl_project.shape.w;
//        cEl_project.shape.temp.cpBorder.y1=cEl_project.shape.temp.cpBorder.y+cEl_project.shape.h;
        
        // reset canvas on resize or move ???
        
        //cdebug(cEl_project.shape)();
        
        //cdebug(cEl_project.visible)();
        
        //cEl_project.visible = cEl_project.visible;
        
        cEl_project.view.viewSize.width = cEl_project.shape.w;
        cEl_project.view.viewSize.height = cEl_project.shape.h;
        
        
        //cdebug(cEl_project.view.center)();
        

        //cEl_canv.width = cEl_project.shape.w;
        //cEl_canv.height = cEl_project.shape.h;
        
//        var cEl_ctx = cEl_canv.getContext('2d');
//        cEl_ctx.textBaseline="alphabetic";
//        cEl_ctx.textAlign="left";
        
        //cEl_canv.contentEditable = true;

        // reset canvas style stuff
        //cdebug(cEl_project.shape.left)();
        
        var cEl_canv = cEl_project.view.element;
        
        //cEl_canv.width = cEl_project.shape.w;
        //cEl_canv.height = cEl_project.shape.h;
        
        if(cEl_project.style.calc["box-shadow"])cEl_canv.style.boxShadow = cEl_project.style.calc["box-shadow"];
//        //console.log(JSON.stringify(cEl_project.style.calc));
        cEl_canv.style.border = "solid " + cEl_project.style.calc["border-top-width"] + " " + cEl_project.style.calc["border-top-color"] ;
        cEl_canv.style.left = cEl_project.shape.left + "px";
        cEl_canv.style.top =  cEl_project.shape.top + "px";
        
//        cdebug(cEl_project.name)();
//        cdebug(cEl_project.shape)();
        
        
        //cEl_canv.style.border = "solid 1px blue";//cEl_canv.cStyle["border"];

//        if(cEl_project.debug){
//            drawGrid(cEl_canv);
//            if(!cEl_project.data.temp)cEl_project.data.temp = {"drawPoints":null,"rf":[]};
//        }
        
        //cdebug("start")();
        
//        if(cEl_project.style.calc["background-image"]){
//            if(!cEl_project.bkgImg){
//                var url = cEl_project.style.calc["background-image"];
//                url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];
//                cEl_project.bkgImg = new Image();
//                cEl_project.bkgImg.src = url;
//                //cdebug(cEl_project.name + " <<< " + url + " start on " + paper.project.name)();
//
//                cEl_project.bkgImg.onload = function(){
////
////    //                var scaleX = paper.view.bounds.width/raster.width;
////    //                var scaleY = paper.view.bounds.height/raster.height;
////    //                raster.scale([scaleX,scaleY]);
////                //raster.fitBounds(cEl_project.view.bounds,true);
//                    //drawProjects(paper,true);
//                    projectSwitch(cEl_project.name);
//                    //cdebug("done >>> on " + paper.project.name)();
//                    
//                    var bkg = cEl_project.activeLayer.children[0].addChild(new paper.Raster(cEl_project.bkgImg,new paper.Point(0,0)));
//                    //var bkg = cEl_project.activeLayer.children[0].children[0];
//                    bkg.name = cEl_project.parentName + "_" + cEl_project.name + "_BKG";
//                    bkg.fitBounds(cEl_project.view.bounds,true);
//                    bkg.onLoad = function(){
//                        //cEl_project.bkgRaster.sendToBack();
//                    };
//                    
//                };
//            }else{
////                cEl_project.bkgRaster.drawImage(cEl_project.bkgImg,new paper.Point(0,0));
////                    cEl_project.bkgRaster.fitBounds(cEl_project.view.bounds,true);
////                    cEl_project.bkgRaster.onLoad = function(){
////                        cEl_project.bkgRaster.sendToBack();
////                    };
//            }
//        }

        
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}


//var boolImgLoaded = false;




function draw_cEl_layer(cEl_layer) {
    
    try {

        if(!cEl_layer.reset.layout_shape){return true;};
        if(!cEl_layer.visible){
            //cdebug("not visible")();
            cEl_layer.visible = false;
            cEl_layer.reset.layout_shape = false;
            return true;
        }
        
//        cdebug("draw_cEl_layer " + cEl_layer.name)();
        
        //projectSwitch(cEl_layer.projectName);
        layerSwitch(cEl_layer.layerName);
        
        //setGetProject(cEl,cEl_project.name);
        
        var w = paper.shape.w;
        var h = paper.shape.h;
        
        //setGetProject(cEl,cEl_project.parentName);
        
        
        if (!cEl_layer.shape.points){
            cEl_layer.shape.points = paper.data.shapes[cEl_layer.shape.name];
        }
        
        var borderTop = cEl_layer.style.calc["border-top-width"] ? size2px(cEl_layer.style.calc["border-top-width"],false):0;
        var borderRight = cEl_layer.style.calc["border-right-width"] ? size2px(cEl_layer.style.calc["border-right-width"],false):0;
        var borderBottom = cEl_layer.style.calc["border-bottom-width"] ? size2px(cEl_layer.style.calc["border-bottom-width"],false):0;
        var borderLeft = cEl_layer.style.calc["border-left-width"] ? size2px(cEl_layer.style.calc["border-left-width"],false):0;
        
//        cdebug(borderTop + " " +borderRight + " " +borderBottom + " " +borderLeft)();

        w = w - borderRight - borderLeft;
        h = h - borderTop - borderBottom;

        


        if(!cEl_layer.shape.w>0){
            //cEl_project.shape.w = w;
            cEl_layer.shape.w = Math.floor(w * cEl_layer.shape.scale[0] * Math.abs(cEl_layer.shape.points[2][0]-cEl_layer.shape.points[0][0])) ;
        }; 
        if(!cEl_layer.shape.h>0){
            //cEl_project.shape.h = h;
            cEl_layer.shape.h = Math.floor(h * cEl_layer.shape.scale[1] * Math.abs(cEl_layer.shape.points[2][1]-cEl_layer.shape.points[0][1])) ;
        };
        
        cEl_layer.shape.left = Math.floor(w * cEl_layer.shape.masspoint[0] + cEl_layer.shape.w * cEl_layer.shape.points[0][0]) ;
        cEl_layer.shape.top = Math.floor(h * cEl_layer.shape.masspoint[1] + cEl_layer.shape.h * cEl_layer.shape.points[0][1]) ;
        
        
        
        //if(!cEl_project.reset.layout_shape){return true;};
        
//        var cEl_canv = document.getElementById(cEl_project.name + "_project");
//        
//        //cdebug("here " +cEl_canv.id)();
//        
//        
//        if(!cEl_canv){
//            return false;
//        }
//        
//        if(!cEl_project.visible && cEl_project.loaded){
//            if(cEl_canv.style.visibility !== "hidden")cEl_canv.style.visibility = "hidden";
//            cEl_project.reset.layout_shape = false;
//            return true;
//        }else{
//            if(cEl_canv.style.visibility !== "visible")cEl_canv.style.visibility = "visible";
//        }
        
        

        //console.log(cEl_project.shape.w + " " + cEl_project.shape.h);
//        cEl_project.shape.temp = {
//            "cpBorder":{
//                "x":cEl_project.shape.left + Math.floor(cEl_project.shape.w * cEl_project.shape.masspoint[0] + cEl_project.shape.w * cEl_project.shape.points[0][0]),
//                "y":cEl_project.shape.top + Math.floor(cEl_project.shape.h * cEl_project.shape.masspoint[1] + cEl_project.shape.h * cEl_project.shape.points[0][1])
//            }
//        };
//        cEl_project.shape.temp.cpBorder.x1=cEl_project.shape.temp.cpBorder.x+cEl_project.shape.w;
//        cEl_project.shape.temp.cpBorder.y1=cEl_project.shape.temp.cpBorder.y+cEl_project.shape.h;
        
        // reset canvas on resize or move ???
        
        //cdebug(cEl_project.shape)();
        
        //cdebug(cEl_project.visible)();
        
        //cEl_project.visible = cEl_project.visible;
        
        //cdebug(cEl_layer.children[0].children.length)();
        
        //cEl_canv.contentEditable = true;
        
        
        if(cEl_layer.style.calc["background-color"]){
            var bkg = cEl_layer.children[0].children[0];
            if(!bkg){
                bkg = cEl_layer.children[0].addChild(new paper.Path.Rectangle({point: [cEl_layer.shape.left, cEl_layer.shape.top],size: [cEl_layer.shape.w, cEl_layer.shape.h]}));
                bkg.name = cEl_layer.parentName + "_" + cEl_layer.name + "_BKG.C";
            }else{
                //cdebug("update position")();
                //cdebug(bkg)();
                bkg.position = [cEl_layer.shape.left+cEl_layer.shape.w/2,cEl_layer.shape.top+cEl_layer.shape.h/2];
                //bkg.position = [cEl_layer.shape.left,cEl_layer.shape.top];
//              
//                  bkg.y = cEl_layer.shape.top;
//                bkg.width = cEl_layer.shape.w;
//                bkg.height = cEl_layer.shape.h;
            }
            //if(cEl_layer.reset.layout_css){
                bkg.fillColor = cEl_layer.style.calc["background-color"];
            //}
            
        }

        if(cEl_layer.style.calc["background-image"]){
            if(!cEl_layer.bkgImg){
                var url = cEl_layer.style.calc["background-image"];
                url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];
                cEl_layer.bkgImg = new Image();
                cEl_layer.bkgImg.src = url;
                //cdebug(cEl_project.name + " <<< " + url + " start on " + paper.project.name)();

                cEl_layer.bkgImg.onload = function(){
//
//    //                var scaleX = paper.view.bounds.width/raster.width;
//    //                var scaleY = paper.view.bounds.height/raster.height;
//    //                raster.scale([scaleX,scaleY]);
                    
                    //drawProjects(paper,true);
                    layerSwitch(cEl_layer.name);
                    //cdebug("done >>> on " + paper.project.name)();
                    
                    var bkg = cEl_layer.children[0].addChild(new paper.Raster(cEl_layer.bkgImg,new paper.Point(0,0)));
                    bkg.fitBounds(paper.project.view.bounds,true);
                    
                    //var bkg = cEl_project.activeLayer.children[0].children[0];
                    bkg.name = cEl_layer.parentName + "_" + cEl_layer.name + "_BKG.I";
                    //bkg.fitBounds(cEl_layer.view.bounds,true);
                    bkg.onLoad = function(){
                        //cEl_project.bkgRaster.sendToBack();
                    };
                    
                };
            }
        }
        
        //cEl_layer.bringToFront();
        
        
        return true;

    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return false;
    }
}

function draw_cEl_group(cEl_group) {
    
    try {
        
        var cEl_project = projectGet(cEl_group.projectName);
        //cdebug(cEl_project.name)();
        
        var cEl_layer = cEl_project.layers[cEl_group.layerName];
        //cdebug(cEl_layer.name)();
        
        var cEl_pageData = paper.data;
        
        cEl_presets(cEl_group,cEl_pageData);
        
        
        if(!cEl_layer.debug){
            if(!cEl_group.visible || !cEl_layer.visible){
                //cdebug(cEl_group.name)();
                cEl_group.visible = false;
                cEl_group.reset.layout_shape = false;
                return true;
            };
        }
        
//        layerSwitch(cEl_group.layerName);
//            projectSwitch(cEl_group.projectName);
        if(cEl_group.reset.layout_shape){
          
            //cdebug(cEl_group.name + " vs " + cEl_group.visible)();
            
            cEl_project.activate();
            var boolDrawCp = false;

            //cdebug(cEl.shape.rotation,false,true,3)();

            //cdebug("reset.layout_shape <<< " +cEl_group.name +  " >>>  " + cEl_layer.name +  " on " + cEl_group.projectName)();
            cEl_setPaperPath(cEl_group,cEl_group.children["ShapePath"], cEl_group.shape, true, false);
            
            //cEl_group.reset.layout_css = true;
        }
        
        
        //if(cEl_group.name === "tabTRLabel2")cdebug(cEl_group.reset)();
        if(cEl_group.reset.layout_css){
            
            //if(cEl_group.name === "tabTRLabel2")cdebug("reset.layout_css <<< " + cEl_group.name + ", class " + cEl_group.tag +  " >>>  " + cEl_layer.name +  " on " + cEl_group.projectName)();
            //cdebug(cEl_group.style.calc["background-image"])();
            
            // gradient & picture fill
            
//            if(cEl_group.style.calc["background-image"] && cEl_group.name === "tabTRLabel2" && cEl_group.reset.layout_css){
//                cdebug(cEl_group.visible)();
//                //cdebug(boolRedraw)();
//                cdebug(cEl_group.reset.layout_css)();
//                cdebug(cEl_group.style.calc["background-image"])();
//            }
            
            if(cEl_group.style.calc["background-image"]){
                
                
                
                var url = cEl_group.style.calc["background-image"];
                if(url.indexOf("(")>0){
                    fillGradient(cEl_group,url);
                }
                
            }else{
                // normal fill
                var fillColor, strokeColor, lineWidth;
                fillColor = cEl_group.style.calc["background-color"];
//                lineWidth = 1;//cEl.style.calc["border-top-width"].replace("px",'');
                strokeColor = cEl_group.style.calc["border-top-color"];

                if(fillColor){
                    //cdebug(cEl.children[0].children[0])();
                    cEl_group.children["ShapePath"].fillColor = fillColor;
                }
            }
            if(strokeColor){
                cEl_group.children["ShapePath"].strokeColor = strokeColor;
                cEl_group.children["ShapePath"].strokeWidth = lineWidth;
            }
        }
        
        
        
        cEl_postsets(cEl_group,boolDrawCp);
        
        //cEl_group.children["ShapePath"] = cEl_group.children["ShapePath"].rasterize();
        
        //cdebug(paper.project.activeLayer.children.length)();
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function fillGradient(cEl_group,url){
    try{
        
        var gradObj = getFunctionObj(url,false,null);
        
//        cdebug("fillGradient >>> " + cEl_group.name + " >>> " + url)();
//        cdebug(gradObj)();
        
        var path = cEl_group.children["ShapePath"];
        switch(gradObj.fName){
            case "linear-gradient":
                
                switch(gradObj.fArgs[0]){
                    case "to right":
                        var stops = gradObj.fArgs;
                        stops.shift();
                        path.fillColor= {
                            "gradient": {
                                "stops": stops
                            },
                            "origin": path.bounds.leftCenter,
                            "destination": path.bounds.rightCenter
                        };
                    break;
                    default:
                        
                        
                        
                        
                    break;
                }
                
                
                
            break;
            case "url":
                
                //cdebug(gradObj.fArgs)();
                
                if(!cEl_group.children["ShapeRaster"].img){
                    
                    url = gradObj.fArgs.join(",");
                    //url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];
                    url = url.substring(1,url.length-1);


                    url = url.replace("@S","10");

                    var xRes = path.bounds.width;
                    var yRes = path.bounds.height;
                    var xyScale = xRes/yRes;
                    //cdebug(xRes + " " + yRes)();
                    
                    if(xRes>yRes){
                        xRes = 640;//Math.floor(Math.min(640,xRes));
                        yRes = Math.floor(xRes/xyScale);
                    }else{
                        yRes = 640;//Math.floor(Math.min(640,yRes));
                        xRes = Math.floor(yRes*xyScale);
                        
                    }

                    //cdebug(xRes + " " + yRes)();

                    url = url.replace("@X",xRes);
                    url = url.replace("@Y",yRes);
                    
//                    
                    cEl_group.children["ShapeRaster"].img = new Image();
                    cEl_group.children["ShapeRaster"].img.src = url;
                    cEl_group.children["ShapeRaster"].img.onload = function(){
                        //cdebug(path.bounds)();
                        var bkg = cEl_group.children["ShapeRaster"].addChild(new paper.Raster(cEl_group.children["ShapeRaster"].img, path.position));
                        bkg.fitBounds(path.bounds);
                        
                        if(cEl_group.data.type === "map"){
                        
                            //bkg.onLoad = function(){
//                                var star = cEl_group.children["ShapeRaster"].addChild(new paper.Path.Star(path.position,8,6,10));
//                                star.strokeColor = 'red';
                            //};
                        }
                    };
                }
                
                
                
                
//                var raster = cEl_group.children["ShapeRaster"].addChild(new paper.Raster(url));
//                raster.onLoad = function(){
//                    var scaleX = cEl_group.children["ShapePath"].bounds.width/raster.width;
//                    var scaleY = cEl_group.children["ShapePath"].bounds.height/raster.height;
//                    raster.scale([scaleX,scaleY]);
//                    raster.position = cEl_group.children["ShapePath"].position;
//                };
                
            break;
        }
        
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

            for(var i=0,cEl_stateId,cEl_state,cEl_actState;i< stateNames.length; i++){

                if(cEl.states[stateNames[i]] && cEl_page.state[stateNames[i]]){
                    
                    cEl_actState = cEl_page.state[stateNames[i]][0];
                    cEl_stateId = cEl.states[stateNames[i]][cEl_actState];
                    cEl_state = cEl_page.states[cEl_stateId];
                    
                    if(!cEl.states[stateNames[i]]["_prev"] || (cEl.states[stateNames[i]]["_prev"]!==cEl_stateId)){
                        //cdebug(cEl_state)();
                        cEl = $.extend(true,cEl,cEl_state);
                        cEl.states[stateNames[i]]["_prev"] = cEl_stateId;
                    }
                }
            }
        }

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_postsets(cEl_group,boolDrawCp){
    try{
        switch(cEl_group.data.type){
            case "text":
                draw_cEl_text(cEl_group);
                return true;
            break;
            default:
//                cEl_group.selected=true;
//                cdebug(cEl_group)();
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
            for(var x=0,holder, intMaxSelectors = cSSSelectors.length;x<intMaxSelectors;x++) {
                //cdebug(arrStyle);
                holder = cSSSelectors[x].selectorText;
                
                switch(holder){
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
                        
                        
                        //cdebug("<<<<< " + holder)(); 
                        if(!GLOBAL_styles[holder]){
                            var ruleStyle = cSSSelectors[x].style ? cSSSelectors[x].style : cSSSelectors[x];
                            var strCIdStyle = ruleStyle.cssText;

                            if(strCIdStyle){

                                var ruleContainer = {};
                                for(var i = 0,keyname; i<ruleStyle.length;i++){
                                    keyname = ruleStyle[i];
                                    //cdebug(keyname + "  >>>>>>> " + ruleStyle[keyname])();
                                    ruleContainer[keyname] = ruleStyle[keyname];
                                }
                                
                                GLOBAL_styles[holder] = ruleContainer;
                            }else{
                                GLOBAL_styles[holder] ={};
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
        cEl.reset.layout_css = true;
        
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

        //var cEl_layer = cEl_caller.project;
        //cEl_layer.reset.layout_shape = true;
        
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
            if(boolRedraw)cEl.reset.layout_shape = true;
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
//            case "group":// Poligon Shape Lines
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
////                        case "group":
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

function cEl_setPaperPath(cEl_group,cEl_pathHolder, shapeContainer, boolReset, boolSetCP){
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
        
        var x0,y0,x,y,x1,y1,x2,y2,wF,hF,cpMP,points,pointsLen;
        var cEl_path;
        var i=0;
        var scaleCP=[1,1];
        var cEl_layer = paper.project.layers[cEl_group.layerName];
        var cEl_page = paper.data;
        
        wF=cEl_layer.shape.w;
        hF=cEl_layer.shape.h;
        if(!shapeContainer.scale[1]){
            shapeContainer.scale[1] = shapeContainer.scale[0] * wF/hF;
        }else if(!shapeContainer.scale[0]){
            shapeContainer.scale[0] = shapeContainer.scale[1] * hF/wF;
        }
        
        var flipXY = shapeContainer.flipXY?shapeContainer.flipXY:[false,false];
        if(!shapeContainer.masspoint){
            shapeContainer.masspoint = $.extend(true,[],cEl_layer.shape.masspoint);
        }
        
        if(shapeContainer.parentoffsetMp){
            var parentMp = cEl_layer.shape.masspoint;
            var parentCp = cEl_layer.shape.points[shapeContainer.parentoffsetMp.pointindex];
            shapeContainer.masspoint = [cEl_layer.shape.scale[0]*parentCp[0] + parentMp[0] + shapeContainer.parentoffsetMp.x, cEl_layer.shape.scale[1]*parentCp[1] + parentMp[1] + shapeContainer.parentoffsetMp.y];
        }else{

        }
        shapeContainer.temp.cpMp = [cEl_layer.shape.left + wF*shapeContainer.masspoint[0] ,cEl_layer.shape.top + hF*shapeContainer.masspoint[1] ,3];
        cpMP = shapeContainer.temp.cpMp;
        
        
        cEl_pathHolder.removeChildren();
        
        if(shapeContainer.type==="svg"){
            
            shapeContainer.points = cEl_page.shapes[cEl_group.shape.name];
            
            cEl_pathHolder.addChild(new paper.CompoundPath(shapeContainer.points));
            cEl_pathHolder.position = new paper.Point(cpMP);
//            cdebug(cEl_path.className)();
//            cEl_path = cEl_pathHolder.children[1];
//            cEl_group.children["ShapePath"].position = new paper.Point(cpMP);
            ;//new paper.Point(cEl_pathHolder.position);
//            cEl_pathHolder.pivot = new paper.Point(cEl_group.children["ShapePath"].position);
//            cEl_group.pivot = cEl_pathHolder.pivot;
//            cdebug(cEl_group.name)();
//            cdebug(shapeContainer.scale)();
//            cdebug(cpMP)();
//            
            cEl_group.pivot = new paper.Point(cpMP);
            cEl_group.scale(shapeContainer.scale[0],shapeContainer.scale[1]);
            
            
            
//            cEl_pathHolder.applyMatrix = false;
            //cEl_pathHolder.position = new paper.Point(cpMP);
//            cdebug(shapeContainer.scale)();
            
            //cEl_path.name = cEl_group.parentName + "_" + cEl_group.name + ".Path";
            
//            cEl_group.children["ShapePath"].removeChildren();
//            cEl_path = cEl_group.children["ShapePath"].addChild(new paper.CompoundPath(shapeContainer.points));
            //cEl_path = cEl_group.children["ShapePath"];
           //cEl_pathHolder.pivot = new paper.Point(subPath.position);
            
        }else{
            
            shapeContainer.points = $.extend(true,[],cEl_page.shapes[cEl_group.shape.name]);
            points = shapeContainer.points;
            pointsLen = points.length;
            
            scaleCP = [shapeContainer.scale[0]*wF,shapeContainer.scale[1]*hF];
            
//            cEl_group.children["ShapePath"].
            cEl_path = cEl_pathHolder.addChild(new paper.CompoundPath(new paper.Path()));
            
            var subPath = cEl_pathHolder.children[0];
            
            switch(shapeContainer.type){

                case "poligon":// Poligon Shape Lines

                    x0 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                    y0 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                    subPath.moveTo(x0, y0);

                    for(i = 1; i < pointsLen; i = i + 1){
                        x = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
                        subPath.lineTo(x, y); 
                    }
                    subPath.lineTo(x0, y0); 
                    //cEl_path.closed = true;

                break;

                case "quadratic":// Poligon  Shape Quadratic Points

                    x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                    subPath.moveTo(x, y);

                    for(i = 0; i < pointsLen - 2; i = i + 2){ //len
                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                        subPath.quadraticCurveTo(x,y,x1,y1); 
                    }
                    switch(pointsLen-i){
                        case 2:

                            x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                            y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                            x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                            y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                            subPath.quadraticCurveTo(x,y,x1,y1);
                        break;
                        case 1:

                            x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                            y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                            subPath.lineTo(x, y);
                        break;
                    }
                    //cElPath.closed = true;
                break;

                case "bezier":// Poligon  Poligon  Shape Bezier Points

                    x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                    subPath.moveTo(x, y);

                    for(i = 0; i < pointsLen - 3; i = i + 3){

                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                        x2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,0);
                        y2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,1);

                        subPath.cubicCurveTo(x,y,x1,y1,x2,y2); 
                    }
                    switch(pointsLen-i){
                        case 3:

                            x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                            y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                            x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                            y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                            x2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                            y2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                            subPath.cubicCurveTo(x,y,x1,y1,x2,y2);

                        break;
                        case 2:

                            x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                            y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                            x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                            y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                            subPath.quadraticCurveTo(x,y,x1,y1);

                        break;
                        case 1:

                            x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                            y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                            subPath.lineTo(x, y);

                        break;

                    }
                    //cElPath.closed = true;
                break;
            };
            
            cEl_pathHolder.pivot = new paper.Point(cpMP);
            cEl_group.pivot = cEl_pathHolder.pivot;
        }

        
        if(cEl_group.shape.rotation){
            //cdebug()();
            cEl_group.rotate(cEl_group.shape.rotation,cpMP);
            
        }
        
        return cEl_path;

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
            c[i] = ~~c[i];
        }
        return c;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

//console.log(mergeIntArrays([1,1,2,3,4,8,9,11,15,16],[8,9,10,11,12]));

function getIntArray(val1,val2){
    
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
        //cdebug(boolLeft)();
        //if(boolSkipLast){a.pop();};//&& val1<=val2
        return a;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getFunctionObj(strEval,boolEvalArgs,actEl){
    try{
        
        var fctName = strEval.split("(")[0];
        var args = strEval.split("(")[1];
        var args = args.split(")")[0];
        args = args.split(",");
        
//        cdebug(fctName)();
        
        if(boolEvalArgs){
            for(var i = 0 ;i<args.length;i++){
                if(args[i] === "this"){
                    args[i] = actEl;
                    //cdebug(args[i])();
                }else{
                    args[i] = eval(args[i]);
                }
                //cdebug(args[i])();
            }
        }else{
            for(var i = 0 ;i<args.length;i++){
                args[i] = trim(args[i]);
            }
        }
        
        return {"fName":fctName,"fArgs":args};
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function runEval(actEl, evtType){
    
    try{
        
        
        if(!actEl || !actEl.events)return null;
        var strEval = actEl.events[evtType];
        
        if(strEval && actEl.enabled){
        
            //cdebug(strEval)();
            var fctObj = getFunctionObj(strEval,true,actEl);
//            return eval(strEval);
            
            //return window[fctName](args);
            return executeFunctionByName2(fctObj);
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function executeFunctionByName2(fctObj){
    
    try{ 
        var arr = fctObj.fName.split('.');
        var fn = window[ arr[0] ];
        for (var i = 1; i < arr.length; i++)
        { fn = fn[ arr[i] ]; }
        return fn.apply(window, fctObj.fArgs);
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        cdebug("undefined function " + Obj.fName,false,false,3)();
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

        if(!cEl.reset.cursor)return false;
        if(document.body.style.cursor !== cEl.style.calc["cursor"]){
            document.body.style.cursor = cEl.style.calc["cursor"];
            //cdebug("here")();
        }
        cEl.reset.cursor = false;

        return true;
    } catch (e) {
        
        //cdebug(cEl.style.default)();
        
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

function sign1(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 1 : 1 : 1;
}



// Closure
(function() {
  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

/**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}