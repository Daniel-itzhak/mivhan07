let todoList = document.querySelector('#todo-list');
let saveBtn = document.querySelector('#todo-save');
let deleBtn = document.querySelector('#todo-delcom');
let deleAllBtn = document.querySelector('#todo-delall');
let inputM = document.querySelector('#todo-item');
let count=0;
let arr=[];
let arrF=[];
class task {
    constructor(inner){
        task.inner=inner;
    }
    toHtml(){
        return `<div class='todo-row num${count}'>
        <span id='post-${count}' class='todo-item'>${task.inner}</span>
        <button class='todo-ok' onclick='finishT(${count})'></button>
        <br></div>`;
    }
}
window.onload=()=>{
    let arrIn = JSON.parse(localStorage.getItem('list'));
    if(arrIn!=null){
       for(let i=0; i<arrIn.length; i++){
           let a= ((arrIn[i].split('>')[2]).split('<'))[0];
           let inH=new task(a);
           todoList.innerHTML += inH.toHtml();
           arr.push(inH.toHtml());
           console.log(count);
           count++;
        }
        localStorage.setItem('list',JSON.stringify(arr));
    }
}
saveBtn.addEventListener('click',()=>{
    let a= new task(inputM.value);
    todoList.innerHTML+=a.toHtml();
    arr.push(a.toHtml());
    localStorage.setItem('list',JSON.stringify(arr));
    inputM.value = "";
    count++;
});

deleAllBtn.addEventListener('click',()=>{
    if(window.confirm('Delete All tasks?')){
        let x=document.querySelectorAll('.todo-row')
        localStorage.clear();
        let len= x.length;
        for(let i=len-1; i>=0 ; i--){
            x[i].remove();
        }
        arr.splice(0,arr.length);
    }
})
function finishT(c){
    let span = document.querySelector(`#post-${c}`);
    span.classList.add('done');
    arrF.push(c);
    let div = document.querySelector(`.todo-row.num${c}`);
    div.innerHTML += `<button class='todo-cx num${c}' onclick='cencelFin(${c})'></button>`;
}
deleBtn.addEventListener('click',()=>{
    if(window.confirm('Delete completed tasks?')){
        let len= arrF.length;
        console.log(arrF);
        for(let i=0; i<len ; i++){
            document.querySelector(`.todo-row.num${arrF[i]}`).remove();
            arr[arrF[i]]=null;
        }
        let tempArr=[];
        for(let k=0; k<arr.length; k++){
            if(arr[k]!=null){
                tempArr.push(arr[k]);
            }
        }
        localStorage.setItem('list',JSON.stringify(tempArr));
        arrF.splice(0,arrF.length);
    }
});
function cencelFin(c){
    let span = document.querySelector(`#post-${c}`);
    span.classList.remove('done');
    document.querySelector(`.todo-cx.num${c}`).remove();
    arrF.splice(arrF.indexOf(c),1);
}