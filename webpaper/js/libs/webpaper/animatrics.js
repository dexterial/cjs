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

function pulse(obj,eventholder){
    
    paper.project.view.onFrame = function(event){
        obj.rotate(5);
    };
    
}

//function zoomAround(cElId,cCanv,zoomMax,lambda,half,iterations,tick,boolType) {
//    
//    var cEl = retCElById(cElId,cCanv.cId); 
//    var yFactor; 
//    var path = [];
//    
//    if(cEl.cEvents.animationOn === false){
//        setAnimationFlag(cEl,0,true);
//        for(var i = 0 ; i < iterations ; i++){
//
//            yFactor = 1 + (zoomMax-1) * mathHill(i,half,lambda);
//            path.push(yFactor);
//            setZoom(cEl,cCanv,tick*i,yFactor);
//
//        };
//        if(boolType){
//            for(var i = iterations+1 ; i < iterations*2+1 ; i++){
//                yFactor = path[iterations*2-i];
//                setZoom(cEl,cCanv,tick*i,yFactor);
//            }
//        }
//        setAnimationFlag(cEl,tick*iterations*2+1,false);
//    }
//    return true;
//}
//
//function setAnimationFlag(cEl,delay,boolFlag){
//    if(delay===0){cEl.cEvents.animationOn = boolFlag;}else{
//    (function(cEl,delay,boolFlag){
//        setTimeout(function(){
//            cEl.cEvents.animationOn = boolFlag;
//        },delay);})(cEl,delay,boolFlag);
//    }
//    return true;
//}
//
//function zoomIn(cElId,cCanv,zoomMax,lambda,half,iterations,tick){
//    var cEl = retCElById(cElId,cCanv.cId);
//    var yFactor;
//    
//    for(var i = 0 ; i < iterations ; i++){
//
//        yFactor = 1 + (zoomMax-1) * mathHill(i,half,lambda);
//        path.push(yFactor);
//        setZoom(cEl,cCanv,tick*i,yFactor);
//        
//    };
//    
//}
//
//function setZoom(cEl,cCanv,delay,yFactor){
//    
//    (function(cEl,cCanv,delay,yFactor){
//        setTimeout(function(){
//            cEl.cShapeObf.zoom = yFactor;
//            cEl.cRepaint = true;
//            drawChildren(cCanv);
//        },delay);})(cEl,cCanv,delay,yFactor);
//    
//    return true;
//};
//
//
//
//function mathHill(x,h,lambda){
//    //http://homepage.univie.ac.at/manfred.fuellsack/eTextbook/sw2/hill-function.html
//    //with λ(lambda) defining the delay at the limit, and h defining the x-value where the development reaches half of its saturation
//    // f(x)=pow(x,lambda)/(pow(x,lambda) + pow(h,lambda))
//    var xPow = Math.pow(x,lambda);
//    return xPow/(xPow + Math.pow(h,lambda));
//}
//
//function mathAcc(x0,v0,a,t){
//    return x0+v0*t+a*Math.pow(t,2)/2;
//}
//
//function sleep(miliseconds) {
//    var currentTime = new Date().getTime();
//    while (currentTime + miliseconds >= new Date().getTime()) {
//    }
//};
//function abortTimer(arrActEl,tid) { // to be called when you want to stop the timer
//    arrActEl[2].cBkg[2][0][0] = 1 ;
//    //arrActEl[2].cBkg[2][0][1] = 0;
//    //arrActEl[2].cBkg[2][0][2] = 0;
//    drawChildren(preview);
//    clearInterval(tid);
//}
