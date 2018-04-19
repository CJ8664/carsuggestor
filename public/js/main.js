var q11output = document.getElementById("q11text");
q11output.value = "Pick Your First Choice";
var q12output = document.getElementById("q12text");
q12output.value = "Pick Your Second Choice";
var q13output = document.getElementById("q13text");
q13output.value = "Pick Your Third Choice";
// var q14output = document.getElementById("q14text");
// q14output.value = "Pick Your Fourth Choice";
// var q15output = document.getElementById("q15text");
// q15output.value = "Pick Your Fifth Choice";
// var q16output = document.getElementById("q16text");
// q16output.value = "Pick Your Sixth Choice";
// var q17output = document.getElementById("q17text");
// q17output.value = "Pick Your Seventh Choice";
var slider = document.getElementById("q2");
var q2output = document.getElementById("q2text");
q2output.value = "Pick An Image";
var q3slider = document.getElementById("q3");
var q3output = document.getElementById("q3text");
q3output.value = "Pick An Image";
var q4output = document.getElementById("q4text");
q4output.value = "Pick An Image";
var q5output = document.getElementById("q5text");
q5output.value = "Pick An Image";
var q6output = document.getElementById("q6text");
q6output.value = "Pick An Image";
var q7slider = document.getElementById("q7");
var q7output = document.getElementById("q7text");
q7output.value = "Select A Number";
var q8output = document.getElementById("q8text");
q8output.value = "Pick An Image";
var q9slider = document.getElementById("q9");
var q9output = document.getElementById("q9text");
q9output.value = "Pick An Image";

function q11clickPic(value) {
  if (value == 0) {
    q11output.value = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q11output.value = "Unique";
  } else if (value == 2) {
    q11output.value = "Powerful";
  } else if (value == 3) {
    q11output.value = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q11output.value = "Socialite";
  } else if (value == 5) {
    q11output.value = "Classy";
  } else {
    q11output.value = "Practical";
  }
}

function q12clickPic(value) {
  if (value == 0) {
    q12output.value = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q12output.value = "Unique";
  } else if (value == 2) {
    q12output.value = "Powerful";
  } else if (value == 3) {
    q12output.value = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q12output.value = "Socialite";
  } else if (value == 5) {
    q12output.value = "Classy";
  } else {
    q12output.value = "Practical";
  }

}

function q13clickPic(value) {
  if (value == 0) {
    q13output.value = "Adventurous/Outdoorsy";
  } else if (value == 1) {
    q13output.value = "Unique";
  } else if (value == 2) {
    q13output.value = "Powerful";
  } else if (value == 3) {
    q13output.value = "Intellectual/Tech-Savvy";
  } else if (value == 4) {
    q13output.value = "Socialite";
  } else if (value == 5) {
    q13output.value = "Classy";
  } else {
    q13output.value = "Practical";
  }
}

// function q14clickPic(value) {
//   if (value == 0) {
//     q14output.value = "Adventurous/Outdoorsy";
//   } else if (value == 1) {
//     q14output.value = "Unique";
//   } else if (value == 2) {
//     q14output.value = "Powerful";
//   } else if (value == 3) {
//     q14output.value = "Intellectual/Tech-Savvy";
//   } else if (value == 4) {
//     q14output.value = "Socialite";
//   } else if (value == 5) {
//     q14output.value = "Classy";
//   } else {
//     q14output.value = "Practical";
//   }
// }
//
// function q15clickPic(value) {
//   if (value == 0) {
//     q15output.value = "Adventurous/Outdoorsy";
//   } else if (value == 1) {
//     q15output.value = "Unique";
//   } else if (value == 2) {
//     q15output.value = "Powerful";
//   } else if (value == 3) {
//     q15output.value = "Intellectual/Tech-Savvy";
//   } else if (value == 4) {
//     q15output.value = "Socialite";
//   } else if (value == 5) {
//     q15output.value = "Classy";
//   } else {
//     q15output.value = "Practical";
//   }
// }
//
// function q16clickPic(value) {
//   if (value == 0) {
//     q16output.value = "Adventurous/Outdoorsy";
//   } else if (value == 1) {
//     q16output.value = "Unique";
//   } else if (value == 2) {
//     q16output.value = "Powerful";
//   } else if (value == 3) {
//     q16output.value = "Intellectual/Tech-Savvy";
//   } else if (value == 4) {
//     q16output.value = "Socialite";
//   } else if (value == 5) {
//     q16output.value = "Classy";
//   } else {
//     q16output.value = "Practical";
//   }
// }
//
// function q17clickPic(value) {
//   if (value == 0) {
//     q17output.value = "Adventurous/Outdoorsy";
//   } else if (value == 1) {
//     q17output.value = "Unique";
//   } else if (value == 2) {
//     q17output.value = "Powerful";
//   } else if (value == 3) {
//     q17output.value = "Intellectual/Tech-Savvy";
//   } else if (value == 4) {
//     q17output.value = "Socialite";
//   } else if (value == 5) {
//     q17output.value = "Classy";
//   } else {
//     q17output.value = "Practical";
//   }
//
// }

function clickPic(num) {
  slider.value = num;
  changeText();
}

slider.oninput = function() {
  if (this.value == 0) {
    q2output.value = "No Money";
  } else if (this.value == 1) {
    q2output.value = "Some Money";
  } else if (this.value == 2) {
    q2output.value = "More Money";
  } else {
    q2output.value = "All The Money";
  }
}

function changeText() {
  if (slider.value == 0) {
    q2output.value = "No Money";
  } else if (slider.value == 1) {
    q2output.value = "Some Money";
  } else if (slider.value == 2) {
    q2output.value = "More Money";
  } else {
    q2output.value = "All The Money";
  }
}

function q3clickPic(num) {
  q3slider.value = num;
  q3changeText();
}

q3slider.oninput = function() {
  if (this.value == 0) {
    q3output.value = "Very Little";
  } else if (this.value == 1) {
    q3output.value = "Some";
  } else if (this.value == 2) {
    q3output.value = "A Moderate Amount";
  } else {
    q3output.value = "I Live In My Car";
  }

}

function q3changeText() {
  if (q3slider.value == 0) {
    q3output.value = "Very Little";
  } else if (q3slider.value == 1) {
    q3output.value = "Some";
  } else if (q3slider.value == 2) {
    q3output.value = "A Moderate Amount";
  } else {
    q3output.value = "I Live In My Car";
  }
}

function q4clickPic(value) {
  if (value == 0) {
    q4output.value = "Mountains";
  } else if (value == 1) {
    q4output.value = "Beach";
  } else if (value == 2) {
    q4output.value = "City";
  } else {
    q4output.value = "Countryside";
  }
}

function q5clickPic(value) {
  if (value == 0) {
    q5output.value = "City";
  } else if (value == 1) {
    q5output.value = "Small Town";
  } else if (value == 2) {
    q5output.value = "Mountains";
  } else {
    q5output.value = "Countryside";
  }
}

function q6clickPic(value) {
  if (value == 0) {
    q6output.value = "Function";
  } else {
    q6output.value = "Fashion";
  }
}

function q7clickPic(num) {
  q7slider.value = num;
  q7changeText();
}

q7slider.oninput = function() {
  if (this.value == 0) {
    q7output.value = "1-2";
  } else if (this.value == 1) {
    q7output.value = "3-4";
  } else {
    q7output.value = "5+";
  }
}

function q7changeText() {
  if (q7slider.value == 0) {
    q7output.value = "1-2";
  } else if (q7slider.value == 1) {
    q7output.value = "3-4";
  } else {
    q7output.value = "5+";
  }
}

function q8clickPic(value) {
  if (value == 0) {
    q8output.value = "Night At Home";
  } else {
    q8output.value = "Out On The Town";
  }
}

function q9clickPic(num) {
  q9slider.value = num;
  q9changeText();
}

q9slider.oninput = function() {
  if (this.value == 0) {
    q9output.value = "Not At All";
  } else if (this.value == 1) {
    q9output.value = "A Little";
  } else if (this.value == 2) {
    q9output.value = "Above Average";
  } else {
    q9output.value = "I Hug Trees";
  }
}

function q9changeText() {
  if (q9slider.value == 0) {
    q9output.value = "Not At All";
  } else if (q9slider.value == 1) {
    q9output.value = "A Little";
  } else if (q9slider.value == 2) {
    q9output.value = "Above Average";
  } else {
    q9output.value = "I Hug Trees";
  }
}
