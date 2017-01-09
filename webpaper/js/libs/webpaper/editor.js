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


var editorTool = new paper.Tool();
editorTool.onMouseDown = editor_handleMouse;
editorTool.onMouseMove = editor_handleMouse;
editorTool.onMouseUp = editor_handleMouse;
editorTool.onKeyDown = editor_handleKeys;
editorTool.onKeyUp = editor_handleKeys;


function editor_handleKeys(evt) {
    
    try{
        
        var evtType = evt.type;
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"keyboard");
        if(!eventholder.active.oldObj)return false;

        switch(evtType){
            
            case "keydown":
                
                
                
                editor_keydown(evt);
                
                drawProjects(paper,true);
                
                
            break;
            case "keyup":
                if(eventholder.keys.shiftKey && eventholder.keys.ctrlKey){
                    // check edit mode combination CTRL + SHIFT + "E" or "e"
                    if(editMode(eventholder))return true;
                }
                
                editor_keyup(evt);
                
                drawProjects(paper,true);
                
                
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

function editor_handleMouse(evt) {
    
    try{
        var evtType = evt.type;
        // exit if not event
        if(!evtType){
            return false;
        }
        
        switch(evtType){
            
            case "mousedown":
                //cdebug("mousedown")();
                
                editor_mousedown(evt);
                
                drawProjects(paper,true);

            break;
            case "mouseup":
                
                drawProjects(paper,true);

            break;
            case "mousemove":
                
                drawProjects(paper,true);

            break;
            case "mouseout":
                
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




function editor_keydown(evt) {

    try{
        //var cEl_layer = window[cEl.layerId];
        //var eventholder = window["eventholder"];
        //cdebug(window.event.keyCode);
//        
//        var eventholder = window["eventholder"];
//        
//        switch (cEl_layer.name) {
//            case "fabric":
//                //cdebug("editor_keydown START state " + cEl_layer.data.state,true);
//                //cdebug(eventholder.keys);
//                switch (cEl_layer.data.state) {
//                    case "editlimbo":
//                        switch(eventholder.keys.keyCode){
//                            case 38:
//                                keyAdjustments(cEl_layer, [1,-1]);
//                            break;
//                            case 40:
//                                keyAdjustments(cEl_layer, [1,1]);
//                            break;
//                            case 37:
//                                keyAdjustments(cEl_layer, [0,-1]);
//                            break;
//                            case 39:
//                                keyAdjustments(cEl_layer, [0,1]);
//                            break;
//                            case 27:
//                                
//                                undoLastCpEdit(cEl_layer,0,true);
//                                
//                            break;
//                        }
//                        return true;
//                    break;
//                    case "edit":
//                    case "pre":
//                        switch(eventholder.keys.keyCode){
//                            case 38:
//                                cEl_editIndex(cEl_layer, false, true);
//                            break;
//                            case 40:
//                                cEl_editIndex(cEl_layer, true, true);
//                            break;
//                            case 37:
//                                cEl_editIndex(cEl_layer, false, false);
//                            break;
//                            case 39:
//                                cEl_editIndex(cEl_layer, true, false);
//                            break;
//                            case 27:
//                                //undoLastCpEdit(cEl_layer,0);
//                                saveLastCpEdit(cEl_layer,"pre",true);
//                            break;
////                            case 13: //edit children index
////                                cEl_editIndexParent(cEl_layer,eventholder.keys.shiftKey);
////                            break;
//                        }
//                    break;
//                }
////                cdebug("editor_keydown START state " + cEl_layer.data.state,true)();
//            break;
//        }
        return false;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



function editor_keyup(evt) {

    try{
        //var cEl_layer = window[cEl.layerId];
        //var eventholder = window["eventholder"];
        //cdebug(eventholder.event.shiftKey)();
        //cdebug(window.event.shiftKey)();

//        switch (cEl_layer.name) {
//            case "fabric":
//
////                //cdebug("editor_keyup state " + cEl_layer.data.state)();
////                var cEl_page = window["editorPage"];
////                var cEl = window[cEl_layer.data.editIndex];
////                switch (cEl_layer.data.state) {
////                    case 2:
////                        
////                        switch(window.event.keyCode){
//////                            case 13:
//////                                return resetState(cEl_layer, cEl, cEl_layer.data.editIndex);
//////                            break;
////                        }
////                    break;
////                }
//
//            break;
//        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;;
    }
}

function editor_keypress(cEl_layer) {
    // BEWARE triggers right after keydowns event, however it does not trigger for all keys (non printable)
    try{
        //var cEl_layer = window[cEl.layerId];
        var eventholder = window["eventholder"];
        switch (cEl_layer.name) {
            case "fabric":
                //cdebug("editor_keypress START state " + cEl_layer.data.state,true)();
                
                switch (cEl_layer.data.state) {
                    case "editlimbo":
                        switch(eventholder.keys.keyCode){
                            case 13: //save ref point
                                saveLastCpEdit(cEl_layer,"edit");
                            break;
                            case 26: //undo refpoint
                                undoLastCpEdit(cEl_layer,-1);
                                //cEl_layer.shape.redraw = true;
                            break;
                            case 25: //redo refpoint
                                undoLastCpEdit(cEl_layer,1);
                                //cEl_layer.shape.redraw = true;
                            break;
                        }
                    break;
                    default:
                        switch(eventholder.keys.keyCode){
                            case 26: //undo refpoint
                                undoLastCpEdit(cEl_layer,-1);
                                //cEl_layer.shape.redraw = true;
                            break;
                            case 25: //redo refpoint
                                undoLastCpEdit(cEl_layer,1);
                                //cEl_layer.shape.redraw = true;
                            break;
                        }
                    break;
                }
                //cdebug("editor_keypress END state " + cEl_layer.data.state)();
            break;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}
function editor_wheel(cEl_layer) {

    try{
        //cdebug(cEl_layer.name);
        var eventholder = window["eventholder"];
        switch (cEl_layer.name) {
            case "fabric":
                //cdebug("editor_wheel state " + cEl_layer.data.state)();
                switch (cEl_layer.data.state) {
                    case "pre":
                    case "edit":
                        cEl_layer.data.state = "edit";
                        cEl_editIndex(cEl_layer,eventholder.wheel.deltaY>0,eventholder.keys.ctrlKey);

                    break;
                }
            break;
        }
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_mousedown(evt) {

    try{
        
        //var cEl_page = window[cEl_layer.pageId];
        var eventholder = window["eventholder"];
        preSetEventHolder(eventholder,evt,"mouse");
        if(!eventholder.active.oldObj)return false;
        
        var cEl_layer = paper.project;
        if(!cEl_layer.data.state){
            cEl_layer.data.state = "pre";
            cEl_layer.data.editIndex = 0;
        }
        
        
        cdebug(cEl_layer.activeLayer.children[1].name)();

        switch (cEl_layer.name) {
//            case "preview":
//            break;
//            case "tools":
//            break;
            case "main":
                cdebug("editor_mousedown START state " + cEl_layer.data.state + " at index " + cEl_layer.data.editIndex,true)();
                switch (cEl_layer.data.state) {
                    case "edit":
                        //if(cEl_layer.data.editIndex<0){return false;}
                        //var cEl = cEl_layer.children[cEl_layer.data.editIndex];
//                        cdebug(cEl.shape.temp.activeCp)();
//                        cdebug(cEl_layer.metrics.xy)();
                        if(cEl_setActiveCp(cEl_layer)){
                            cEl_setCpCursor(cEl_layer);
                            cEl_layer.data.state = "editmove";
                            
                            cEl_storeRefPoints(cEl_layer, true);
                            
                            //cEl_setCpXY(cEl.shape.temp.activeCp, cEl_layer.metrics.xy);
                            cEl_layer.shape.redraw = true;
                            if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
                        };
                        
                        //GLOBAL_renderer = true;
                    break;
                    case "editlimbo":
                        cEl_layer.data.state = "editmove";
                        cEl_editActiveCp(cEl_layer);
                        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}

                    break;
                    case "pre":
                        cEl_layer.data.state = "editmaker";
                        addDrawShape(cEl_layer,false);
                    break;
                }
                cdebug("editor_mousedown END state " + cEl_layer.data.state)();
                
            break;
//            case "code":
//
//                setFocus();
//
//            break;
        }
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function editor_mousemove(cEl_layer) {
    try{
        //cdebug(cEl,true)();
        //var cEl_layer = window[cEl.layerId], cEl_page, cEl;
        //cdebug(cEl_layer.metrics.xy)();

        switch (cEl_layer.name) {
    //            case "preview":
    //            break;
    //            case "tools":
    //            break;
            case "fabric":
                //cdebug("editor_mousemove state " + cEl_layer.data.state)();
                switch (cEl_layer.data.state) {
                    case "editmove":

                        cEl_editActiveCp(cEl_layer);
                        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
                    break;
                    case "editlimbo":
                        cEl_layer.shape.redraw = true;
                        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
                    break;
                    case "editmaker":
                        cEl_layer.data.state = "editmaker";
                        addDrawShape(cEl_layer,false);
                    break;
                }
                //cdebugObj(showProps(cEl_layer));
                break;
    //            case "code":
    //                if(arrActEl.length > 2){
    //                    hover();
    //                };
    //            break;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_mouseup(cEl_layer) {
    
    try{
        //var cEl_layer = window[cEl.layerId];

        switch (cEl_layer.name) {
            case "fabric":
                
                cdebug("editor_mouseup START state " + cEl_layer.data.state)();
                switch (cEl_layer.data.state) {
                    case "editmove":
                        //var cEl_page = window[cEl_layer.pageId];
                        var cEl = window[cEl_layer.data.editIndex];

                        if(cEl.shape.temp.activeCp){
                            
                            cEl_setActiveCp(cEl_layer);
                            //cEl_editActiveCp(cEl_layer);
                            //cEl_setCpXY(cEl.shape.temp.activeCp,cEl_layer.metrics.xy);
                            cEl_layer.data.state = "editlimbo";
                            
                        }else{
                            cEl_layer.data.state = "edit";
                            cEl_setCpCursor(cEl_layer,true);
                            
                            //cEl_layer.style.redraw = true;
                            //redrawFabric(cEl_layer, cEl, cEl_layer.data.editIndex,true);
                            
//                            var e = $.Event('mousemove');
//                            e.pageX = 11;
//                            e.pageY = 12;
//                            e.target = document.getElementById(cEl_layer.name + "_canvas");
//                            window.dispatchEvent(e);
                        }
                        cEl_layer.shape.redraw = true;
                        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
                    break;
                    case "editlimbo":
                        //cEl_layer.data.state = "edit";

                    break;
                    case "editmaker":
                        
                        addDrawShape(cEl_layer,true);
                        
                        var masspoint = [0.5,0.5];
                        var reduction = 1;
                        var delta = 0.02;
                        
                        if(makeElPairs(cEl_layer,masspoint,reduction,delta)){
                            cEl_layer.data.state = "edit";
                        }else{
                           cEl_layer.data.state = "pre";
                        }
                        cEl_layer.data.temp.drawPoints = null;
                        cEl_layer.shape.redraw = true;
                    break;
                }
                cdebug("editor_mouseup END state " + cEl_layer.data.state)();
            break;
        }
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_hover(cEl_layer) {

    try{
    //cdebug("editor_hover")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }

}


function editor_mouseout(cEl_layer) {

    try{
    //cdebug("editor_hover")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }

}

function get_cEl_properties(cEl,property){
    
    try{
        if(!cEl)return "ZZZZ";
        switch (property) {
            case "group":
                //return JSON.stringify(cEl.shape,['id','type','scale','masspoint','detection','rotation']);
                return JSON.stringify(cEl.shape);
            break;
            case "general":
                return JSON.stringify(cEl,['id','parentName','class','tag','visible','active','enabled']);
            break;
            default:
                return "zzzz";
            break;
        }
        
    //cdebug("editor_hover")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function addDrawShape(cEl_layer, boolFinalise) {
    
    try{
        
        // TODO hmmm, move this to autoGLOBAL_renderering when drawing the canvas editor ( like the grid thingy )
        var eventholder = window["eventholder"];
        
        if (!cEl_layer.data.temp || !cEl_layer.data.temp.drawPoints) {
            cEl_layer.data.temp.drawPoints = [];
        }
        if (!cEl_layer.data.temp.drawPoints[0]) {
            cEl_layer.data.temp.drawPoints[0] = [eventholder.metrics.xy[0],eventholder.metrics.xy[1]];
        }
        var lastItem = cEl_layer.data.temp.drawPoints.length;
        var intLastPosX0, intLastPosY0;
        intLastPosX0 = cEl_layer.data.temp.drawPoints[lastItem - 1][0];
        intLastPosY0 = cEl_layer.data.temp.drawPoints[lastItem - 1][1];
        
        
        var cEl_ctx = document.getElementById(cEl_layer.pageId + "_" + cEl_layer.layerId + "_canvas").getContext('2d');
        cEl_ctx.beginPath();
        cEl_ctx.moveTo(intLastPosX0, intLastPosY0);
        if (boolFinalise) {
            cEl_ctx.lineTo(cEl_layer.data.temp.drawPoints[0][0], cEl_layer.data.temp.drawPoints[0][1]);
        } else {
            cEl_ctx.lineTo(eventholder.metrics.xy[0], eventholder.metrics.xy[1]);
            /// also add to the cEl_layer.data.temp.drawPoints array
            cEl_layer.data.temp.drawPoints.push(eventholder.metrics.xy);
        }

        cEl_ctx.closePath();
        cEl_ctx.strokeStyle = "rgba(150,150,150,0.7)";
        cEl_ctx.lineWidth = 1;
        cEl_ctx.stroke();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function makeElPairs(cEl_layer, masspoint ,reduction, delta) {

    // clear fabric canvas
    try{
        
        var arrAproxShape = createAprox(cEl_layer, reduction, delta, masspoint);
        
        
        if (arrAproxShape.length > 6) {
            
            // add shape to page shapes
            var shape_id = id_generator("sh", 8);
            var page = window[cEl_layer.pageId];
           
            // create new element 
            var cEl_id = id_generator("el", 8);
            var cEl_new = {
                "id":cEl_id,
                "layerId":cEl_layer.name,
                "pageId":page.name,
                "parentName":page.name + "_" + cEl_layer.name,
                "tab":22,
                "class":"btnBlue1",
                "tag":"group",
                "visible":true,"enabled":false,"focus":false,"hover":false,"active":false,
                "events":null,
                "loaded":false,
                "shape":{
                    "redraw":true,
                    "masspoint":masspoint,
                    "id":shape_id,
                    "type":"bezier",
                    "scale":[1,1],
                    "detection":"shape"
                },
                "data":{
                    "type":"button"
                }
            };
            
            var cEl_new_load = $.extend(true,{},cEl_new);
            
            if(cEl_layer.children){
                cEl_layer.children.push(cEl_new_load);
            }else{
                cEl_layer.children = [cEl_new_load];
            }
            
            cEl_layer.data.editIndex = page.name + "_" + cEl_layer.name + "_" + cEl_id;
            
            
            page.shapes[shape_id] = arrAproxShape;
            cdebug(arrAproxShape,true,true,0)();
            pre_load_children(cEl_new_load,cEl_layer.pageId,cEl_layer.name,cEl_layer.pageId + "_" +cEl_layer.name);
            
            if(loadedPageAct){
                loadedPageAct.shapes[shape_id] = arrAproxShape;
                var edit_layer = loadedPageAct.children[loadcanvas];
                cEl_new.enabled = true;
                edit_layer.children.push(cEl_new);
                pre_load_children(cEl_new,edit_layer.pageId,edit_layer.name,edit_layer.pageId + "_" +edit_layer.name);
                cEl_new_load.shape = cEl_new.shape;
                //cdebug(edit_layer.name)();
                
            }
            //cEl_layer.shape.redraw = true;
            //GLOBAL_renderer = true;
            
            
////      ctx.clearRect(0, 0, cEl_layer.cShape[3], cEl_layer.cShape[4]);
////      var ctxPreview = retCanvCtxById(preview.cCanvId);
////      ctxPreview.clearRect(0, 0, preview.cShape[3], preview.cShape[4]);
//        //var arrAproxShape2 = createAprox(cEl_layer,2,2);
//
//        var zoomMax, lambda, half, iterations, tick, bool2Way;
//        zoomMax = 1.5;
//        lambda = 3;
//        half = 10;
//        iterations = 10;
//        tick = 30;
//        bool2Way = true;
////
////      zoomAround(arrActEl[2],preview,zoomMax,lambda,half,iterations,tick,true);
//
//        //var ojCreatorCounter = preview.cChildren.length + 1;
//        var objName = id_generator("cObj_", 6);
//        window[objName + "_edit"] = new cElement(objName + "_edit", "hearts2", "shape", "", 2, arrAproxShape, false, null, true, 1, cEl_layer.cId, cEl_layer.cId, [], null, null, objName, true);
//        window[objName] = new cElement(objName, "hearts2", "shape", "background-color-edit-on:#aaaaaa;onmousemove:zoomAround('" + objName + "',preview," + zoomMax + "," + lambda + "," + half + "," + iterations + "," + tick + "," + bool2Way + ");", 2, arrAproxShape, true, null, true, 1, viewCanv.cId, viewCanv.cId, [], null, null, objName, true);
//
//        window[objName].cShapeObf = window[objName + "_edit"].cShapeObf;
//
//        localStorage.EditFocus = objName + "_edit";
//
//        //drawChildren(viewCanv);
//        //drawChildren(cEl_layer, true);
//        drawCP(window[objName + "_edit"]);
//
//        //saveMe();
//        resetMe();
//        cEl_layer.cValStore = [];
            return true;
        }
        return false;
    } catch (e) {
            var err = listError(e);
            cdebug(err,false,false,3)();
        return err;
    }

}

function createAprox (cEl_layer, reduction, delta, masspoint){
    try{
        if(!cEl_layer.data.temp)return [];
        if(!delta){delta = 1;}
        var deltaAct=0;
        var drawArrayIn = cEl_layer.data.temp.drawPoints;
        var drawLength = drawArrayIn.length;
        var actRed = Math.floor(reduction*6);
        if (actRed === 0){actRed = 1;} 
        var drawArrayOut = [];
        var last = drawLength - 6;
        var lastArrOut = -1;
        var boolCloseIt = false;
        var master = 0;

        for(var i = 0; i < drawLength; i++){
            if(i%reduction===0){
                if(master===6){master = 0;};

                if(i > last){
                    boolCloseIt = true;
                }

                // add elements only if aprox distance is greater then delta
                if(lastArrOut > 0 && boolCloseIt===false){
                    deltaAct = lineDelta(drawArrayOut[lastArrOut],[drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
                    if( deltaAct >= delta){
                        drawArrayOut.push([drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
                        lastArrOut++;
                        master++;
                    }
                }else{
                    if (master === 0 && boolCloseIt){
                        break;
                    }else{
                        drawArrayOut.push([drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
                        lastArrOut++;
                        master++;
                    }
                }    
            }
        }
        return drawArrayOut;
        } catch (e) {
            var err = listError(e);
            cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_editIndex(cEl_caller, boolNext, boolParent) {
    
    try {
        var boolReset = false;
        
        cEl_caller = window["editorPage_fabric"];
        
        if(!cEl_caller.data.editIndex && cEl_caller.children){
            boolReset = true;
            
            if(boolParent){
                cEl_caller.data.editIndex = cEl_caller.children[0].parentName + "_" + cEl_caller.children[0].name;
            }else{
                if(boolNext){
                    cEl_caller.data.editIndex = cEl_caller.children[0].parentName + "_" + cEl_caller.children[0].name;
                }else{
                    cEl_caller.data.editIndex = cEl_caller.children[cEl_caller.children.length-1].parentName + "_" + cEl_caller.children[cEl_caller.children.length-1].name;
                }
            }

        }else if(cEl_caller.data.editIndex){
            var cEl_actualIndex = window[cEl_caller.data.editIndex];
            
            if(boolParent){
                if(!boolNext){
                    if(window[cEl_actualIndex.parentName].tag!=="canvas"){
                        cEl_caller.data.editIndex = cEl_actualIndex.parentName;
                        boolReset = true;
                    }
                }else{
                    if(cEl_actualIndex.children){
                        cEl_caller.data.editIndex = cEl_actualIndex.children[0].parentName + "_" + cEl_actualIndex.children[0].name;
                        boolReset = true;
                    }
                }
            
            }else{
                

                var cEl_lookInto = window[cEl_actualIndex.parentName];

                //cdebug("here look into  " + cEl_lookInto.name)();
                //cdebug("...of           " + cEl_caller.data.editIndex)();

                if(boolNext){
                    for(var i = 0;i<cEl_lookInto.children.length-1;i++){
                        if(cEl_caller.data.editIndex === cEl_lookInto.children[i].parentName + "_" + cEl_lookInto.children[i].name){
                            cEl_caller.data.editIndex = cEl_lookInto.children[i+1].parentName + "_" + cEl_lookInto.children[i+1].name;
                            boolReset = true;
                            break;
                        }
                    }
                }else{
                    for(var i = cEl_lookInto.children.length-1;i>0;i--){
                        if(cEl_caller.data.editIndex === cEl_lookInto.children[i].parentName + "_" + cEl_lookInto.children[i].name){
                            cEl_caller.data.editIndex = cEl_lookInto.children[i-1].parentName + "_" + cEl_lookInto.children[i-1].name;
                            boolReset = true;
                            break;
                        }
                    }
                }
            }
            //cdebug("... set to           " + cEl_caller.data.editIndex)();
        }
        if(boolReset){
            cEl_caller.shape.redraw = true;
            window["editorPage_control"].shape.redraw = true;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

//function cEl_editIndexParent(cEl_caller, boolParent) {
//    
//    try {
//        var boolReset = false;
//        if(!cEl_caller.data.editIndex && cEl_caller.children){
//            boolReset = true;
//            cEl_caller.data.editIndex = cEl_caller.children[0].parentName + "_" + cEl_caller.children[0].name;
//
//        }else if(cEl_caller.data.editIndex){
//            
//            var cEl_actualIndex = window[cEl_caller.data.editIndex];
//            
//            if(boolParent){
//                if(window[cEl_actualIndex.parentName].tag!=="canvas"){
//                    cEl_caller.data.editIndex = cEl_actualIndex.parentName;
//                    boolReset = true;
//                }
//            }else{
//                if(cEl_actualIndex.children){
//                    cEl_caller.data.editIndex = cEl_actualIndex.children[0].parentName + "_" + cEl_actualIndex.children[0].name;
//                    boolReset = true;
//                }
//            }
//        }
//        if(boolReset){
//            cEl_caller.shape.redraw = true;
//            window["editorPage_control"].shape.redraw = true;
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

function undoLastCpEdit(cEl_caller, increment, boolResetActiveCp) {
    
    try {

        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
        if(cEl_layer.children.length===0)return false;
        cEl_setCpCursor(cEl_layer,true);
        cEl_restoreRefPoints(cEl_layer, increment,boolResetActiveCp);
        cEl_layer.shape.redraw = true;
        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
        return true;
        
    } catch (e){
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function keyAdjustments(cEl_caller, increment){
    try{
        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
        var cEl = window[cEl_layer.data.editIndex];
        var eventholder = window["eventholder"];
        var xy = cEl_getCpXY(cEl.shape.temp.activeCp);
        xy[increment[0]] = xy[increment[0]] + increment[1];
        eventholder.metrics.xy = [xy[0],xy[1]];
        
        cEl_setCpXY(cEl.shape.temp.activeCp, xy);
        
        cEl_editActiveCp(cEl_layer);
        
        cEl.shape.redraw = true;
        cEl_layer.shape.redraw = true;
        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return false;
    }
}

function cEl_setCpCursor(cEl_caller, boolReset) {
    
    try{
        
        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
        //if(cEl_layer.children.length===0 || cEl_layer.data.editIndex<0)return false;
        if(boolReset){
            cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"default"});
            cEl_layer.style.redraw = true;
            if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
            return true;
        }
        
        var activeCp = window[cEl_layer.data.editIndex].shape.temp.activeCp;
        switch (activeCp.value[2]) {
            case 0:
            case 1:
            case 2:
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"crosshair"});
                cEl_layer.style.redraw = true;
            break;
            case 3:
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"move"});
                cEl_layer.style.redraw = true;
            break;
            case 4:
                //actCanv.style.calc["cursor"] = "all-scroll";
                switch (activeCp.value[5]) {
                    case 0:
                    case 2:
                        cEl_layer.style.calc["cursor"] = "nw-resize";
                        cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"nw-resize"});
                        cEl_layer.style.redraw = true;
                    break;
                    case 1:
                    case 3:
                        cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"ne-resize"});
                        cEl_layer.style.redraw = true;
                    break;
                }
            break;
            case 5:
                switch (activeCp.value[5]) {

                    case 0:
                    case 2:
                        cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"row-resize"});
                        cEl_layer.style.redraw = true;
                    break;
                    case 1:
                    case 3:
                        cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"col-resize"});
                        cEl_layer.style.redraw = true;
                    break;
                }
            break;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_storeRefPoints(cEl_layer, boolFirst){
    
    try{
        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
        if(boolFirst){
            
            /// TODO  buggy here the first time Editor is drawn upon
            if(get_undo_rf_position(cEl_layer.data.temp.rf, cEl_layer.data.editIndex, 0)>-1){
                
                return true;
            }
        }
        var cEl = window[cEl_layer.data.editIndex];
        
        var actCEl = {};
        actCEl.editIndex = cEl_layer.data.editIndex;
        actCEl.undo = true;
        actCEl.shape = $.extend(true,{},cEl.shape);

        cEl_layer.data.temp.rf.push(actCEl);
        cEl.shape.temp.activeCp = null;
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_restoreRefPoints(cEl_layer,increment, boolResetActiveCp){
    
    try{
        //cEl.shape.temp.cpBorder = [ cEl.shape.temp.cpBorderInit[0], cEl.shape.temp.cpBorderInit[1], cEl.shape.temp.cpBorderInit[2],cEl.shape.temp.cpBorderInit[3]];
        //cdebug(actCanv);
        if(cEl_layer.data.temp.rf && cEl_layer.data.temp.rf.length>0){
            
            var oldCelPos = get_undo_rf_position(cEl_layer.data.temp.rf,cEl_layer.data.editIndex,increment);
            if(oldCelPos>-1){
            
                var oldCEl = cEl_layer.data.temp.rf[oldCelPos];
                var newCEl = window[oldCEl.editIndex];
                newCEl.shape = $.extend(true,newCEl.shape,oldCEl.shape);
                reset_shape_stuff(newCEl,false,true,true);
                if(boolResetActiveCp)newCEl.shape.temp.activeCp = null;
                return true;
            }
            
        }
        return false;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function get_undo_rf_position(rf, editIndex, increment, boolDebug, boolObject){
    
    try{
        
        var retIndex = -1;
        if(!rf)return retIndex;
        
        switch (true) {
            case (increment === 0):
                for(var len = rf.length, i = len - 1; i > -1; i--){
                    if(rf[i].editIndex === editIndex && rf[i].undo){ 
                        retIndex = i;
                        break;
                    }
                }
            break;
            case (increment > 0):
                for(var i = 0, len = rf.length; i < len; i++){
                    if(rf[i].editIndex === editIndex ){
                        if(!rf[i].undo){
                            increment--;
                            rf[i].undo = true;
                            if(increment===0){
                                retIndex = i;
                                break;
                            }else{
                                retIndex = i;
                            }
                        }else{
                            retIndex = i;
                        }
                    }
                }
            break;
            case increment < 0:
                for(var len = rf.length - 1, i = len; i >-1; i--){
                    if(rf[i].editIndex === editIndex ){
                        if(rf[i].undo){
                            rf[i].undo = false;
                            if(increment===0){
                                retIndex = i;
                                break;
                            }else{
                                retIndex = i;
                            }
                            increment++;
                            
                        }else{
                            retIndex = i;
                        }
                    }
                }
                if(retIndex > -1)rf[retIndex].undo = true;
                
            break;
        }
        if(boolDebug)return rf;
        if(boolObject)return rf[i];
        return retIndex;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function saveLastCpEdit(cEl_caller,state,boolReset){
    
    try {
        //var cEl_page = window["editorPage"];
        var cEl_layer = cEl_caller ;//window[cEl_caller.pageId + "_fabric"];
        
        
        cEl_layer.data.state = state;
        cEl_storeRefPoints(cEl_layer);
        if(boolReset){
            cEl_layer.data.editIndex = null;
        }
        cEl_setCpCursor(cEl_layer,true);
        cEl_layer.shape.redraw = true;
        
        return true;
        
    } catch (e){
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_drawCp(shape,cEl_ctx){
    
    try{
        var cEl_canv = cEl_ctx.canvas;
        //var cEl_ctx = cEl_canv.getContext('2d');
        var offsetCorner = 10;

        // draw cEl border
        //cdebug(cEl.shape.temp.cpBorder);
        cEl_ctx.beginPath();
        cEl_ctx.lineWidth = 1;
        
        cEl_ctx.strokeStyle = "rgba(110,110,110,1)";
        cEl_ctx.rect(shape.temp.cpBorder.x,shape.temp.cpBorder.y,shape.temp.cpBorder.x1-shape.temp.cpBorder.x,shape.temp.cpBorder.y1-shape.temp.cpBorder.y);
        // draw corners points
        cEl_ctx.moveTo(shape.temp.cpBorder.x,shape.temp.cpBorder.y + offsetCorner );
        cEl_ctx.lineTo(shape.temp.cpBorder.x + offsetCorner,shape.temp.cpBorder.y);
        cEl_ctx.moveTo(shape.temp.cpBorder.x1,shape.temp.cpBorder.y + offsetCorner );
        cEl_ctx.lineTo(shape.temp.cpBorder.x1 - offsetCorner,shape.temp.cpBorder.y);
        cEl_ctx.moveTo(shape.temp.cpBorder.x1,shape.temp.cpBorder.y1 - offsetCorner );
        cEl_ctx.lineTo(shape.temp.cpBorder.x1 - offsetCorner,shape.temp.cpBorder.y1);
        cEl_ctx.moveTo(shape.temp.cpBorder.x,shape.temp.cpBorder.y1 - offsetCorner );
        cEl_ctx.lineTo(shape.temp.cpBorder.x + offsetCorner,shape.temp.cpBorder.y1);
        cEl_ctx.stroke();
        //cEl_ctx.closePath();
        
        // draw mass point
        cEl_ctx.beginPath();
        cEl_ctx.fillStyle = "rgba(255,0,0,1)";
        cEl_ctx.rect(shape.temp.cpMp[0]-2,shape.temp.cpMp[1]-2,4,4);
        cEl_ctx.fill();
        //cEl_ctx.closePath();
        cEl_ctx.beginPath();
        if(shape.temp.activeCp){
            switch(shape.temp.activeCp.tag){
                case "corner": // is corner
                    
                    cEl_ctx.lineWidth = 1;
                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
                    cEl_ctx.moveTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
                    cEl_ctx.lineTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1] + offsetCorner * shape.temp.activeCp.value[4]);
                    cEl_ctx.lineTo(shape.temp.activeCp.value[0] + offsetCorner * shape.temp.activeCp.value[3],shape.temp.activeCp.value[1]);
                    //cEl_ctx.lineTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
                    cEl_ctx.closePath();
                    cEl_ctx.stroke();
                    
                    
                break;
                case "border": // is border
                     
                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
                    cEl_ctx.beginPath();
                    cEl_ctx.moveTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
                    cEl_ctx.lineTo(shape.temp.activeCp.value[3],shape.temp.activeCp.value[4]);
                    cEl_ctx.closePath();
                    cEl_ctx.stroke();
                    
                break;
                case "masspoint": // draw mass point
                    
                    cEl_ctx.beginPath();
                    cEl_ctx.lineWidth = 3;
                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
                    cEl_ctx.rect(shape.temp.cpMp[0]-2,shape.temp.cpMp[1]-2,4,4);
                    cEl_ctx.closePath();
                    cEl_ctx.stroke();
                    
                break;
            }
            
        }
        cEl_drawCp_Points(shape,cEl_ctx);
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
};

function cEl_drawCp_Points(shape,cEl_ctx){
    
    try{
        var pointsLen = shape.temp.cp.length, boolIsCp;
        for(var i = 0; i < pointsLen; i++){
            boolIsCp = false;
            switch(shape.temp.cp[i][2]){
                case 0:// Poligon Shape Lines
                    cEl_ctx.fillStyle = "rgba(0,0,0,1)";
                    cEl_ctx.strokeStyle = "rgba(0,0,0,1)";                  
                break;
                case 1:// Quadratic Shape Lines
                    cEl_ctx.fillStyle = "rgba(0,0,255,1)";
                    cEl_ctx.strokeStyle = "rgba(0,0,255,1)";
                break;
                case 2:// Beziere Shape Lines
                    cEl_ctx.fillStyle = "rgba(0,255,255,1)";
                    cEl_ctx.strokeStyle = "rgba(0,255,255,1)";
                break;
            }
            cEl_ctx.beginPath();
            if(shape.temp.activeCp && shape.temp.activeCp.tag === "controlpoint" && shape.temp.activeCp.value[3]===i){
                cEl_ctx.rect(shape.temp.activeCp.value[0]-2,shape.temp.activeCp.value[1]-2,4,4);
                cEl_ctx.lineWidth = 3;
                cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
                cEl_ctx.closePath();
                cEl_ctx.stroke();
            }else{
                cEl_ctx.beginPath();
                cEl_ctx.rect(shape.temp.cp[i][0]-2,shape.temp.cp[i][1]-2,4,4);
                cEl_ctx.closePath();
                cEl_ctx.fill();
            }
 
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function draw_pointXY(cEl, cEl_layer, cEl_ctx){
    try{

        if(cEl.shape.temp.activeCp){
            var eventholder = window["eventholder"];
            cEl_ctx.lineWidth = 1;
            cEl_ctx.setLineDash([3,3]);
            
            cEl_ctx.strokeStyle = "rgba(200,200,200,1)";
            draw_pointXY_path1(cEl_ctx,cEl.shape.temp.activeCp.xy,cEl_layer.shape.w,cEl_layer.shape.h);
            
            cEl_ctx.strokeStyle = "rgba(0,255,0,1)";
            draw_pointXY_path1(cEl_ctx,eventholder.metrics.xy,cEl_layer.shape.w,cEl_layer.shape.h);

            
            cEl_ctx.setLineDash([]);
        }

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function draw_pointXY_path1(cEl_ctx,xy,w,h){
    try{
        
        cEl_ctx.beginPath();
        cEl_ctx.moveTo(0,xy[1]+0.5);
        cEl_ctx.lineTo(w,xy[1]+0.5);
        cEl_ctx.moveTo(xy[0]+0.5,0);
        cEl_ctx.lineTo(xy[0]+0.5,h);
        cEl_ctx.stroke();
        cEl_ctx.closePath();
            
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}
function draw_pointXY_square(cEl_ctx,xy,w,h){
    try{
        //cEl_ctx.fillStyle = "rgba(0,255,0,1)";
        //cEl_ctx.fillRect(xy[0],xy[1],w,h);
        cEl_ctx.lineWidth = 1;
        cEl_ctx.strokeRect(xy[0],xy[1],w,h);
            
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_setCpXY(activeCp,xy) {
    try{
        activeCp.xy = [xy[0],xy[1]];
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_getCpXY(activeCp){
    try{
        if(activeCp.xy){
            return [activeCp.xy[0],activeCp.xy[1]];
        }else{
            return [0,0];
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function save_changes(cEl_caller){
    
    try {
//        var rule = {'unfolded':'folded','unfoldedfull':'unfolded'};
//        var cEl_parent = window[cEl_caller.parentName];
//        if(rule[cEl_parent.state])cEl_parent.state = rule[cEl_parent.state];
        
        
        var cEl_layer = window[cEl_caller.pageId + "_" + cEl_caller.layerId];
        cEl_layer.shape.redraw = true;
        return true;
        
    } catch (e){
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_editActiveCp(cEl_caller){
    
    try{
        
        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
        var cEl = window[cEl_layer.data.editIndex];
        
        if(cEl.shape.temp.activeCp){
            var editIndex = cEl_layer.data.editIndex;
            var eventholder = window["eventholder"];
            var xy = eventholder.metrics.xy;
            var scaleCP = [1,1];
            scaleCP[0] = cEl_layer.shape.w * cEl.shape.scale[0];
            scaleCP[1] = cEl_layer.shape.h * cEl.shape.scale[1];
            
            //cdebug(xy);
            
            switch(cEl.shape.temp.activeCp.tag){
                // shape control points
                case "controlpoint":
                    
                    cEl_editActiveCp_SCP(cEl_layer, cEl, editIndex, xy);

                break;
                // masspoint control point
                case "masspoint":

                    cEl_editActiveCp_MP(cEl_layer, cEl, editIndex, xy);

                break;
                // border and corners control points 
                case "border":
                case "corner":
                    
                    var boolTop = false, boolRight = false, boolBottom = false, boolLeft =false;

                    switch(cEl.shape.temp.activeCp.value[5]){
                        // border top - corner leftTop
                        case 0:
                            if(cEl.shape.temp.activeCp.value[2]===4)boolLeft = true;
                            boolTop = true;
                        break;
                        // border right - corner topRight
                        case 1:
                            if(cEl.shape.temp.activeCp.value[2]===4)boolTop = true;
                            boolRight = true;
                        break;
                        // border bottom - corner rightBottom
                        case 2:
                            if(cEl.shape.temp.activeCp.value[2]===4)boolRight = true;
                            boolBottom = true;
                        break;
                        // border left - corner bottomLeft
                        case 3:
                            if(cEl.shape.temp.activeCp.value[2]===4)boolBottom = true;
                            boolLeft = true;
                        break;

                    }
                    
                    var rfObj = get_undo_rf_position(cEl_layer.data.temp.rf, editIndex, 0, false, true);
                    //cdebug(rfObj);
                    var mpYcp = cEl_layer.shape.h * rfObj.shape.masspoint[1];
                    var mpXcp = cEl_layer.shape.w * rfObj.shape.masspoint[0];
                    
                    // reset all shape points to match the new position
                    for( var i=0, len = cEl.shape.points.length,yFactor,xFactor; i < len; i++){
                        yFactor = (boolTop || boolBottom) ?(scaleCP[1]*rfObj.shape.points[i][1] + mpYcp - rfObj.shape.temp.cpBorder.y)/(rfObj.shape.temp.cpBorder.y1-rfObj.shape.temp.cpBorder.y):0;
                        xFactor = (boolRight || boolLeft) ?(scaleCP[0]*rfObj.shape.points[i][0] + mpXcp - rfObj.shape.temp.cpBorder.x1)/(rfObj.shape.temp.cpBorder.x-rfObj.shape.temp.cpBorder.x1):0;
                        if(boolTop){
                            cEl.shape.points[i][1] = (yFactor * rfObj.shape.temp.cpBorder.y1  + xy[1] * (1 - yFactor) - mpYcp)/scaleCP[1];
                        }
                        if(boolBottom){
                            cEl.shape.points[i][1] = (yFactor * xy[1] + rfObj.shape.temp.cpBorder.y * (1 - yFactor) - mpYcp)/scaleCP[1];
                        }
                        if(boolRight){
                            cEl.shape.points[i][0] = (xFactor * rfObj.shape.temp.cpBorder.x  + xy[0] * (1 - xFactor) - mpXcp)/scaleCP[0];
                        }
                        if(boolLeft){
                            cEl.shape.points[i][0] = (xFactor * xy[0] + rfObj.shape.temp.cpBorder.x1 * (1 - xFactor) - mpXcp)/scaleCP[0];
                        }
                    }
                    if(boolRight || boolLeft || boolTop || boolBottom){
                        reset_shape_stuff(cEl,false,true,true);
                    }

                break;

            }
            
            cEl.shape.redraw = true;
            cEl_layer.shape.redraw = true;
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

function cEl_editActiveCp_SCP(cEl_layer, cEl, editIndex, xy){
    
    try{
        var scaleCP = [1,1];
        scaleCP[0] = cEl_layer.shape.w * cEl.shape.scale[0];
        scaleCP[1] = cEl_layer.shape.h * cEl.shape.scale[1];
        cEl.shape.points[cEl.shape.temp.activeCp.value[3]] = [(xy[0] - cEl.shape.temp.cpMp[0])/scaleCP[0],(xy[1] - cEl.shape.temp.cpMp[1])/scaleCP[1]];
        
        reset_shape_stuff(cEl,false,true,true);

        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function cEl_editActiveCp_MP(cEl_layer, cEl, editIndex, xy){
    
    try{
        
        //cdebug(cEl.shape,true,true);
        
        // reset masspoint
        cEl.shape.masspoint = cEl_edit_MP(cEl_layer,xy,[1,1]);//[xy[0]/cEl_layer.shape.w,xy[1]/cEl_layer.shape.h];
        //cEl_layer.shape.scale[0]*  cEl_layer.shape.scale[1]*
        //cdebug(cEl.shape,false,true);
        // reset children relative masspoints
        if (cEl.children){
            for (var i = cEl.children.length - 1, ofssetXY; i >= 0; i--) {
                ofssetXY = [cEl.shape.temp.cpMp[0]-cEl.children[i].shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]-cEl.children[i].shape.temp.cpMp[1]];
                cEl_editActiveCp_MP(cEl_layer, cEl.children[i], editIndex, [xy[0]-ofssetXY[0],xy[1]-ofssetXY[1]]);
                //cEl.children[i].shape.redraw = true;
            }
        }
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_edit_MP(cEl_parent,xy,scale){
    
    try{
        // reset masspoint
        return [scale[0]*xy[0]/cEl_parent.shape.w,scale[1]*xy[1]/cEl_parent.shape.h];
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function cEl_setActiveCp(cEl_caller){
    
    try{
        
        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
        var cEl = window[cEl_layer.data.editIndex];
        var eventholder = window["eventholder"];
        var xy = eventholder.metrics.xy;
        
        var deltaCP = 6;
        var deltaMP = 7;
        var deltaBL = 8;
        var deltaBC = 7;
        cEl.shape.temp.activeCp = null;
        
        // set as massPoint
        if(Math.abs(cEl.shape.temp.cpMp[0]-xy[0])<=deltaMP && Math.abs(cEl.shape.temp.cpMp[1]-xy[1])<=deltaMP){
            cEl.shape.temp.activeCp = {"type":"mp","tag":"masspoint","value":cEl.shape.temp.cpMp,"xy":[cEl.shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]]};
            //cEl.shape.temp.activeCp = cEl.shape.temp.cpMp;
            return true;
        }

        // set as shape point
        for(var i = 0, pointsLen = cEl.shape.temp.cp.length; i < pointsLen; i++){
            if(Math.abs(cEl.shape.temp.cp[i][0]-xy[0])<=deltaCP && Math.abs(cEl.shape.temp.cp[i][1]-xy[1])<=deltaCP){
                cEl.shape.temp.activeCp = {"type":"scp","tag":"controlpoint","value":cEl.shape.temp.cp[i],"xy":[cEl.shape.temp.cp[i][0],cEl.shape.temp.cp[i][1]]};
                //cEl.shape.temp.activeCp = cEl.shape.temp.cp[i];
                return true;
            }
        }
        
        // set as borderPoints --- sides or corners
        var cpBorder = cEl.shape.temp.cpBorder;
        // corner top left
        if(Math.abs(cpBorder.x-xy[0])<=deltaBL && Math.abs(cpBorder.y-xy[1])<=deltaBL){
            cEl.shape.temp.activeCp = {"type":"tl","tag":"corner","value":[cpBorder.x,cpBorder.y,4,1,1,0],"xy":[cpBorder.x,cpBorder.y]};
            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y,4,1,1,0];
            return true;
        }
        // corner top right
        if(Math.abs(cpBorder.x1-xy[0])<=deltaBL && Math.abs(cpBorder.y-xy[1])<=deltaBL){
            cEl.shape.temp.activeCp = {"type":"tr","tag":"corner","value":[cpBorder.x1,cpBorder.y,4,-1,1,1],"xy":[cpBorder.x1,cpBorder.y]};
            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y,4,-1,1,1];
            return true;
        }
        // corner bottom right
        if(Math.abs(cpBorder.x1-xy[0])<=deltaBL && Math.abs(cpBorder.y1-xy[1])<=deltaBL){
            cEl.shape.temp.activeCp = {"type":"br","tag":"corner","value":[cpBorder.x1,cpBorder.y1,4,-1,-1,2],"xy":[cpBorder.x1,cpBorder.y1]};
            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y1,4,-1,-1,2];
            return true;
        }
        // corner bottom left
        if(Math.abs(cpBorder.x-xy[0])<=deltaBL && Math.abs(cpBorder.y1-xy[1])<=deltaBL){
            cEl.shape.temp.activeCp = {"type":"bl","tag":"corner","value":[cpBorder.x,cpBorder.y1,4,1,-1,3],"xy":[cpBorder.x,cpBorder.y1]};
            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y1,4,1,-1,3];
            return true;
        }
        

        // set as border lines
        //border top
        if(cpBorder.x1-xy[0]>=deltaBC && cpBorder.x-xy[0]<=deltaBC && Math.abs(cpBorder.y-xy[1])<=deltaBC){
            cEl.shape.temp.activeCp = {"type":"t","tag":"border","value":[cpBorder.x,cpBorder.y,5,cpBorder.x1,cpBorder.y,0],"xy":[cpBorder.x,cpBorder.y]};
            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y,5,cpBorder.x1,cpBorder.y,0];
            return true;
        }
        //border right
        if(cpBorder.y-xy[1]<=deltaBC && cpBorder.y1-xy[1]>=deltaBC && Math.abs(cpBorder.x1-xy[0])<=deltaBC){
            cEl.shape.temp.activeCp = {"type":"r","tag":"border","value":[cpBorder.x1,cpBorder.y,5,cpBorder.x1,cpBorder.y1,1],"xy":[cpBorder.x1,cpBorder.y]};
            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y,5,cpBorder.x1,cpBorder.y1,1];
            return true;
        }
        //border bottom
        if(cpBorder.x1-xy[0]>=deltaBC && cpBorder.x-xy[0]<=deltaBC && Math.abs(cpBorder.y1-xy[1])<=deltaBC){
            cEl.shape.temp.activeCp = {"type":"b","tag":"border","value":[cpBorder.x1,cpBorder.y1,5,cpBorder.x,cpBorder.y1,2],"xy":[cpBorder.x1,cpBorder.y1]};
            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y1,5,cpBorder.x,cpBorder.y1,2];
            return true;
        }
        //border left
        if(cpBorder.y-xy[1]<=deltaBC && cpBorder.y1-xy[1]>=deltaBC && Math.abs(cpBorder.x-xy[0])<=deltaBC){
            cEl.shape.temp.activeCp = {"type":"l","tag":"border","value":[cpBorder.x,cpBorder.y1,5,cpBorder.x,cpBorder.y,3],"xy":[cpBorder.x,cpBorder.y1]};
            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y1,5,cpBorder.x,cpBorder.y,3];
            return true;
        }
        
        return false;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function drawGrid(cEl_canvas){
    
    try{
        var cEl_ctx = cEl_canvas.getContext('2d');
        var gridMin = 5;
        var gridMax = 10;
        
        cEl_ctx.strokeStyle = "rgba(0,0,0,1)";
        cEl_ctx.lineWidth = 1; 
        cEl_ctx.beginPath();
        
        for(var i = 0, len = cEl_canvas.width, height = cEl_canvas.height, perc = len/100, percPos = 0;i<100;i++){
            percPos = parseInt(i*perc)+0.5;
            if(i % 10){
                cEl_ctx.moveTo(percPos,0);
                cEl_ctx.lineTo(percPos,gridMin);
                cEl_ctx.moveTo(percPos,height);
                cEl_ctx.lineTo(percPos,height-gridMin);
                
            }else{
                cEl_ctx.moveTo(percPos,0);
                cEl_ctx.lineTo(percPos,gridMax);
                cEl_ctx.moveTo(percPos,height);
                cEl_ctx.lineTo(percPos,height-gridMax);
                if(i>0)cEl_ctx.fillText(i+"%",percPos,gridMin+10);
            }
        }
        for(var i = 0, len = cEl_canvas.height, width = cEl_canvas.width, perc = len/100, percPos = 0;i<100;i++){
            percPos = parseInt(i*perc)+0.5;
            if(i % 10){
                cEl_ctx.moveTo(0,percPos);
                cEl_ctx.lineTo(gridMin,percPos);
                cEl_ctx.moveTo(width,percPos);
                cEl_ctx.lineTo(width-gridMin,percPos);
                
            }else{
                cEl_ctx.moveTo(0,percPos);
                cEl_ctx.lineTo(gridMax,percPos);
                cEl_ctx.moveTo(width,percPos);
                cEl_ctx.lineTo(width-gridMax,percPos);
                if(i>0)cEl_ctx.fillText(i+"%",gridMax,percPos);
            }
        }

        cEl_ctx.closePath();
        cEl_ctx.stroke();

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}