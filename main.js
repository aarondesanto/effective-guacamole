// _____ Start of "Backend" Code _____ //
var mainIn = document.getElementById("user-input"),
    mainOut = document.getElementById("text-output"),
    mainSubmit = document.getElementById("form-text");

mainSubmit.addEventListener("submit", onUserInput, false);

function onUserInput(event) {
  event.preventDefault();
  writeToScreen(mainIn.value); // Write form input to mainOut
  mainOut.scrollTop = mainOut.scrollHeight; // Scroll to bottom
  mainSubmit.reset();
};

function writeToScreen(content) {
  var newMessage = document.createElement("p");
  newMessage.innerText = content;
  mainOut.appendChild(newMessage);
  mainOut.scrollTop = mainOut.scrollHeight; // Scroll to bottom
};
// _____ End of "Backend" Code _____ //


// ---------- Start of Library ---------- //
// -- //                     // -- //
// _____ Start of Single State Functions _____ //
function between(min, max) { // Used for combat rolls.
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function rundo(percentage) {
  var theRoll = between(1, 100);
  if (theRoll < percentage) {
    return true;
  } else {
    return false;
  }
};

function attackRoll(char) {
  return between(0, char.attack);
};

function defenseRoll(char) {
  return between(0, char.defense)
};

function checkAndAwardExp(char) {
  // ((40 * 1.5) * 1.5) * 1.5 --- etc.
  var lvl = [0, 40, 100, 190, 325, 527, 830],
      cxp = char.exp,
      clvl = char.level;

  function checkExp(lv1, lv2) {
    if (cxp >= lvl[lv1] && cxp < lvl[lv2]) {
      return true;
    }
    return false;
  }

  if (cxp < lvl[1]) {
    clvl = 1;
  } else if (checkExp(1, 2)) {
    clvl = 2;
  } else if (checkExp(2, 3)) {
    clvl = 3;
  } else if (checkExp(3, 4)) {
    clvl = 4;
  } else if (checkExp(4, 5)) {
    clvl = 5;
  } else if (checkExp(5, 6)) {
    clvl = 6;
  } else {
    writeToScreen("damn u scary");
    clvl = 1337;
  };
};

function createNewBlood(p1, p2) {
  var textOut = document.getElementById("text-output");
  if (textOut.lastChild.innerText === ("run" || "RUN" || "Run")) {
    if (canRun(p1, p2)) {
      return false;
    }
  }
  var newBlood = new InstanceOfCombat(p1, p2); // The actual IOC

  if (p1.hp > 0 && p2.hp > 0) { //
    var nextBlood = window.setTimeout(createNewBlood, 1500, p1, p2); // Calls itself
  } else {
    checkAndAwardExp(p1);
    checkAndAwardExp(p2);

    p1.inCombat = p2.inCombat = false;
  }
};

function canRun(p1, p2) {
  var roll = 0;
  function passFail(input) {
    if (input) {
      writeToScreen("You run away like a chicken.  Bwak bwak bwak.");
    } else {
      writeToScreen("You try and fail to run.");
    }
  }

  if (p1.level <= p2.level - 4) {
    roll = rundo(10);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level - 3) {
    roll = rundo(20);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level - 2) {
    roll = rundo(30);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level - 1) {
    roll = rundo(40);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level) {
    roll = rundo(50);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level + 1) {
    roll = rundo(60);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level + 2) {
    roll = rundo(70);
    passFail(roll);
    return roll;
  } else if (p1.level === p2.level + 3) {
    roll = rundo(80);
    passFail(roll);
    return roll;
  } else if (p1.level >= p2.level + 4) {
    roll = rundo(90);
    passFail(roll);
    return roll;
  } else {
    console.log("There was an error at canRun() on line 75ish.");
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
  this.inCombat = false;
};

var InstanceOfCombat = function InstanceOfCombat(p1, p2) {
  var p1Damage = attackRoll(p1) - defenseRoll(p2),
      p2Damage = attackRoll(p2) - defenseRoll(p1);

  if (p1Damage < 0) {
    p1Damage = 0;
  } // Convert all negative damage taken to 0
  if (p2Damage < 0) {
    p2Damage = 0;
  }

  p1.hp -= p2Damage;
  p2.hp -= p1Damage;
  p1.exp += (p1Damage * 4);
  p2.exp += (p2Damage * 4);

  if (p1.hp < 0) {
    p1.hp = 0;
  } // Prevent negative HP
  if (p2.hp < 0) {
    p2.hp = 0;
  }

  writeToScreen(p1.name + " damage taken: " + p2Damage);
  writeToScreen(p2.name + " damage taken: " + p1Damage);
  writeToScreen("...");
};

var Fight = function Fight(p1, p2) {
  if (p1.hp > 0 && p2.hp > 0) {
    p1.inCombat = p2.inCombat = true;
    var nextBlood = window.setTimeout(createNewBlood, 1500, p1, p2);
  } else {
    if (p1.hp === 0) {
      writeToScreen("Cannot start fight. " + p1.name + " is dead.");
    }
    if (p2.hp === 0) {
      writeToScreen("Cannot start fight. " + p2.name + " is dead.");
    }
  }
};
// _____ End of Constructors _____ //
// -- //                     // -- //
// ---------- End of Library ---------- //


var billy = new Character("Billy Bob Thornton"),
    wesley = new Character("Wesley Snipes"),
    bruce = new Character("Bruce Willis"),
    chuck = new Character("Chuck Norris"),
    jet = new Character("Jet Li"),
    jackie = new Character("Jackie Chan"),
    snoop = new Character("Snoop Dogg"),
    stephen = new Character("Stephen Colbert");

chuck.attack = 9001;
chuck.level = 1337;
chuck.exp = 999999999999999;
bruce.level = 5;
jet.level = 10;
jackie.level = 6;
snoop.level = 2;
stephen.level = 3;


var fight1 =  new Fight(billy, wesley);
