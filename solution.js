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
        <button onclick='finishT(${count})'>Finished</button>
        </span><br>`;
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
    let len= x.length;
    for(let i=len-1; i>=0 ; i--){
        x[i].remove();
        console.log(i,len);
    }
    arr.splice(0,arr.length);
})
function finishT(c){
    let grT= document.querySelector(`#post-${c}`);
    grT.style.backgroundColor = 'green'
    arrF.push(c);
}
deleBtn.addEventListener('click',()=>{
    let x=document.querySelectorAll(`span`);
    let len= arrF.length;
    for(let i=0; i<len ; i++){
        x[arrF[i]].remove();
    }
});