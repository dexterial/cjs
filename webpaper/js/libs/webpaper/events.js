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


function disableEvent(evt){
    evt.preventDefault();
    evt.stopPropagation();
    if(GLOBAL_IE){evt.returnValue = false;}
    return false;
}

function loadEvents() {
    try {
        //window["w"] = window.innerWidth;
        //window["h"] = window.innerHeight;
        //mouse events
//        if (window.addEventListener) window.addEventListener("dblclick", handleMouse, false);
//        else if (window.attachEvent) window.attachEvent("ondblclick", handleMouse);
        
        if (window.addEventListener) window.addEventListener("contextmenu", disableEvent, false);
        else if (window.attachEvent) window.attachEvent("oncontextmenu", disableEvent);
//        
////        if (window.addEventListener) window.addEventListener("mousedown", handleMouse, false);
////        else if (window.attachEvent) window.attachEvent("onmousedown", handleMouse);
////        if (window.addEventListener) window.addEventListener("mousemove", handleMouse, false);
////        else if (window.attachEvent) window.attachEvent("onmousemove", handleMouse);
////        if (window.addEventListener) window.addEventListener("mouseup", handleMouse, false);
////        else if (window.attachEvent) window.attachEvent("onmouseup", handleMouse);
////        if (window.addEventListener) window.addEventListener("mouseout", handleMouse, false);
////        else if (window.attachEvent) window.attachEvent("onmouseout", handleMouse);
//        if (window.addEventListener) window.addEventListener("wheel",handleWheel, false);
//        else if (window.attachEvent) window.attachEvent("onwheel", handleWheel);
//        
//        //clipboard events
//        //if (window.addEventListener) window.addEventListener("beforepaste", handleBeforePaste, false);
//        //else if (window.attachEvent) window.attachEvent("onbeforepaste", handleBeforePaste);
//        //if (window.addEventListener) window.addEventListener("paste", handlePaste, false);
//        //else if (window.attachEvent) window.attachEvent("onpaste", handlePaste);
//        
//        //keys events
////        if (window.addEventListener) window.addEventListener("keydown", handleKeys, false);
////        else if (window.attachEvent) window.attachEvent("onkeydown", handleKeys);
////        if (window.addEventListener) window.addEventListener("keyup", handleKeys, false);
////        else if (window.attachEvent) window.attachEvent("onkeyup", handleKeys);
////        if (window.addEventListener) window.addEventListener("keypress", handleKeys, false);
////        else if (window.attachEvent) window.attachEvent("onkeypress", handleKeys);
//        //touch events
//        if (window.addEventListener) window.addEventListener("touchstart",handleTouch, false);
//        else if (window.attachEvent) window.attachEvent("ontouchstart", handleTouch);
//        if (window.addEventListener) window.addEventListener("touchmove", handleTouch, false);
//        else if (window.attachEvent) window.attachEvent("ontouchmove", handleTouch);
//        if (window.addEventListener) window.addEventListener("touchend", handleTouch, false);
//        else if (window.attachEvent) window.attachEvent("ontouchend", handleTouch);
        
        // error events
//        if (window.addEventListener) window.addEventListener("error", function(e) {cdebug(e);}, false);
//        else if (window.attachEvent) window.attachEvent("error", function(e) {cdebug(e);});
//        window.addEventListener('error', function(e) {
//  console.log(e.lineno); // 5
//});
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}


function retCElId(eventholder,hitOptions,defaultID){
    
    try{
        
        
        
        
//        if(!hitResult){
////            cdebug(paper.project.view.bounds,false,false,0);
////            cdebug(paper.project.view.center,false,false,0);
//            //cdebug(eventholder.targetId,false,false,0);
//            //cdebug(eventholder,false,false,0);
//            // BUGGY
//            //eventholder.retObj.name = eventholder.pageId;
//            eventholder.retObj = null;
//            
//        }else{
//            if(eventholder.retObj.nostop && hitResult){
//                //if(retObj.name && cElId.search(retObj.name)===-1){
//                if(hitResult.item.name){
//                    //cdebug(hitResult.item.name,true,false,0)();
//                    
//                    eventholder.retObj = hitResult.item;
//                    //cdebug(eventholder.retObj.name,true,false,0)();
//                    
//                }else{
//                    eventholder.retObj.name = cElId;
//                }
//            }
//        }
        
        return true;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


globalTool = new paper.Tool();
globalTool.onMouseDown = handleMouse;
globalTool.onMouseMove = handleMouse;
globalTool.onMouseUp = handleMouse;
globalTool.onKeyDown = handleKeys;
globalTool.onKeyPressed = handleKeys;
globalTool.onKeyUp = handleKeys;

//tool1.onMouseDrag = function(event) {
//        path.add(event.point);
//}


function testLayer(){
    cdebug(paper.project.name)();
}


function handleWheel(evt) {
    
    try{
        // prevent default events        
        evt.preventDefault();
        evt.stopPropagation();

        var evtType = evt.type;
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"wheel");
        
        
        if(!eventholder.active.name)return null;
        var cElName = eventholder.active.name;
        var cEl = window[cElName];
          
        switch(evtType){
            case "wheel":
                runEval(cEl,evtType) ;
                break;
            };
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleKeys(evt) {
    
    try{
        
        var evtType = evt.type;
        
        //cdebug(evt.type,false,true);
        // prevent default events
        // evt.preventDefault();    
        //evt.stopPropagation();
        
        //cdebug(getProperties(evt),true);
        
        
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"keyboard");
        
        if(!eventholder.active.name)return false;
        
        
        var cElName = eventholder.active.name;
        var cEl = window[cElName];
        
        switch(evtType){
            
            case "keydown":
                //cdebug(eventholder)();
                handleCSSEvents_keys(eventholder,evt);
                
                runEval(cEl,evtType) ;
            break;
            case "keypress":
                
                handleCSSEvents_keys(eventholder,evt);
                
                //alert(evt.keyCode);
                runEval(cEl,evtType) ;
                //evt.preventDefault();
                //evt.stopPropagation();
            break;
            case "keyup":
                //cdebug([evtType,kind(evt.target)]);
                
                handleCSSEvents_keys(eventholder,evt);
                
                runEval(cEl,evtType);
            break;
        };
        
        //paper.view.draw();
        
        return true;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function handleMouse(evt) {
    
    try{
        var evtType = evt.type;
        // exit if not event
        if(!evtType){
            return false;
        }
        
        // prevent default events
        //disableEvent(evt);
        
        // preload event in custom eventholder
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"mouse");
        
        // exit if not valid event
        if (eventholder.noevent){return false;};
        
        //cdebug(eventholder.currentid)();
        //var cEl = window[eventholder.currentid];
        
        
        runEval(eventholder.retObj,evtType);
        
        switch(evtType){
            
            case "mousedown":
                
                
                //cdebug(evt.detail,true);
                updateEventHolder(eventholder,false,true,true);
                
                handleCSSEvents_mouse(eventholder,false,true,true);
                
                handleTextSelection(eventholder);
                
                //handleContextMenu(eventholder);
                
                //cdebug(eventholder.layerId + " vs actual paper project " + paper.project.name)();
                //cdebug(eventholder.hover)();
                
                //drawProjects(paper);
                //paper.view.draw();
                //renderer(eventholder.canvReset);
                
            break;
            case "mouseup":
                
                handleTextSelection(eventholder);
                
                drawProjects(paper,true);
                //renderer(eventholder.canvReset);
                
            break;
            case "mousemove":
                
                updateEventHolder(eventholder,true,false,false);
                // CSS enabled events
                handleCSSEvents_mouse(eventholder,true,false,false);
                
                handleTextSelection(eventholder);
   
//                paper.view.draw();
                drawProjects(paper,true);
                //cdebug(eventholder.targetId + " " + paper.project.name,true,true)();
                //cdebug(eventholder.canvReset,true,true)();
                //renderer(eventholder.canvReset);
                
            break;
            case "mouseout":
                
                updateEventHolder(eventholder,true,false,false);
                // CSS enabled events
                handleCSSEvents_mouse(true,false,false);
                
                handleTextSelection(eventholder);
                
                //renderer(eventholder.canvReset);
                drawProjects(paper,true);
                
            break;
        };
        
        
        
        return true;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleTouch(evt) {
    
    try {
        var evtType = evt.type;
        // exit if not event
        if(!evtType){return false;}
        
        // prevent default events
        disableEvent(evt);
        
        // preload event in custom eventholder
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"touch");
        
        // exit if not valid event
        if (eventholder.noevent){return false;};
        
        var cEl = window[eventholder.currentid];
        //cdebug(cEl.name,true);
        runEval(cEl,evtType);
        
        switch(evtType){
            case "touchstart":
                //cdebug(eventholder,true,true);
                
                //cdebug(evt.detail,true);
                updateEventHolder(eventholder,false,true,true);
                
                handleCSSEvents_mouse(eventholder,false,true,true);      
                
                handleTextSelection(eventholder);
                
                handleContextMenu(eventholder);

//                runEval(cEl,evtType);
            break;
            case "touchmove":
                updateEventHolder(eventholder,true,false,false);
                // CSS enabled events
                handleCSSEvents_mouse(eventholder,true,false,false);
                
                handleTextSelection(eventholder);
   
//                runEval(cEl,evtType);
            break;
            case "touchend": 
//                updateEventHolder(eventholder,false,false,false);
//                // CSS enabled events
//                handleCSSEvents_mouse(false,false,false);
                
                handleTextSelection(eventholder);
                
            break;
        };
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function handleTextSelection(eventholder){
    
    try{
        if(!eventholder.active.name)return false;
        var cEl = window[eventholder.active.name];
        if(cEl.data.type !== "text")return false;
        var btnPressed = eventholder.keys.which ? eventholder.keys.which : eventholder.keys.button;
        var clickCount = eventholder.keys.detail;
        
        //cdebug(eventholder,true);
        switch(eventholder.type){
            case "mousedown":
            case "touchstart":
                if(btnPressed === 1){
                    
                    selection_actions(cEl, eventholder.metrics.xy, clickCount,!eventholder.keys.ctrlKey);
                }
                if(btnPressed === 3){

                    selection_actions(cEl, eventholder.metrics.xy, clickCount, false);
                }
                    
            break;
            case "mousemove":
            case "touchmove":
                if(btnPressed === 1){
                    selection_actions(cEl, eventholder.metrics.xy, -1, false);
                }
            break;
            case "mouseup":
            case "touchend":
                if(btnPressed === 1){
                    selection_actions(cEl, eventholder.metrics.xy, -2, false);
                }
            break;
        }
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function handlePaste (evt) {

    switch(evt.type){
            
        case "keydown":
            if(document.getElementById("editorPage_carret_div").innerHTML !== "" && document.getElementById("editorPage_carret_div").innerHTML !== "<br>"){
                //console.log(evt.type + "   " + document.getElementById("editorPage_carret_div").innerHTML);
                processpaste(document.getElementById("editorPage_carret_div").innerHTML);
                document.getElementById("editorPage_carret_div").innerHTML = "";
            }
        break;
        case "keyup":
            //console.log(evt.type + "   " + document.getElementById("editorPage_carret_div").innerHTML);
            processpaste(document.getElementById("editorPage_carret_div").innerHTML);
            document.getElementById("editorPage_carret_div").innerHTML = "";
        break;
        case "paste":

        break;
    };            
    
    return true;
}

function processpaste (value) {
    console.log("process " + value);
}


function setEventHolder(pageId) {
    
    try{
        if (!window["eventholder"]) {
            window["eventholder"] = {
                "hover":{"id":null,"resetold":false,"reset":false},
                "focus":{"id":null,"resetold":false,"reset":false},
                "active":{"id":null,"resetold":false,"reset":false},
                "metrics":{},
                "keys":{},
                "currentid":null,
                "pageId":pageId,
                "canvReset":[]
            };
            return true;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function preSetEventHolder(eventholder,paperevt,evtCallerType) {
    try{
        // prefill default event stuff
        
        eventholder.type = paperevt.type;
        eventholder.callerType = evtCallerType;
        var evt = paperevt.event;
        
        //disableEvent(evt);
        
        paperevt.stop();

        var targetId = evt.target.id;
        
        
        eventholder.targetId = targetId;
        
        //cdebug(eventholder.targetId)();
        
        //cdebug(projects.length,false,false,0);
        
        
        //if(!paperevt.timeStamp){paperevt.timeStamp = new Date()};
        eventholder.metrics.ts = paperevt.timeStamp;
        eventholder.keys ={
            "altKey":evt.altKey,
            "metaKey":evt.metaKey,
            "ctrlKey":evt.ctrlKey,
            "shiftKey":evt.shiftKey,
            "which":evt.which
        };
        switch(evtCallerType){
            case "touch":
                //dom2
                //if(evt.touches[0]){
                
                eventholder.metrics.xy = [evt.changedTouches[0].clientX,evt.changedTouches[0].clientY];
                eventholder.metrics.xyAbs = [evt.changedTouches[0].pageX - evt.changedTouches[0].target.offsetLeft,evt.offsetY = evt.changedTouches[0].pageY - evt.changedTouches[0].target.offsetTop];
                //if(evt.type==="touchend")alert(eventholder.metrics.xyAbs + " " + eventholder.metrics.xy);
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.button;
                //dom3
                eventholder.keys.buttons = evt.buttons;
                //}
            break;
            case "mouse":
                //dom2
                eventholder.metrics.xy = [evt.offsetX ,evt.offsetY];
                eventholder.metrics.xyAbs = [evt.clientX,evt.clientY];
                
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.button;
                //dom3
                eventholder.keys.buttons = evt.buttons;
            break;
            case "keyboard":
                //dom2
                eventholder.keys.charCode = evt.charCode;
                eventholder.keys.keyCode = evt.keyCode;
                //dom3
                eventholder.keys.key = evt.key;
                eventholder.keys.location = evt.location;
                //custom
                eventholder.keys.chr =  eventholder.keys.which || eventholder.keys.keyCode;
                eventholder.keys.chrVal = String.fromCharCode(eventholder.keys.chr);
            break;
            case "wheel":
            
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.button;
                //dom3
                eventholder.keys.buttons = evt.buttons;
                
                //dom2
                eventholder.metrics.xy = [evt.offsetX ,evt.offsetY];
                eventholder.metrics.xyAbs = [evt.clientX,evt.clientY];
                //dom3
                eventholder.wheel = {
                    "deltaX":evt.deltaX,
                    "deltaY":evt.deltaY,
                    "deltaZ":evt.deltaZ,
                    "deltaMode":evt.deltaMode
                };
            break;
        }
        
        // prefill advanced event stuff
        
        if(!targetId){
            eventholder.noevent = true;
        }else{
            eventholder.noevent = false;
            
            var arrTargetId = targetId.split("_");
            
            
            
            if(arrTargetId.length === 4){
                eventholder.pageId = arrTargetId[1];
                eventholder.layerId = arrTargetId[2];
                eventholder.tag = arrTargetId[3];
            }
            
            //cdebug(eventholder.layerId + " vs " + paper.project.name)();
            
            if(eventholder.layerId !== paper.project.name)projectSwitch(eventholder.layerId);
            
            
//            if(targetId  === "editorPage_carret_div"){
//            // just retrieve it from the event store and update metrics a little bit
////                eventholder.metrics.xy[0] = eventholder.metrics.xyAbs[0];
////                eventholder.metrics.xy[1] = eventholder.metrics.xyAbs[1];
//            }else{
                //eventholder.retObj = {"id":null,"nostop":true,"all":[]};
                var hitOptions = {
                    segments: true,
                    stroke: true,
                    fill: true,
                    tolerance: 5
                };
                var hitObject = paper.project.hitTest(eventholder.metrics.xy, hitOptions);
                
                if(hitObject){
                    eventholder.retObj = hitObject.item;
                }else{
                    eventholder.retObj = paper.project;
                }
                //cdebug(eventholder.retObj.name)();
                
                //retCElId(eventholder,"_" + eventholder.pageId + "_" + eventholder.layerId);
                
                //cdebug(eventholder.retObj)();
                
                //eventholder.composedid = eventholder.retObj.name;
                eventholder.currentid = eventholder.retObj.parentName + "_" + eventholder.retObj.name.split(".")[0];
//            }
        }

        
       
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function updateEventHolder(eventholder,boolHover,boolFocus,boolActive) {
    
    try{
        
        if(!eventholder.retObj)return false;
//        var cEl = eventholder.retObj;
        //if(!cEl.layerId)return false;
        
        eventholder.canvReset = [];
        //var currentid = eventholder.currentid;
        // actual elements instantiation
        //cdebug(eventholder.pageId + " > " + eventholder.layerId + " >>> " + cEl.name)();  
                 
        //cdebug(cEl.name)();
        var boolActual = false;
        
        
        if(boolHover){
            //{"id":null,"resetold":false,"reset":false,"name":null}
            //cdebug(eventholder.retObj.name)();
            
            // old hover elements instantiation
            //var cElHoverOldName = eventholder.hover.name;
            //var cElHoverOld = window[cElHoverOldName];
            //var canvElHoverOld = cElHoverOld ? window[cElHoverOld.pageId + "_" + cElHoverOld.layerId] : null;
            if(eventholder.currentid !== eventholder.hover.id){
                if(eventholder.hover.id){
                    eventholder.hover.resetold = true;
                }else{
                    eventholder.hover.resetold = false;
                }
                eventholder.hover.reset = true;
            }else{
                eventholder.hover.resetold = false;
                eventholder.hover.reset = false;
            }
            //eventholder.hover.resetold = (currentid !== cElHoverOldName) ? true : false; //!$.isEmptyObject(cElHoverOld.style.hover) && 
            
            
            
//            eventholder.hover.reset = (cEl && currentid !== cElHoverOldName) ? true : false; //!$.isEmptyObject(cEl.style.hover) && 
//            if(canvElHoverOld && eventholder.hover.resetold && eventholder.canvReset.indexOf(canvElHoverOld.pageId + "_" + canvElHoverOld.layerId)<0){
//                eventholder.canvReset.push(canvElHoverOld.pageId + "_" + canvElHoverOld.layerId);
//            }
            boolActual = boolActual || eventholder.hover.reset;
        }
        
        if(boolFocus){
            
            if(eventholder.currentid !== eventholder.focus.id){
                if(eventholder.focus.id){
                    eventholder.focus.resetold = true;
                }else{
                    eventholder.focus.resetold = false;
                }
                eventholder.focus.reset = true;
            }else{
                eventholder.focus.resetold = false;
                eventholder.focus.reset = false;
            }
            
//            // old focus elements instantiation
//            var cElFocusOldName = eventholder.focus.name;
//            var cElFocusOld = window[cElFocusOldName];
//            var canvElFocusOld = cElFocusOld ? window[cElFocusOld.pageId + "_" + cElFocusOld.layerId] : null;
//            eventholder.focus.resetold = (cElFocusOld && currentid !== cElFocusOldName) ? true : false; //!$.isEmptyObject(cElFocusOld.style.focus) && 
//            eventholder.focus.reset = (cEl && currentid !== cElFocusOldName) ? true : false; //!$.isEmptyObject(cEl.style.focus) &&
//            if(canvElFocusOld && eventholder.focus.resetold && eventholder.canvReset.indexOf(canvElFocusOld.pageId + "_" + canvElFocusOld.layerId)<0){
//                eventholder.canvReset.push(canvElFocusOld.pageId + "_" + canvElFocusOld.layerId);
//            }
            boolActual = boolActual || eventholder.focus.reset;
        }  
//        
        if(boolActive){
            if(eventholder.currentid !== eventholder.active.id){
                if(eventholder.active.id){
                    eventholder.active.resetold = true;
                }else{
                    eventholder.active.resetold = false;
                }
                eventholder.active.reset = true;
            }else{
                eventholder.active.resetold = false;
                eventholder.active.reset = false;
            }
            
//            // old active elements instantiation
//            var cElActiveOldName = eventholder.active.name;
//            var cElActiveOld = window[cElActiveOldName];
//            var canvElActiveOld = cElActiveOld ? window[cElActiveOld.pageId + "_" + cElActiveOld.layerId] : null;
//            eventholder.active.resetold =(cElActiveOld && currentid !== cElActiveOldName) ? true : false;
//            eventholder.active.reset =(cEl && currentid !== cElActiveOldName) ? true : false; //!$.isEmptyObject(cEl.style.active) &&
//            if(canvElActiveOld && eventholder.active.resetold && eventholder.canvReset.indexOf(canvElActiveOld.pageId + "_" + canvElActiveOld.layerId)<0){
//                eventholder.canvReset.push(canvElActiveOld.pageId + "_" + canvElActiveOld.layerId);
//            }
            boolActual = boolActual || eventholder.active.reset;
        }
        
        // reset layers
//        if(boolActual){
//            if(eventholder.canvReset.indexOf(canvCElActual.pageId + "_" + canvCElActual.layerId)<0){
//                eventholder.canvReset.push(canvCElActual.pageId + "_" + canvCElActual.layerId);
//            }
//        }
        //console.log(eventholder.canvReset);
        return eventholder;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleCSSEvents_keys(eventholder,evt) {
    
    try{
        
//        switch(eventholder.type){
//            
//            case "keydown":
//                //cdebug(eventholder.keys.chr);
//                switch(eventholder.keys.chr){
//                    case 37:
//                    case 38:
//                    case 39:
//                    case 40:    
//                        move_chars(eventholder);
//                        evt.preventDefault();
//                    break;
//                    case 8:
//                    case 46:
//                        delete_chars(eventholder);
//                        evt.preventDefault();
//                    break;
//                    case 9:
//                        updateEventHolder(eventholder,false,true,false);
//                        handleCSSEvents_mouse(eventholder,false,true,false);
//                        evt.preventDefault();
//                    break;
//                    case 13:
//                        updateEventHolder(eventholder,false,false,true);
//                        handleCSSEvents_mouse(eventholder,false,false,true);
//
//                    break;
//                    case 27:
//                        evt.preventDefault();
//                    break;
//                    case 86:
//                    case 118:    
//                        if(evt.ctrlKey){
//                            handlePaste(evt);
//                        }
//                    break;
//                    default:
//                        //evt.preventDefault();
//                        //insert_chars(eventholder,true);
//                    break;
//                }
//                
//            break;
//            case "keypress":
//                
//                switch(eventholder.keys.chrVal){
//                    
//                    default:
//                        
//                        edit_chars(eventholder,true);
//                        evt.preventDefault();
//                    break;
//                }
//                
//            break;
//            case "keyup":
//                
//                switch(evt.keyCode){
//                    case 86:
//                    case 118:
//                        if(evt.ctrlKey){
//                            handlePaste(evt);
//                        }
//                    break;
//                }
//                
//                
//            break;
//        };
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};
function handleCSSEvents_mouse(eventholder,boolHover,boolFocus,boolActive) {
    
    try{
        //var eventholder = window["eventholder"];
        // CSS enabled events
        
        // reset layers
        //if(boolHover || boolFocus || boolActive){
//        if(eventholder.canvReset.length>0){
//            cdebug(eventholder.canvReset,false,false,0);
//        }
//        for(var i = 0, len = eventholder.canvReset.length; i<len; i++){
//            window[eventholder.canvReset[i]].shape.redraw = true;
//        }
        //}
        
        var cEl;
        if(boolHover){
            
            
            
            //  hover reset for old focus element 
            if(eventholder.hover && eventholder.hover.resetold){
                cEl = eventholder.hover.oldObj;
                //cdebug("->>>" + cEl.name)();
//                if(cEl){
//                    //cdebug(eventholder.hover.id)();
                    cEl.hover = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"hoveroff");
//                }
            }
            // new hover set
            if(eventholder.hover && eventholder.hover.reset){
                
                //cdebug("+>>>" + eventholder.retObj.name)();
                
                eventholder.hover.id = eventholder.currentid;
                eventholder.hover.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                
                //cEl = window[eventholder.currentid];
                cEl.hover = true;
                cEl.style.redraw = true;
                cEl.shape.redraw = true;
                runEval(cEl,"hoveron");
                resetCursor(cEl);
            }
        }
        
        if(boolFocus){
            //  focus reset for old focus element 
            if(eventholder.focus && eventholder.focus.resetold){
                cEl = eventholder.focus.oldObj;
//                if(cEl){
                    cEl.focus = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"focusoff");
//                    resetCursor(cEl);
//                }
            }
            // new focus set
            if(eventholder.focus && eventholder.focus.reset){
                eventholder.focus.id = eventholder.currentid;
                eventholder.focus.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                cEl.focus = true;
                cEl.style.redraw = true;
                cEl.shape.redraw = true;
                runEval(cEl,"focuson");
                resetCursor(cEl);
            }
        }
//        
        if(boolActive){
            //  active reset for old active element 
            if(eventholder.active && eventholder.active.resetold){
                cEl = eventholder.active.oldObj;
//                if(cEl){
                    cEl.active = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"activeoff");
                    resetTextSelection(cEl);
                    //resetCursor(cEl);
//                }
            }
            // new active set
            if(eventholder.active && eventholder.active.reset){
                
                eventholder.active.id = eventholder.currentid;
                eventholder.active.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                cEl.active = true;
                cEl.style.redraw = true;
                cEl.shape.redraw = true;
                runEval(cEl,"activeon");
                resetCursor(cEl);
            } 
        }
        
        
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function handleContextMenu(eventholder){
    try{
        //var eventholder = window["eventholder"];
        
        //cdebug(eventholder.layerId)();
        //cdebug(eventholder.metrics,true);
        
        if(eventholder.layerId === "context")return true;
        var page_context = paper;
        if(!page_context.data.context && eventholder.keys.which !== 3)return true;
        //if(eventholder.keys.which !== 3)return true;
        
        
        //cdebug("handleContextMenu  " + eventholder.pageId)();
        
        var project_context = projectSwitch("context");//paper.project ;//window[eventholder.pageId + "_context"];
        
        
        if(eventholder.keys.which === 3 && !project_context.debug){
            project_context.visible = true;
            
            
            var xy = eventholder.metrics.xy;
            
            project_context.shape.masspoint = cEl_edit_MP(page_context,xy,page_context.shape.scale);
            project_context.shape.redraw = true;
            
            page_context.data.context = true;
            
        }else{
            project_context.visible = false;
            project_context.shape.redraw = true;
            
            page_context.data.context = false;
        }
        
        //renderer([eventholder.pageId]);
        //draw_cEl_project(layer_context);
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function setContextMenu(cEl_canv){
    try{
        var evt = window.event;
        cdebug("handleContext: <" + evt.type + "> on <" + cEl_canv.parentName + "_" + cEl_canv.name + ">",true);
        cdebug(cEl_canv.style);
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function resetTextSelection(cEl){
    
    try{
        
        setCarret(false);
        if(window[cEl.pageId]){
            var cEl_Selection = window[cEl.pageId].text.charsSelection;
            cEl_Selection.charspos = [];
            cEl_Selection.chars = [];
            cEl_Selection.wordspos = [];
            cEl_Selection.paragraphspos = [];
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function selection_actions(cEl, xy, actionNo, boolReset){
    
    try{
        
        var lines = cEl.data.values.temp.lines3;
        var len = lines.length;
        var cEl_Selection = window[cEl.pageId].text.charsSelection;
        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        
        cEl_Selection.name = cEl.parentName  + "_" + cEl.name;
        
        if(boolReset)cEl_Selection.charspos = [];
        
        var cr,startPos,endPos,chrObj;

        switch(true){
            //move carret top
            case actionNo === 38:
                chrObj = lines[cEl_Selection.cr.pos];
                cr = getCharPos(lines,[chrObj.xy[0],chrObj.xy[1]-1.5*chrObj.fs]);
                if(lines[cr.pos].xy){
                    cEl_Selection.cr.pos = cr.pos;
                    cEl_Selection.cr.left = cr.left;
                }
            break;
            //move carret bottom
            case actionNo === 40:
                chrObj = lines[cEl_Selection.cr.pos];
                cr = getCharPos(lines,[chrObj.xy[0],chrObj.xy[1]+0.75*chrObj.fs]);
                if(lines[cr.pos].xy){
                    cEl_Selection.cr.pos = cr.pos;
                    cEl_Selection.cr.left = cr.left;
                }
                
            break;
            //move carret right
            case actionNo === 39:
                
                if(cEl_Selection.cr.pos < lines.length-1 && lines[cEl_Selection.cr.pos+1].xy){
                    cEl_Selection.cr.pos++;
                }else if(cEl_Selection.cr.pos === lines.length-1){
                    cEl_Selection.cr.left = false;
                }
            break;
            //move carret left
            case actionNo === 37:
                
                if(!cEl_Selection.cr.left)cEl_Selection.cr.left = true;
                if(cEl_Selection.cr.pos > 0 && lines[cEl_Selection.cr.pos-1].xy){
                    cEl_Selection.cr.pos--;
                }
            break;
            // reset temp selection
            case actionNo === -2:
                
                cEl_Selection.temp = null;
                
            break;
            // select on mouse move and pressed
            case actionNo === -1:
                
                cr = getCharPos(lines,xy);
                startPos =cr.pos;
                endPos =cr.pos;
                
                if(!cEl_Selection.temp)cEl_Selection.temp = $.extend(true,[],cEl_Selection.charspos);

                cEl_Selection.charspos = mergeIntArrays(cEl_Selection.temp,getIntArray(cr.pos,cEl_Selection.cr.pos,cEl_Selection.cr.left));
                        
            break;
            // move carret on mouse down
            case actionNo === 1:
                
                cr = getCharPos(lines,xy);
                startPos =cr.pos;
                endPos =cr.pos;
                
                cEl_Selection.cr.pos = cr.pos;
                cEl_Selection.cr.left = cr.left;
                
            break;
            // select word
            case actionNo === 2:
                
                cr = getCharPos(lines,xy);
                startPos =cr.pos;
                endPos =cr.pos;
                if(cr.pos===-1)cr.pos = 0;

                //cdebug(lines[cr.pos],true,true);
                for(var j = cr.pos; j>-1;j--){
                    if(lines[j].wp || lines[j].sc){
                        startPos = j;
                        break;
                    }
                }
                endPos = len-1;
                for(var j = cr.pos+1; j<len;j++){
                    if(lines[j].wp){
                        if(lines[j].sc){
                            endPos = j;
                        }else{
                            endPos = j-1;
                        }
                        break;
                    }
                }
                if(startPos>endPos)endPos=startPos;
                cEl_Selection.charspos = mergeIntArrays(cEl_Selection.charspos,getIntArray(startPos,endPos));

            break;
            // select paragraph
            case actionNo === 3:  
                
                cr = getCharPos(lines,xy);
                startPos =cr.pos;
                endPos =cr.pos;
                
                if(cr.pos===-1)cr.pos = 0;
                for(var j = cr.pos; j>-1;j--){
                    if(lines[j].pp){
                        startPos = j;
                        break;
                    }
                }
                endPos = len-1;
                for(var j = cr.pos+1; j<len;j++){
                    if(lines[j].pp){
                        endPos = j-1;
                        break;
                    }
                }

                if(startPos>endPos)endPos=startPos;
                cEl_Selection.charspos =  mergeIntArrays(cEl_Selection.charspos,getIntArray(startPos,endPos));
            break;
            // select all text
            case (actionNo > 3 && actionNo < 8):
                cEl_Selection.charspos =  mergeIntArrays(cEl_Selection.charspos,getIntArray(0,len-1));
            break;

        }    
        //cEl.style.redraw = true;
        cEl_layer.shape.redraw = true;
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function testEvents(cEl,eventName){
    
    cdebug("testEvents: <" + eventName + "> on <" + cEl.parentName + "_" + cEl.name + ">",true);
    
//cdebug(window["eventholder"]);
//    cdebug(cEl.hover);
//    cdebug(cEl.style.hover);
    //cdebug(CryptoJS.MD5(cEl.data.values.temp.font).toString());
    //cdebug(Object.keys(window[cEl.pageId].text.chrStyles).length);
    //cdebug(window[cEl.pageId].text.chrStyles[Object.keys(window[cEl.pageId].text.chrStyles)[0]]);
    //cdebug(window[cEl.pageId].text.chrStyles);
    //cdebug(cEl.data.values.temp.wordsMap);
    //cdebug(window[cEl.pageId].text.words);
    //cdebug(cEl.data.values.temp.lines3);
    //cdebug(cEl.data.values.temp.lines2,true,false,3);
    //cdebug("end");
    //cdebug(cEl.data.values.temp.wordsList,true);
    //cdebug(cEl.data.values.temp.wordsWidths,true);
    //cdebug(window[cEl.pageId].styles,false,true,3);
    //cdebug(window["eventholder"]);
    
}

function testEvents2(cEl,eventName){
    //alert(cEl.name);
    
    //cdebug(currentid.name);
//    var cEl = window[currentid];
//    //cEl.shape.redraw = true;
//    drawChildren(cEl,true);
    
}