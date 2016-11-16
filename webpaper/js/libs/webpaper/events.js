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
        
//        if (window.addEventListener) window.addEventListener("mousedown", handleMouse, false);
//        else if (window.attachEvent) window.attachEvent("onmousedown", handleMouse);
//        if (window.addEventListener) window.addEventListener("mousemove", handleMouse, false);
//        else if (window.attachEvent) window.attachEvent("onmousemove", handleMouse);
//        if (window.addEventListener) window.addEventListener("mouseup", handleMouse, false);
//        else if (window.attachEvent) window.attachEvent("onmouseup", handleMouse);
//        if (window.addEventListener) window.addEventListener("mouseout", handleMouse, false);
//        else if (window.attachEvent) window.attachEvent("onmouseout", handleMouse);
        if (window.addEventListener) window.addEventListener("wheel",handleWheel, false);
        else if (window.attachEvent) window.attachEvent("onwheel", handleWheel);
        
        //clipboard events
        //if (window.addEventListener) window.addEventListener("beforepaste", handleBeforePaste, false);
        //else if (window.attachEvent) window.attachEvent("onbeforepaste", handleBeforePaste);
        //if (window.addEventListener) window.addEventListener("paste", handlePaste, false);
        //else if (window.attachEvent) window.attachEvent("onpaste", handlePaste);
        
        //keys events
//        if (window.addEventListener) window.addEventListener("keydown", handleKeys, false);
//        else if (window.attachEvent) window.attachEvent("onkeydown", handleKeys);
//        if (window.addEventListener) window.addEventListener("keyup", handleKeys, false);
//        else if (window.attachEvent) window.attachEvent("onkeyup", handleKeys);
//        if (window.addEventListener) window.addEventListener("keypress", handleKeys, false);
//        else if (window.attachEvent) window.attachEvent("onkeypress", handleKeys);
        //touch events
        if (window.addEventListener) window.addEventListener("touchstart",handleTouch, false);
        else if (window.attachEvent) window.attachEvent("ontouchstart", handleTouch);
        if (window.addEventListener) window.addEventListener("touchmove", handleTouch, false);
        else if (window.attachEvent) window.attachEvent("ontouchmove", handleTouch);
        if (window.addEventListener) window.addEventListener("touchend", handleTouch, false);
        else if (window.attachEvent) window.attachEvent("ontouchend", handleTouch);
        
        // error events
//        if (window.addEventListener) window.addEventListener("error", function(e) {cdebug(e);}, false);
//        else if (window.attachEvent) window.attachEvent("error", function(e) {cdebug(e);});
//        window.addEventListener('error', function(e) {
//  console.log(e.lineno); // 5
//});
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return false;
    }
}


function retCElId(cElId,eventholder){
    
    try{
        
        
        var hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        };
        var hitResult = paper.project.hitTest(eventholder.metrics.xy, hitOptions);
        
        if(!hitResult){
//            cdebug(paper.project.view.bounds,false,false,0);
//            cdebug(paper.project.view.center,false,false,0);
            //cdebug(eventholder.targetId,false,false,0);
            //cdebug(eventholder,false,false,0);
            // BUGGY
            eventholder.retObj.id = eventholder.pageId;
        }else{
            if(eventholder.retObj.nostop && hitResult){
                //if(retObj.id && cElId.search(retObj.id)===-1){
                if(hitResult.item.name){
                    //cdebug(hitResult.item.name,true,false,0);
                    eventholder.retObj.id = hitResult.item.name;
                }else{
                    eventholder.retObj.id = cElId;
                }
            }
        }
        
        return true;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
};

paper.install(window);
//var path;
//function onMouseDownA(event) {
//        path = new Path();
//        path.strokeColor = 'black';
//        path.add(event.point);
//}

globalTool = new Tool();
globalTool.onMouseDown = handleMouse;
globalTool.onMouseMove = handleMouse;
globalTool.onMouseUp = handleMouse;
globalTool.onKeyDown = handleKeys;
globalTool.onKeyPressed = handleKeys;
globalTool.onKeyUp = handleKeys;

//tool1.onMouseDrag = function(event) {
//        path.add(event.point);
//}


function handleWheel(evt) {
    
    try{
        // prevent default events        
        evt.preventDefault();
        evt.stopPropagation();

        var evtType = evt.type;
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"wheel");
        
        
        if(!eventholder.active.id)return null;
        var cElName = eventholder.active.id;
        var cEl = window[cElName];
          
        switch(evtType){
            case "wheel":
                runEval(cEl,evtType) ;
                break;
            };
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
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
        
        if(!eventholder.active.id)return false;
        
        
        var cElName = eventholder.active.id;
        var cEl = window[cElName];
        
        switch(evtType){
            
            case "keydown":
                //cdebug(eventholder,true);
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
        return true;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
};


function handleMouse(evt) {
    
    try{
        var evtType = evt.type;
        // exit if not event
        if(!evtType){return false;}
        
        // prevent default events
        //disableEvent(evt);
        
        // preload event in custom eventholder
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"mouse");
        
        // exit if not valid event
        if (eventholder.noevent){return false;};
        
        //cdebug(eventholder.currentid,true,true,0);
        var cEl = window[eventholder.currentid];
        
        
        runEval(cEl,evtType);
        
        switch(evtType){
            
            case "mousedown":
                //cdebug(eventholder,true,true);
                
                //cdebug(evt.detail,true);
                updateEventHolder(eventholder,false,true,true);
                
                handleCSSEvents_mouse(eventholder,false,true,true);
                
                handleTextSelection(eventholder);
                
                handleContextMenu(eventholder);
                
//                runEval(cEl,evtType);
                
            break;
            case "mouseup":
                
                handleTextSelection(eventholder);
                
//                runEval(cEl,evtType);
                
            break;
            case "mousemove":
                
                updateEventHolder(eventholder,true,false,false);
                // CSS enabled events
                handleCSSEvents_mouse(eventholder,true,false,false);
                
                handleTextSelection(eventholder);
   
//                runEval(cEl,evtType);

            break;
            case "mouseout":
                
                updateEventHolder(eventholder,true,false,false);
                // CSS enabled events
                handleCSSEvents_mouse(true,false,false);
                
                handleTextSelection(eventholder);
                
                // actual mouse out event
//                runEval(cEl,evtType) ;
                
            break;
        };
        
        //page.cElOld = cloneMonoArray(arrActEl);
        return true;
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
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
        //cdebug(cEl.id,true);
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
        cdebug(err,false,false,3);
        return err;
    }
};


function handleTextSelection(eventholder){
    
    try{
        if(!eventholder.active.id)return false;
        var cEl = window[eventholder.active.id];
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
        cdebug(err,false,false,3);
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
        cdebug(err,false,false,3);
        return err;
    }
};

function preSetEventHolder(eventholder,paperevt,evtCallerType) {
    try{
        // prefill default event stuff
        
        eventholder.type = paperevt.type;
        eventholder.callerType = evtCallerType;
        var evt = paperevt.event;
        
        
        paperevt.stop();

        var targetId = evt.target.id;
        
        if(paper.project.name!==targetId){
            setGetProject(evt.target,targetId);
        };
        
        eventholder.targetId = targetId;
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
            if(arrTargetId.length === 3){
                eventholder.pageId = arrTargetId[0];
                eventholder.layerId = arrTargetId[1];
                eventholder.tag = arrTargetId[2];
            }
            if(targetId  === "editorPage_carret_div"){
            // just retrieve it from the event store and update metrics a little bit
                eventholder.metrics.xy[0] = eventholder.metrics.xyAbs[0];
                eventholder.metrics.xy[1] = eventholder.metrics.xyAbs[1];
            }else{
                eventholder.retObj = {"id":null,"nostop":true,"all":[]};
                retCElId(eventholder.pageId,eventholder);
                //cdebug(retObj,true);
                eventholder.currentid = eventholder.retObj.id;
            }
        }

        
       
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
};


function updateEventHolder(eventholder,boolHover,boolFocus,boolActive) {
    
    try{
        
        eventholder.canvReset = [];
        var currentid = eventholder.currentid;
        // actual elements instantiation
        var cEl = window[currentid];
        if(!cEl || !cEl.layerId)return false;
        
        var canvCElActual = cEl ? window[cEl.pageId + "_" + cEl.layerId] : null;
        var boolActual = false;
        
        if(boolHover){
            // old hover elements instantiation
            var cElHoverOldName = eventholder.hover.id;
            var cElHoverOld = window[cElHoverOldName];
            var canvElHoverOld = cElHoverOld ? window[cElHoverOld.pageId + "_" + cElHoverOld.layerId] : null;
            eventholder.hover.resetold = (cElHoverOld && currentid !== cElHoverOldName) ? true : false; //!$.isEmptyObject(cElHoverOld.style.hover) && 
            eventholder.hover.reset = (cEl && currentid !== cElHoverOldName) ? true : false; //!$.isEmptyObject(cEl.style.hover) && 
            if(canvElHoverOld && eventholder.hover.resetold && eventholder.canvReset.indexOf(canvElHoverOld.pageId + "_" + canvElHoverOld.layerId)<0){
                eventholder.canvReset.push(canvElHoverOld.pageId + "_" + canvElHoverOld.layerId);
            }
            boolActual = boolActual || eventholder.hover.reset;
        }
        
        if(boolFocus){
            // old focus elements instantiation
            var cElFocusOldName = eventholder.focus.id;
            var cElFocusOld = window[cElFocusOldName];
            var canvElFocusOld = cElFocusOld ? window[cElFocusOld.pageId + "_" + cElFocusOld.layerId] : null;
            eventholder.focus.resetold = (cElFocusOld && currentid !== cElFocusOldName) ? true : false; //!$.isEmptyObject(cElFocusOld.style.focus) && 
            eventholder.focus.reset = (cEl && currentid !== cElFocusOldName) ? true : false; //!$.isEmptyObject(cEl.style.focus) &&
            if(canvElFocusOld && eventholder.focus.resetold && eventholder.canvReset.indexOf(canvElFocusOld.pageId + "_" + canvElFocusOld.layerId)<0){
                eventholder.canvReset.push(canvElFocusOld.pageId + "_" + canvElFocusOld.layerId);
            }
            boolActual = boolActual || eventholder.focus.reset;
        }  
        
        if(boolActive){
            // old active elements instantiation
            var cElActiveOldName = eventholder.active.id;
            var cElActiveOld = window[cElActiveOldName];
            var canvElActiveOld = cElActiveOld ? window[cElActiveOld.pageId + "_" + cElActiveOld.layerId] : null;
            eventholder.active.resetold =(cElActiveOld && currentid !== cElActiveOldName) ? true : false;
            eventholder.active.reset =(cEl && currentid !== cElActiveOldName) ? true : false; //!$.isEmptyObject(cEl.style.active) &&
            if(canvElActiveOld && eventholder.active.resetold && eventholder.canvReset.indexOf(canvElActiveOld.pageId + "_" + canvElActiveOld.layerId)<0){
                eventholder.canvReset.push(canvElActiveOld.pageId + "_" + canvElActiveOld.layerId);
            }
            boolActual = boolActual || eventholder.active.reset;
        }
        
        // reset layers
        if(boolActual){
            if(eventholder.canvReset.indexOf(canvCElActual.pageId + "_" + canvCElActual.layerId)<0){
                eventholder.canvReset.push(canvCElActual.pageId + "_" + canvCElActual.layerId);
            }
        }
        //console.log(eventholder.canvReset);
        return eventholder;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
};

function handleCSSEvents_keys(eventholder,evt) {
    
    try{
        
        switch(eventholder.type){
            
            case "keydown":
                //cdebug(eventholder.keys.chr);
                switch(eventholder.keys.chr){
                    case 37:
                    case 38:
                    case 39:
                    case 40:    
                        move_chars(eventholder);
                        evt.preventDefault();
                    break;
                    case 8:
                    case 46:
                        delete_chars(eventholder);
                        evt.preventDefault();
                    break;
                    case 9:
                        updateEventHolder(eventholder,false,true,false);
                        handleCSSEvents_mouse(eventholder,false,true,false);
                        evt.preventDefault();
                    break;
                    case 13:
                        updateEventHolder(eventholder,false,false,true);
                        handleCSSEvents_mouse(eventholder,false,false,true);

                    break;
                    case 27:
                        evt.preventDefault();
                    break;
                    case 86:
                    case 118:    
                        if(evt.ctrlKey){
                            handlePaste(evt);
                        }
                    break;
                    default:
                        //evt.preventDefault();
                        //insert_chars(eventholder,true);
                    break;
                }
                
            break;
            case "keypress":
                
                switch(eventholder.keys.chrVal){
                    
                    default:
                        
                        edit_chars(eventholder,true);
                        evt.preventDefault();
                    break;
                }
                
            break;
            case "keyup":
                
                switch(evt.keyCode){
                    case 86:
                    case 118:
                        if(evt.ctrlKey){
                            handlePaste(evt);
                        }
                    break;
                }
                
                
            break;
        };
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
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
        for(var i = 0, len = eventholder.canvReset.length; i<len; i++){
            window[eventholder.canvReset[i]].shape.redraw = true;
        }
        //}
        
        var cEl;
        if(boolHover){
            //  hover reset for old focus element 
            if(eventholder.hover && eventholder.hover.resetold){
                cEl = window[eventholder.hover.id];
                if(cEl){
                    cEl.hover = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"hoveroff");
                    resetCursor(cEl);
                }
            }
            // new hover set
            if(eventholder.hover && eventholder.hover.reset){
                eventholder.hover.id = eventholder.currentid;
                cEl = window[eventholder.currentid];
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
                cEl = window[eventholder.focus.id];
                if(cEl){
                    cEl.focus = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"focusoff");
                    resetCursor(cEl);
                }
            }
            // new focus set
            if(eventholder.focus && eventholder.focus.reset){
                eventholder.focus.id = eventholder.currentid;
                cEl = window[eventholder.currentid];
                cEl.focus = true;
                cEl.style.redraw = true;
                cEl.shape.redraw = true;
                runEval(cEl,"focuson");
                resetCursor(cEl);
            }
        }
        
        if(boolActive){
            //  active reset for old active element 
            if(eventholder.active && eventholder.active.resetold){
                cEl = window[eventholder.active.id];
                if(cEl){
                    cEl.active = false;
                    cEl.style.redraw = true;
                    cEl.shape.redraw = true;
                    runEval(cEl,"activeoff");
                    resetTextSelection(cEl);
                    resetCursor(cEl);
                }
            }
            // new active set
            if(eventholder.active && eventholder.active.reset){
                eventholder.active.id = eventholder.currentid;
                cEl = window[eventholder.currentid];
                cEl.active = true;
                cEl.style.redraw = true;
                cEl.shape.redraw = true;
                runEval(cEl,"activeon");
                resetCursor(cEl);
            } 
        }
        
        
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
};


function handleContextMenu(eventholder){
    try{
        //var eventholder = window["eventholder"];
        
        //cdebug(eventholder.layerId,true,true);
        //cdebug(eventholder.metrics,true);
        
        if(eventholder.layerId === "context")return true;
        
        var layer_context = window[eventholder.pageId + "_context"];
        
        
        if(eventholder.keys.which === 3 && !layer_context.debug){
            layer_context.visible = true;
            
            var page_context = window[eventholder.pageId];
            var xy = eventholder.metrics.xyAbs;
            
            //cdebug(xy[0] + " vs " + page_context.w + " vs " + layer_context.w);
            // TODO check if what ???
            if(xy[0]>page_context.shape.w-layer_context.shape.w-2)xy[0]=page_context.shape.w-layer_context.shape.w-2;
            if(xy[1]>page_context.shape.h-layer_context.shape.h-2)xy[1]=xy[1]-layer_context.shape.h-2;
            
            layer_context.shape.masspoint = cEl_edit_MP(layer_context,xy,layer_context.shape.scale);
            layer_context.shape.redraw = true;
        }else{
            layer_context.visible = false;
            layer_context.shape.redraw = true;
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
        return err;
    }
}

function setContextMenu(cEl_canv){
    try{
        var evt = window.event;
        cdebug("handleContext: <" + evt.type + "> on <" + cEl_canv.parentId + "_" + cEl_canv.id + ">",true);
        cdebug(cEl_canv.style);
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3);
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
        cdebug(err,false,false,3);
        return err;
    }    
}

function selection_actions(cEl, xy, actionNo, boolReset){
    
    try{
        
        var lines = cEl.data.values.temp.lines3;
        var len = lines.length;
        var cEl_Selection = window[cEl.pageId].text.charsSelection;
        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        
        cEl_Selection.id = cEl.parentId  + "_" + cEl.id;
        
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
        cdebug(err,false,false,3);
        return err;
    }    
}

function testEvents(cEl,eventName){
    
    cdebug("testEvents: <" + eventName + "> on <" + cEl.parentId + "_" + cEl.id + ">",true);
    
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
    //alert(cEl.id);
    
    //cdebug(currentid.id);
//    var cEl = window[currentid];
//    //cEl.shape.redraw = true;
//    drawChildren(cEl,true);
    
}