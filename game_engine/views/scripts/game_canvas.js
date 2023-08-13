const timesInc = document.getElementById("timesX");
const canvas = document.getElementById("crash");
const BGcanvas = document.getElementById("crashBg");
const CoefficientVal = document.getElementById("Coeff_val");
const context = canvas.getContext("2d");
const BGcontext = BGcanvas.getContext("2d");
const rocket = document.getElementById("rocket");
const blast = document.getElementById("blast");

var timesX = 1;
var breaksMaker = 1;
var increment = 0.1;
var Final_num;
var E = 10;
var H = Math.random() * (E - 1) + 1;
var random_digit = [(E * 100 - H) / (E - H)] / 100;

Final_num = parseFloat(random_digit.toFixed(2));
var xpos = 0;
var ypos = 500;
var controlx = 5;
var controly = 500;

var TotalHeight = 500;
var breaks = 4;
var breaks100 = 6;
var breaks400 = 6;
var RocketRotation = 45;
var Crashed = false;

const DrawLine = (y) => {
  BGcontext.beginPath();
  BGcontext.moveTo(0, y);
  BGcontext.lineWidth = 2;
  BGcontext.strokeStyle = "#1E293B";
  BGcontext.setLineDash([2, 5]);
  BGcontext.lineTo(1000, y);
  BGcontext.stroke();
};

const DrawRocket = (Final_Val) => {

  if (timesX > 5000) {
    xpos = xpos;
    ypos = ypos;

    controlx = xpos;
    controly = 500;
  } else if (timesX > 10) {
    if (xpos > 900) {
      if (ypos < 100) {
        xpos = xpos;
        ypos = ypos;
      } else {
        ypos -= increment * 0.7;
        controly += 0.2;
      }
    } else {
      xpos += increment * 10;
      ypos -= increment * 0.7;
    }
    // RocketRotation = -50;
  } else if (timesX > 0) {
    if (xpos > 900) {
      ypos -= increment * 0.7;

      controly += 0.1;
    } else {
      xpos += increment * 20;
      ypos -= increment * 1;

      controlx += increment * 10;
      controly = 500;
    }
  }
  if (RocketRotation < -45) {
  } else {
    RocketRotation -= 0.2;
  }

  breaksMaker += increment;
  timesX += increment;
  if (timesX > 200) {
    increment = 0.5;
  } else if (timesX > 50) {
    increment = 0.5;
  } else if (timesX > 10) {
    increment = 0.5;
  }

  context.strokeStyle = "#FF6347";
  context.lineCap = "round";
  context.lineWidth = 2;
  context.beginPath();
  context.clearRect(0, 0, 1000, 500);
  context.moveTo(0, 500);
  context.quadraticCurveTo(xpos, 500, xpos, ypos);
  context.stroke();
  context.save();

  context.translate(xpos, ypos);
  context.rotate((RocketRotation * Math.PI) / 180);
  if (!Crashed) {
    context.drawImage(rocket, -40, -40, 80, 80);
  } else {
    context.drawImage(blast, -70, -70, 140, 140);
  }
  context.restore();

  BGcontext.clearRect(0, 0, canvas.width, canvas.height);
  if (breaksMaker / 10 > 50) {
    breaksMaker = 0;
    breaks = 5;
  } else {
    if (!Crashed) {
      breaks += 0.002;
    }
    for (let index = 0; index < breaks; index++) {
      DrawLine(500 - (TotalHeight / breaks) * (index + 1));
    }  
  }
  if (timesX / 10 > Final_num) {
    CoefficientVal.innerHTML = "x"+(timesX/10).toFixed(2);
    CoefficientVal.style.color = "#ef4444";
    // window.cancelAnimationFrame(DrawRocket)
    increment = 0
    Crashed = true;
  } else {
    CoefficientVal.innerHTML = "x"+(timesX / 10).toFixed(2);
    CoefficientVal.style.color = "#3b82f6";
    // DrawLines();
  }

  window.requestAnimationFrame(DrawRocket);
};
