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

//paper.Project.inject({
//    draw: function(ctx, matrix, pixelRatio) {
//        this._updateVersion++;
//        
//        if (this._selectionCount > 0) {
//            ctx.save();
//            ctx.strokeWidth = 1;
//            var items = this._selectionItems,
//                size = this._scope.settings.handleSize,
//                version = this._updateVersion;
//            cdebug(items)();
//            for (var id in items) {
//                
//                items[id]._drawSelection(ctx, matrix, size, items, version);
//            }
//            ctx.restore();
//        }
//        
//        ctx.save();
//        matrix.applyToContext(ctx);
//        var children = this._children,
//            param = new paper.Base({
//                offset: new Point(0, 0),
//                pixelRatio: pixelRatio,
//                viewMatrix: matrix.isIdentity() ? null : matrix,
//                matrices: [new Matrix()],
//                updateMatrix: true
//            });
//        for (var i = 0, l = children.length; i < l; i++) {
//            children[i].draw(ctx, param);
//        }
//        ctx.restore();
//
////        if (this._selectionCount > 0) {
////            ctx.save();
////            ctx.strokeWidth = 1;
////            var items = this._selectionItems,
////                size = this._scope.settings.handleSize,
////                version = this._updateVersion;
////            for (var id in items) {
////                items[id]._drawSelection(ctx, matrix, size, items, version);
////            }
////            ctx.restore();
////        }
//    } 
//    
//});


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
        //console.log(this.hasHandles());
        
//            ctx.beginPath();
//            drawSegments_duplicate(ctx, this, matrix);
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

            if (!(selection & 1)) {
//                        var fillStyle = ctx.fillStyle;
//                        ctx.fillStyle = '#555555';
//                        ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
//                        ctx.fillStyle = fillStyle;
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
                
                var        colorBoundsSquare = new paper.Color(1, 1, 0, 0.5);
                colorBoundsSquare = colorBoundsSquare.toCanvasStyle(ctx);
                                              
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
                    
                    //cdebug(caller.className)();'

                    var coords;
                    if(caller.className==="Group"){
                        drawGrid(ctx);
                        coords = mx._transformCorners(caller.bounds);
                    }else{
                        coords = mx._transformCorners(caller.getInternalBounds());
                    }
                    
                    if(caller.className==="SymbolItem"){
                        
//                        //cdebug(coords)();
//                        
//                        ctx.strokeStyle = colorBoundsSquare;
//                        
//                        ctx.beginPath();
//
//                        for (var i = 0; i < 8; i++) {
//                            ctx[!i ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
//                        }
//                        ctx.closePath();
//                        ctx.fill();
//                        
                        return true;
                    }
                    
                    ctx.strokeStyle = ctx.fillStyle = colorBounds;
                    

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


paper.PointText.inject({
    _draw: function(ctx, param, viewMatrix) {//
		if (!this._content)
			return;
		this._setStyles(ctx, param, viewMatrix);
		var lines = this._lines,
			style = this._style,
			hasFill = style.hasFill(),
			hasStroke = style.hasStroke(),
			leading = style.getLeading(),
			shadowColor = ctx.shadowColor;
		ctx.font = style.getFontStyle();
		ctx.textAlign = style.getJustification();
                
                //cdebug(param,true)();
                if(param.cselect){
                    
                    ctx.save();
                    ctx.fillStyle = 'rgba(222,222,255,1)';
                    ctx.fillRect(this.position.x,this.position.y -this.bounds.height*3/4, this.bounds.width,this.bounds.height);
                    ctx.restore();
                }
                
		for (var i = 0, l = lines.length; i < l; i++) {
			ctx.shadowColor = shadowColor;
			var line = lines[i];
			if (hasFill) {
				ctx.fillText(line, 0, 0);
				ctx.shadowColor = 'rgba(0,0,0,0)';
			}
			if (hasStroke)
				ctx.strokeText(line, 0, 0);
			ctx.translate(0, leading);
		}
	}
});

//
//if( checkIfSelected(this)){
//                    var bounds = this.bounds;
//                    //cdebug(this.className)();
//                    ctx.save();
//                    ctx.fillStyle = "rgba(1,1,1,0.2)";
//                    ctx.rect(bounds.x,bounds.y,bounds.width,bounds.height);
//                    ctx.fill();
//                    ctx.restore();
//                    //cdebug(project._selectionItems)();
//                }

function checkIfSelected(el){
    
    if(el.id === 886)return true;
    
//    if(project._selectionCount>0){
//        cdebug(project.selectedItems[0].id)();
//        if(project.selectedItems[0].definition.item.id === el.id){
//            
//            return true;
//        }
//    }
    //cdebug(el.className)();
    //if(el.selected){cdebug(el)();}
    //return el.selected;
    return false;
}