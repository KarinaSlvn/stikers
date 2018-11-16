'use strict'

const parseHTML = (domstring) => {
    const html = new DOMParser().parseFromString(domstring, 'text/html')
    return html.body.firstChild
}

const removeList = (e) => {
    e.target.parentNode.parentNode.remove();
    const addListBtn = document.getElementById('add-list');
    const container = document.getElementById('blanks');
    checkHeight(container,addListBtn);
}
const createDoing = (e,inputValue)=>{
    let el = e.target.parentNode;
    const doing = document.createElement('div');
    doing.classList = 'focused';
    el.appendChild(doing);
    doing.innerHTML = `${inputValue}<div>
                                        <img id="trashcan" src="https://png.icons8.com/metro/26/000000/delete.png">
                                    </div>`;
    e.target.parentNode.previousSibling.previousSibling.disabled = false;
    removeDoing();

}
const removeDoing = ()=>{
    Array.from(document.querySelectorAll('#trashcan')).map(item => item.addEventListener('click',(e)=>{
        e.target.parentNode.parentNode.remove()
    }));
}
const createInput = (e)=>{
    let el = e.target.nextSibling.nextSibling;
    let input = document.createElement('input');
    input.className = 'input';
    input.setAttribute('maxlength','13');
    el.appendChild(input);
    e.target.disabled = true;
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            let inputValue = input.value;
            createDoing(e,inputValue);
            input.remove();
        }

    })
}
const addList = (root) => {
    const stick = `
        <div class="blank draggable">
            <h2 class="header">Sticker<a class="remove">&#10008;</a></h2> 
            <button id="add-doing">+</button>
            <div id="content"></div>
        </div>`;
    root.appendChild(parseHTML(stick));
    Array.from(root.querySelectorAll('.blank .remove')).map(item => item.addEventListener("click", removeList));
    Array.from(root.querySelectorAll('.blank #add-doing')).map(item => item.addEventListener('click',createInput));

}

const checkHeight = (container,addListBtn)=>{
    let heightContainer = parseInt(getComputedStyle(container).height);
    heightContainer >=470 ? addListBtn.disabled = true : addListBtn.disabled = false;
}

window.onload = () => {
    const addListBtn = document.getElementById('add-list');
    const container = document.getElementById('blanks');
    addListBtn.addEventListener("click", () => {
        addList(container)
        checkHeight(container,addListBtn);
    });

};

/*const dragAndDrop = ()=>{
    blank.onmousedown = (e)=>{
        let coords = getCoords(blank);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;
        blank.style.position = 'absolute';
        moveAt(e);
        blank.style.zIndex = 1000;
        function moveAt(e){
            blank.style.left = e.pageX - shiftX + 'px';
            blank.style.top = e.pageY - shiftY + 'px';

        }
        document.onmousemove = (e)=>moveAt(e);
        blank.onmouseup = ()=>{
            document.onmousemove = null;
            blank.onmouseup = null;
        }

    }
    blank.ondragstart = ()=> false;
    function getCoords(elem){
        let box = elem.getBoundingClientRect();
        return{
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}*/

/*const removeEvent = () => {
    [].forEach.call(document.querySelectorAll('.focused'), (e) => e.parentNode.removeChild(e));
}*/

/*
document.onmousedown = function (e) {
    let dragElement = e.target;
    if (!dragElement.classList.contains('draggable')) return;
    let shiftX, shiftY;
    startDrag(e.clientX, e.clientY);
    document.onmousemove = function (e) {
        moveAt(e.clientX, e.clientY);
    };
    dragElement.onmouseup = function () {
        finishDrag();
    };

    function startDrag(clientX, clientY) {
        shiftX = clientX - dragElement.getBoundingClientRect().left;
        shiftY = clientY - dragElement.getBoundingClientRect().top;
        dragElement.style.position = 'fixed';
        document.body.appendChild(dragElement);
        moveAt(clientX, clientY);
    };

    function finishDrag() {
        dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
        dragElement.style.position = 'absolute';
        document.onmousemove = null;
        dragElement.onmouseup = null;
    }

    dragElement.style.zIndex = 1000;

    function moveAt(clientX, clientY) {
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;
        let newBottom = newY + dragElement.offsetHeight;
        if (newBottom > document.documentElement.clientHeight) {
            let docBottom = document.documentElement.getBoundingClientRect().bottom;
            let scrollY = Math.min(docBottom - newBottom, 10);
            if (scrollY < 0) scrollY = 0;
            window.scrollBy(0, scrollY);
            newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
        }
        if (newY < 0) {
            let scrollY = Math.min(-newY, 10);
            if (scrollY < 0) scrollY = 0;
            window.scrollBy(0, -scrollY);
            newY = Math.max(newY, 0);
        }
        if (newX < 0) newX = 0;
        if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
            newX = document.documentElement.clientWidth - dragElement.offsetWidth;
        }
        dragElement.style.left = newX + 'px';
        dragElement.style.top = newY + 'px';
    }

    return false;

}*/
