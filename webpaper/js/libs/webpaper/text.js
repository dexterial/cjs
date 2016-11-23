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




function draw_cEl_text(cEl_ctx,cEl,boolDrawCp){
    
    try{ 

        draw_cEl_text_sq(cEl_ctx,cEl,boolDrawCp);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function draw_cEl_text_sq(cEl_ctx,cEl,boolDrawCp){
    
    try{
        
        var boolNotSet = false;
        if(!cEl.data.values.temp){
            cEl.data.values.temp = {};
            boolNotSet = true;
        }
        
        var cEl_pageText = window[cEl.pageId].text;
        
        if(cEl.style.redraw || boolNotSet){
            
            // set the css attributes for text box
            set_cEl_text_css(cEl,cEl_ctx,cEl_pageText,true);


            if(set_cEl_text(cEl)){
                //cEl.data.values.temp.lines2 = {"0":{}};
                cEl_set_wordMap3(cEl);
                cEl_set_chr_metrics(cEl_ctx,cEl,cEl_pageText);
            }



//            if(cEl.id === "txtInputObj" && cEl.parentId === "editorPage_control_list2"){
//                //console.log(JSON.stringify(cEl.data.values.temp.zzz));
//                //console.log( " VS " +JSON.stringify(cEl.data.values.temp.fontActive));
//                //console.clear();
//                //console.log(cEl.parentId + "_" + cEl.id);
//                //console.log(GLOBAL_rem);
//                //console.log(JSON.stringify(cEl.data.values.customStyle));
//                //console.log(JSON.stringify(cEl.data.values.temp.styleMap.chars[0]));
//                //console.log(JSON.stringify(cEl.data.values.temp.styleMap.chars[4]));
//
//                //console.log(JSON.stringify(cEl.data.values.temp.lines3));
//                //console.log(JSON.stringify(cEl.data.values.temp.lines3[4].f));
//                //console.log(JSON.stringify(cEl.data.values.temp.style));
//
//            }    
        
        }
        // draw the text
        
        
        
        draw_cEl_lines3(cEl_ctx,cEl,cEl_pageText);
        
        
//        
//        if(cEl.id === "txtInputObj"){
//            //console.log(JSON.stringify(cEl.data.values.temp.zzz));
//            //console.log( " VS " +JSON.stringify(cEl.data.values.temp.fontActive));
//            //console.log(JSON.stringify(cEl.data.values.temp.lines2[0][4]));
//        }    
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_font_css(cEl,cEl_ctx,cEl_pageText,addStyle,boolReturnId){
    
    try{
        //console.log("before " + cEl.style.calc.color);
        //console.log("apply  " + addStyle.color);
        if(addStyle){
            cEl.style.calc2 = $.extend(false,cEl.style.calc,addStyle);
        }else{
            cEl.style.calc2 = cEl.style.calc;
        }
        var styleObj = {};
        //cdebug(window[cEl.pageId].shape.scale,false,true,0);
        //cdebug(cEl.id + " " + cEl.style.calc2["font-size"],false,true,0);
        styleObj.fontSize = size2px(cEl.style.calc2["font-size"],false,window[cEl.pageId].shape.scale[1]);
        styleObj.fontStyle = cEl.style.calc2["font-style"] ? cEl.style.calc2["font-style"] : "normal";
        styleObj.fontVariant = cEl.style.calc2["font-variant"] ? cEl.style.calc2["font-variant"] : "normal";
        styleObj.fontWeight = cEl.style.calc2["font-weight"] ? cEl.style.calc2["font-weight"] : "normal";
        styleObj.fontFamily = cEl.style.calc2["font-family"] ? cEl.style.calc2["font-family"] : "Arial";
        
        styleObj.fontCanvas = styleObj.fontStyle + " " + styleObj.fontVariant + " ";
        styleObj.fontCanvas += styleObj.fontWeight + " " + styleObj.fontSize + "px ";
        styleObj.fontCanvas += styleObj.fontFamily;
        
        styleObj.letterSpacing = cEl.style.calc2["letter-spacing"] ? size2px(cEl.style.calc2["letter-spacing"],false) : 0;
        styleObj.color = cEl.style.calc2["color"] ? cEl.style.calc2["color"] : "rgba(0,0,0,1)";
        styleObj.wordSpacing = cEl.style.calc2["word-spacing"] ? size2px(cEl.style.calc2["word-spacing"],false) : 0;
        
        // text positioning
        
        
        //var fontText =  md5(styleObj.letterSpacing + styleObj.color + styleObj.wordSpacing + styleObj.lineHeight + styleObj.fontCanvas);
        var fontText =  md5(styleObj.letterSpacing + styleObj.color + styleObj.wordSpacing + styleObj.lineHeight + styleObj.fontCanvas);

        return setGetFontObj(cEl_ctx,cEl_pageText,fontText,styleObj,boolReturnId);
        
        //return styleObj;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_text_css(cEl,cEl_ctx,cEl_pageText,boolReturnId){
    
    try{
        
        if(!cEl.data.values.temp.style)cEl.data.values.temp.style = {};
        if(!cEl.data.values.temp.styleMap)cEl.data.values.temp.styleMap = {"default":null};
        
        cEl.data.values.temp.styleMap.default = $.extend(true,cEl.data.values.temp.styleMap.default,set_cEl_font_css(cEl,cEl_ctx,cEl_pageText,null,boolReturnId));
        //cEl.data.values.temp.styleMap.default = set_cEl_font_css(cEl,cEl_ctx,cEl_pageText,null,boolReturnId);
        
        if(cEl.data.values.customStyle){
            // todo pre-compute style map,
            //[{"style":{"font-size":"1em"},"chars":["0","1","3","4"]}];
            for(var i = 0, maxLen = cEl.data.values.customStyle.length, customStyle;i < maxLen;i++){
                customStyle = cEl.data.values.customStyle[i];
                customStyle.f = $.extend(true,customStyle.f,set_cEl_font_css(cEl,cEl_ctx,cEl_pageText,customStyle.style,boolReturnId));
                //if(customStyle.style.color)console.log("after  " + cEl.style.calc.color);
                if(customStyle.paragraphspos){
                    if(!cEl.data.values.temp.styleMap.paragraphspos)cEl.data.values.temp.styleMap.paragraphspos = {};
                    for(var j = 0,maxLen2 = customStyle.paragraphspos.length;j < maxLen2;j++){
                        //console.log(customStyle.paragraphs[j]);
                        cEl.data.values.temp.styleMap.paragraphspos[customStyle.paragraphspos[j]] = customStyle.f;
                        
                    }
                }
                if(customStyle.wordspos){
                    if(!cEl.data.values.temp.styleMap.wordspos)cEl.data.values.temp.styleMap.wordspos = {};
                    for(var j = 0,maxLen2 = customStyle.wordspos.length;j < maxLen2;j++){
                        //console.log(customStyle.wordspos[j]);
                        cEl.data.values.temp.styleMap.wordspos[customStyle.wordspos[j]] = customStyle.f;
                        
                    }
                }
                if(customStyle.charspos){
                    if(!cEl.data.values.temp.styleMap.charspos)cEl.data.values.temp.styleMap.charspos = {};
                    for(var j = 0,maxLen2 = customStyle.charspos.length;j < maxLen2;j++){
                        cEl.data.values.temp.styleMap.charspos[customStyle.charspos[j]] = customStyle.f;
                    }
                }
                if(customStyle.chars){
                    if(!cEl.data.values.temp.styleMap.chars)cEl.data.values.temp.styleMap.chars = {};
                    for(var j = 0,maxLen2 = customStyle.chars.length;j < maxLen2;j++){
                        //console.log(customStyle.strings[j]);
                        cEl.data.values.temp.styleMap.chars[customStyle.chars[j]] = customStyle.f;
                        
                    }
                }
            }
            //{"chars":{"0":{"font-size":"1em"},"1":{"font-size":"1em"},"3":{"font-size":"1em"},"4":{"font-size":"1em"}},"lines":{},"default":{"id":2,"val":"italic 12px sans-serif"}}
        }
        
      
        cEl.data.values.temp.style.textAlign = cEl.style.calc["text-align"] ? cEl.style.calc["text-align"] : "justify"; 
        cEl.data.values.temp.style.textIndent = cEl.style.calc["text-indent"] ? size2px(cEl.style.calc["text-indent"]) : 0;
        cEl.data.values.temp.style.textShadow = cEl.style.calc["text-shadow"] ? getShadowObj(cEl.style.calc["text-shadow"]) : null;
        
        
        cEl.data.values.temp.style.lineBottom = cEl.shape.path.bounds.y + cEl.shape.path.bounds.height;
        cEl.data.values.temp.style.lineBottom = cEl.style.calc["padding-bottom"] ? cEl.data.values.temp.style.lineBottom - size2px(cEl.style.calc["padding-bottom"],false) : cEl.data.values.temp.style.lineBottom;
        
        cEl.data.values.temp.style.lineRight = cEl.shape.path.bounds.x + cEl.shape.path.bounds.width;
        cEl.data.values.temp.style.lineRight = cEl.style.calc["padding-right"] ? cEl.data.values.temp.style.lineRight - size2px(cEl.style.calc["padding-right"],false) : cEl.data.values.temp.style.lineRight;

        cEl.data.values.temp.style.lineLeft = cEl.shape.path.bounds.x;
        cEl.data.values.temp.style.lineLeft = cEl.style.calc["padding-left"] ? cEl.data.values.temp.style.lineLeft + size2px(cEl.style.calc["padding-left"],false) : cEl.data.values.temp.style.lineLeft;
        
        cEl.data.values.temp.style.lineTop = cEl.shape.path.bounds.y;
        
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
        
        if (cEl.data.values.vertical){
            var trans = cEl.data.values.temp.style.lineBottom;
            cEl.data.values.temp.style.lineBottom = cEl.data.values.temp.style.lineRight;
            cEl.data.values.temp.style.lineRight = trans;

            trans = cEl.data.values.temp.style.lineLeft;
            cEl.data.values.temp.style.lineLeft = cEl.data.values.temp.style.lineTop;
            cEl.data.values.temp.style.lineTop = trans;
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_text(cEl,strNewText){
    
    try{

//        switch(cEl.data.values.pattern){
//            case "box-fill":
                if(!cEl.data.values.text)cEl.data.values.text= cEl.data.values.default;
                
                
                
                var strValAct = cEl.data.values.text;
                // if not set then set the old value to same value and continue to calc
                if(cEl.data.values.temp && !cEl.data.values.temp.valueOld){
                    
                    cEl.data.values.temp.valueOld = strValAct;
//                    cEl.data.values.temp.len = strValAct.length || -1;
                    return true;
                }else  if(cEl.data.values.temp){
                    // if is set then
                    if(typeof strNewText !== "undefined"){
                        // if is same value go to end since it was precalculated
                        if(!strNewText === strValAct){
                            // if new value in town then replace value and continue to calc
                            cEl.data.values.text = strNewText;
                            cEl.data.values.temp.valueOld = strValAct;
//                            if(strNewText){
//                                cEl.data.values.temp.len = strNewText.length ;
//                            }else{
//                                cEl.data.values.temp.len = -1;    
//                            }
                            return true;
                        }
                    }
                }
//            break;    
//        }
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
        var charObj = {"chr":"n","f":null,"wp":true,"pp":true,"nl":true,"sc":false,"print":false};
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
                    charObj.pp = true;
                    charObj.nl = true;
                    charObj.wp = true;
                    
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
            charObj.pp = false;
            charObj.nl = true;
            
            pushChar(charObj,lines,styleMap,true);
            charObj.sc = false;
            charObj.wp = true;
        // word character
        }else if(/[a-zA-Z_0-9]/.test(charObj.chr)){
        
            charObj.print = true;
            charObj.pp = false;
            
            pushChar(charObj,lines,styleMap,true);
            
            charObj.wp = false;
            charObj.sc = false;
            charObj.nl = false;

        // break for all other characters
        }else{
            charObj.print = true;
            charObj.wp = true;
            charObj.pp = false;
            
            pushChar(charObj,lines,styleMap,true);
            
            charObj.sc = false;
            
            charObj.nl = false;
            
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
        
        switch(true){
            // set custom chars Selection styles
            case (charFont):
                charObj.f = charFont;
            break;
//            // set custom chars styles
            case (styleMap.chars != null && styleMap.chars[charObj.chr] != null):
                charObj.f = styleMap.chars[charObj.chr];
            break;
//            // set custom wordspos styles on specific paragraph "wordId_paragraphId"
//            case (styleMap.wordspos != null && styleMap.wordspos[charObj.sc + "_" + charObj.pp] != null):
//                charObj.f = styleMap.wordspos[charObj.sc + "_" + charObj.pp];
//            break;
//            // set custom wordspos styles
//            case (styleMap.wordspos != null && styleMap.wordspos[charObj.wp] != null):
//                charObj.f = styleMap.wordspos[charObj.sc];
//            break;
//            // set custom chars for specific paragraph
//            case (styleMap.paragraphspos != null && styleMap.paragraphspos[charObj.pp] != null):
//                charObj.f = styleMap.paragraphspos[charObj.pp];
//            break;
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
function cEl_set_chr_metrics(cEl_ctx,cEl,cEl_pageText){
    
    try{
        
        var lines = cEl.data.values.temp.lines3;
        var len = lines.length;
        if(!lines)return false;

        for(var i = 0, chrObj, charStyle,charWidth; i< len;i++){
            chrObj = lines[i];
            
            charStyle = cEl_pageText.charsFontsObj[chrObj.f.id];
            //console.log(cEl_ctx.fillStyle);
            if(cEl_ctx.font !== charStyle.fontCanvas)cEl_ctx.font = charStyle.fontCanvas;
            
            if(chrObj.pr){
                charWidth = setGetCharWidth(cEl_ctx,cEl_pageText,chrObj.chr,chrObj.f);
                chrObj.w = charWidth.w;
                chrObj.fs = charStyle.fontSize;
                chrObj.ls = charStyle.letterSpacing;
            }else{
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

function delete_chars(eventholder){
    
    try{
        
        //cdebug(eventholder.keys.chr);
        var cEl = window[eventholder.active.id];
        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
        
        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        var cEl_pageText = window[cEl.pageId].text;

        if(delete_selection(cEl,cEl_layer,cEl_pageText)){
            // do nada
        }else if(eventholder.keys.chr === 8 ){
            if(cEl_pageText.charsSelection.cr.pos > 0){
                
                if(cEl_pageText.charsSelection.cr.left){
                    cEl_pageText.charsSelection.cr.pos--;
                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                }else{
                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                    cEl_pageText.charsSelection.cr.pos--;
                }
                
                cEl_layer.shape.redraw = true;
            }
            
        }else{
            if(cEl_pageText.charsSelection.cr.pos < cEl.data.values.temp.lines3.length-1){
                
                if(cEl_pageText.charsSelection.cr.left){
                    //cEl_pageText.charsSelection.cr.pos++;
                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                }else{
                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos+1,1);
                    cEl_pageText.charsSelection.cr.left = true;
                    cEl_pageText.charsSelection.cr.pos++;
                }
                cEl_layer.shape.redraw = true;
            } else if(cEl_pageText.charsSelection.cr.pos === cEl.data.values.temp.lines3.length-1){
                if(cEl_pageText.charsSelection.cr.left){
                    cEl_pageText.charsSelection.cr.left = false;
                    cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                    cEl_pageText.charsSelection.cr.pos--;
                }
                cEl_layer.shape.redraw = true;
            }
            
        }
        //cdebug(cEl_pageText.charsSelection.cr.pos,false,true);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function delete_selection(cEl,cEl_layer,cEl_pageText){
    
    try{  
        var selLen = cEl_pageText.charsSelection.charspos.length;
        if(selLen > 0){
            var delPos = 0;
            // TODO detect last charObj selection type
            cEl_pageText.charsSelection.cr.left = false;
            
            for(var i = selLen-1;i>-1;i--){
                delPos = cEl_pageText.charsSelection.charspos[i];
                //console.log(delPos + " vs "+cEl.data.values.temp.lines3[delPos].chr + " vs " + cEl.data.values.temp.lines3[delPos].wp);
                cEl.data.values.temp.lines3.splice(delPos,1);
            }
            cEl_pageText.charsSelection.charspos = [];
            cEl_pageText.charsSelection.cr.pos = delPos-1;
            //cEl_pageText.charsSelection.cr.left = true;
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

function edit_chars(eventholder,boolAppend){
    
    try{
        
        var cEl = window[eventholder.active.id];
        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
        
        var cEl_layer = window[cEl.pageId + "_" + cEl.layerId];
        var cEl_pageText = window[cEl.pageId].text;
        
        delete_selection(cEl,cEl_layer,cEl_pageText);
        
        var chrObj ,newCarObj;
        if(boolAppend){
            if(cEl_pageText.charsSelection.cr.pos > -1){

                chrObj = cEl.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos];
                var charCode = eventholder.keys.chr;
                var charVal = eventholder.keys.chrVal;

                // TODO account for special keys
                //cdebug("<" + charVal + ">" + charCode,true,true);

                newCarObj = {
                    "chr":charVal,
                    "f":chrObj.f,
                    "wp":false,
                    "pp":false,
                    "pr":true,
                    "fs":chrObj.fs,
                    "ls":chrObj.ls
                };
                if(charVal!==chrObj.chr){
                    var cEl_canv = window[cEl.pageId + "_" + cEl.layerId + "_canvas"];
                    var cEl_ctx = cEl_canv.getContext('2d');

                    // TODO add custom style for new character

                    cEl_ctx.save();
                    newCarObj.w = setGetCharWidth(cEl_ctx,cEl_pageText,newCarObj.chr,newCarObj.f).w;
                    cEl_ctx.restore();
                }else{
                    newCarObj.w = chrObj.w;
                }
                newCarObj.sc = (charVal === " ");
                newCarObj.nl = (charCode === 13);
                if(newCarObj.nl){
                    newCarObj.chr = "n";
                    newCarObj.pr = false;
                    newCarObj.pp = true;
                };

                cEl.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,0,newCarObj);
                cEl_pageText.charsSelection.cr.pos++;
                
                cEl_layer.shape.redraw = true;
            } 
        }
        //cdebug(cEl_pageText.charsSelection.cr.pos,false,true);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function move_chars(eventholder){
    
    try{
        
        var cEl = window[eventholder.active.id];
        if(!cEl || cEl.data.type!=="text" || !cEl.data.values.editable)return false;
        
        return selection_actions(cEl, null, eventholder.keys.chr,false);
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function setGetFontObj(cEl_ctx,cEl_pageText,fontText,fontObj,boolReturnId){
    
    try{
        var md5Font =  md5(fontText);
        var fontObjRet = cEl_pageText.charsFontsMd5[md5Font];
        var fontObjId = -1;
        if(!fontObjRet){
            // this to reset the font property, maybe use a string replace "normal" with "", should be faster i think
            cEl_ctx.font = fontObj.fontCanvas;
            cEl_ctx.fillStyle = fontObj.color;
            
            fontObj.fontCanvas = cEl_ctx.font;
            fontObj.color = cEl_ctx.fillStyle;
            fontObj.fontSize = parseInt(cEl_ctx.font.match(/\d+px/));
            
            fontObjId = cEl_pageText.charsFontsObj.length;//Object.keys(cEl_pageText.charsFontsMd5).length;
            cEl_pageText.charsFontsObj.push(fontObj);
            fontObjRet = {"id":fontObjId}; //,"val":md5Font
            cEl_pageText.charsFontsMd5[md5Font] = fontObjRet;
            if(boolReturnId)return fontObjRet;
            return fontObj;
        }else{
            if(boolReturnId)return fontObjRet ;//cEl_pageText.charsFonts[md5Font];
            return cEl_pageText.charsFontsObj[fontObjRet.id];
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



function setFont(cEl_ctx,cEl_pageText,fontId){
    
    try{
        var charFont = cEl_pageText.charsFonts[Object.keys(cEl_pageText.charsFonts)[fontId]];
        
        // reset font if needed 
        if(cEl_ctx.font !== charFont.val){
            cEl_ctx.font = charFont.val;
        }
        return true;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function setGetCharWidth(cEl_ctx,cEl_pageText,tmpChar,charFont){
    
    try{
        // get set char width
        var strFontChar =  charFont.id + " " + tmpChar;// CryptoJS.MD5(cEl.data.values.temp.font + " " + cEl_pageText.chars[i]).toString();
        var charWidth = cEl_pageText.charsWidths[strFontChar];
        if(!charWidth){
            if(cEl_ctx.font !== charFont.val){
                // reset font if needed 
                cEl_ctx.font = charFont.val;
            }
            charWidth = {"w":cEl_ctx.measureText(tmpChar).width,"f":charFont.id};
            cEl_pageText.charsWidths[strFontChar] = charWidth;
            charWidth = cEl_pageText.charsWidths[strFontChar];
            //cdebug(tmpChar,false,true,0);
        }
        return cEl_pageText.charsWidths[strFontChar];
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

// TODO split bellow function according to text allignment, will keep it simple
function draw_cEl_lines3(cEl_ctx,cEl,cEl_pageText){
    
    try{
        
        cEl_ctx.save();
        
        
        switch(cEl.data.values.temp.style.textAlign){
            
            case "right":
                
                
            break;
            
            case "left":
                
                
            break;
            
            case "justify":
                //cEl_ctx.textBaseline="bottom";
                //cEl_ctx.textBaseline="alphabetic";
                draw_cEl_lines_justify(cEl_ctx,cEl,cEl_pageText);
                
            break;
            //charX = charX + cEl.data.values.temp.lines2[0].endW - cEl.data.values.temp.textIndent;
            
        }
        cEl_ctx.restore();

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

//function testPointInShape(cEl){
//    
//    
//    //return true;
//    
//    try{
//        
//        drawTextAlongPath(cEl.data.values.temp.lines3,cEl.shape.path,0,0);
//        
//        return true;
//        
////        //cdebug(cEl.parentId + "_" + cEl.id);
////        //cdebug(eventholder.metrics.xy);
////        //cdebug(checkPointInStroke(cEl,cEl.shape,[134,251]));
////        //cdebug(checkPointInPath(cEl,cEl.shape,eventholder.metrics.xy));
////        //cdebug(cEl.data.values.shape.temp);
////        var cEl_ctx = document.getElementById(cEl.pageId + "_" + cEl.layerId + "_canvas").getContext('2d');
////        cEl_setPath(cEl_ctx, cEl, cEl.data.values.shape, false, false);
////        //cdebug(cEl.data.values.shape.temp);
////        //cdebug(cEl.data.values.shape.temp.fp);
////        //cdebug(cEl.data.values.temp.lines3,true, false,0);
////        var x = cEl.data.values.shape.temp.fp[0];
////        var y = cEl.data.values.shape.temp.fp[1];
////        
////        //cEl_ctx.fillText("#",x,y);
////        
////        var startAngle = 45;
////        var boolFlip = true;
////        var angleFactor = Math.PI/180;
////        var hits = 0;
////        var skipFactor = 22;
////        //cdebug(cEl.data.values.temp.lines3, true, false,0);
////        
////        for(var i = 0,startPos,endPos;i<cEl.data.values.temp.lines3.length;i++){
////            
////            
////            var r = cEl.data.values.temp.lines3[i].w;
////            var charHeight = cEl.data.values.temp.lines3[i].fs;
////            var charWidth = cEl.data.values.temp.lines3[i].w;
////            
////            if(r>0){
////                //var delta = r/2;
////                //cdebug(x + " , " + y,true,false,0);
////                //r = 22 +i * 10;
////                var xAct=0;
////                var yAct=0;
////                
////                var increment = parseInt(45/r);
////                increment = increment=0?1:increment;
////                
////                if(!boolFlip){
////                    startPos = startAngle+skipFactor;
////                }else{
////                    startPos = startAngle-skipFactor;
////                }
////                endPos = startPos + 360;
////                
////                //hits = 0;
////                var actAngle;
////                var xPrev = 0;
////                var yPrev = 0;
////                var diff = 0;
////                
////                //draw_pointXY_square(cEl_ctx,[x,y],2,2);
////                
////                for(var angle = startPos, angleRad; angle<endPos;angle+=increment){
////                    
////                    //angle= (angle>360)? angle-360 : angle;
////                    
////                    angleRad = angle * angleFactor;
////                    xAct = parseInt(x + r * Math.cos(angleRad));
////                    yAct = parseInt(y - r * Math.sin(angleRad));
////                    
////                    //if(r!==0)cdebug(r * Math.cos(angle * angleFactor) + " of " + xAct + " , " + xPrev + " vs " + yAct + " , " + yPrev,false,false,0);
////                    //cdebug(Math.abs(xAct-xPrev), false, false,0);
////                    if((Math.abs(xAct-xPrev)>0) || (Math.abs(yAct-yPrev)>0)){
////                        //cdebug("pre " + i + " " + cEl.data.values.temp.lines3[i].chr + " r " + r + " xAct " + xAct + " yAct " + yAct + " xPrev " + xPrev + " yPrev " + yPrev + " startAngle " + startAngle + " angle " + angleRad + " vs " + startAngle + " diff " + (startAngle - angle),false,false,0);
////                        if(checkPointInStroke(cEl,cEl.data.values.shape,[xAct,yAct])){
////                            
////                            //draw_pointXY_square(cEl_ctx,[xAct,yAct],2,2);
////                            //cEl_ctx.fillText(hits,xAct,yAct);
////                            
////                            //cdebug("hits= " + hits + " <" + cEl.data.values.temp.lines3[i].chr + "> r= " + r + " (xPrev " + xPrev + " yPrev " + yPrev +  ") (xAct " + xAct + " yAct " + yAct + ") (x " + x + " y " + y,false,false,0);
////                            //cdebug( "startPos " + startPos + " , endPos " + endPos +" , angle " + angle +" , startAngle " + startAngle +" , angle diff " + (angle - startAngle),false,false,0);
////                            
////                            actAngle = (angle>360)? angle-360 : angle;
////                            //actAngle = angle;
////                            
////                            diff = Math.abs(startAngle-actAngle);
////                            //boolFlip = (startAngle-actAngle)>0;
////                            
////                            if(diff<=(180-skipFactor) || diff>=(180+skipFactor)){
////                                //cdebug("hits= " + hits + " <" + cEl.data.values.temp.lines3[i].chr + "> r= " + r + " (xPrev " + xPrev + " yPrev " + yPrev +  ") (xAct " + xAct + " yAct " + yAct + ") (x " + x + " y " + y,false,false,0);
////                            
////                                //cdebug( "<" + cEl.data.values.temp.lines3[i].chr + "> startPos " + startPos + " , endPos " + endPos +" , actAngle " + actAngle +" , startAngle " + startAngle +" , angle diff " + diff + ", boolFlip " + boolFlip,false,false,0);
////                           
////                                startAngle = actAngle;
////                                
////                                break;
////                            }
////                            
////                            
////                            //if(Math.abs(startAngle - angle)>20){
////                            //cdebug("hit " + i + " " + cEl.data.values.temp.lines3[i].chr + " r " + r + " xAct " + xAct + " yAct " + yAct + " xPrev " + xPrev + " yPrev " + yPrev + " angle " + angle + " vs " + startAngle + " diff " + (angle - actAngle),false,false,0);
////                            //    i=cEl.data.values.temp.lines3.length;
////                            //}
////                            //if(!(170<Math.abs(startAngle-angle)<190)){
////                                
////                            //    break;
////                            //}
////                            //cdebug("hit " + i + " " + cEl.data.values.temp.lines3[i].chr + " r " + r + " xAct " + xAct + " yAct " + yAct + " xPrev " + xPrev + " yPrev " + yPrev + " angle " + angle + " vs " + startAngle + " diff " + (angle - startAngle),false,false,0);
////                            
////
////                            
////                            hits = hits + 1;
////                        }  
////                    }
////                    xPrev = xAct;
////                    yPrev = yAct;
////                }
////                
////                cEl_ctx.fillText(cEl.data.values.temp.lines3[i].chr,x,y);
////                //draw_pointXY_square(cEl_ctx,[x,y],r,-charHeight);
////                //draw_pointXY_square(cEl_ctx,[x,y],r,1);
////                //cEl_ctx.fillText(i,x,y);
////                //if(i>0 && Math.abs(cEl.data.values.shape.temp.fp[0]-x)<delta && Math.abs(cEl.data.values.shape.temp.fp[1]-y)<delta)break;
////                x = xAct;//(x + r * Math.cos(startAngle * angleFactor));
////                y = yAct;//(y - r * Math.sin(startAngle * angleFactor));
////            }
////        }
//        
//        
//    } catch (e) {
//        var err = listError(e);
//        cdebug(err,false,false,3)();
//        return err;
//    }
//}


function set_text_path(cEl){
    
    try{

        switch(cEl.data.values.pattern){
            case "box-fill":
                
                //cdebug(cEl.data.values.vertical,false,false,0);
                var path;
                if(cEl.data.values.vertical){
                    path = new paper.Path.Line({
                        from: [cEl.shape.path.bounds.x + cEl.shape.path.bounds.width/2, cEl.shape.path.bounds.y ],
                        to: [cEl.shape.path.bounds.x + cEl.shape.path.bounds.width/2, cEl.shape.path.bounds.y  + cEl.shape.path.bounds.height]
                    });
                }else{
                    path = new paper.Path.Line({
                        from: [cEl.shape.path.bounds.x, cEl.shape.path.bounds.y + cEl.shape.path.bounds.height/2],
                        to: [cEl.shape.path.bounds.x + cEl.shape.path.bounds.width,cEl.shape.path.bounds.y  + cEl.shape.path.bounds.height/2]
                    });
                }
                
                
                cEl.data.values.temp.path = path;
                
            break;
            case "path":
                
                cEl.data.values.temp.path = cEl.shape.path;
                
            break;    
        }
        
      
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

// TODO split bellow function according to text allignment, will keep it simple
function draw_cEl_lines_justify(cEl_ctx,cEl,cEl_pageText){
    
    try{
        
        set_text_path(cEl);
        drawTextAlongPath(cEl,0,0);
        
        return true;
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

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



function getCharPos(lines,xy){
    try{
        //if(!startPos || startPos === -1)startPos = 0;
        // do a direct search
        var pos=0;
        var boolLeft = false;
        for(var i = 0, chrObj,offsetXY,actY=0,boolYset=false,len = lines.length; i<len;i++){
            pos = i;
            chrObj = lines[i];
            if(chrObj.xy){

                offsetXY = [-chrObj.w/2,0];

                if(chrObj.xy[1]>xy[1]+offsetXY[1]){
                    pos = i;
                    if(!boolYset){
                        boolYset = true;
                        actY = chrObj.xy[1];
                    }
                    if(chrObj.xy[0]>xy[0]+offsetXY[0]){
                        pos = i;
                        boolLeft =true;
                        break;
                    }
                }
                
                if(boolYset){
                    //cdebug(actY > chrObj.xy[1],false,true);
                    if(actY < chrObj.xy[1]){
                        pos = i-1;
                        boolLeft = false;
                        break;
                    }
                }
            }
        }
        //cdebug(lines[pos],true,true);
        //cdebug({"pos":pos,"left":boolLeft},false,true);
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




function drawTextAlongPath(cEl,i,offset){
    
    //var i = 0;
    //var j = 0;
    //var offset=0;
    var lines = cEl.data.values.temp.lines3;
    var path = cEl.data.values.temp.path;
    
    var showCP = false;
    if(showCP){
        //console.log("start " + i);
        path.strokeColor = "rgba(111,111,111,0.3)";
    }

    for(var j=0;j<path.curves.length;j++){
        var curve = path.curves[j];
        var curveLen = curve.length;
        //console.log(curveLen);

        for(var charObj ; i < lines.length; i ++){
            charObj = lines[i];
            //console.log(i + " " + charObj.chr);
            
            if( charObj.w > 0 ){
                
                //if(!charObj.point){
                    
                    if(!cEl.data.values.vertical){
                        
                        offset = offset + charObj.w/2;
                        var location = curve.getLocationAt(offset);
                        if(!location){
                            offset = - curveLen + offset - charObj.w/2;
                            break;
                        }
                        var tan =  curve.getTangentAtTime(location.time);
                        charObj.angle = tan.angle;//toDegrees(Math.atan2(tan.y,tan.x));
                        charObj.point = new paper.Point(location.point.x - charObj.w/2,location.point.y + charObj.fs*0.2);
                        offset = offset + charObj.w/2;
                        
                    }else{
                        
                        offset = offset + charObj.fs *1.2;
                        var location = curve.getLocationAt(offset);
                        if(!location){
                            offset = 0;
                            break;
                        }
                        
                        
                        charObj.angle = 0;//toDegrees(Math.atan2(tan.y,tan.x));
                        charObj.point = new paper.Point(location.point.x - charObj.w/2,location.point.y - charObj.fs*0.2);
                    }
                    
                    
                   
                    
                    if(showCP){
                        var pathPoint = new paper.Path.Circle({
                            center: location.point,
                            radius: 1,
                            fillColor: 'green'
                        });
                    }
                    
                    
                    drawChar(charObj,showCP,cEl.parentId + "_" + cEl.id);
                    
                //    path.lastPos = i;
                    
                //}else{
                //    drawChar(charObj,showCP);
                //    if(boolIsSet){
                //        if(i === path.lastPos)break;
                //    }
                //}
            }
        }
        if(showCP){
            var pathPoint = new paper.Path.Circle({
                center: curve.point1,
                radius: 2,
                fillColor: 'black'
            });
        }
        //break;
    }
    //path.lastPos = startPos;
    if(showCP){
        //console.log("end " + i);
    }
    return i;
}

function drawChar(charObj,showCP,name){
   
    
    
    var textItem1 = new paper.PointText({
        content: charObj.chr,
        point: charObj.point,
        fillColor: 'blue',
        rotation: charObj.angle,
        fontSize:charObj.fs,
        name:name
    });

    if(showCP){
        var pathPoint = new paper.Path.Circle({
            center: charObj.point,
            radius: 1,
            fillColor: 'red'
        });
    }
    
}