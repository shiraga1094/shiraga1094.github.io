let touch=0;

let addtouch=function(){
    touch++;
}
let check=function(){
    if(touch>500){
        alert("Done");
        document.location.href="game.html";
    }
}

document.querySelector("body").addEventListener('click',addtouch);
document.querySelector("body").addEventListener('click',check);