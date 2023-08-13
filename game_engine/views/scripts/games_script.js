if (Crashed) {
  Crashed = false;
  // Crashed = true
  timesX = 1;
  breaksMaker = 1;
  increment = 0.1;
  Final_num;
  E = 10;
  H = Math.random() * (E - 1) + 1;
  random_digit = [(E * 100 - H) / (E - H)] / 100;
  Final_num = parseFloat(random_digit.toFixed(2));

  xpos = 0;
  ypos = 500;
  controlx = 5;
  controly = 500;
  TotalHeight = 500;
  breaks = 4;
  breaks100 = 6;
  breaks400 = 6;
  RocketRotation = 45;
  DrawRocket();
} else if (!Crashed) {
  DrawRocket();
}
