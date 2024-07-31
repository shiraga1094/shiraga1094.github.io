class Node {
    constructor(val, priority) {
      this.val = val;
      this.priority = priority;
    }
  }
class PriorityQueue {
    constructor() {
      this.values = [];
    }

    enqueue(val, priority) {
      this.values.push(new Node(val, priority));
      this.values.length > 1 && this.bubbleUp();
    }
  
    bubbleUp() {
      let idx = this.values.length - 1;
      let parentIdx = Math.floor((idx - 1) / 2);
      const { values } = this;
      while (values[idx].priority < values[parentIdx]?.priority) {
        [values[idx], values[parentIdx]] = [values[parentIdx], values[idx]];
        idx = parentIdx;
        parentIdx = Math.floor((idx - 1) / 2);
      }
    }
  
    dequeue() {
      const lastIdx = this.values.length - 1;
      [this.values[0], this.values[lastIdx]] = [
        this.values[lastIdx],
        this.values[0],
      ];
      const extractedNode = this.values.pop();
      this.values.length > 1 && this.sinkDown();
      return extractedNode;
    }

    sinkDown() {
      let idx = 0;
      let leftIdx = 2 * idx + 1;
      let rightIdx = 2 * idx + 2;
      const { values } = this;
      while (
        values[idx].priority > values[leftIdx]?.priority ||
        values[idx].priority > values[rightIdx]?.priority
      ) {
        if (values[rightIdx]?.priority < values[leftIdx]?.priority) {
          [values[idx], values[rightIdx]] = [values[rightIdx], values[idx]];
          idx = rightIdx;
        } else {
          [values[idx], values[leftIdx]] = [values[leftIdx], values[idx]];
          idx = leftIdx;
        }
        leftIdx = 2 * idx + 1;
        rightIdx = 2 * idx + 2;
      }
    }
}
let isGameon=0;
var Allpanpan=[23,4,0,5,5,56,90,76];
let Cost=0;
let clock;
let str;
let Time= new Date();
let Start_Time, End_Time, Total_time=200000;
let RestAmount=8;
let PerfectAnswer=582;
let tmp_pos=-1;
let GameOverMessage;
let lock=-1;
let pQ= new PriorityQueue();


let rand=function(){
    return Math.floor(Math.random()*1000);
}
let Update_Allpanpan=function(){
    for(let i=0; i<8; i++){
        Allpanpan[i]=rand();
    }
}
let Update_PerfectAnswer=function(){
    let L= new Node(), R= new Node();
    let sum=0;
    for(let i=0; i<8; i++){
        pQ.enqueue(Allpanpan[i], Allpanpan[i]);
    }
    for(let i=0; i<7; i++){
        L=pQ.dequeue(); R=pQ.dequeue();
        sum+=L.val+R.val;
        pQ.enqueue(L.val+R.val, (L.val+R.val));
    }
    PerfectAnswer=sum;
}
let Update_Time=function(){;
    Time= new Date();
}
let Start_Game=function(){
    Update_Time();
    Update_Allpanpan();
    Update_PerfectAnswer();
    Start_Time=Time.getTime();
    isGameon=1;
    clock=setInterval(Game_Process, 50);

    var Button=document.getElementById("Button");
    Button.style.display="none";
    var Game=document.getElementById("Game");
    Game.style.visibility="visible";
}
let isGameOver=function(){
    Update_Time();
    End_Time=Time.getTime();
    if(RestAmount<=1 || End_Time-Start_Time>Total_time){
        return 1;
    }
    return 0;
}
let Combine=function(pos1, pos2){
    Cost+=Allpanpan[pos1]+Allpanpan[pos2];
    Allpanpan[pos2]+=Allpanpan[pos1];
    Allpanpan[pos1]=-1;
    RestAmount--;
}
let Choose=function(pos){
    if(tmp_pos!=-1 && Allpanpan[tmp_pos]==-1){
        tmp_pos=-1;
        return;
    }
    if(Allpanpan[pos]==-1 || tmp_pos==pos){
        return;
    }
    lock=pos;
    if(tmp_pos==-1 && pos>=0 && pos<8){
        tmp_pos=pos;
        return;
    }
    Combine(tmp_pos, pos);
    tmp_pos=-1;
    pos=-1;
}
let Draw=function(){
    var panblock1=document.getElementById("panblock1");
    var panblock2=document.getElementById("panblock2");
    var panblock3=document.getElementById("panblock3");
    var panblock4=document.getElementById("panblock4");
    var panblock5=document.getElementById("panblock5");
    var panblock6=document.getElementById("panblock6");
    var panblock7=document.getElementById("panblock7");
    var panblock8=document.getElementById("panblock8");

    if(Allpanpan[0]!=-1) document.querySelector("#panpan1").innerHTML=Allpanpan[0];
    if(Allpanpan[1]!=-1) document.querySelector("#panpan2").innerHTML=Allpanpan[1];
    if(Allpanpan[2]!=-1) document.querySelector("#panpan3").innerHTML=Allpanpan[2];
    if(Allpanpan[3]!=-1) document.querySelector("#panpan4").innerHTML=Allpanpan[3];
    if(Allpanpan[4]!=-1) document.querySelector("#panpan5").innerHTML=Allpanpan[4];
    if(Allpanpan[5]!=-1) document.querySelector("#panpan6").innerHTML=Allpanpan[5];
    if(Allpanpan[6]!=-1) document.querySelector("#panpan7").innerHTML=Allpanpan[6];
    if(Allpanpan[7]!=-1) document.querySelector("#panpan8").innerHTML=Allpanpan[7];

    if(Allpanpan[0]==-1) panblock1.style.visibility="hidden";
    if(Allpanpan[1]==-1) panblock2.style.visibility="hidden";
    if(Allpanpan[2]==-1) panblock3.style.visibility="hidden";
    if(Allpanpan[3]==-1) panblock4.style.visibility="hidden";
    if(Allpanpan[4]==-1) panblock5.style.visibility="hidden";
    if(Allpanpan[5]==-1) panblock6.style.visibility="hidden";
    if(Allpanpan[6]==-1) panblock7.style.visibility="hidden";
    if(Allpanpan[7]==-1) panblock8.style.visibility="hidden";
}
let Game_Process=function(){
    End_Time=Time.getTime();
    str=(Total_time-(End_Time-Start_Time))/1000;
    document.querySelector("#Countdown").innerHTML=Math.ceil(str);
    str=Cost; 
    document.querySelector("#Cost").innerHTML=str;
    Draw();

    if(isGameOver()){
        isGameon=0;
        clearInterval(clock);
        document.querySelector("#Countdown").innerHTML=0;
        Game_Over();
    }
}
let Game_Over=function(){
    if(RestAmount<=1 && Cost==PerfectAnswer){
        GameOverMessage="You Won";
    }else{
        GameOverMessage="Game Over";
    }
    document.querySelector("#Result").innerHTML=GameOverMessage;
}
