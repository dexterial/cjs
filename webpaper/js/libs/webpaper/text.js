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




function draw_cEl_text(cEl_group,strNewText){
    
    try{ 

        var cEl_pageText = paper.data.text;
        //cdebug(cEl_group.reset)();
        
        if(cEl_group.reset.text_css){
            set_cEl_text_css_styleMap(cEl_group,cEl_pageText,true);
            set_cEl_text_css(cEl_group);
        }


        set_cEl_text(cEl_group,cEl_pageText,strNewText);
        
        
        if(cEl_group.reset.text_shape || cEl_group.reset.layout_shape){ //
            set_text_path(cEl_group,true);
        }
        
            
        if(cEl_group.reset.text){
            cEl_set_wordMap3(cEl_group);
        }
        
        
        if(cEl_group.reset.selection){
            
            //cdebug(cEl_group.data.values.temp.selData)();
            
            drawTextSelection(cEl_group,cEl_pageText);
            //drawTextCarret(cEl_group,cEl_pageText);
        }
        
        
        if( cEl_group.reset.text || cEl_group.reset.text_shape || cEl_group.reset.text_draw  || cEl_group.reset.layout_shape){
            
            draw_cEl_lines3(cEl_group,cEl_pageText);

        }
        
        cEl_group.reset.text = false;
        cEl_group.reset.text_shape = false;
        cEl_group.reset.text_css = false;
        cEl_group.reset.selection = false;
        cEl_group.reset.text_draw = false;

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}


function set_cEl_text_css_styleMap(cEl_group,cEl_pageText,boolReturnId){
    try{
        
        //cdebug("here")();
        
        
        if(!cEl_group.data.values.temp.styleMap)cEl_group.data.values.temp.styleMap = {"default":null};
        cEl_group.data.values.temp.styleMap.default = $.extend(false,cEl_group.data.values.temp.styleMap.default,set_cEl_font_css(cEl_group,cEl_pageText,null,boolReturnId));
        
        if(cEl_group.data.values.customStyle){
            // todo pre-compute style map,
            //[{"style":{"font-size":"1em"},"chars":["0","1","3","4"]}];
            
            for(var i = 0, maxLen = cEl_group.data.values.customStyle.length, customStyle;i < maxLen;i++){
                customStyle = cEl_group.data.values.customStyle[i];
                var font = set_cEl_font_css(cEl_group,cEl_pageText,customStyle.style,boolReturnId);
                //if(customStyle.style.color)console.log("after  " + cEl_group.style.calc.color);
                if(customStyle.paragraphspos){
                    if(!cEl_group.data.values.temp.styleMap.paragraphspos)cEl_group.data.values.temp.styleMap.paragraphspos = {};
                    for(var j = 0,maxLen2 = customStyle.paragraphspos.length;j < maxLen2;j++){
                        cEl_group.data.values.temp.styleMap.paragraphspos[customStyle.paragraphspos[j]] = font;
                    }
                }
                if(customStyle.wordspos){
                    if(!cEl_group.data.values.temp.styleMap.wordspos)cEl_group.data.values.temp.styleMap.wordspos = {};
                    for(var j = 0,maxLen2 = customStyle.wordspos.length;j < maxLen2;j++){
                        //console.log(customStyle.wordspos[j]);
                        cEl_group.data.values.temp.styleMap.wordspos[customStyle.wordspos[j]] = font;
                        
                    }
                }
                if(customStyle.charspos){
                    if(!cEl_group.data.values.temp.styleMap.charspos)cEl_group.data.values.temp.styleMap.charspos = {};
                    for(var j = 0,maxLen2 = customStyle.charspos.length;j < maxLen2;j++){
                        cEl_group.data.values.temp.styleMap.charspos[customStyle.charspos[j]] = font;
                    }
                }
                if(customStyle.chars){
                    if(!cEl_group.data.values.temp.styleMap.chars)cEl_group.data.values.temp.styleMap.chars = {};
                    for(var j = 0,maxLen2 = customStyle.chars.length;j < maxLen2;j++){
                        //console.log(customStyle.strings[j]);
                        cEl_group.data.values.temp.styleMap.chars[customStyle.chars[j]] = font;
                        
                    }
                }
            }
            //{"chars":{"0":{"font-size":"1em"},"1":{"font-size":"1em"},"3":{"font-size":"1em"},"4":{"font-size":"1em"}},"lines":{},"default":{"id":2,"val":"italic 12px sans-serif"}}
        }
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}

function set_cEl_font_css(cEl_group,cEl_pageText,addStyle,boolReturnId){
    
    try{
        //console.log("before " + cEl_group.style.calc.color);
        //console.log("apply  " + addStyle.color);
        if(addStyle){
            cEl_group.style.calc2 = $.extend(false,cEl_group.style.calc,addStyle);
        }else{
            cEl_group.style.calc2 = cEl_group.style.calc;
        }
        var styleObj = {};
        //cdebug(window[cEl_group.pageId].shape.scale,false,true,0);
        //cdebug(cEl_group.name + " " + cEl_group.style.calc2["font-size"],false,true,0);
        styleObj.fontSize = size2px(cEl_group.style.calc2["font-size"],false,paper.shape.scale[1]);
        styleObj.fontStyle = cEl_group.style.calc2["font-style"] ? cEl_group.style.calc2["font-style"] : "normal";
        styleObj.fontVariant = cEl_group.style.calc2["font-variant"] ? cEl_group.style.calc2["font-variant"] : "normal";
        styleObj.fontWeight = cEl_group.style.calc2["font-weight"] ? cEl_group.style.calc2["font-weight"] : "normal";
        styleObj.fontFamily = cEl_group.style.calc2["font-family"] ? cEl_group.style.calc2["font-family"] : "Arial";
        
//        styleObj.fontCanvas = styleObj.fontStyle + " " + styleObj.fontVariant + " ";
//        styleObj.fontCanvas += styleObj.fontWeight + " " + styleObj.fontSize + "px ";
//        styleObj.fontCanvas += styleObj.fontFamily;
        
        styleObj.letterSpacing = cEl_group.style.calc2["letter-spacing"] ? size2px(cEl_group.style.calc2["letter-spacing"],false) : 0;
        styleObj.color = cEl_group.style.calc2["color"] ? cEl_group.style.calc2["color"] : "rgba(0,0,0,1)";
        styleObj.wordSpacing = cEl_group.style.calc2["word-spacing"] ? size2px(cEl_group.style.calc2["word-spacing"],false) : 0;
        
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


function set_cEl_text_css(cEl_group){
    
    try{
        //cdebug(cEl)();

        if(!cEl_group.data.values.temp.style)cEl_group.data.values.temp.style = {};
        //cdebug(cEl_group.style.calc["font-size"])();
        
        cEl_group.data.values.temp.style.textAlign = cEl_group.style.calc["text-align"] ? cEl_group.style.calc["text-align"] : "justify"; 
        cEl_group.data.values.temp.style.textIndent = cEl_group.style.calc["text-indent"] ? size2px(cEl_group.style.calc["text-indent"]) : 0;
        cEl_group.data.values.temp.style.textShadow = cEl_group.style.calc["text-shadow"] ? getShadowObj(cEl_group.style.calc["text-shadow"]) : null;
        
        cEl_group.data.values.temp.style.paddingBottom = cEl_group.style.calc["padding-bottom"] ? size2px(cEl_group.style.calc["padding-bottom"],false) : 0;
        cEl_group.data.values.temp.style.paddingRight = cEl_group.style.calc["padding-right"] ? size2px(cEl_group.style.calc["padding-right"],false) : 0;
        cEl_group.data.values.temp.style.paddingLeft = cEl_group.style.calc["padding-left"] ? size2px(cEl_group.style.calc["padding-left"],false) : 0;
        cEl_group.data.values.temp.style.paddingTop = cEl_group.style.calc["padding-top"] ? size2px(cEl_group.style.calc["padding-top"],false) : 0;
        
        cEl_group.data.values.temp.style.fontSize = size2px(cEl_group.style.calc["font-size"]);
        cEl_group.data.values.temp.style.lineHeight = cEl_group.style.calc["line-height"] ? size2px(cEl_group.style.calc["line-height"]) : cEl_group.data.values.temp.style.fontSize/5;
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }
}
function set_cEl_text(cEl_group, cEl_pageText, strNewText){
    
    try{
        //console.log(strNewText + " vs " + cEl_group.data.values.temp.valueOld);
                var strValAct = cEl_group.data.values.text;
                if(!strValAct){
                    
                    //if(cEl_group.name==="logo")cdebug(cEl_group.data.values.default)();
                    
                    strValAct = cEl_pageText.defaults[cEl_group.data.values.default];
                    if(Array.isArray(strValAct)){
                        strValAct = strValAct.join("\\n");
                        strValAct = strValAct.replace(/\r\n/g,'\n');
                    }
                    cEl_group.data.values.text =  strValAct;
                    //cdebug(strValAct)();
                }
                
                
                
                // if not set then set the old value to same value and continue to calc
                if(cEl_group.data.values.temp && !cEl_group.data.values.temp.valueOld){
                    cEl_group.data.values.temp.valueOld = strValAct;
                    cEl_group.reset.text = true;
                    return true;
                }else if(cEl_group.data.values.temp){
                    //console.log(strNewText + " vs " + cEl_group.data.values.temp.valueOld);
                    // if is set then reset only if is different from old value
                    if(typeof strNewText !== "undefined"){
                        // if is same value go to end since it was precalculated
                        if(strNewText !== strValAct){
                            
                           //console.log(strNewText + " vs " + cEl_group.data.values.temp.valueOld);
                            // if new value in town then replace value and continue to calc
                            cEl_group.data.values.text = strNewText;
                            cEl_group.data.values.temp.valueOld = strValAct;
                            cEl_group.reset.text = true;
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
function cEl_set_wordMap3(cEl_group){
    
    try{
        
        cEl_group.data.values.temp.lines3 = [];
        cEl_group.data.values.temp.chars = {};
        
        var text = cEl_group.data.values.text;
        
        if(!text)return false;
//        cdebug(text)();
        
        var charObj = {"chr":"n","f":null,"wp":0,"pp":0,"nl":true,"sc":false,"pr":false};
//        pushChar(charObj,cEl_group,false);
        
        /// change here to detect words and create text Map of words by unique chars indexes
        for(var i=0, len = text.length;i < len;i++){
            charObj.chr = text[i];
            charObj.pos = i;
            if(i < len-1){
                set_charObj_line(charObj,cEl_group,text[i+1]);
            }else{
                set_charObj_line(charObj,cEl_group,false);
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



function set_charObj_line(charObj,cEl_group,charNext){    
    try{
        
        // case is nonprintable character
        if(charNext && charObj.chr === "\\"){
            
            switch(charNext){
                case "n":
                case "r":
                    charObj.pr = false;
                    charObj.pos++ ;
                    
                    charObj.sc = false;
                    charObj.pp++;
                    charObj.nl = true;
                    charObj.pc = true;
                    charObj.wp = 0;
                    
                    charObj.chr = charNext;

                break;
//                case "t":
//                    // TODO add tabulation logic
//                break;
                default:
                    charObj.pr = true;
                    pushChar(charObj,cEl_group,true);
                break;
            }
        // case is space
        }else if(charObj.chr === " "){
            charObj.pr = true;
            charObj.sc = true;
            //charObj.pp = false;
            charObj.nl = false;
            
            charObj.pc = false;
            pushChar(charObj,cEl_group,true);
            charObj.sc = false;
            charObj.wp++;
        // word character
        }else if(/[a-zA-Z_0-9]/.test(charObj.chr)){
        
            charObj.pr = true;
            //charObj.pp = false;
            charObj.pc = false;
            pushChar(charObj,cEl_group,true);
            
            //charObj.wp = false;
            charObj.sc = false;
            charObj.nl = false;
            

        // break for all other characters
        }else{
            charObj.pr = true;
            //charObj.wp++;
            //charObj.pp = false;
            charObj.pc = true;
            pushChar(charObj,cEl_group,true);
            
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

function pushChar(charObj,cEl_group,boolSetStyle){
    try{
        
        var lines = cEl_group.data.values.temp.lines3;
        var styleMap = cEl_group.data.values.temp.styleMap;
        
        if(boolSetStyle){
            set_charObj_style(styleMap,charObj);
        }else{
            charObj.f = styleMap.default;
        }
        
        //cdebug(charObj.f)();
        var cEl_pageText = paper.data.text;
        var charStyle = cEl_pageText.charsFontsObj[charObj.f.id];
        
        if(charObj.pr){
            var charWidth = setGetCharWidth(cEl_pageText,charObj.chr,charObj.f.id,charStyle);
            
            charObj.fc = charWidth.fc;
            //charObj.symbol = charWidth.symbol;
            charObj.w = charWidth.w;
            charObj.fs = charStyle.fontSize;
            charObj.ls = charStyle.letterSpacing;
        }else{
            charObj.fc = null;
            charObj.symbol = null;
            charObj.w = 0;
            charObj.fs = charStyle.fontSize;
            charObj.ls = 0;
        }
        
        lines.push($.extend(false,{},charObj));

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function set_charObj_style(styleMap,charObj){
    
    try{
        
        var charFont = styleMap.charspos != null && styleMap.charspos[charObj.pos] ? styleMap.charspos[charObj.pos]:null;
        
        //cdebug(styleMap.charsSelection)();
        
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
        
        //cdebug(charFont)();
        
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

function delete_chars(eventholder){
    
    try{
        
        //cdebug(eventholder.keys.chr);
        var cEl_group = eventholder.active.oldObj;
        if(!cEl_group || cEl_group.data.type!=="text" || !cEl_group.data.values.editable)return false;
        
        var cEl_pageText = paper.data.text;
        
        if(delete_selection(cEl_group,cEl_pageText)){
            // do nada
            //cdebug("delete selection " + eventholder.keys.chr)();
            
        }else if(eventholder.keys.key === "Backspace" ){
            //cdebug(cEl_pageText.charsSelection.cr)();
                
            if(cEl_pageText.charsSelection.cr.pos > 0){
                
                if(cEl_pageText.charsSelection.cr.left){
                    cEl_pageText.charsSelection.cr.pos--;
                    cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos].textItem.remove();
                    cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                }else{
                    cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos].textItem.remove();
                    cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                    cEl_pageText.charsSelection.cr.pos--;
                }
                
                cEl_group.reset.text_draw = true;
                cEl_group.reset.selection = true;
            }
            
        }else if(eventholder.keys.key === "Delete" ){
            
            //cdebug("delete current " + eventholder.keys.chr)();
            
            if(cEl_pageText.charsSelection.cr.pos < cEl_group.data.values.temp.lines3.length-1){
                
                if(cEl_pageText.charsSelection.cr.left){
                    //cEl_pageText.charsSelection.cr.pos++;
                    cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos].textItem.remove();
                    cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                }else{
                    cEl_pageText.charsSelection.cr.pos++;
                    cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos].textItem.remove();
                    cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                    cEl_pageText.charsSelection.cr.left = true;
                    
                }
                cEl_group.reset.text_draw = true;
                cEl_group.reset.selection = true;
            } else if(cEl_pageText.charsSelection.cr.pos === cEl_group.data.values.temp.lines3.length-1){
                if(cEl_pageText.charsSelection.cr.left){
                    cEl_pageText.charsSelection.cr.left = false;
                    cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos].textItem.remove();
                    cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos,1);
                    cEl_pageText.charsSelection.cr.pos--;
                }
                cEl_group.reset.text_draw = true;
                cEl_group.reset.selection = true;
            }
            
        }
        //cdebug(cEl_pageText.charsSelection.cr.pos,false,true);

    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}

function delete_selection(cEl_group,cEl_pageText){
    
    try{  
        var selLen = cEl_pageText.charsSelection.charspos.length;
        if(selLen > 0){
            var delPos = 0;
            // TODO detect last charObj selection type
            cEl_pageText.charsSelection.cr.left = false;
            
            for(var i = selLen-1;i>-1;i--){
                delPos = cEl_pageText.charsSelection.charspos[i];
                //console.log(delPos + " vs "+cEl_group.data.values.temp.lines3[delPos].chr + " vs " + cEl_group.data.values.temp.lines3[delPos].wp);
                cEl_group.data.values.temp.lines3[delPos].textItem.remove();
                cEl_group.data.values.temp.lines3.splice(delPos,1);
            }
            cEl_pageText.charsSelection.charspos = [];
            cEl_pageText.charsSelection.cr.pos = delPos-1;
            
            cEl_group.reset.text_draw = true;
            cEl_group.reset.selection = true;
            
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
//
function edit_chars(eventholder,boolAppend){
    
    try{
        
        //cdebug(eventholder.active.oldObj.name)();
        
        var cEl_group = eventholder.active.oldObj;
        if(!cEl_group || cEl_group.data.type!=="text" || !cEl_group.data.values.editable)return false;
       
        var cEl_pageText = paper.data.text;
        delete_selection(cEl_group,cEl_pageText);
        
        var charObj ,newCarObj;
        if(boolAppend){
            if(cEl_pageText.charsSelection.cr.pos > -1){

                charObj = cEl_group.data.values.temp.lines3[cEl_pageText.charsSelection.cr.pos];
                var charCode = eventholder.keys.chr;
                var charVal = eventholder.keys.chrVal;

                // TODO account for special keys
                //cdebug("< " + charVal + " >" + charCode,true,true)();
                
                newCarObj = {
                    "chr":charVal,
                    "f":charObj.f,
                    "wp":charObj.wp,
                    "pp":charObj.pp,
                    "pr":true
                };
                
                var charStyle = cEl_pageText.charsFontsObj[newCarObj.f.id];
                var charWidth = setGetCharWidth(cEl_pageText,newCarObj.chr,newCarObj.f.id,charStyle);
                newCarObj.fc = charWidth.fc;
                newCarObj.w = charWidth.w;
                newCarObj.fs = charStyle.fontSize;
                newCarObj.ls = charStyle.letterSpacing;
                
                
                cEl_group.data.values.temp.lines3.splice(cEl_pageText.charsSelection.cr.pos+1,0,newCarObj);
                
                //cEl_pageText.charsSelection.cr.pos++;
                cEl_group.reset.selection = true;
                cEl_group.reset.text_draw = true;
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
        
        var cEl_group = eventholder.active.oldObj;
        
        if(!cEl_group || cEl_group.data.type!=="text" || !cEl_group.data.values.editable)return false;
        
        return selection_actions(cEl_group, eventholder, eventholder.keys.key,false);
        
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,false,3)();
        return err;
    }    
}


function setGetFontObj(cEl_pageText,styleObj,boolReturnId){
    
    try{
        
        var fontText =  styleObj.fontSize + styleObj.fontStyle + styleObj.fontWeight + styleObj.fontFamily + styleObj.color;
        
        var md5Font =  md5(fontText);
        
        var fontObjRet = cEl_pageText.charsFontsMd5[md5Font];
        var fontObjId = -1;
        if(!fontObjRet){
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

function setGetCharWidth(cEl_pageText,chrVal,charFontId,charStyle){
    
    try{
        // get set char width
        var strFontChar =  charFontId + " " + chrVal;// CryptoJS.MD5(cEl_group.data.values.temp.font + " " + cEl_pageText.chars[i]).toString();
        var charWidth = cEl_pageText.charsWidths[strFontChar];
        if(!charWidth){
            
            //cdebug(charStyle)();
            
            var charPoint = new paper.PointText({
                content: chrVal
                ,fontSize: charStyle.fontSize
                ,fontFamily: charStyle.fontFamily
                ,fontWeight: charStyle.fontWeight
                ,fontStyle: charStyle.fontStyle
                ,fillColor: charStyle.color
//                ,strokeColor: charStyle.color
            });

            // Create a symbol definition from the path:
            var charSymbol = new paper.SymbolDefinition(charPoint);
            
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
function draw_cEl_lines3(cEl_group,cEl_pageText){
    
    try{
        
        var offset = cEl_group.data.values.temp.style.textIndent;
        
        //cdebug(cEl_group.data.values.temp.lines3)();
        
//        cEl_group.applyMatrix = true;
        
        drawTextAlongPath(cEl_group,0,offset,cEl_pageText);
        
        
        
       
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function set_text_path(cEl_group,boolShowTextLines){
    
    try{
        
        switch(cEl_group.data.values.pattern){
            case "box-fill":
                
                //cdebug(cEl_group.bounds)();
                
                cEl_group.children["TextPath"].removeChildren();
                cEl_group.children["TextPath"].pivot = cEl_group.pivot;
                cEl_group.children["TextPath"].position = cEl_group.position;
                
                var bounds = cEl_group.children["ShapePath"].bounds;
                
                var x,y,w,h;
                
                //cdebug(cEl_group.data.values.vertical,false,false,0)();
                if(cEl_group.data.values.vertical){
                    
                    x = bounds.x + cEl_group.data.values.temp.style.fontSize*1/2 + cEl_group.data.values.temp.style.lineHeight + cEl_group.data.values.temp.style.paddingLeft;
                    y = bounds.y + cEl_group.data.values.temp.style.paddingTop;
                    w = bounds.x + bounds.width - cEl_group.data.values.temp.style.paddingLeft - cEl_group.data.values.temp.style.paddingRight;
                    h = bounds.y + bounds.height - cEl_group.data.values.temp.style.paddingTop - cEl_group.data.values.temp.style.paddingBottom;
                    
                    //cEl_group.children["TextPath"].selected = true;
                    //cdebug(cEl_group.children["ShapePath"].bounds)();
                    //cdebug(cEl_group.children["TextPath"].bounds)();
                    
                    //size2px(cEl_group.style.calc["font-size"])
                    cEl_group.children["TextPath"].addChild(new paper.Path({
                        segments:[[x, y]]
                    }));
                    
                    while  (x<w){
                        cEl_group.children["TextPath"].addChild(new paper.Path.Line({
                            from:[x, y],
                            to:[x, h]
                        }));
                        x = x + cEl_group.data.values.temp.style.fontSize + cEl_group.data.values.temp.style.lineHeight;
                    }
                    //cdebug(cEl_group.name,true)();
                    //cdebug(cEl_group.shape.flipXY)();
                    //cEl_group.children["TextPath"].clockwise =  !(cEl_group.shape.flipXY[1] || cEl_group.shape.flipXY[0]);
 
                }else{
                    
                    //cdebug(cEl_group.data.values.temp.style.fontSize)();
                    
                    //{"textAlign":"justify","textIndent":0,"textShadow":null,"lineBottom":94.46400000000001,"lineRight":232.494,"lineLeft":3,"lineTop":3,"lineHeight":10}
                    
                    var x = bounds.x + cEl_group.data.values.temp.style.paddingLeft;
                    var y = bounds.y + cEl_group.data.values.temp.style.fontSize*1/2 + cEl_group.data.values.temp.style.lineHeight + cEl_group.data.values.temp.style.paddingTop;
                    var w = bounds.x + bounds.width - cEl_group.data.values.temp.style.paddingLeft - cEl_group.data.values.temp.style.paddingRight;
                    var h = bounds.y + bounds.height - cEl_group.data.values.temp.style.paddingTop - cEl_group.data.values.temp.style.paddingBottom;
                    
                    
                    cEl_group.children["TextPath"].addChild(new paper.Path({
                        segments:[[x, y]]
                    }));
                    while(y<h){
                        cEl_group.children["TextPath"].addChild(new paper.Path.Line({
                            from:[x , y],
                            to:[w , y]
                        }));
                        y = y + cEl_group.data.values.temp.style.fontSize + cEl_group.data.values.temp.style.lineHeight;
                    }
                    
                    //cEl_group.children["TextPath"].clockwise =  true;
                    
                }
            break;
            case "path":
                
                cEl_group.children["TextPath"].addChild(cEl_group.children["ShapePath"].clone());
                
            break;    
        }
//        if(boolShowTextLines){
//            cEl_group.children["TextPath"].selected = true;
//        }
//        cdebug(cEl_group.children["ShapePath"].children[0].length)();
//        cdebug(cEl_group.children["TextPath"].children[0].length)();
//        cdebug(cEl_group.children["TextSelection"].children.length)();
        
        return true;
      
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
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
        
        for(var k = startPos, retIndex = 0,retIndex2= 0,charObj,chrWidth,chrVal,boolVeryLongWord, boolWordChange;k < endPos;k++){

            charObj = line[k];
            intWordPos = charObj.wp;
            chrWidth = charObj.w;
            chrVal = charObj.chr;
            linePars.fs = Math.max(charObj.fs,linePars.fs);
            
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
                    if(charObj.sc){
                        intWordWidth+= linePars.swd + linePars.ls;
                    }else{
                        intWordWidth+= chrWidth + linePars.ls;
                    }
                }
                
                
            }else{
                // reset return index after new word found
                if(charObj.sc){ //intWordPos !== intWordPosPrev
                    
                    boolWordChange = true;
                    retIndex = k;
                    intWordWidth = 0;
                    intSpaceCount++;
                    intwordX+= linePars.swd + charObj.ls;
                    linePars.eos = linePars.maxX - intwordX;
                }else{
                    intwordX+= chrWidth + charObj.ls;
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

var carret;



function drawTextAlongPath(cEl_group,index,offset,cEl_pageText){
    
    try{
        var i = index;
        var lines = cEl_group.data.values.temp.lines3;
        var text_path =  cEl_group.children["TextPath"];
        
        // TODO do something about this part
        switch(cEl_group.data.values.temp.style.textAlign){

            case "right":

            break;

            case "left":

            break;

            case "justify":

            break;

        }

        var charsCount = lines.length;
        var metricsObj = {
          curveLen:0,
          vertical:cEl_group.data.values.vertical,
          offset:offset,
          indent:cEl_group.data.values.temp.style.textIndent
        };
        
        var j = 0;
        var curve = text_path.curves[j];
        metricsObj.curveLen = curve.length;

        for(var charObj; i < charsCount; i++){
            charObj = lines[i];

            if(!charObj.nl){

                if(setCharPos(charObj,curve,metricsObj)){
                    drawChar(charObj,cEl_group.children["TextSymbols"],cEl_pageText);
                }else{
                    
                    if(!text_path.curves[j]){
                        break;
                    }
                    curve = text_path.curves[j];
                    metricsObj.curveLen = curve.length;
                    i--;
                    j++;
                }

            }else{

                if(!text_path.curves[j]){
                    break;
                }
                metricsObj.offset = metricsObj.indent;
                curve = text_path.curves[j];
                metricsObj.curveLen = curve.length;
                
                if(setCharPos(charObj,curve,metricsObj)){
                    drawChar(charObj,cEl_group.children["TextSymbols"],cEl_pageText);
                }
                j++;
            }
        }
       
        //cEl_group.children["TextSymbols"] = cEl_group.children["TextSymbols"].rasterize();
        
        cEl_group.data.values.temp.eol = i;    
        return i;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function drawTextSelection(cEl_group,cEl_pageText){
    
    try{
        

        if(!cEl_group.data.values.temp.selData)return true;
        
        //if(!cEl_group.data.values.temp.selData.charspos.length > 0)return true;
        //cdebug(cEl_group.name)();
        paper.rerender = true;
        
        var charspos = cEl_group.data.values.temp.selData.charspos;
        var symbols = cEl_group.children["TextSymbols"].children;
        var charsLen = symbols.length;
        
        
        if(charspos[0]===undefined){
            for(var i = 0; i < charsLen; i++){
                symbols[i].cselect = false;
            }
        }else{
            var boolNoReset = !cEl_group.data.values.temp.selData.reset;
            for(var i = 0; i < charsLen; i++){
                symbols[i].cselect = (charspos.indexOf(i)>-1 && boolNoReset);
            }
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function drawTextCarret(cEl_group,cEl_pageText){
    
    try{
        var boolHasSelection = (cEl_pageText.charsSelection.name === (cEl_group.parentName + "_" + cEl_group.name));
        if(!boolHasSelection) return false;
        
        var charObj;
        var offset;
        if(cEl_group.data.values.editable){
            charObj = cEl_group.children["TextSymbols"].children[cEl_pageText.charsSelection.cr.pos];
//            cdebug(charObj)();
            if(charObj){
                if(carret){carret.remove()};
                
                //charObj.selected = true;
//                cdebug()();
                
                if(cEl_pageText.charsSelection.cr.left){
                    offset = -charObj.w/2;
                }else{
                    offset = +charObj.w/2;
                }
//                if(!carret){
                    carret = cEl_group.children["TextSelection"].addChild(new paper.Path.Line({
                        from: [charObj.position.x + offset, charObj.position.y-charObj.fs/2],
                        to: [charObj.position.x + offset, charObj.position.y+charObj.fs/2],
                        strokeColor : cEl_pageText.charsSelection.style["color"],
                        data:cEl_pageText.charsSelection.style,
                        name:"carret"
                    }));
//                }else{
//                    
//                }
                
                
                carret.rotate(charObj.rotation, charObj.position);
                
                //cdebug(window["carret"].name)();
                    //cEl_pageText.charsSelection.style["color"]
                paper.project.view.onFrame = function(event) {
                    if(carret){

//                                    if(carret.strokeColor.red<1){
//                                        carret.strokeColor.red = 1;
//                                    }else{
//                                        carret.strokeColor.red+=0.05;
//                                    }
//                                    if(carret.strokeColor.green<1){
//                                        carret.strokeColor.green = 0;
//                                    }else{
//                                        carret.strokeColor.green+=0.05;
//                                    }
//                                    if(carret.strokeColor.blue<1){
//                                        carret.strokeColor.blue = 0;
//                                    }else{
//                                        carret.strokeColor.blue+=0.05;
//                                    }

//                                    if(carret.strokeColor.saturation<0){
//                                        carret.strokeColor.saturation = 1 ;// = cEl_pageText.charsSelection.style["color"];
//                                    }else{
//                                        carret.strokeColor.saturation-= 0.025;
//                                    }
                        if(carret.strokeColor.lightness>1){
                            carret.strokeColor = carret.data.color;
                        }else{
                            carret.strokeColor.lightness+= 0.015;
                        }

                        //cdebug(carret.strokeColor.saturation)();

                        // On each frame, rotate the path by 3 degrees:
                        //carret.strokeColor = "red";
                        //cEl_pageText.charsSelection.style["color"] = "red";
                        //cdebug(carret.strokeColor)();
                        //carret.segments[0].point = [carret.segments[0].point.x-1,carret.segments[0].point.y-1];
                        //carret.strokeColor.hue+= 1;
                    }
                }; 
            //paper.project.view.autoUpdate();

            }
        }    
            
            
            
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function setCharPos(charObj,curve,metricsObj){
    try{
        
        if(!metricsObj.vertical){
            
            metricsObj.offset+= charObj.w/2;
            var location = curve.getLocationAt(metricsObj.offset);
            if(!location){
                //cdebug("off")();
                metricsObj.offset = metricsObj.offset - charObj.w/2 - metricsObj.curveLen;
                return false;
            }else{
                //cdebug("on")();
                var tan =  curve.getTangentAtTime(location.time);
                //cdebug(charFont)();
                //cdebug("angle " + tan.angle + ", point " + location.point + ", spacing " + charFont.letterSpacing)();

                charObj.angle = tan.angle;//toDegrees(Math.atan2(tan.y,tan.x));
                charObj.point = location.point;//new paper.Point(location.point.x - charObj.w/2,location.point.y + charObj.fs*0.2);
                metricsObj.offset = metricsObj.offset + charObj.w/2 + charObj.ls;
                //cdebug("char end")();
            }
        }else{

            metricsObj.offset += charObj.fs + charObj.ls;//*1.2
            var location = curve.getLocationAt(metricsObj.offset);
            if(!location){
                metricsObj.offset = metricsObj.indent;
                return false;
            }else{
                //charObj.angle = 0;//toDegrees(Math.atan2(tan.y,tan.x));
                charObj.point = location.point; //new paper.Point(location.point.x - charObj.w/2,location.point.y - charObj.fs*0.2);
            }
        }
        
        return true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}

function drawSelection(charObj,cEl_group,cEl_pageText,boolSelected,i){
    try{
        
        if(boolSelected){
            
        }
    
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}


function drawChar(charObj,textContainer,cEl_pageText){
   
    try{
        
        //var charSymbol = charObj.symbol;
        //var charSymbol
//        charObj.textItem = new paper.SymbolItem(charObj.symbol);
//        
//        charObj.textItem.position = charObj.point;
//        charObj.textItem.rotation = charObj.angle;
//        charObj.textItem.name = name;
        
        
        
//        charObj.textItem = charObj.symbol.place(charObj.point);
//        var charDefinition = charObj.symbol;
        
//        charObj.textItem =  textContainer.addChild(new paper.TextItem());
//        charObj.textItem.content = charObj.chr;
//        charObj.textItem.position = charObj.point;
//        charObj.textItem.stroke();
        
        
        //charObj.textItem = charObj.symbol.place(charObj.point);
        
        //cdebug(charObj.textItem)();
        
        var symbol;
        
        if(!charObj.textItem){
            
            //cdebug(charObj.fc)();
            var symbol = cEl_pageText.charsWidths[charObj.fc].symbol;
            
            charObj.textItem = textContainer.addChild(symbol.place(charObj.point));
            
            //cdebug(charObj.textItem.id + " of " + charObj.textItem.definition.item.id + " " + charObj.chr)();     
        }
        else{
            //cdebug(charObj.textItem.id + " of " + charObj.textItem.definition.item.id + " " + charObj.chr)();     
            //charObj.textItem = textContainer.children[charObj.textItem.index].replaceWith(charObj.symbol.place(charObj.point));
            //charObj.textItem = charObj.textItem.replaceWith(charObj.symbol.place(charObj.point));
        }
        
        charObj.textItem.position = charObj.point;
        charObj.textItem.rotation = charObj.angle;
        charObj.textItem.w = charObj.w;
        charObj.textItem.fs = charObj.fs;
        charObj.textItem.nl = charObj.nl;
        charObj.textItem.pc = charObj.pc;
        charObj.textItem.pp = charObj.pp;
        charObj.textItem.wp = charObj.wp;
        //charObj.textItem.selected = true;
        
    } catch (e) {
        var err = listError(e);
        cdebug(err,false,true,0);
        return err;
    }
}