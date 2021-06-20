
function move(car){
console.log(car)

var idd=null
clearInterval(id)
var elem=document.getElementById(car.id)



if(car.x==0){
//this is doing animation from start to garage
idd=setInterval(function(){garage(car)},5)
}else if(car.x==1){
//this is the animation from start to service
idd=setInterval(function(){service(car)},5)
}
else if(car.x==2){
//animation that switch from garage to service
idd=setInterval(function(){switcher(car)},5)
}
else if(car.x==3){
//this is an animation for service or garage to exit
idd=setInterval(function(){exiter(car)},5)
}

function switcher(car){
 if(car.left>=350){
		if(elem.style.top>300+'px'){
		car.down--;
		elem.style.top=Math.abs(car.down)+'px'
		}
		else if(elem.style.top>100+'px'){
		car.up--;
		elem.style.top=Math.abs(car.up)+'px'
		}
		else if(elem.style.top==100+'px'){
			//console.log(car.down+" , "+car.up)

	   		clearInterval(idd)
		}
	  }
}

function service(car){
	var elem=document.getElementById(car.id)
	  if(car.left>=350){
	    car.up--;
		elem.style.top=car.up+'px'
		if(elem.style.top==100+'px'){
	   clearInterval(idd)
		}
	  }else{
		car.left++
	    elem.style.left=car.left+'px'
          }
}

function garage(car){
	console.log("Hi");
	var elem=document.getElementById(car.id)
	//console.log(car.left)
	  if(car.left>=350){
	    car.down++;
		elem.style.top=car.down+'px'
		if(elem.style.top==500+'px'){
	   		clearInterval(idd)
		}
	  }else{
		car.left++
	    elem.style.left=car.left+'px'
          }
}


function exiter(){
	var elem=document.getElementById(car.id)
//console.log(elem.style.top)

if(elem.style.top<300+'px'){
//console.log(elem.style.top)
	car.up++
	elem.style.top=car.up+'px'
}
else if(elem.style.top>300+'px'){
//console.log(elem.style.top)
	car.down--
	elem.style.top=car.down+'px'
}
else if(elem.style.left<599+'px'){
//console.log(elem.style.left)
	car.left++
	elem.style.left=Math.abs(car.left)+'px'
}
else{
	clearInterval(idd)
	}

}
return
}
