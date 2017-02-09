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


//paper.Path.inject({
//    _drawSelection: function(ctx, matrix, size, selectionItems, updateVersion) {
//        // your function here
//        _drawSelection_new (this,ctx, matrix, size, selectionItems, updateVersion);
//    }
//});
paper.Item.inject({
    _drawSelection: function(ctx, matrix, size, selectionItems, updateVersion) {
        // your function here
//        cdebug(this.className)();
        _drawSelection_new (this,ctx, matrix, size, selectionItems, updateVersion);
    }
});

paper.Item.inject({
    _hitTest: function(point, options, parentViewMatrix) {
        if (this._locked || !this._visible || this._guide && !options.guides
                || this.isEmpty()) {
            return null;
        }

        // Check if the point is withing roughBounds + tolerance, but only if
        // this item does not have children, since we'd have to travel up the
        // chain already to determine the rough bounds.
        var matrix = this._matrix,
            // Keep the accumulated matrices up to this item in options, so we
            // can keep calculating the correct _tolerancePadding values.
            viewMatrix = parentViewMatrix
                    ? parentViewMatrix.appended(matrix)
                    // If this is the first one in the recursion, factor in the
                    // zoom of the view and the globalMatrix of the item.
                    : this.getGlobalMatrix().prepend(this.getView()._matrix),
            // Calculate the transformed padding as 2D size that describes the
            // transformed tolerance circle / ellipse. Make sure it's never 0
            // since we're using it for division (see checkBounds()).
            tolerance = Math.max(options.tolerance, /*#=*/Numerical.EPSILON),
            // Hit-tests are performed in the item's local coordinate space.
            // To calculate the correct 2D padding for tolerance, we therefore
            // need to apply the inverted item matrix.
            tolerancePadding = options._tolerancePadding = new Size(
                    Path._getStrokePadding(tolerance,
                        matrix.inverted()._shiftless()));
        // Transform point to local coordinates.
        point = matrix._inverseTransform(point);
        // If the matrix is non-reversible, point will now be `null`:
        if (!point || !this._children &&
            !this.getBounds({ internal: true, stroke: true, handle: true })
                .expand(tolerancePadding.multiply(2))._containsPoint(point)) {
            return null;
        }

        // See if we should check self (own content), by filtering for type,
        // guides and selected items if that's required.
        var checkSelf = !(options.guides && !this._guide
                || options.selected && !this.isSelected()
                // Support legacy Item#type property to match hyphenated
                // class-names.
                || options.type && options.type !== Base.hyphenate(this._class)
                || options.class && !(this instanceof options.class)),
            match = options.match,
            that = this,
            bounds,
            res;

        function filter(hit) {
            if (hit && match && !match(hit))
                hit = null;
            // If we're collecting all matches, add it to options.all
            if (hit && options.all)
                options.all.push(hit);
            return hit;
        }

        function checkBounds(type, part) {
            var pt = bounds['get' + part]();
            // Since there are transformations, we cannot simply use a numerical
            // tolerance value. Instead, we divide by a padding size, see above.
            if (point.subtract(pt).divide(tolerancePadding).length <= 1) {
                return new HitResult(type, that,
                        { name: Base.hyphenate(part), point: pt });
            }
        }

        // Ignore top level layers by checking for _parent:
        if (checkSelf && (options.position || options.center || options.bounds) && this._parent) {
            // Don't get the transformed bounds, check against transformed
            // points instead
//            cdebug(this.className)();
            bounds = this.className==="Group"?this.bounds:this.getInternalBounds();

            
            if (options.position) {
                var pt = this.getPosition();
                if (point.subtract(pt).divide(tolerancePadding).length <= 1) {
                    res = new HitResult('position', that,
                        { name: 'position', point: pt });
                }
            }
            
            if (!res && options.center) {
                res = checkBounds('center', 'Center');
            }
            if (!res && options.bounds) {
                // TODO: Move these into a private scope
                var points = [
                    'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
                    'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
                ];
                for (var i = 0; i < 8 && !res; i++) {
                    res = checkBounds('bounds', points[i]);
                }
            }
            res = filter(res);
        }

        if (!res) {
            res = this._hitTestChildren(point, options, viewMatrix)
                // NOTE: We don't call match on _hitTestChildren() because
                // it is already called internally.
                || checkSelf
                    && filter(this._hitTestSelf(point, options, viewMatrix,
                        // If the item has a non-scaling stroke, we need to
                        // apply the inverted viewMatrix to stroke dimensions.
                        this.getStrokeScaling() ? null
                            : viewMatrix.inverted()._shiftless()))
                || null;
        }
        // Transform the point back to the outer coordinate system.
        if (res && res.point) {
            res.point = matrix.transform(res.point);
        }
        return res;
    }
});

//paper.Item.inject({
//    _drawSelected: function(ctx, matrix) {//
//        console.log("ere1");
////            ctx.beginPath();
////            drawSegments(ctx, this, matrix);
////            ctx.stroke();
////            drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
//    }
//});
paper.Path.inject({
    _drawSelected: function(ctx, matrix) {//
//        console.log(this.hasHandles());
        
//            ctx.beginPath();
////            drawSegments_duplicate(ctx, this, matrix);
//                
//            ctx.stroke();
            drawHandles_new(ctx, this._segments, matrix, paper.settings.handleSize, paper.data ,this.index);
//        console.log("ere3");
    }
});

function drawSegments_duplicate(ctx, path, matrix) {
    var segments = path._segments,
            length = segments.length,
            coords = new Array(6),
            first = true,
            curX, curY,
            prevX, prevY,
            inX, inY,
            outX, outY;

    function drawSegment(segment) {
            if (matrix) {
                    segment._transformCoordinates(matrix, coords);
                    curX = coords[0];
                    curY = coords[1];
            } else {
                    var point = segment._point;
                    curX = point._x;
                    curY = point._y;
            }
            if (first) {
                    ctx.moveTo(curX, curY);
                    first = false;
            } else {
                    if (matrix) {
                            inX = coords[2];
                            inY = coords[3];
                    } else {
                            var handle = segment._handleIn;
                            inX = curX + handle._x;
                            inY = curY + handle._y;
                    }
                    if (inX === curX && inY === curY
                                    && outX === prevX && outY === prevY) {
                            ctx.lineTo(curX, curY);
                    } else {
                            ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
                    }
            }
            prevX = curX;
            prevY = curY;
            if (matrix) {
                    outX = coords[4];
                    outY = coords[5];
            } else {
                    var handle = segment._handleOut;
                    outX = prevX + handle._x;
                    outY = prevY + handle._y;
            }
    }

    for (var i = 0; i < length; i++)drawSegment(segments[i],i);
    if (path._closed && length > 0)drawSegment(segments[0],0);
}

function drawHandles_new(ctx, segments, matrix, size , data ,indexLow) {
    
    try{
        var half = size / 2,
                coords = new Array(6),
                pX, pY;
        var fillStyle,strokeStyle,lineWidth;

        function drawHandle(index,color1,color2) {
                var hX = coords[index],
                        hY = coords[index + 1];
                if (pX != hX || pY != hY) {

                    fillStyle = ctx.fillStyle;
                    strokeStyle = ctx.strokeStyle;
                    ctx.fillStyle = color1;
                    ctx.strokeStyle = color1;
                    ctx.beginPath();
                    ctx.moveTo(pX, pY);
                    ctx.lineTo(hX, hY);
                    ctx.stroke();

    //                cdebug("herer1")();
                    if(color2){

                        lineWidth = ctx.lineWidth;

                        ctx.beginPath();
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "rgba(0,0,0,0.2)";
                        ctx.moveTo(hX, 0);
                        ctx.lineTo(hX, ctx.canvas.height);
                        ctx.moveTo(0, hY);
                        ctx.lineTo(ctx.canvas.width, hY);
                        ctx.stroke();

                        ctx.lineWidth = size / 3;
                        ctx.strokeStyle = color2;
                        ctx.beginPath();
                        ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
                        ctx.fill();
                        ctx.stroke();



                        ctx.lineWidth = lineWidth;
                    }else{

                        ctx.beginPath();
                        ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
                        ctx.fill();

                    }

                    ctx.fillStyle = fillStyle;
                    ctx.strokeStyle = strokeStyle;
                }
        }


        for (var i = 0,color = ctx.fillStyle, l = segments.length; i < l; i++) {
            var segment = segments[i],
                selection = segment._selection;
            segment._transformCoordinates(matrix, coords);
            pX = coords[0];
            pY = coords[1];


            if (selection & 2){
                if (data.cEl_grouphandledata && data.hitActType.index === i && data.hitActType.indexLow === indexLow){
                    if(data.hitActType.name==="handle-in"){
                        drawHandle(2,'rgba(255,255,0,1)','rgba(255,0,0,1)');
                    }else{
                        drawHandle(2,'rgba(255,255,0,1)');
                    }

                }else{
                    drawHandle(2,'rgba(255,255,0,0.2)');
                }

            }
            if (selection & 4){
                if (data.cEl_grouphandledata && data.hitActType.index === i && data.hitActType.indexLow === indexLow){
                    if(data.hitActType.name==="handle-out"){
                        drawHandle(4,'rgba(0,0,255,1)','rgba(255,0,0,1)');
                    }else{
                        drawHandle(4,'rgba(0,0,255,1)');
                    }    
                }else{
                    drawHandle(4,'rgba(0,0,255,0.2)');
                }
            }
    //            if (selection){
    //                
    //                
    //            }
            if (!(selection & 1)) {
    //                    var fillStyle = ctx.fillStyle;
    //                    ctx.fillStyle = '#555555';
    //                    ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
    //                    ctx.fillStyle = fillStyle;
            }else{
                fillStyle = ctx.fillStyle;

                if (data.cEl_grouphandledata && data.hitActType.index === i && data.hitActType.indexLow === indexLow){
                    ctx.fillStyle = 'rgba(0,255,0,1)';
                    if(data.hitActType.name==="handle"){
                        strokeStyle = ctx.strokeStyle;
                        lineWidth = ctx.lineWidth;
                        ctx.lineWidth = size / 3;
                        ctx.strokeStyle = 'rgba(255,0,0,1)';
    //                    
                        ctx.beginPath();
                        ctx.rect(pX - half, pY - half, size, size);
                        ctx.fill();
                        ctx.stroke();


                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "rgba(0,0,0,0.2)";
                        ctx.beginPath();
                        ctx.moveTo(pX, 0);
                        ctx.lineTo(pX, ctx.canvas.height);
                        ctx.moveTo(0, pY);
                        ctx.lineTo(ctx.canvas.width, pY);
                        ctx.stroke();
    //                    
    //                    
                        ctx.strokeStyle = strokeStyle;
                        ctx.lineWidth = lineWidth;
                    }else{
                        ctx.fillRect(pX - half, pY - half, size, size);
                    }
                }else{
                    ctx.fillStyle = 'rgba(0,255,0,0.2)';
                    ctx.fillRect(pX - half, pY - half, size, size);
                }

                ctx.fillStyle = fillStyle;
            }
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }  
}


//function override_drawSelection (caller, ctx, matrix, size, selectionItems, updateVersion) {


function _drawSelection_new (caller, ctx, matrix, size, selectionItems, updateVersion) {
    
    try{
        
        // your function here
        var selection = caller._selection,
                itemSelected = selection & 1,
                boundsSelected = selection & 2 || itemSelected && caller._selectBounds,
                positionSelected = selection & 4;
        if (!caller._drawSelected)itemSelected = false;
        
        
        
        if ((itemSelected || boundsSelected || positionSelected) && caller._isUpdated(updateVersion)) {
                
//                var color = caller.getSelectedColor(true) || (layer = caller.getLayer())
//                    && layer.getSelectedColor(true);
//                    ctx.strokeStyle = ctx.fillStyle = color ? color.toCanvasStyle(ctx) : '#002dec';
                        
                var        colorBounds = new paper.Color(0, 0, 0, 0.3);
                colorBounds = colorBounds.toCanvasStyle(ctx);
                
                var        colorPath = new paper.Color(0, 1, 1, 0.8);
                colorPath = colorPath.toCanvasStyle(ctx);
                
                var        colorPosition = new paper.Color(1, 0, 0, 0.8);
                colorPosition = colorPosition.toCanvasStyle(ctx);
                                              
                var layer,       mx = matrix.appended(caller.getGlobalMatrix(true)),
                        half = size / 2;
//                

                
                if (itemSelected)
                        ctx.strokeStyle = ctx.fillStyle = colorPath;
//                        drawGrid(ctx);
                        //cdebug(caller.className)();
                        
                        if(caller.className !== "SymbolItem" && caller.className !== "Group")caller._drawSelected(ctx, mx, selectionItems);
                if (positionSelected) {
                        ctx.strokeStyle = ctx.fillStyle = colorPosition;
                        var point = caller.getPosition(true),
                                x = point.x,
                                y = point.y;
                        ctx.beginPath();
                        ctx.arc(x, y, half, 0, Math.PI * 2, true);
                        ctx.stroke();
                        var deltas = [[0, -1], [1, 0], [0, 1], [-1, 0]],
                                start = half,
                                end = size + 1;
                        for (var i = 0; i < 4; i++) {
                                var delta = deltas[i],
                                        dx = delta[0],
                                        dy = delta[1];
                                ctx.moveTo(x + dx * start, y + dy * start);
                                ctx.lineTo(x + dx * end, y + dy * end);
                                ctx.stroke();
                        }
                        
//                    cdebug(paper.data.cEl_grouphandledata && paper.data.hitActType.name==="position")();
                        
                    if(paper.data.cEl_grouphandledata && paper.data.hitActType.name==="position"){
                        ctx.fill();
                        ctx.lineWidth = 1;
                        
//                        var pointVector = point.normalize(10);
//                        var pointEnd = point.add(point.normalize(20)); 
//                        cdebug(caller.rotation)();
                        
//                        ctx.beginPath();
//                        ctx.moveTo(x, y);
//                        ctx.lineTo(pointEnd.x,pointEnd.y);
//                        ctx.stroke();
                        
                        ctx.strokeStyle = "rgba(0,0,0,0.2)";
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, ctx.canvas.height);
                        ctx.moveTo(0, y);
                        ctx.lineTo(ctx.canvas.width, y);
                        ctx.stroke();
                    }
                        
                }
                if (boundsSelected) {
                    
                    
                    
                    ctx.strokeStyle = ctx.fillStyle = colorBounds;
                    
//                    cdebug(caller.bounds)();
//                    cdebug(caller.getInternalBounds())();
                    var coords;
                    if(caller.className==="Group"){
//                        cdebug([caller.className,itemSelected , boundsSelected , positionSelected,updateVersion,caller.bounds,caller.matrix])();
                        drawGrid(ctx);
                        coords = mx._transformCorners(caller.bounds);
                    }else{
                        coords = mx._transformCorners(caller.getInternalBounds());
                    }
//                    var coords = mx._transformCorners(caller.getInternalBounds());
                    //var coords = mx._transformCorners(caller.bounds);
                    
//                    cdebug(coords)();
                    
                    ctx.beginPath();

                    for (var i = 0; i < 8; i++) {
                        ctx[!i ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
                    }
                    ctx.closePath();
//                    ctx.globalCompositeOperation = "screen";
                    ctx.stroke();
//                    ctx.fill();

                    for (var i = 0; i < 8; i++) {
                        ctx.fillRect(coords[i] - half, coords[++i] - half,size, size);
                    }

                    ctx.fillRect((coords[0] + coords[2])/2- half, (coords[1] + coords[3])/2 - half, size, size);
                    
                    ctx.fillRect((coords[2] + coords[4])/2- half, (coords[3] + coords[5])/2 - half, size, size);
                    
                    ctx.fillRect((coords[4] + coords[6])/2- half, (coords[5] + coords[7])/2 - half, size, size);
                    
                    ctx.fillRect((coords[6] + coords[0])/2- half, (coords[7] + coords[1])/2 - half, size, size);
                    
                    // bounds center
                    ctx.fillRect((coords[0] + coords[4])/2- half, (coords[1] + coords[5])/2 - half, size, size);
                    
                    var lines=[0,0,0,0,0,0,0,0];
                    
                    if(paper.data.cEl_grouphandledata){
                        
                        switch(paper.data.hitActType.name){
                            case "top-left":
                                
                                lines=[1,1,0,0,1,1,0,0];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect(coords[0] - half, coords[1] - half, size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[6],coords[7]);
                                ctx.lineTo(coords[0],coords[1]);
                                ctx.lineTo(coords[2],coords[3]);
                                ctx.stroke();
                            break;
                            case "top-center":
                                
                                lines=[0,0,0,1,0,0,0,1];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect((coords[0] + coords[2])/2- half, (coords[1] + coords[3])/2 - half , size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[0],coords[1]);
                                ctx.lineTo(coords[2],coords[3]);
                                ctx.stroke();
                            break;
                            case "top-right":
                                
                                lines=[0,0,1,1,0,0,1,1];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect(coords[2] - half, coords[3] - half, size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[0],coords[1]);
                                ctx.lineTo(coords[2],coords[3]);
                                ctx.lineTo(coords[4],coords[5]);
                                ctx.stroke();
                            break;
                            case "right-center":
                                
                                lines=[1,0,0,0,1,0,0,0];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect((coords[2] + coords[4])/2- half, (coords[3] + coords[5])/2 - half , size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[2],coords[3]);
                                ctx.lineTo(coords[4],coords[5]);
                                ctx.stroke();
                            break;
                            case "bottom-right":
                                
                                lines=[1,1,0,0,1,1,0,0];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect(coords[4] - half, coords[5] - half, size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[2],coords[3]);
                                ctx.lineTo(coords[4],coords[5]);
                                ctx.lineTo(coords[6],coords[7]);
                                ctx.stroke();
                            break;
                            case "bottom-center":
                                
                                lines=[0,0,0,1,0,0,0,1];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect((coords[4] + coords[6])/2- half, (coords[5] + coords[7])/2 - half , size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[4],coords[5]);
                                ctx.lineTo(coords[6],coords[7]);
                                ctx.stroke();
                            break;
                            case "bottom-left":
                                
                                lines=[0,0,1,1,0,0,1,1];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect(coords[6] - half, coords[7] - half, size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[4],coords[5]);
                                ctx.lineTo(coords[6],coords[7]);
                                ctx.lineTo(coords[0],coords[1]);
                                ctx.stroke();
                            break;
                            
                            case "left-center":
                                
                                lines=[1,0,0,0,1,0,0,0];
                                
                                ctx.strokeStyle = ctx.fillStyle = "rgba(255,0,0,1)";
                                ctx.strokeRect((coords[6] + coords[0])/2- half, (coords[7] + coords[1])/2 - half , size, size);
                                ctx.beginPath();
                                ctx.moveTo(coords[6],coords[7]);
                                ctx.lineTo(coords[0],coords[1]);
                                ctx.stroke();
                            break;
                            
                            
                            default:
//                                cdebug(paper.data.hitActType)();
                            
                            break;
                        }
                        
                    }
                    
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "rgba(0,0,0,0.2)";
                    ctx.beginPath();
                    
                    for(var i = 0;i<8;i++){
                        if(lines[i]){
                            ctx.moveTo(coords[i], 0);
                            ctx.lineTo(coords[i], ctx.canvas.height);
                        }
                        i++;
                        if(lines[i]){
                            ctx.moveTo(0, coords[i]);
                            ctx.lineTo(ctx.canvas.width, coords[i]);
                        }
                    }
                    
                    ctx.stroke();
                }
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }  
};


function drawGrid(ctx){
    
    try{
        
//        cdebug("grid" + new Date())();
        
        var strokeStyle = ctx.strokeStyle;
        var lineWidth = ctx.lineWidth;
        var cEl_canvas = ctx.canvas;
        var gridMin = 5;
        var gridMax = 10;
        
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = 1; 
        ctx.beginPath();
        
        for(var i = 0, len = cEl_canvas.width, height = cEl_canvas.height, perc = len/100, percPos = 0;i<100;i++){
            percPos = parseInt(i*perc)+0.5;
            if(i % 10){
                ctx.moveTo(percPos,0);
                ctx.lineTo(percPos,gridMin);
                ctx.moveTo(percPos,height);
                ctx.lineTo(percPos,height-gridMin);
                
            }else{
                ctx.moveTo(percPos,0);
                ctx.lineTo(percPos,gridMax);
                ctx.moveTo(percPos,height);
                ctx.lineTo(percPos,height-gridMax);
                if(i>0)ctx.fillText(i/100,percPos,gridMin+10);
            }
        }
        for(var i = 0, len = cEl_canvas.height, width = cEl_canvas.width, perc = len/100, percPos = 0;i<100;i++){
            percPos = parseInt(i*perc)+0.5;
            if(i % 10){
                ctx.moveTo(0,percPos);
                ctx.lineTo(gridMin,percPos);
                ctx.moveTo(width,percPos);
                ctx.lineTo(width-gridMin,percPos);
                
            }else{
                ctx.moveTo(0,percPos);
                ctx.lineTo(gridMax,percPos);
                ctx.moveTo(width,percPos);
                ctx.lineTo(width-gridMax,percPos);
                if(i>0)ctx.fillText(i/100,gridMax,percPos);
            }
        }

        ctx.closePath();
        ctx.stroke();
        
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

//paper.Item.inject({
//    _drawSelection: function(anyArgumentsHere) {
//        // your function here
//        alert("je2");
//    }
//});



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
        
//        cdebug(paper.data.workState)();
        
        switch (paper.data.workState) {
            case "editlimbo":
                
                if(eventholder.keys.key==="Escape")selectGroup(null);
                if(eventholder.keys.key==="Delete")deleteGroup();
                if(eventholder.keys.key==="Enter"){
                    // TODO add save here
                    paper.data.hitActType = {name:"position",default:false};
                    select_handle(paper.data.cEl_group);
                    paper.data.workState = "editset";
                    
                }
                case "Tab":
                    group_tabulation(paper.data.workLayer,paper.data.cEl_group,eventholder.keys.shiftKey);
                break;
            break;    
            
            case "editset":
//                cdebug(paper.data.hitActType)();
                if(eventholder.keys.key==="Shift"||eventholder.keys.key==="Control"){
                    return true;
                };
                //cdebug(eventholder.keys.key)();
                if(eventholder.keys.key==="Delete"){
                    if(!paper.data.cEl_grouphandledata){
                        deleteGroup();
                    }else{
                        var segmentPoint,hitActType;
                        hitActType = paper.data.hitActType;
                        
                        switch(hitActType.name){
                            case "handle":
                                
                                segmentPoint = paper.data.cEl_group.children["ShapePath"].children[hitActType.indexLow].segments[hitActType.index];
//                                cdebug(segmentPoint.next)();
                                if(paper.data.cEl_group.children["ShapePath"].children[hitActType.indexLow].segments[hitActType.index]){
                                    segmentPoint.remove();
//                                    paper.data.cEl_group.reset.text_shape = true;
                                }else{
                                    paper.data.hitActType.index = 0;
                                }
                                
                            break;
                        default:
                            cdebug(paper.data.hitActType)();
                        };
                        
                    }
                    return true;
                }
                
                paper.data.workState = "editkeys";
//                paper.data.cEl_group.children["ShapePath"].applyMatrix = false;
//            break;
            case "editkeys":
                
                if(!paper.data.cEl_group || !paper.data.cEl_grouphandledata ){
//                    cdebug("here")();
                    if(eventholder.keys.key==="Escape")
                        selectGroup(null);
                    return false;
                }
                var delta = new paper.Point();//{"x":0,"y":0,"rotation":0};
                var offset = GlobalKeyOffset;
                
                switch(eventholder.keys.key){
                    case "ArrowUp":
                        delta.y = -offset;
                        handlehandle(paper.data,delta,eventholder.keys);
                    break;
                    case "ArrowRight":
                        delta.x = offset;
                        handlehandle(paper.data,delta,eventholder.keys);
                    break;
                    case "ArrowDown":
                        delta.y = offset;
                        
                        handlehandle(paper.data,delta,eventholder.keys);
                    break;
                    case "ArrowLeft":
                        delta.x = -offset;
                        handlehandle(paper.data,delta,eventholder.keys);
                    break;
                    
//                    case "Enter":
//                        
//                        // TODO add save here
//                        paper.data.hitActType = {name:"position",default:false};
//                        select_handle(cEl_group);
//                        paper.data.workState = "editset";
//
//                    break;
                    case "Escape":
                        
                        // TODO add undo here

                        select_handle(null);
                        
                        
                    break;
                    default:
//                        cdebug(eventholder.keys)();
                    break;
                }
                
//                if(eventholder.keys.buttons ===1 ){
//                    handlehandle(paper.data,eventholder.metrics.delta);
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
//                        cdebug(eventholder.keys)();
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
//                paper.data.cEl_group.children["ShapePath"].applyMatrix = true;
//                paper.data.cEl_group.reset.debug = true;
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
//                cdebug(paper.data.workState)();
                //cdebug(eventholder.wheel.deltaY);
//                cdebug(paper.data.cEl_groupHit.name)();
                cp_scrolling(paper.data,eventholder);
                
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
                
                paper.data.cEl_grouphandledata = {};
                paper.data.hitActType = {};
                
                paper.data.cEl_groupAdd = new paper.Path();
                paper.data.cEl_groupAdd.strokeColor = 'black';

//                selectGroup(paper.data.cEl_groupAdd);
                var segment = paper.data.cEl_groupAdd.add(eventholder.metrics.xy);
                paper.data.hitActType = {index:segment.index,indexLow:paper.data.cEl_groupAdd.index,name:"handle"};

//                paper.data.cEl_groupAdd.fullySelected = false;
                paper.data.cEl_groupAdd.fullySelected = true;
                paper.data.cEl_groupAdd.bounds.selected =true;
                

            break;
            case  "editlimbo" : // "editlimbo":
            case  "editset":
                
//                cdebug("here1   " + eventholder.actObj.name + " <<< >>> " + paper.data.cEl_group.parentName + "_" + paper.data.cEl_group.name)();
                
                //cEl_layer = paper.data.workLayer;
                
                //eventholder.actObj;
                
                var hitObject = getHitEditor(eventholder,!eventholder.keys.shiftKey);
                
                var actObj = returnValidHandle(hitObject,cEl_layer,true);
                
                if(!actObj)return true;
                
//                cdebug(paper.data.hitActType)();

                select_handle(actObj);

                

                paper.data.workState = "editmouse";

                eventholder.block.state = true;

                
                    
//                
                
            break;
            case "pre":
                //eventholder.actObj.fullySelected = true;
//                cdebug(eventholder.actObj.className)();
                switch (eventholder.actObj.className) {

                    case "SymbolItem":
                    case "Path":
                    case "CompoundPath":
                        
                        var cEl_group = getParent(eventholder.actObj,"tag");
                        if(cEl_group.tag === "group")selectGroup(cEl_group);

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


function returnValidHandle(hitObject,cEl_layer,boolOverride){
    
    try{
        var cEl_group_name = paper.data.cEl_group.parentName + "_" + paper.data.cEl_group.name;
        var actObj,hitActType;
        if(hitObject && hitObject.item){
            actObj = getParent(hitObject.item,"tag");
        }else{
            cEl_setCpCursor(cEl_layer,true);
//            paper.data.cEl_grouphandledata = null;
            return null;
        }

        if(!actObj.tag ==="group" || (actObj.parentName + "_" + actObj.name !== cEl_group_name)){
            cEl_setCpCursor(cEl_layer,true);
//            paper.data.cEl_grouphandledata = null;
            return null;
        }
        hitActType = getHitActType(hitObject);
        cEl_setCpCursor(cEl_layer,false,hitActType.name);
        if(boolOverride)paper.data.hitActType = hitActType;
        
        return actObj;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getHitEditor(eventholder,boolSelectBounds){
    
    try{
        var hitOptions = {
//          class:paper.Path,
            match: function test(hit){
//                cdebug(hit.item.className + " " +  hit.type + " " + hit.name + " " + hit.item.index )();
                if(
//                    !(hit.type==="bounds" && !(hit.item.className==="Group")) &&
//                    !(hit.type==="center" && !(hit.item.className==="Group")) &&
//                    !(hit.type==="position" && !(hit.item.className==="Group")) &&
//                    !(hit.type==="position" && !(hit.item.className==="Group"||hit.item.className==="CompoundPath")) &&
                    (hit.item.className!=="SymbolItem")
                    )
                    return true;
                },
            handles:true,
            segments:true,
            center: true,
            position:true,
            stroke: true,
            fill: true,
            bounds:true,

            selected:true,
            tolerance: 5
        };
                
//        cdebug(paper.data.cEl_group.className)();
//        cdebug(paper.data.cEl_group.bounds);        
//        return paper.data.cEl_group.hitTestAll(eventholder.metrics.xy, hitOptions);
        
        return paper.data.cEl_group.hitTest(eventholder.metrics.xy, hitOptions);
//        var list = "";
//        for(var i=0;i<hitObjects.length;i++){
//            if(hitObjects[i].item.className !== "SymbolItem"){
//                list = list + "<<<" + getHitActType(hitObjects[i]).name + " of " + hitObjects[i].item.className + ">>>";
//            }
//        }
//        cdebug(list)();
        
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function editor_mousemove(eventholder) {
    try{
//        cdebug(!paper.data.cEl_group)();

        if(!paper.data.cEl_group && !paper.data.cEl_grouphandledata && !paper.data.cEl_groupAdd)return false;
        
        switch (paper.data.workState) {
            case "add":
                
//                cdebug("here add")();
                
                // add new shape points
                if(eventholder.keys.buttons === 1 ){
                    var segment = paper.data.cEl_groupAdd.add(eventholder.metrics.xy);
                    paper.data.hitActType = {index:segment.index,indexLow:paper.data.cEl_groupAdd.index,name:"handle"};
                    
                    paper.data.cEl_groupAdd.fullySelected = false;
                    paper.data.cEl_groupAdd.fullySelected = true;
                }        
            break;
            case "editlimbo":
            case "editset":
                
//                var hitObject = getHitEditor(eventholder,!eventholder.keys.shiftKey);
//                
////                if(hitObject)cdebug(hitObject.type)();
//                
//                var cEl_layer = paper.project.activeLayer;
//                var actObj = returnValidHandle(hitObject,cEl_layer,false);
                
            break;
            case "editmouse":
//                cdebug(eventholder.keys.buttons)();
                // move/scale/edit control points
                handlehandle(paper.data,eventholder.metrics.delta,eventholder.keys);
                
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
        
        if(!paper.data.cEl_group && !paper.data.cEl_grouphandledata && !paper.data.cEl_groupAdd)return false;
        var cEl_layer = paper.project.activeLayer;

        switch (paper.data.workState) {
            case "editmouse":

//                paper.data.cEl_group.children["ShapePath"].applyMatrix = true;
                paper.data.cEl_group.reset.debug = true;
                paper.data.workState = "editset";
                eventholder.block.state = false;
            break;
            case "add":
//                        cdebug("here ADD")();
//                cdebug(paper.data.cEl_groupAdd.segments.length)();
                paper.data.cEl_groupAdd.closed = true;
                paper.data.cEl_groupAdd.simplify();
                
                if(paper.data.cEl_groupAdd.segments.length<2){
                    paper.data.cEl_groupAdd.remove();
                    return true;
                }
                
                
                
                //paper.data.cEl_group.selected = false;
                

                var newShapeName = id_generator("sh",9);
                paper.data.shapes[newShapeName] = createAprox(cEl_layer,paper.data.cEl_groupAdd.segments,[0.5,0.5],5);
                
                var mp = paper.data.cEl_groupAdd.position;
                
                paper.data.cEl_groupAdd.remove();
                
//                cdebug(paper.project.view.size)();
//                cdebug(mp)();

                var cEl = {
                    "elId":"defaultNew",
                    "tab":1,
                    "visible":true,
                    "shape":{
                        "masspoint":[mp.x/paper.project.view.size.width,mp.y/paper.project.view.size.height],
                        "scale":[1,1],
                        "name":newShapeName,
                        "type":"bezier"
                    }
                };
                cEl.name = id_generator("gr",9);
                
                //selectGroup(null,false);
                
                pre_load_children(cEl,cEl_layer.name);
                
                drawProjects(cEl_layer,false);
                
                
                
                var cEl_group = cEl_layer.children[cEl_layer.children.length-1];
                
//                cdebug(cEl_group.children["ShapePath"].children[0].index)();

                selectGroup(cEl_group);
                paper.data.hitActType = {index:0,indexLow:cEl_group.children["ShapePath"].children[0].index,name:"handle"};
                
                

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


//function drawGroup_handle_Rectangle(handle_group,boolSetNew,data,name,size,top-left){
//    try{
//        var path;
//        if(boolSetNew){
//            path = handle_group.addChild(new paper.Path.Rectangle(top-left,size));
//            path.fillColor = data.color;
//            path.data = data;
//            path.name = name;
//            
//            
//            path.strokeColor = GlobalEditColorBorder;
//            path.strokeWidth = GlobalEditRadius/2;
//            
//        }else{
//            path = handle_group.children[data.index];
//            //cdebug(path.name)();
//            
//            path.bounds.topLeft = top-left;
//            path.bounds.width = size.width;
//            path.bounds.height = size.height;
//        }
//        return path;
//    } catch (e) {
//        var err = listError(e,true);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}

//function drawGroup_handle_Line(handle_group,boolSetNew,data,name,from,to){
//    try{
//        var path;
//        if(boolSetNew){
//            path = handle_group.addChild(new paper.Path.Line(from,to));
//            path.fillColor = data.color;
//            path.data = data;
//            path.name = name;
//        }else{
//            path = handle_group.children[data.index];
//            //cdebug(path.name)();
//            
//            path.firstSegment.position = from;
//            path.lastSegment.position = to;
//            
//        }
//        return path;
//    } catch (e) {
//        var err = listError(e,true);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}

//function drawGroup_handle_bounds(cEl_group,bounds,cEl_groupName){
//    try{
//        
////        bounds = cEl_group.layer.bounds;
//        
//        var size = new paper.Size(bounds.width, bounds.height);
//        
//        var handle_group = cEl_group.children["ControlPoints"].children[0];
//        var boolSetNew = false;
//        if(!handle_group){
//            var handle_group = cEl_group.children["ControlPoints"].addChild(new paper.Group);
//            handle_group.name = ".handleGR1";
//            boolSetNew = true;
//        }else{
//            cEl_group.children["ControlPoints"].children[0].removeChildren();
//        }
//        
//        // set background
//        drawGroup_handle_Rectangle(handle_group,true,{"color":GlobalEditColorBKG,"drawType":"fillColor","index":0,"indexLow":-1,"refersTo":cEl_groupName},"body",size,bounds.topLeft);
//        
//        return boolSetNew;
//
//    } catch (e) {
//        var err = listError(e,true);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}


//function drawGroup_handle(cEl_group){
//    try{
//        
////        cdebug("start")();
////        
//        
//        
//        if(!cEl_group.debug){
//            cEl_group.children["ControlPoints"].removeChildren();
//            return true;
//        }
//        
////        cdebug(cEl_group.name + "  vs   " + cEl_group.debug)();
//        
//        var handle_group,path,size;
////        var selectedName,selectedId;
////        
//        var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name ;
//        
//        var boolSetNew = drawGroup_handle_bounds(cEl_group,cEl_group.children["ShapePath"].bounds,cEl_groupName);
//
//        // draw control points and handles
//        if(boolSetNew){
//            handle_group = cEl_group.children["ControlPoints"].addChild(new paper.Group);
////            handle_group.name = ".handleGR2";
//        }else{
//            handle_group = cEl_group.children["ControlPoints"].children[1];
//            
//        }
//        path = cEl_group.children["ShapePath"];
//
//        //cdebug(cEl_group.children["ShapePath"].children[0]);
//        if(!path.children){
//            if(boolSetNew){
//                subhandle_group = handle_group.addChild(new paper.Group);
//            }else{
//                subhandle_group = handle_group.children[0];
//            }
//            drawGroup_handle_pointsInPath(subhandle_group,cEl_groupName,path,boolSetNew,0);
//        }else{
//            for(var i = 0,subhandle_group;i<path.children.length;i++){
//                if(boolSetNew){
//                    subhandle_group = handle_group.addChild(new paper.Group);
//                }else{
//                    subhandle_group = handle_group.children[i];
//                }
//                drawGroup_handle_pointsInPath(subhandle_group,cEl_groupName,path.children[i],boolSetNew,i);
//            }
//        }
//        
//
//        
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


//function drawGroup_handle_pointsInPath(handle_group,cEl_groupName,path,boolSetNew,indexLow){
//    try{
//    
//        for(var i = 0,boolHandles,subgroup,subpath,segment,point,pointHandleIn,pointHandleOut;i<path.segments.length;i++){
//            segment = path.segments[i];
//            point = segment.point;
//            boolHandles = segment.hasHandles();
//            
//            if(boolSetNew){
//                subgroup = handle_group.addChild(new paper.Group);
//            }else{
//                subgroup = handle_group.children[i];
//            }
//            
//            // draw handles lines
//            if(boolHandles){
//                pointHandleIn = point.add(segment.handleIn,point);
//                pointHandleOut = point.add(segment.handleOut,point);
//                
//                if(boolSetNew){
//                    subpath = subgroup.addChild(new Path.Line(pointHandleOut,point));
//                    subpath.data = {"color":GlobalEditColorhandle-out,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
//                    subpath.strokeColor = GlobalEditColorhandle-out;
//                    subpath.name = "handleLout";
//                }else{
//                    
//                }
//                
//                if(boolSetNew){
//                    subpath = subgroup.addChild(new Path.Line(pointHandleIn, point));
//                    subpath.data = {"color":GlobalEditColorhandle-in,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
//                    subpath.strokeColor = GlobalEditColorhandle-in;
//                    subpath.name = "handleLin";
//                }else{
//                    
//                }
//                
//                if(boolSetNew){
////                drawGroup_handle_Rectangle(subgroup,boolSetNew,{"color":GlobalEditColorBKG,"type":"fillColor","index":0},cEl_groupName + ".body",size,bounds.topLeft);
//                
//                    subpath = subgroup.addChild(new paper.Path.Circle(pointHandleIn,GlobalEditRadius/2));
//                    //subpath.position = pointHandleIn;
//                    subpath.data = {"color":GlobalEditColorhandle-in,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
//                    subpath.strokeColor = GlobalEditColorhandle-in;
//                    subpath.name = "handle-in";
//                }else{
//                    
//                    subpath = subgroup.children["handle-in"];
//                    subpath.bounds.width = GlobalEditRadius;
//                    subpath.bounds.height = GlobalEditRadius;
//                    subpath.position = pointHandleIn;
//                }
//            }
//            if(boolSetNew){    
//            // draw handle point
//                subpath = subgroup.addChild(new paper.Path.Circle(point,GlobalEditRadius/2));
//    //            subpath.position = point;
//                subpath.data = {"color":GlobalEditColorhandle,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
//                subpath.strokeColor = GlobalEditColorhandle;
//                subpath.name = "handle";
//            }else{
//                
//                subpath = subgroup.children["handle"];
//                subpath.bounds.width = GlobalEditRadius;
//                subpath.bounds.height = GlobalEditRadius;
//                subpath.position = point;
//                
//            }
//            if(boolHandles){
//                if(boolSetNew){
//                    subpath = subgroup.addChild(new paper.Path.Circle(pointHandleOut,GlobalEditRadius/2));
//                    //subpath.position = pointHandleOut;
//                    subpath.data = {"color":GlobalEditColorhandle-out,"drawType":"strokeColor","index":i,"indexLow":indexLow,"refersTo":cEl_groupName};
//                    subpath.strokeColor = GlobalEditColorhandle-out;
//                    subpath.name = "handle-out";   
//                }else{
//                    subpath = subgroup.children["handle-out"];
//                    subpath.bounds.width = GlobalEditRadius;
//                    subpath.bounds.height = GlobalEditRadius;
//                    subpath.position = pointHandleOut;
//                }
//            }
//            
//            
//        };
//    
//        return true;
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}



function handlehandle(data,delta,keys,action){
    try{
        
//        cdebug()();
        
        var scaleX=1,scaleY=1,scalePoint;
        var cEl_group = data.cEl_group;
        var hitObjType = data.hitActType.name;
        
        
        

        switch (hitObjType) {
            // edit shape Point
            case "handle":
            case "handle-in":
            case "handle-out":

                edithandle(data,cEl_group,delta,hitObjType,keys);
                data.editTool = "edit" + hitObjType;
                
                return true;
            break;
            case "position":
                
                if(action==="scroll"){
//                    cdebug(cEl_group.position)();
//                    cdebug(data.cEl_grouphandledata.position)();
//                    data.cEl_grouphandledata.position = cEl_group.children["ShapePath"].position;
//                    cEl_group.pivot = data.cEl_grouphandledata.position;
//                    cEl_group.rotate(delta);
//                    cEl_group.children["ShapePath"].pivot = data.cEl_grouphandledata.position;
//                    var pivot = cEl_group.children["ShapePath"].pivot;
                    cEl_group.rotate(delta);
//                    cEl_group.children["ShapePath"].rotate(delta);
//                    cEl_group.children["TextPath"].rotate(delta,pivot);
//                    cEl_group.children["TextSymbols"].rotate(delta,pivot);
//                    cEl_group.reset.text_draw=true;
                    
//                    cEl_group.children["ShapePath"].position = data.cEl_grouphandledata.position;
                    data.editTool = "scroll";
                    
                }else{
                    cEl_group.translate(delta);
                    data.editTool = "move";

                }
                
                return true;
            break;
            
            // scale left>right
            case "left-center":
                
//                data.cEl_group.position.x+=delta.x;
//                var width = Math.abs(data.cEl_group.bounds.topLeft.x-data.cEl_grouphandledata.rightCenter.x);
//                if(width===0)return true;
//                data.cEl_group.bounds.width = width;
//                if(data.cEl_group.position.x > data.cEl_grouphandledata.rightCenter.x){
//                    data.cEl_grouphandledata.rightCenter.x = data.cEl_group.position.x;
//                }else if(data.cEl_group.position.x < data.cEl_grouphandledata.rightCenter.x){
//
//                }
//
//                return true;


                scaleX = 1 - delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scalePoint = data.cEl_grouphandledata.rightCenter;
                
            break;
            // scale right>left
            case "right-center":
//                data.cEl_group.position.x+=delta.x;
//                var width = Math.abs(data.cEl_group.bounds.topLeft.x-data.cEl_grouphandledata.rightCenter.x);
//                if(width===0)return true;
//                data.cEl_group.bounds.width = width;
//                if(data.cEl_group.position.x < data.cEl_grouphandledata.leftCenter.x){
//                    data.cEl_grouphandledata.leftCenter.x = data.cEl_group.position.x;
//                }else if(data.cEl_group.position.x > data.cEl_grouphandledata.leftCenter.x){
//
//                }
//                
//                return true;
                scaleX = 1 + delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scalePoint = data.cEl_grouphandledata.leftCenter;
            break;
            // scale top>bottom
            case "top-center":

                scaleY = 1 - delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.bottomCenter;
            break;
            // scale bottom>top
            case "bottom-center":

                scaleY = 1 + delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.topCenter;
            break;

            // scale top-left>bottom-right
            case "top-left":

                scaleX = 1 - delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scaleY = 1 - delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.bottomRight;
            break;
            // scale top-right>bottom-left
            case "top-right":

                scaleX = 1 + delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scaleY = 1 - delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.bottomLeft;
            break;
            // scale bottom-right>top-left
            case "bottom-right":

                scaleX = 1 + delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scaleY = 1 + delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.topLeft;
            break;
            // scale bottom-left>top-right
            case "bottom-left":

                scaleX = 1 - delta.x/(cEl_group.matrix.a*data.cEl_grouphandledata.width);
                scaleY = 1 + delta.y/(cEl_group.matrix.d*data.cEl_grouphandledata.height);
                scalePoint = data.cEl_grouphandledata.topRight;
            break;
            
            default:
                //var cEl_groupName = cEl_group.parentName + "_" + cEl_group.name;
                //var hitObjName = data.cEl_groupHit;
                
//                cdebug(data.hitActType)();
                
                //if(data.cEl_grouphandledata.name === cEl_groupName){
//                    cEl_group.translate(delta);
//                    data.editTool = "move";
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

function edithandle(data,cEl_group,delta,typehandle,keys){
    try{

        var segmentPoint,hitActType;
        hitActType = data.hitActType;
        segmentPoint = cEl_group.children["ShapePath"].children[hitActType.indexLow].segments[hitActType.index];

        switch (typehandle) {
            
            case "handle-in":
                segmentPoint.handleIn.x += delta.x;
                segmentPoint.handleIn.y += delta.y;
            break;
            case "handle":
                segmentPoint.point.x += delta.x;
                segmentPoint.point.y += delta.y;
            break;
            case "handle-out":
                segmentPoint.handleOut.x += delta.x;
                segmentPoint.handleOut.y += delta.y;
            break;
            
        }
        
//        resethandleBounds(cEl_groupBounds,cEl_group);
        
        // TODO precompute if needed to update the handle margins ...
        
//        if (cEl_group.data.type === "text"){
//            if(cEl_group.data.values.pattern === "path"){
//                switch (typehandle) {
//                    case "handle":
//                        cEl_group.children["TextPath"].children[hitActType.indexLow].segments[hitActType.index].point = segmentPoint.point;
//                    break;
//                    case "handle-in":
//                        cEl_group.children["TextPath"].children[hitActType.indexLow].segments[hitActType.index].handleIn = segmentPoint.handleIn;
//                    break;    
//                    case "handle-out":
//                        cEl_group.children["TextPath"].children[hitActType.indexLow].segments[hitActType.index].handleOut = segmentPoint.handleOut;
//                    break;
//                }
//            }else{
//                cEl_group.reset.text_shape = true;
//            }
//        }
                

        cEl_group.reset.text_draw = true;
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }   
}

function resethandleBounds(boundsBefore,cEl_group){
    
    //cdebug(["before",cEl_group.bounds])();
    var scaleX = cEl_group.children["ShapePath"].bounds.width-boundsBefore.width;
    var scaleY = cEl_group.children["ShapePath"].bounds.height-boundsBefore.height;
    
    if(scaleX!==0||scaleY!==0){
        var bounds = cEl_group.children["ShapePath"].bounds;
        drawGroup_handle_bounds(cEl_group,bounds,"");
    }
    
}



function getEditVector(point,segmentPoint,delta,data){
    try{
        if(!data.cEl_grouphandledata.length)data.cEl_grouphandledata.length = point.length;

        var hitPoint = data.cEl_grouphandledata.hitPoint;
        var endPoint = hitPoint.add(delta);

        var vector1 = hitPoint.subtract(segmentPoint);
        var vector2 = vector1.add(delta);
        vector2.length = data.cEl_grouphandledata.length;
        
        
        data.cEl_grouphandledata.hitPoint = endPoint;
        
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
        
        cEl_group.scale(scaleX,scaleY, scalePoint);
        
//        cEl_group.children["ShapePath"].scale(scaleX,scaleY, scalePoint);
//        cEl_group.children["ControlPoints"].scale(scaleX,scaleY, scalePoint);
        
//        if (cEl_group.data.type === "text"){
//            if(cEl_group.data.values.pattern === "path"){
////                cEl_group.children["TextPath"].scale(scaleX,scaleY, scalePoint);
//            }else{
//                cEl_group.reset.text_shape = true;
//            }
//        }
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
//        var hitObjType = hitActType;
        
        switch (hitObjType) {
            case "position":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"move"});
            break;
            // scale left>right
            case "left-center":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"col-resize"});
            break;
            // scale right>left
            case "right-center":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"col-resize"});
            break;
            // scale top>bottom
            case "top-center":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"row-resize"});
            break;
            // scale bottom>top
            case "bottom-center":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"row-resize"});
            break;
            // scale top-left>bottom-right
            case "top-left":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"nw-resize"});
            break;
            // scale top-right>bottom-left
            case "top-right":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"ne-resize"});
            break;
            // scale bottom-right>top-left
            case "bottom-right":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"nw-resize"});
            break;
            // scale bottom-left>top-right
            case "bottom-left":
                cEl_layer.style.custom = $.extend(true,cEl_layer.style.custom,{"cursor":"ne-resize"});
            break;
            
            // control point
            case "handleLin":
            case "handleLout":
            case "handle":
            case "handle-in":
            case "handle-out":

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






function select_handle(cEl_group){
    try{    
//        cdebug(actObj.className)();
//        cdebug(actObj.name)();
        
        
        if(!cEl_group){
            paper.data.cEl_grouphandledata = null;
//            paper.data.resetGrid = true;
            paper.data.cEl_group.children["ShapePath"].fullySelected = false;
            paper.data.cEl_group.children["ShapePath"].fullySelected = true;
            paper.data.workState = "editlimbo";
            return true;
        }
        
//        if(!hitObject)return false;
//        if(paper.data.cEl_groupHit)paper.data.cEl_groupHit[paper.data.cEl_groupHit.data.drawType] = paper.data.cEl_groupHit.data.color;
        
//        paper.data.cEl_groupHit = hitObject.item;
        
//        paper.data.cEl_grouphandledata = null;
        
        paper.data.cEl_grouphandledata = paper.data.cEl_group.bounds.clone(); //bounds;//.clone();
        
        paper.data.cEl_grouphandledata.position = new paper.Point(paper.data.cEl_group.position);
//        paper.data.cEl_grouphandledata.hitPoint = new paper.Point(xy);
//        paper.data.cEl_grouphandledata.hitObject = hitObject;
//        paper.data.cEl_grouphandledata.hitObjectParent = cEl_group;
//        paper.data.resetGrid = true;
        
//        paper.data.hitActType = getHitActType(hitObject);
        cEl_group.children["ShapePath"].fullySelected = false;
        cEl_group.children["ShapePath"].fullySelected = true;
        
//        hitObject.selected = true;
//        cdebug(paper.project.view.Update()())();
        
//        cdebug(paper.data.hitActType)();
        
        //cdebug(paper.data.cEl_group.children["ControlPoints"].children[0].children[0].clockwise)();
        
//      "sign":sign1(paper.data.cEl_group.children["ShapePath"].matrix.a)
        
//        if(paper.data.hitActType.default)hitObject.item[hitObject.item.data.drawType] = "rgba(255,0,0,0.4)";
        
        
        
//        cdebug(paper.data.hitActType)();
        
//        paper.data.cEl_group.children["ShapePath"].applyMatrix = false;
        
        return true;            
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }                    
}

function getHitActType(hitObject,defaultType){
    try{
        var hitType = hitObject.type;
        
        switch(hitType){
//            // main body    
//            case "fill":
//                //hitObject.item.selected = false;
//                return {"name":"fill","default":true};
//            break;
//            // borders
//            case "center":
//                return {"name":"center","default":false};
//            break;
            // borders and corners
            case "fill":
            case "center":
            case "position":
                return {"name":hitType,"default":false};
            break;
            case "bounds":
                //cdebug( " of " + hitObject.item.index)();
                return {"name":hitObject.name,"default":false};
            break;
            // handles handle
            case "segment":
//                cdebug(hitObject.segment.index + " of " + hitObject.item.index)();
                return {"name":"handle","default":true,"index":hitObject.segment.index,"indexLow":hitObject.item.index};
            break;
            
            case "handle-out":
                return {"name":"handle-out","default":true,"index":hitObject.segment.index,"indexLow":hitObject.item.index};
            break;
            
            case "handle-in":
                return {"name":"handle-in","default":true,"index":hitObject.segment.index,"indexLow":hitObject.item.index};
            break;
            
            case "stroke":
//                cdebug(hitObject.item.index)();
                return {"name":"stroke","default":true,"index":hitObject.location.curve.index,"indexLow":hitObject.item.index};

            break;
            
        }


//        cdebug(hitType + " >>> " + hitObject.name)();
        return {"name":defaultType,"default":true};
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }  
}

function selectGroup(cEl_group){
    try{
        //cdebug("selectButton")();
        

        if(paper.data.cEl_group){
//            paper.data.cEl_group.debug = false;
//            paper.data.cEl_group.reset.debug = true;
            paper.data.cEl_group.bounds.selected = false;
            paper.data.cEl_group.position.selected = false;
//            paper.data.cEl_group.children["ShapePath"].position.selected = false;
//            paper.data.cEl_group.children["ShapePath"].bounds.selected = false;
            paper.data.cEl_group.children["ShapePath"].fullySelected = false;
//            paper.data.workState = "editlimbo";
//              paper.data.cEl_group.fullySelected = false;
        }
        
        if(cEl_group && cEl_group.children["ShapePath"]){
            paper.data.cEl_group = cEl_group;
            
//            cdebug(cEl_group.bounds)();
//            cdebug(cEl_group.getInternalBounds())();
//            cdebug(cEl_group.children["ShapePath"].bounds)();
//            cEl_group.children["TextPath"].fullySelected = true;
            
//            cdebug(cEl_group.className)();
//            cdebug("here?")();
//            cEl_group.debug = true;
//            cEl_group.reset.debug = true;
            
//            cEl_group.children["ShapePath"].selected = true;
            
            //cEl_group.selectedColor = "green";
//            cEl_group.children["ShapePath"].selected = true;
//            cEl_group.children["ShapePath"].children[0].segments[0].selected =true;
//            cdebug(cEl_group.bounds)();
//            cdebug(cEl_group.position)();
            cEl_group.bounds.selected = true;
            cEl_group.position.selected = true;
//            cEl_group.fullySelected = true;
//            cEl_group.position.selected = true;
//            cEl_group.children["ShapePath"].position.selected = true;
//            cEl_group.children["ShapePath"].bounds.selected = true;
            cEl_group.children["ShapePath"].fullySelected = false;
            cEl_group.children["ShapePath"].fullySelected = true;
            
            
            
            
//            paper.data.hitActType = {name:"position",default:false};
//            select_handle(cEl_group);
//            
////            paper.data.cEl_grouphandledata = null;
////            paper.data.cEl_groupHit = null;
            paper.data.workState = "editlimbo";
//            paper.data.resetGrid = true;
//            cdebug("here")();
        }else{
            paper.data.cEl_group = null;
//            paper.data.cEl_groupHit = null;
            paper.data.cEl_grouphandledata = null;
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
        selectGroup(false);
        
        paper.data.workState = "add";
        paper.data.cEl_groupAdd = null;

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

function blockEvents(boolState,eventholder){
    try{
        //eventholder = window["eventholder"];
        eventholder.block.state = boolState;
        if(boolState){
            eventholder.block.metrics = $.extend(true,{},eventholder.metrics);
            eventholder.block.keys = $.extend(true,{},eventholder.metrics);
            eventholder.block.offset = eventholder.retObj.bounds.clone();
        }else{
            eventholder.block.offset = null;
        }
    
    
        //cdebug("blockEvents " + boolState)();
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function moveMenu(cEl,eventholder){
    try{
        
        // TODO add event type and set it on mousedown also
        
        if(eventholder.keys.buttons===1){

            var menuTriggered = paper.project;
            var xy = [eventholder.metrics.xyAbs[0]+eventholder.data.offset[0],eventholder.metrics.xyAbs[1]+eventholder.data.offset[1]];
            
            menuTriggered.shape.masspoint = [menuTriggered.shape.scale[0]*xy[0]/menuTriggered.shape.w,menuTriggered.shape.scale[1]*xy[1]/menuTriggered.shape.h];
            menuTriggered.reset.layout_shape = true;
            
        }else if(eventholder.keys.buttons===0){
            eventholder.data.offset = [cEl.bounds.topLeft.x-eventholder.metrics.xy[0],cEl.bounds.topLeft.y-eventholder.metrics.xy[1]];
//            cdebug(eventholder.data.offset)();
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

function cp_scrolling(data,eventholder){
    try{
        
        var newIndex;
        var segmentPoint,hitActType, newSegmentPoint,boolResetHandles=false;
        hitActType = data.hitActType;
        if(!hitActType)return true;
        
        var boolDescending = eventholder.wheel.deltaY>0;
        var cEl_group = data.cEl_group;
//        cdebug(eventholder.keys.ctrlKey + " on " + hitActType.name)();
        
        switch(hitActType.name){
            case "handle":
            

                // TODO make a separate function and use handleselect
    //            cdebug(hitActType)();
                
                var segmentPoint = cEl_group.children["ShapePath"].children[hitActType.indexLow].segments[hitActType.index];
                if(!segmentPoint)return true;

                if(eventholder.keys.ctrlKey){
                    if(boolDescending){
                        data.hitActType.name ="handle-out";
                    }else{
                        data.hitActType.name ="handle-in";
                    }
                    boolResetHandles = true;
                    break;
                }

                if(boolDescending){
                    newSegmentPoint = segmentPoint.next;
                }else{
                    newSegmentPoint = segmentPoint.previous;
                }
                if(newSegmentPoint){
                    data.hitActType.index = newSegmentPoint.index;
                    boolResetHandles = true;
                }
            
            break;
            case "handle-in":
                
                if(eventholder.keys.ctrlKey && boolDescending){
                    data.hitActType.name ="handle";
                    boolResetHandles = true;
                }

            break;
            case "handle-out":
                
                if(eventholder.keys.ctrlKey && !boolDescending){
                    data.hitActType.name ="handle";
                    boolResetHandles = true;
                }

            break;
            case "top-left":
                if(boolDescending){
                    data.hitActType.name = "top-center";
                }else{
                    data.hitActType.name = "left-center";
                }
                boolResetHandles = true;
            break;
            case "top-center":
                if(boolDescending){
                    data.hitActType.name = "top-right";
                }else{
                    data.hitActType.name = "top-left";
                }
                boolResetHandles = true;
            break;
            case "top-right":
                if(boolDescending){
                    data.hitActType.name = "right-center";
                }else{
                    data.hitActType.name = "top-center";
                }
                boolResetHandles = true;
            break;
            case "right-center":
                if(boolDescending){
                    data.hitActType.name = "bottom-right";
                }else{
                    data.hitActType.name = "top-right";
                }
                boolResetHandles = true;
            break;
            case "bottom-right":
                if(boolDescending){
                    data.hitActType.name = "bottom-center";
                }else{
                    data.hitActType.name = "right-center";
                }
                boolResetHandles = true;
            break;
            case "bottom-center":
                if(boolDescending){
                    data.hitActType.name = "bottom-left";
                }else{
                    data.hitActType.name = "bottom-right";
                }
                boolResetHandles = true;
            break;
            case "bottom-left":
                if(boolDescending){
                    data.hitActType.name = "left-center";
                }else{
                    data.hitActType.name = "bottom-center";
                }
                boolResetHandles = true;
            break;
            case "left-center":
                if(boolDescending){
                    data.hitActType.name = "top-left";
                }else{
                    data.hitActType.name = "bottom-left";
                }
                boolResetHandles = true;
            break;
            
            case "position":
                
                var delta = boolDescending? 3:-3;
                handlehandle(data,delta,eventholder.keys,"scroll");
                
//                cdebug(cEl_group.matrix)();
                
                boolResetHandles = true;
//                cEl_group.children["ShapePath"].applyMatrix = true;
//                boolResetHandles = true;
            break;
        }
        
        if(boolResetHandles){
            cEl_group.children["ShapePath"].fullySelected = false;
            cEl_group.children["ShapePath"].fullySelected = true;
            cEl_group.position.selected= true;
            cEl_group.bounds.selected = true;
        }
        
        
        
//        var cp_group = cpObject.parent;
        
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
//                    select_handle(cEl_layer,[0,0],cp_group.children[newIndex]);
//                    return true;
////                }
//            }else{
//                return true;
//            }
//        }    
//        select_handle(cEl_layer,[0,0],cp_group.children[def]);
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function group_tabulation(cEl_layer,cEl_group,boolDescending){
    try{
        
        //cdebug([cEl_group.name,cEl_group.index])();
        
        
        
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

