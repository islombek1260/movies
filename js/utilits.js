//-------- CUSTOM DOM SELECTOR -------------

const $=function(selector){return document.querySelector(selector)}
const $$=function(selector){return document.querySelector(selector)}

//-------  DYNAMIC CREATY_ELEMENT-----------

const createElement =function(tagName, className, content){
    const newElement = document.createElement(tagName);
    if(className){
        newElement.setAttribute('class', className);
    }
    if(content){
        newElement.innerHTML = content;
    }
    return newElement
}