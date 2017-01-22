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




function editor_hover(eventholder) {

    try{
    cdebug("editor_hover")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }

}


function editor_mouseout(eventholder) {

    try{
    cdebug("editor_mouseout")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }

}


function editor_keydown(eventholder) {

    try{
        
        switch (paper.data.workState) {
            case "editlimbo":
                
                if(!paper.data.workObject && !paper.data.workObjectHit )return false;
                var delta = {"x":0,"y":0,"rotation":0};
                var offset = 2;
                
                switch(eventholder.keys.key){
                    case "ArrowUp":
                        delta.y = -offset;
                        calcGroupScale(paper.data,delta);
                    break;
                    case "ArrowRight":
                        delta.x = offset;
                        calcGroupScale(paper.data,delta);
                    break;
                    case "ArrowDown":
                        delta.y = offset;
                        calcGroupScale(paper.data,delta);
                    break;
                    case "ArrowLeft":
                        delta.x = -offset;
                        calcGroupScale(paper.data,delta);
                    break;
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.keys.shiftKey);
                    break;    
                    default:
//                        cdebug(eventholder.keys)();
                    break;
                }
                
//                if(eventholder.keys.buttons ===1 ){
//                    calcGroupScale(paper.data,eventholder.metrics.delta);
//                }
                
            break;
            case "pre":
//                if(!paper.data.workObject && !paper.data.workObjectHit )return false;
                switch(eventholder.keys.key){
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.keys.shiftKey);
                    break;    
                    default:
                        cdebug(eventholder.keys)();
                    break;
                }
            break;
        }
        
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



function editor_keyup(eventholder) {

    try{


    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;;
    }
}




function editor_wheel(eventholder) {

    try{
        cdebug(eventholder.wheel.deltaY);
        
        switch (paper.data.workState) {
            case "editlimbo":
            case "pre":
                
                group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.wheel.deltaY>0);
            break;
        }
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_mousedown(eventholder) {

    try{
        
        //var cEl_page = window[cEl_layer.pageId];
        
        
        var cEl_layer = paper.project.activeLayer;
        if(!paper.data.workState){
            paper.data.workState = "pre";
        }
        paper.data.workLayer = cEl_layer;
       

//                cdebug("editor_mousedown START state " + cEl_project.data.state + " at index " + cEl_project.data.editIndex,true)();
        switch (paper.data.workState) {
            case "edit":
                //if(cEl_layer.data.editIndex<0){return false;}
                //var cEl = cEl_layer.children[cEl_layer.data.editIndex];
//                        cdebug(cEl.shape.temp.activeCp)();
//                        cdebug(cEl_layer.metrics.xy)();
//                        if(cEl_setActiveCp(cEl_project)){
//                            cEl_setCpCursor(cEl_project);
//                            cEl_project.data.state = "editmove";
//                            
//                            cEl_storeRefPoints(cEl_project, true);
//                            
//                            //cEl_setCpXY(cEl.shape.temp.activeCp, cEl_layer.metrics.xy);
//                            cEl_project.shape.redraw = true;
//                            if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
//                        };

                //GLOBAL_renderer = true;
            break;
            case "add":
//                        cdebug("here1")();

                paper.data.workObject = new paper.Path();
                paper.data.workObject.strokeColor = 'black';
                paper.data.workObject.fullySelected = true;



            break;
            case  "editlimbo" : // "editlimbo":
                
//                cdebug("here1   " + eventholder.actObj.name + " <<< >>> " + paper.data.workObject.parentName + "_" + paper.data.workObject.name)();
                
                //cEl_layer = paper.data.workLayer;
                var workObject_name = paper.data.workObject.parentName + "_" + paper.data.workObject.name;
                var actObj_name = eventholder.actObj.name;
                if(actObj_name.indexOf(workObject_name)===0){
                    
                    
                    
                    paper.data.workObjectHit = eventholder.actObj;

                    var bounds = paper.data.workObject.children[0].bounds;

                    paper.data.workObjectBounds = {
                        "x":bounds.x,
                        "y":bounds.y,
                        "width":bounds.width,
                        "height":bounds.height,
                        "top":bounds.top,
                        "right":bounds.right,
                        "bottom":bounds.bottom,
                        "left":bounds.left,
                        "topCenter":bounds.topCenter,
                        "rightCenter":bounds.rightCenter,
                        "bottomCenter":bounds.bottomCenter,
                        "leftCenter":bounds.leftCenter,
                        "topLeft":bounds.topLeft,
                        "topRight":bounds.topRight,
                        "bottomRight":bounds.bottomRight,
                        "bottomLeft":bounds.bottomLeft,
                        "sign":sign1(paper.data.workObject.children[0].matrix.a)
                    };

                    cEl_setCpCursor(cEl_layer,false,paper.data.workObjectHit.name);
                    
                    //cdebug(paper.data.workObject)();
                    eventholder.actObj.fillColor = "rgba(255,100,100,0.3)";
                    
                    
                    paper.data.workObject.children[0].applyMatrix = false;
                    //paper.data.workObject.children[1].applyMatrix = false;
                    eventholder.actObj.bringToFront();

                    paper.data.workState = "edit";

                }else{
                    paper.data.workObjectHit = null;
                    paper.data.workObjectBounds = null;
                }



//                        cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"text"});
//                        cEl_layer.reset.cursor = true;

//                        cEl_project.data.state = "editmove";
//                        cEl_editActiveCp(cEl_project);
//                        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}

            break;
            case "pre":

                //paper.project.activeLayer.selected = false;



                //eventholder.actObj.fullySelected = true;


                //cdebug(eventholder.actObj.className)();
                switch (eventholder.actObj.className) {

                    case "SymbolItem":
                    case "Path":
                        var cEl_group = eventholder.actObj.parent.parent;
                        if(cEl_group.tag !== "group")break;
                        
                        selectGroup(cEl_group);

                    break;
//                            case "Path":
//                                eventholder.actObj.parent.selected = true;
//                            break;
                    default:

                        cdebug(eventholder.actObj.className)();
                    break;
                }

                //


                //cEl_setCpCursor(cEl_layer);



                //cdebug("editor_mousedown END state " + paper.project.data.workLayer.name)();

//                        addDrawShape(cEl_project,false);
            break;
        }
                //cdebug("editor_mousedown END state " + paper.project.data.workLayer)();
                

        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function editor_mousemove(eventholder) {
    try{
        
        if(!paper.data.workObject && !paper.data.workObjectHit )return false;
        
        switch (paper.data.workState) {
            case "add":
                // add new shape points
                if(eventholder.keys.buttons === 1 ){
                    paper.data.workObject.add(eventholder.metrics.xy);
                }        
            break;
            case "editlimbo":
                // just change the cursor
                cEl_setCpCursor(paper.project.activeLayer,false,eventholder.actObj.name);    
            break;
            case "edit":
                // as default just move/scale up points
                if(eventholder.keys.buttons ===1 ){
                    switch (paper.data.workObjectHit.name) {
                        // move group
    //                    case paper.data.workObject.parentName + "_" + paper.data.workObject.name + ".ShapeG_Path":
    //                        
    //                        paper.data.workObject.translate(eventholder.metrics.delta);
    //                        
    //                    break;

                        default:

                            calcGroupScale(paper.data,eventholder.metrics.delta);
    //                        paper.data.workObject.translate(eventholder.metrics.delta);
                        break;
                    }

                }
            break;
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_mouseup(eventholder) {
    
    try{
        
        if(!paper.data.workObject && !paper.data.workObjectHit )return false;
        var cEl_layer = paper.project.activeLayer;

        switch (paper.data.workState) {
            case "edit":
                //if(cEl_layer.data.editIndex<0){return false;}
                //var cEl = cEl_layer.children[cEl_layer.data.editIndex];
//                        cdebug(cEl.shape.temp.activeCp)();
//                        cdebug(cEl_layer.metrics.xy)();
//                        if(cEl_setActiveCp(cEl_project)){
//                            cEl_setCpCursor(cEl_project);
//                            cEl_project.data.state = "editmove";
//                            
//                            cEl_storeRefPoints(cEl_project, true);
//                            
//                            //cEl_setCpXY(cEl.shape.temp.activeCp, cEl_layer.metrics.xy);
//                            cEl_project.shape.redraw = true;
//                            if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
//                        };

                //GLOBAL_renderer = true;

//                        cdebug(paper.data.workObject.children[0].matrix)();
//                        cdebug(paper.data.workObject.children[0].position)();
//                        cdebug(paper.data.editTool)();

                paper.data.workObject.children[0].applyMatrix = true;
                paper.data.workObject.reset.debug = true;

                paper.data.workState = "editlimbo";

            break;
            case "add":
//                        cdebug("here ADD")();
                if(paper.data.workObject.length===0)break;
                //paper.data.workObject.selected = false;
                paper.data.workObject.closed = true;
                paper.data.workObject.simplify();

                var newShapeName = id_generator("sh_",9);
                paper.data.shapes[newShapeName] = createAprox(cEl_layer,paper.data.workObject.segments,[0.5,0.5],5);
                paper.data.workObject.remove();

                var cEl = {
                    "elId":"defaultNew",
                    "tab":1,
                    "shape":{
                        "masspoint":[0.5,0.5],
                        "scale":[1,1],
                        "name":newShapeName,
                        "type":"bezier"
                    } 
                };
                cEl.name = id_generator("gr_",9);
                pre_load_children(cEl,cEl_layer.name);

                
                
                var cEl_group = cEl_layer.children[cEl_layer.children.length-1];
                selectGroup(cEl_group);

            break;
//            case  "editlimbo" :
//
//            break;
//            case "pre":
//                
//            break;
        }
        //cdebug("editor_mousedown END state " + paper.project.data.workLayer)();
        return true;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }
}



function calcGroupScale(data,delta){
    try{
        
        var scaleX=1,scaleY=1,scalePoint;
        
        var workObject = data.workObject;
//        var workObjectName = workObject.parentName + "_" + workObject.name;
        
        var hitObjType = data.workObjectHit.name.split(".")[1];
//        cdebug(hitObjName)();
                
        switch (hitObjType) {

            // scale left>right
            case "borderLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scalePoint = data.workObjectBounds.rightCenter;
            break;
            // scale right>left
            case "borderRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scalePoint = data.workObjectBounds.leftCenter;
            break;
            // scale top>bottom
            case "borderTop":

                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.bottomCenter;
            break;
            // scale bottom>top
            case "borderBottom":

                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.topCenter;
            break;

            // scale topLeft>bottomRight
            case "topLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.bottomRight;
            break;
            // scale topRight>bottomLeft
            case "topRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.bottomLeft;
            break;
            // scale bottomRight>topLeft
            case "bottomRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.topLeft;
            break;
            // scale bottomLeft>topRight
            case "bottomLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectBounds.width);
                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectBounds.height);
                scalePoint = data.workObjectBounds.topRight;
            break;
            // edit shape Point
            case "CP":
            case "CPin":
            case "CPout":
            case "CPLin":
            case "CPLout":
                
                editCP(data,workObject,delta,hitObjType);
                data.editTool = "edit" + hitObjType;
                
                return true;
            break;
            
            default:
                var workObjectName = workObject.parentName + "_" + workObject.name;
                var hitObjName = data.workObjectHit.name;
                if(hitObjName.indexOf(workObjectName)===0){
                    workObject.translate(delta);
                    data.editTool = "move";
                }
                return true;
            break;
        }
        data.editTool = "scale";
        setGroupScale(workObject,scaleX,scaleY,scalePoint);
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function editCP(data,workObject,delta,typeCP){
    try{
        
        var segmentPoint;
        switch (typeCP) {
            case "CP":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].point;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
            break;
            case "CPin":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleIn;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
            break;    
            case "CPout":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleOut;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
            break;
            case "CPLout":
                
                var delta2 = delta.clone();
                delta2.angle += 90;
                
                cdebug(delta2)();
//                var point = event.middlePoint + delta;
                
//                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleOut;
//                segmentPoint.x += delta.x;
//                segmentPoint.y += delta.y;
            break;
            
            


        
        
        }
        
        
        if (workObject.data.type === "text"){
            if(workObject.data.values.pattern === "path"){
                switch (typeCP) {
                    case "CP":
                        segmentPoint = workObject.children[1].children[0].segments[data.workObjectHit.cp].point;
                        segmentPoint.x += delta.x;
                        segmentPoint.y += delta.y;
                    break;
                    case "CPin":
                        segmentPoint = workObject.children[1].children[0].segments[data.workObjectHit.cp].handleIn;
                        segmentPoint.x += delta.x;
                        segmentPoint.y += delta.y;
                    break;    
                    case "CPout":
                        segmentPoint = workObject.children[1].children[0].segments[data.workObjectHit.cp].handleOut;
                        segmentPoint.x += delta.x;
                        segmentPoint.y += delta.y;
                    break;    
                }
                
            }else{
                workObject.reset.text_shape = true;

            }
        }
                
        workObject.reset.debug = true;
        workObject.reset.text_draw = true;
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function setGroupScale(workObject,scaleX,scaleY,scalePoint){
    try{
        
        workObject.children[0].scale(scaleX,scaleY, scalePoint);
        workObject.children[4].scale(scaleX,scaleY, scalePoint);
        
        if (workObject.data.type === "text"){
            if(workObject.data.values.pattern === "path"){
                workObject.children[1].scale(scaleX,scaleY, scalePoint);
                
            }else{
                workObject.reset.text_shape = true;
            }
        }
//        workObject.reset.debug = true;
        workObject.reset.text_draw = true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


//cdebug(sign1(-0))();



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

function cEl_setCpCursor(cEl_layer, cursor, hitObjName) {
    
    try{
        
        //if(cEl_layer.children.length===0 || cEl_layer.data.editIndex<0)return false;
        if(cursor){
            cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":cursor});
            cEl_layer.reset.cursor = true;
            return true;
        }
        
        if(!hitObjName)return false;
        var workObjectName = paper.data.workObject.parentName + "_" + paper.data.workObject.name;
        var hitObjType = hitObjName.split(".")[1];
        
        switch (hitObjType) {

            // scale left>right
            case "borderLeft":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"col-resize"});
            break;
            // scale right>left
            case "borderRight":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"col-resize"});
            break;
            // scale top>bottom
            case "borderTop":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"row-resize"});
            break;
            // scale bottom>top
            case "borderBottom":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"row-resize"});
            break;
            // scale topLeft>bottomRight
            case "topLeft":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"nw-resize"});
            break;
            // scale topRight>bottomLeft
            case "topRight":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"ne-resize"});
            break;
            // scale bottomRight>topLeft
            case "bottomRight":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"nw-resize"});
            break;
            // scale bottomLeft>topRight
            case "bottomLeft":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"ne-resize"});
            break;
            
            // control point
            case "CP":
            case "CPin":
            case "CPout":
            case "CPLin":
            case "CPLout":
                
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"crosshair"});
//                cdebug(paper.data.workObject.name)();
                
            break;
            
            default:
                if(hitObjName.indexOf(workObjectName)===0){
                    cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"move"});
                }else{
                    cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"default"});
                }
            break;
        
        }
//        cdebug(paper.data.workObjectHit)();
//        cdebug(cEl_layer.style.custom)();
        
        cEl_layer.reset.cursor = true;
        
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

//function cEl_drawCp(shape,cEl_ctx){
//    
//    try{
//        var cEl_canv = cEl_ctx.canvas;
//        //var cEl_ctx = cEl_canv.getContext('2d');
//        var offsetCorner = 10;
//
//        // draw cEl border
//        //cdebug(cEl.shape.temp.cpBorder);
//        cEl_ctx.beginPath();
//        cEl_ctx.lineWidth = 1;
//        
//        cEl_ctx.strokeStyle = "rgba(110,110,110,1)";
//        cEl_ctx.rect(shape.temp.cpBorder.x,shape.temp.cpBorder.y,shape.temp.cpBorder.x1-shape.temp.cpBorder.x,shape.temp.cpBorder.y1-shape.temp.cpBorder.y);
//        // draw corners points
//        cEl_ctx.moveTo(shape.temp.cpBorder.x,shape.temp.cpBorder.y + offsetCorner );
//        cEl_ctx.lineTo(shape.temp.cpBorder.x + offsetCorner,shape.temp.cpBorder.y);
//        cEl_ctx.moveTo(shape.temp.cpBorder.x1,shape.temp.cpBorder.y + offsetCorner );
//        cEl_ctx.lineTo(shape.temp.cpBorder.x1 - offsetCorner,shape.temp.cpBorder.y);
//        cEl_ctx.moveTo(shape.temp.cpBorder.x1,shape.temp.cpBorder.y1 - offsetCorner );
//        cEl_ctx.lineTo(shape.temp.cpBorder.x1 - offsetCorner,shape.temp.cpBorder.y1);
//        cEl_ctx.moveTo(shape.temp.cpBorder.x,shape.temp.cpBorder.y1 - offsetCorner );
//        cEl_ctx.lineTo(shape.temp.cpBorder.x + offsetCorner,shape.temp.cpBorder.y1);
//        cEl_ctx.stroke();
//        //cEl_ctx.closePath();
//        
//        // draw mass point
//        cEl_ctx.beginPath();
//        cEl_ctx.fillStyle = "rgba(255,0,0,1)";
//        cEl_ctx.rect(shape.temp.cpMp[0]-2,shape.temp.cpMp[1]-2,4,4);
//        cEl_ctx.fill();
//        //cEl_ctx.closePath();
//        cEl_ctx.beginPath();
//        if(shape.temp.activeCp){
//            switch(shape.temp.activeCp.tag){
//                case "corner": // is corner
//                    
//                    cEl_ctx.lineWidth = 1;
//                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
//                    cEl_ctx.moveTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
//                    cEl_ctx.lineTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1] + offsetCorner * shape.temp.activeCp.value[4]);
//                    cEl_ctx.lineTo(shape.temp.activeCp.value[0] + offsetCorner * shape.temp.activeCp.value[3],shape.temp.activeCp.value[1]);
//                    //cEl_ctx.lineTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
//                    cEl_ctx.closePath();
//                    cEl_ctx.stroke();
//                    
//                    
//                break;
//                case "border": // is border
//                     
//                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
//                    cEl_ctx.beginPath();
//                    cEl_ctx.moveTo(shape.temp.activeCp.value[0],shape.temp.activeCp.value[1]);
//                    cEl_ctx.lineTo(shape.temp.activeCp.value[3],shape.temp.activeCp.value[4]);
//                    cEl_ctx.closePath();
//                    cEl_ctx.stroke();
//                    
//                break;
//                case "masspoint": // draw mass point
//                    
//                    cEl_ctx.beginPath();
//                    cEl_ctx.lineWidth = 3;
//                    cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
//                    cEl_ctx.rect(shape.temp.cpMp[0]-2,shape.temp.cpMp[1]-2,4,4);
//                    cEl_ctx.closePath();
//                    cEl_ctx.stroke();
//                    
//                break;
//            }
//            
//        }
//        cEl_drawCp_Points(shape,cEl_ctx);
//        
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};
//
//function cEl_drawCp_Points(shape,cEl_ctx){
//    
//    try{
//        var pointsLen = shape.temp.cp.length, boolIsCp;
//        for(var i = 0; i < pointsLen; i++){
//            boolIsCp = false;
//            switch(shape.temp.cp[i][2]){
//                case 0:// Poligon Shape Lines
//                    cEl_ctx.fillStyle = "rgba(0,0,0,1)";
//                    cEl_ctx.strokeStyle = "rgba(0,0,0,1)";                  
//                break;
//                case 1:// Quadratic Shape Lines
//                    cEl_ctx.fillStyle = "rgba(0,0,255,1)";
//                    cEl_ctx.strokeStyle = "rgba(0,0,255,1)";
//                break;
//                case 2:// Beziere Shape Lines
//                    cEl_ctx.fillStyle = "rgba(0,255,255,1)";
//                    cEl_ctx.strokeStyle = "rgba(0,255,255,1)";
//                break;
//            }
//            cEl_ctx.beginPath();
//            if(shape.temp.activeCp && shape.temp.activeCp.tag === "controlpoint" && shape.temp.activeCp.value[3]===i){
//                cEl_ctx.rect(shape.temp.activeCp.value[0]-2,shape.temp.activeCp.value[1]-2,4,4);
//                cEl_ctx.lineWidth = 3;
//                cEl_ctx.strokeStyle = "rgba(255,20,20,1)";
//                cEl_ctx.closePath();
//                cEl_ctx.stroke();
//            }else{
//                cEl_ctx.beginPath();
//                cEl_ctx.rect(shape.temp.cp[i][0]-2,shape.temp.cp[i][1]-2,4,4);
//                cEl_ctx.closePath();
//                cEl_ctx.fill();
//            }
// 
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function draw_pointXY(cEl, cEl_layer, cEl_ctx){
//    try{
//
//        if(cEl.shape.temp.activeCp){
//            var eventholder = window["eventholder"];
//            cEl_ctx.lineWidth = 1;
//            cEl_ctx.setLineDash([3,3]);
//            
//            cEl_ctx.strokeStyle = "rgba(200,200,200,1)";
//            draw_pointXY_path1(cEl_ctx,cEl.shape.temp.activeCp.xy,cEl_layer.shape.w,cEl_layer.shape.h);
//            
//            cEl_ctx.strokeStyle = "rgba(0,255,0,1)";
//            draw_pointXY_path1(cEl_ctx,eventholder.metrics.xy,cEl_layer.shape.w,cEl_layer.shape.h);
//
//            
//            cEl_ctx.setLineDash([]);
//        }
//
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function draw_pointXY_path1(cEl_ctx,xy,w,h){
//    try{
//        
//        cEl_ctx.beginPath();
//        cEl_ctx.moveTo(0,xy[1]+0.5);
//        cEl_ctx.lineTo(w,xy[1]+0.5);
//        cEl_ctx.moveTo(xy[0]+0.5,0);
//        cEl_ctx.lineTo(xy[0]+0.5,h);
//        cEl_ctx.stroke();
//        cEl_ctx.closePath();
//            
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//function draw_pointXY_square(cEl_ctx,xy,w,h){
//    try{
//        //cEl_ctx.fillStyle = "rgba(0,255,0,1)";
//        //cEl_ctx.fillRect(xy[0],xy[1],w,h);
//        cEl_ctx.lineWidth = 1;
//        cEl_ctx.strokeRect(xy[0],xy[1],w,h);
//            
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function cEl_setCpXY(activeCp,xy) {
//    try{
//        activeCp.xy = [xy[0],xy[1]];
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function cEl_getCpXY(activeCp){
//    try{
//        if(activeCp.xy){
//            return [activeCp.xy[0],activeCp.xy[1]];
//        }else{
//            return [0,0];
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

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


function selectGroup(cEl_group){
    try{
        //cdebug("selectButton")();
        

        if(paper.data.workObject && paper.data.workObject.reset){
            paper.data.workObject.debug = false;
            paper.data.workObject.reset.debug = true;
        }
        
        if(cEl_group){
            
            cEl_group.debug = true;
            cEl_group.reset.debug = true;
            paper.data.workObject = cEl_group;
            paper.data.workObjectHit = cEl_group.children[0].children[0];
            paper.data.workState = "editlimbo";
        }else{
            paper.data.workObject = null;
            paper.data.workObjectHit = null;
            paper.data.workState = "pre";
        }
        
        
        return true;    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function addGroup(){
    try{
        //cdebug("addGroup")();
        
        paper.data.workState = "add";
        
        if(paper.data.workObject && paper.data.workObject.reset){
            paper.data.workObject.reset.debug = true;
            paper.data.workObject.debug = false;
        }
        paper.data.workObject = null;

        return true;    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}


function colorButton(cEl){
    try{
        
//        cdebug(cEl.style.calc)();
        alert("not implemented");
        cdebug("not implemented")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function moveMenu(cEl){
    try{
        
        // TODO add event type and set it on mousedown also
        
        var eventholder = window["eventholder"];
        
        if(eventholder.keys.buttons===1){
            
            //cdebug(cEl.projectName)();
            //cdebug(cEl.data.xyoffset)();
            
            var menuTriggered = paper.project;
            var xy = [eventholder.metrics.xyAbs[0]-cEl.data.xyoffset[0],eventholder.metrics.xyAbs[1]-cEl.data.xyoffset[1]];
            
            
//            if(paper.data.workObject && eventholder.keys.buttons ===1){
//                            
////                           paper.data.workObject.shape.masspoint = cEl_edit_MP(paper.data.workObject.parent,eventholder.metrics.xy,paper.data.workObject.parent.shape.scale);
////                           paper.data.workObject.reset.layout_shape =true;
////                            cdebug(paper.data.workObject.position)();
////                            cdebug(eventholder.metrics.delta)(); 
//
////                            cdebug(paper.data.workObject.name)();
//                            
//                            paper.data.workObject.position = new paper.Point([paper.data.workObject.position.x + eventholder.metrics.delta.x,paper.data.workObject.position.y + eventholder.metrics.delta.y]);
//                        }

            menuTriggered.shape.masspoint = [menuTriggered.shape.scale[0]*xy[0]/menuTriggered.shape.w,menuTriggered.shape.scale[1]*xy[1]/menuTriggered.shape.h];
            menuTriggered.reset.layout_shape = true;
            
            
        }else if(eventholder.keys.buttons===0){
            cEl.data.xyoffset = [eventholder.metrics.xy[0]-cEl.bounds.topLeft.x,eventholder.metrics.xy[1]-cEl.bounds.topLeft.y];
        }
//        if(eventholder.keys.button)
//        cdebug(cEl.name)();
//        
//        cdebug("notImplemented")();
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function resetChildren(cEl){
    try{
        
        
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function createAprox (cEl_layer,segments, masspoint, rounding){
    try{
        
        //cdebug(path.segments)();
        var drawArrayIn = segments;
        var drawLength = drawArrayIn.length;
        var drawArrayOut = [];

        for(var i = 0; i < drawLength; i++){
            drawArrayOut.push([Math.round10(drawArrayIn[i].point.x/cEl_layer.shape.w-masspoint[0], -rounding),Math.round10(drawArrayIn[i].point.y/cEl_layer.shape.h-masspoint[1], -rounding)]);
        }
        return drawArrayOut;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function group_tabulation(cEl_layer,workObject,boolDescending){
    try{
        
//        cdebug([workObject.name,workObject.index])();
        
        var newIndex;
        var len = cEl_layer.children.length;
        var offset = boolDescending ? -1:1;
        var start = boolDescending ? 1:0;
        var end = boolDescending ? len:len-1;
        var def = boolDescending ? len-1:1;
        
        if(workObject && workObject.index){
            if(workObject.index>start && workObject.index<end){
                newIndex = workObject.index + offset;
                if(cEl_layer.children[newIndex].tag ==="group"){
                    return selectGroup(cEl_layer.children[newIndex]);
                }
            }else{
                return true;
            }
        }    
        return selectGroup(cEl_layer.children[def]);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }

}