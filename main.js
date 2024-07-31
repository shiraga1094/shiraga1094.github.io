let touch=0;

let addtouch=function(){
    touch++;
}
let check=function(){
    if(touch>500){
        alert("親，您已點擊此頁500次，給您換個遊戲玩玩能不能放過我?");
        document.location.href="game.html";
    }
}

document.querySelector("body").addEventListener('click',addtouch);
document.querySelector("body").addEventListener('click',check);