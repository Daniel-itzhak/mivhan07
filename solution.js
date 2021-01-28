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
        return `<span id='post-${count}'>${task.inner}
        </span>
        <button class='finishBtn num${count}' onclick='finishT(${count})'>Finished</button>
        <br class='brSpan num${count}'>`;
    }
}
window.onload=()=>{
    let arrIn = JSON.parse(localStorage.getItem('list'));
    if(arrIn!=null){
       for(let i=0; i<arrIn.length; i++){
           console.log(typeof arrIn[i]); 
           todoList.innerHTML += arrIn[i];
           arr.push(arrIn[i])
        }
    }
}
saveBtn.addEventListener('click',()=>{
    let a= new task(inputM.value);
    console.log(count);
    todoList.innerHTML+=a.toHtml();
    arr.push(a.toHtml());
    localStorage.setItem('list',JSON.stringify(arr));
    count++;
});

deleAllBtn.addEventListener('click',()=>{
    localStorage.clear();
    let x=document.querySelectorAll(`span`);
    let y=document.querySelectorAll(`.finishBtn`);
    let z=document.querySelectorAll(`.brSpan`);
    let len= x.length;
    for(let i=len-1; i>=0 ; i--){
        x[i].remove();
        y[i].remove();
        z[i].remove();
    }
    arr.splice(0,arr.length);
})
function finishT(c){
    let grT= document.querySelector(`#post-${c}`);
    grT.style.backgroundColor = 'green'
    arrF.push(c);
}
deleBtn.addEventListener('click',()=>{
    // let x=document.querySelectorAll(`span`);
    // let y=document.querySelectorAll(`.finishBtn`);
    // let z=document.querySelectorAll(`.brSpan`);
    let len= arrF.length;
    console.log(arrF);
    for(let i=0; i<len ; i++){
        document.querySelector(`#post-${arrF[i]}`).remove();
        document.querySelector(`.finishBtn.num${arrF[i]}`).remove();
        document.querySelector(`.brSpan.num${arrF[i]}`).remove();
        // x[arrF[i]].remove();
        // y[arrF[i]].remove();
        // z[arrF[i]].remove();
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
});