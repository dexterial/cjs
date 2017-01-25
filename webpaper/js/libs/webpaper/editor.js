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
                if(eventholder.keys.key==="Escape")selectGroup(null);
                if(eventholder.keys.key==="Delete")deleteGroup();
            break;    
            
            case "editset":
            paper.data.workState = "edit";
            case "edit":
                
                if(!paper.data.workObject || !paper.data.workObjectHit ){
                    if(eventholder.keys.key==="Escape")selectGroup(null);
                    return false;
                }
                var delta = {"x":0,"y":0,"rotation":0};
                var offset = 2;
                 
                switch(eventholder.keys.key){
                    case "ArrowUp":
                        delta.y = -offset;
                        handleCP(paper.data,delta);
                    break;
                    case "ArrowRight":
                        delta.x = offset;
                        handleCP(paper.data,delta);
                    break;
                    case "ArrowDown":
                        delta.y = offset;
                        handleCP(paper.data,delta);
                    break;
                    case "ArrowLeft":
                        delta.x = -offset;
                        handleCP(paper.data,delta);
                    break;
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.keys.shiftKey);
                    break;
                    case "Enter":
                        
                        // TODO add save here
                        
                        selectGroup(paper.data.workObject);
                    break;
                    case "Escape":
                        
                        // TODO add undo here
//                        cdebug(paper.data.workState)();
                        selectGroup(paper.data.workObject);
                    break;
                    default:
//                        cdebug(eventholder.keys)();
                    break;
                }
                
//                if(eventholder.keys.buttons ===1 ){
//                    handleCP(paper.data,eventholder.metrics.delta);
//                }
                
            break;
            case "pre":
//                if(!paper.data.workObject && !paper.data.workObjectHit )return false;
                switch(eventholder.keys.key){
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.keys.shiftKey);
                    break;
//                    case "Escape":
//                        
//                        // TODO add undo here
//                        cdebug(eventholder.keys)();
//                        selectGroup(null);
//                    break;
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
        switch (paper.data.workState) {
//            case "editset":
            case "edit":
//                cdebug("hre")();
                paper.data.workObject.children[0].applyMatrix = true;
                paper.data.workObject.reset.debug = true;
                paper.data.workState = "editset";
//                cdebug(paper.data.workState)();
            break;
        default:
//            cdebug(paper.data.workState)();
        }

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;;
    }
}




function editor_wheel(eventholder) {

    try{
        
        
        switch (paper.data.workState) {
            case "editlimbo":
            case "pre":
                
                group_tabulation(paper.data.workLayer,paper.data.workObject,eventholder.wheel.deltaY>0);
            break;
            case "editset":
                //cdebug(eventholder.wheel.deltaY);
//                cdebug(paper.data.workObjectHit.name)();
                cp_tabulation(paper.data,eventholder.wheel.deltaY>0);
                
                // TODO add here code to scroll in editsets control points
                
            
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
            case  "editset":
                
//                cdebug("here1   " + eventholder.actObj.name + " <<< >>> " + paper.data.workObject.parentName + "_" + paper.data.workObject.name)();
                
                //cEl_layer = paper.data.workLayer;
                var workObject_name = paper.data.workObject.parentName + "_" + paper.data.workObject.name;
                var actObj_name = eventholder.actObj.name;
                if(actObj_name.indexOf(workObject_name)===0){
                    
                    select_CP(cEl_layer,eventholder.metrics.xy,eventholder.actObj);
                    
                    paper.data.workState = "edit";
                    
                    //eventholder.actObj.bringToFront();

                }else{
                    paper.data.workObjectHit = null;
                    paper.data.workObjectCPdata = null;
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
            case "editset":
//                paper.data.workState = "edit";
                cEl_setCpCursor(paper.project.activeLayer,false,eventholder.actObj.name);
            break;
            case "edit":
//                cdebug(eventholder.keys.buttons)();
                // move/scale/edit control points
                handleCP(paper.data,eventholder.metrics.delta);
                
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

                paper.data.workObject.children[0].applyMatrix = true;
                paper.data.workObject.reset.debug = true;
                paper.data.workState = "editset";

            break;
            case "add":
//                        cdebug("here ADD")();
                if(paper.data.workObject.length===0)break;
                //paper.data.workObject.selected = false;
                paper.data.workObject.closed = true;
                paper.data.workObject.simplify();

                var newShapeName = id_generator("sh",9);
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
                cEl.name = id_generator("gr",9);
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

function drawGroup_CP(cEl_group){
    try{
        
//        cdebug("start")();
        cEl_group.children[4].removeChildren();
//        cdebug(cEl_group.name + "  vs   " + cEl_group.debug)();
        
        if(!cEl_group.debug)return true;
        
//        cdebug(paper.data.workObjectHit.name)();

//        cdebug(paper.data.workState)();
        
        
        var bounds = cEl_group.children[0].bounds;
        var size,path,radius;
        var selectedName,selectedId;
        
        var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name ;
        if(paper.data.workObjectHit){
            selectedName = paper.data.workObjectHit.name;
            selectedId = paper.data.workObjectHit.cp;
            boolSelectedId = true;
        }else{
            boolSelectedId = false;
            selectedName = "";
            selectedId = -1;
        }
        
        
        radius = GLOBAL_editSize;

        var colorBKG = "rgba(255,255,255,0.5)";
        var colorCPout = "rgba(0,0,255,0.8)";
        var colorCPin = "rgba(0,255,0,0.8)";
        var colorCP = "rgba(255,111,111,0.8)";
        var colorCorner = "rgba(111,111,111,0.7)";
        var colorBorder = "rgba(111,111,111,0.4)";
        
        var selectedColor = "rgba(255,0,0,0.6)";
        var selectedColor2 = "rgba(255,0,0,0.2)";
//        cdebug(selectedName)();
        

        // set background
        size = new Size(bounds.width-radius, bounds.height-radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topLeft.x+radius/2,bounds.topLeft.y+radius/2],size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".body"===selectedName)?selectedColor2:colorBKG;
        path.name = cEl_groupName + ".body";
        path.cp = -9;



        // draw borders
        
        size = new Size(bounds.width-2*radius, radius/2);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topLeft.x+radius,bounds.topLeft.y],size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".borderTop"===selectedName )?selectedColor:colorBorder;//|| cEl_groupName + ".topLeft"===selectedName
        path.name = cEl_groupName + ".borderTop";
        path.cp = -8;
        
        size = new Size(radius/2, bounds.height-2*radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topRight.x-radius/2,bounds.topRight.y+radius],size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".borderRight"===selectedName)?selectedColor:colorBorder;
        path.name = cEl_groupName + ".borderRight";
        path.cp = -7;
        
        size = new Size(-bounds.width+2*radius, radius/2);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.bottomRight.x-radius,bounds.bottomRight.y-radius/2],size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".borderBottom"===selectedName)?selectedColor:colorBorder;
        path.name = cEl_groupName + ".borderBottom";
        path.cp = -6;
        
        size = new Size(radius/2, -bounds.height+2*radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.bottomLeft.x,bounds.bottomLeft.y-radius],size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".borderLeft"===selectedName)?selectedColor:colorBorder;
        path.name = cEl_groupName + ".borderLeft";
        path.cp = -5;
        // draw corners
        
        size = new Size(radius, radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.topLeft,size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".topLeft"===selectedName)?selectedColor:colorCorner;
        path.name = cEl_groupName + ".topLeft";
        path.cp = -4;
        
        size = new Size(-radius, radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.topRight,size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".topRight"===selectedName)?selectedColor:colorCorner;
        path.name = cEl_groupName + ".topRight";
        path.cp = -3;
        
        size = new Size(-radius, -radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.bottomRight,size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".bottomRight"===selectedName)?selectedColor:colorCorner;
        path.name = cEl_groupName + ".bottomRight";
        path.cp = -2;
        
        size = new Size(radius, -radius);
        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.bottomLeft,size));
        path.fillColor = (boolSelectedId && cEl_groupName + ".bottomLeft"===selectedName)?selectedColor:colorCorner;
        path.name = cEl_groupName + ".bottomLeft";
        path.cp = -1;
        // draw control points and handles
        
        for(var i = 0,boolHandles,boolSelectedId,segment,point,pointHandleIn,pointHandleOut;i<cEl_group.children[0].children[0].segments.length;i++){
            size = new Size(radius/2, radius/2);
            segment = cEl_group.children[0].children[0].segments[i];
            point = segment.point;
            boolHandles = segment.hasHandles();
            boolSelectedId = (i===selectedId);
            
            var CP_group = cEl_group.children[4].addChild(new paper.Group);
            CP_group.name = ".CPGR";
            CP_group.cp = i;
            
            // draw handles lines
            if(boolHandles){
                pointHandleIn = segment.handleIn;
                pointHandleOut = segment.handleOut;
                
                path = CP_group.addChild(new Path.Line([pointHandleIn.x+point.x,pointHandleIn.y+point.y], point));
                path.strokeColor = (boolSelectedId && cEl_groupName + ".CPLin"===selectedName)?selectedColor:colorCPin;
                path.name = cEl_groupName + ".CPLin";
                path.cp = i;

                path = CP_group.addChild(new Path.Line(point, [pointHandleOut.x+point.x,pointHandleOut.y+point.y]));
                path.strokeColor = (boolSelectedId && cEl_groupName + ".CPLout"===selectedName)?selectedColor:colorCPout;
                path.name = cEl_groupName + ".CPLout";
                path.cp = i;
            }
            
            // draw CP point
            path = CP_group.addChild(new paper.Path.Rectangle([point.x-radius/4,point.y-radius/4],size));
            path.fillColor = (boolSelectedId && cEl_groupName + ".CP"===selectedName)?selectedColor:colorCP;
            path.name = cEl_groupName + ".CP";
            path.cp = i;
            
            // draw handles points
            if(boolHandles){
                path = CP_group.addChild(new paper.Path.Rectangle([pointHandleIn.x+point.x-radius/4,pointHandleIn.y+point.y-radius/4],size));
                path.fillColor = (boolSelectedId && cEl_groupName + ".CPin"===selectedName)?selectedColor:colorCPin;
                path.name = cEl_groupName + ".CPin";
                path.cp = i;
                
                path = CP_group.addChild(new paper.Path.Rectangle([pointHandleOut.x+point.x-radius/4,pointHandleOut.y+point.y-radius/4],size));
                path.fillColor = (boolSelectedId && cEl_groupName + ".CPout"===selectedName)?selectedColor:colorCPout;
                path.name = cEl_groupName + ".CPout";
                path.cp = i;
            }
        };
        
        
//        path.strokeWidth = radius/2;
//        path.strokeColor = color;
        
//        path.selected = true;
//        cdebug("end")();
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function handleCP(data,delta){
    try{
        
        var scaleX=1,scaleY=1,scalePoint;
        
        var workObject = data.workObject;
//        var workObjectName = workObject.parentName + "_" + workObject.name;
        
        var hitObjType = data.workObjectHit.name.split(".")[1];
//        cdebug(hitObjName)();
                
        switch (hitObjType) {

            // scale left>right
            case "borderLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scalePoint = data.workObjectCPdata.rightCenter;
            break;
            // scale right>left
            case "borderRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scalePoint = data.workObjectCPdata.leftCenter;
            break;
            // scale top>bottom
            case "borderTop":

                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.bottomCenter;
            break;
            // scale bottom>top
            case "borderBottom":

                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.topCenter;
            break;

            // scale topLeft>bottomRight
            case "topLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.bottomRight;
            break;
            // scale topRight>bottomLeft
            case "topRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scaleY = 1 - delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.bottomLeft;
            break;
            // scale bottomRight>topLeft
            case "bottomRight":

                scaleX = 1 + delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.topLeft;
            break;
            // scale bottomLeft>topRight
            case "bottomLeft":

                scaleX = 1 - delta.x/(workObject.children[0].matrix.a*data.workObjectCPdata.width);
                scaleY = 1 + delta.y/(workObject.children[0].matrix.d*data.workObjectCPdata.height);
                scalePoint = data.workObjectCPdata.topRight;
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
        
        var segmentPoint, finalPoint;
        switch (typeCP) {
            case "CP":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].point;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
                finalPoint = segmentPoint;
                
//                data.workObjectHit.position = finalPoint;
                
//                data.workObjectHit.parent.position.x += delta.x;
//                data.workObjectHit.parent.position.y += delta.y;
                //cdebug(data.workObjectHit.position)();
                
            break;
            case "CPin":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleIn;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
                finalPoint = segmentPoint;
                
//                data.workObjectHit.position = finalPoint;
                
            break;    
            case "CPout":
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleOut;
                segmentPoint.x += delta.x;
                segmentPoint.y += delta.y;
                finalPoint = segmentPoint;
                
//                data.workObjectHit.position = finalPoint;
//                cdebug(finalPoint.length)();
                
            break;
            case "CPLout":
                
                var pointOut = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleOut;
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].point;
                
                var vector = getEditVector(pointOut,segmentPoint,delta,data);
                
                pointOut.x = vector.x;
                pointOut.y = vector.y;
                
                finalPoint = pointOut;

            break;
            case "CPLin":
                
                var pointOut = workObject.children[0].children[0].segments[data.workObjectHit.cp].handleIn;
                segmentPoint = workObject.children[0].children[0].segments[data.workObjectHit.cp].point;
                
                var vector = getEditVector(pointOut,segmentPoint,delta,data);
                
                pointOut.x = vector.x;
                pointOut.y = vector.y;
                
                finalPoint = pointOut;

            break;

        }
        
        
        if (workObject.data.type === "text"){
            if(workObject.data.values.pattern === "path"){
                switch (typeCP) {
                    case "CP":
                        workObject.children[1].children[0].segments[data.workObjectHit.cp].point = finalPoint;
                    break;
                    case "CPin":
                    case "CPLin":
                        workObject.children[1].children[0].segments[data.workObjectHit.cp].handleIn = finalPoint;
                    break;    
                    case "CPout":
                    case "CPLout":
                        workObject.children[1].children[0].segments[data.workObjectHit.cp].handleOut = finalPoint;
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




function getEditVector(pointOut,segmentPoint,delta,data){
    try{
        if(!data.workObjectCPdata.length)data.workObjectCPdata.length = pointOut.length;

        var hitPoint = data.workObjectCPdata.hitPoint;
        var endPoint = hitPoint.add(delta);

        var vector1 = hitPoint.subtract(segmentPoint);
        var vector2 = vector1.add(delta);
        vector2.length = data.workObjectCPdata.length;
        
        
        data.workObjectCPdata.hitPoint = endPoint;
        
        return vector2;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function setTriangle(triObj,setType){
    try{
        switch(setType){
            case "SSS_A":
                triObj.A = getAngleSSS(triObj.b,triObj.c,triObj.a);
                return triObj;
            break;
            case "SSS_B":
                triObj.B = getAngleSSS(triObj.a,triObj.c,triObj.b);
                return triObj;
            break;
            case "SSS_C":
                triObj.C = getAngleSSS(triObj.a,triObj.b,triObj.c);
                return triObj;
            break;
        }
        
        
        
        } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    } 
}

function getAngleSSS(a,b,c){
    try{
        return Math.acos((a*a + b*b -c*c)/(2*a*b));
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

function select_CP(cEl_layer,xy,actObj){
    try{    
    
        paper.data.workObjectHit = actObj;
        var bounds = paper.data.workObject.children[0].bounds;

        paper.data.workObjectCPdata = {
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
            "hitPoint":new paper.Point(xy),
            "length":null
//                        "sign":sign1(paper.data.workObject.children[0].matrix.a)
        };

        cEl_setCpCursor(cEl_layer,false,paper.data.workObjectHit.name);

        paper.data.workObject.reset.debug = true;
        paper.data.workObject.children[0].applyMatrix = false;
        //paper.data.workObject.children[1].applyMatrix = false;
        
        return true;            
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
            paper.data.workObjectHit = null;
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


function deleteGroup(cEl_group){
    try{
        
        if(cEl_group){
            cEl_group.remove();
        }else{
            paper.data.workObject.remove();
        }
        
        paper.data.workObject = null;
        paper.data.workObjectHit = null;
        paper.data.workState = "pre";
        
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

function cp_tabulation(data,boolDescending){
    try{
        
        var newIndex;
        var cp_group = data.workObject.children[4];
        var len = cp_group.children.length;
        var offset = boolDescending ? -1:1;
        var start = boolDescending ? -9:-10;
        var end = boolDescending ? len-8:len-9;
        var def = boolDescending ? len-1:0;
        
        
        
        var cEl_layer = data.workLayer;
        
        var cpObject = paper.data.workObjectHit;
        
//        cdebug(cp_group.name)();
//        cdebug(cpObject.name + " " + boolDescending + " index " + cpObject.cp + " of " + end)();
        
        
        if(cpObject && cpObject.cp){
            if(cpObject.cp>start && cpObject.cp<end){
                newIndex = cpObject.cp + offset;
//                if(data.workObject.children[newIndex].tag === "group"){
//                    cdebug(data.workObjectHit.name + " " + boolDescending)();
                    select_CP(cEl_layer,[0,0],cp_group.children[newIndex+9]);
//                    cdebug(data.workObjectHit.name + " " + boolDescending)();
                    return true;
//                }
            }else{
                return true;
            }
        }    
        select_CP(cEl_layer,[0,0],cp_group.children[def]);
        return true;
        
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