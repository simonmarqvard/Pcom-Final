
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var circleSize = 10; // size of the circle
var xPos = 0;
var yPos = 0;
let dataArray = [];
let maxValues = 500;
let max = 0;
let min = 0;

function setup() {
  createCanvas(windowWidth, 600);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
}

function draw() {
  background(0);
  // fill(40);
  // ellipse(xPos, yPos, 50, 50);
  for(let i = 0; i < dataArray.length - 1; i++){
    // let y = map(dataArray[i], 700, 800, 0, height);
    // let y2 = map(dataArray[i+1], 700, 800, 0, height);
    // line(i * (width/maxValues), y, (i+1) * (width/maxValues), y2)
    // ellipse(i * (width/maxValues), y, 10,10   )
    // let m = map(middle)


    stroke(0,255,0);
    let y = map(dataArray[i], min, max, (height/2) - 100, (height/2) + 100);
    let y2 = map(dataArray[i+1], min, max, (height/2) - 100, (height/2) + 100);
    // textAlign();

    // let y2 = map(dataArray[i+1], 700, 800, 0, height);
    line(i * (width/maxValues), y, (i+1) * (width/maxValues), y2) // scale to amount of points you want for x pos
    // ellipse(i * (width/maxValues), y, 10,10   )
  }
  // fill(255);
  // noStroke();
  // text(int(min), 10, (height/2) - 100 - 10);
  // text(int(max), 10, (height/2) + 100 + 10);

}

let tempArray = [];

function serialEvent() {
  var data = serial.readLine(); //taking data from arduino and reading them

  if (data.length > 0) {
    // console.log(data);
    tempArray.push(int(data));   //put full (int) numbers into array

    if(tempArray.length > 10){

        dataArray.push(d3.mean(tempArray));
     console.log(tempArray);
        // if(dataArray.length == maxValues && first) {
      // first = false;
        max = d3.max(dataArray);
        min = d3.min(dataArray);
    // }

        while(dataArray.length > maxValues){   //maxVal max 500 numbers
          dataArray.splice(0,1);
        }
        tempArray = [];  //reset temp array to create space for 10 new numbers
    }
    // console.log(dataArray);
    // var sensors = split(data, ",");
    //
    // yPos = int(data);
  }
}


function mousePressed(){
  dataArray=[];
}
