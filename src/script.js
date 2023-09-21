var iteration=0;
var grid="";
var length=0;
var width=0;
var rules=null;
var running=false;
var cells={};
	CellState={
		ALIVE:true,
		DEAD:false
	};
	function findCell(x,y){
		if(x==0)
			x=parseInt(width);
		if(x==parseInt(width)+1)
			x=1;
		if(y==0)
			y=parseInt(length);
		if(y==parseInt(length)+1)
			y=1;
		return cells[x+","+y];
	}
	class Cell{
		constructor(x,y,state=CellState.DEAD){
			this.x=x;
			this.y=y;
			this.state=state;
			this.prevState=state
		}
		countNeighbours(){
			let cnt=0;
			cnt+=Number(findCell(this.x-1,this.y-1).prevState)
			cnt+=Number(findCell(this.x,this.y-1).prevState)
			cnt+=Number(findCell(this.x+1,this.y-1).prevState)
			cnt+=Number(findCell(this.x-1,this.y).prevState)
			cnt+=Number(findCell(this.x+1,this.y).prevState)
			cnt+=Number(findCell(this.x-1,this.y+1).prevState)
			cnt+=Number(findCell(this.x,this.y+1).prevState)
			cnt+=Number(findCell(this.x+1,this.y+1).prevState)
			return cnt;
		}
	}
	class Rule{
		constructor(rl){
			this.rule={};
			this.rule[CellState.ALIVE]=[false,false,false,false,false,false,false,false];
			this.rule[CellState.DEAD]=[false,false,false,false,false,false,false,false];
			rl=rl.split("/")
			for(i in rl[0])
				this.rule[CellState.ALIVE][parseInt(rl[0][i])]=true;
			for(i in rl[1])
				this.rule[CellState.DEAD][parseInt(rl[1][i])]=true;
			}
	}
	function makeGrid(len,wid){
		grid="<table style=\"\" id=\"grid\" hidden=true><tr><td></td>"
		for(i=1;i<=wid;i++)
			grid+="<td>"+i+"</td>"
		grid+="</tr>"
		for(l=1;l<=len;l++){
			grid+="<tr><td>"+l+"</td>"
			for(w=1;w<=wid;w++){
				cord=l+","+w
				cells[cord]=new Cell(l,w);
				grid+="<td id=\""+cord+"\"></td>"}
			grid+="</tr>"
		}
		grid+="</table>"
	}
	function start(){
		running=!running;
		if(running)
			document.getElementById("run_button").value="Stop"
		else
			document.getElementById("run_button").value="Run"
	}
	function swapState(id){
		cells[id].state=!cells[id].state;
		if(cells[id].state)
			document.getElementById(id).style.backgroundColor="black";
		else
			document.getElementById(id).style.backgroundColor="white";
	}
	function selectLives(){
		for(i in cells)
			document.getElementById(i).setAttribute("onclick","swapState(\""+i+"\")");
		document.getElementById("grid").hidden=false;
	}
	function createGame(){
		length=document.getElementById("input_length").value;
		width=document.getElementById("input_width").value;
		makeGrid(length,width);
		document.body.innerHTML="<div id\"grid_container\">"+grid+"</div><div id=\"ctrls\"><input placeholder=\"Rules\" value=\"23/3\" id=\"input_rules\"/><input id=\"run_button\" type=\"button\" value=\"Run\" onclick=\"start()\"/> Iternations:<snap id=\"iternation_display\">0</div>";
		selectLives();
		run();
	}
	function run() {
  		setTimeout(function() {
    			if(running){
				console.log("running");
				rules=new Rule(document.getElementById("input_rules").value);
				for(i in cells)
					cells[i].prevState=cells[i].state
				for(i in cells){
					console.log(i);
					if(rules.rule[cells[i].state][cells[i].countNeighbours()]!=cells[i].state)
						swapState(i)
				}
				iteration++;
				document.getElementById("iternation_display").innerText=iteration;
			}
    			run();
    			}, 1000);
	}


	
