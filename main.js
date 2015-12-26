// _____ Start of "Backend" Code _____ //
var mainIn = document.getElementById("user-input"),
    mainOut = document.getElementById("text-output"),
    mainSubmit = document.getElementById("form-text");

mainSubmit.addEventListener("submit", onUserInput, false);

function writeToScreen(content) {
  var newMessage = document.createElement("p");
  newMessage.innerText = content;
  mainOut.appendChild(newMessage);
  mainOut.scrollTop = mainOut.scrollHeight;
};
function onUserInput(event) {
  event.preventDefault();
  writeToScreen(mainIn.value);
  mainOut.scrollTop = mainOut.scrollHeight;
  mainSubmit.reset();
};
// _____ End of "Backend" Code _____ //

// _____ Start of Single State Functions _____ //
function rando(min, max) { // Returns a random whole number between min and max (inclusive).
  return Math.floor(Math.random() * (max - min + 1)) + min; // Used for combat rolls.
};
function attackRoll(char) {
  return rando(0, char.attack);
};
function defenseRoll(char) {
  return rando(0, char.defense)
};
function checkExp(char) {
  // ((40 * 1.5) * 1.5) * 1.5 --- etc.
  var lvl = [0, 40, 100, 190, 325, 527, 830];
  if (char.exp < lvl[1]) {
    char.level = 1;
  } else if (char.exp >= lvl[1] && char.exp < lvl[2]) {
    char.level = 2;
  } else if (char.exp >= lvl[2] && char.exp < lvl[3]) {
    char.level = 3;
  } else if (char.exp >= lvl[3] && char.exp < lvl[4]) {
    char.level = 4;
  } else if (char.exp >= lvl[4] && char.exp < lvl[5]) {
    char.level = 5;
  } else if (char.exp >= lvl[5] && char.exp < lvl[6]) {
    char.level = 6;
  } else {
    writeToScreen("damn u scary");
    char.level = 1337;
  }
};
// _____ End of Single State Functions _____ //

// _____ Start of Constructors _____ //
var Character = function Character(cName) {
  this.name = cName,
  this.level = 1,
  this.exp = 0,
  this.hp = 8,
  this.attack = 2,
  this.defense = 2,
  this.inCombat = false,
  this.run = false;
};

var InstanceOfCombat = function InstanceOfCombat(p1, p2) {
  var p1DamageTaken = attackRoll(p2) - defenseRoll(p1),
      p2DamageTaken = attackRoll(p1) - defenseRoll(p2);

  if (p1DamageTaken < 0) {
    p1DamageTaken = 0;
  } // Convert all negative damage taken to 0
  if (p2DamageTaken < 0) {
    p2DamageTaken = 0;
  }

  p1.hp -= p1DamageTaken;
  p2.hp -= p2DamageTaken;
  p1.exp += (p2DamageTaken * 4);
  p2.exp += (p1DamageTaken * 4);

  if (p1.hp < 0) {
    p1.hp = 0;
  } // Prevent negative HP
  if (p2.hp < 0) {
    p2.hp = 0;
  }
  writeToScreen(p1.name + " damage taken: " + p1DamageTaken);
  writeToScreen(p2.name + " damage taken: " + p2DamageTaken);
  writeToScreen("...");
};

var Fight = function Fight(p1, p2) {
  p1.inCombat = true;
  p2.inCombat = true;

  var firstBlood = new InstanceOfCombat(p1, p2);
  while (p1.hp > 0 && p2.hp > 0 && p1.run === false && p2.run === false) {
    // Ask abut running here?     ---mainIn.value---
    var newBlood = new InstanceOfCombat(p1, p2);
  }

  checkExp(p1);
  p1.inCombat = false;
  p2.inCombat = false;
}
// _____ End of Constructors _____ //


var billy = new Character("Billy Bob Thornton");
var wesley = new Character("Wesley Snipes");
var fight1 =  new Fight(billy, wesley);
console.log(billy);
console.log(wesley);
