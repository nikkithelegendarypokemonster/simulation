
function run(){
	var id= setInterval(function(){main_driver(id)},4000)
}

//in here create an object and simulate it on animation engine
function main_driver(id){
//	while(true)
		if(timer<opening+1){
			timer+=1
			//handle employee arrival create employee object
			//mark by default employee values servicing and put in waiting array
			if(timer==opening){
				for (var i = 0; i < nth_employee; i++) {
					waiting_array.push(emp_create())
				//	console.log(emp_create());
				}
			}
		}else{
			logic0(id)
			cars_logic()
			logic1()
			timer+=1
			//put all employee in retool array to waiting arrays
			if(retool_array.length>0){
				for (var i = 0; i < retool_array.length; i++) {
					waiting_array.push(retool_array[i])
					retool_array.shift()
				}
			}

		}
		//console.log(timer);
	}




//logics
function logic1(){
	var temp_arr=[]
	if(waiting_array.length>0){
		for (var i = 0; i < waiting_array.length; i++) {
			//loop to every employee in waiting array
			if(station_array.length<=station_limit){
				//check the garage_array
				if(garage_array.length>0){
					for (var i = 0; i < garage_array.length; i++) {
						if(waiting_array.length>0 && garage_array.length>0){
							//set the servicing of both to true and waiting to false for car and set the x of car to 2
							garage_array[i].servicing=true
							garage_array[i].waiting=false
							garage_array[i].x=2
							waiting_array[i].servicing=true
							temp_arr.push(garage_array[i])
							temp_arr.push(waiting_array[i])
							station_array.push(temp_arr)
							temp_arr=[]
							//before deleting move the car animation first then delete both employee and car to their respective arrays
							setTimeout(function(){move(garage_array[i])},5000)
							garage_array.shift()
							waiting_array.shift()
						}else{
							//if there is no in the waiting room or garage stop the process
							break
						}
					}

				}else{
					for (var i = 0; i < outside_array.length; i++) {
						if(waiting_array.length>0 && outside_array.length>0){
							//set the servicing of both to true and waiting to false for car and set the x of car to 1
							outside_array[i].servicing=true
							outside_array[i].waiting=false
							outside_array[i].x=1
							waiting_array[i].servicing=true
							temp_arr.push(outside_array[i])
							temp_arr.push(waiting_array[i])
							station_array.push(temp_arr)
							temp_arr=[]
							//before deleting move the car animation first then delete both employee and car to their respective arrays
							setTimeout(function(){move(outside_array[i])},5000)
							outside_array.shift()
							waiting_array.shift()
						}else{
							//if there is no in the waiting room or garage stop the process
							break
						}
					}
				}

			}else{
				//put all cars in garage
				in_garage()
			}
		}
	}else{
		in_garage()
		timer+=1
		cars_logic();
	}
	return
}
function cars_logic(){
			if(timer>=opening+1 && !(timer >=closing) ){
					//creation of random car arrivals [0-3]
					for (var i = 0; i < Math.floor(Math.random()*(3-0+1)+0); i++) {
						//create a car objects push them in outside array
						outside_array.push(create())
					}
				//	console.log(outside_array);
					//loop outside array
					for (var i = 0; i < outside_array.length; i++) {
						//check if there is employee in waiting array
						if(waiting_array.length>0 && station_array.length<station_limit){
							outside_array[i].servicing=true
							outside_array[i].waiting=false
						}
					}
			}
			return
}
function logic0(id){
	//console.log(timer);
	if(timer>=opening+1 && !(timer >=closing) ){
			if(station_array.length>0){
				for (var i = 0; i < station_array.length; i++) {
					console.log(station_array);
					//loop for every station array 0for car 1 for employee
					//retool_array.push(station_array[i][1])
					//set x locator of car to exit(3)
			//		console.log(station_array[i]);
					station_array[i][0].x=3
					exit_array.push(station_array[i][0])
					station_array.shift()
					//later process the payment
				}
				exiter()
			}else{
				return
			}
	}else{
		//if timer reaches the end stop the Interval
		console.log("Done");
	clearInterval(id)
	}
}



function in_garage(){
	for (var i = 0; i < outside_array.length; i++) {
		//set x in every car to 0
		outside_array[i].x=0
		setTimeout(function(){move(outside_array[i])},5000)
		outside_array.shift()
	}
}
function exiter(){
	console.log("grmnrtbntrbnribnin");
	for(var i=0;i<exit_array.length;i++){
			setTimeout(function(){move(exit_array[i])},5000)
			exit_array.shift()
			//station_array.shift()
		}
		//delete all cars in exit array
		exit_array=[]
}









//creation of employee objects
class Employee{
	constructor(id){
	this.id=id
	this.servicing=false
	}
}

function emp_create(){
//create a div element
//set Car object properties here
//instance.id="Employee"+Math.floor(Math.random()*(2000-0+1)+0)

id=generate_uuid()
var employee=new Employee(id)
return employee
}
//========================end of employee creation===========================













//creation of car object
//class of car to create dom element structure
class Car{
	constructor(id){
	this.id=id
	this.x=Math.floor(Math.random()*(1-0+1)+0)
	this.left=0
	this.up=300
	this.down=300
	//set random action wax(0),wash(1),both(2)
	this.action=Math.floor(Math.random()*(2-0+1)+0)
	//set srevicing to false and waiting to true
	this.servicing=false
	this.waiting=true
	}
}

//functions
function create(){
//create a div element
var instance=document.createElement("DIV")
instance.style.position="absolute"
instance.style.padding=10+'px'
instance.style.backgroundColor="blue"
instance.style.width=10+'px'
instance.style.top=300+'px'
//set Car object properties here
//instance.id="Car"+Math.floor(Math.random()*(2000-0+1)+0)
instance.id=generate_uuid()
document.getElementById("container").appendChild(instance)
var car=new Car(instance.id)
return car
//outside_array.push(car)
}
//==============================end of creation of car object=====================================
//function handle animations
function outsider(){
for(var i=0;i<outside_array.length;i++){
		if(outside_array[i].x==0){
			move(outside_array[i])
			outside_array[i].x=2
			garage_array.push(outside_array[i])
			//outside_array.shift()
			console.log("Garage= "+garage_array);
		}
		else if(outside_array[i].x==1){
				move(outside_array[i])
			outside_array[i].x=3
			station_array.push(outside_array[i])
			//outside_array.shift()
			console.log("Station= "+station_array);
		}
	}
	//delete all in outside array
	outside_array.length=0
}

function garager(){
for(var i=0;i<garage_array.length;i++){
		move(garage_array[i])
		garage_array[i].x=3
		station_array.push(garage_array[i])
		//garage_array.shift()
		// if(garage_array[i].x==0){
		// 	garage_array.push(outside_array[i])
		// 	outside_array.shift()
		// 	console.log("Garage= "+garage_array);
		// }
		// else if(outside_array[i].x==1){
		// 	station_array.push(outside_array[i])
		// 	outside_array.shift()
		// 	console.log("Station= "+station_array);
		// }
	}
	//delete all in garage array
	garage_array.length=0
}
function servicer(){
for(var i=0;i<station_array.length;i++){
		exit_array.push(station_array[i])
		move(station_array[i])
		//station_array.shift()
	}
	//delete all in station array
	station_array.length=0
}
//generate unique key id
function generate_uuid(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	return v.toString(16);
});
}
