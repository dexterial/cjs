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

        if (window.addEventListener) window.addEventListener("contextmenu", disableEvent, false);
        else if (window.attachEvent) window.attachEvent("oncontextmenu", disableEvent);
        if (window.addEventListener) window.addEventListener("wheel",handleWheel, false);
        else if (window.attachEvent) window.attachEvent("onwheel", handleWheel);
//        
//        //clipboard events
//        //if (window.addEventListener) window.addEventListener("beforepaste", handleBeforePaste, false);
//        //else if (window.attachEvent) window.attachEvent("onbeforepaste", handleBeforePaste);
//        //if (window.addEventListener) window.addEventListener("paste", handlePaste, false);
//        //else if (window.attachEvent) window.attachEvent("onpaste", handlePaste);

//        //touch events
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

        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}

var globalTool = new paper.Tool();
globalTool.onMouseDown = handleMouse;
globalTool.onMouseMove = handleMouse;
globalTool.onMouseUp = handleMouse;
globalTool.onKeyDown = handleKeys;
globalTool.onKeyUp = handleKeys;
paper.activeTool = "globalTool";


function testLayer(){
    cdebug(paper.project.name)();
}


function globalEvents(eventholder){
    
    try{
        
        switch(eventholder.type){
            
            case "mousedown":
            case "touchstart":
                //cdebug(eventholder.retObj.name + " vs " + eventholder.actObj.name)();
                //cdebug(paper.project.activeLayer.children.length)();
                
                //cdebug(evt.detail,true);
                updateEventHolder(eventholder,false,true,true);
                
                if(paper.activeTool === "globalTool"  ){
                    
                    runEval(eventholder.retObj,eventholder.type);
                    
                    handleCSSEvents(eventholder,false,true,true,true);
                    //setCarret(null,null,false);

                    handleTextSelection(eventholder);

                    handleContextMenu(eventholder);
                    
                }else{
                    eventholder.retObj = paper.project.activeLayer;
//                    handleCSSEvents(eventholder,false,true,true,false);
                    editor_mousedown(eventholder);
                }
                
                drawProjects(paper,false);
                //paper.view.draw();
                //renderer(eventholder.canvReset);
                
            break;
            case "mouseup":
            case "touchend":
                
//                updateEventHolder(eventholder,false,true,true);
                
                if(paper.activeTool === "globalTool" ){
                    
                    runEval(eventholder.retObj,eventholder.type);
                    
                    handleTextSelection(eventholder);

                }else{
                    eventholder.retObj = paper.project.activeLayer;
//                    updateEventHolder(eventholder,true,false,false);
//                    handleCSSEvents(eventholder,true,false,false,true);
                    editor_mouseup(eventholder);
                }
                
                drawProjects(paper,false);
                
            break;
            case "mousemove":
            case "touchmove":
                
                updateEventHolder(eventholder,true,false,false);
                
                if(paper.activeTool === "globalTool"){
                    
                    //cdebug(eventholder.retObj.events)();
                    
                    runEval(eventholder.retObj,eventholder.type);
               
                    // CSS enabled events
                    
                    if(eventholder.keys.button === 0){
                        handleCSSEvents(eventholder,true,false,false,true);
                    }
                    handleTextSelection(eventholder);
                
                }else{
                    eventholder.retObj = paper.project.activeLayer;
//                    handleCSSEvents(eventholder,true,false,false,false);

                    editor_mousemove(eventholder);
                }

                drawProjects(paper,false);
                //cdebug(eventholder.targetId + " " + paper.project.name,true,true)();
                //cdebug(eventholder.canvReset,true,true)();
                //renderer(eventholder.canvReset);
                
            break;
            case "mouseout":
                
                cdebug("event undefined >>> mouseout")();
//                updateEventHolder(eventholder,true,false,false);
//                // CSS enabled events
//                handleCSSEvents(true,false,false,true);
//                
//                handleTextSelection(eventholder);
//                
//                //renderer(eventholder.canvReset);
//                drawProjects(paper,false);
                
            break;
            case "keydown":
                //cdebug(eventholder)();
                
                if(eventholder.keys.shiftKey && eventholder.keys.ctrlKey){
                    return true;
                }
                
                if(paper.activeTool === "globalTool"){
                    handleCSSEvents_keys(eventholder);
                    handleTextSelection(eventholder);
                    
                    runEval(eventholder.active.oldObj,eventholder.type) ;
                }else{
                    eventholder.retObj = paper.project.activeLayer;
                    editor_keydown(eventholder);
                } 
                drawProjects(paper,false);
                
            break;
            case "keyup":
                //cdebug([evtType,kind(evt.target)]);
                if(eventholder.keys.shiftKey && eventholder.keys.ctrlKey){
                    // check edit mode combination CTRL + SHIFT + "E" or "e"
                    if(eventholder.keys.key ==="e" || eventholder.keys.key ==="E" || boolForce){
                        if(editMode(eventholder)){
                            drawProjects(paper,true);
                            return true;
                        }
                    }
                }
            
                if(paper.activeTool === "globalTool" ){
                    handleCSSEvents_keys(eventholder);

                    runEval(eventholder.active.oldObj,eventholder.type);
                }else{
                    eventholder.retObj = paper.project.activeLayer;
                    editor_keyup(eventholder);
                }  
                
                drawProjects(paper,false);
            break;

            case "wheel":
                
//                cdebug(eventholder.wheel)();
                if(paper.activeTool === "globalTool" ){
                    runEval(eventholder.active.oldObj,eventholder.type);
                
                }else{
                    eventholder.retObj = paper.project.activeLayer;
                    editor_wheel(eventholder);
                }  
                
                drawProjects(paper,false);
            break;
        };
        return true;        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
    
}


function handleWheel(evt) {
    
    try{
        // prevent default events        
        evt.preventDefault();
        evt.stopPropagation();

        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"wheel");

        return globalEvents(eventholder);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleMouse(evt) {
    
    try{

        // preload event in custom eventholder
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"mouse");
        // exit if not valid event
        if (eventholder.noevent){return false;};
        
        return globalEvents(eventholder);
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleTouch(evt) {
    
    try {
        
        // preload event in custom eventholder
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"touch");
        
        // exit if not valid event
        if (eventholder.noevent){return false;};
        
        return globalEvents(eventholder);
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function handleKeys(evt) {
    
    try{

        //cdebug(getProperties(evt),true);
        evt.stop();
        
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"keyboard");
        
        //if(eventholder.noevent)return false;
//        if(!eventholder.active.oldObj)return false;

        return globalEvents(eventholder);
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};


function handleTextSelection(eventholder){
    
    try{

        if(!eventholder.active.oldObj)return false;
        
        var cEl = eventholder.active.oldObj;
        
        //console.log(cEl.data.type);
        if(cEl.data.type !== "text"){
            return false;
        }
        //cdebug("cEl",true);
        
        var btnPressed = eventholder.keys.button;
        var clickCount = eventholder.keys.detail;
        
        switch(eventholder.type){
            case "keydown":
                if(eventholder.keys.ctrlKey && (eventholder.keys.key ==="a" || eventholder.keys.key ==="A")){
                    selection_actions(cEl, eventholder, 4, true);
                    //cdebug(eventholder.keys.key)();
                }
                if(eventholder.keys.key ==="ESCAPE"){
                    selection_actions(cEl, eventholder, 4, true);
                    //cdebug(eventholder.keys.key)();
                }
                
            break;
            case "mousedown":
            case "touchstart":
                if(btnPressed === 1){
                    //cdebug(!eventholder.keys.ctrlKey)();
                    selection_actions(cEl, eventholder, clickCount, !eventholder.keys.ctrlKey);
                    return true;
                }
                if(btnPressed === 3){
                    selection_actions(cEl, eventholder, clickCount, true);
                    return true;
                }
                    
            break;
            case "mousemove":
            case "touchmove":
                if(btnPressed === 1){
                    //cdebug(cEl.name)();
                    selection_actions(cEl, eventholder, -1, false);
                }
            break;
            case "mouseup":
            case "touchend":
                if(btnPressed === 1){
                    selection_actions(cEl, eventholder, -2, false);
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
                "block":{"state":false,"metrics":{},"keys":{}},
                "data":{},
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
        var evt;
        
        if(evtCallerType === "touch" || evtCallerType === "wheel"){
            evt = paperevt;
            
            //disableEvent(evt);
        }else{
            evt = paperevt.event;
            //alert("here");
            //paperevt.stop();
        }
        
        
        eventholder.metrics.ts = paperevt.timeStamp;
        eventholder.keys ={
            "altKey":evt.altKey,
            "metaKey":evt.metaKey,
            "ctrlKey":evt.ctrlKey,
            "shiftKey":evt.shiftKey,
            "which":evt.which
        };
        
        //cdebug(eventholder.keys.button)();
        
        switch(evtCallerType){
            case "touch":
                //dom2
                if(eventholder.metrics.xy){
                    var oldPoint = new paper.Point(eventholder.metrics.xy);
                    eventholder.metrics.delta = oldPoint.getDistance([evt.changedTouches[0].clientX,evt.changedTouches[0].clientY]);
                }else{
                    eventholder.metrics.delta =null;
                }
                
                eventholder.metrics.xy = [evt.changedTouches[0].clientX,evt.changedTouches[0].clientY];
                eventholder.metrics.xyAbs = [evt.changedTouches[0].pageX - evt.changedTouches[0].target.offsetLeft,evt.offsetY = evt.changedTouches[0].pageY - evt.changedTouches[0].target.offsetTop];
                //if(evt.type==="touchend")alert(eventholder.metrics.xyAbs + " " + eventholder.metrics.xy);
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.which ? evt.which: evt.button;
                //dom3
                eventholder.keys.buttons = evt.buttons;
                //}
            break;
            case "mouse":
                //dom2
                
//                if(eventholder.metrics.xy){
//                    var oldPoint = new paper.Point(eventholder.metrics.xy);
//                    eventholder.metrics.delta = oldPoint.getDistance([evt.changedTouches[0].clientX,evt.changedTouches[0].clientY]);
//                }else{
//                    eventholder.metrics.delta =null;
//                }
                eventholder.metrics.delta = paperevt.delta;
                
                eventholder.metrics.xy = [evt.offsetX ,evt.offsetY];
                eventholder.metrics.xyAbs = [evt.clientX,evt.clientY];
                
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.which ? evt.which: evt.button;
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
                eventholder.keys.chr =  evt.character || eventholder.keys.which || eventholder.keys.keyCode;
                eventholder.keys.chrVal = String.fromCharCode(eventholder.keys.chr);
            break;
            case "wheel":
            
                eventholder.keys.detail = evt.detail;
                eventholder.keys.button = evt.which ? evt.which: evt.button;
                //dom3
                eventholder.keys.buttons = evt.buttons;
                
                //dom2
                if(eventholder.metrics.xy){
                    var oldPoint = new paper.Point(eventholder.metrics.xy);
                    eventholder.metrics.delta = oldPoint.getDistance([evt.offsetX,evt.offsetY]);
                }else{
                    eventholder.metrics.delta =null;
                }
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
        var targetId = evt.target.id;
        
        
        if(!targetId ){
//            cdebug(eventholder.targetId)();
            eventholder.noevent = true;
        }else{
            eventholder.noevent = false;
            if(eventholder.block.state) return true;
            
//            cdebug("here")();
            
            eventholder.targetId = targetId;
            
            if(!eventholder.active.oldObj)eventholder.active.oldObj = paper.project.activeLayer;
            
            var arrTargetId = targetId.split("_");
            
            if(arrTargetId.length === 4){
                eventholder.pageId = arrTargetId[1];
                eventholder.projectId = arrTargetId[2];
                eventholder.tag = arrTargetId[3];
            }else{
                // case for body type key, scroll, etc event
                return true;
            }
            
            
            
            projectSwitch(eventholder.projectId);
//            eventholder.layerId = paper.project.activeLayer.name;
            
            var hitOptions = {
//                    class:paper.Path,
//                    match: function test(hit){if(typeof hit.item.name!=="undefined")return true;},
//                handles:true,
//                bounds:true,
//                segments: true,
                stroke: true,
                fill: true,
                tolerance: 5
            };
            var hitObject = paper.project.hitTest(eventholder.metrics.xy, hitOptions);

            if(hitObject && hitObject.item){
                
                
                
//                        var name = hitObject.item.name;
                //cdebug(paper.project.name)();
//                cdebug("<<< " + hitObject.item.parent.parent.tag + " --- " + hitObject.item.parent.parent.name + " >>> vs <<< " +
//                        hitObject.item.parent.className + " --- " + hitObject.item.parent.name + " >>> vs <<< " + 
//                        hitObject.item.className +" --- "+ hitObject.item.name + " >>>")();
//                var parent = getParent(hitObject.item,"tag");
//                cdebug(parent.name)();

                eventholder.retObj = getParent(hitObject.item,"tag");
                eventholder.actObj = hitObject.item;
                eventholder.hitObject = hitObject;
                
                //cdebug(eventholder.retObj.events)();

            }else{
                eventholder.retObj = paper.project.activeLayer;
                eventholder.actObj = paper.project.activeLayer;
                eventholder.hitObject = null;
            }
                
            //if(!eventholder.active.oldObj)return false;
            eventholder.layerId = eventholder.retObj.layerName;
            layerSwitch(eventholder.layerId);
    
            eventholder.currentid = eventholder.retObj.name;

        }

        return true;
       
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function getParent(obj,checkProperty){
    try{
        //var i=0;
        do{
            //i++;
            if(obj.hasOwnProperty(checkProperty)){
                //cdebug(i)();
                return obj;
            }
            if(!obj.parent)return obj;
            obj = obj.parent;
            

        }while(true)

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function has(object, key) {
    return object.hasOwnProperty(key);
 }

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



function editMode(eventholder,boolForce){
    try{
        
//        cdebug("editMode")();
        
        
            
            
            if(paper.activeTool === "globalTool" && !boolForce){
                
                var menuTriggered = handleMenuProject(eventholder,"editor",true);
                if (menuTriggered){
//                    var xy = [10,10];
                    //menuTriggered.activate();
//                    cdebug(menuTriggered.name)();
//                    menuTriggered.
//                    menuTriggered.shape.masspoint = cEl_edit_MP(paper,xy,paper.shape.scale);
                    menuTriggered.reset.layout_shape = true;
//                    drawProjects(menuTriggered,true);
                };
                
                //cdebug("to editorTool")();
//                editorTool.activate();
                paper.activeTool = "editorTool";
                
            }else{
                //cdebug("to globalTool")();
//                globalTool.activate();
                paper.activeTool = "globalTool";
                selectGroup(null);
                
                handleMenuProject(eventholder,"editor",false);
                
            }
            return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function handleCSSEvents_keys(eventholder) {
    
    try{
        
        switch(eventholder.type){
            
            case "keydown":
                // handle normal keys
                if (eventholder.keys.key.length===1){
                    edit_chars(eventholder,true);
                    return true;
                }
                
                
                
                // handle special keys
                switch(eventholder.keys.key){
                    
                    case "Control":
                    case "Shift":
                        // do nada
                    break;
                    
                    case "ArrowLeft":
                    case "ArrowUp":
                    case "ArrowDown":
                    case "ArrowRight":    
                        move_chars(eventholder);
//                        evt.preventDefault();
                    break;
                    case "Delete":
                    case "Backspace":
                        delete_chars(eventholder);
//                        evt.preventDefault();
                    break;
                    case "Tab":
                        // TODO update this
                        updateEventHolder(eventholder,false,true,false);
                        handleCSSEvents(eventholder,false,true,false);
//                        evt.preventDefault();
                    break;
                    case "Enter":
                        // TODO update this
                        updateEventHolder(eventholder,false,false,true);
                        handleCSSEvents(eventholder,false,false,true);

                    break;
                    case "Escape":
//                        cdebug(eventholder.retObj.name)();
                        //resetTextSelection(eventholder.retObj);
                    break;
//                    case 86:
//                    case 118:    
//                        if(eventholder.keys.ctrlKey){
//                            //handlePaste(evt);
//                        }
//                    break;
//                    case 16:
//                    
//                    
                    default:
                        cdebug(eventholder.keys.key + " >>> " + eventholder.keys.chr)();
                    
                }
                
            break;
//            case "keypress":
//                cdebug("keypress : " + eventholder.keys.chr)();
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
            case "keyup":
                
                switch(eventholder.keys.key){
//                    case 86:
//                    case 118:
//                        if(eventholder.keys.ctrlKey){
//                            //handlePaste(evt);
//                        }
//                    break;
                }
                
                
            break;
        };
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};
function handleCSSEvents(eventholder,boolHover,boolFocus,boolActive,boolRunEvents) {
    
    try{

        // CSS enabled events
        
        var cEl;
        if(boolHover){
            
            //  hover reset for old focus element 
            if(eventholder.hover.resetold){
                cEl = eventholder.hover.oldObj;
                //cdebug("hover reset old ->>>" + cEl.name)();
                cEl.hover = false;
                cEl.reset.layout_css = true;
                if(boolRunEvents)runEval(cEl,"hoveroff");
            }
            // new hover set
            if(eventholder.hover.reset){
                
                //if(!eventholder.retObj.name)cdebug(eventholder.retObj)();
                
                eventholder.hover.id = eventholder.currentid;
                eventholder.hover.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                
                //cdebug("hover reset new ->>>" + cEl.name)();
                //cEl = window[eventholder.currentid];
                cEl.hover = true;
                cEl.reset.layout_css = true;
                if(boolRunEvents)runEval(cEl,"hoveron");
                cEl.reset.cursor = true;
            }
        }
        
        if(boolFocus){
            //  focus reset for old focus element 
            if(eventholder.focus.resetold){
                cEl = eventholder.focus.oldObj;
//                if(cEl){
                    cEl.focus = false;
                    cEl.reset.layout_css = true;
                    //cEl.reset.layout_shape = true;
                    if(boolRunEvents)runEval(cEl,"focusoff");
//                    resetCursor(cEl);
//                }
            }
            // new focus set
            if(eventholder.focus.reset){
                eventholder.focus.id = eventholder.currentid;
                eventholder.focus.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                cEl.focus = true;
                cEl.reset.layout_css = true;
                //cEl.reset.layout_shape = true;
                if(boolRunEvents)runEval(cEl,"focuson");
                cEl.reset.cursor = true;
            }
        }
//        
        if(boolActive){
            //  active reset for old active element 
            if(eventholder.active.resetold){
                cEl = eventholder.active.oldObj;
//                if(cEl){
                    cEl.active = false;
                    cEl.reset.layout_css = true;
                    //cEl.reset.layout_shape = true;
                    if(boolRunEvents)runEval(cEl,"activeoff");
                    //resetTextSelection(cEl);
                    //resetCursor(cEl);
//                }
            }
            // new active set
            if(eventholder.active.reset){
                
                eventholder.active.id = eventholder.currentid;
                eventholder.active.oldObj = eventholder.retObj;
                
                cEl = eventholder.retObj;
                cEl.active = true;
                cEl.reset.layout_css = true;
                //cEl.reset.layout_shape = true;
                if(boolRunEvents)runEval(cEl,"activeon");
                cEl.reset.cursor = true;
                
            } 
        }
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function handleMenuLayer(eventholder,name,trigger){
    try{
        
        if(eventholder.layerId === name)return false;
        //var page = paper;

        if(!paper.data.menus[name] && !trigger)return false;
        
//        cdebug("handleMenuLayer " + name + " trigger=" + trigger)();
        
        var menu = paper.project.layers[name];
        
        if(!menu)return false;
        
        if(trigger){
            
            menu.visible = true;
            menu.activate();
            

            //project_context.reset.layout_css = true;
            
            //cdebug(project_context.shape.masspoint)();
            
            paper.data.menus[name] = true;
            
            //cdebug("setviz handleContextMenu  " + eventholder.pageId)();
            
            return menu;
            
        }else if(menu.visible){
            menu.visible = false;
            //project_context.reset.layout_shape = true;
            
            paper.data.menus[name] = false;
            
            return false;
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function handleMenuProject(eventholder,name,trigger){
    try{
        
//        cdebug("handleMenuProject " + name + " trigger=" + trigger + " eventholder.projectId=" + eventholder.projectId)();
        
//        if(eventholder.projectId === name)return false;
        //var page = paper;

        if(!paper.data.menus[name] && !trigger)return false;
        
        
//        cdebug(paper.projects[1].name)();
        
        var menu = projectGet(name);
        
        if(!menu)return false;
        
        if(trigger){
            
            menu.visible = true;
            menu.activate();
            
            
            //project_context.reset.layout_css = true;
            
            //cdebug(project_context.shape.masspoint)();
            
            paper.data.menus[name] = true;
            
            //cdebug("setviz handleContextMenu  " + eventholder.pageId)();
            
            return menu;
            
        }else if(menu.visible){
            menu.visible = false;
            menu.reset.layout_shape = true;
//            drawProjects(menu);
            
            paper.data.menus[name] = false;
            
            return false;
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function handleContextMenu(eventholder){
    try{
        //var eventholder = window["eventholder"];
        
        //cdebug(eventholder.layerId)();
        //cdebug(eventholder.metrics,true);
        var menuTriggered = handleMenuLayer(eventholder,"context",(eventholder.keys.which === 3));
        
        //cdebug(menuTriggered)();
        
        if (menuTriggered){
            moveCEl(eventholder,menuTriggered,false);
            menuTriggered.bringToFront();
//            drawProjects(menuTriggered,false);
        };
        
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function moveCEl(eventholder,cEl,boolcheckmouse){
    try{
        if(boolcheckmouse){
            if(eventholder.keys.buttons !==1)return true;
        }
        var xy;
        
        
        
        if(eventholder.block.offset){
            xy = [eventholder.metrics.xy[0] + eventholder.block.offset.x -eventholder.block.metrics.xy[0],
                eventholder.metrics.xy[1] + eventholder.block.offset.y-eventholder.block.metrics.xy[1]];
        }else{
            xy = eventholder.metrics.xy;
        }
        
        cEl.shape.masspoint = cEl_edit_MP(paper.project,xy,paper.project.shape.scale);
        cEl.reset.layout_shape = true;
        
        //cdebug(eventholder.block.offset)();
        
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

function resetTextSelection(cEl_group){
    
    try{
        
        if(cEl_group.data.type === "text"){
            var cEl_Selection = paper.data.text.charsSelection;
            cEl_Selection.charspos = [];
            cEl_Selection.chars = [];
            cEl_Selection.wordspos = [];
            cEl_Selection.paragraphspos = [];
            cEl_group.reset.selection = true;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}



function selection_actions(cEl_group, eventholder, actionNo, boolReset){
    
    try{
        
        //cdebug(actionNo)();
        if(cEl_group.data.values.noselect)return true;
        
        var lines = cEl_group.data.values.temp.lines3;
        var symbols = cEl_group.children["TextSymbols"].children;
        
        
        var cEl_SelectionObjs = paper.data.text.charsSelection.selObj;
        
        var selObj;
        var selData = cEl_group.data.values.temp.selData;
        //if(selData)cdebug(selData.charspos)();
        if(!selData){
            selData = {"charspos":[],"temp":[],"cr":{"pos":-1},"reset":false};
            cEl_group.data.values.temp.selData = selData;
        }
        //cdebug(selData.temp)();
        
        if(cEl_SelectionObjs){
            //cdebug(Object.keys(cEl_SelectionObjs))();
            for(var selObjKey in cEl_SelectionObjs){
                selObj = cEl_SelectionObjs[selObjKey];
                //cdebug(selObj)();
                if(cEl_group.name === selObj.name){
                    if(boolReset){
                        selObj.reset.selection = true;
                        selData.charspos = [];
                        selData.temp = [];
                        selData.cr = {"pos":-1};
                        selData.reset = true;
                    };
                }else{
                    if(boolReset){
                        selObj.reset.selection = true;
                        selObj.data.values.temp.selData.reset = true;
                        //cdebug(Object.keys(cEl_SelectionObjs))();
                        delete cEl_SelectionObjs[selObj.parentName + "_" + selObj.name];
                        //cdebug(Object.keys(cEl_SelectionObjs))();
                    };
                }
                
            } 
        }else{
            paper.data.text.charsSelection.selObj = {};
            cEl_SelectionObjs = paper.data.text.charsSelection.selObj;
        }
        
        //cdebug(cEl_group.data.values.noselect)();
        
        var boolForce = false;
        
        var cr,startPos,endPos,chrObj;
        var chrObj_sibling;

        switch(true){
            //move carret top
            case actionNo === "ArrowTop":
                chrObj = lines[selData.cr.pos];
                cr = getCharPos2(eventholder,symbols,"ArrowTop");
                if(!cr.valid)break;                
//                if(lines[cr.pos].xy){
//                    cEl_Selection.cr.pos = cr.pos;
//                    cEl_Selection.cr.left = cr.left;
//                }
                //setCarret(eventholder,cEl_Selection,true);
                boolForce = true;
            break;
            //move carret bottom
            case actionNo === "ArrowDown":
                chrObj = lines[selData.cr.pos];
                cr = getCharPos2(eventholder,symbols,"ArrowDown");
                if(!cr.valid)break; 
//                if(lines[cr.pos].xy){
//                    cEl_Selection.cr.pos = cr.pos;
//                    cEl_Selection.cr.left = cr.left;
//                }
                //setCarret(eventholder,cEl_Selection,true);
                boolForce = true;
            break;
            //move carret right
            case actionNo === "ArrowRight":
                chrObj = symbols[selData.cr.pos];
                chrObj_sibling = chrObj.nextSibling;
                
                if(selData.cr.left){
                    selData.cr.left = false;
                    boolForce = true;
                }else if(chrObj_sibling && chrObj_sibling.nl){
                    selData.cr.pos++;
                    boolForce = true;
                    selData.cr.left = true;
                }else if(chrObj_sibling){
                    selData.cr.pos++;
                    boolForce = true;
                    selData.cr.left = false;
                }
                
            break;
            //move carret left
            case actionNo === "ArrowLeft":
                chrObj = symbols[selData.cr.pos];
                chrObj_sibling = chrObj.previousSibling;
                //cdebug(chrObj.nl)();
                
                if(!selData.cr.left && chrObj.nl){
                    selData.cr.left = true;
                    boolForce = true;
                }else if(chrObj_sibling){
                    selData.cr.pos--;
                    boolForce = true;
                    selData.cr.left = false;
                } 
                
            break;
            // reset temp selection
            case actionNo === -2:
                
                //cdebug(selData)();
                selData.temp = $.extend(true,[],selData.charspos);
                //boolForce = true;
                
            break;
            // select on mouse move and pressed
            case actionNo === -1:
                
                if(selData.cr.pos===-1)break;
                
                
                //cdebug(eventholder.retObj.name)();
                
                cr = getCharPos2(eventholder,symbols,"Mouse");
                if(!cr.valid)break;
                
                
                
                
                if(selData.cr.pos === cr.pos && selData.cr.left===cr.left){
                    selData.charspos = mergeIntArrays(selData.temp,[]);
                }else{
                    selData.charspos = mergeIntArrays(selData.temp,getIntArray(cr.pos, selData.cr.pos));
                }
                
                
                //cdebug(selData.oldPos !== cr.pos)();
                boolForce = selData.oldPos !== cr.pos;
                selData.oldPos = cr.pos;

            break;
            // move carret on mouse down
            case actionNo === 1:
                
                
                cr = getCharPos2(eventholder,symbols,"Mouse");
                if(!cr.valid)break;
                //selData.cr = cr;
                cEl_group.data.values.temp.selData.cr = cr;
                
                //setCarret(eventholder,cEl_Selection,true);
                boolForce = true;
            break;
            // select word
            case actionNo === 2:
                
                //cr = getCharPos(lines,xy);
                cr = getCharPos2(eventholder,symbols,"Mouse");
                if(!cr.valid)break;
                
                var eol = symbols.length;
                if(!symbols[cr.pos].pc){
                    startPos = 0;
                    var wordPos = symbols[cr.pos].wp;
                    
                    for(var j = cr.pos; j>-1;j--){
                        chrObj = symbols[j];
                        //cdebug(chrObj.wp + " " + wordPos)(); 
                        
                        if(!chrObj || chrObj.wp !== wordPos || chrObj.definition.item.content === " "){
                            startPos = j+1;
                            break;
                        }
                    }
                    endPos = eol-1;
                    for(var j = cr.pos+1; j<eol;j++){
                        chrObj = symbols[j];
                        if(chrObj.nl || chrObj.pc || chrObj.wp !== wordPos){

                            endPos = j-1;
                            break;
                        }else if(chrObj.definition.item.content === " "){
                            endPos = j;
                            break;
                        }
                    }
                }else{
                    startPos = cr.pos;
                    endPos = cr.pos;
                }
                
                if(startPos>endPos)endPos=startPos;
                selData.charspos = mergeIntArrays(selData.charspos,getIntArray(startPos,endPos));
                boolForce = true;
            break;
            // select paragraph
            case actionNo === 3:
                
                //cr = getCharPos(lines,xy);
                cr = getCharPos2(eventholder,symbols,"Mouse");
                if(!cr.valid)break;
                
                var eol = symbols.length;
                startPos =cr.pos;
                endPos =cr.pos;
                
                chrObj = symbols[cr.pos];
                for(var j = cr.pos; j>-1;j--){
                    if(chrObj.pp === 0){
                        startPos = 0;
                        break;
                    }else if(symbols[j].pp!==chrObj.pp){
                        startPos = j+1;
                        break;
                    }
                }
                endPos = eol-1;
                for(var j = cr.pos+1; j<eol;j++){
                    if(symbols[j].pp!==chrObj.pp){
                        endPos = j-1;
                        break;
                    }
                }
                
                if(startPos>endPos)endPos=startPos;
                selData.charspos =  mergeIntArrays(selData.charspos,getIntArray(startPos,endPos));
                boolForce = true;
            break;
            // select all text
            case (actionNo > 3 && actionNo < 8):
                var eol = symbols.length;
                selData.charspos =  mergeIntArrays(selData.charspos,getIntArray(0,eol-1));
                boolForce = true;
            break;

        }
        if(boolForce){
            //cdebug("here")();
            cEl_group.reset.selection = true;
            selData.reset = false;
            cEl_group.data.values.temp.selData = selData;
            cEl_SelectionObjs[cEl_group.parentName  + "_" + cEl_group.name] = cEl_group;
        }
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function getCharCRLeft(xy,bounds){
    try{
        
//        cdebug(bounds.topLeft.getDistance(new paper.Point(xy)))();
//        cdebug(bounds.bottomLeft.getDistance(new paper.Point(xy)))();
//        cdebug(bounds.topRight.getDistance(new paper.Point(xy)))();
//        cdebug(bounds.bottomRight.getDistance(new paper.Point(xy)))();
//        
//        cdebug(xy)();
////        
//        cdebug(bounds.topLeft.getDistance(new paper.Point(xy)) + " << vs >> " + bounds.topRight.getDistance(new paper.Point(xy)))();
        
        
        if( bounds.topLeft.getDistance(new paper.Point(xy))<bounds.topRight.getDistance(new paper.Point(xy))){
            return true;
        }else{
            return false;
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getCharPos2(eventholder,symbols,type){
    try{
        //if(!startPos || startPos === -1)startPos = 0;alert(hit.item.name);
        
        
        
        var actObj = eventholder.actObj;
//        cdebug(eventholder.retObj.name)();
//        cdebug(eventholder.active.oldObj.name)();
        
        switch(type){
            case "Mouse":
                
                switch(actObj.className){
                    case "SymbolItem":
                        if(eventholder.active.oldObj.name!==eventholder.retObj.name)return {"valid":false};
                        //cdebug("Mouse SymbolItem",true)(); 
                        return {"valid":true,"pos":actObj.index,"left":getCharCRLeft(eventholder.metrics.xy,actObj.bounds),"last":actObj.index===symbols.length-1};
                    break;
                    default:
                        return getPosFromBounds(symbols,eventholder.metrics.xy);
                    break;
                }
                
                
                
            break;
            case "ArrowUp":
                return {
                    "valid":false,
//                    "pos":~~actObjName.substring(indexTP+3),
                    "left":false
                };
            break;
            case "ArrowDown":
                return {
                    "valid":false,
//                    "pos":~~actObjName.substring(indexTP+3),
                    "left":false
                };
            break;
        }
               
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getPosFromBounds(symbols,xy){

//    var tLMain = mainBounds.topLeft;
//    var bRMain = mainBounds.bottomRight;
    
    var tLFirst = symbols[0].bounds.topLeft;
    var bRLast = symbols[symbols.length-1].bounds.bottomRight;
    
//    cdebug(xy,true)();
//    cdebug(tLMain)();
//    cdebug(bRMain)();
//    cdebug(tLFirst)();
//    cdebug(bRLast)();
    
    switch(true){
        case xy[1]<tLFirst.y:
//            cdebug("z1" + 0)();
            return {"valid":true,"pos":0,"left":true,"last":false};
        break;
        case xy[1]>bRLast.y:
//            cdebug("z3 " + (symbols.length-1))();
            return {"valid":true,"pos":symbols.length-1,"left":false,"last":true};
        break;
        default:
            
            for(var i=0,yLine=-1,bLAct;i<symbols.length;i++){
                bLAct = symbols[i].bounds.bottomLeft;
                if(yLine === -1 && bLAct.y>xy[1]){
                    yLine = bLAct.y;
                }
                if(yLine>0){
                    if(bLAct.x>xy[0]){
//                        cdebug("z2 A "  + i)();
                        return {"valid":true,"pos":i,"left":false,"last":false};
                    }else if(bLAct.y > yLine){
//                        cdebug("z2 B " + (i-1))();
                        return {"valid":true,"pos":i-1,"left":false,"last":false};
                    }
                }
            }
//            cdebug("z2 C " + (symbols.length-1))();
            return {"valid":true,"pos":symbols.length-1,"left":false,"last":true};

        break;
    }    
}

function pasteContext(cEl){
    try{
        cdebug("not implemented")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}
function copyContext(cEl){
    try{
        cdebug("not implemented")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function setCarret(eventholder,cEl_Selection,boolShowCarret) {
    
    try{
        
        //var d = paper.project.cr;
        
        //cdebug(boolShowCarret)();
        
        if(boolShowCarret){
            
            //TODO move stuff from other places if fesible
            
//            d.visible = true;
//            var charObj = eventholder.actObj.definition.item;
////            cdebug(d.segments)();
////            cdebug(charObj)();
//            
//            //charObj.selected = true;
//            
////            textContainer.addChild(new paper.Path.Line({
//////                    from: [charObj.point.x , charObj.point.y-charObj.fs/2],
//////                    to: [charObj.point.x , charObj.point.y+charObj.fs/2],
//////                    strokeColor : "gray",
//////                    rotation:charObj.angle,
//////                    name:name
//////                }));
//
//            d.segments[0].point = [eventholder.metrics.xy[0] , eventholder.metrics.xy[1]-10];
//            d.segments[1].point = [eventholder.metrics.xy[0] , eventholder.metrics.xy[1]+10];
//            d.rotation = charObj.angle;
//            //cdebug(d.segments[0].point.x)();
////            //cdebug(chrObj.definition.fontSize+'px')();
////            
////            if(cEl_Selection.cr.left){
////                d.style.left = chrObj.position.x+'px';
////            }else{
////                d.style.left = chrObj.position.x+'px';
////            }
////            
////            d.style.top = (chrObj.position.y - chrObj.definition.item.fontSize/2)+'px';
//            //d.style.top = (chrObj.xy[1]-chrObj.fs*0.8)+'px';

        }else{
            //carret.visible = false;
            if(carret){
                carret.remove();
                carret = null;
            }
            //cdebug("here",true,true,0);
//            d.visible = false;
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function testEvents(cEl,eventName){
    
    cdebug("testEvents: <" + eventName + "> on <" + cEl.parentName + "_" + cEl.name + ">",false,false,1)();
    //cdebug("testEvents: <" + eventName + "> on <" + cEl.parentName + "_" + cEl.name + ">",true,true,0)();
    
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

function testEvents2(cEl){
    //alert(cEl.name);
    
    //cdebug(cEl.name)();
//    cdebug(cEl.style.calc2)();
    
//    cdebug(eventholder.actObj.name)();
//    cdebug(eventholder.actObj.className)();
//    cdebug(eventholder.actSegment)();
//    eventholder.actObj.fullySelected = true;
    
//    var cEl = window[currentid];
//    //cEl.reset.layout_shape = true;
//    drawChildren(cEl,true);
    
}


function isPrintableJS(keycode){
    var valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        (keycode === 32)   || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 );   // [\]' (in order) //&& keycode < 223

    return valid;
}


function rotateThis(obj,deltaY){
    var offset;
    if(deltaY>0){
        offset = 3;
    }else{
        offset = -3;
    }
    obj.rotate(offset);
}