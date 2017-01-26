////function drawGroup_CP_old(cEl_group){
//    try{
//        
////        cdebug("start")();
//        cEl_group.children[4].removeChildren();
////        cdebug(cEl_group.name + "  vs   " + cEl_group.debug)();
//        
//        if(!cEl_group.debug)return true;
//        
////        cdebug(paper.data.workObjectHit.name)();
//
////        cdebug(paper.data.workState)();
//        
//        
//        var bounds = cEl_group.children[0].bounds;
//        var size,path,radius;
//        var selectedName,selectedId;
//        
//        var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name ;
//        if(paper.data.workObjectHit){
//            selectedName = paper.data.workObjectHit.name;
//            selectedId = paper.data.workObjectHit.cp;
//            boolSelectedId = true;
//        }else{
//            boolSelectedId = false;
//            selectedName = "";
//            selectedId = -1;
//        }
//        
//        
//        radius = GLOBAL_editSize;
//
//        var colorBKG = "rgba(255,255,255,0.5)";
//        var colorCPout = "rgba(0,0,255,0.8)";
//        var colorCPin = "rgba(0,255,0,0.8)";
//        var colorCP = "rgba(255,111,111,0.8)";
//        var colorCorner = "rgba(111,111,111,0.7)";
//        var colorBorder = "rgba(111,111,111,0.4)";
//        
//        var selectedColor = "rgba(255,0,0,0.6)";
//        var selectedColor2 = "rgba(255,0,0,0.2)";
////        cdebug(selectedName)();
//        
//
//        // set background
//        size = new Size(bounds.width-radius, bounds.height-radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topLeft.x+radius/2,bounds.topLeft.y+radius/2],size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".body"===selectedName)?selectedColor2:colorBKG;
//        path.name = cEl_groupName + ".body";
//        path.cp = -9;
//
//
//
//        // draw borders
//        
//        size = new Size(bounds.width-2*radius, radius/2);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topLeft.x+radius,bounds.topLeft.y],size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".borderTop"===selectedName )?selectedColor:colorBorder;//|| cEl_groupName + ".topLeft"===selectedName
//        path.name = cEl_groupName + ".borderTop";
//        path.cp = -8;
//        
//        size = new Size(radius/2, bounds.height-2*radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.topRight.x-radius/2,bounds.topRight.y+radius],size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".borderRight"===selectedName)?selectedColor:colorBorder;
//        path.name = cEl_groupName + ".borderRight";
//        path.cp = -7;
//        
//        size = new Size(-bounds.width+2*radius, radius/2);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.bottomRight.x-radius,bounds.bottomRight.y-radius/2],size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".borderBottom"===selectedName)?selectedColor:colorBorder;
//        path.name = cEl_groupName + ".borderBottom";
//        path.cp = -6;
//        
//        size = new Size(radius/2, -bounds.height+2*radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle([bounds.bottomLeft.x,bounds.bottomLeft.y-radius],size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".borderLeft"===selectedName)?selectedColor:colorBorder;
//        path.name = cEl_groupName + ".borderLeft";
//        path.cp = -5;
//        // draw corners
//        
//        size = new Size(radius, radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.topLeft,size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".topLeft"===selectedName)?selectedColor:colorCorner;
//        path.name = cEl_groupName + ".topLeft";
//        path.cp = -4;
//        
//        size = new Size(-radius, radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.topRight,size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".topRight"===selectedName)?selectedColor:colorCorner;
//        path.name = cEl_groupName + ".topRight";
//        path.cp = -3;
//        
//        size = new Size(-radius, -radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.bottomRight,size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".bottomRight"===selectedName)?selectedColor:colorCorner;
//        path.name = cEl_groupName + ".bottomRight";
//        path.cp = -2;
//        
//        size = new Size(radius, -radius);
//        path = cEl_group.children[4].addChild(new paper.Path.Rectangle(bounds.bottomLeft,size));
//        path.fillColor = (boolSelectedId && cEl_groupName + ".bottomLeft"===selectedName)?selectedColor:colorCorner;
//        path.name = cEl_groupName + ".bottomLeft";
//        path.cp = -1;
//        // draw control points and handles
//        
//        for(var i = 0,boolHandles,boolSelectedId,segment,point,pointHandleIn,pointHandleOut;i<cEl_group.children[0].children[0].segments.length;i++){
//            size = new Size(radius/2, radius/2);
//            segment = cEl_group.children[0].children[0].segments[i];
//            point = segment.point;
//            boolHandles = segment.hasHandles();
//            boolSelectedId = (i===selectedId);
//            
//            var CP_group = cEl_group.children[4].addChild(new paper.Group);
//            CP_group.name = ".CPGR";
//            CP_group.cp = i;
//            
//            // draw handles lines
//            if(boolHandles){
//                pointHandleIn = segment.handleIn;
//                pointHandleOut = segment.handleOut;
//                
//                path = CP_group.addChild(new Path.Line([pointHandleIn.x+point.x,pointHandleIn.y+point.y], point));
//                path.strokeColor = (boolSelectedId && cEl_groupName + ".CPLin"===selectedName)?selectedColor:colorCPin;
//                path.name = cEl_groupName + ".CPLin";
//                path.cp = i;
//
//                path = CP_group.addChild(new Path.Line(point, [pointHandleOut.x+point.x,pointHandleOut.y+point.y]));
//                path.strokeColor = (boolSelectedId && cEl_groupName + ".CPLout"===selectedName)?selectedColor:colorCPout;
//                path.name = cEl_groupName + ".CPLout";
//                path.cp = i;
//            }
//            
//            // draw CP point
//            path = CP_group.addChild(new paper.Path.Rectangle([point.x-radius/4,point.y-radius/4],size));
//            path.fillColor = (boolSelectedId && cEl_groupName + ".CP"===selectedName)?selectedColor:colorCP;
//            path.name = cEl_groupName + ".CP";
//            path.cp = i;
//            
//            // draw handles points
//            if(boolHandles){
//                path = CP_group.addChild(new paper.Path.Rectangle([pointHandleIn.x+point.x-radius/4,pointHandleIn.y+point.y-radius/4],size));
//                path.fillColor = (boolSelectedId && cEl_groupName + ".CPin"===selectedName)?selectedColor:colorCPin;
//                path.name = cEl_groupName + ".CPin";
//                path.cp = i;
//                
//                path = CP_group.addChild(new paper.Path.Rectangle([pointHandleOut.x+point.x-radius/4,pointHandleOut.y+point.y-radius/4],size));
//                path.fillColor = (boolSelectedId && cEl_groupName + ".CPout"===selectedName)?selectedColor:colorCPout;
//                path.name = cEl_groupName + ".CPout";
//                path.cp = i;
//            }
//        };
//        
//        
////        path.strokeWidth = radius/2;
////        path.strokeColor = color;
//        
////        path.selected = true;
////        cdebug("end")();
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
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
//function cEl_setActiveCp(cEl_caller){
//    
//    try{
//        
//        var cEl_layer = window[cEl_caller.pageId + "_fabric"];
//        if(cEl_layer.children.length===0 || !cEl_layer.data.editIndex)return false;
//        var cEl = window[cEl_layer.data.editIndex];
//        var eventholder = window["eventholder"];
//        var xy = eventholder.metrics.xy;
//        
//        var deltaCP = 6;
//        var deltaMP = 7;
//        var deltaBL = 8;
//        var deltaBC = 7;
//        cEl.shape.temp.activeCp = null;
//        
//        // set as massPoint
//        if(Math.abs(cEl.shape.temp.cpMp[0]-xy[0])<=deltaMP && Math.abs(cEl.shape.temp.cpMp[1]-xy[1])<=deltaMP){
//            cEl.shape.temp.activeCp = {"type":"mp","tag":"masspoint","value":cEl.shape.temp.cpMp,"xy":[cEl.shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]]};
//            //cEl.shape.temp.activeCp = cEl.shape.temp.cpMp;
//            return true;
//        }
//
//        // set as shape point
//        for(var i = 0, pointsLen = cEl.shape.temp.cp.length; i < pointsLen; i++){
//            if(Math.abs(cEl.shape.temp.cp[i][0]-xy[0])<=deltaCP && Math.abs(cEl.shape.temp.cp[i][1]-xy[1])<=deltaCP){
//                cEl.shape.temp.activeCp = {"type":"scp","tag":"controlpoint","value":cEl.shape.temp.cp[i],"xy":[cEl.shape.temp.cp[i][0],cEl.shape.temp.cp[i][1]]};
//                //cEl.shape.temp.activeCp = cEl.shape.temp.cp[i];
//                return true;
//            }
//        }
//        
//        // set as borderPoints --- sides or corners
//        var cpBorder = cEl.shape.temp.cpBorder;
//        // corner top left
//        if(Math.abs(cpBorder.x-xy[0])<=deltaBL && Math.abs(cpBorder.y-xy[1])<=deltaBL){
//            cEl.shape.temp.activeCp = {"type":"tl","tag":"corner","value":[cpBorder.x,cpBorder.y,4,1,1,0],"xy":[cpBorder.x,cpBorder.y]};
//            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y,4,1,1,0];
//            return true;
//        }
//        // corner top right
//        if(Math.abs(cpBorder.x1-xy[0])<=deltaBL && Math.abs(cpBorder.y-xy[1])<=deltaBL){
//            cEl.shape.temp.activeCp = {"type":"tr","tag":"corner","value":[cpBorder.x1,cpBorder.y,4,-1,1,1],"xy":[cpBorder.x1,cpBorder.y]};
//            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y,4,-1,1,1];
//            return true;
//        }
//        // corner bottom right
//        if(Math.abs(cpBorder.x1-xy[0])<=deltaBL && Math.abs(cpBorder.y1-xy[1])<=deltaBL){
//            cEl.shape.temp.activeCp = {"type":"br","tag":"corner","value":[cpBorder.x1,cpBorder.y1,4,-1,-1,2],"xy":[cpBorder.x1,cpBorder.y1]};
//            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y1,4,-1,-1,2];
//            return true;
//        }
//        // corner bottom left
//        if(Math.abs(cpBorder.x-xy[0])<=deltaBL && Math.abs(cpBorder.y1-xy[1])<=deltaBL){
//            cEl.shape.temp.activeCp = {"type":"bl","tag":"corner","value":[cpBorder.x,cpBorder.y1,4,1,-1,3],"xy":[cpBorder.x,cpBorder.y1]};
//            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y1,4,1,-1,3];
//            return true;
//        }
//        
//
//        // set as border lines
//        //border top
//        if(cpBorder.x1-xy[0]>=deltaBC && cpBorder.x-xy[0]<=deltaBC && Math.abs(cpBorder.y-xy[1])<=deltaBC){
//            cEl.shape.temp.activeCp = {"type":"t","tag":"border","value":[cpBorder.x,cpBorder.y,5,cpBorder.x1,cpBorder.y,0],"xy":[cpBorder.x,cpBorder.y]};
//            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y,5,cpBorder.x1,cpBorder.y,0];
//            return true;
//        }
//        //border right
//        if(cpBorder.y-xy[1]<=deltaBC && cpBorder.y1-xy[1]>=deltaBC && Math.abs(cpBorder.x1-xy[0])<=deltaBC){
//            cEl.shape.temp.activeCp = {"type":"r","tag":"border","value":[cpBorder.x1,cpBorder.y,5,cpBorder.x1,cpBorder.y1,1],"xy":[cpBorder.x1,cpBorder.y]};
//            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y,5,cpBorder.x1,cpBorder.y1,1];
//            return true;
//        }
//        //border bottom
//        if(cpBorder.x1-xy[0]>=deltaBC && cpBorder.x-xy[0]<=deltaBC && Math.abs(cpBorder.y1-xy[1])<=deltaBC){
//            cEl.shape.temp.activeCp = {"type":"b","tag":"border","value":[cpBorder.x1,cpBorder.y1,5,cpBorder.x,cpBorder.y1,2],"xy":[cpBorder.x1,cpBorder.y1]};
//            //cEl.shape.temp.activeCp = [cpBorder.x1,cpBorder.y1,5,cpBorder.x,cpBorder.y1,2];
//            return true;
//        }
//        //border left
//        if(cpBorder.y-xy[1]<=deltaBC && cpBorder.y1-xy[1]>=deltaBC && Math.abs(cpBorder.x-xy[0])<=deltaBC){
//            cEl.shape.temp.activeCp = {"type":"l","tag":"border","value":[cpBorder.x,cpBorder.y1,5,cpBorder.x,cpBorder.y,3],"xy":[cpBorder.x,cpBorder.y1]};
//            //cEl.shape.temp.activeCp = [cpBorder.x,cpBorder.y1,5,cpBorder.x,cpBorder.y,3];
//            return true;
//        }
//        
//        return false;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
////function editor_keypress(cEl_layer) {
//    // BEWARE triggers right after keydowns event, however it does not trigger for all keys (non printable)
//    try{
//        //var cEl_layer = window[cEl.layerId];
//        var eventholder = window["eventholder"];
//        switch (cEl_layer.name) {
//            case "fabric":
//                //cdebug("editor_keypress START state " + cEl_layer.data.state,true)();
//                
//                switch (cEl_layer.data.state) {
//                    case "editlimbo":
//                        switch(eventholder.keys.keyCode){
//                            case 13: //save ref point
//                                saveLastCpEdit(cEl_layer,"edit");
//                            break;
//                            case 26: //undo refpoint
//                                undoLastCpEdit(cEl_layer,-1);
//                                //cEl_layer.shape.redraw = true;
//                            break;
//                            case 25: //redo refpoint
//                                undoLastCpEdit(cEl_layer,1);
//                                //cEl_layer.shape.redraw = true;
//                            break;
//                        }
//                    break;
//                    default:
//                        switch(eventholder.keys.keyCode){
//                            case 26: //undo refpoint
//                                undoLastCpEdit(cEl_layer,-1);
//                                //cEl_layer.shape.redraw = true;
//                            break;
//                            case 25: //redo refpoint
//                                undoLastCpEdit(cEl_layer,1);
//                                //cEl_layer.shape.redraw = true;
//                            break;
//                        }
//                    break;
//                }
//                //cdebug("editor_keypress END state " + cEl_layer.data.state)();
//            break;
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
////var editorTool = new paper.Tool();
//editorTool.onMouseDown = editor_handleMouse;
//editorTool.onMouseMove = editor_handleMouse;
//editorTool.onMouseUp = editor_handleMouse;
//editorTool.onKeyDown = editor_handleKeys;
//editorTool.onKeyUp = editor_handleKeys;


//function editor_handleKeys(paperEvt) {
//    
//    try{
//        
//        paperEvt.stop();
//        
//        var eventholder = window["eventholder"];
////        if(!eventholder.active.oldObj)return false;
//        
//        var cEl_layer = paper.project.activeLayer;
//        switch (cEl_layer.name) {
//            case "editTool1":
//            case "editTool2":
////                cdebug("here1")();
//                preSetEventHolder(eventholder,paperEvt,"keyboard");
//                if (eventholder.noevent){return false;};
//                return globalEvents(eventholder);
//                
//            break;
//            default:
//                //cdebug("here2")();
//                preSetEventHolder(eventholder,paperEvt,"keyboard",true);
//                //cdebug("here2a")();
//                
//                if (eventholder.noevent){return false;};
//                return editorEvents(eventholder);
//                
//            break;
//        }
//        
//        return true;
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};
//
//
//function editorEvents(eventholder){
//    try{
//
//        switch(eventholder.type){
//
//            case "mousedown":
//                
//                updateEventHolder(eventholder,false,true,true);
//                handleCSSEvents(eventholder,false,true,true,true);
//
//                editor_mousedown(eventholder);
//
//                drawProjects(paper.project,false);
//
//            break;
//            
//            case "mouseup":
//                
//                updateEventHolder(eventholder,true,false,false);
//                handleCSSEvents(eventholder,true,false,false,true);
//
//                editor_mouseup(eventholder);
//
//                drawProjects(paper.project,false);
//
//            break;
//            
//            case "mousemove":
//
//
//                updateEventHolder(eventholder,true,false,false);
//                handleCSSEvents(eventholder,true,false,false,true);
//
//                editor_mousemove(eventholder);
//
//                drawProjects(paper.project,false);
//
//            break;
//            
//            case "keydown":
//                
//                editor_keydown(eventholder);
//                
//                drawProjects(paper,true);
//                
//            break;
//            
//            case "keyup":
//                
//                if(eventholder.keys.shiftKey && eventholder.keys.ctrlKey){
//                    // check edit mode combination CTRL + SHIFT + "E" or "e"
//                    if(editMode(eventholder)){
//                        drawProjects(paper,true);
//                        return true;
//                    }    
//                }
//                
//                editor_keyup(eventholder);
//                
//                drawProjects(paper,true);
//            break;
//            
//            
////                    case "mouseout":
////
////                        drawProjects(paper,true);
////
////                    break;
//        };
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}
//
//function editor_handleMouse(evt) {
//    
//    try{
//
//
//        var eventholder = window["eventholder"];
//        var cEl_layer = paper.project.activeLayer;
//        
//        switch (cEl_layer.name) {
//            case "editTool1":
//            case "editTool2":
//                //cdebug("here")();
//                
//                preSetEventHolder(eventholder,evt,"mouse");
//                if (eventholder.noevent){return false;};
//                return globalEvents(eventholder);
//                
//            break;
//            default:
//                
//                preSetEventHolder(eventholder,evt,"mouse",true);
//                if (eventholder.noevent){return false;};
//                return editorEvents(eventholder);
//                
//            break;
//        }
//        
//        return true;
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};


//
//function cEl_set_CpBorder(cpBorder,x,y){
//    
//    try{    
//        if(cpBorder.x > x){ cpBorder.x = x;}
//        if(cpBorder.y > y){ cpBorder.y = y;}
//        if(cpBorder.x1 < x){ cpBorder.x1 = x;}
//        if(cpBorder.y1 < y){ cpBorder.y1 = y;}
//        return cpBorder;
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
////
//function addDrawShape(cEl_layer, boolFinalise) {
//    
//    try{
//        
//        // TODO hmmm, move this to autoGLOBAL_renderering when drawing the canvas editor ( like the grid thingy )
//        var eventholder = window["eventholder"];
//        
//        if (!cEl_layer.data.temp || !cEl_layer.data.temp.drawPoints) {
//            cEl_layer.data.temp.drawPoints = [];
//        }
//        if (!cEl_layer.data.temp.drawPoints[0]) {
//            cEl_layer.data.temp.drawPoints[0] = [eventholder.metrics.xy[0],eventholder.metrics.xy[1]];
//        }
//        var lastItem = cEl_layer.data.temp.drawPoints.length;
//        var intLastPosX0, intLastPosY0;
//        intLastPosX0 = cEl_layer.data.temp.drawPoints[lastItem - 1][0];
//        intLastPosY0 = cEl_layer.data.temp.drawPoints[lastItem - 1][1];
//        
//        
//        var cEl_ctx = document.getElementById(cEl_layer.pageId + "_" + cEl_layer.layerId + "_canvas").getContext('2d');
//        cEl_ctx.beginPath();
//        cEl_ctx.moveTo(intLastPosX0, intLastPosY0);
//        if (boolFinalise) {
//            cEl_ctx.lineTo(cEl_layer.data.temp.drawPoints[0][0], cEl_layer.data.temp.drawPoints[0][1]);
//        } else {
//            cEl_ctx.lineTo(eventholder.metrics.xy[0], eventholder.metrics.xy[1]);
//            /// also add to the cEl_layer.data.temp.drawPoints array
//            cEl_layer.data.temp.drawPoints.push(eventholder.metrics.xy);
//        }
//
//        cEl_ctx.closePath();
//        cEl_ctx.strokeStyle = "rgba(150,150,150,0.7)";
//        cEl_ctx.lineWidth = 1;
//        cEl_ctx.stroke();
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
////function makeElPairs(cEl_layer, masspoint ,reduction, delta) {
//
//    // clear fabric canvas
//    try{
//        
//        var arrAproxShape = createAprox(cEl_layer, reduction, delta, masspoint);
//        
//        
//        if (arrAproxShape.length > 6) {
//            
//            // add shape to page shapes
//            var shape_id = id_generator("sh", 8);
//            var page = window[cEl_layer.pageId];
//           
//            // create new element 
//            var cEl_id = id_generator("el", 8);
//            var cEl_new = {
//                "id":cEl_id,
//                "layerId":cEl_layer.name,
//                "pageId":page.name,
//                "parentName":page.name + "_" + cEl_layer.name,
//                "tab":22,
//                "class":"btnBlue1",
//                "tag":"group",
//                "visible":true,"enabled":false,"focus":false,"hover":false,"active":false,
//                "events":null,
//                "loaded":false,
//                "shape":{
//                    "redraw":true,
//                    "masspoint":masspoint,
//                    "id":shape_id,
//                    "type":"bezier",
//                    "scale":[1,1],
//                    "detection":"shape"
//                },
//                "data":{
//                    "type":"button"
//                }
//            };
//            
//            var cEl_new_load = $.extend(true,{},cEl_new);
//            
//            if(cEl_layer.children){
//                cEl_layer.children.push(cEl_new_load);
//            }else{
//                cEl_layer.children = [cEl_new_load];
//            }
//            
//            cEl_layer.data.editIndex = page.name + "_" + cEl_layer.name + "_" + cEl_id;
//            
//            
//            page.shapes[shape_id] = arrAproxShape;
//            cdebug(arrAproxShape,true,true,0)();
//            pre_load_children(cEl_new_load,cEl_layer.pageId,cEl_layer.name,cEl_layer.pageId + "_" +cEl_layer.name);
//            
//            if(loadedPageAct){
//                loadedPageAct.shapes[shape_id] = arrAproxShape;
//                var edit_layer = loadedPageAct.children[loadcanvas];
//                cEl_new.enabled = true;
//                edit_layer.children.push(cEl_new);
//                pre_load_children(cEl_new,edit_layer.pageId,edit_layer.name,edit_layer.pageId + "_" +edit_layer.name);
//                cEl_new_load.shape = cEl_new.shape;
//                //cdebug(edit_layer.name)();
//                
//            }
//            //cEl_layer.shape.redraw = true;
//            //GLOBAL_renderer = true;
//            
//            
//////      ctx.clearRect(0, 0, cEl_layer.cShape[3], cEl_layer.cShape[4]);
//////      var ctxPreview = retCanvCtxById(preview.cCanvId);
//////      ctxPreview.clearRect(0, 0, preview.cShape[3], preview.cShape[4]);
////        //var arrAproxShape2 = createAprox(cEl_layer,2,2);
////
////        var zoomMax, lambda, half, iterations, tick, bool2Way;
////        zoomMax = 1.5;
////        lambda = 3;
////        half = 10;
////        iterations = 10;
////        tick = 30;
////        bool2Way = true;
//////
//////      zoomAround(arrActEl[2],preview,zoomMax,lambda,half,iterations,tick,true);
////
////        //var ojCreatorCounter = preview.cChildren.length + 1;
////        var objName = id_generator("cObj_", 6);
////        window[objName + "_edit"] = new cElement(objName + "_edit", "hearts2", "shape", "", 2, arrAproxShape, false, null, true, 1, cEl_layer.cId, cEl_layer.cId, [], null, null, objName, true);
////        window[objName] = new cElement(objName, "hearts2", "shape", "background-color-edit-on:#aaaaaa;onmousemove:zoomAround('" + objName + "',preview," + zoomMax + "," + lambda + "," + half + "," + iterations + "," + tick + "," + bool2Way + ");", 2, arrAproxShape, true, null, true, 1, viewCanv.cId, viewCanv.cId, [], null, null, objName, true);
////
////        window[objName].cShapeObf = window[objName + "_edit"].cShapeObf;
////
////        localStorage.EditFocus = objName + "_edit";
////
////        //drawChildren(viewCanv);
////        //drawChildren(cEl_layer, true);
////        drawCP(window[objName + "_edit"]);
////
////        //saveMe();
////        resetMe();
////        cEl_layer.cValStore = [];
//            return true;
//        }
//        return false;
//    } catch (e) {
//            var err = listError(e);
//            cdebug(err,false,false,3)();
//        return err;
//    }
//
//}
//
//function createAprox (cEl_layer, reduction, delta, masspoint){
//    try{
//        if(!cEl_layer.data.temp)return [];
//        if(!delta){delta = 1;}
//        var deltaAct=0;
//        var drawArrayIn = cEl_layer.data.temp.drawPoints;
//        var drawLength = drawArrayIn.length;
//        var actRed = Math.floor(reduction*6);
//        if (actRed === 0){actRed = 1;} 
//        var drawArrayOut = [];
//        var last = drawLength - 6;
//        var lastArrOut = -1;
//        var boolCloseIt = false;
//        var master = 0;
//
//        for(var i = 0; i < drawLength; i++){
//            if(i%reduction===0){
//                if(master===6){master = 0;};
//
//                if(i > last){
//                    boolCloseIt = true;
//                }
//
//                // add elements only if aprox distance is greater then delta
//                if(lastArrOut > 0 && boolCloseIt===false){
//                    deltaAct = lineDelta(drawArrayOut[lastArrOut],[drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
//                    if( deltaAct >= delta){
//                        drawArrayOut.push([drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
//                        lastArrOut++;
//                        master++;
//                    }
//                }else{
//                    if (master === 0 && boolCloseIt){
//                        break;
//                    }else{
//                        drawArrayOut.push([drawArrayIn[i][0]/cEl_layer.shape.w-masspoint[0],drawArrayIn[i][1]/cEl_layer.shape.h-masspoint[1]]);
//                        lastArrOut++;
//                        master++;
//                    }
//                }    
//            }
//        }
//        return drawArrayOut;
//        } catch (e) {
//            var err = listError(e);
//            cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//function cEl_editIndex(cEl_caller, boolNext, boolParent) {
//    
//    try {
//        var boolReset = false;
//        
//        cEl_caller = window["editorPage_fabric"];
//        
//        if(!cEl_caller.data.editIndex && cEl_caller.children){
//            boolReset = true;
//            
//            if(boolParent){
//                cEl_caller.data.editIndex = cEl_caller.children[0].parentName + "_" + cEl_caller.children[0].name;
//            }else{
//                if(boolNext){
//                    cEl_caller.data.editIndex = cEl_caller.children[0].parentName + "_" + cEl_caller.children[0].name;
//                }else{
//                    cEl_caller.data.editIndex = cEl_caller.children[cEl_caller.children.length-1].parentName + "_" + cEl_caller.children[cEl_caller.children.length-1].name;
//                }
//            }
//
//        }else if(cEl_caller.data.editIndex){
//            var cEl_actualIndex = window[cEl_caller.data.editIndex];
//            
//            if(boolParent){
//                if(!boolNext){
//                    if(window[cEl_actualIndex.parentName].tag!=="canvas"){
//                        cEl_caller.data.editIndex = cEl_actualIndex.parentName;
//                        boolReset = true;
//                    }
//                }else{
//                    if(cEl_actualIndex.children){
//                        cEl_caller.data.editIndex = cEl_actualIndex.children[0].parentName + "_" + cEl_actualIndex.children[0].name;
//                        boolReset = true;
//                    }
//                }
//            
//            }else{
//                
//
//                var cEl_lookInto = window[cEl_actualIndex.parentName];
//
//                //cdebug("here look into  " + cEl_lookInto.name)();
//                //cdebug("...of           " + cEl_caller.data.editIndex)();
//
//                if(boolNext){
//                    for(var i = 0;i<cEl_lookInto.children.length-1;i++){
//                        if(cEl_caller.data.editIndex === cEl_lookInto.children[i].parentName + "_" + cEl_lookInto.children[i].name){
//                            cEl_caller.data.editIndex = cEl_lookInto.children[i+1].parentName + "_" + cEl_lookInto.children[i+1].name;
//                            boolReset = true;
//                            break;
//                        }
//                    }
//                }else{
//                    for(var i = cEl_lookInto.children.length-1;i>0;i--){
//                        if(cEl_caller.data.editIndex === cEl_lookInto.children[i].parentName + "_" + cEl_lookInto.children[i].name){
//                            cEl_caller.data.editIndex = cEl_lookInto.children[i-1].parentName + "_" + cEl_lookInto.children[i-1].name;
//                            boolReset = true;
//                            break;
//                        }
//                    }
//                }
//            }
//            //cdebug("... set to           " + cEl_caller.data.editIndex)();
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
//                        
//                        
//                        //                        }else if(eventholder.metrics.delta.x<0){
////                            cdebug(scaleX + " vs " + eventholder.metrics.delta.x)();
//                            paper.data.workObject.children[1].scale(1-scaleX,1, paper.data.workObjectBounds.rightCenter);
//                            paper.data.workObject.children[0].scale(1-scaleX,1, paper.data.workObjectBounds.rightCenter);
//                            paper.data.workObject.reset.text_draw = true;
//                            paper.data.workObject.reset.debug = true;
//                        }else{
//
//                        }
//                        var scaleX = paper.data.workObject.children[0].matrix.a - eventholder.metrics.delta.x/paper.data.workObjectBounds.width;
//                        var translateX = paper.data.workObject.children[0].matrix.tx + eventholder.metrics.delta.x/2;
////                        cdebug(scaleX)();
//                        
//                        paper.data.workObject.children[0].matrix.set(scaleX, 0, 0, 1 ,translateX, 0);
                        //paper.data.workObject.children[0].matrix.translate(eventholder.metrics.delta.x/2,0);
//                        paper.data.workObject.children[1].matrix.set(scaleX, 0, 0, 1,0, 0);
//                        paper.data.workObject.reset.text_draw = true;
//                      cdebug((1-scaleX) + " vs " + eventholder.metrics.delta)();
//                        cdebug(paper.data.workObject.children[0].position)();
//                        cdebug(paper.data.workObject.children[0].children[0])();



//function getCharPos(lines,xy){
//    try{
//        //if(!startPos || startPos === -1)startPos = 0;
//        // do a direct search
//        
//        cdebug(xy)();
//        
//        
//        var pos=0;
//        var boolLeft = false;
//        for(var i = 0, chrObj,offsetXY,actY=0,boolYset=false,len = lines.length; i<len;i++){
//            pos = i;
//            chrObj = lines[i];
//            if(chrObj.point){
//
//                offsetXY = [-chrObj.w/2,0];
//
//                if(chrObj.point.y>xy[1]+offsetXY[1]){
//                    pos = i;
//                    if(!boolYset){
//                        boolYset = true;
//                        actY = chrObj.point.y;
//                    }
//                    if(chrObj.point.x>xy[0]+offsetXY[0]){
//                        pos = i;
//                        boolLeft =true;
//                        break;
//                    }
//                }
//                
//                if(boolYset){
//                    //cdebug(actY > chrObj.xy[1],false,true);
//                    if(actY < chrObj.point.y){
//                        pos = i-1;
//                        boolLeft = false;
//                        break;
//                    }
//                }
//            }
//        }
//        //cdebug(lines[pos],true,true);
//        //cdebug({"pos":pos,"left":boolLeft},false,true)();
//        return {"pos":pos,"left":boolLeft};
//                            
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}



//function draw_chr(chrObj,charpos,cEl_ctx,cEl_Selection,boolHasSelection){
//    
//    try{
//        
////        alphabetic font proportions, total of 1.5
////        -0.3
////        1
////        1.05
////        1.2
//
//        if(boolHasSelection){
//            
//            
//            if(chrObj.pr){
//                var boolIsNotMatched = true;
//                var boolDrawSelection = false;
//                // check if in char @ position
//                if(boolIsNotMatched){
//                    for (var i=0, len = cEl_Selection.charspos.length; i < len; i++){
//                        if(cEl_Selection.charspos[i] === charpos){
//                            boolIsNotMatched =true;
//                            boolDrawSelection = true;
//                            break;
//                        }
//                    }
//                }
////                // check if in word @ position
////                if(boolIsNotMatched){
////                    for (var i=0, len = cEl_Selection.wordspos.length; i < len; i++){
////                        if(cEl_Selection.wordspos[i] === chrObj.pp + "_" + chrObj.sc){
////                            boolIsNotMatched =true;
////                            boolDrawSelection = true;
////                            break;
////                        }
////                    }
////                }
////                // check if in word
////                if(boolIsNotMatched){
////                    for (var i=0, len = cEl_Selection.wordspos.length; i < len; i++){
////                        if(cEl_Selection.wordspos[i] === chrObj.sc){
////                            boolIsNotMatched =true;
////                            boolDrawSelection = true;
////                            break;
////                        }
////                    }
////                }
////                // check if in paragraph
////                if(boolIsNotMatched){
////                    for (var i=0, len = cEl_Selection.paragraphspos.length; i < len; i++){
////                        if(cEl_Selection.paragraphspos[i] === chrObj.pp){
////                            boolIsNotMatched =true;
////                            boolDrawSelection = true;
////                            break;
////                        }
////                    }
////                }
//                if(boolDrawSelection){
//                    cEl_ctx.save();
//                    draw_chr_selection(chrObj,cEl_Selection,cEl_ctx);
//                }
//                if(chrObj.r){
//                    
////                    cEl_ctx.translate(chrObj.xy[0],chrObj.xy[1]);
////                    cEl_ctx.rotate(chrObj.r*2*Math.PI);
////                    cEl_ctx.translate(-chrObj.xy[0],-chrObj.xy[1]);
//                    
//                }else{
//                    cEl_ctx.fillText(chrObj.chr,chrObj.xy[0],chrObj.xy[1]);
//                }
//                if(boolDrawSelection)cEl_ctx.restore();
//            }
//        }else{
//            if(chrObj.pr)cEl_ctx.fillText(chrObj.chr,chrObj.xy[0],chrObj.xy[1]);
//        }
//        
//
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,true,0);
//        return err;
//    }
//}
//
//function draw_chr_selection(chrObj,cEl_Selection,cEl_ctx){
//    
//    try{
//        
//        cEl_ctx.fillStyle = cEl_Selection.style["background-color"];
//        cEl_ctx.fillRect(chrObj.xy[0],chrObj.xy[1]-chrObj.fs*0.8,chrObj.w,chrObj.fs);
//        cEl_ctx.fillStyle = cEl_Selection.style.color;
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,true,0);
//        return err;
//    }    
//}
//
////function oldShapeDraw(cEl,boolDrawCp,cEl_layer){
//    
//    
//    var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_project"];
//    var cEl_ctx = cEl_canv.getContext('2d');
//    cEl_setPath(cEl_ctx, cEl, cEl.shape, true, true); //cEl.shape.redraw
//        
//
//        
//        //cdebug(cEl.shape.rotation,false,true,3)();
//
//        var fillColor, strokeColor, lineWidth;
//        cEl_ctx.save();
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
//            fillColor = cEl.style.calc["background-color"];
//            lineWidth = 1;//cEl.style.calc["border-top-width"].replace("px",'');
//            strokeColor = cEl.style.calc["border-top-color"];
//        }
//
//        if(fillColor)cEl_ctx.fillStyle = fillColor;
//        if(strokeColor)cEl_ctx.strokeStyle = strokeColor;
//        cEl_ctx.lineWidth = lineWidth;
//
//        if(cEl.shape.rotation){
//            //cEl_ctx.save();
//            cEl_ctx.translate(cEl.shape.temp.cpMp[0],cEl.shape.temp.cpMp[1]);
//            cEl_ctx.rotate(cEl.shape.rotation*2*Math.PI);
//            cEl_ctx.translate(-cEl.shape.temp.cpMp[0],-cEl.shape.temp.cpMp[1]);
//            //cEl_ctx.restore();
//        }
//        
//        if(cEl.style.calc["box-shadow"]){
//            var shadowObj = getShadowObj(cEl.style.calc["box-shadow"]);
////            cdebug(shadowObj,true,true)();
////            cdebug(cEl.style.calc["box-shadow"],false,true)();
//            cEl_ctx.shadowOffsetX = shadowObj[0].shadowOffsetX;
//            cEl_ctx.shadowOffsetY = shadowObj[0].shadowOffsetY;
//            cEl_ctx.shadowBlur = shadowObj[0].shadowBlur;
//            cEl_ctx.shadowSpread = shadowObj[0].shadowSpread;
//            cEl_ctx.shadowColor = shadowObj[0].shadowColor;
//        }
//        
//
//
//        if(GLOBAL_Path2D){
//            if(fillColor){
//                cEl_ctx.fill(cEl.shape.path);
//            }
//            if(strokeColor){
//                cEl_ctx.stroke(cEl.shape.path);
//            }
//        }else{
//            if(fillColor){
//                cEl_ctx.fill();
//            }
//            if(strokeColor){
//                cEl_ctx.stroke();
//            }
//        }
//
//        if(boolDrawCp){
//            cEl_drawCp(cEl.shape,cEl_ctx);
//            draw_pointXY(cEl, cEl_layer, cEl_ctx);
//        }
//        cEl_ctx.restore();
//        
//        
//        /// TODO text stuff here , ADD shadow text as well by using text-shadow component on ctx
//        cEl_postsets(cEl,cEl_ctx,boolDrawCp);
//    
//}
//
////function cEl_setPath(cEl_ctx, cEl, shapeContainer, boolReset, boolSetCP){
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
//        var cEl_parent = window[cEl.parentName];
//        var cEl_page = window[cEl.pageId];
//        
//        if (!shapeContainer.points){
//            shapeContainer.points = $.extend(true,[],cEl_page.shapes[cEl.shape.elId]);
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



//function pre_load_childrenOld(cEl,pageId,layerId,parentName){
//    
//    try{
//        
//        if(!cEl)return true;
//        var boolAllIsWell = true;
//        
//        // set additional
//        if(cEl.element){
//            if(!pageId){pageId = cEl.pageId;}
//            if(!cEl.loaded){
////                cdebug(cEl.name,false,true,3)();
////                cdebug(cEl.shape,false,true,3)();
//                cEl = $.extend(true, cEl, window[pageId].elements[cEl.element]);
////                if(!cEl.states)cEl.states = {};
////                cEl.states = $.extend(true, cEl.states, window[pageId].states);
//                
////                cdebug(cEl.shape,false,true,3)();
//                cEl.loaded = true;
//            }
//        }
//
//        // set parent and window objects
//        switch(cEl.tag){
//            case "page": //draw page element
//                
//                
//                if(pageId){
//                    cEl.name = pageId;
//                    cEl.pageId = pageId;
//                }else{
//                    pageId = cEl.name;
//                }
//                setEventHolder(pageId);
//                parentName = "";
//                cEl.parentName = "";
//                 // add window object
//                if(!window[cEl.name]){
//                    window[cEl.name]=cEl;
//                }
//                
//                // preload style
//                if(!cEl.style){
//                    setStyle_cEl(cEl);
//                }
//                
//                getSetHtmlEl(cEl);
//                
//                
//            break;
//            case "layer": //draw canvas element
//                //console.clear();
//                if(pageId){
//                    cEl.pageId = pageId;
//                }else{
//                    pageId = cEl.pageId;
//                }
//                
//                if(layerId){
//                    cEl.name = layerId;
//                }else{
//                    layerId = cEl.name;
//                }
//                parentName = pageId;
//                
//                cEl.layerId = layerId;
//                cEl.parentName = pageId;
//                
//                // add window object
//                if(!window[cEl.parentName + "_" + cEl.name]){
//                    window[cEl.parentName + "_" + cEl.name]=cEl;
//                }
//                
//            break;
//            case "group": //draw shape
//                
//                if(pageId){
//                    cEl.pageId = pageId;
//                }else{
//                    pageId = cEl.pageId;
//                }
//                
//                if(layerId){
//                    cEl.layerId = layerId;
//                }else{
//                    layerId = cEl.name;
//                }
//                
//                if(parentName){
//                    cEl.parentName = parentName;
//                }else{
//                    parentName = cEl.parentName + "_" + cEl.name;
//                }
//                
//                // add window object
//                if(!window[cEl.parentName + "_" + cEl.name]){
//                    window[cEl.parentName + "_" + cEl.name]=cEl;
//                }
//                
//                // preload style
//                if(!cEl.style){
//                    setStyle_cEl(cEl);
//                }
//                
//                //if(cEl.shape.rotation){cdebug(cEl.pageId + " vs " + cEl.name,false,true,3)();}
//                //boolHasChildren = cEl.children ? true: false;
//                
//            break; 
//        }
//        
//        
//        var boolChildren = cEl.children ? true: false;
//        //cdebug(cEl.parentName + "_" + cEl.name + " " + boolChildren,false,true,1)();
//        if(boolChildren){
//            for(var i = 0, len = cEl.children.length +1 ;i < len; i++){
//                boolAllIsWell = (boolAllIsWell && pre_load_children(cEl.children[i],pageId,layerId,cEl.parentName + "_" + cEl.name));
//            };
//        }
//        return boolAllIsWell;
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


//function set_lineParsOLD(line,linePars,boolPP){
//    
//    try{
//        
//        //linePars.sw = linePars.swd;
//        
//        var boolEndOfParagraph = true;
//        var intSpaceCount = 0;
//        var endPos = linePars.ep;
//        var startPos = linePars.sp;
//        linePars.bp = endPos;
//        
//        //linePars.sw = linePars.sWd;
//        
//        var intWordPosPrev = line[startPos].wp;
//        var intWordPos = intWordPosPrev;
//        
//        var intWordWidth = 0;
//        
//        var intwordX;
//        if(boolPP){
//            intwordX = linePars.minX + linePars.li;
//        }else{
//            intwordX = linePars.minX;
//        }
//              
//        linePars.fs = 0;
//        
//        for(var k = startPos, retIndex = 0,retIndex2= 0,chrObj,chrWidth,chrVal,boolVeryLongWord, boolWordChange;k < endPos;k++){
//
//            chrObj = line[k];
//            intWordPos = chrObj.wp;
//            chrWidth = chrObj.w;
//            chrVal = chrObj.chr;
//            linePars.fs = Math.max(chrObj.fs,linePars.fs);
//            
//            //zzz+=line[k][0];
//            if(intwordX > linePars.maxX){
//                
//                boolVeryLongWord = (intWordWidth > (linePars.maxX-linePars.minX));
//                
//                // break on too long word
//                if(!boolWordChange && !boolVeryLongWord){
//                    linePars.eos = linePars.maxX - intwordX;
//                    linePars.bp = k-2;
//                    boolEndOfParagraph = false;
//                    //console.log(JSON.stringify(linePars));
//                    break;
//                }
//                if(!retIndex2){
//                    retIndex2 = k-1;
//                }
//                
//                
//                if(intWordWidth > (linePars.maxX-linePars.minX)){
//                    linePars.bp = retIndex;
//                    break;
//                }
//                
//                if(intWordPos !== intWordPosPrev){
//                    linePars.bp = retIndex;
//                    boolEndOfParagraph = false;
//                    break;
//                    intWordWidth = 0;
//                }else{
//                    if(chrVal === " "){
//                        intWordWidth+= linePars.swd + linePars.ls;
//                    }else{
//                        intWordWidth+= chrWidth + linePars.ls;
//                    }
//                }
//                
//                
//            }else{
//                // reset return index after new word found
//                if( chrVal === " "){ //intWordPos !== intWordPosPrev
//                    
//                    boolWordChange = true;
//                    retIndex = k;
//                    intWordWidth = 0;
//                    intSpaceCount++;
//                    intwordX+= linePars.swd + chrObj.ls;
//                    linePars.eos = linePars.maxX - intwordX;
//                }else{
//                    intwordX+= chrWidth + chrObj.ls;
//                }
//
//            }
//            intWordPosPrev = intWordPos;
//        }
//        // set text alignment here !!!
//        
//        if(boolEndOfParagraph){
//            linePars.sw = linePars.swd;
//        }else{
//            if(intSpaceCount>0){
//                //console.log(intSpaceCount);
//                linePars.sw = linePars.swd + linePars.eos/(intSpaceCount-1);
//            }
//        }
//        
//        
//        return true;
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,true,0);
//        return err;
//    }
//}
////function set_charObj_lineOld(charObj,lines,styleMap,charNext){
//
//    try{
//            
//        charObj.print = true;
//        // case is nonprintable character
//        if(charNext && charObj.chr === "\\"){
//            //charObj.chr = charNext;
//            switch(charNext){
//                case "n":
//                case "r":
//                    charObj.pos++ ;
//                    charObj.wp = 0;
//                    charObj.sc = 0;
//                    charObj.pp++ ;
//                    charObj.print = false;
//                    lines.push({"chr":charNext,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"sc":charObj.sc,"pr":charObj.print});
//                break;
//                default:
//                    set_charObj_style(styleMap,lines,charObj);
//                    lines.push({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"sc":charObj.sc,"pr":charObj.print});
//                break;
//            }
//        // case is space
//        }else if(charObj.chr === " "){
//            charObj.sc++;
//            set_charObj_style(styleMap,charObj);
//            lines.push({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"sc":charObj.sc,"pr":charObj.print});
//            charObj.wp++;
//        }else if(/[a-zA-Z_0-9]/.test(charObj.chr)){
//            set_charObj_style(styleMap,charObj);
//            lines.push({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"sc":charObj.sc,"pr":charObj.print});
//        // break for all other characters
//        }else{
//            charObj.wp++ ;
//            set_charObj_style(styleMap,charObj);
//            lines.push({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"sc":charObj.sc,"pr":charObj.print});
//            charObj.wp++ ;
//        }
//        
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

////// TODO split bellow function according to text allignment, will keep it simple
//function draw_cEl_lines_justifyOLD(cEl_ctx,cEl,cEl_pageText){
//    
//    try{
//        // usage of == instead of === is intentional
//        var boolHasSelection = (cEl_pageText.charsSelection.name == cEl.parentName + "_" +cEl.name);
//        if(boolHasSelection && cEl.active && cEl.data.values.editable){
//            cEl_pageText.charsSelection.cr.vis = true;
//        }else{
//            cEl_pageText.charsSelection.cr.vis = false;
//        }
//        
//        if(cEl.data.values.temp.style.textShadow){
//            cEl_ctx.shadowOffsetX = cEl.data.values.temp.style.textShadow[0].shadowOffsetX;
//            cEl_ctx.shadowOffsetY = cEl.data.values.temp.style.textShadow[0].shadowOffsetY;
//            cEl_ctx.shadowBlur = cEl.data.values.temp.style.textShadow[0].shadowBlur;
//            cEl_ctx.shadowSpread = cEl.data.values.temp.style.textShadow[0].shadowSpread;
//            cEl_ctx.shadowColor = cEl.data.values.temp.style.textShadow[0].shadowColor;
//        }
//        
//        //console.log(boolDrawSelection + "  " + cEl.parentName + "_" +cEl.name + "  vs  " + cEl_pageText.charsSelection.name);
//        
//        var lines = cEl.data.values.temp.lines3;
//        var len = lines.length;
//        if(!lines)return false;
//        var linePars={
//            "sp":0,
//            "ep":len,
//            "bp":-1,
//            "sc":0,
//            "sw":0,
//            "swd":4,
//            "fs":0,
//            "np":true,
//            "ws":cEl.data.values.temp.style.wordSpacing,
//            "li":cEl.data.values.temp.style.textIndent,
//            "maxX":cEl.data.values.temp.style.lineRight,
//            "minX":cEl.data.values.temp.style.lineLeft,
//            "maxY":cEl.data.values.temp.style.lineBottom,
//            "minY":cEl.data.values.temp.style.lineTop
//        };
//              
//        for(var i = 0, chrObj, chrObj_f_id, charStyle,charWidth; i< len;i++){
//            chrObj = lines[i];
//            //if(!line)console.log(i + " vs " + len + JSON.stringify(lines));
//            if(chrObj_f_id !== chrObj.f.id){
//                charStyle = cEl_pageText.charsFontsObj[chrObj.f.id];
//                //console.log(cEl_ctx.fillStyle);
//                if(cEl_ctx.font !== charStyle.fontCanvas)cEl_ctx.font = charStyle.fontCanvas;
//
//                //if(cEl_ctx.fillStyle !== charStyle.color)cEl_ctx.fillStyle = charStyle.color;
//            }
//            
//            charWidth = setGetCharWidth(cEl_ctx,cEl_pageText,chrObj.chr,chrObj.f);
//            chrObj.w = charWidth.w;
//            chrObj.fs = charStyle.fontSize;
//            chrObj.ls = charStyle.letterSpacing;
//            //console.log();
//        }
//        
////        if(cEl.name === "txtInputObj" && cEl.parentName === "editorPage_control_list2"){
////            console.log(JSON.stringify(lines));
////        }
//        
//        var charX = linePars.minX + linePars.li;
//        var charY = linePars.minY;
//        
//        for(var i = 0, chrObj, chrObj_f_id,boolFirstLine,oldParagraphId=0,boolNewParagraph,boolIsSpace, charStyle; i< len;i++){  
//            // exit if beyond max height
//            chrObj = lines[i];
//            boolFirstLine = (i===0);
//            boolIsSpace = (chrObj.chr === " ");
//            
//            boolNewParagraph = (oldParagraphId !== chrObj.pp);
//            
//            //if(!line)console.log(i + " vs " + len + JSON.stringify(lines));
//            
//            if(chrObj_f_id !== chrObj.f.id){
//                charStyle = cEl_pageText.charsFontsObj[chrObj.f.id];
//                //console.log(chrObj.h);
//                if(cEl_ctx.font !== charStyle.fontCanvas)cEl_ctx.font = charStyle.fontCanvas;
//                if(cEl_ctx.fillStyle !== charStyle.color)cEl_ctx.fillStyle = charStyle.color;
//            }
//            
//            
//            linePars.sp = i;
//            if(i > linePars.bp || boolNewParagraph){
//                //if(i<56 && cEl.name === "txtInputObj" && cEl.parentName === "editorPage_control_list2"){console.log(" BEFORE " +JSON.stringify(linePars));}
//                
//                set_linePars(lines,linePars,boolFirstLine || boolNewParagraph);
//                
//                //if(i<56 && cEl.name === "txtInputObj" && cEl.parentName === "editorPage_control_list2"){console.log(" AFTER " +JSON.stringify(linePars));}
//
//                if(boolFirstLine || boolNewParagraph){
//                    charX = linePars.minX + linePars.li;
//                }else{
//                    charX = linePars.minX ;
//                }
//                // set height for new paragraph
//                charY+= linePars.fs*1;
//                if(charY> linePars.maxY && !boolFirstLine)break;
//            }
//
//            
//            chrObj.xy = [charX,charY];
//            
//            if(boolIsSpace)chrObj.w = linePars.sw;
//            
//            draw_chr(chrObj,i,cEl_ctx,cEl_pageText,boolHasSelection,( i < linePars.bp || !boolIsSpace));
//            
//            charX+= chrObj.w + chrObj.ls;
//
//            
//            chrObj_f_id = chrObj.f.id;
//            oldParagraphId = chrObj.pp;
//        }
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,true,0);
//        return err;
//    }
//}
////function draw_cEl_lines2(cEl_ctx,cEl,cEl_pageText){
//    
//    try{
//        
//        cEl_ctx.fillStyle = cEl.value.values.temp.color;
//        
//        var charX = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//        if(cEl.value.values.temp.textAlign === "right"){
//            charX = charX + cEl.value.values.temp.lines2[0].endW - cEl.value.values.temp.textIndent;
//        }
//        
//        for(var i = 0, len = cEl.value.values.temp.lines2.length ,charY = cEl.value.values.temp.lineTop , spaceWidth = cEl.value.values.temp.spaceWidthDef; i< len;i++){  
//            // exit if beyond max height
//            if(charY>cEl.value.values.temp.lineBottom && i>0)break;
//            
//            // set space char width
//            if (cEl.value.values.temp.textAlign === "justify"){
//                //TODO not nice, fix it here
//                if (cEl.value.values.temp.lines2[i].spCnt > 0 ){//&& cEl.value.values.temp.lines2[i].words[cEl.value.values.temp.lines2[i].words.length-2].chr !== "_"
//                    spaceWidth = cEl.value.values.temp.lines2[i].spW  + cEl.value.values.temp.lines2[i].endW/cEl.value.values.temp.lines2[i].spCnt;
//                    //spaceWidth = (cEl.value.values.temp.lines2[i].spW * cEl.value.values.temp.lines2[i].spCnt + cEl.value.values.temp.lines2[i].endW)/cEl.value.values.temp.lines2[i].spCnt;
//                }else{
//                    spaceWidth = cEl.value.values.temp.lines2[i].spW;
//                }
//            }
//            
//            // iterate chars
//            for(var j = 0, lenChars = cEl.value.values.temp.lines2[i].chrs.length, boolIsSpace, charStyle; j < lenChars;j++){
//                boolIsSpace = (cEl.value.values.temp.lines2[i].chrs[j].chr === " ");
//                charStyle = cEl_pageText.charsFonts[Object.keys(cEl_pageText.charsFonts)[cEl.value.values.temp.lines2[i].chrs[j].f]];
//                //if(!charStyle)cdebug(cEl.value.values.temp.lines2[i].chrs,false,true,0);
//                if(cEl_ctx.font !== charStyle.f){
//                    // reset font if needed 
//                    cEl_ctx.font = charStyle.f;
//                }
//                // DO CHAR DRAW HERE
//                if (cEl.value.values.vertical){
//                    cEl_ctx.fillText(cEl.value.values.temp.lines2[i].chrs[j].chr,charY,charX);
//                }else{
//                    cEl_ctx.fillText(cEl.value.values.temp.lines2[i].chrs[j].chr,charX,charY);
//                }
//                // if blank then justify blank space
//                if(boolIsSpace){
//                    charX = charX + spaceWidth;
//                }else{
//                    charX = charX + cEl.value.values.temp.lines2[i].chrs[j].w + cEl.value.values.temp.letterSpacing;
//                }
//            }
//            
//            // reset left position
//            if(cEl.value.values.temp.textAlign === "right"){
//                if (i < len-1){
//                    charX = cEl.value.values.temp.lineLeft + cEl.value.values.temp.lines2[i+1].endW;
//                }else{
//                    charX = cEl.value.values.temp.lineLeft + cEl.value.values.temp.lines2[i].endW;
//                }
//            }else{
//                if(cEl.value.values.temp.lines2[i].hNLine){
//                    charX = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//                }else{
//                    charX = cEl.value.values.temp.lineLeft;
//                }
//            }
//            
//            // set height for new line
//            charY =  charY + cEl.value.values.temp.lineHeight;
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,true,0);
//        return err;
//    }
//}
//
//// array functions
//function cEl_set_wordMap2(cEl_ctx,cEl,cEl_pageText){
//    
//    try{
//        
//        cEl.value.values.temp.lines2 = [[]];
//        cEl.value.values.temp.chars = {};
//        //cEl_pageText.words = [];
//        //"text":{"chars":"","words":[],"wordStyles":{}},
//      
//        var tmpChar = "";
//        var word = "";
//        var text = cEl.value.values.text;
//        
//        var lines = cEl.value.values.temp.lines2;
//        var chars = cEl.value.values.temp.chars;
//        
//        var intSpaceCount = 0;
//        var intWordPosStart = 0;
//        var intWordPosStartEnd = 0;
//                    
//        var intActLine = 0;
//        
//        /// change here to detect words and create text Map of words by unique chars indexes
//        for(var i=0, intSpacePos = 0,tmpCharObj, maxLen = text.length;i < maxLen;i++){
//            
//            tmpChar = text[i];
//            tmpCharObj = setGetCharsObj(cEl_ctx,cEl_pageText,chars,tmpChar,cEl.value.values.temp.fontActive);
//            
//            
//            //tmpCharStyle = setGetCharStyle(cEl_ctx,cEl_pageText,tmpChar,cEl.value.values.temp.fontActive);
//            
//            //tmpChar = cEl.text.value.charAt(i);
//            //tmpChar = cEl.text.value.substr(i,1);
//            
//            
//            switch(true){
//                // case is special character like new line, etc
//                case (i < maxLen-1) && (tmpChar === "\\"):
//                    tmpChar = text[i+1];
//                    switch(tmpChar){
//                        case "n":
//                        case "r":
//                            i++;
//                            word = "";
//                            intSpaceCount = 0;
//                            intWordPosStart = 0;
//                            intWordPosStartEnd = 0;
//                            intActLine ++;
//                            //lines[intActLine]={};
//                            lines.push([]);
//                        break;
//                    }
//                break;
//
//                // case is space
//                case (tmpChar === " "):
//                    
//                    //lines[intActLine][intWordPosStart][5] = intWordPosStartEnd;
//                    intWordPosStart = i;
//                    lines[intActLine].push([tmpChar,tmpCharObj,cEl.value.values.temp.fontActive,intWordPosStart,0,intSpaceCount]);
//                    //lines[intActLine][i] = $.extend(false,lines[intActLine][i],{"chr":tmpChar,"s":null,"f":cEl.value.values.temp.fontActive,"sp":intSpacePos,"wps":intWordPosStart});
//
//                    intWordPosStartEnd = i;
//                    
//                    word = "";
//                    intSpaceCount++;
//                break;
//
//                case /[a-zA-Z_]/.test(tmpChar):
//
//                    //lines[intActLine-1][intWordPosStart][5] = intWordPosStartEnd;
//                    intWordPosStart = i;
//                    lines[intActLine].push([tmpChar,tmpCharObj,cEl.value.values.temp.fontActive,intWordPosStart,0,intSpaceCount]);
//                    //lines[intActLine][i] = $.extend(false,lines[intActLine][i],{"chr":tmpChar,"s":null,"f":cEl.value.values.temp.fontActive,"sp":intSpacePos,"wps":intWordPosStart});
//
//                    word += tmpChar;
//                    
//                break;
//                // break for all other characters
//                default:
//                    
//                    
//                    
//                    //lines[intActLine][intWordPosStart][5] = intWordPosStartEnd;
//                    intWordPosStart = i;
//                    lines[intActLine].push([tmpChar,tmpCharObj,cEl.value.values.temp.fontActive,intWordPosStart,0,intSpaceCount]);
//                    //lines[intActLine][i] = $.extend(false,lines[intActLine][i],{"chr":tmpChar,"s":null,"f":cEl.value.values.temp.fontActive,"sp":intSpacePos,"wps":intWordPosStart});
//                    
//                    word = tmpChar;
//                    intWordPosStartEnd = i;
//                break;
//            }
//        };
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
//
//
//
//function create_text_lines2(cEl_ctx,cEl,cEl_pageText){
//    
//    try{
//        
//        var intActLine = 0;
//        var boolSkipWord = true ,boolIsSpace = false ,boolNewLine = true, boolNewParagraph = true, boolOverflow = false;
//        var intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//        var wordStyle;
//        
//        var spaceChar = setGetCharStyle(cEl_ctx,cEl_pageText," ",cEl.value.values.temp.font);
//        cEl.value.values.temp.spaceWidthDef = spaceChar.w;
//        
//        var hypenChar = setGetCharStyle(cEl_ctx,cEl_pageText,"-",cEl.value.values.temp.font);
//        cEl.value.values.temp.hypenWidthDef = hypenChar.w;
//        
//        //cEl.value.values.temp.lines2 =[]; 
//        cEl.value.values.temp.lines2 = [{"spW":cEl.value.values.temp.spaceWidthDef,"spCnt":0,"endW":0,"hNLine":true,"chrs":[]}]; //cEl.value.values.temp.spaceWidthDef
//        
//        if(cEl.value.values.temp.wordsMap){
//            for(var i = 0 , lngMapLen = cEl.value.values.temp.wordsMap.length, lngSpaceCount = 0;i < lngMapLen;i++){
//                
//                boolSkipWord = false;
//                wordStyle = $.extend(true,{},cEl_pageText.wordsStyles[cEl.value.values.temp.wordsMap[i]]);
//                boolIsSpace = (wordStyle.word === " ");
//                wordStyle.wT += wordStyle.len * cEl.value.values.temp.letterSpacing;
//                
//                boolNewParagraph = (wordStyle.word === "\\n" || wordStyle.word === "\\r") ? true : false;
//                
//                boolOverflow = (wordStyle.wT >= cEl.value.values.temp.lineRight - cEl.value.values.temp.lineLeft) ? true : false;
//                
//                boolNewLine = (intXPos + wordStyle.wT >= cEl.value.values.temp.lineRight);
//                boolNewLine = (boolNewLine && !boolOverflow);
//                boolNewLine = boolNewParagraph ? true : boolNewLine;
//                
//                boolSkipWord = boolNewParagraph ? true : false;
//
//                if(boolNewLine){
//                    //fill line end of line metrics
//                    if(boolNewParagraph){
//                        cEl.value.values.temp.lines2[intActLine].spCnt = 0;
//                    }else{
//                        cEl.value.values.temp.lines2[intActLine].spCnt = lngSpaceCount-1;
//                    }
//                    cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos;
//                    cEl.value.values.temp.lines2[intActLine].hNLine = boolNewParagraph;
//                    
//                    intActLine = intActLine + 1;
//                    lngSpaceCount = 0;
//                    cEl.value.values.temp.lines2.push({"spW":spaceChar.w,"spCnt":0,"endW":0,"hNLine":false,"chrs":[]});
//                    
//                    if(boolNewParagraph){
//                        intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//                    }else{
//                        intXPos = cEl.value.values.temp.lineLeft;
//                    }
//                    
//                    if(boolIsSpace){
//                        boolSkipWord = true;
//                    }
//                }
//                
//                
//                
////                 Finally add the words characters
//                if (!boolSkipWord){
//                    
//                    if(boolIsSpace)lngSpaceCount++;
//                    
//                    for(var j = 0 ,lenWord = wordStyle.len, boolSplitWord;j<lenWord;j++){
//                        
//                        var intCharLen = wordStyle.chrs[j].w + cEl.value.values.temp.letterSpacing;
//                       
//                        boolSplitWord = boolOverflow && (intXPos + intCharLen + hypenChar.w + spaceChar.w  + 2 * cEl.value.values.temp.letterSpacing> cEl.value.values.temp.lineRight);
//                        // break word condition
//                        if(boolSplitWord){ //&& (intXPos + intCharLen + hypenChar.w + spaceChar.w)
//                            //if(j !== lenWord){
//                            if (lngSpaceCount === 0){
//                                lngSpaceCount =2;
//                            }
//                            
//                            cEl.value.values.temp.lines2[intActLine].chrs.push(spaceChar);
//                            cEl.value.values.temp.lines2[intActLine].chrs.push(hypenChar);
//                            intXPos+=spaceChar.w + cEl.value.values.temp.letterSpacing;
//                            intXPos+=hypenChar.w + cEl.value.values.temp.letterSpacing;
//
//                            cEl.value.values.temp.lines2[intActLine].spCnt = lngSpaceCount -1;
//                            cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos ;
//                            
//                            //cdebug(cEl.value.values.temp.lines2[intActLine].endW,false,true,0);
//                            
//                            cEl.value.values.temp.lines2.push({"spW":spaceChar.w,"spCnt":0,"endW":0,"hNLine":false,"chrs":[]});
//                            
//                            if(boolNewParagraph){
//                                intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//                            }else{
//                                intXPos = cEl.value.values.temp.lineLeft;
//                            }
//                            lngSpaceCount = 0;
//                            intActLine = intActLine + 1;
//
//                        }
//                        cEl.value.values.temp.lines2[intActLine].chrs.push(wordStyle.chrs[j]);
//                        
//                        intXPos+=intCharLen ;
//                    }
//                }
//            }
//            //fill last line end of line metrics
//            cEl.value.values.temp.lines2[intActLine].spCnt = 0;
//            cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos;
//            cEl.value.values.temp.lines2[intActLine].hNLine = false;
//            
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//
///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
//function create_text_lines2a(cEl_ctx,cEl,cEl_pageText){
//    
//    try{
//        
//        var intActLine = -1;
//        var boolSkipWord = true ,boolIsSpace = false ,boolNewLine = true, boolNewParagraph = true, boolOverflow = false;
//        var intXPos;
//        var wordStyle;
//        
//        var spaceChar = setGetCharStyle(cEl_ctx,cEl_pageText," ",cEl.value.values.temp.font);
//        cEl.value.values.temp.spaceChar = spaceChar;
//        
//        var hypenChar = setGetCharStyle(cEl_ctx,cEl_pageText,"-",cEl.value.values.temp.font);
//        cEl.value.values.temp.hypenChar = hypenChar;
//        
//        cEl.value.values.temp.lines2 =[]; 
////        cEl.value.values.temp.lines2 = [{"spCnt":0,"endW":0,"hNLine":true,"chrs":[]}]; //cEl.value.values.temp.spaceChar
////        
//        if(cEl.value.values.temp.wordsMap){
//            for(var i = 0 , lngMapLen = cEl.value.values.temp.wordsMap.length, lngSpaceCount = 0;i < lngMapLen;i++){
//                
//                boolSkipWord = false;
//                wordStyle = $.extend(true,{},cEl_pageText.wordsStyles[cEl.value.values.temp.wordsMap[i]]);
//                
//                //wordStyle.wT += wordStyle.len * cEl.value.values.temp.letterSpacing;
//
//                if(i === 0 || wordStyle.word === "\\n" || wordStyle.word === "\\r"){
//                    cEl.value.values.temp.lines2.push({"spCnt":0,"nP":true,"chrs":[],"ws":[]});
//                    intActLine++ ;
//                    intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
//                }else{
//                    boolIsSpace = (wordStyle.word === " ");
//                    
//                    if(boolIsSpace){
//                        cEl.value.values.temp.lines2[intActLine].chrs.push(spaceChar);
//                        intXPos = intXPos + spaceChar.w;
//                    }else{
//                        for(var j = 0 ,lenWord = wordStyle.len;j<lenWord;j++){
//                            cEl.value.values.temp.lines2[intActLine].chrs.push(wordStyle.chrs[j]);
//                        }
//                        cEl.value.values.temp.lines2[intActLine].chrs.push({"w":0,"chr":"","f":0,"wT":2});
//                    }
//                }
//                
//                
//                
////                
////                boolOverflow = (wordStyle.wT >= cEl.value.values.temp.lineRight - cEl.value.values.temp.lineLeft) ? true : false;
////                
////                boolNewLine = (intXPos + wordStyle.wT >= cEl.value.values.temp.lineRight);
////                boolNewLine = (boolNewLine && !boolOverflow);
////                boolNewLine = boolNewParagraph ? true : boolNewLine;
////                
////                boolSkipWord = boolNewParagraph ? true : false;
////
////                if(boolNewLine){
////                    //fill line end of line metrics
////                    if(boolNewParagraph){
////                        cEl.value.values.temp.lines2[intActLine].spCnt = 0;
////                    }else{
////                        cEl.value.values.temp.lines2[intActLine].spCnt = lngSpaceCount-1;
////                    }
////                    cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos;
////                    cEl.value.values.temp.lines2[intActLine].hNLine = boolNewParagraph;
////                    
////                    intActLine = intActLine + 1;
////                    lngSpaceCount = 0;
////                    cEl.value.values.temp.lines2.push({"spW":spaceChar.w,"spCnt":0,"endW":0,"hNLine":false,"chrs":[]});
////                    
////                    if(boolNewParagraph){
////                        intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
////                    }else{
////                        intXPos = cEl.value.values.temp.lineLeft;
////                    }
////                    
////                    if(boolIsSpace){
////                        boolSkipWord = true;
////                    }
////                }
////                
//////                 Finally add the words characters
////                if (!boolSkipWord){
////                    
////                    if(boolIsSpace)lngSpaceCount++;
////                    
////                    for(var j = 0 ,lenWord = wordStyle.len, boolSplitWord;j<lenWord;j++){
////                        
////                        var intCharLen = wordStyle.chrs[j].w + cEl.value.values.temp.letterSpacing;
////                       
////                        boolSplitWord = boolOverflow && (intXPos + intCharLen + hypenChar.w + spaceChar.w  + 2 * cEl.value.values.temp.letterSpacing> cEl.value.values.temp.lineRight);
////                        // break word condition
////                        if(boolSplitWord){ //&& (intXPos + intCharLen + hypenChar.w + spaceChar.w)
////                            //if(j !== lenWord){
////                            if (lngSpaceCount === 0){
////                                lngSpaceCount =2;
////                            }
////                            
////                            cEl.value.values.temp.lines2[intActLine].chrs.push(spaceChar);
////                            cEl.value.values.temp.lines2[intActLine].chrs.push(hypenChar);
////                            intXPos+=spaceChar.w + cEl.value.values.temp.letterSpacing;
////                            intXPos+=hypenChar.w + cEl.value.values.temp.letterSpacing;
////
////                            cEl.value.values.temp.lines2[intActLine].spCnt = lngSpaceCount -1;
////                            cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos ;
////                            
////                            //cdebug(cEl.value.values.temp.lines2[intActLine].endW,false,true,0);
////                            
////                            cEl.value.values.temp.lines2.push({"spW":spaceChar.w,"spCnt":0,"endW":0,"hNLine":false,"chrs":[]});
////                            
////                            if(boolNewParagraph){
////                                intXPos = cEl.value.values.temp.lineLeft + cEl.value.values.temp.textIndent;
////                            }else{
////                                intXPos = cEl.value.values.temp.lineLeft;
////                            }
////                            lngSpaceCount = 0;
////                            intActLine = intActLine + 1;
////
////                        }
////                        cEl.value.values.temp.lines2[intActLine].chrs.push(wordStyle.chrs[j]);
////                        
////                        intXPos+=intCharLen ;
////                    }
//                }
//            }
////            //fill last line end of line metrics
////            cEl.value.values.temp.lines2[intActLine].spCnt = 0;
////            cEl.value.values.temp.lines2[intActLine].endW = cEl.value.values.temp.lineRight - intXPos;
////            cEl.value.values.temp.lines2[intActLine].hNLine = false;
////            
////        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}




//function uChar(strVal){
//    var tmpChar ="";
//    for(var i = 0, j = strVal.length; i < j; i++){
//        if(strVal[0]){
//            tmpChar = tmpChar + strVal[0];
//            strVal = strVal.replace(new RegExp(strVal[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g"), "");
//        }else{
//            break;
//        }
//    }
//    return tmpChar;
//}
//
//function replaceAllStr(strVal,strFind,strReplace){
//    strVal = strVal.replace(new RegExp(strFind.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g"), strReplace);
//}
//
//function uWords(strVal){
//    var tmpWord = "";
//    var tmpWordRet=[];
//    for(var i = 0, j = strVal.length; i < j; i++){
//        
//        if(strVal[i]){
//            
//            //cdebug(tmpWord + strVal[i]);
//            
//            if(strVal[i].match(/([\\\]\[\(\)a-zA-Z0-9,])/)){
//                tmpWord = tmpWord + strVal[i];
//            }else{
//                if(tmpWord !== ""){
//                    tmpWordRet.push(tmpWord);
//                    if(tmpWordRet.indexOf(strVal[i])===-1)tmpWordRet.push(strVal[i]);
//                    
//                    strVal = strVal.replace(new RegExp(tmpWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g"), "");
//                    
//                    //strVal = strVal.replace(new RegExp(strVal[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g"), "");
//                    
//                    i = 0;
//                    tmpWord = "";
//                }
//            }
//            
//        }else{
//            tmpWordRet.push(tmpWord);
//            break;
//        }
//    }
//    return tmpWordRet;
//
//}


//function changeFocus(boolDescending){
//    
//    try{
//        
//        
//        //if(!eventholder.cElFocus)return null;
//        var eventholder = window["eventholder"];
//        var cElFocusOldName = eventholder.cElFocus;
//        cdebug("changeFocus@cElFocusOldName: " + cElFocusOldName,false,true);
//        //cdebug(eventholder,false,true);
//        //cdebug(eventholder.cElFocus);
//        var cElFocusOld = window[cElFocusOldName];
//        var canvElFocusOld = cElFocusOld ? window[cElFocusOld.pageId + "_" + cElFocusOld.layerId] : null;
//        
//        
//        // old active elements instantiation
//        var cElActiveOldName = eventholder.cElActive[0];
//        var cElActiveOld = window[cElActiveOldName];
//        var canvElActiveOld = cElActiveOld ? window[cElFocusOld.pageId + "_" + cElActiveOld.layerId] : null;
//        //cdebug("cElFocusOldName" + cElFocusOldName);
//        
//        var page = window[cElFocusOld.pageId];
//
//        var boolResetOldFocus = false;
//
//        var canvTab = canvElFocusOld.tab ? canvElFocusOld.tab : 0;
//        var cElTab = cElFocusOld.tab ? cElFocusOld.tab : 0;
//        var canvTabNew = canvTab;
//        var cElTabNew = cElTab;
//        
//        //cdebug([canvTab,canvTabNew,cElTab,cElTabNew]);
//        //cdebug(cElFocusOld.name + " vs " + canvElFocusOld.name);            
//        //cdebug(cElFocusOld.tag);
//
//        
//
//        //cdebug([boolResetOldFocus,canvTab,canvTabNew,cElTab,cElTabNew]);
//
//        if(boolResetOldFocus){
//
//            page.children[canvTab].children[cElTab].focus = false;
//            page.children[canvTabNew].children[cElTabNew].focus = true;
//            //cdebug("zzzzzzzzzzzz "+page.children[canvTabNew].pageId + "_" + page.children[canvTabNew].name + "_" + page.children[canvTabNew].children[cElTabNew].name);
//            eventholder.cElFocus = page.children[canvTabNew].pageId + "_" + page.children[canvTabNew].name + "_" + page.children[canvTabNew].children[cElTabNew].name;
//            
//            if(cElActiveOld && cElActiveOldName===cElFocusOldName){
//                page.children[canvTab].children[cElTab].active = false;
//                eventholder.cElActive = page.children[canvTabNew].pageId + "_" + page.children[canvTabNew].name + "_" + page.children[canvTabNew].children[cElTabNew].name;
//                runEval(cElActiveOld,"activeoff");
//            }
//
//            runEval(page.children[canvTab].children[cElTab],"focusoff");
//            runEval(page.children[canvTabNew].children[cElTabNew],"focuson");
//
//            if(canvTabNew!==canvTab){
//                page.children[canvTab].shape.redraw = true;
//                //drawChildren(page.children[canvTab]);
//            }
//            page.children[canvTabNew].shape.redraw = true;
//            //drawChildren(page.children[canvTabNew]);
//
//        }
    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


//function changeFocusToActive(){
//    
//    try{
//        //if(!eventholder.cElFocus)return null;
//        var eventholder = window["eventholder"];
//        var cElFocusOldName = eventholder.cElFocus;
//        cdebug("changeFocusToActive@cElFocusOldName " + cElFocusOldName,false,true);
//        var cElFocusOld = window[cElFocusOldName];
//        var canvElFocusOld = cElFocusOld ? window[cElFocusOld.pageId + "_" + cElFocusOld.layerId] : null;
//
//        // old active elements instantiation
//        var cElActiveOldName = eventholder.cElActive;
//        var cElActiveOld = window[cElActiveOldName];
//        //cdebug("cElActiveOld" + cElActiveOld);
//        var canvElActiveOld = cElActiveOld ? window[cElFocusOld.pageId + "_" + cElFocusOld.layerId] : null;
//
//        //var page = window[cElFocusOld.pageId];
//
//        var boolResetOldActive = false;
//
//       
//        if(canvElActiveOld && cElActiveOldName!==cElFocusOldName){
//            cElActiveOld.active = false;
//            boolResetOldActive = true;
//            runEval(cElActiveOld,"activeoff");
//        }
//        if(canvElFocusOld.tag ==="canvas"){
//            eventholder.cElActive = canvElFocusOld.pageId + "_" + canvElFocusOld.name;
//        }else{
//            eventholder.cElActive = canvElFocusOld.pageId + "_" + canvElFocusOld.name + "_" + cElFocusOld.name;
//        }
//        
//        cElFocusOld.active = true;
//        runEval(cElFocusOld,"activeon");
//        
//        if(boolResetOldActive){
//            //canvElActiveOld.shape.redraw = true;
//            //drawChildren(canvElActiveOld);
//        }
//        
//        // TODO add here bubling detectionand stop redraw
//        //canvElFocusOld.shape.redraw = true;
//        //drawChildren(canvElFocusOld);
//        
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//
//function cloneMonoArray(oldArray){
//    var newArray=[];
//    for( var i=0; i< oldArray.length; i++){
//        newArray.push(oldArray[i]);
//    }
//    return newArray;
//}
//
//function cloneMultiArray(oldArray){
//    //if(kind(oldArray)==="Array"){
//    if(oldArray instanceof Array){
//    //if(oldArray.constructor === Array){ 
//        var newArray = [];
//        for( var i=0; i< oldArray.length; i++){
//            newArray.push(cloneMultiArray(oldArray[i]));
//        }
//        return newArray;
//    }else{
//        return oldArray;
//    }
//}



//function activateCEl(cEl,boolActivate,boolAll){
//    try{
//        cEl.cActive = boolActivate;
//        if(boolAll===true){
//            if (cEl.children){
//                var nOfChildren = cEl.children.length;
//                for (var i = nOfChildren - 1; i >= 0; i--) {
//                    cEl.children.cActive = boolActivate;
//                }
//            }
//        }
//        return true;
//        
//    }catch(err){
//        return err;
//    }
//};

//function setZoomCEl(cEl,zoomLvl,boolHead,boolAll){
//    try{
//        if(boolHead===true){
//            cEl.cShapeObf.zoom = zoomLvl;
//        }; 
//        if(boolAll===true){
//            if (cEl.children){
//                var nOfChildren = cEl.children.length;
//                for (var i = nOfChildren - 1; i >= 0; i--) {
//                    setZoomCEl(cEl.children[i],zoomLvl,true,true);
//                };
//            };
//        };
//        return true;
//        
//    }catch(err){
//        return err;
//    }
//}


//function clearCache(actEl,boolAllChildren){
//    //var actEl = retCanvById(actCanvId);
//    if (actEl.cBkg){actEl.cBkg[1] = null;};
//    actEl.cRepaint = false;
//    actEl.cCtx = false;
//    if(boolAllChildren ){//&& actEl.children
//        var nOfChildren = actEl.children.length;
//        for (var i = nOfChildren - 1; i >= 0; i--) {
//            var tempEl = actEl.children[i];
//            if (tempEl.cBkg){tempEl.cBkg[1] = null;};
//            tempEl.cRepaint = false;
//            tempEl.cCtx = false;
//        };
//    };
//};

//function handleMouseOLD(evt) {
//    
//    try{
//        var evtType = evt.type;
//        //cdebug(evtType+" start on " + evt.target.name,true);
//
//        // exit if not event
//        if(!evtType){return false;}
//        // prevent default events        
//        evt.preventDefault();
//        evt.stopPropagation();
//        var actCanvHtmlId = evt.target.name;
//        // exit if not html element with id defined
//        if (!actCanvHtmlId){
//            return false;
//        }
//        
//        var arrActCanvHtmlId = actCanvHtmlId.split("_");
//        
//        //cdebug(actEvtId);
//        // exit if not canvas
//        if (arrActCanvHtmlId[2]!=="canvas"){return false;}
//        
//        var canvCElActualId = arrActCanvHtmlId[0] + "_" + arrActCanvHtmlId[1];
//        var canvCElActual = window[canvCElActualId];
//        var d = new Date();
//        canvCElActual.metrics = {"xy":[evt.offsetX ,evt.offsetY],"xyAbs":[evt.clientX,evt.clientY],"accessTime":d};
//        
//        var arrActEl = retCElId(canvCElActualId,canvCElActual.metrics.xy);
//        
//        var eventholder = window["eventholder"];
//        
//        
//        // active elements instantiation
//        var cElActualName = arrActEl[0];
//        //cdebug(cElActualName,true);
//        
//        var cElActual = window[cElActualName];
//        //cdebug(cElActual.name,true);
//
//        eventholder.cElActual = arrActEl;
//        
//        // old hover elements instantiation
//        var cElHoverOldName = eventholder.cElHover;
//        var cElHoverOld = window[cElHoverOldName];
//        var canvElHover = cElHoverOld ? window[cElHoverOld.pageId + "_" + cElHoverOld.layerId] : null;
//        
//        // old focus elements instantiation
//        var cElFocusOldName = eventholder.cElFocus;
//        var cElFocusOld = window[cElFocusOldName];
//        
//        var canvElFocusOld = cElFocusOld ? window[cElHoverOld.pageId + "_" + cElFocusOld.layerId] : null;
//        
//        // old active elements instantiation
//        var cElActiveOldName = eventholder.cElActive;
//        var cElActiveOld = window[cElActiveOldName];
//        var canvElActiveOld = cElActiveOld ? window[cElHoverOld.pageId + "_" + cElActiveOld.layerId] : null;
//        
//        var boolChangeElHover = (cElActualName !== cElHoverOldName) ? true : false;
//        var boolChangeElFocus = (cElActualName !== cElFocusOldName) ? true : false;
//        var boolChangeElActive = (cElActualName !== cElActiveOldName) ? true : false;
//        
//        var boolChangeCanvHover = (!canvElHover || canvCElActual.name !== canvElHover.name) ? true : false;
//        var boolChangeCanvFocus = (!canvElFocusOld || canvCElActual.name !== canvElFocusOld.name) ? true : false;
//        var boolChangeCanvActive = (!canvElActiveOld || canvCElActual.name !== canvElActiveOld.name) ? true : false;
//        
//        var boolRedrawCanvActual = false;
//        var boolRedrawCanvHover = false;
//        var boolRedrawCanvFocus = false;
//        var boolRedrawCanvActive = false;
//        
//        //if (!focusEl){return false;}   
//        switch(evtType){
//            case "mousedown":
//                
//                // CSS enabled events
//                //cdebug([[cElHoverOldName,cElFocusOldName,cElActiveOldName],[cElActualName]]);
//                //  focus reset for old focus element
//                if(cElFocusOld && boolChangeElFocus && !$.isEmptyObject(cElFocusOld.style.focus)){ //&& !$.isEmptyObject(cElActual.style.focus)
//                    cElFocusOld.focus = false;
//                    boolRedrawCanvFocus = true;
//                }
//                // new focus set
//                if(boolChangeElFocus ){ //&& !$.isEmptyObject(cElActual.style.focus)
//                    eventholder.cElFocus = arrActEl[0];//cloneMonoArray(arrActEl);
//                    cElActual.focus = true;
//                    boolRedrawCanvActual = true;
//                }
//                
//                //  active reset for old active element
//                if(canvElActiveOld && boolChangeElActive && !$.isEmptyObject(cElActiveOld.style.active) ){ //&& !$.isEmptyObject(cElActual.style.focus)
//                    cElActiveOld.active = false;
//                    boolRedrawCanvActive = true;
//                }
//                if(boolChangeElActive ){ //&& !$.isEmptyObject(cElActual.style.active)
//                    eventholder.cElActive = arrActEl[0];//cloneMonoArray(arrActEl);
//                    cElActual.active = true;
//                    boolRedrawCanvActual = true;
//                }
//                
//                //cdebug([boolRedrawCanvActual,boolChangeElFocus,boolChangeElActive,boolRedrawCanvActive]);
//                
//                // actual mousedown event
//                if(boolRedrawCanvActual)runEval(cElFocusOld,"focusoff");
//                if(boolChangeElFocus)runEval(cElActual,"focuson");
//                if(boolRedrawCanvActive)runEval(cElActiveOld,"activeoff");
//                if(boolChangeElActive)runEval(cElActual,"activeon");
//                
//                
//                
//                // finally redraw stuff
//                if(boolRedrawCanvFocus && boolChangeCanvFocus){
//                    //cdebug(cElHoverOld.pageId + "_" + cElFocusOld.layerId);
//                    canvElFocusOld.shape.redraw = true;
//                    drawChildren(canvElFocusOld);
//                }
//                if(boolRedrawCanvActive && boolChangeCanvActive && (cElFocusOldName !== cElActiveOldName)){
//                    cElActiveOld.shape.redraw = true;
//                    drawChildren(cElActiveOld);
//                }
//                if(boolRedrawCanvActual){
//                    canvCElActual.shape.redraw = true;
//                    drawChildren(canvCElActual);
//                }
//                
//                //resetCursor(cElActual);
//                
//                changeFocusToActive;
//                
//                runEval(cElActual,evtType) ;
//                
//                resetCursor(cElActual);
//                
//            break;
//            case "mouseup":
//                
//                // CSS enabled events                
//                
//                
//                //resetCursor(cElActual);
//                
//                runEval(cElActual,evtType) ;
//                
//                resetCursor(cElActual);
//                
//            break;
//            case "mousemove":
//                
//                // CSS enabled events
//                //  hover reset for old focus element
//                if(cElHoverOld && boolChangeElHover && !$.isEmptyObject(cElHoverOld.style.hover)){
//                    cElHoverOld.hover = false;
//                    boolRedrawCanvHover = true;
//                }
//                // new hover set
//                if(boolChangeElHover){
//                    eventholder.cElHover = arrActEl[0];
//                    cElActual.hover = true;
//                    boolRedrawCanvActual = true;
//                }
//                
//                if(boolRedrawCanvHover)runEval(cElHoverOld,"hoveroff");
//                if(boolRedrawCanvActual)runEval(cElActual,"hoveron");
//                
//                
//                // redraw stuff
//                if(boolRedrawCanvHover && boolChangeCanvHover){
//                    canvElHover.shape.redraw = true;
//                    drawChildren(canvElHover);
//                }
//                if(boolRedrawCanvActual){
//                    canvCElActual.shape.redraw = true;
//                    drawChildren(canvCElActual);
//                }
//                
//                
//                
//                runEval(cElActual,evtType) ;
//                
//                resetCursor(cElActual);
//                
//            break;
//            case "mouseout":
//                
//                // CSS enabled events
//                //  hover reset for old focus element
//                if(cElHoverOld && boolChangeElHover && !$.isEmptyObject(cElHoverOld.style.hover)){
//                    cElHoverOld.hover = false;
//                    boolRedrawCanvHover = true;
//                }
//                
//                // redraw stuff
//                if(boolRedrawCanvHover){
//                    canvElHover.shape.redraw = true;
//                    drawChildren(canvElHover);
//                }
//                
//                //resetCursor(cElActual);
//                
//                // actual mouse out event
//                runEval(cElActual,evtType) ;
//                
//                resetCursor(cElActual);
//                
//            break;
//        };
//        
//        //page.cElOld = cloneMonoArray(arrActEl);
//        return true;
//    
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//};

//function cEl_setCp(cEl){
//    
//    // exit if path already exists
//
//    var tempShape = cEl.shape.points;
//    var tempShapeType = cEl.shape.type;
//    var tempShapeLen = tempShape.length;
//    var x,y,x1,y1,x2,y2,wF,hF;
//    var cEl_layer = window[cEl.layerId];
//    wF=cEl_layer.shape.w;
//    hF=cEl_layer.shape.h;
//    var cpArray = [];
//    var cpBorder=[wF,hF,0,0];
//    
//    switch(tempShapeType){
//        
//        case "poligon":// Poligon Shape Lines
//            
//            x=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//            y=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//            
//            cpArray.push([x, y, 0, 0]);
//            cpBorder = cEl_setCpBorder(cpBorder,x,y);
//            
//            for(var i = 1; i < tempShapeLen; i = i + 1){
//                x=wF*cEl.shape.scale[0]*(tempShape[i][0]+cEl.shape.masspoint[0]);
//                y=hF*cEl.shape.scale[1]*(tempShape[i][1]+cEl.shape.masspoint[1]);
//                
//                cpArray.push([x, y, 0, i]);
//                cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                
//            }
//        break;
//        
//        case "quadratic":// Poligon  Shape Quadratic Points
//            x=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//            y=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//            
//            cpArray.push([x, y, 0, 0]);
//            cpBorder = cEl_setCpBorder(cpBorder,x,y);
//            
//            for(var i = 0; i < tempShapeLen - 2; i = i + 2){ //len
//                x=wF*cEl.shape.scale[0]*(tempShape[i+1][0]+cEl.shape.masspoint[0]);
//                y=hF*cEl.shape.scale[1]*(tempShape[i+1][1]+cEl.shape.masspoint[1]);
//                x1=wF*cEl.shape.scale[0]*(tempShape[i+2][0]+cEl.shape.masspoint[0]);
//                y1=hF*cEl.shape.scale[1]*(tempShape[i+2][1]+cEl.shape.masspoint[1]);
//                
//                cpArray.push([x1, y1, 0, i+2]);
//                cpArray.push([x, y, 1, i+1]);
//                
//                
//                cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                cpBorder = cEl_setCpBorder(cpBorder,x1,y1);
//                
//            }
//            switch(tempShapeLen-i){
//                case 2:
//                    x=wF*cEl.shape.scale[0]*(tempShape[i+1][0]+cEl.shape.masspoint[0]);
//                    y=hF*cEl.shape.scale[1]*(tempShape[i+1][1]+cEl.shape.masspoint[1]);
//                    x1=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//                    y1=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//                    
//                    //cpArray.push([x1, y1, 0, i]);
//                    cpArray.push([x, y, 1, i+1]);
//                    
//                    
//                    cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                    cpBorder = cEl_setCpBorder(cpBorder,x1,y1);
//                    
//                break;
//                case 1:
//                    x=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//                    y=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//                    
//                    //cpArray.push([x, y, 0, i]);
//                    
//                    cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                    
//                break;
//            }
//        break;
//        
//        case "bezier":// Poligon  Poligon  Shape Bezier Points
//            x=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//            y=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//   
//            cpArray.push([x, y, 0, 0]);
//            cpBorder = cEl_setCpBorder(cpBorder,x,y);
//            
//            for(var i = 0; i < tempShapeLen - 3; i = i + 3){
//                 
//                x=wF*cEl.shape.scale[0]*(tempShape[i+1][0]+cEl.shape.masspoint[0]);
//                y=hF*cEl.shape.scale[1]*(tempShape[i+1][1]+cEl.shape.masspoint[1]);
//                x1=wF*cEl.shape.scale[0]*(tempShape[i+2][0]+cEl.shape.masspoint[0]);
//                y1=hF*cEl.shape.scale[1]*(tempShape[i+2][1]+cEl.shape.masspoint[1]);
//                x2=wF*cEl.shape.scale[0]*(tempShape[i+3][0]+cEl.shape.masspoint[0]);
//                y2=hF*cEl.shape.scale[1]*(tempShape[i+3][1]+cEl.shape.masspoint[1]);
//                
//                cpArray.push([x2, y2, 0, i+3]);
//                cpArray.push([x, y, 1, i+1]);
//                cpArray.push([x1, y1, 2, i+2]);
//                
//                
//                cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                cpBorder = cEl_setCpBorder(cpBorder,x1,y1);
//                cpBorder = cEl_setCpBorder(cpBorder,x2,y2);
//
//                
//            }
//            switch(tempShapeLen-i){
//                case 3:
//                    x=wF*cEl.shape.scale[0]*(tempShape[i+1][0]+cEl.shape.masspoint[0]);
//                    y=hF*cEl.shape.scale[1]*(tempShape[i+1][1]+cEl.shape.masspoint[1]);
//                    x1=wF*cEl.shape.scale[0]*(tempShape[i+2][0]+cEl.shape.masspoint[0]);
//                    y1=hF*cEl.shape.scale[1]*(tempShape[i+2][1]+cEl.shape.masspoint[1]);
//                    x2=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//                    y2=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//                    
//                    //cpArray.push([x2, y2, 0, 0]);
//                    cpArray.push([x, y, 1, i+1]);
//                    cpArray.push([x1, y1, 2, i+2]);
//                    
//                    
//                    cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                    cpBorder = cEl_setCpBorder(cpBorder,x1,y1);
//                    cpBorder = cEl_setCpBorder(cpBorder,x2,y2);
//                    
//                break;
//                case 2:
//                    x=wF*cEl.shape.scale[0]*(tempShape[i+1][0]+cEl.shape.masspoint[0]);
//                    y=hF*cEl.shape.scale[1]*(tempShape[i+1][1]+cEl.shape.masspoint[1]);
//                    x1=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//                    y1=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//                    
//                    //cpArray.push([x1, y1, 0, i]);
//                    cpArray.push([x, y, 1, i+1]);
//                    
//                    
//                    cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                    cpBorder = cEl_setCpBorder(cpBorder,x1,y1);
//                    
//                break;
//                case 1:
//                    x=wF*cEl.shape.scale[0]*(tempShape[0][0]+cEl.shape.masspoint[0]);
//                    y=hF*cEl.shape.scale[1]*(tempShape[0][1]+cEl.shape.masspoint[1]);
//                    
//                    //cpArray.push([x, y, 0, 0]);
//                    
//                    cpBorder = cEl_setCpBorder(cpBorder,x,y);
//                    
//                break;
//            }
//        break;
//    };
//    
//    cEl.shape.temp.cpMp = [wF*cEl.shape.scale[0]*cEl.shape.masspoint[0],hF*cEl.shape.scale[1]*cEl.shape.masspoint[1],3];
//    cEl.shape.temp.cpBorder = cpBorder;
//    cEl.shape.temp.cp = cpArray;
//    return true;
//};



//function cEnvelope(cId,cMousePos,cTouchPos,cActCanv,cNoOfCanv,cNoOfEl,children){
//    var cEnvelopeObj = new Object();
//    cEnvelopeObj.cId=cId;
//    cEnvelopeObj.cMousePos=cMousePos;
//    cEnvelopeObj.cTouchPos=cTouchPos;
//    cEnvelopeObj.cActCanv=null;
//    cEnvelopeObj.cActEl=null;
//    cEnvelopeObj.cFocus=null;
//    cEnvelopeObj.cLastFocus=null;
//    cEnvelopeObj.cHoverEl=null;
////    cEnvelopeObj.cPrevEl = null;
//    cEnvelopeObj.cNoOfCanv=cNoOfCanv;
//    cEnvelopeObj.cNoOfEl=cNoOfEl;
//    cEnvelopeObj.children=children;
//    return cEnvelopeObj;
//}

//function setEnvelopeMP(arrPoint,actCanvCId){
//    
//    Envelope.cMousePos = arrPoint;
//    Envelope.cActCanv = actCanvCId;
//    return true;
//}

//function cEl(cId,cClass,tag,cAddStyle,cShapeType,cShape,cActive,cFocus,visible,cTab,cParentId,cCanvId,children,cValStore,cValue,cTextVal,cTextEditable){
//    
//    //To do : create container for animations and events code, etc
//   
//    this.cId = cId;
//    this.cClass = cClass;
//    this.tag = tag;
//    
//    this.cStyle = setStyle_cEl(cId, cClass, tag, cAddStyle);
//    this.cShape = cShape;
//    this.cShapeType = cShapeType;
//    this.cShapeObf = obfuscate(this);
//    
//    this.cEvents = retEvents(this);
//    this.cActive = cActive;
//    this.cFocus = cFocus;
//    this.cHover = false;
//    this.cRepaint = true;
//    this.visible = visible;
//    this.cTab = cTab;
//    this.cParentId = cParentId;
//    this.children = children;
//    
//    this.cValStore = cValStore;
//    this.cValue = cTextVal;
//    this.cTextEditable = cTextEditable;
//    this.cTextObj2 = getTextObj2(cTextVal,cTextEditable);
//    this.cCtx = false;
//    this.cBkg = [null,null,null];
//    
//    intNoOfElements++;
//    this.cUId = id_generator("cId_",6);
//    this.cCanvId = cCanvId;
//    
//    // TODO replace this with something more elegant
//    if(tag === "canvas"){
//        Envelope.children.push(this);
//        Envelope.cNoOfCanv++;
//    }else{
//        Envelope.cNoOfEl++;
//        var canvEl = retCanvById(cCanvId);
//        appendCEl(canvEl,this);
//    }
//    
//    return true;
//};

//function retEvents(){
//    
//    var eventsObj = new Object();
//    var d = new Date();
//    eventsObj.nearPoint = [null,null];
//    eventsObj.nearPointId = null;
//    eventsObj.nearPointType = null;
//    eventsObj.actPoint = [null,null];
//    eventsObj.lastAccess = d;
//    eventsObj.animationOn = false;
//    eventsObj.animationPath = null;
//    
//    return eventsObj;
//}



//function appendCEl(cEl,child){
//    
//    cEl.children.push(child);
//    if(!child.cClass){
//        child.cClass = cEl.cClass;
//    }
//    child.cParentId = cEl.cId;
//    return true;
//};



//function deObfuscate(actEl){
//    
//    var obfuscated = actEl.cShapeObf;
//    var zoom = obfuscated.zoom;
//    var xTr = obfuscated.xTr;
//    var yTr = obfuscated.yTr;
//    
//    var x1 = obfuscated.massPoint[0];
//    var y1 = obfuscated.massPoint[1];
//    
//    var cShapeDots = actEl.cShape;
//    var lenCShapeDots = cShapeDots.length;
//    
//    for(var i = 0; i < lenCShapeDots ; i++){
//        cShapeDots[i][0] = Math.floor((x1 + zoom*obfuscated.obfDots[i][0] + xTr));
//        cShapeDots[i][1] = Math.floor((y1 + zoom*obfuscated.obfDots[i][1] + yTr));
//    }
//    return true;
//};

//function setPointObfuscated(actEl,pointVal,pointCPIndex){
//    
//    var obfuscated = actEl.cShapeObf;
//    
//    switch(true){
//        case (pointCPIndex>-1):
//            // control points
//            var zoom = obfuscated.zoom;
//            var xTr = obfuscated.xTr;
//            var yTr = obfuscated.yTr;
//            var x1 = obfuscated.massPoint[0];
//            var y1 = obfuscated.massPoint[1];
//            var xNewPos = Math.floor(pointVal[0]/zoom -x1 -xTr);
//            var yNewPos = Math.floor(pointVal[1]/zoom -y1 -yTr);
//            obfuscated.obfDots[pointCPIndex][0] = xNewPos;
//            obfuscated.obfDots[pointCPIndex][1] = yNewPos;
//            resetShapeRect(actEl);
//        break;
//        case (pointCPIndex===-1):
//            // mass point
//            obfuscated.massPoint[0] = pointVal[0];
//            obfuscated.massPoint[1] = pointVal[1];
//        break;
//        case (pointCPIndex>-6):
//            // corner points
//            
//        break;
//          
//    }
//    
//}

//function updateMassPoint(actEl,pointVal){
//    try{
//        var obfuscated = actEl.cShapeObf;
//        var x1 = obfuscated.massPoint[0];
//        var y1 = obfuscated.massPoint[1];
//        var obfDots = obfuscated.obfDots;
//
//        var lenobfDots = obfDots.length;
//        for(var i = 0; i < lenobfDots ; i++){
//            obfDots[i][0] = obfDots[i][0] + x1 - pointVal[0];
//            obfDots[i][1] = obfDots[i][1] + y1 - pointVal[1];
//        };
//        obfuscated.topX = obfuscated.topX + x1 - pointVal[0];
//        obfuscated.topY = obfuscated.topY + y1 - pointVal[1];
//
//        obfuscated.massPoint[0] = pointVal[0];
//        obfuscated.massPoint[1] = pointVal[1];
//        return true;
//    }catch(err){
//        return err;
//    }
//}


//function obfuscate(actEl,zoom,xTr,yTr){
//    try{
//        var cShapeDots = actEl.cShape;   
//        var lenCShapeDots = cShapeDots.length;
//        var obfuscated = new Object();
//        if(!zoom){
//            zoom = 1;
//        }
//        if(!xTr){
//            xTr = 0;
//        }
//        if(!yTr){
//            yTr = 0;
//        }
//
//        obfuscated.zoom = zoom;
//        obfuscated.xTr = xTr;
//        obfuscated.yTr = yTr;
//
//        var centroidPoint = getCentroidPoint(cShapeDots);
//        var xCentroid = centroidPoint[0];
//        var yCentroid = centroidPoint[1];
//
//        obfuscated.massPoint = [xCentroid,yCentroid];
//        var topX=100000, topY=100000, botX=0, botY=0;
//        var obfShapeDots = [];
//        var xPos,yPos;
//        for(var i = 0; i < lenCShapeDots ; i++){
//            xPos = cShapeDots[i][0];
//            yPos = cShapeDots[i][1];
//            obfShapeDots.push([xPos-xCentroid,yPos-yCentroid]);
//            if(topX > xPos){topX = xPos;};
//            if(topY > yPos){topY = yPos;};
//            if(botX < xPos){botX = xPos;};
//            if(botY < yPos){botY = yPos;};
//        };
//
//        obfuscated.topX = topX - xCentroid;
//        obfuscated.topY = topY - yCentroid;
//        obfuscated.width = botX - topX;
//        obfuscated.height = botY - topY;
//        obfuscated.obfDots = obfShapeDots;
//    
//        return obfuscated;
//    }catch(err){
//        return err;
//    }
//}
//cEl.prototype.attachEvents





//function drawEl(tempEl,boolResetMe,boolDebugMode){
//    var ctxAct;
//    var tempSizer;
//    var tempElType = tempEl.tag;
//    switch(tempElType){
//        case "group":
//        case "label":
//            //console.log("draw 0 " + boolResetMe);
//            var boolUpdateMe = tempEl.cRepaint;
//            //console.log("draw 1 " + boolUpdateMe);
//            if(boolResetMe){
//                boolUpdateMe = true;
//            }
//            //console.log("draw 2 " + boolUpdateMe);
//            ctxAct = retCanvCtxById(tempEl.cCanvId);
//            if(!tempEl.cBkg[1]){
//                boolUpdateMe = true;
//            }
//            //console.log("draw 3 " + boolUpdateMe);
//            
//            if(boolUpdateMe){
//                //console.log("draw 4a ,update "+ boolUpdateMe + ", " + tempEl.cId);
//                //cdebug("draw 4a ,update "+ boolUpdateMe + ", " + tempEl.cId);
//                //cdebug("draw ...",true);
//                deObfuscate(tempEl);
//                tempSizer = getShapeRect(tempEl);
//                tempEl.cBkg[0] = tempSizer;
//                var zz = new Object;
//                
//                
//                zz  = document.createElement('canvas');
//                zz.name = 'canvBuilder';
//                zz.style.backgroundColor = 'transparent';
//                var zzCtx = zz.getContext("2d");
//                zzCtx.imageSmoothingEnabled= false;
//                
//                
//                zz.width = tempSizer[2];
//                zz.height = tempSizer[3];
//                //zz.style.width = tempSizer[2]+'px';
//                //zz.style.height = tempSizer[3]+'px';
//                
//                drawShapeObj(zzCtx,tempEl,tempSizer,boolDebugMode);
//                drawTextObj2(zzCtx,tempEl,boolDebugMode);
//                
//                ctxAct.drawImage(zz,tempSizer[0],tempSizer[1]);
//                tempEl.cCtx = true;
//                
//                //zz = canvBuilder;
//                
//                //tempEl.cBkg[1] = canvBuilder.toDataURL("image/png");
//                tempEl.cBkg[1] = zz;//.toDataURL("image/png");
//                tempEl.cRepaint = false;
//            }else{
//                
//                //console.log("draw 4b ,update "+ boolUpdateMe + ", " + tempEl.cId);
//                //cdebug("draw 4b ,update "+ boolUpdateMe + ", " + tempEl.cId);
//                //imgBuilder.src = tempEl.cBkg[1];
//                //ctxAct.drawImage(imgBuilder,tempEl.cBkg[0][0],tempEl.cBkg[0][1]);
//                //imgBuilder.src = tempEl.cBkg[1];
//                ctxAct.drawImage(tempEl.cBkg[1],tempEl.cBkg[0][0],tempEl.cBkg[0][1]);
//            }
//            
//        break;
//
//    }
//    return true;
//};
//
//function drawShapeObj(ctxBuilder,tempEl,tempSizer,boolDebugMode){
//    try{
//        
//        var lineWidth = 0;
//        if(tempEl.cStyle["border-top-width"]){
//            lineWidth = Number(tempEl.cStyle["border-top-width"].replace("px",''));
//        };
//        
//        cCreatePath(ctxBuilder,tempEl,tempSizer);
//
//        ctxBuilder.lineWidth = tempEl.cStyle["border-top-width"].replace("px",'');
//
//        var fillColor = tempEl.cStyle["background-color"];
//        if(tempEl.cFocus){
//            fillColor = tempEl.cStyle["background-color-edit-on"];
//        }else{
//            if(tempEl.cHover && tempEl.cStyle["hover-color"]){
//                fillColor = tempEl.cStyle["hover-color"];
//            }
//        }
//        ctxBuilder.fillStyle = fillColor;
//        ctxBuilder.fill();
//
//        if (lineWidth > 0){
//            ctxBuilder.lineWidth = lineWidth;
//            ctxBuilder.strokeStyle = tempEl.cStyle["border-top-color"];
//            ctxBuilder.stroke();
//        }
//        
//        return true;
//    }catch(err){
//        return err;
//    };
//}



//cId,cClass,tag,cShape,cActive,cFocus,visible,cTab,cParentId,children,cValStore,cValue,cCanvId, cUId,cCtx

//function getShapeRect(cEl){
//
//    var lineWidth = 0;
//    if(cEl.cStyle["border-top-width"]){
//        lineWidth = Number(cEl.cStyle["border-top-width"].replace("px",''));
//    }
//    var borderOffset = lineWidth ;
//    var topX,topY,elWidth,elHeight;
//    var obfuscated = cEl.cShapeObf;
//    
//    topX =  obfuscated.zoom*obfuscated.topX+obfuscated.massPoint[0]+obfuscated.xTr - borderOffset;
//    topY =  obfuscated.zoom*obfuscated.topY+obfuscated.massPoint[1]+obfuscated.yTr - borderOffset;
//    elWidth =  obfuscated.zoom*(obfuscated.width) + 2*borderOffset;
//    elHeight =  obfuscated.zoom*(obfuscated.height) + 2*borderOffset;
//    
//    var retArray = [topX,topY,elWidth,elHeight];
//    //console.log(cEl.cShape + " vs " + retArray);
//    return retArray;
//};
//
//function resetShapeRect(cEl){
//    var i, topX=100000, topY=100000, botX=-100000, botY=-100000, lenShape;
//    
//    var obfuscated = cEl.cShapeObf;
//    var tempShape = obfuscated.obfDots;
//    lenShape = tempShape.length;
//    
//    for(i=0;i<lenShape;i++){
//        if(topX > tempShape[i][0]){ topX = tempShape[i][0];}
//        if(topY > tempShape[i][1]){ topY = tempShape[i][1];}
//        if(botX < tempShape[i][0]){ botX = tempShape[i][0];}
//        if(botY < tempShape[i][1]){ botY = tempShape[i][1];}
//    }
//    obfuscated.topX = topX;
//    obfuscated.topY = topY;
//    obfuscated.width = botX - topX ;
//    obfuscated.height = botY - topY ;
//
//}

//function cCreatePath (ctx,cEl,offsets){
//    
//    var tempShape = cEl.cShape;
//    var tempShapeType = cEl.cShapeType;
//    var tempShapeLen = tempShape.length;
//    var offX = offsets[0];
//    var offY = offsets[1];
//
//    switch(tempShapeType){
//        
//        case 0:// Poligon Shape Lines
//            ctx.beginPath();
//            ctx.moveTo(tempShape[0][0]-offX, tempShape[0][1]-offY);
//            for(var i = 1; i < tempShapeLen; i = i + 1){
//                ctx.lineTo(tempShape[i][0]-offX, tempShape[i][1]-offY);
//            }
//            ctx.closePath();
//        break;
//        
//        case 1:// Poligon  Shape Quadratic Points
//            ctx.beginPath();
//            ctx.moveTo(tempShape[0][0]-offX, tempShape[0][1]-offY);
//            for(var i = 0; i < tempShapeLen - 2; i = i + 2){ //len
//                ctx.quadraticCurveTo(tempShape[i+1][0]-offX, tempShape[i+1][1]-offY,tempShape[i+2][0]-offX, tempShape[i+2][1]-offY);
//            }
//            switch(tempShapeLen-i){
//                case 2:
//                    ctx.quadraticCurveTo(tempShape[i+1][0]-offX, tempShape[i+1][1]-offY,tempShape[0][0]-offX, tempShape[0][1]-offY);
//                break;
//                case 1:
//                    ctx.lineTo(tempShape[0][0]-offX, tempShape[0][1]-offY);
//                break;
//            }
//            ctx.closePath();
//        break;
//        
//        case 2:// Poligon  Poligon  Shape Bezier Points
//            ctx.beginPath();
//            ctx.moveTo(tempShape[0][0]-offX, tempShape[0][1]-offY);
//            for(var i = 0; i < tempShapeLen - 3; i = i + 3){
//                ctx.bezierCurveTo(tempShape[i+1][0]-offX, tempShape[i+1][1]-offY,tempShape[i+2][0]-offX, tempShape[i+2][1]-offY,tempShape[i+3][0]-offX, tempShape[i+3][1]-offY);
//            }
//            switch(tempShapeLen-i){
//                case 3:
//                    ctx.bezierCurveTo(tempShape[i+1][0]-offX, tempShape[i+1][1]-offY,tempShape[i+2][0]-offX, tempShape[i+2][1]-offY,tempShape[0][0]-offX, tempShape[0][1]-offY);
//                break;
//                case 2:
//                    ctx.quadraticCurveTo(tempShape[i+1][0]-offX, tempShape[i+1][1]-offY,tempShape[0][0]-offX, tempShape[0][1]-offY);
//                break;
//                case 1:
//                    ctx.lineTo(tempShape[0][0]-offX, tempShape[0][1]-offY);
//                break;
//            }
//            ctx.closePath();
//        break;
//    };
//    return true;
//};




//function retCElById(elId,actCanvId){
//    return window[elId];
////    var tempEl;
////    if(actCanvId){
////        //cdebug(actCanvId);
////        var actCanv = retCanvById(actCanvId);
////        if(actCanv){
////            var nOfChildren = actCanv.children.length;
////            for (var i = nOfChildren - 1; i >= 0; i--) {
////                tempEl = actCanv.children[i];
////                if(tempEl.cId === elId){
////                    return tempEl; 
////                }
////            }
////        }
////    }else{
////        if (Envelope.children){
////            for(var i = 0, maxNo = Envelope.children.length; i < maxNo; i++){
////                tempEl = retCElById(elId,Envelope.children[i].cId);
////                if(tempEl){
////                    return tempEl;
////                }
////            }
////        }
////    }
//};

//function retCElIndexById(elId,actCanvId){
//    var tempEl;
//    if(actCanvId){
//        var actCanv = retCanvById(actCanvId);
//        var nOfChildren = actCanv.children.length;
//        for (var i = nOfChildren - 1; i >= 0; i--) {
//            tempEl = actCanv.children[i];
//            if(tempEl.cId === elId){
//                return i; 
//            }
//        }
//    }else{
//        for(var i = 0, maxNo = Envelope.children.length; i < maxNo; i++){
//            tempEl = retCElById(elId,Envelope.children[i].cId);
//            if(tempEl){
//                return i;
//            }
//        }
//    }
//};

///////////////////// HANDLE EVENTS
//var event; // The custom event that will be created
//
//  if (document.createEvent) {
//    event = document.createEvent("HTMLEvents");
//    event.initEvent("name-of-custom-event", true, true);
//  } else {
//    event = document.createEventObject();
//    event.eventType = "name-of-custom-event";
//  }
//
//  event.eventName = "name-of-custom-event";
//
//  if (document.createEvent) {
//    element.dispatchEvent(event);
//  } else {
//    element.fireEvent("on" + event.eventType, event);
//  }


//function getCElfromArr(arrActEl){
//    var focusElName;
//    
//    //cdebug(arrActEl);
//    
//    if(!arrActEl)return null;
////    if(arrActEl.length>1){
////        // TODO ???? why there are 2 instances, find bug later
//////        if(arrActEl[0]===arrActEl[arrActEl.length-1]){
//////            focusElName = arrActEl[0];
//////        }else{
////            focusElName = arrActEl[0];
//////        }
////    }else{
//         focusElName = arrActEl[0];
////    };
//    return focusElName;
//}




///**
// * @author Joseph Lenton - PlayMyCode.com
// *
// * @param image1 An ImageData object from the first image we are colliding with.
// * @param x1 The x location of 'first'.
// * @param y1 The y location of 'first'.
// * @param image2 An ImageData object from the second image involved in the collision check.
// * @param x2 The x location of 'other'.
// * @param y2 The y location of 'other'.
// * @param isCentred True if the locations refer to the centre of 'first' and 'other', false to specify the top left corner.
// */
//function isPixelCollision( image1, x1, y1, image2, x2, y2, isCentred ){
//    // we need to avoid using floats, as were doing array lookups
//    x1  = Math.round( x1 );
//    y1  = Math.round( y1 );
//    x2 = Math.round( x2 );
//    y2 = Math.round( y2 );
//
//    var w1  = image1.width,
//        h1  = image1.height,
//        w2 = image2.width,
//        h2 = image2.height ;
//
//    // deal with the image being centred
//    if ( isCentred ) {
//        // fast rounding, but positive only
//        x1 -= ( w1/2 + 0.5) << 0;
//        y1 -= ( h1/2 + 0.5) << 0;
//        x2 -= (w2/2 + 0.5) << 0;
//        y2 -= (h2/2 + 0.5) << 0;
//    }
//
//    // find the top left and bottom right corners of overlapping area
//    var xMin = Math.max( x1, x2 ),
//        yMin = Math.max( y1, y2 ),
//        xMax = Math.min( x1+w1, x2+w2 ),
//        yMax = Math.min( y1+h1, y2+h2 );
//
//    // Sanity collision check, we ensure that the top-left corner is both
//    // above and to the left of the bottom-right corner.
//    if ( xMin >= xMax || yMin >= yMax ) {
//        return false;
//    }
//
//    var xDiff = xMax - xMin,
//        yDiff = yMax - yMin;
//
//    // get the pixels out from the images
//    var pixels  = image1.data,
//        pixels2 = image2.data;
//
//    // if the area is really small,
//    // then just perform a normal image collision check
//    if ( xDiff < 4 && yDiff < 4 ) {
//        for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
//            for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
//                if (
//                        ( pixels [ ((pixelX-x1 ) + (pixelY-y1 )*w1 )*4 + 3 ] !== 0 ) &&
//                        ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
//                ) {
//                    return true;
//                }
//            }
//        }
//    } else {
//        /* What is this doing?
//         * It is iterating over the overlapping area,
//         * across the x then y the,
//         * checking if the pixels are on top of this.
//         *
//         * What is special is that it increments by incX or incY,
//         * allowing it to quickly jump across the image in large increments
//         * rather then slowly going pixel by pixel.
//         *
//         * This makes it more likely to find a colliding pixel early.
//         */
//
//        // Work out the increments,
//        // it's a third, but ensure we don't get a tiny
//        // slither of an area for the last iteration (using fast ceil).
//        var incX = xDiff / 3.0,
//            incY = yDiff / 3.0;
//        incX = (~~incX === incX) ? incX : (incX+1 | 0);
//        incY = (~~incY === incY) ? incY : (incY+1 | 0);
//
//        for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
//            for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
//                for ( var pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
//                    for ( var pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
//                        if (
//                                ( pixels [ ((pixelX-x1 ) + (pixelY-y1 )*w1 )*4 + 3 ] !== 0 ) &&
//                                ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
//                        ) {
//                            return true;
//                        }
//                    }
//                }
//            }
//        }
//    }
//
//    return false;
//}
//
//function resetImgBkg(actEl){
//    
//    var ctx = actEl.cCtx;
//    var tempSizer = actEl.cBkg[0];
//    var actImage = ctx.getImageData(tempSizer[0],tempSizer[1],tempSizer[2],tempSizer[3]);
//    var cColAct,cColPrev,cColBkg,cAlfaAct,cAlfaPrev,cAlfaBkg;
//    var cRed,cGreen,cBlue,cAlfaPreBlend,cBoolChg1;
//    
//    cdebug(tempSizer);
//    
//    //cdebug(actImage.data.length + " " + actEl.cBkg[1].data.length + " " + actEl.cBkg[2].data.length);
//    var lenImage = actImage.data.length-3;
//    for(var i = 0; i < lenImage; i = i + 4){
//        var cColor=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
//        cBoolChg1 = false; 
//        for(var j = 3; j >= 0; j--){
//            cColAct = actImage.data[i+j];
//            cColPrev = actEl.cBkg[2].data[i+j];
//            cColBkg = actEl.cBkg[1].data[i+j];
//            cColor[j][0]=cColAct;
//            cColor[j][1]=cColPrev;
//            cColor[j][2]=cColBkg;
//            if(cColAct!==cColPrev){
//                cBoolChg1 = true;
//            }
//        }
//        
//        if(cBoolChg1){
//            
//            cAlfaPreBlend = 255*(cColor[3][0]-cColor[3][1])/(255-cColor[3][1]);
//            if(i===50000){
//                cdebug("cAlfaPreBlend " + cAlfaPreBlend);
//            }
//            cRed = 255*(cColor[0][0]*cColor[3][0] - cColor[0][1]*cColor[3][1])/((255-cColor[3][1])*cAlfaPreBlend);
//            cGreen = 255*(cColor[1][0]*cColor[3][0] - cColor[1][1]*cColor[3][1])/((255-cColor[3][1])*cAlfaPreBlend);
//            cBlue = 255*(cColor[2][0]*cColor[3][0] - cColor[2][1]*cColor[3][1])/((255-cColor[3][1])*cAlfaPreBlend);
//            
//            actEl.cBkg[1].data[i+0] = cRed;
//            actEl.cBkg[1].data[i+1] = cGreen;
//            actEl.cBkg[1].data[i+2] = cBlue;
//            actEl.cBkg[1].data[i+3] = cAlfaPreBlend;
//
//        }
//
////        if ((i)%50000===0){
////            cdebug(i + " " + j + " R " + cColor[0] + " ,G " + cColor[1] + " ,B " + cColor[2]+ " ,Alfa " + cColor[3]);
////        }
//    
//    }
//
//    ctx.putImageData(actEl.cBkg[1],tempSizer[0],tempSizer[1]);
//}
//
//Number(getComputedStyle(document.body,null).fontSize.replace(/[^\d]/g, ''));
//Number(  // Casts numeric strings to number
//   getComputedStyle(  // takes element and returns CSSStyleDeclaration object
//     document.body,null) // use document.body to get first "styled" element
//         .fontSize  // get fontSize property
//          .replace(/[^\d]/g, '')  // simple regex that will strip out non-numbers
// );

//                var lineWidth = 0;
//                if(tempEl.cStyle["border-top-width"]){
//                    lineWidth = Number(tempEl.cStyle["border-top-width"].replace("px",''));
//                };
//                cCreatePath(ctxBuilder,tempEl,[tempSizer[0],tempSizer[1]]);
//
//                if (lineWidth > 0){
//                    ctxBuilder.lineWidth = lineWidth;
//                    ctxBuilder.strokeStyle = tempEl.cStyle["border-top-color"];
//                    ctxBuilder.stroke();
//                };
//                var fillColor = tempEl.cStyle["background-color"];
//                if(tempEl.cFocus){
//                    fillColor = tempEl.cStyle["background-color-edit-on"];
//                }else{
//                    if(tempEl.cHover && tempEl.cStyle["hover-color"]){
//                        fillColor = tempEl.cStyle["hover-color"];
//                    }
//                }
//                ctxBuilder.fillStyle = fillColor;
//                ctxBuilder.fill();

//function draw_cElalt(cEl){
//    
//    deObfuscate(cEl);
//
//    var tempSizer = getShapeRect(cEl);
//    cEl.cBkg[0] = tempSizer;
//    var actcanv = document.getElementById(cEl.cCanvId);
//    var ctxAct = actcanv.getContext('2d');
//    var canvCEl = retCanvById(cEl.cCanvId);
//    //ctxAct.globalCompositeOperation('copy');
//    // store background before drawing the element
//    if (!cEl.cBkg[1]){
//        cEl.cBkg[1] = actcanv.toDataURL("image/png");
//    }else{
//        //drawCel();
//        imgBuilder.src = cEl.cBkg[1];
//        ctxAct.drawImage(imgBuilder,0,0);
//        var canvWidth = canvCEl.cShape[1][0] - canvCEl.cShape[0][0];
//        var canvHeight = canvCEl.cShape[3][1] + canvCEl.cShape[0][1];
//        actcanv.width = canvWidth;
//        actcanv.height = canvHeight;
//        actcanv.style.width = canvWidth+'px';
//        actcanv.style.height = canvHeight+'px';
//        
//        //cEl.cBkg[1] = null;
//    }
//    var lineWidth = 0;
//    if(cEl.cStyle["border-top-width"]){
//        lineWidth = Number(cEl.cStyle["border-top-width"].replace("px",''));
//    }
//
//    cCreatePath(ctxAct,cEl,[0,0]);
//
//    if (lineWidth > 0){
//        ctxAct.lineWidth = lineWidth;
//        ctxAct.strokeStyle = cEl.cStyle["border-top-color"];
//        ctxAct.stroke();
//    }
//
//    var fillColor = cEl.cStyle["background-color"];
//
//    if(cEl.cFocus){
//        fillColor = cEl.cStyle["background-color-edit-on"];
//    }else{
//        if(cEl.cHover && cEl.cStyle["hover-color"]){
//            fillColor = cEl.cStyle["hover-color"];
//        }
//    }
//    ctxAct.fillStyle = fillColor;
//    ctxAct.fill();
//    
//}

//function getTextLength(cEl,cEl_ctx){
//    
//    try{
//        var cEl_pageText = window[cEl.pageId].text;
//        //if(cEl_pageText.chars && cEl_pageText.chars!==""){
//        // declare a blank array
//        var arrTextLengths = [];
//        
//        // iterate trough the varText array and generate a new array of widths
//        for(var i = 0, maxlen = cEl_pageText.chars.length, charWidth; i < maxlen; i++){
//
//            charWidth = getCharStyle(cEl,cEl_ctx,cEl_pageText, cEl_pageText.chars[i]).width;
//            arrTextLengths.push(charWidth);
//            
//        };
//        return arrTextLengths;
//            
//        //}
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

//function create_text_lines(cEl_ctx,cEl){
//    
//    try{
//        
//        var intActLine = 0;
//        var wordChars,boolNoSkip,boolIsSpace,boolNewLine, boolNewParagraph = true;
//        var word;
//        var intXPos = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.textIndent,
//            intElIndex,
//            word,
//            wordWidths;
//        
//        // TODO fix countSpace before \n split 
//        var cEl_pageText = window[cEl.pageId].text;
//        
//        //hardcoded values, they are computed in code
//        //cEl_ctx.font = cEl.value.values.temp.font;
//        //cdebug("here",false,true,0);
//        cEl_ctx.fillStyle = cEl.value.values.temp.color;
//        cEl.value.values.temp.spaceWidthDef = getCharStyle(cEl,cEl_ctx,cEl_pageText," ").w;
//        cEl.value.values.temp.hypenWidthDef = getCharStyle(cEl,cEl_ctx,cEl_pageText,"-").w;
//         
//        cEl.value.values.temp.lines = [[[cEl.value.values.temp.spaceWidthDef,0,0,true]]];
//
//        if (cEl.value.values.vertical){
//            var trans = cEl.value.values.temp.maxHeight;
//            cEl.value.values.temp.maxHeight = cEl.value.values.temp.maxLength;
//            cEl.value.values.temp.maxLength = trans;
//
//            trans = cEl.value.values.temp.lineLeftStart;
//            cEl.value.values.temp.lineLeftStart = cEl.value.values.temp.lineTopStart;
//            cEl.value.values.temp.lineTopStart = trans;
//        }
//        
//        
//        if(cEl.value.values.temp.wordsList){
//            for(var i = 0 , lngMapLen = cEl.value.values.temp.wordsList.length, lngSpaceCount = 0;i < lngMapLen;i++){
//                
//                boolNoSkip = true;
//                
//                intElIndex = cEl.value.values.temp.wordsList[i];
//                
//                //wordChars = getWordChars(cEl_pageText,intElIndex);
//                word = cEl_pageText.words[intElIndex];
//                
//                wordWidths = getWordWidths(cEl,cEl_ctx,cEl_pageText,word);
//                boolIsSpace = (word === " ");
//                
//                // total width of row
//                boolNewLine = (intXPos + wordWidths.widthTotal >= cEl.value.values.temp.maxLength);
//                boolNewLine = (boolNewLine && (wordWidths.widthTotal < cEl.value.values.temp.maxLength - cEl.value.values.temp.lineLeftStart));
//  
//                if(word === "\\n" || word === "\\r"){
//                    boolNewLine = true;
//                    boolNewParagraph = true;
//                    boolNoSkip = false;
//                }
//
//                if(boolNewLine){
//                    //fill line end of line metrics
//                    if(!boolNewParagraph){
//                        cEl.value.values.temp.lines[intActLine][0][1] = lngSpaceCount - 1;
//                    }
//                    cEl.value.values.temp.lines[intActLine][0][2] = cEl.value.values.temp.maxLength - intXPos;
//                    cEl.value.values.temp.lines[intActLine][0][3] = boolNewParagraph;
//                    intActLine = intActLine + 1;
//                    cEl.value.values.temp.lines.push([[cEl.value.values.temp.spaceWidthDef,0,0,false]]);
//                    if(boolNewParagraph){
//                        intXPos = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.textIndent;
//                    }else{
//                        intXPos = cEl.value.values.temp.lineLeftStart;
//                    }
//                    lngSpaceCount = 0;
//                    if(boolIsSpace){
//                        boolNoSkip = false;
//                    }
//                }
//
//                // Finally add the words characters
//                if (boolNoSkip){
//                    
//                    if(boolIsSpace){
//                        lngSpaceCount++ ;
//                    }
//                    
//                    for(var j = 0, wordChar ,lenWord = word.length;j<lenWord;j++){
//                        //wordChar = wordChars[j];
//                        //wordChar = cEl_pageText.chars[wordChars[j]];
//                        wordChar = word[j];
//                        
//                        var intCharLen = wordWidths.widthChars[j].w;
//                        // break word condition
//                        if(intXPos + intCharLen > cEl.value.values.temp.maxLength){
//                            if(j !== lenWord){
//                                cEl.value.values.temp.lines[intActLine].push(["-",cEl.value.values.temp.hypenWidthDef + cEl.value.values.temp.letterSpacing]);
//                            }
//                            //fill line end of line metrics
//                            cEl.value.values.temp.lines[intActLine][0][1] = lngSpaceCount - 1;
//                            cEl.value.values.temp.lines[intActLine][0][2] = cEl.value.values.temp.maxLength - intXPos;
//                            intActLine = intActLine + 1;
//                            cEl.value.values.temp.lines.push([[cEl.value.values.temp.spaceWidthDef,0,0,false]]);
//                            intXPos = cEl.value.values.temp.lineLeftStart;
//                            lngSpaceCount = 0;
//
//                        }
//                        cEl.value.values.temp.lines[intActLine].push([wordChar,intCharLen]);
//                        intXPos+=intCharLen;
//                    }
//                }
//                boolNewParagraph = false;
//            }
//            //fill last line end of line metrics
//            cEl.value.values.temp.lines[intActLine][0][1] = 0;
//            cEl.value.values.temp.lines[intActLine][0][2] = cEl.value.values.temp.maxLength - intXPos;
//            cEl.value.values.temp.lines[intActLine][0][3] = false;
//            
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}
//
//
//function draw_cEl_lines(cEl_ctx,cEl){
//    
//    try{
//        
//        var charX = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.textIndent;
//        if(cEl.value.values.temp.textAlign === "right"){
//            charX = charX + cEl.value.values.temp.lines[0][0][2] - cEl.value.values.temp.textIndent;
//        }
//        
//        for(var i = 0, len = cEl.value.values.temp.lines.length ,charY = cEl.value.values.temp.lineTopStart , spaceWidth = cEl.value.values.temp.spaceWidthDef; i< len;i++){
//            
//            // exit if beyond max height
//            if(charY>cEl.value.values.temp.maxHeight && i>0)break;
//            
//            // set space char width
//            if (cEl.value.values.temp.textAlign === "justify"){
//                if (cEl.value.values.temp.lines[i][0][1] > 0 && cEl.value.values.temp.lines[i][cEl.value.values.temp.lines[i].length-2][0] !== "_"){ //TODO not nice, fix it here
//                    spaceWidth = (cEl.value.values.temp.lines[i][0][0]*cEl.value.values.temp.lines[i][0][1] + cEl.value.values.temp.lines[i][0][2])/cEl.value.values.temp.lines[i][0][1];
//                }else{
//                    spaceWidth = cEl.value.values.temp.spaceWidthDef;
//                }
//            }
//            
//            // iterate chars
//            for(var j = 1, lenChars = cEl.value.values.temp.lines[i].length, boolIsSpace; j < lenChars;j++){
//                boolIsSpace = (cEl.value.values.temp.lines[i][j][0] === " ");
//               
//                    // DO CHAR DRAW HERE
//                    if (cEl.value.values.vertical){
//                        cEl_ctx.fillText(cEl.value.values.temp.lines[i][j][0],charY,charX);
//                    }else{
//                        cEl_ctx.fillText(cEl.value.values.temp.lines[i][j][0],charX,charY);
//                    }
//                    // if blank then justify blank space
//                    if(boolIsSpace){
//                        charX = charX + spaceWidth;
//                    }else{
//                        charX = charX + cEl.value.values.temp.lines[i][j][1];
//                    }
//            }
//            
//            // reset left position
//            if(cEl.value.values.temp.textAlign === "right"){
//                if (i < len-1){
//                    charX = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.lines[i+1][0][2];
//                }else{
//                    charX = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.lines[i][0][2];
//                }
//            }else{
//                if(cEl.value.values.temp.lines[i][0][3]){
//                    charX = cEl.value.values.temp.lineLeftStart + cEl.value.values.temp.textIndent;
//                }else{
//                    charX = cEl.value.values.temp.lineLeftStart;
//                }
//            }
//            
//            // set height for new line
//            charY =  charY + cEl.value.values.temp.lineHeight;
//        }
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}