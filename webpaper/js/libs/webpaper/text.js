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




function draw_cEl_text(cEl,strNewText){
    
    try{ 

        var boolNotSet = false;
        if(!cEl.data.values.temp){
            cEl.data.values.temp = {};
            boolNotSet = true;
        }
        
        var cEl_pageText = paper.data.text;
        
        if(cEl.style.redraw || boolNotSet)set_cEl_text_css(cEl,cEl_pageText,true);
        
        set_cEl_text(cEl,strNewText);
            
        if(cEl.data.values.temp.reset){
            //cEl.data.values.temp.lines2 = {"0":{}};
            cEl_set_wordMap3(cEl);
            cEl_set_chr_metrics(cEl,cEl_pageText);
            draw_cEl_lines3(cEl,cEl_pageText);
            cEl.data.values.temp.reset = false;
        }
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function set_cEl_font_css(cEl,cEl_pageText,addStyle,boolReturnId){
    
    try{
        //console.log("before " + cEl.style.calc.color);
        //console.log("apply  " + addStyle.color);
        if(addStyle){
            cEl.style.calc2 = $.extend(true,cEl.style.calc,addStyle);
        }else{
            cEl.style.calc2 = cEl.style.calc;
        }
        var styleObj = {};
        //cdebug(window[cEl.pageId].shape.scale,false,true,0);
        //cdebug(cEl.name + " " + cEl.style.calc2["font-size"],false,true,0);
        styleObj.fontSize = size2px(cEl.style.calc2["font-size"],false,paper.shape.scale[1]);
        styleObj.fontStyle = cEl.style.calc2["font-style"] ? cEl.style.calc2["font-style"] : "normal";
        styleObj.fontVariant = cEl.style.calc2["font-variant"] ? cEl.style.calc2["font-variant"] : "normal";
        styleObj.fontWeight = cEl.style.calc2["font-weight"] ? cEl.style.calc2["font-weight"] : "normal";
        styleObj.fontFamily = cEl.style.calc2["font-family"] ? cEl.style.calc2["font-family"] : "Arial";
        
//        styleObj.fontCanvas = styleObj.fontStyle + " " + styleObj.fontVariant + " ";
//        styleObj.fontCanvas += styleObj.fontWeight + " " + styleObj.fontSize + "px ";
//        styleObj.fontCanvas += styleObj.fontFamily;
        
        styleObj.letterSpacing = cEl.style.calc2["letter-spacing"] ? size2px(cEl.style.calc2["letter-spacing"],false) : 0;
        styleObj.color = cEl.style.calc2["color"] ? cEl.style.calc2["color"] : "rgba(0,0,0,1)";
        styleObj.wordSpacing = cEl.style.calc2["word-spacing"] ? size2px(cEl.style.calc2["word-spacing"],false) : 0;
        
        // text positioning
        
        
        //var fontText =  md5(styleObj.letterSpacing + styleObj.color + styleObj.wordSpacing + styleObj.lineHeight + styleObj.fontCanvas);
        
        return setGetFontObj(cEl_pageText,styleObj,boolReturnId);
        
        //return styleObj;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_text_css(cEl,cEl_pageText,boolReturnId){
    
    try{
        //cdebug(cEl)();
        if(!cEl.data.values.temp.style)cEl.data.values.temp.style = {};
        if(!cEl.data.values.temp.styleMap)cEl.data.values.temp.styleMap = {"default":null};
        
        cEl.data.values.temp.styleMap.default = $.extend(true,cEl.data.values.temp.styleMap.default,set_cEl_font_css(cEl,cEl_pageText,null,boolReturnId));
        //cEl.data.values.temp.styleMap.default = set_cEl_font_css(cEl,cEl_pageText,null,boolReturnId);
        
        if(cEl.data.values.customStyle){
            // todo pre-compute style map,
            //[{"style":{"font-size":"1em"},"chars":["0","1","3","4"]}];
            
            
            for(var i = 0, maxLen = cEl.data.values.customStyle.length, customStyle;i < maxLen;i++){
                customStyle = cEl.data.values.customStyle[i];
                var font = set_cEl_font_css(cEl,cEl_pageText,customStyle.style,boolReturnId);
                //if(customStyle.style.color)console.log("after  " + cEl.style.calc.color);
                if(customStyle.paragraphspos){
                    if(!cEl.data.values.temp.styleMap.paragraphspos)cEl.data.values.temp.styleMap.paragraphspos = {};
                    for(var j = 0,maxLen2 = customStyle.paragraphspos.length;j < maxLen2;j++){
                        //console.log(customStyle.paragraphspos);
                        cEl.data.values.temp.styleMap.paragraphspos[customStyle.paragraphspos[j]] = font;
                        
                    }
                }else
                if(customStyle.wordspos){
                    if(!cEl.data.values.temp.styleMap.wordspos)cEl.data.values.temp.styleMap.wordspos = {};
                    for(var j = 0,maxLen2 = customStyle.wordspos.length;j < maxLen2;j++){
                        //console.log(customStyle.wordspos[j]);
                        cEl.data.values.temp.styleMap.wordspos[customStyle.wordspos[j]] = font;
                        
                    }
                }else
                if(customStyle.charspos){
                    if(!cEl.data.values.temp.styleMap.charspos)cEl.data.values.temp.styleMap.charspos = {};
                    for(var j = 0,maxLen2 = customStyle.charspos.length;j < maxLen2;j++){
                        cEl.data.values.temp.styleMap.charspos[customStyle.charspos[j]] = font;
                    }
                }else
                if(customStyle.chars){
                    if(!cEl.data.values.temp.styleMap.chars)cEl.data.values.temp.styleMap.chars = {};
                    for(var j = 0,maxLen2 = customStyle.chars.length;j < maxLen2;j++){
                        //console.log(customStyle.strings[j]);
                        cEl.data.values.temp.styleMap.chars[customStyle.chars[j]] = font;
                        
                    }
                }
            }
            //{"chars":{"0":{"font-size":"1em"},"1":{"font-size":"1em"},"3":{"font-size":"1em"},"4":{"font-size":"1em"}},"lines":{},"default":{"id":2,"val":"italic 12px sans-serif"}}
        }
        
        cdebug(cEl.data.values.temp.styleMap)();
        
      
        cEl.data.values.temp.style.textAlign = cEl.style.calc["text-align"] ? cEl.style.calc["text-align"] : "justify"; 
        cEl.data.values.temp.style.textIndent = cEl.style.calc["text-indent"] ? size2px(cEl.style.calc["text-indent"]) : 0;
        cEl.data.values.temp.style.textShadow = cEl.style.calc["text-shadow"] ? getShadowObj(cEl.style.calc["text-shadow"]) : null;
        
        
        cEl.data.values.temp.style.lineBottom = cEl.bounds.y + cEl.bounds.height;
        cEl.data.values.temp.style.lineBottom = cEl.style.calc["padding-bottom"] ? cEl.data.values.temp.style.lineBottom - size2px(cEl.style.calc["padding-bottom"],false) : cEl.data.values.temp.style.lineBottom;
        
        cEl.data.values.temp.style.lineRight = cEl.bounds.x + cEl.bounds.width;
        cEl.data.values.temp.style.lineRight = cEl.style.calc["padding-right"] ? cEl.data.values.temp.style.lineRight - size2px(cEl.style.calc["padding-right"],false) : cEl.data.values.temp.style.lineRight;

        cEl.data.values.temp.style.lineLeft = cEl.bounds.x;
        cEl.data.values.temp.style.lineLeft = cEl.style.calc["padding-left"] ? cEl.data.values.temp.style.lineLeft + size2px(cEl.style.calc["padding-left"],false) : cEl.data.values.temp.style.lineLeft;
        
        cEl.data.values.temp.style.lineTop = cEl.bounds.y;
        
//        cEl.data.values.temp.style.lineBottom = cEl.shape.temp.cpBorder.y1;
//        cEl.data.values.temp.style.lineBottom = cEl.style.calc["padding-bottom"] ? cEl.data.values.temp.style.lineBottom - size2px(cEl.style.calc["padding-bottom"],false) : cEl.data.values.temp.style.lineBottom;
//        
//        cEl.data.values.temp.style.lineRight = cEl.shape.temp.cpBorder.x1;
//        cEl.data.values.temp.style.lineRight = cEl.style.calc["padding-right"] ? cEl.data.values.temp.style.lineRight - size2px(cEl.style.calc["padding-right"],false) : cEl.data.values.temp.style.lineRight;
//
//        cEl.data.values.temp.style.lineLeft = cEl.shape.temp.cpBorder.x;
//        cEl.data.values.temp.style.lineLeft = cEl.style.calc["padding-left"] ? cEl.data.values.temp.style.lineLeft + size2px(cEl.style.calc["padding-left"],false) : cEl.data.values.temp.style.lineLeft;
//        
//        cEl.data.values.temp.style.lineTop = cEl.shape.temp.cpBorder.y;
//        cEl.data.values.temp.style.lineTop = cEl.style.calc["padding-top"] ? cEl.data.values.temp.style.lineTop + size2px(cEl.style.calc["padding-top"],false) : cEl.data.values.temp.style.lineTop;
        
        cEl.data.values.temp.style.lineHeight = cEl.style.calc["line-height"] ? size2px(cEl.style.calc["line-height"]) : 10;
        
//        if (cEl.data.values.vertical){
//            var trans = cEl.data.values.temp.style.lineBottom;
//            cEl.data.values.temp.style.lineBottom = cEl.data.values.temp.style.lineRight;
//            cEl.data.values.temp.style.lineRight = trans;
//
//            trans = cEl.data.values.temp.style.lineLeft;
//            cEl.data.values.temp.style.lineLeft = cEl.data.values.temp.style.lineTop;
//            cEl.data.values.temp.style.lineTop = trans;
//        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_text(cEl,strNewText){
    
    try{
        //console.log(strNewText + " vs " + cEl.data.values.temp.valueOld);

                if(!cEl.data.values.text)cEl.data.values.text= cEl.data.values.default;
                var strValAct = cEl.data.values.text;
                
                // if not set then set the old value to same value and continue to calc
                if(cEl.data.values.temp && !cEl.data.values.temp.valueOld){
                    cEl.data.values.temp.valueOld = strValAct;
                    cEl.data.values.temp.reset = true;
                    return true;
                }else if(cEl.data.values.temp){
                    //console.log(strNewText + " vs " + cEl.data.values.temp.valueOld);
                    // if is set then reset only if is different from old value
                    if(typeof strNewText !== "undefined"){
                        // if is same value go to end since it was precalculated
                        if(strNewText !== strValAct){
                            
                           //console.log(strNewText + " vs " + cEl.data.values.temp.valueOld);
                            // if new value in town then replace value and continue to calc
                            cEl.data.values.text = strNewText;
                            cEl.data.values.temp.valueOld = strValAct;
                            cEl.data.values.temp.reset = true;
                            //cEl.style.redraw = true;
                            //cEl.shape.redraw = true;
                            
                            return true;
                        }
                    }else{
                        
                    }
                }

        return false;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

// array functions
function cEl_set_wordMap3(cEl){
    
    try{

        cEl.data.values.temp.lines3 = [];
        cEl.data.values.temp.chars = {};
        
        var text = cEl.data.values.text;
        var lines = cEl.data.values.temp.lines3;
        var styleMap = cEl.data.values.temp.styleMap;
        
//        cdebug(styleMap)();
        
        var charObj = {"chr":"n","f":null,"wp":0,"pp":0,"nl":true,"sc":false,"print":false};
        pushChar(charObj,lines,styleMap,false);
        
        /// change here to detect words and create text Map of words by unique chars indexes
        for(var i=0, len = text.length;i < len;i++){
            charObj.chr = text[i];
            charObj.pos = i;
            if(i < len-1){
                set_charObj_line(charObj,lines,styleMap,text[i+1]);
            }else{
                set_charObj_line(charObj,lines,styleMap,false);
            }
            i = charObj.pos;
        };

        return true;
        
    } catch (e) {
        
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



function set_charObj_line(charObj,lines,styleMap,charNext){    
    try{
            
        // case is nonprintable character
        if(charNext && charObj.chr === "\\"){
            
            switch(charNext){
                case "n":
                case "r":
                    charObj.print = false;
                    charObj.pos++ ;
                    
                    charObj.sc = false;
                    charObj.pp++;
                    charObj.nl = true;
                    charObj.wp = 0;
                    
                    charObj.chr = charNext;
                    pushChar(charObj,lines,styleMap,false);
                    
                break;
//                case "t":
//                    // TODO add tabulation logic
//                break;
                default:
                    charObj.print = true;
                    pushChar(charObj,lines,styleMap,true);
                break;
            }
        // case is space
        }else if(charObj.chr === " "){
            charObj.print = true;
            charObj.sc = true;
            //charObj.pp = false;
            charObj.nl = true;
            
            pushChar(charObj,lines,styleMap,true);
            charObj.sc = false;
            charObj.wp++;
        // word character
        }else if(/[a-zA-Z_0-9]/.test(charObj.chr)){
        
            charObj.print = true;
            //charObj.pp = false;
            
            pushChar(charObj,lines,styleMap,true);
            
            //charObj.wp = false;
            charObj.sc = false;
            charObj.nl = false;

        // break for all other characters
        }else{
            charObj.print = true;
            //charObj.wp++;
            //charObj.pp = false;
            
            pushChar(charObj,lines,styleMap,true);
            
            charObj.sc = false;
            
            charObj.nl = false;
            charObj.wp++;
        }
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function pushChar(charObj,lines,styleMap,boolSetStyle){
    try{
        if(boolSetStyle){
            set_charObj_style(styleMap,charObj);
        }else{
            charObj.f = styleMap.default;
        }
        lines.push({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"nl":charObj.nl,"sc":charObj.sc,"pr":charObj.print});
        
        //cdebug({"chr":charObj.chr,"f":charObj.f,"wp":charObj.wp,"pp":charObj.pp,"nl":charObj.nl,"sc":charObj.sc,"pr":charObj.print})();
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function set_charObj_style(styleMap,charObj){
    
    try{
        
        var charFont = styleMap.charspos != null && styleMap.charspos[charObj.pos] ? styleMap.charspos[charObj.pos]:null;
        
        
        
//        if(charFont){
//            // set custom chars styles
//            charObj.f = charFont;
//        }else if(styleMap.chars && styleMap.chars[charObj.chr]){
//            // set custom chars styles
//            charObj.f = styleMap.chars[charObj.chr];
//        }else if(styleMap.wordspos && styleMap.wordspos[charObj.sc + "_" + charObj.pp]){
//            // set custom wordspos styles on specific paragraph "wordId_paragraphId"
//            charObj.f = styleMap.wordspos[charObj.sc + "_" + charObj.pp];
//        }else if(styleMap.wordspos && styleMap.wordspos[charObj.wp]){
//            // set custom wordspos styles
//            charObj.f = styleMap.wordspos[charObj.sc];
//        }else  if(styleMap.paragraphspos && styleMap.paragraphspos[charObj.pp]){
//            // set custom chars for specific paragraph
//            charObj.f = styleMap.paragraphspos[charObj.pp];
//        }else {
//            // set defaul chars styles
//            charObj.f = styleMap.default;
//        }
        
        //cdebug(charObj.pp + "_" + charObj.wp)();
        
        switch(true){
            // set custom chars Selection styles
            case (charFont):
                charObj.f = charFont;
            break;
//            // set custom chars styles
            case (styleMap.chars != null && styleMap.chars[charObj.chr] != null):
                charObj.f = styleMap.chars[charObj.chr];
            break;
            // set custom wordspos styles on specific paragraph "wordId_paragraphId"
            case (styleMap.wordspos != null && styleMap.wordspos[charObj.pp + "_" + charObj.wp] != null):
                
                //cdebug(styleMap.wordspos[charObj.pp + "_" + charObj.wp])();
                charObj.f = styleMap.wordspos[charObj.pp + "_" + charObj.wp];
            break;
            // set custom wordspos styles
            case (styleMap.wordspos != null && styleMap.wordspos[charObj.wp] != null):
                charObj.f = styleMap.wordspos[charObj.wp];
            break;
            // set custom chars for specific paragraph
            case (styleMap.paragraphspos != null && styleMap.paragraphspos[charObj.pp] != null):
                charObj.f = styleMap.paragraphspos[charObj.pp];
            break;
            // set default chars styles
            default:
                charObj.f = styleMap.default;
            break;
        }

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

// TODO split bellow function according to text allignment, will keep it simple
function cEl_set_chr_metrics(cEl,cEl_pageText){
    
    try{
        
        var lines = cEl.data.values.temp.lines3;
        var len = lines.length;
        if(!lines)return false;

        for(var i = 0, chrObj, charStyle,charWidth; i< len;i++){
            chrObj = lines[i];
            //cdebug(chrObj.f.id)();
            charStyle = cEl_pageText.charsFontsObj[chrObj.f.id];
            
            
            //if(cEl_ctx.font !== charStyle.fontCanvas)cEl_ctx.font = charStyle.fontCanvas;
            
            if(chrObj.pr){
                charWidth = setGetCharWidth(cEl_pageText,chrObj.chr,chrObj.f.id,charStyle);
                chrObj.fc = charWidth.fc;
                chrObj.w = charWidth.w;
                chrObj.fs = charStyle.fontSize;
                chrObj.ls = charStyle.letterSpacing;
            }else{
                chrObj.fc = null;
                chrObj.w = 0;
                chrObj.fs = charStyle.fontSize;
                chrObj.ls = 0;
            }
        }
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

//function delete_chars(eventholder){
//    
//    try{
//        
//        //cdebug(eventholder.keys.chr);
//        var cEl = window[eventholder.active.name];
//        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
//        
//        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
//        var cEl_pageText = window[cEl.pageId].text;
//
//        if(delete_selection(cEl,cEl_layer,cEl_pageText)){
//            // do nada
//        }else if(eventholder.keys.chr === 8 ){
//            if(cEl_pageText.charsSelection.cr.pos > 0){
//                
//                if(cEl_pageText.charsSelection.cr.left){
//                    cEl_pageText.charsSelection.cr.pos--;
//                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
//                }else{
//                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
//                    cEl_pageText.charsSelection.cr.pos--;
//                }
//                
//                cEl_layer.shape.redraw = true;
//            }
//            
//        }else{
//            if(cEl_pageText.charsSelection.cr.pos < cEl.data.values.temp.lines3.length-1){
//                
//                if(cEl_pageText.charsSelection.cr.left){
//                    //cEl_pageText.charsSelection.cr.pos++;
//                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
//                }else{
//                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos+1,1);
//                    cEl_pageText.charsSelection.cr.left = true;
//                    cEl_pageText.charsSelection.cr.pos++;
//                }
//                cEl_layer.shape.redraw = true;
//            } else if(cEl_pageText.charsSelection.cr.pos === cEl.data.values.temp.lines3.length-1){
//                if(cEl_pageText.charsSelection.cr.left){
//                    cEl_pageText.charsSelection.cr.left = false;
//                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
//                    cEl_pageText.charsSelection.cr.pos--;
//                }
//                cEl_layer.shape.redraw = true;
//            }
//            
//        }
//        //cdebug(cEl_pageText.charsSelection.cr.pos,false,true);
//
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}
//
//function delete_selection(cEl,cEl_layer,cEl_pageText){
//    
//    try{  
//        var selLen = cEl_pageText.charsSelection.charspos.length;
//        if(selLen > 0){
//            var delPos = 0;
//            // TODO detect last charObj selection type
//            cEl_pageText.charsSelection.cr.left = false;
//            
//            for(var i = selLen-1;i>-1;i--){
//                delPos = cEl_pageText.charsSelection.charspos[i];
//                //console.log(delPos + " vs "+cEl.data.values.temp.lines3[delPos].chr + " vs " + cEl.data.values.temp.lines3[delPos].wp);
//                cEl.data.values.temp.lines3.splice(delPos,1);
//            }
//            cEl_pageText.charsSelection.charspos = [];
//            cEl_pageText.charsSelection.cr.pos = delPos-1;
//            //cEl_pageText.charsSelection.cr.left = true;
//            cEl_layer.shape.redraw = true;
//            return true;
//        }else{
//            return false;
//        }
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }  
//}
//
//function edit_chars(eventholder,boolAppend){
//    
//    try{
//        
//        var cEl = window[eventholder.active.name];
//        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
//        
//        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
//        var cEl_pageText = window[cEl.pageId].text;
//        
//        delete_selection(cEl,cEl_layer,cEl_pageText);
//        
//        var chrObj ,newCarObj;
//        if(boolAppend){
//            if(cEl_pageText.charsSelection.cr.pos > -1){
//
//                chrObj = cEl.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos];
//                var charCode = eventholder.keys.chr;
//                var charVal = eventholder.keys.chrVal;
//
//                // TODO account for special keys
//                //cdebug("<" + charVal + ">" + charCode,true,true);
//
//                newCarObj = {
//                    "chr":charVal,
//                    "f":chrObj.f,
//                    "wp":false,
//                    "pp":false,
//                    "pr":true,
//                    "fs":chrObj.fs,
//                    "ls":chrObj.ls
//                };
//                if(charVal!==chrObj.chr){
//                    var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_canvas"];
//                    var cEl_ctx = cEl_canv.getContext('2d');
//
//                    // TODO add custom style for new character
//
//                    cEl_ctx.save();
//                    newCarObj.w = setGetCharWidth(cEl_ctx,cEl_pageText,newCarObj.chr,newCarObj.f).w;
//                    cEl_ctx.restore();
//                }else{
//                    newCarObj.w = chrObj.w;
//                }
//                newCarObj.sc = (charVal === " ");
//                newCarObj.nl = (charCode === 13);
//                if(newCarObj.nl){
//                    newCarObj.chr = "n";
//                    newCarObj.pr = false;
//                    newCarObj.pp = true;
//                };
//
//                cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,0,newCarObj);
//                cEl_pageText.charsSelection.cr.pos++;
//                
//                cEl_layer.shape.redraw = true;
//            } 
//        }
//        //cdebug(cEl_pageText.charsSelection.cr.pos,false,true);
//
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}
//
//function move_chars(eventholder){
//    
//    try{
//        
//        var cEl = window[eventholder.active.name];
//        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
//        
//        return selection_actions(cEl, null, eventholder.keys.chr,false);
//        
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }    
//}


function setGetFontObj(cEl_pageText,styleObj,boolReturnId){
    
    try{
        
        var fontText =  styleObj.fontSize + styleObj.fontStyle + styleObj.fontWeight + styleObj.fontFamily + styleObj.color;
        var md5Font =  md5(fontText);
        
        var fontObjRet = cEl_pageText.charsFontsMd5[md5Font];
        var fontObjId = -1;
        if(!fontObjRet){
            
            
            // this to reset the font property, maybe use a string replace "normal" with "", should be faster i think
//            cEl_ctx.font = fontObj.fontCanvas;
//            cEl_ctx.fillStyle = fontObj.color;
//            
//            fontObj.fontCanvas = cEl_ctx.font;
//            fontObj.color = cEl_ctx.fillStyle;
//            fontObj.fontSize = parseInt(cEl_ctx.font.match(/\d+px/));
            
            fontObjId = cEl_pageText.charsFontsObj.length;//Object.keys(cEl_pageText.charsFontsMd5).length;
            cEl_pageText.charsFontsObj.push(styleObj);
            fontObjRet = {"id":fontObjId}; //,"val":md5Font
            cEl_pageText.charsFontsMd5[md5Font] = fontObjRet;
            if(boolReturnId)return fontObjRet;
            return styleObj;
        }else{
            if(boolReturnId)return fontObjRet ;//cEl_pageText.charsFonts[md5Font];
            return cEl_pageText.charsFontsObj[fontObjRet.name];
        }
        

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getFontObjById(cEl_pageText,fontObjId){
    
    try{

        return cEl_pageText.charsFontsObj[fontObjId];

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function setGetCharsObj(cEl_ctx,cEl_pageText,chars,char,fontObj){
    
    try{
        var charObj = chars[char];
        if(!charObj){
            charObj = {"id":Object.keys(chars).length,"val":char,"f":fontObj,"w":null};
            chars[char] = charObj;
        }
        return charObj;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}



//function setFont(cEl_ctx,cEl_pageText,fontId){
//    
//    try{
//        var charFont = cEl_pageText.charsFonts[Object.keys(cEl_pageText.charsFonts)[fontId]];
//        
//        // reset font if needed 
//        if(cEl_ctx.font !== charFont.val){
//            cEl_ctx.font = charFont.val;
//        }
//        return true;
//
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}

function setGetCharWidth(cEl_pageText,chrVal,charFontId,charStyle){
    
    try{
        // get set char width
        var strFontChar =  charFontId + " " + chrVal;// CryptoJS.MD5(cEl.data.values.temp.font + " " + cEl_pageText.chars[i]).toString();
        var charWidth = cEl_pageText.charsWidths[strFontChar];
        if(!charWidth){
            
            //cdebug(charStyle)();
            
            var charPoint = new paper.PointText({
                content: chrVal,
                fontSize: charStyle.fontSize,
                fontFamily: charStyle.fontFamily,
                fontWeight: charStyle.fontWeight,
                fontStyle: charStyle.fontStyle,
                fillColor: charStyle.color//,
                //strokeColor: charStyle.color
            });

            // Create a symbol definition from the path:
            var charSymbol = new paper.SymbolDefinition(charPoint);
            
            //var instance = new paper.SymbolItem(charSymbol);
            
            //cdebug(instance.bounds,false,false,0)();
            //cdebug(charPoint.bounds,false,false,0)();
            
            charWidth = {"w":charPoint.bounds.width,"f":charFontId,"fc":strFontChar,"symbol":charSymbol};
            
            cEl_pageText.charsWidths[strFontChar] = charWidth;
            charWidth = cEl_pageText.charsWidths[strFontChar];
            //cdebug(tmpChar,false,true,0);
        }
        return charWidth;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

// TODO split bellow function according to text allignment, will keep it simple
function draw_cEl_lines3(cEl,cEl_pageText){
    
    try{
        
        set_text_path(cEl);
        
        var offset = cEl.data.values.temp.style.textIndent;
        
        //cdebug(cEl.data.values.temp.lines3)();
        
        drawTextAlongPath(cEl,0,offset,cEl_pageText);
        
       
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function set_text_path(cEl){
    
    try{

        switch(cEl.data.values.pattern){
            case "box-fill":
                setTextPathObj(cEl);
                setTextContainer(cEl);
                //cdebug(cEl.data.values.vertical,false,false,0);
                if(cEl.data.values.vertical){

                    cEl.data.values.temp.path.add([cEl.bounds.x + cEl.bounds.width/2, cEl.bounds.y ],
                        [cEl.bounds.x + cEl.bounds.width/2, cEl.bounds.y  + cEl.bounds.height]);
                        
                }else{

                    cEl.data.values.temp.path.add([cEl.bounds.x, cEl.bounds.y + cEl.bounds.height/2],
                        [cEl.bounds.x + cEl.bounds.width,cEl.bounds.y  + cEl.bounds.height/2]);
                        
                }
                
                

            break;
            case "path":
                
                cEl.data.values.temp.path = cEl;
                setTextContainer(cEl);
                
            break;    
        }
        return true;
      
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function setTextContainer(cEl){
    try{
        
        if(cEl.data.values.temp.textContainer){
            cEl.data.values.temp.textContainer.removeChildren();
        }else{
            cEl.data.values.temp.textContainer = new paper.Group;
            cEl.data.values.temp.textContainer.name = cEl.parentName + "_" + cEl.name + ".T";
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function setTextPathObj(cEl){
    try{
        
        if(cEl.data.values.temp.path){
            cEl.data.values.temp.path.removeSegments();
        }else{
            cEl.data.values.temp.path = new paper.Path;
            cEl.data.values.temp.path.name = cEl.parentName + "_" + cEl.name + ".L";
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function getCharPos(lines,xy){
    try{
        //if(!startPos || startPos === -1)startPos = 0;
        // do a direct search
        var pos=0;
        var boolLeft = false;
        for(var i = 0, chrObj,offsetXY,actY=0,boolYset=false,len = lines.length; i<len;i++){
            pos = i;
            chrObj = lines[i];
            if(chrObj.point){

                offsetXY = [-chrObj.w/2,0];

                if(chrObj.point.y>xy[1]+offsetXY[1]){
                    pos = i;
                    if(!boolYset){
                        boolYset = true;
                        actY = chrObj.point.y;
                    }
                    if(chrObj.point.x>xy[0]+offsetXY[0]){
                        pos = i;
                        boolLeft =true;
                        break;
                    }
                }
                
                if(boolYset){
                    //cdebug(actY > chrObj.xy[1],false,true);
                    if(actY < chrObj.point.y){
                        pos = i-1;
                        boolLeft = false;
                        break;
                    }
                }
            }
        }
        //cdebug(lines[pos],true,true);
        //cdebug({"pos":pos,"left":boolLeft},false,true)();
        return {"pos":pos,"left":boolLeft};
                            
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function setCarret(boolShowCarret,chrObj,boolCrLeft) {
    
    try{
        var d;
        
        //cdebug(chrObj,true,true);
        //cdebug(boolShowCarret,false,true);
        d = document.getElementById("editorPage_carret_div");
        
        if(boolShowCarret){
            
            
            d.style.fontSize = (chrObj.fs)+'px';

            if(boolCrLeft){
                d.style.left = (chrObj.xy[0])+'px';
            }else{
                d.style.left = (chrObj.xy[0]+chrObj.w)+'px';
            }
            d.style.top = (chrObj.xy[1]-chrObj.fs*0.8)+'px';


            //d.style.width = (chrObj.w)+'px';
    //        d.style.width = (chrObj.w) + 'px';
    //        d.style.maxWidth = (chrObj.w)+'px';
            d.style.width = 1 + 'px';
            d.style.maxWidth = 1 +'px';
            d.style.height = (chrObj.fs)+'px';
            d.style.maxHeight = (chrObj.fs)+'px';
            d.style.visibility = "visible";
            d.focus();
        }else{
            //cdebug("here",true,true,0);
            d.style.visibility = "hidden";
            d.blur();
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_linePars(line,linePars,boolPP){
    
    try{
        
        //linePars.sw = linePars.swd;
        
        var boolEndOfParagraph = true;
        var intSpaceCount = 0;
        var endPos = linePars.ep;
        var startPos = linePars.sp;
        linePars.bp = endPos;
        
        
        var intWordPosPrev = line[startPos].wp;
        var intWordPos = intWordPosPrev;
        
        var intWordWidth = 0;
        
        var intwordX;
        if(boolPP){
            intwordX = linePars.minX + linePars.li;
        }else{
            intwordX = linePars.minX;
        }
              
        linePars.fs = 0;
        
        for(var k = startPos, retIndex = 0,retIndex2= 0,chrObj,chrWidth,chrVal,boolVeryLongWord, boolWordChange;k < endPos;k++){

            chrObj = line[k];
            intWordPos = chrObj.wp;
            chrWidth = chrObj.w;
            chrVal = chrObj.chr;
            linePars.fs = Math.max(chrObj.fs,linePars.fs);
            
            //zzz+=line[k][0];
            if(intwordX > linePars.maxX){
                
                boolVeryLongWord = (intWordWidth > (linePars.maxX-linePars.minX));
                
                // break on too long word
                if(!boolWordChange && !boolVeryLongWord){
                    linePars.eos = linePars.maxX - intwordX;
                    linePars.bp = k-2;
                    boolEndOfParagraph = false;
                    //console.log(JSON.stringify(linePars));
                    break;
                }
                if(!retIndex2){
                    retIndex2 = k-1;
                }
                
                
                if(intWordWidth > (linePars.maxX-linePars.minX)){
                    linePars.bp = retIndex;
                    break;
                }
                
                if(intWordPos){
                    linePars.bp = retIndex;
                    boolEndOfParagraph = false;
                    break;
                    intWordWidth = 0;
                }else{
                    if(chrObj.sc){
                        intWordWidth+= linePars.swd + linePars.ls;
                    }else{
                        intWordWidth+= chrWidth + linePars.ls;
                    }
                }
                
                
            }else{
                // reset return index after new word found
                if(chrObj.sc){ //intWordPos !== intWordPosPrev
                    
                    boolWordChange = true;
                    retIndex = k;
                    intWordWidth = 0;
                    intSpaceCount++;
                    intwordX+= linePars.swd + chrObj.ls;
                    linePars.eos = linePars.maxX - intwordX;
                }else{
                    intwordX+= chrWidth + chrObj.ls;
                }

            }
            intWordPosPrev = intWordPos;
        }
        // set text alignment here !!!
        
        if(boolEndOfParagraph){
            linePars.sw = linePars.swd;
        }else{
            if(intSpaceCount>0){
                //console.log(intSpaceCount);
                linePars.sw = linePars.swd + linePars.eos/(intSpaceCount-1);
            }
        }
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function setGetWordStyle(cEl_ctx,cEl_pageText,word,font){
    
    try{

        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function getWordWidths(cEl_ctx,cEl_pageText,word,font){
    
    try{

        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}




function drawTextAlongPath(cEl,index,offset,cEl_pageText){
    
    try{
        var i = index;
        //var j = 0;
        //var offset=0;
        var lines = cEl.data.values.temp.lines3;
        
        //cdebug(lines,false,false,0)();
        
        var path = cEl.data.values.temp.path;
        var textContainer = cEl.data.values.temp.textContainer;

        // TODO do something about this part
        switch(cEl.data.values.temp.style.textAlign){

            case "right":

            break;

            case "left":

            break;

            case "justify":

            break;

        }


        var showCP = true;
        //if(showCP){
            //console.log("start " + i);
            //path.strokeColor = "rgba(111,111,111,0.3)";
//            path.selected = true;
            
        //}
        var charsCount = lines.length;
        //charsCount = 10;
        //cdebug("start " +paper.project.activeLayer.children.length)();
//        if(cEl.data.indexes){
//            cdebug(cEl.data.values.default)();
//            //cdebug(cEl.data.indexes)();
//            cdebug(paper.project.activeLayer.children[cEl.data.indexes.start])();
//            cdebug(paper.project.activeLayer.children[cEl.data.indexes.end])();
//            if(cEl.data.indexes.changed){
//                //var removedChars = paper.project.activeLayer.removeChildren();
//                //var removedChars = paper.project.activeLayer.removeChildren(cEl.data.indexes.start,cEl.data.indexes.end);
//                //cdebug(removedChars.length + " " + cEl.parentName + "_" + cEl.name + " val " + cEl.data.values.default)();
//            }
//        }

        //cdebug("after remove " +paper.project.activeLayer.children.length)();

        var startIndex = paper.project.activeLayer.children.length;
        var boolChanged = showCP;
        
        //cdebug(textContainer)();
        
        for(var j=0;j<path.curves.length;j++){
            var curve = path.curves[j];
            var curveLen = curve.length;
            

            for(var charObj, charFont, charSymbolContainer; i < charsCount; i++){
                charObj = lines[i];
                charFont = cEl_pageText.charsFontsObj[charObj.f.id];
                charSymbolContainer = cEl_pageText.charsWidths[charObj.fc];


                //cdebug(i + " of " + charsCount + " is " + charObj.chr)();

                if( charObj.w > 0 ){
//                    cdebug(i + " of " + charsCount + " is " + charObj.chr + 
//                        " at index " + paper.project.activeLayer.children.length + 
//                        " is vertical " + cEl.data.values.vertical)();
                    
                    //if(!charObj.point){

                        if(!cEl.data.values.vertical){
                            
                            //cdebug(offset)();

                            offset = offset + charObj.w/2;
                            var location = curve.getLocationAt(offset);
                            if(!location){
                                //cdebug("off")();
                                offset = offset - charObj.w/2 - curveLen;
                                break;
                            }else{
                                //cdebug("on")();
                                var tan =  curve.getTangentAtTime(location.time);
                                //cdebug(charFont)();
                                //cdebug("angle " + tan.angle + ", point " + location.point + ", spacing " + charFont.letterSpacing)();
                                
                                charObj.angle = tan.angle;//toDegrees(Math.atan2(tan.y,tan.x));
                                charObj.point = location.point;//new paper.Point(location.point.x - charObj.w/2,location.point.y + charObj.fs*0.2);
                                offset = offset + charObj.w/2 + charFont.letterSpacing;
                                
                                //cdebug("char end")();
                            }


                        }else{

                            offset = offset + charObj.fs *1.2;
                            var location = curve.getLocationAt(offset);
                            if(!location){
                                offset = 0;
                                break;
                            }else{
                                charObj.angle = 0;//toDegrees(Math.atan2(tan.y,tan.x));
                                charObj.point = location.point; //new paper.Point(location.point.x - charObj.w/2,location.point.y - charObj.fs*0.2);
                                
                            }


                            
                        }

                        //cdebug(charObj.point)();
                        //boolChanged = true;
                        drawChar(charObj,cEl.parentName + "_" + cEl.name + ".P_" + i,textContainer,charSymbolContainer);

                        //cEl.data.index = 
                        
                        //cdebug(location.point.x)();
                        
                        

                    //    path.lastPos = i;

                    //}else{
                    //    drawChar(charObj,showCP);
                    //    if(boolIsSet){
                    //        if(i === path.lastPos)break;
                    //    }
                    //}
                }
            }
//            if(showCP){
//                var pathPoint3 = new paper.Path.Line({
//                    from: [curve.point1.x - 5, curve.point1.y - 5],
//                    to: [curve.point1.x + 5, curve.point1.y + 5],
//                    strokeColor: 'black',
//                    name:cEl.parentName + "_" + cEl.name + ".S_" + i
//                });
//            }
            //break;
        }
        cEl.data.indexes = {
            "start":startIndex,
            "end":paper.project.activeLayer.children.length,
            "changed":boolChanged
        };
        //cdebug(cEl.data.indexes)();
        //cdebug(cEl.name + " after add " +paper.project.activeLayer.children.length,false,0)();
        //cdebug(cEl.data.indexes)();
        //cdebug(textContainer.children.length,false,false,1)();
        //cdebug(textContainer.children.length)();
        //path.lastPos = startPos;
        if(showCP){
            //console.log("end " + i);
        }
        return i;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function upsertCP(cpPath,bool){
    
    
    
}


function drawChar(charObj,name,textContainer,charSymbolContainer){
   
    try{
        //cdebug(charFont)();
        var charSymbol = charSymbolContainer.symbol;
//
////        //cdebug(charSymbol)();
////
//        var textItem = new paper.SymbolItem(charSymbol,{insert: false});
//        
        var textItem = textContainer.addChild(new paper.SymbolItem(charSymbol));
        textItem.position = charObj.point;
        textItem.rotation = charObj.angle;
        //textContainer.lastChildren();
//        
//        textContainer.addChild(new PointText({
//            content: charObj.chr,
//            point: charObj.point
//        }));
        
        
        //cdebug(textContainer.children.length)();
        
//        textContainer.addChild(new paper.SymbolItem(charSymbol));
        
        //if(charObj.path)charObj.path.remove();
        
//        if(!charObj.path){
//            charObj.path = charSymbol.place(charObj.point);
//            charObj.path.name = name;
//        }else{
//            //charObj.path = charSymbol;
//            charObj.path.position = charObj.point;
//            charObj.path.content= charObj.chr;
//        }
        
//        charObj.path.rotation = charObj.angle;
        //charObj.path.selected = true;
        
//        if(showCP){            
//            var pathPoint1 = new paper.Path.Line({
//                from: charObj.point,
//                to: [charObj.point.x + 5, charObj.point.y + 5],
//                strokeColor: 'green',
//                name:cEl.parentName + "_" + cEl.name + ".MP_" + i
//            });
//            var pathPoint2 = new paper.Path.Line({
//                from: charObj.point,
//                to: [charObj.point.x - 5, charObj.point.y - 5],
//                strokeColor: 'red',
//                name:cEl.parentName + "_" + cEl.name + ".LR_" + i
//            });
//        }
        
        
        //cdebug(paper.project.children.length)();

        //definition.fillColor = "red";
        //textItem.position = charObj.point;
        //charSymbol.definition.fillColor = charFont.color;
        //charSymbol.definition.strokeColor = charFont.color;
        //textItem.rotate = charObj.angle;

        //{"fontSize":36,"fontStyle":"normal","fontVariant":"normal",
        //"fontWeight":"bold","fontFamily":"Arial","fontCanvas":"bold 36px Arial",
        //"letterSpacing":18,"color":"rgba(255, 255, 255, 0.701960784313725)","wordSpacing":0}


        //cEl_pageText.charsWidths[strFontChar];



//        var textItem = new paper.PointText({
//            content: charObj.chr,
//            point: charObj.point
//        });


    //    var textItem = new paper.PointText({
    //        content: charObj.chr,
    //        point: charObj.point,
    //        fillColor: charFont.color,
    //        rotation: charObj.angle,
    //        fontSize:charObj.fs,
    //        fontStyle:charFont.fontStyle,
    //        fontWeight: charFont.fontWeight,
    //        name:name,
    //        selected:false
    //    });
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}