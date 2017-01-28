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
                paper.data.workState = "editkeys";
                paper.data.cEl_group.children["ShapePath"].applyMatrix = false;
//            break;
            case "editkeys":
                
                if(!paper.data.cEl_group || !paper.data.cEl_groupHit ){
                    if(eventholder.keys.key==="Escape")selectGroup(null);
                    return false;
                }
                var delta = new paper.Point();//{"x":0,"y":0,"rotation":0};
                var offset = 2;
                 
                switch(eventholder.keys.key){
                    case "ArrowUp":
                        delta.y = -offset;
                        handleCP(paper.data,delta,eventholder.keys.ctrlKey);
                    break;
                    case "ArrowRight":
                        delta.x = offset;
                        handleCP(paper.data,delta,eventholder.keys.ctrlKey);
                    break;
                    case "ArrowDown":
                        delta.y = offset;
                        
                        handleCP(paper.data,delta,eventholder.keys.ctrlKey);
                    break;
                    case "ArrowLeft":
                        delta.x = -offset;
                        handleCP(paper.data,delta,eventholder.keys.ctrlKey);
                    break;
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.cEl_group,eventholder.keys.shiftKey);
                    break;
                    case "Enter":
                        
                        // TODO add save here
                        
                        selectGroup(paper.data.cEl_group);
                    break;
                    case "Escape":
                        
                        // TODO add undo here
//                        cdebug(paper.data.workState)();
                        selectGroup(paper.data.cEl_group);
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
//                if(!paper.data.cEl_group && !paper.data.cEl_groupHit )return false;
                switch(eventholder.keys.key){
                    case "Tab":
//                        cdebug(eventholder.keys)();
                        group_tabulation(paper.data.workLayer,paper.data.cEl_group,eventholder.keys.shiftKey);
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
        
        return true;
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
            case "editkeys":
//                cdebug("hre")();
                paper.data.cEl_group.children["ShapePath"].applyMatrix = true;
                paper.data.cEl_group.reset.debug = true;
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
                
                group_tabulation(paper.data.workLayer,paper.data.cEl_group,eventholder.wheel.deltaY>0);
            break;
            case "editset":
                //cdebug(eventholder.wheel.deltaY);
//                cdebug(paper.data.cEl_groupHit.name)();
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
            case "editmouse":
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
                
                paper.data.cEl_group = new paper.Path();
                paper.data.cEl_group.strokeColor = 'black';
                paper.data.cEl_group.fullySelected = true;

            break;
            case  "editlimbo" : // "editlimbo":
            case  "editset":
                
//                cdebug("here1   " + eventholder.actObj.name + " <<< >>> " + paper.data.cEl_group.parentName + "_" + paper.data.cEl_group.name)();
                
                //cEl_layer = paper.data.workLayer;
                var cEl_group_name = paper.data.cEl_group.parentName + "_" + paper.data.cEl_group.name;
                var actObj = eventholder.actObj;
                
                if(actObj.data && actObj.data.refersTo === cEl_group_name){
                    
                    
//                    cdebug(eventholder.hitObject)();
                    //cdebug(eventholder.hitObject.location.curve.index)();
                    
                    select_CP(cEl_layer,eventholder.metrics.xy,eventholder.hitObject);
                    paper.data.workState = "editmouse";
                    
                    //eventholder.actObj.bringToFront();
                }else{
//                    paper.data.cEl_group = null;
                    paper.data.cEl_groupCPdata = null;
                }
                
            break;
            case "pre":
                //eventholder.actObj.fullySelected = true;
                //cdebug(eventholder.actObj.className)();
                switch (eventholder.actObj.className) {

                    case "SymbolItem":
                    case "Path":
                    case "CompoundPath":
                        
                        var cEl_group = getParent(eventholder.actObj,"tag");
                        if(cEl_group.tag !== "group")selectGroup(cEl_group);

                    break;
//                            case "Path":
//                                eventholder.actObj.parent.selected = true;
//                            break;
                    default:

                        cdebug(eventholder.actObj.className)();
                    break;
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



function editor_mousemove(eventholder) {
    try{
        

        if(!paper.data.cEl_group && !paper.data.cEl_groupCPdata)return false;
        
        switch (paper.data.workState) {
            case "add":
                // add new shape points
                if(eventholder.keys.buttons === 1 ){
                    paper.data.cEl_group.add(eventholder.metrics.xy);
                }        
            break;
            case "editlimbo":
            case "editset":
//                paper.data.workState = "edit";
//                
                // just change the cursor
//                cdebug(eventholder.hitObject.item.name)();
                if(eventholder.hitObject){
                    var hitActType = getHitActType(eventholder.hitObject.item.name,eventholder.hitObject);
                    cEl_setCpCursor(paper.project.activeLayer,false,hitActType.name);
                }
            break;
            case "editmouse":
//                cdebug(eventholder.keys.buttons)();
                // move/scale/edit control points
                handleCP(paper.data,eventholder.metrics.delta,eventholder.keys.ctrlKey);
                
            break;
        }
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function editor_mouseup(eventholder) {
    
    try{
        
        if(!paper.data.cEl_group && !paper.data.cEl_groupCPdata )return false;
        var cEl_layer = paper.project.activeLayer;

        switch (paper.data.workState) {
            case "editmouse":

                paper.data.cEl_group.children["ShapePath"].applyMatrix = true;
                paper.data.cEl_group.reset.debug = true;
                paper.data.workState = "editset";

            break;
            case "add":
//                        cdebug("here ADD")();
                if(paper.data.cEl_group.length===0)break;
                //paper.data.cEl_group.selected = false;
                paper.data.cEl_group.closed = true;
                paper.data.cEl_group.simplify();

                var newShapeName = id_generator("sh",9);
                paper.data.shapes[newShapeName] = createAprox(cEl_layer,paper.data.cEl_group.segments,[0.5,0.5],5);
                paper.data.cEl_group.remove();

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


function drawGroup_CP_Rectangle(CP_group,boolSetNew,data,name,size,topLeft){
    try{
        var path;
        if(boolSetNew){
            path = CP_group.addChild(new paper.Path.Rectangle(topLeft,size));
            path.fillColor = data.color;
            path.data = data;
            path.name = name;
            
            
            path.strokeColor = GlobalEditColorBorder;
            path.strokeWidth = GlobalEditRadius/2;
            
        }else{
            path = CP_group.children[data.index];
            //cdebug(path.name)();
            
            path.bounds.topLeft = topLeft;
            path.bounds.width = size.width;
            path.bounds.height = size.height;
        }
        return path;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function drawGroup_CP_Line(CP_group,boolSetNew,data,name,from,to){
    try{
        var path;
        if(boolSetNew){
            path = CP_group.addChild(new paper.Path.Line(from,to));
            path.fillColor = data.color;
            path.data = data;
            path.name = name;
        }else{
            path = CP_group.children[data.index];
            //cdebug(path.name)();
            
            path.firstSegment.position = from;
            path.lastSegment.position = to;
            
        }
        return path;
    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function drawGroup_CP_bounds(cEl_group,bounds,cEl_groupName){
    try{
        
        var size = new paper.Size(bounds.width, bounds.height);
        
        var CP_group = cEl_group.children["ControlPoints"].children[0];
        var boolSetNew = false;
        if(!CP_group){
            var CP_group = cEl_group.children["ControlPoints"].addChild(new paper.Group);
            CP_group.name = ".CPGR1";
            boolSetNew = true;
        }else{

            cEl_group.children["ControlPoints"].children[0].removeChildren();

        }
        
        // set background
        drawGroup_CP_Rectangle(CP_group,true,{"color":GlobalEditColorBKG,"drawType":"fillColor","index":0,"indexLow":-1,"refersTo":cEl_groupName},"body",size,bounds.topLeft);
        
        return boolSetNew;

    } catch (e) {
        var err = listError(e,true);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function drawGroup_CP(cEl_group){
    try{
        
//        cdebug("start")();
//        
        
        
        if(!cEl_group.debug){
            cEl_group.children["ControlPoints"].removeChildren();
            return true;
        }
        
//        cdebug(cEl_group.name + "  vs   " + cEl_group.debug)();
        
        var CP_group,path,size;
//        var selectedName,selectedId;
//        
        var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name ;
        
        var boolSetNew = drawGroup_CP_bounds(cEl_group,cEl_group.children["ShapePath"].bounds,cEl_groupName);

        // draw control points and handles
        if(boolSetNew){
            CP_group = cEl_group.children["ControlPoints"].addChild(new paper.Group);
            CP_group.name = ".CPGR2";
        }else{
            CP_group = cEl_group.children["ControlPoints"].children[1];
            
        }
        path = cEl_group.children["ShapePath"];

        //cdebug(cEl_group.children["ShapePath"].children[0]);
        if(!path.children){
            if(boolSetNew){
                subCP_group = CP_group.addChild(new paper.Group);
            }else{
                subCP_group = CP_group.children[0];
            }
            drawGroup_CP_pointsInPath(subCP_group,cEl_groupName,path,boolSetNew,0);
        }else{
            for(var i = 0,subCP_group;i<path.children.length;i++){
                if(boolSetNew){
                    subCP_group = CP_group.addChild(new paper.Group);
                }else{
                    subCP_group = CP_group.children[i];
                }
                drawGroup_CP_pointsInPath(subCP_group,cEl_groupName,path.children[i],boolSetNew,i);
            }
        }
        

        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function drawGroup_CP_pointsInPath(CP_group,cEl_groupName,path,boolSetNew,indexLow){
    try{
    
        for(var i = 0,boolHandles,subgroup,subpath,segment,point,pointHandleIn,pointHandleOut;i<path.segments.length;i++){
            segment = path.segments[i];
            point = segment.point;
            boolHandles = segment.hasHandles();
            
            if(boolSetNew){
                subgroup = CP_group.addChild(new paper.Group);
            }else{
                subgroup = CP_group.children[i];
            }
            
            // draw handles lines
            if(boolHandles){
                pointHandleIn = point.add(segment.handleIn,point);
                pointHandleOut = point.add(segment.handleOut,point);
                
                if(boolSetNew){
                    subpath = subgroup.addChild(new Path.Line(pointHandleOut,point));
                    subpath.data = {"color":GlobalEditColorCPout,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
                    subpath.strokeColor = GlobalEditColorCPout;
                    subpath.name = "CPLout";
                }else{
                    
                }
                
                if(boolSetNew){
                    subpath = subgroup.addChild(new Path.Line(pointHandleIn, point));
                    subpath.data = {"color":GlobalEditColorCPin,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
                    subpath.strokeColor = GlobalEditColorCPin;
                    subpath.name = "CPLin";
                }else{
                    
                }
                
                if(boolSetNew){
//                drawGroup_CP_Rectangle(subgroup,boolSetNew,{"color":GlobalEditColorBKG,"type":"fillColor","index":0},cEl_groupName + ".body",size,bounds.topLeft);
                
                    subpath = subgroup.addChild(new paper.Path.Circle(pointHandleIn,GlobalEditRadius/2));
                    //subpath.position = pointHandleIn;
                    subpath.data = {"color":GlobalEditColorCPin,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
                    subpath.strokeColor = GlobalEditColorCPin;
                    subpath.name = "CPin";
                }else{
                    
                    subpath = subgroup.children["CPin"];
                    subpath.bounds.width = GlobalEditRadius;
                    subpath.bounds.height = GlobalEditRadius;
                    subpath.position = pointHandleIn;
                }
            }
            if(boolSetNew){    
            // draw CP point
                subpath = subgroup.addChild(new paper.Path.Circle(point,GlobalEditRadius/2));
    //            subpath.position = point;
                subpath.data = {"color":GlobalEditColorCP,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
                subpath.strokeColor = GlobalEditColorCP;
                subpath.name = "CP";
            }else{
                
                subpath = subgroup.children["CP"];
                subpath.bounds.width = GlobalEditRadius;
                subpath.bounds.height = GlobalEditRadius;
                subpath.position = point;
                
            }
            if(boolHandles){
                if(boolSetNew){
                    subpath = subgroup.addChild(new paper.Path.Circle(pointHandleOut,GlobalEditRadius/2));
                    //subpath.position = pointHandleOut;
                    subpath.data = {"color":GlobalEditColorCPout,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
                    subpath.strokeColor = GlobalEditColorCPout;
                    subpath.name = "CPout";   
                }else{
                    subpath = subgroup.children["CPout"];
                    subpath.bounds.width = GlobalEditRadius;
                    subpath.bounds.height = GlobalEditRadius;
                    subpath.position = pointHandleOut;
                }
            }
            
            
        };
    
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



function handleCP(data,delta,boolAlt){
    try{
        
        var scaleX=1,scaleY=1,scalePoint;
        var cEl_group = data.cEl_group;
        var hitObjType = data.cEl_groupCPdata.hitActType.name;

        switch (hitObjType) {

            // scale left>right
            case "borderLeft":

                scaleX = 1 - delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scalePoint = data.cEl_groupCPdata.rightCenter;
            break;
            // scale right>left
            case "borderRight":

                scaleX = 1 + delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scalePoint = data.cEl_groupCPdata.leftCenter;
            break;
            // scale top>bottom
            case "borderTop":

                scaleY = 1 - delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.bottomCenter;
            break;
            // scale bottom>top
            case "borderBottom":

                scaleY = 1 + delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.topCenter;
            break;

            // scale topLeft>bottomRight
            case "topLeft":

                scaleX = 1 - delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scaleY = 1 - delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.bottomRight;
            break;
            // scale topRight>bottomLeft
            case "topRight":

                scaleX = 1 + delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scaleY = 1 - delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.bottomLeft;
            break;
            // scale bottomRight>topLeft
            case "bottomRight":

                scaleX = 1 + delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scaleY = 1 + delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.topLeft;
            break;
            // scale bottomLeft>topRight
            case "bottomLeft":

                scaleX = 1 - delta.x/(cEl_group.children["ShapePath"].matrix.a*data.cEl_groupCPdata.width);
                scaleY = 1 + delta.y/(cEl_group.children["ShapePath"].matrix.d*data.cEl_groupCPdata.height);
                scalePoint = data.cEl_groupCPdata.topRight;
            break;
            // edit shape Point
            case "CPLin":
            case "CPLout":
            case "CP":
            case "CPin":
            case "CPout":
            
                
                
                
                editCP(data,cEl_group,delta,hitObjType,boolAlt);
                
                
                
                
                data.editTool = "edit" + hitObjType;
                
                return true;
            break;
            
            default:
                //var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name;
                //var hitObjName = data.cEl_groupHit;
                
                //cdebug(data.cEl_groupCPdata.name)();
                
                //if(data.cEl_groupCPdata.name === cEl_groupName){
                    cEl_group.translate(delta);
                    data.editTool = "move";
                //}
                return true;
            break;
        }
        data.editTool = "scale";
        setGroupScale(cEl_group,scaleX,scaleY,scalePoint);
        
        
//        cdebug([scaleX,scaleY,cEl_group.children["ShapePath"].matrix])();
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function editCP(data,cEl_group,delta,typeCP,boolAlt){
    try{
        
        
        
        var segmentPoint,CP_group;
        var cEl_groupHit = data.cEl_groupHit;
        //var boolLow = cEl_groupHit.data.indexLow===-1;
        var cEl_groupBounds = cEl_group.children["ShapePath"].bounds;
        
//        if(boolLow){
//            segmentPoint = cEl_group.children["ShapePath"].children[0].segments[cEl_groupHit.data.index];
//        }else{
            segmentPoint = cEl_group.children["ShapePath"].children[cEl_groupHit.data.indexLow].segments[cEl_groupHit.data.index];
//        }
        
        
        
        
        switch (typeCP) {
            
            case "CPin":
                
                //cdebug(cEl_group.children["ShapePath"].children[0])();
                
                
                
                segmentPoint.handleIn.x += delta.x;
                segmentPoint.handleIn.y += delta.y;

                cEl_groupHit.position = segmentPoint.point.add(segmentPoint.handleIn);
                CP_group = cEl_groupHit.parent;
                CP_group.children["CPLin"].firstSegment.point = cEl_groupHit.position;
                //
                //cEl_groupHit.previousSibling.previousSibling.previousSibling.firstSegment.point = cEl_groupHit.position;

            break;
            
            
            case "CPLin":
                
  
                
                segmentPoint.handleIn = getEditVector(segmentPoint.handleIn,segmentPoint.point,delta,data);
                cEl_groupHit.firstSegment.point = segmentPoint.point.add(segmentPoint.handleIn);
                
                CP_group = cEl_groupHit.parent;
                CP_group.children["CPin"].position = cEl_groupHit.firstSegment.point;
                
                

            break;
            
            case "CP":

                segmentPoint.point.x += delta.x;
                segmentPoint.point.y += delta.y;

                
                // translate CP
                cEl_groupHit.parent.translate(delta);
                
            break;
            
            case "CPLout":
                
   
                
                segmentPoint.handleOut = getEditVector(segmentPoint.handleOut,segmentPoint.point,delta,data);
                cEl_groupHit.firstSegment.point = segmentPoint.point.add(segmentPoint.handleOut);
                
                CP_group = cEl_groupHit.parent;
                CP_group.children["CPout"].position = cEl_groupHit.firstSegment.point;

            break;
                
            case "CPout":
 
                segmentPoint.handleOut.x += delta.x;
                segmentPoint.handleOut.y += delta.y;

                cEl_groupHit.position = segmentPoint.point.add(segmentPoint.handleOut);
                CP_group = cEl_groupHit.parent;
                CP_group.children["CPLout"].firstSegment.point = cEl_groupHit.position;
                
            break;
            
        }
        
        resetCPBounds(cEl_groupBounds,cEl_group);
        
        // TODO precompute if needed to update the CP margins ...
        
        if (cEl_group.data.type === "text"){
            if(cEl_group.data.values.pattern === "path"){
                switch (typeCP) {
                    case "CP":
                        cEl_group.children["TextPath"].children[cEl_groupHit.data.indexLow].segments[cEl_groupHit.data.index].point = segmentPoint.point;
                    break;
                    case "CPin":
                    case "CPLin":
                        cEl_group.children["TextPath"].children[cEl_groupHit.data.indexLow].segments[cEl_groupHit.data.index].handleIn = segmentPoint.handleIn;
                    
//                        if(boolAlt){
//                            editCP(data,groupObject,delta,typeCP,boolAlt);
//                        }
                    
                    break;    
                    case "CPout":
                    case "CPLout":
                        cEl_group.children["TextPath"].children[cEl_groupHit.data.indexLow].segments[cEl_groupHit.data.index].handleOut = segmentPoint.handleOut;
                    break;
                }
            }else{
                cEl_group.reset.text_shape = true;
            }
        }
                
//        cEl_group.reset.debug = true;
        cEl_group.reset.text_draw = true;
        
        
        
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function resetCPBounds(boundsBefore,cEl_group){
    
    //cdebug(["before",cEl_group.bounds])();
    var scaleX = cEl_group.children["ShapePath"].bounds.width-boundsBefore.width;
    var scaleY = cEl_group.children["ShapePath"].bounds.height-boundsBefore.height;
    
    if(scaleX!==0||scaleY!==0){
        var bounds = cEl_group.children["ShapePath"].bounds;
        drawGroup_CP_bounds(cEl_group,bounds,"");
    }
    
}



function getEditVector(point,segmentPoint,delta,data){
    try{
        if(!data.cEl_groupCPdata.length)data.cEl_groupCPdata.length = point.length;

        var hitPoint = data.cEl_groupCPdata.hitPoint;
        var endPoint = hitPoint.add(delta);

        var vector1 = hitPoint.subtract(segmentPoint);
        var vector2 = vector1.add(delta);
        vector2.length = data.cEl_groupCPdata.length;
        
        
        data.cEl_groupCPdata.hitPoint = endPoint;
        
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


function setGroupScale(cEl_group,scaleX,scaleY,scalePoint){
    try{
        
        cEl_group.children["ShapePath"].scale(scaleX,scaleY, scalePoint);
        cEl_group.children["ControlPoints"].scale(scaleX,scaleY, scalePoint);
        
        if (cEl_group.data.type === "text"){
            if(cEl_group.data.values.pattern === "path"){
                cEl_group.children["TextPath"].scale(scaleX,scaleY, scalePoint);
                
            }else{
                cEl_group.reset.text_shape = true;
            }
        }
//        cEl_group.reset.debug = true;
        cEl_group.reset.text_draw = true;
        
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


//function undoLastCpEdit(cEl_caller, increment, boolResetActiveCp) {
//    
//    try {
//
//        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
//        if(cEl_layer.children.length===0)return false;
//        cEl_setCpCursor(cEl_layer,true);
//        cEl_restoreRefPoints(cEl_layer, increment,boolResetActiveCp);
//        cEl_layer.shape.redraw = true;
//        if(loadedPageAct){loadedPageAct.children[loadcanvas].shape.redraw = true;}
//        return true;
//        
//    } catch (e){
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

function cEl_setCpCursor(cEl_layer, cursor, hitObjType) {
    
    try{
        
        //if(cEl_layer.children.length===0 || cEl_layer.data.editIndex<0)return false;
        if(cursor){
            cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":cursor});
            cEl_layer.reset.cursor = true;
            return true;
        }
        
        if(!hitObjType)return false;
//        var hitObjType = cEl_groupCPdata.hitActType;
        
        switch (hitObjType) {
            case "body":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"move"});
            break;
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
            case "CPLin":
            case "CPLout":
            case "CP":
            case "CPin":
            case "CPout":

                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"crosshair"});

            break;

            default:

                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"default"});
            break;
        
        }
        
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


//function cEl_editActiveCp(cEl_caller){
//    
//    try{
//        
//        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
//        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
//        var cEl = window[cEl_layer.data.editIndex];
//        
//        if(cEl.shape.temp.activeCp){
//            var editIndex = cEl_layer.data.editIndex;
//            var eventholder = window["eventholder"];
//            var xy = eventholder.metrics.xy;
//            var scaleCP = [1,1];
//            scaleCP[0] = cEl_layer.shape.w * cEl.shape.scale[0];
//            scaleCP[1] = cEl_layer.shape.h * cEl.shape.scale[1];
//            
//            //cdebug(xy);
//            
//            switch(cEl.shape.temp.activeCp.tag){
//                // shape control points
//                case "controlpoint":
//                    
//                    cEl_editActiveCp_SCP(cEl_layer, cEl, editIndex, xy);
//
//                break;
//                // masspoint control point
//                case "masspoint":
//
//                    cEl_editActiveCp_MP(cEl_layer, cEl, editIndex, xy);
//
//                break;
//                // border and corners control points 
//                case "border":
//                case "corner":
//                    
//                    var boolTop = false, boolRight = false, boolBottom = false, boolLeft =false;
//
//                    switch(cEl.shape.temp.activeCp.value[5]){
//                        // border top - corner leftTop
//                        case 0:
//                            if(cEl.shape.temp.activeCp.value[2]===4)boolLeft = true;
//                            boolTop = true;
//                        break;
//                        // border right - corner topRight
//                        case 1:
//                            if(cEl.shape.temp.activeCp.value[2]===4)boolTop = true;
//                            boolRight = true;
//                        break;
//                        // border bottom - corner rightBottom
//                        case 2:
//                            if(cEl.shape.temp.activeCp.value[2]===4)boolRight = true;
//                            boolBottom = true;
//                        break;
//                        // border left - corner bottomLeft
//                        case 3:
//                            if(cEl.shape.temp.activeCp.value[2]===4)boolBottom = true;
//                            boolLeft = true;
//                        break;
//
//                    }
//                    
//                    var rfObj = get_undo_rf_position(cEl_layer.data.temp.rf, editIndex, 0, false, true);
//                    //cdebug(rfObj);
//                    var mpYcp = cEl_layer.shape.h * rfObj.shape.masspoint[1];
//                    var mpXcp = cEl_layer.shape.w * rfObj.shape.masspoint[0];
//                    
//                    // reset all shape points to match the new position
//                    for( var i=0, len = cEl.shape.points.length,yFactor,xFactor; i < len; i++){
//                        yFactor = (boolTop || boolBottom) ?(scaleCP[1]*rfObj.shape.points[i][1] + mpYcp - rfObj.shape.temp.cpBorder.y)/(rfObj.shape.temp.cpBorder.y1-rfObj.shape.temp.cpBorder.y):0;
//                        xFactor = (boolRight || boolLeft) ?(scaleCP[0]*rfObj.shape.points[i][0] + mpXcp - rfObj.shape.temp.cpBorder.x1)/(rfObj.shape.temp.cpBorder.x-rfObj.shape.temp.cpBorder.x1):0;
//                        if(boolTop){
//                            cEl.shape.points[i][1] = (yFactor * rfObj.shape.temp.cpBorder.y1  + xy[1] * (1 - yFactor) - mpYcp)/scaleCP[1];
//                        }
//                        if(boolBottom){
//                            cEl.shape.points[i][1] = (yFactor * xy[1] + rfObj.shape.temp.cpBorder.y * (1 - yFactor) - mpYcp)/scaleCP[1];
//                        }
//                        if(boolRight){
//                            cEl.shape.points[i][0] = (xFactor * rfObj.shape.temp.cpBorder.x  + xy[0] * (1 - xFactor) - mpXcp)/scaleCP[0];
//                        }
//                        if(boolLeft){
//                            cEl.shape.points[i][0] = (xFactor * xy[0] + rfObj.shape.temp.cpBorder.x1 * (1 - xFactor) - mpXcp)/scaleCP[0];
//                        }
//                    }
//                    if(boolRight || boolLeft || boolTop || boolBottom){
//                        reset_shape_stuff(cEl,false,true,true);
//                    }
//
//                break;
//
//            }
//            
//            cEl.shape.redraw = true;
//            cEl_layer.shape.redraw = true;
//            return true;
//        }else{
//            return false;
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

//function cEl_editActiveCp_SCP(cEl_layer, cEl, editIndex, xy){
//    
//    try{
//        
//        cdebug("test")();
//        
//        var scaleCP = [1,1];
//        scaleCP[0] = cEl_layer.shape.w * cEl.shape.scale[0];
//        scaleCP[1] = cEl_layer.shape.h * cEl.shape.scale[1];
//        cEl.shape.points[cEl.shape.temp.activeCp.value[3]] = [(xy[0] - cEl.shape.temp.cpMp[0])/scaleCP[0],(xy[1] - cEl.shape.temp.cpMp[1])/scaleCP[1]];
//        
//        reset_shape_stuff(cEl,false,true,true);
//
//        return true;
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function cEl_editActiveCp_MP(cEl_layer, cEl, editIndex, xy){
//    
//    try{
//        
//        //cdebug(cEl.shape,true,true);
//        
//        // reset masspoint
//        cEl.shape.masspoint = cEl_edit_MP(cEl_layer,xy,[1,1]);//[xy[0]/cEl_layer.shape.w,xy[1]/cEl_layer.shape.h];
//        //cEl_layer.shape.scale[0]*  cEl_layer.shape.scale[1]*
//        //cdebug(cEl.shape,false,true);
//        // reset children relative masspoints
//        if (cEl.children){
//            for (var i = cEl.children.length - 1, ofssetXY; i >= 0; i--) {
//                ofssetXY = [cEl.shape.temp.cpMp[0]-cEl.children[i].shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]-cEl.children[i].shape.temp.cpMp[1]];
//                cEl_editActiveCp_MP(cEl_layer, cEl.children[i], editIndex, [xy[0]-ofssetXY[0],xy[1]-ofssetXY[1]]);
//                //cEl.children[i].shape.redraw = true;
//            }
//        }
//        return true;
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


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

function select_CP(cEl_layer,xy,hitObject){
    try{    
//        cdebug(actObj.className)();
//        cdebug(actObj.name)();
        if(!hitObject.item)return false;
        
        
        
        if(paper.data.cEl_groupHit)paper.data.cEl_groupHit[paper.data.cEl_groupHit.data.drawType] = paper.data.cEl_groupHit.data.color;
        
        paper.data.cEl_groupHit = hitObject.item;
        
//        var bounds = paper.data.cEl_group.children["ShapePath"].bounds;
        paper.data.cEl_groupCPdata = null;
        
        paper.data.cEl_groupCPdata = paper.data.cEl_group.children["ShapePath"].bounds.clone(); //bounds;//.clone();
        
        paper.data.cEl_groupCPdata.hitPoint = new paper.Point(xy);
        paper.data.cEl_groupCPdata.name = hitObject.item.data.refersTo;
        paper.data.cEl_groupCPdata.hitActType = getHitActType(hitObject.item.name,hitObject);
        
        //cdebug(paper.data.cEl_group.children["ControlPoints"].children[0].children[0].clockwise)();
        
//      "sign":sign1(paper.data.cEl_group.children["ShapePath"].matrix.a)
        
        if(paper.data.cEl_groupCPdata.hitActType.default)hitObject.item[hitObject.item.data.drawType] = "rgba(255,0,0,0.4)";
        
        cEl_setCpCursor(cEl_layer,false,paper.data.cEl_groupCPdata.hitActType.name);
        

        paper.data.cEl_group.children["ShapePath"].applyMatrix = false;
        //paper.data.cEl_group.children["TextPath"].applyMatrix = false;
        
        return true;            
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }                    
}

function getHitActType(hitActType,hitObject){
    try{
        var hitType = hitObject.type;
        
        //cdebug(hitType + " >>> " + hitActType)();
        
        if(hitActType === "body"){
            switch(hitType){
                // main body    
                case "fill":
                    return {"name":hitActType,"default":true};
                break;
                // borders
                case "stroke":
//                    cdebug(hitObject.item.clockwise + " vs " + hitObject.location.index)();
//                    
//                    if(hitObject.item.clockwise){
                        switch(hitObject.location.index){
                            case 0:
                                return {"name":"borderLeft","default":false};
                            break;
                            case 1:
                                return {"name":"borderTop","default":false};
                            break;
                            case 2:
                                return {"name":"borderRight","default":false};
                            break;
                            case 3:
                                return {"name":"borderBottom","default":false};
                            break;
                        }
//                    }else{
//                        switch(hitObject.location.index){
//                            case 0:
//                                return {"name":"borderLeft","default":false};
//                            break;
//                            case 3:
//                                return {"name":"borderTop","default":false};
//                            break;
//                            case 2:
//                                return {"name":"borderRight","default":false};
//                            break;
//                            case 1:
//                                return {"name":"borderBottom","default":false};
//                            break;
//                        }
//                    }
                break;
                // corners
                case "segment":
                    
                    
                    
//                    if(hitObject.item.parent.clockwise){
                        switch(hitObject.segment.index){
                            case 0:
                                return {"name":"bottomLeft","default":false};
                            break;
                            case 1:
                                return {"name":"topLeft","default":false};
                            break;
                            case 2:
                                return {"name":"topRight","default":false};
                            break;
                            case 3:
                                return {"name":"bottomRight","default":false};
                            break;
                        }
//                    }else{
//                        switch(hitObject.segment.index){
//                            case 2:
//                                return {"name":"bottomLeft","default":false};
//                            break;
//                            case 3:
//                                return {"name":"topLeft","default":false};
//                            break;
//                            case 0:
//                                return {"name":"topRight","default":false};
//                            break;
//                            case 1:
//                                return {"name":"bottomRight","default":false};
//                            break;
//                        }   
//                    }
                break;
            }
        }
        return {"name":hitActType,"default":true};
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }  
}

function selectGroup(cEl_group){
    try{
        //cdebug("selectButton")();
        

        if(paper.data.cEl_group && paper.data.cEl_group.reset){
            paper.data.cEl_group.debug = false;
            paper.data.cEl_group.reset.debug = true;
        }
        
        if(cEl_group){
//            cdebug("here?")();
            cEl_group.debug = true;
            cEl_group.reset.debug = true;
            
            paper.data.cEl_group = cEl_group;
//            paper.data.cEl_groupCPdata = null;
//            paper.data.cEl_groupHit = null;
            paper.data.workState = "editlimbo";
        }else{
            paper.data.cEl_group = null;
//            paper.data.cEl_groupHit = null;
            paper.data.cEl_groupCPdata = null;
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
            paper.data.cEl_group.remove();
        }
        
        paper.data.cEl_group = null;
        paper.data.cEl_groupHit = null;
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
        
        if(paper.data.cEl_group && paper.data.cEl_group.reset){
            paper.data.cEl_group.reset.debug = true;
            paper.data.cEl_group.debug = false;
        }
        paper.data.cEl_group = null;

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
            
            
//            if(paper.data.cEl_group && eventholder.keys.buttons ===1){
//                            
////                           paper.data.cEl_group.shape.masspoint = cEl_edit_MP(paper.data.cEl_group.parent,eventholder.metrics.xy,paper.data.cEl_group.parent.shape.scale);
////                           paper.data.cEl_group.reset.layout_shape =true;
////                            cdebug(paper.data.cEl_group.position)();
////                            cdebug(eventholder.metrics.delta)(); 
//
////                            cdebug(paper.data.cEl_group.name)();
//                            
//                            paper.data.cEl_group.position = new paper.Point([paper.data.cEl_group.position.x + eventholder.metrics.delta.x,paper.data.cEl_group.position.y + eventholder.metrics.delta.y]);
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
        
        var cpObject = paper.data.cEl_groupHit;
        var cp_group = cpObject.parent;
        
//        var len = cp_group.children.length;
//        var offset = boolDescending ? -1:1;
//        var start = boolDescending ? 0:-1;
//        var end = boolDescending ? len:len-1;
//        var def = boolDescending ? len-1:0;
//        
//        
//        
//        var cEl_layer = data.workLayer;
        
        
//            if(cpObject.index>start && cpObject.index<end){
//                newIndex = cpObject.index + offset;
////                cdebug([cp_group.children[newIndex].name,cp_group.children[newIndex].data,cp_group.children[newIndex].className])();
////                if(cp_group.children[newIndex].className === "Group"){
////                    return true;
////                }else{
//                    select_CP(cEl_layer,[0,0],cp_group.children[newIndex]);
//                    return true;
////                }
//            }else{
//                return true;
//            }
//        }    
//        select_CP(cEl_layer,[0,0],cp_group.children[def]);
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function group_tabulation(cEl_layer,cEl_group,boolDescending){
    try{
        
//        cdebug([cEl_group.name,cEl_group.index])();
        
        var newIndex;
        var len = cEl_layer.children.length;
        var offset = boolDescending ? -1:1;
        var start = boolDescending ? 1:0;
        var end = boolDescending ? len:len-1;
        var def = boolDescending ? len-1:1;
        
        if(cEl_group && cEl_group.index){
            if(cEl_group.index>start && cEl_group.index<end){
                newIndex = cEl_group.index + offset;
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