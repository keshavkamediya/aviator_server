const Loader = document.getElementById("top-loader");
const loaderVal = document.getElementById("LoadingVal");

var GameStarted = false;
var i = 1;
// const startNewGame = ()=>{

// }
const GameFunction = async() => {
  setInterval(() => {
    if (!Crashed) {
      timesX += increment;
      if (timesX > 200) {
        increment = 0.5;
      } else if (timesX > 50) {
        increment = 0.5;
      } else if (timesX > 10) {
        increment = 0.5;
      } else {
        RocketRotation -= 0.01;
      }

      if (timesX > Final_num) {
        CoefficientVal.innerHTML = "Crashed";
        Crashed = true;
        return Crashed
      } else {
        CoefficientVal.innerHTML = timesX.toFixed(2);
        DrawLines();
      }
    } else {
      return new Promise((resolve)=>{
        resolve("resolved")
      }) ;
    }
  }, 100);

  setInterval(() => {
    DrawRocketCurve();
  }, 5);
};

const ResolveNew= async ()=>{
  await GameFunction()
}
ResolveNew()
// .then((value) => {
//   console.log(value);
// }).catch((err)=>{
//   console.log(err)
// });
