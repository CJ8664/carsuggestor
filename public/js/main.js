var q11output = document.getElementById("q11text");
var value;
q11output.innerHTML = "Pick Your First Choice";

function q11clickPic(value) {
  if (value == 0) {
    q11output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q11output.innerHTML = "Unique";
  } else if (value == 2) {
    q11output.innerHTML = "Powerful";
  } else if (value == 3) {
    q11output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q11output.innerHTML = "Socialite";
  } else if (value == 5) {
    q11output.innerHTML = "Classy";
  } else {
    q11output.innerHTML = "Practical";
  }
  update();
}

var q12output = document.getElementById("q12text");
var value;
q12output.innerHTML = "Pick Your Second Choice";

function q12clickPic(value) {
  if (value == 0) {
    q12output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q12output.innerHTML = "Unique";
  } else if (value == 2) {
    q12output.innerHTML = "Powerful";
  } else if (value == 3) {
    q12output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q12output.innerHTML = "Socialite";
  } else if (value == 5) {
    q12output.innerHTML = "Classy";
  } else {
    q12output.innerHTML = "Practical";
  }
  update();
}

var q13output = document.getElementById("q13text");
var value;
q13output.innerHTML = "Pick Your Third Choice";

function q13clickPic(value) {
  if (value == 0) {
    q13output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q13output.innerHTML = "Unique";
  } else if (value == 2) {
    q13output.innerHTML = "Powerful";
  } else if (value == 3) {
    q13output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q13output.innerHTML = "Socialite";
  } else if (value == 5) {
    q13output.innerHTML = "Classy";
  } else {
    q13output.innerHTML = "Practical";
  }
  update();
}

var q14output = document.getElementById("q14text");
var value;
q14output.innerHTML = "Pick Your Fourth Choice";

function q14clickPic(value) {
  if (value == 0) {
    q14output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q14output.innerHTML = "Unique";
  } else if (value == 2) {
    q14output.innerHTML = "Powerful";
  } else if (value == 3) {
    q14output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q14output.innerHTML = "Socialite";
  } else if (value == 5) {
    q14output.innerHTML = "Classy";
  } else {
    q14output.innerHTML = "Practical";
  }
  update();
}

var q15output = document.getElementById("q15text");
var value;
q15output.innerHTML = "Pick Your Fifth Choice";

function q15clickPic(value) {
  if (value == 0) {
    q15output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q15output.innerHTML = "Unique";
  } else if (value == 2) {
    q15output.innerHTML = "Powerful";
  } else if (value == 3) {
    q15output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q15output.innerHTML = "Socialite";
  } else if (value == 5) {
    q15output.innerHTML = "Classy";
  } else {
    q15output.innerHTML = "Practical";
  }
  update();
}

var q16output = document.getElementById("q16text");
var value;
q16output.innerHTML = "Pick Your Sixth Choice";

function q16clickPic(value) {
  if (value == 0) {
    q16output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q16output.innerHTML = "Unique";
  } else if (value == 2) {
    q16output.innerHTML = "Powerful";
  } else if (value == 3) {
    q16output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q16output.innerHTML = "Socialite";
  } else if (value == 5) {
    q16output.innerHTML = "Classy";
  } else {
    q16output.innerHTML = "Practical";
  }
  update();
}

var q17output = document.getElementById("q17text");
var value;
q17output.innerHTML = "Pick Your Seventh Choice";

function q17clickPic(value) {
  if (value == 0) {
    q17output.innerHTML = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q17output.innerHTML = "Unique";
  } else if (value == 2) {
    q17output.innerHTML = "Powerful";
  } else if (value == 3) {
    q17output.innerHTML = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q17output.innerHTML = "Socialite";
  } else if (value == 5) {
    q17output.innerHTML = "Classy";
  } else {
    q17output.innerHTML = "Practical";
  }
  update();
}

var slider = document.getElementById("q2");
var q2output = document.getElementById("q2text");
q2output.innerHTML = "Pick An Image";

function clickPic(num) {
  slider.value = num;
  changeText();
}

slider.oninput = function() {
  if (this.value == 0) {
    q2output.innerHTML = "No Money";
  } else if (this.value == 1) {
    q2output.innerHTML = "Some Money";
  } else if (this.value == 2) {
    q2output.innerHTML = "More Money";
  } else {
    q2output.innerHTML = "All The Money";
  }
  update();
}

function changeText() {
  if (slider.value == 0) {
    q2output.innerHTML = "No Money";
  } else if (slider.value == 1) {
    q2output.innerHTML = "Some Money";
  } else if (slider.value == 2) {
    q2output.innerHTML = "More Money";
  } else {
    q2output.innerHTML = "All The Money";
  }
  update();
}

var q3slider = document.getElementById("q3");
var q3output = document.getElementById("q3text");
q3output.innerHTML = "Pick An Image";

function q3clickPic(num) {
  q3slider.value = num;
  q3changeText();
}

q3slider.oninput = function() {
  if (this.value == 0) {
    q3output.innerHTML = "Very Little";
  } else if (this.value == 1) {
    q3output.innerHTML = "Some";
  } else if (this.value == 2) {
    q3output.innerHTML = "A Moderate Amount";
  } else {
    q3output.innerHTML = "I Live In My Car";
  }
  update();
}

function q3changeText() {
  if (q3slider.value == 0) {
    q3output.innerHTML = "Very Little";
  } else if (q3slider.value == 1) {
    q3output.innerHTML = "Some";
  } else if (q3slider.value == 2) {
    q3output.innerHTML = "A Moderate Amount";
  } else {
    q3output.innerHTML = "I Live In My Car";
  }
  update();
}

var q4output = document.getElementById("q4text");
var value;
q4output.innerHTML = "Pick An Image";

function q4clickPic(value) {
  if (value == 0) {
    q4output.innerHTML = "Mountains";
  } else if (value == 1) {
    q4output.innerHTML = "Beach";
  } else if (value == 2) {
    q4output.innerHTML = "City";
  } else {
    q4output.innerHTML = "Countryside";
  }
  update();
}

var q5output = document.getElementById("q5text");
var value;
q5output.innerHTML = "Pick An Image";

function q5clickPic(value) {
  if (value == 0) {
    q5output.innerHTML = "City";
  } else if (value == 1) {
    q5output.innerHTML = "Small Town";
  } else if (value == 2) {
    q5output.innerHTML = "Mountains";
  } else {
    q5output.innerHTML = "Countryside";
  }
  update();
}

var q6output = document.getElementById("q6text");
var value;
q6output.innerHTML = "Pick An Image";

function q6clickPic(value) {
  if (value == 0) {
    q6output.innerHTML = "Function";
  } else {
    q6output.innerHTML = "Fashion";
  }
  update();
}

var q7slider = document.getElementById("q7");
var q7output = document.getElementById("q7text");
q7output.innerHTML = "Select A Number";

function q7clickPic(num) {
  q7slider.value = num;
  q7changeText();
}

q7slider.oninput = function() {
  if (this.value == 0) {
    q7output.innerHTML = "1-2";
  } else if (this.value == 1) {
    q7output.innerHTML = "3-4";
  } else {
    q7output.innerHTML = "5+";
  }
  update();
}

function q7changeText() {
  if (q7slider.value == 0) {
    q7output.innerHTML = "1-2";
  } else if (q7slider.value == 1) {
    q7output.innerHTML = "3-4";
  } else {
    q7output.innerHTML = "5+";
  }
  update();
}

var q8output = document.getElementById("q8text");
var value;
q8output.innerHTML = "Pick An Image";

function q8clickPic(value) {
  if (value == 0) {
    q8output.innerHTML = "Night At Home";
  } else {
    q8output.innerHTML = "Out On The Town";
  }
  update();
}

var q9slider = document.getElementById("q9");
var q9output = document.getElementById("q9text");
q9output.innerHTML = "Pick An Image";

function q9clickPic(num) {
  q9slider.value = num;
  q9changeText();
}

q9slider.oninput = function() {
  if (this.value == 0) {
    q9output.innerHTML = "Not At All";
  } else if (this.value == 1) {
    q9output.innerHTML = "A Little";
  } else if (this.value == 2) {
    q9output.innerHTML = "Above Average";
  } else {
    q9output.innerHTML = "I Hug Trees";
  }
  update();
}

function q9changeText() {
  if (q9slider.value == 0) {
    q9output.innerHTML = "Not At All";
  } else if (q9slider.value == 1) {
    q9output.innerHTML = "A Little";
  } else if (q9slider.value == 2) {
    q9output.innerHTML = "Above Average";
  } else {
    q9output.innerHTML = "I Hug Trees";
  }
  update();
}

var q11out = document.getElementById("q11results");
var q12out = document.getElementById("q12results");
var q13out = document.getElementById("q13results");
var q14out = document.getElementById("q14results");
var q15out = document.getElementById("q15results");
var q16out = document.getElementById("q16results");
var q17out = document.getElementById("q17results");
var q2out = document.getElementById("q2results");
var q3out = document.getElementById("q3results");
var q4out = document.getElementById("q4results");
var q5out = document.getElementById("q5results");
var q6out = document.getElementById("q6results");
var q7out = document.getElementById("q7results");
var q8out = document.getElementById("q8results");
var q9out = document.getElementById("q9results");

function update() {
  q11out.innerHTML = q11output.innerHTML;
  q12out.innerHTML = q12output.innerHTML;
  q13out.innerHTML = q13output.innerHTML;
  q14out.innerHTML = q14output.innerHTML;
  q15out.innerHTML = q15output.innerHTML;
  q16out.innerHTML = q16output.innerHTML;
  q17out.innerHTML = q17output.innerHTML;
  q2out.innerHTML = q2output.innerHTML;
  q3out.innerHTML = q3output.innerHTML;
  q4out.innerHTML = q4output.innerHTML;
  q5out.innerHTML = q5output.innerHTML;
  q6out.innerHTML = q6output.innerHTML;
  q7out.innerHTML = q7output.innerHTML;
  q8out.innerHTML = q8output.innerHTML;
  q9out.innerHTML = q9output.innerHTML;
}
