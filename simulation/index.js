var canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 500;

//to create 2d graphics------------------------------------------------
var c = canvas.getContext('2d');
// ----------------------------------------------------------------------
//Initiating the global values
var frequency = Number(100)
var time_period = Number(5);
var y_pos = Number(0);
var amp = Number(30);
var x_pos = Number(0);
var count = 1;
var xycount = 1;
var focus_count = 1;
var count_fg = 0;
var on = 0;
var xy_on = 0;
var focus = 0;
var on_fg = 0;
var signal_no= 1;
var connect = 0;
var tour_on = 0;
var dialog;
// plotAxes();-----------------------------------------------------
function plotAxes() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = "black";
  //vertical line and y-axis markings
  for (var i = 0; i < 2000; i = i + 80) {
    c.beginPath();
    c.moveTo(i, 0);
    c.lineTo(i, 600);
    c.stroke();
    if (i == 560) {
      for (var j = 0; j < canvas.height; j = j + 16) {
        c.beginPath();
        c.moveTo(canvas.width / 2 - 30, j);
        c.lineTo(canvas.width / 2 - 10, j);
        c.stroke();
      }
    }
  }
  //Horizontal line and x-axis markings
  for (var i = 0; i < 1000; i = i + 80) {
    c.beginPath();
    c.moveTo(0, i);
    c.lineTo(1500, i);
    c.stroke();
    if (i == 320) {
      for (var j = 0; j < canvas.width; j = j + 16) {
        c.beginPath();
        c.moveTo(j, canvas.height / 2 - 20);
        c.lineTo(j, canvas.height / 2 );
        c.stroke();
      }
    }
  }
}

//Creating Sine waves--------------------------------------------------------
function plotSine_t() {
  // plotAxes();
  // c.strokeStyle = "blue";
  // c.beginPath();
  // var y = (canvas.height / 2) - 10 ;
  // c.moveTo(x_pos, y);
  // // for(var j=0;j<2;j++){
  //   for (i = x_pos; i < 2000; i++) {
  //     if(signal_no == 1){
  //       y = ((canvas.height / 2 -10) + ((Math.sin((i - x_pos) * 0.01 * frequency)) * (-amp)) - (y_pos * 1));
  //     }
  //     else{
  //       y = ((canvas.height / 2 - 10) + ((Math.cos((i - x_pos) * 0.01 * frequency)) * (-amp)) - (y_pos * 1));
  //     }
  //     c.lineTo(i, y);
  //   }
  // // }
  // c.stroke();
  plotAxes();
 c.strokeStyle = "black";
 c.beginPath();
 var y = (canvas.height / 2) - 10;
 c.moveTo(x_pos, y);
 // alert("ji");
 for (i = x_pos; i < 2000; i++) {
   // alert("hi");
   y = ((canvas.height / 2-10) +Math.sign(((Math.sin(2*(i - x_pos) * 0.01 * frequency)) * (-amp)))-(y_pos * 1)) ;
   c.lineTo(i, y);
 }
 c.stroke();
}

function plot_condn() {
  if(on==1 && on_fg ==1 && connect==1 ){
    if (xy_on == 1 && focus == 0) {
      window.requestAnimationFrame(plotLine);
    } else if (focus == 1 && xy_on == 0 && on_fg ==1) {
      window.requestAnimationFrame(plot_focus);
    } else if(focus==0 && xy_on ==0){
      window.requestAnimationFrame(plotSine_t);
    }
  }
  else if(on==1){
    window.requestAnimationFrame(plotAxes);
  }
}

// CRO  PARAMETERS----------------------------------------
//Time period-------------------------------------------------------------------
function timeperiod() {
  if (on == 1 && on_fg ==1) {
    time_period = Number(document.getElementById("time_division").value) * 10;
    frequency = 1 / time_period;
    plot_condn();
  }
  if(tour_on==8){dialog.close();
  dialog = document.getElementById('yposition_cro_demo');
  dialog.show();tour_on=9}
}
// // Position of Y changing----------------------------------------------------
function yposition() {
  if (on == 1 && on_fg ==1) {
    y_pos = Number(document.getElementById("yposition").value);
    plot_condn();
  }
  if(tour_on==9){dialog.close();
  dialog = document.getElementById('ydivision_cro_demo');
  dialog.show();tour_on=10;}
}
// //Position of X-Axis---------------------------------------------------------
function xposition() {
  if (on == 1 && on_fg ==1) {
    x_pos = Number(document.getElementById("xposition").value);
    plot_condn();
  }
  if(tour_on==7){dialog.close();
  dialog = document.getElementById('xdivision_cro_demo');
  dialog.show();tour_on=8;}
}
//Changing the amplitude-----------------------------------------------------
function ydivision() {
  if (on == 1 && on_fg == 1) {
    amp = Number(document.getElementById("ydivision_input").value) * 30;
    plot_condn();
  }
  if(tour_on==10){dialog.close();
  dialog = document.getElementById('xy_cro_demo');
  dialog.show();tour_on=11;}
}
//ON/OFF switch--------------------------------------------------
function on_off_cro() {
  if(tour_on==2){alert("hi");dialog.close();
   dialog = document.getElementById('onoff_fg_demo');
   dialog.show();tour_on=3 }
  count = count + 1;
  if (count % 2 == 0) {
    on = 1;
    document.getElementById("canvas").style.backgroundColor="rgba(0,255,0,0.6)"
    if(on_fg ==1){window.requestAnimationFrame(plotSine_t);}
    else{window.requestAnimationFrame(plotAxes);}

  } else {
      on = 0;
     document.getElementById("canvas").style.backgroundColor="rgba(0,255,0,0.1)"
     c.clearRect(0, 0, canvas.width, canvas.height);
  }

}
//X-Y-----------------------------------------------------------------------------
function plotLine() {
  plotAxes();
  c.strokeStyle = "black";
  var ay = ((canvas.height / 2) - ((1) * (-amp)) - (y_pos * 1));
  var y = ((canvas.height / 2) + ((1) * (-amp)) - (y_pos * 1));

    c.beginPath();
    c.moveTo((canvas.width / 2) + x_pos - 20, ay);
    c.lineTo((canvas.width / 2) + x_pos - 20, y);
    c.stroke();

}
function xy() {
  if(tour_on==11){dialog.close();
  dialog = document.getElementById('focus_cro_demo');
  dialog.show();tour_on=12}
    xycount = xycount + 1;
  if (xycount % 2 == 0) {
      xy_on = 1;
      plot_condn();
  } else {
      xy_on = 0;
      plot_condn();
  }
}
//Focus -----------------------------------------------------
function plot_focus() {
  plotAxes();
  c.strokeStyle = "blue";
    c.beginPath();
    var y = (canvas.height / 2) - 5;
    c.moveTo(x_pos, y);
    for (i = x_pos; i < 2000; i++) {
      y = ((canvas.height / 2) - (y_pos * 1));
      c.lineTo(i, y);
    }
    c.stroke();
}
function myfunc() {
    focus_count = focus_count + 1;
  if (focus_count % 2 == 0) {
     focus = 1;
     plot_condn();
  } else {
      focus = 0;
      plot_condn();
  }
  if(tour_on ==12){
    tour_on=13;dialog.close();
    dialog = document.getElementById('remove_wire_demo');
    dialog.show();
  }
}
function connect_wire(){
  document.getElementById("wire").style.top="175px";
  connect = 1;
  plot_condn();
  if(tour_on==1){
    dialog.close();
     dialog = document.getElementById('onoff_cro_demo');
  dialog.show();tour_on=2}
}
function remove_wire(){
  document.getElementById("wire").style.top="225px";
  connect = 0;
  plot_condn();
  if(tour_on=13){tour_on=0;displa}
}
//FUNCTION GENERATOR----------------------------------------------------------------------\
var display = document.getElementById("display_canvas");
var disp = display.getContext("2d");
var func ="Sin";
var amp_disp=30;
var freq_disp=5;

function display_fg(){
  disp.clearRect(0,0,canvas.width,canvas.height);
  disp.font = "20px Arial";
  disp.fillText(func,10,20);
  disp.fillText(amp+" V",10,45);
  disp.fillText(freq_disp+" Hz",120,45)
}
function amplitude() {
  if (on_fg == 1) {
    amp = Number(document.getElementById("amplitude").value);
    amp_disp=amp;
    display_fg();
  }
  if(on==1){plot_condn();}
  if(tour_on==6){dialog.close();
  dialog = document.getElementById('xposition_cro_demo');
  dialog.show();tour_on=7;}
}
function freq() {
  if (on_fg == 1) {
    frequency = Number(document.getElementById("frequency").value);
    freq_disp=frequency;
    display_fg();
  }
  if(on==1){plot_condn();}
  if(tour_on==5){dialog.close();
  dialog = document.getElementById('amplitude_fg_demo');
  dialog.show();tour_on=6;}
}
function on_off_fg(){
  if(count_fg % 2==0){
    document.getElementById("display_canvas").style.backgroundColor="rgba(0,255,0,0.6)"
    display_fg();
    on_fg=1;
    plot_condn();
    // if(on==1&&){window.requestAnimationFrame(plotSine_t);}
  }
  else{
     on_fg=0;
     disp.clearRect(0,0,canvas.width,canvas.height);
     window.requestAnimationFrame(plotAxes);
     document.getElementById("display_canvas").style.backgroundColor="rgba(0,255,0,0.1)"
  }
  count_fg=count_fg+1;
  if(tour_on==3){dialog.close();
  dialog = document.getElementById('signal_select_demo');
  dialog.show();tour_on=4}
}
function signal_selection(){
  if(on_fg == 1 ){
      signal_no = document.getElementById("signal_select").value;
      if(signal_no==1){ func= "Sin";}
      else{func ="Cos";}
      display_fg();
  }
  if(on==1){  window.requestAnimationFrame(plotSine_t);}
  if(tour_on==4){dialog.close();
  dialog = document.getElementById('frequency_fg_demo');
  dialog.show();tour_on=5}
}


// Tour guide
function tour(){
  tour_on=1;
  dialog = document.getElementById('connect_demo');
  dialog.show();
}
