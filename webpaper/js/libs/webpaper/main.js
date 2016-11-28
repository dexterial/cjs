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
            //renderer([jsonPage.id]);
            renderer([jsonPage.id]);
            //interval1 = setInterval(function(){renderer([jsonPage.id]);},GLOBAL_rendertime);
 
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
                //console.log(pageId + "_" + cEl.id + "_canvas");
                delete window[pageId + "_" + cEl.id];
                var child = document.getElementById(pageId + "_" + cEl.id + "_canvas");
                if(child)document.body.removeChild(child);
            break;
            case "shape": //draw shape 
                delete window[cEl.parentId + "_" + cEl.id ];
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
        var intConsoleNo = arguments[3] ? arguments[3] :0;
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
                window[cEl_debug.parentId].shape.redraw = true;
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

function getSetHtmlEl(cEl){
    try {
        switch(cEl.tag){
            case "canvas": //draw canvas element
                if(window[cEl.pageId+"_"+cEl.id+"_"+cEl.tag]){
                    return window[cEl.pageId+"_"+cEl.id+"_"+cEl.tag];
                }else{
                    var canvEl = document.createElement(cEl.tag);
                    canvEl.style.position = "absolute";
                    document.body.appendChild(canvEl);
                    canvEl.id = cEl.pageId+"_"+cEl.id+"_"+cEl.tag;
                    return canvEl;
                }
                
            break;
        }    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function pre_load_children(cEl,pageId,layerId,parentId){
    
    try{
        
        if(!cEl)return true;
        var boolAllIsWell = true;
        
        // set additional
        if(cEl.element){
            if(!pageId){pageId = cEl.pageId;}
            if(!cEl.loaded){
//                cdebug(cEl.id,false,true,3)();
//                cdebug(cEl.shape,false,true,3)();
                cEl = $.extend(true, cEl, window[pageId].elements[cEl.element]);
//                if(!cEl.states)cEl.states = {};
//                cEl.states = $.extend(true, cEl.states, window[pageId].states);
                
//                cdebug(cEl.shape,false,true,3)();
                cEl.loaded = true;
            }
        }

        // set parent and window objects
        switch(cEl.tag){
            case "page": //draw page element
                
                if(pageId){
                    cEl.id = pageId;
                    cEl.pageId = pageId;
                }else{
                    pageId = cEl.id;
                }
                setEventHolder(pageId);
                parentId = "";
                cEl.parentId = "";
                 // add window object
                if(!window[cEl.id]){
                    window[cEl.id]=cEl;
                }
                
            break;
            case "canvas": //draw canvas element
                //console.clear();
                if(pageId){
                    cEl.pageId = pageId;
                }else{
                    pageId = cEl.pageId;
                }
                
                if(layerId){
                    cEl.id = layerId;
                }else{
                    layerId = cEl.id;
                }
                parentId = pageId;
                
                cEl.layerId = layerId;
                cEl.parentId = pageId;
                
                // add window object
                if(!window[cEl.parentId + "_" + cEl.id]){
                    window[cEl.parentId + "_" + cEl.id]=cEl;
                }
                
                // preload style
                if(!cEl.style){
                    setStyle_cEl(cEl);
                }
                
                getSetHtmlEl(cEl);
                
            break;
            case "shape": //draw shape
                
                if(pageId){
                    cEl.pageId = pageId;
                }else{
                    pageId = cEl.pageId;
                }
                
                if(layerId){
                    cEl.layerId = layerId;
                }else{
                    layerId = cEl.id;
                }
                
                if(parentId){
                    cEl.parentId = parentId;
                }else{
                    parentId = cEl.parentId + "_" + cEl.id;
                }
                
                // add window object
                if(!window[cEl.parentId + "_" + cEl.id]){
                    window[cEl.parentId + "_" + cEl.id]=cEl;
                }
                
                // preload style
                if(!cEl.style){
                    setStyle_cEl(cEl);
                }
                
                //if(cEl.shape.rotation){cdebug(cEl.pageId + " vs " + cEl.id,false,true,3)();}
                //boolHasChildren = cEl.children ? true: false;
                
            break; 
        }
        
        
        var boolChildren = cEl.children ? true: false;
        //cdebug(cEl.parentId + "_" + cEl.id + " " + boolChildren,false,true,1)();
        if(boolChildren){
            for(var i = 0, len = cEl.children.length +1 ;i < len; i++){
                boolAllIsWell = (boolAllIsWell && pre_load_children(cEl.children[i],pageId,layerId,cEl.parentId + "_" + cEl.id));
            };
        }
        return boolAllIsWell;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function drawChildren(cEl,boolRedraw){
    
    try{
        //if(!cEl)return true;
        var boolAllIsWell = true;
        if(cEl.tag === "canvas"){boolRedraw = cEl.shape.redraw;};
        boolAllIsWell = (boolAllIsWell && draw_cEl(cEl,boolRedraw));
        
        var boolHasChildren = cEl.children ? true: false;
        
        if(boolHasChildren){
            for(var i = 0;i < cEl.children.length; i++){
                boolAllIsWell = (boolAllIsWell && drawChildren(cEl.children[i],boolRedraw));
            };
        }
        
        return boolAllIsWell;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function draw_cEl(cEl,boolRedraw){
    try{
        //if(!cEl){return false;};
        
        switch(cEl.tag){
            case "page": //draw page element
                if(!cEl.shape.redraw){return true;};
                //cdebug("draw page " + cEl.id)();
//                cdebug("draw page " + cEl.id,true,false,2)();
                draw_cEl_page(cEl);
                cEl.shape.redraw = false;
            break;
            case "canvas": //draw canvas element
                if(!cEl.shape.redraw){return true;};
                // compute style
                if(cEl.style.redraw){
                    set_cEl_Calc_Style(cEl,{"cursor":"default","background-color":"rgba(0,0,0,0)","border-top-width":"0px","border-top-color":"rgba(0,0,0,0.5)"});
                }
                //cdebug("draw canvas")();
                draw_cEl_canvas(cEl);
                cEl.style.redraw = false;
            break;
            case "shape": //draw shape
                
                //it renders all shape elements if layer is reset ..... so the shape.redraw does not do much, 
                //perhaps load the image of the shape in a temp value of the cel.shape element and 
                //just repaint the canvas as the old time, that can speed up stuff.
                
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
//                if(cEl.layerId !== "control" && cEl.layerId !== "stats" )cdebug("draw shape " + cEl.id + " , redraw " + cEl.shape.redraw,false,false,2)();
                draw_cEl_shape(cEl);
                cEl.shape.redraw = false;
                cEl.style.redraw = false;
                //cdebug("END draw shape " + cEl.id + " , redraw " + cEl.shape.redraw,false,false,2)();
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
        //if(!cEl.shape.redraw){return true;};
        if(!cEl.visible){return true;}
        
        var w = window.innerWidth;
        var h = window.innerHeight;
        
        //console.log(w + " " + h);
        
        if (!cEl.shape.points){
            cEl.shape.points = cEl.shapes[cEl.shape.id];
        }
        
        if(!cEl.shape.w>0){
            //cEl.shape.w = w;
            cEl.shape.w = Math.floor(w * cEl.shape.scale[0] * Math.abs(cEl.shape.points[2][0]-cEl.shape.points[0][0])) ;
        }; 
        if(!cEl.shape.h>0){
            //cEl.shape.h = h;
            cEl.shape.h = Math.floor(h * cEl.shape.scale[1] * Math.abs(cEl.shape.points[2][1]-cEl.shape.points[0][1])) ;
        };
        
        cEl.shape.left = Math.floor(w * cEl.shape.masspoint[0] + cEl.shape.w * cEl.shape.points[0][0]);
        cEl.shape.top = Math.floor(h * cEl.shape.masspoint[1] + cEl.shape.h * cEl.shape.points[0][1]);
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}

var boolImgLoaded = false;

function setGetProject(cEl_canv,name){
    try {
        
        for(var i = 0; i<projects.length; i++){
            if(projects[i].name && projects[i].name === name){
                if(paper.project.name && paper.project.name!==name){
                    projects[i].activate();
                    //cdebug(projects[i].name)();
                    return true;
                }
            }
        }
        paper.setup(cEl_canv);
        paper.project.name = name;
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
} 


function draw_cEl_canvas(cEl) {
    
    try {
        if(!cEl.shape.redraw){return true;};
        
        var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_canvas"];
        
        
        
        if(!cEl_canv){
            return false;
        }
        
        
        var cElPage = window[cEl.pageId];
        //console.log(cElPage.id);

        if (!cEl.shape.points){
            cEl.shape.points = $.extend(true,[],cElPage.shapes[cEl.shape.id]);
        }
        
        cEl.shape.w = Math.floor(cElPage.shape.w * cEl.shape.scale[0] * Math.abs(cEl.shape.points[2][0]-cEl.shape.points[0][0])) ;
        cEl.shape.h = Math.floor(cElPage.shape.h * cEl.shape.scale[1] * Math.abs(cEl.shape.points[2][1]-cEl.shape.points[0][1])) ;
        
        
        if(!cEl.visible && cEl.loaded){
            if(cEl_canv.style.visibility !== "hidden")cEl_canv.style.visibility = "hidden";
            cEl.shape.redraw = false;
            return true;
        }else{
            if(cEl_canv.style.visibility !== "visible")cEl_canv.style.visibility = "visible";
        }
        
        

        //console.log(cEl_canvas.id);

        //console.log(cEl.shape.w + " " + cEl.shape.h);
        cEl.shape.temp = {
            "cpBorder":{
                "x":cElPage.shape.left + Math.floor(cElPage.shape.w * cEl.shape.masspoint[0] + cEl.shape.w * cEl.shape.points[0][0]),
                "y":cElPage.shape.top + Math.floor(cElPage.shape.h * cEl.shape.masspoint[1] + cEl.shape.h * cEl.shape.points[0][1])
            }
        };
        cEl.shape.temp.cpBorder.x1=cEl.shape.temp.cpBorder.x+cEl.shape.w;
        cEl.shape.temp.cpBorder.y1=cEl.shape.temp.cpBorder.y+cEl.shape.h;
        
        
        cEl_canv.style.left = cEl.shape.temp.cpBorder.x + 'px';
        cEl_canv.style.top =  cEl.shape.temp.cpBorder.y + 'px';
//        
//        // reset canvas
        cEl_canv.width = cEl.shape.w;
        cEl_canv.height = cEl.shape.h;
        
        var cEl_ctx = cEl_canv.getContext('2d');
        cEl_ctx.textBaseline="alphabetic";
        cEl_ctx.textAlign="left";
        
        //cEl_canv.contentEditable = true;
        var boolRedraw = false;
        
        
        setGetProject(cEl_canv,cEl.pageId + "_" + cEl.layerId + "_canvas");
        
        if(cEl.style.calc["background-image"]){
            var url = cEl.style.calc["background-image"];
            url = url.match(/url\(["|']?([^"']*)["|']?\)/)[1];
            
            
            // TODO , add more logic from css with scale "auto" stuff
            var raster = new paper.Raster(url);
            raster.onLoad = function(){boolImgLoaded=true;};
            var scaleX = paper.view.bounds.width/raster.width;
            var scaleY = paper.view.bounds.height/raster.height;
            raster.scale([scaleX,scaleY]);
            //raster.width = 100;
            //raster.height = 100;
            
            raster.fitBounds(paper.view.bounds,false);
//            if(!cEl.image){
//                cEl.image = new Image();
//                cEl.image.src = url;
//            }else if(cEl.image.src !== url){
//                cEl.image.src = url;
//            }
//            cEl.image.onload = function(){boolImgLoaded=true;};
//            //console.log(cEl.style.calc["background-image"]);
//            cEl_ctx.drawImage(cEl.image, 0, 0,cEl.shape.w,cEl.shape.h); //,cEl.shape.w,cEl.shape.h
        }else{
            boolRedraw = true;
        }
        
        //cEl_canv.style.width = cEl.shape.w + 'px';
        //cEl_canv.style.height = cEl.shape.h + 'px';

        // reset canvas style stuff
        //cdebug(cEl.style["background-color"])();

        if(cEl.style.calc["box-shadow"])cEl_canv.style.boxShadow = cEl.style.calc["box-shadow"];
        //cEl_canv.style.backgroundColor = cEl.style.calc["background-color"];
        
        
        //console.log(JSON.stringify(cEl.style.calc));
        cEl_canv.style.border = "solid " + cEl.style.calc["border-top-width"] + " " + cEl.style.calc["border-top-color"] ;
        

        //cEl_canv.style.border = "solid 1px blue";//cEl_canv.cStyle["border"];

        if(cEl.debug){
            drawGrid(cEl_canv);
            if(!cEl.data.temp)cEl.data.temp = {"drawPoints":null,"rf":[]};
        }
        
        if(boolImgLoaded || boolRedraw)cEl.shape.redraw = false;

        return true;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return false;
    }
}

function draw_cEl_shape(cEl) {
    
    try {
        
        //cdebug(cEl.id,false,true,3)();

        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        var cEl_parent = window[cEl.parentId];
        var cEl_page = window[cEl.pageId];
        
        cEl.visible = cEl_parent.visible;
        if(!cEl_parent.visible){cEl.visible = false; };

        cEl_presets(cEl,cEl_page);
        
        if(!cEl_layer.debug){
            if(!cEl.visible || !cEl_layer.visible){
                cEl.shape.redraw = false;
                return true;
            };
        }
        
        //if(cEl.shape.redraw === true){
          

        var boolDrawCp = false;

        //var cEl_page = window[cEl.pageId];
        

        //{console.log("pageId: " + cEl.pageId + ", layerId: " + cEl.layerId + ", parentId:  " + cEl.parentId + ", cEl.id: " + cEl.id + ",    redraw:" + cEl.shape.redraw);}
        
        
        //cdebug(cEl.shape.rotation,false,true,3)();
        
        
        //oldShapeDraw(cEl,cEl_ctx,boolDrawCp,cEl_layer)
        
        cEl_setPaperPath(cEl, cEl.shape, true, false);
        
        
        var fillColor, strokeColor, lineWidth;
        if(cEl_layer.debug){
            var editIndex = cEl_layer.data.editIndex ? cEl_layer.data.editIndex : null;
            var cEl_index = window[editIndex];
            boolDrawCp = cEl_index ? true : false;
            
            boolDrawCp = boolDrawCp && (cEl_index.parentId + cEl_index.id === cEl.parentId + cEl.id);
            if(boolDrawCp){
                fillColor = cEl.style.default.calc["background-color"] ? cEl.style.default.calc["background-color"] : null;
                lineWidth = cEl.style.default.calc["border-top-width"] ? cEl.style.default.calc["border-top-width"].replace("px",'') : 1;
                strokeColor = cEl.style.default.calc["border-top-color"] ? cEl.style.default.calc["border-top-color"] : null;
            }else{
                fillColor = cEl.visible? "rgba(0,0,0,0.1)" : "rgba(255,0,0,0.1)";
                lineWidth = 1;
                strokeColor = "rgba(0,0,0,0.5)";
            }
        }else{
            fillColor = cEl.style.calc["background-color"];
            lineWidth = 1;//cEl.style.calc["border-top-width"].replace("px",'');
            strokeColor = cEl.style.calc["border-top-color"];
        }
        
        if(fillColor){
            cEl.shape.path.fillColor = fillColor;
        }
        if(strokeColor){
            cEl.shape.path.strokeColor = strokeColor;
            cEl.shape.path.strokeWidth = lineWidth;
        }
        
        
        
        var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_canvas"];
        var cEl_ctx = cEl_canv.getContext('2d');
        cEl_postsets(cEl,cEl_ctx,boolDrawCp);
        
        
        
        
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function oldShapeDraw(cEl,boolDrawCp,cEl_layer){
    
    
    var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_canvas"];
    var cEl_ctx = cEl_canv.getContext('2d');
    cEl_setPath(cEl_ctx, cEl, cEl.shape, true, true); //cEl.shape.redraw
        

        
        //cdebug(cEl.shape.rotation,false,true,3)();

        var fillColor, strokeColor, lineWidth;
        cEl_ctx.save();
        if(cEl_layer.debug){
            var editIndex = cEl_layer.data.editIndex ? cEl_layer.data.editIndex : null;
            var cEl_index = window[editIndex];
            boolDrawCp = cEl_index ? true : false;
            
            boolDrawCp = boolDrawCp && (cEl_index.parentId + cEl_index.id === cEl.parentId + cEl.id);
            if(boolDrawCp){
                fillColor = cEl.style.default.calc["background-color"] ? cEl.style.default.calc["background-color"] : null;
                lineWidth = cEl.style.default.calc["border-top-width"] ? cEl.style.default.calc["border-top-width"].replace("px",'') : 1;
                strokeColor = cEl.style.default.calc["border-top-color"] ? cEl.style.default.calc["border-top-color"] : null;
            }else{
                fillColor = cEl.visible? "rgba(0,0,0,0.1)" : "rgba(255,0,0,0.1)";
                lineWidth = 1;
                strokeColor = "rgba(0,0,0,0.5)";
            }
        }else{
            fillColor = cEl.style.calc["background-color"];
            lineWidth = 1;//cEl.style.calc["border-top-width"].replace("px",'');
            strokeColor = cEl.style.calc["border-top-color"];
        }

        if(fillColor)cEl_ctx.fillStyle = fillColor;
        if(strokeColor)cEl_ctx.strokeStyle = strokeColor;
        cEl_ctx.lineWidth = lineWidth;

        if(cEl.shape.rotation){
            //cEl_ctx.save();
            cEl_ctx.translate(cEl.shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]);
            cEl_ctx.rotate(cEl.shape.rotation*2*Math.PI);
            cEl_ctx.translate(-cEl.shape.temp.cpMp[0],-cEl.shape.temp.cpMp[1]);
            //cEl_ctx.restore();
        }
        
        if(cEl.style.calc["box-shadow"]){
            var shadowObj = getShadowObj(cEl.style.calc["box-shadow"]);
//            cdebug(shadowObj,true,true)();
//            cdebug(cEl.style.calc["box-shadow"],false,true)();
            cEl_ctx.shadowOffsetX = shadowObj[0].shadowOffsetX;
            cEl_ctx.shadowOffsetY = shadowObj[0].shadowOffsetY;
            cEl_ctx.shadowBlur = shadowObj[0].shadowBlur;
            cEl_ctx.shadowSpread = shadowObj[0].shadowSpread;
            cEl_ctx.shadowColor = shadowObj[0].shadowColor;
        }
        


        if(GLOBAL_Path2D){
            if(fillColor){
                cEl_ctx.fill(cEl.shape.path);
            }
            if(strokeColor){
                cEl_ctx.stroke(cEl.shape.path);
            }
        }else{
            if(fillColor){
                cEl_ctx.fill();
            }
            if(strokeColor){
                cEl_ctx.stroke();
            }
        }

        if(boolDrawCp){
            cEl_drawCp(cEl.shape,cEl_ctx);
            draw_pointXY(cEl, cEl_layer, cEl_ctx);
        }
        cEl_ctx.restore();
        
        
        /// TODO text stuff here , ADD shadow text as well by using text-shadow component on ctx
        cEl_postsets(cEl,cEl_ctx,boolDrawCp);
    
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
            //cdebug(cEl.id,false,true,0)();
            var stateNames = getKeys(cEl.states);
            //cdebug(stateNames,true,true,0)(); 
            
            for(var i=0,cEl_stateId,cEl_state;i< stateNames.length; i++){
                
                //cdebug(stateNames[i],false,true,0)();
                //cdebug(cEl_page.state[stateNames[i]],false,true,0)();
                //cdebug(cEl_page.state[stateNames[i]][0],false,true,0)();
                
                if(cEl.states[stateNames[i]] && cEl_page.state[stateNames[i]]){
                    //cEl_page.state[stateNames[i]]
                    //cdebug(cEl.id + " " + cEl.states[stateNames[i]] + " vs " + cEl_page.state[stateNames[i]],false,true,0)();
                    cEl_stateId = cEl.states[stateNames[i]][cEl_page.state[stateNames[i]][0]];
                    

                    cEl_state = cEl_page.states[cEl_stateId];
                    //cdebug(cEl_state,false,true,0)(); 
                    cEl = $.extend(true,cEl,cEl_state);
                }
            }
            
//            cdebug(cEl.states,false,true,0)();
//            cdebug(getKeys(cEl.states),false,true,0)(); 
        }

//        switch(cEl.data.type){
//            case "list":
//                if(cEl.data.values){
//                    for(var i = 0,len = cEl.children.length,val_temp,cEl_out;i<len;i++){
//                        val_temp = cEl.data.values[cEl.children[i].id];
//                        if(val_temp){
//                            if(val_temp["eval"]){
//                                //cdebug(eval(cEl.data.values[cEl.children[i].id]["val"]))();
//                                cEl.children[i].data.values.text = eval(val_temp["val"]);
//                                cEl.children[i].data.values.temp = null;
//                            }else{
//                                cEl.children[i].data.values.text = val_temp["val"];
//                                cEl.children[i].data.values.temp = null;
//                            }
//
//                            if(cEl.children[i].id === cEl.data.index){
//                                cEl_out = window[cEl.parentId+"_"+cEl.id+"_"+val_temp["out_id"]];
//
//                                if(val_temp["out_eval"]){
//                                    cEl_out.data.values.text = eval(val_temp["out_val"]);
//                                    cEl_out.data.values.temp = null;
//                                }else{
//                                    cEl_out.data.values.text = val_temp["out_val"];
//                                    cEl_out.data.values.temp = null;
//                                }
//                            }
//                        }
//                    }
////                if(boolHasChanges){
////                    var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
////                    cEl_layer.shape.redraw = true;
////                }
//                }
//                return true;
//            break;
//            default:
//                return true;
//            break;
//        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_postsets(cEl,cEl_ctx,boolDrawCp){
    try{
        switch(cEl.data.type){
            case "text":
                draw_cEl_text(cEl_ctx,cEl,boolDrawCp);
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

        var cEl_fullId = cEl.parentId + "_" + cEl.id;
        var GLOBAL_styles = window[cEl.pageId].styles;
        
        cEl.style = {};
        cEl.style.default = {};
        cEl.style.hover = {};
        cEl.style.active = {};
        cEl.style.focus = {};
        cEl.style.redraw = true;
        
        var cEl_style_id = GLOBAL_styles["#" + cEl_fullId];
        if(!cEl_style_id){
            // just make an entry inside the main Global style variable
            setStyleGlobal(GLOBAL_styles,cEl_fullId, cEl.class, cEl.tag);
        }

        cEl.style.default.tag =  GLOBAL_styles[cEl.tag];
        cEl.style.default.class = GLOBAL_styles["." + cEl.class];
        cEl.style.default.id = GLOBAL_styles["#" + cEl_fullId];
        
        cEl.style.hover.tag =  GLOBAL_styles[cEl.tag + ":hover"];
        cEl.style.hover.class = GLOBAL_styles["." + cEl.class + ":hover"];
        cEl.style.hover.id = GLOBAL_styles["#" + cEl_fullId + ":hover"];
        
        cEl.style.focus.tag =  GLOBAL_styles[cEl.tag + ":focus"];
        cEl.style.focus.class = GLOBAL_styles["." + cEl.class + ":focus"];
        cEl.style.focus.id = GLOBAL_styles["#" + cEl_fullId + ":focus"];
        
        cEl.style.active.tag =  GLOBAL_styles[cEl.tag + ":active"];
        cEl.style.active.class = GLOBAL_styles["." + cEl.class + ":active"];
        cEl.style.active.id = GLOBAL_styles["#" + cEl_fullId + ":active"];
         
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
        cEl.style.default.calc = $.extend(true,{},cEl.style.default.tag,cEl.style.default.class,cEl.style.default.id,cEl.style.custom);
        cEl.style.calc = $.extend(true,objKeysDefs,cEl.style.default.calc);
        
        if (cEl.hover){ //.states.global.hover.
            cEl.style.hover.calc = $.extend(true,{},cEl.style.hover.tag,cEl.style.hover.class,cEl.style.hover.id);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.hover.calc);
        };
        if (cEl.focus){ //.states.global.hover.
            cEl.style.focus.calc = $.extend(true,{},cEl.style.focus.tag,cEl.style.focus.class,cEl.style.focus.id);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.focus.calc);
        };
        if (cEl.active){ //.states.global.hover.
            cEl.style.active.calc = $.extend(true,{},cEl.style.active.tag,cEl.style.active.class,cEl.style.active.id);
            cEl.style.calc = $.extend(true,cEl.style.calc,cEl.style.active.calc);
        };
        
        //cEl.style.redraw = false;
        
        return true;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_getChildById(cEl,childId){
    
    try{
        if(cEl.id === childId)return cEl;
        if (cEl.children){
            for (var i = cEl.children.length - 1; i >= 0; i--) {
                if(cEl.children[i].id===childId){
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
        
        
        if(!cEl_caller.states[stateName])return false;
        
        //cdebug(cEl_caller.id, false,true,0);
        
        var cEl_page = window[cEl_caller.pageId];
        
        var stateFrom = cEl_page.state[stateName][0];
        var rule = cEl_page.rules[cEl_caller.rules[stateName]];
        var stateTo;
 
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
        
//        cdebug(cEl_caller.id, false,true,0);
//        cdebug(stateFrom + " vs " + stateTo, false,true,0);
//        cdebug(cEl_page.state[stateName], false,true,0);

        var cEl_layer = window[cEl_caller.pageId + "_" + cEl_caller.layerId];
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
////        var cEl_ctx = document.getElementById(cEl.pageId + "_" + cEl.layerId + "_canvas").getContext('2d');
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
////        var cEl_ctx = document.getElementById(cEl.pageId + "_" + cEl.layerId + "_canvas").getContext('2d');
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
//        //cdebug("checkPointInShape  " + cEl.pageId + "_" + cEl.layerId + "_canvas    vs    " + cEl.id + "  " + cEl.tag,true,true);
//        switch(cEl.tag){
//            case "shape":// Poligon Shape Lines
//                //&& window[cEl.parentId].visible && window[cEl.parentId].events && window[cEl.parentId].enabled
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
        var cElPath = new paper.Path();
        
        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        var cEl_parent = window[cEl.parentId];
        var cEl_page = window[cEl.pageId];
        
        if (!shapeContainer.points){
            shapeContainer.points = $.extend(true,[],cEl_page.shapes[cEl.shape.id]);
        }
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
            shapeContainer.masspoint = $.extend(true,[],cEl_parent.shape.masspoint);
        }
        
        if(shapeContainer.parentoffsetMp){
            //console.log(points[shapeContainer.parentoffsetMp.pointindex][0]*shapeContainer.scale[0]);
            var parentMp = cEl_parent.shape.masspoint;
            var parentCp = cEl_parent.shape.points[shapeContainer.parentoffsetMp.pointindex];
            shapeContainer.masspoint = [cEl_parent.shape.scale[0]*parentCp[0] + parentMp[0] + shapeContainer.parentoffsetMp.x, cEl_parent.shape.scale[1]*parentCp[1] + parentMp[1] + shapeContainer.parentoffsetMp.y];
        }
        
        shapeContainer.temp.cpMp = [wF*shapeContainer.masspoint[0], hF*shapeContainer.masspoint[1] ,3];
        
        cpMP = shapeContainer.temp.cpMp;
        cElPath.name = cEl.parentId + "_" + cEl.id;
        
        switch(shapeContainer.type){

            case "poligon":// Poligon Shape Lines

                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);

                cElPath.moveTo(x, y);
                
                for(i = 1; i < pointsLen; i = i + 1){
                    x = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
                    cElPath.lineTo(x, y); 
                }
                //cElPath.closed = true;
                
            break;
                
            case "quadratic":// Poligon  Shape Quadratic Points

                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                
                cElPath.moveTo(x, y);

                for(i = 0; i < pointsLen - 2; i = i + 2){ //len
                    x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                    y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                    x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
                    y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
                    cElPath.quadraticCurveTo(x,y,x1,y1); 
                }
                switch(pointsLen-i){
                    case 2:

                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
                        x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        cElPath.quadraticCurveTo(x,y,x1,y1);
                    break;
                    case 1:
                        
                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        cElPath.lineTo(x, y);
                    break;
                }
                //cElPath.closed = true;
            break;

            case "bezier":// Poligon  Poligon  Shape Bezier Points
                
                //                x=scaleCP[0]*points[0][0]+cpMP[0];
//                y=scaleCP[1]*points[0][1]+cpMP[1];
                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                cElPath.moveTo(x, y);
                

                
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
                    cElPath.cubicCurveTo(x,y,x1,y1,x2,y2); 
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
                        cElPath.cubicCurveTo(x,y,x1,y1,x2,y2);
                        
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
                        cElPath.quadraticCurveTo(x,y,x1,y1);

                    break;
                    case 1:
//                        x=scaleCP[0]*points[0][0]+cpMP[0];
//                        y=scaleCP[1]*points[0][1]+cpMP[1];
                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
                        
                        //cEl_ctx.lineTo(x, y);
                        cElPath.lineTo(x, y);
                        
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
            cElPath.selected = true;
        }
        
        //shapeContainer.temp.fp = [point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0),point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1)];
        
        shapeContainer.path = cElPath;
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

//function cEl_setPath(cEl_ctx, cEl, shapeContainer, boolReset, boolSetCP){
//    //'use strict';
//    try{
//        //var shapeContainer = cEl.shape;
//        // exit if path already exists
//        if(!shapeContainer.temp){
//            shapeContainer.temp = {"cpMp":[0,0]};
//        }else{
//            // exit if path already exists
//            if(!boolReset){
//                return true;
//            }
//        }
//        
//        var x,y,x1,y1,x2,y2,wF,hF,cpMP;
//        var i=0;
//        var scaleCP=[1,1];
//        var cElPath;
//        var cpArray = [];
//        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
//        var cEl_parent = window[cEl.parentId];
//        var cEl_page = window[cEl.pageId];
//        
//        if (!shapeContainer.points){
//            shapeContainer.points = $.extend(true,[],cEl_page.shapes[cEl.shape.id]);
//        }
//        var points = shapeContainer.points;
//        var pointsLen = points.length;
//        
//        wF=cEl_layer.shape.w;
//        hF=cEl_layer.shape.h;
//        
//        
//        if(!shapeContainer.scale[1]){
//            shapeContainer.scale[1] = shapeContainer.scale[0] * wF/hF;
//        }
//        
//        scaleCP = [shapeContainer.scale[0]*wF,shapeContainer.scale[1]*hF];
//        
//        var flipXY = shapeContainer.flipXY?shapeContainer.flipXY:[false,false];
//
//        if(!shapeContainer.masspoint){
//            shapeContainer.masspoint = $.extend(true,[],cEl_parent.shape.masspoint);
//        }
//        
//        if(shapeContainer.parentoffsetMp){
//            //console.log(points[shapeContainer.parentoffsetMp.pointindex][0]*shapeContainer.scale[0]);
//            var parentMp = cEl_parent.shape.masspoint;
//            var parentCp = cEl_parent.shape.points[shapeContainer.parentoffsetMp.pointindex];
//            shapeContainer.masspoint = [cEl_parent.shape.scale[0]*parentCp[0] + parentMp[0] + shapeContainer.parentoffsetMp.x, cEl_parent.shape.scale[1]*parentCp[1] + parentMp[1] + shapeContainer.parentoffsetMp.y];
//        }
//        
//        shapeContainer.temp.cpMp = [wF*shapeContainer.masspoint[0], hF*shapeContainer.masspoint[1] ,3];
//        
//        //var GLOBAL_Path2D = checkPath2D();
//        if(GLOBAL_Path2D){
//            cElPath = new Path2D();
//        }else{
//            cElPath = cEl_ctx;
//            cElPath.beginPath();
//        }
//        
//        var cpBorder={"x":wF*shapeContainer.masspoint[0],"y":hF*shapeContainer.masspoint[1],"x1":0,"y1":0};
//        cpMP = shapeContainer.temp.cpMp;
//
//        
//        switch(shapeContainer.type){
//
//            case "poligon":// Poligon Shape Lines
//
//                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//
//                if(boolSetCP){
//                    cpArray.push([x, y, 0, 0]);
//                    cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                }
// 
//                cElPath.moveTo(x, y);
//                
//                for(i = 1; i < pointsLen; i = i + 1){
////                    x=scaleCP[0]*points[i][0]+cpMP[0];
////                    y=scaleCP[1]*points[i][1]+cpMP[1];
//                    x = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,0);
//                    y = point_get_cpXY(points[i],scaleCP,cpMP,flipXY,1);
//                
//                    if(boolSetCP){
//                        cpArray.push([x, y, 0, i]);
//                        cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                    }
//                    
//                    cElPath.lineTo(x, y); 
//                }
//                
//            break;
//
//            case "quadratic":// Poligon  Shape Quadratic Points
//                //cEl_ctx.beginPath();
////                x=scaleCP[0]*points[0][0]+cpMP[0];
////                y=scaleCP[1]*points[0][1]+cpMP[1];
//                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                
////                console.log("0 " + i + " ; " + [x,y]);
//                
//                if(boolSetCP){
//                    cpArray.push([x, y, 0, 0]);
//                    cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                }
//                cElPath.moveTo(x, y);
//
//                
//                for(i = 0; i < pointsLen - 2; i = i + 2){ //len
//
////                    x=scaleCP[0]*points[i+1][0]+cpMP[0];
////                    y=scaleCP[1]*points[i+1][1]+cpMP[1];
////                    x1=scaleCP[0]*points[i+2][0]+cpMP[0];
////                    y1=scaleCP[1]*points[i+2][1]+cpMP[1];
//                    x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                    y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                    x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
//                    y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
//                    
//                    //console.log("1 " + i + " ; " + x + " " + y + " ; " + x1 + " " + y1 + " ");
//                    
//                    if(boolSetCP){
//                        cpArray.push([x1, y1, 0, i+2]);
//                        cpArray.push([x, y, 1, i+1]);
//
//
//                        cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                        cpBorder = cEl_set_CpBorder(cpBorder,x1,y1);
//                    }
//
//                    cElPath.quadraticCurveTo(x,y,x1,y1); 
//                }
//                switch(pointsLen-i){
//                    case 2:
////                        x=scaleCP[0]*points[i+1][0]+cpMP[0];
////                        y=scaleCP[1]*points[i+1][1]+cpMP[1];
////                        x1=scaleCP[0]*points[0][0]+cpMP[0];
////                        y1=scaleCP[1]*points[0][1]+cpMP[1];
////                        console.log("1 " + i + " ; " + [x1,y1]);
//    
//                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                        x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                        y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                        
////                        console.log("2 " + i + " ; " + [x,y] + " ; " + " " + [x1,y1]);
//                        
//                        if(boolSetCP){
//                            cpArray.push([x, y, 1, i]);
//                    
//                    
//                            cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                            cpBorder = cEl_set_CpBorder(cpBorder,x1,y1);
//                        }
//
//                        cElPath.quadraticCurveTo(x,y,x1,y1);
//                    break;
//                    case 1:
////                        x=scaleCP[0]*points[0][0]+cpMP[0];
////                        y=scaleCP[1]*points[0][1]+cpMP[1];
//                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                        
////                        console.log("3 " + i + " " + x + " " + y + " " + x1 + " " + y1 + " ");
//                        
//                        if(boolSetCP){
//                            cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                        }
//
//                        cElPath.lineTo(x, y);
//                    break;
//                }
//            break;
//
//            case "bezier":// Poligon  Poligon  Shape Bezier Points
//
////                x=scaleCP[0]*points[0][0]+cpMP[0];
////                y=scaleCP[1]*points[0][1]+cpMP[1];
//                x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                cElPath.moveTo(x, y);
//                
//                if(boolSetCP){
//                    cpArray.push([x, y, 0, 0]);
//                    cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                }
//                
//                for(i = 0; i < pointsLen - 3; i = i + 3){
//
////                    x=scaleCP[0]*points[i+1][0]+cpMP[0];
////                    y=scaleCP[1]*points[i+1][1]+cpMP[1];
////                    x1=scaleCP[0]*points[i+2][0]+cpMP[0];
////                    y1=scaleCP[1]*points[i+2][1]+cpMP[1];
////                    x2=scaleCP[0]*points[i+3][0]+cpMP[0];
////                    y2=scaleCP[1]*points[i+3][1]+cpMP[1];
//                    
//                    x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                    y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                    x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
//                    y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
//                    x2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,0);
//                    y2 = point_get_cpXY(points[i+3],scaleCP,cpMP,flipXY,1);
//                    
//                    
//                    if(boolSetCP){
//                        cpArray.push([x2, y2, 0, i+3]);
//                        cpArray.push([x, y, 1, i+1]);
//                        cpArray.push([x1, y1, 2, i+2]);
//
//
//                        cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                        cpBorder = cEl_set_CpBorder(cpBorder,x1,y1);
//                        cpBorder = cEl_set_CpBorder(cpBorder,x2,y2);
//                    }
//                    
//                    //cEl_ctx.bezierCurveTo(x,y,x1,y1,x2,y2);
//                    cElPath.bezierCurveTo(x,y,x1,y1,x2,y2); 
//                }
//                switch(pointsLen-i){
//                    case 3:
////                        x=scaleCP[0]*points[i+1][0]+cpMP[0];
////                        y=scaleCP[1]*points[i+1][1]+cpMP[1];
////                        x1=scaleCP[0]*points[i+2][0]+cpMP[0];
////                        y1=scaleCP[1]*points[i+2][1]+cpMP[1];
////                        x2=scaleCP[0]*points[0][0]+cpMP[0];
////                        y2=scaleCP[1]*points[0][1]+cpMP[1];
//                        
//                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                        x1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,0);
//                        y1 = point_get_cpXY(points[i+2],scaleCP,cpMP,flipXY,1);
//                        x2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                        y2 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                        
//                        
//                        if(boolSetCP){
//                            cpArray.push([x, y, 1, i+1]);
//                            cpArray.push([x1, y1, 2, i+2]);
//
//
//                            cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                            cpBorder = cEl_set_CpBorder(cpBorder,x1,y1);
//                            cpBorder = cEl_set_CpBorder(cpBorder,x2,y2);
//                        }
//                        //cEl_ctx.bezierCurveTo(x,y,x1,y1,x2,y2);
//                        cElPath.bezierCurveTo(x,y,x1,y1,x2,y2);
//                        
//                    break;
//                    case 2:
////                        x=scaleCP[0]*points[i+1][0]+cpMP[0];
////                        y=scaleCP[1]*points[i+1][1]+cpMP[1];
////                        x1=scaleCP[0]*points[0][0]+cpMP[0];
////                        y1=scaleCP[1]*points[0][1]+cpMP[1];
//
//                        x = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,0);
//                        y = point_get_cpXY(points[i+1],scaleCP,cpMP,flipXY,1);
//                        x1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                        y1 = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                        
//                        if(boolSetCP){
//                            cpArray.push([x, y, 1, i+1]);
//                    
//                    
//                            cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                            cpBorder = cEl_set_CpBorder(cpBorder,x1,y1);
//                        }
//                        //cEl_ctx.quadraticCurveTo(x,y,x1,y1);
//                        cElPath.quadraticCurveTo(x,y,x1,y1);
//
//                    break;
//                    case 1:
////                        x=scaleCP[0]*points[0][0]+cpMP[0];
////                        y=scaleCP[1]*points[0][1]+cpMP[1];
//                        x = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0);
//                        y = point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1);
//                        
//                        if(boolSetCP){
//                            cpBorder = cEl_set_CpBorder(cpBorder,x,y);
//                        }
//                        //cEl_ctx.lineTo(x, y);
//                        cElPath.lineTo(x, y);
//                        
//                    break;
//                }
//            break;
//        };
//        cElPath.closePath();
//
//        if(boolSetCP){
////            if(shapeContainer.swapwh){
////                shapeContainer.temp.cpBorder = {
////                    "x":cpBorder.y,
////                    "y":cpBorder.x,
////                    "x1":cpBorder.y1,
////                    "y1":cpBorder.x1
////                    };
////            }else{
//                shapeContainer.temp.cpBorder = cpBorder;
////            }
//            
//            shapeContainer.temp.cp = cpArray;
//            //cdebug(pointsLen + " vs "+ shapeContainer.temp.cp.length );
//        }
//        
//        shapeContainer.temp.fp = [point_get_cpXY(points[0],scaleCP,cpMP,flipXY,0),point_get_cpXY(points[0],scaleCP,cpMP,flipXY,1)];
//        
//        if(GLOBAL_Path2D){
//            shapeContainer.path = cElPath;
//        }
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};

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
        
//        cdebug("runEval " + actEl.id + ", event " + strEval + ", evtType " + evtType);
//        cdebug(evtType,true);
        
        if(strEval && actEl.enabled){
            if(actEl.tag==="canvas"){
                strEval = strEval.replace("this",actEl.pageId+"_"+actEl.id);
            }else if(actEl.tag==="page"){
                strEval = strEval.replace("this",actEl.pageId);
            }else{
                strEval = strEval.replace("this",actEl.parentId+"_"+actEl.id);
            };
            return eval(strEval);
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function resetCursor(cEl){
    
    try{
        //var actCanv = getSetHtmlEl(cEl);
        //cdebug(cEl.pageId + "_" + cEl.layerId + "_canvas");
        
        if(cEl.tag!=="page"){
            window[cEl.pageId + "_" + cEl.layerId + "_canvas"].style.cursor = cEl.style.calc["cursor"];
        }
        //else{
            //window[cEl.pageId + "_" + cEl.layerId + "_canvas"].style.cursor = cEl.style.calc["cursor"];
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
