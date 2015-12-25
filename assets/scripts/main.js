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


function rando(min, max) { // Returns a random whole number between min and max (inclusive).
  return Math.floor(Math.random() * (max - min + 1)) + min; // Used for combat rolls.
};
function attackRoll(char) {
  return rando(0, char.attack);
};
function defenseRoll(char) {
  return rando(0, char.defense)
};
function canContinue(p1, p2) {
  if (p1.hp > 0) {
    if (p2.hp > 0) {
      if (p1.run === false) {
        if (p2.run === false) {
          return true;
        }
      }
    }
  }
  return false;
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
    console.log("damn u scary");
    char.level = 1337;
  }
};

var InstanceOfCombat = function InstanceOfCombat(p1, p2) {
  var p1DamageTaken = 0,
      p2DamageTaken = 0,
      p1AttackRoll = attackRoll(p1),
      p1DefenseRoll = defenseRoll(p1),
      p2AttackRoll = attackRoll(p2),
      p2DefenseRoll = defenseRoll(p2);

  p1DamageTaken = p2AttackRoll - p1DefenseRoll;
  p2DamageTaken = p1AttackRoll - p2DefenseRoll;

  // An attack roll of 0 minus a defense roll of >0 causes players to take negative damage.
  if (p1DamageTaken < 0) {  // This converts all negative damage to 0.
    p1DamageTaken = 0;
  }
  if (p2DamageTaken < 0) {
    p2DamageTaken = 0;
  }

  p1.hp = p1.hp - p1DamageTaken;
  p2.hp = p2.hp - p2DamageTaken;

  p1.exp = p1.exp + (p2DamageTaken * 4);
  p2.exp = p2.exp + (p1DamageTaken * 4);

  // Prevent negative HP as described above
  if (p1.hp < 0) {
    p1.hp = 0;
  }
  if (p2.hp < 0) {
    p2.hp = 0;
  }

  console.log("p1 att: " + p1AttackRoll, "p1 def: " + p1DefenseRoll, "p2 att: " + p2AttackRoll, "p2 def: " + p2DefenseRoll);
  console.log("p1 dmg: " + p1DamageTaken, "p2 dmg: " + p2DamageTaken);
};

var Fight = function Fight(p1, p2) {
  p1.inCombat = true;
  p2.inCombat = true;

  billy.attack = 666; // DEBUG PURPOSES ONLY

  var firstBlood = new InstanceOfCombat(p1, p2);

  while (canContinue(p1, p2)) {
    // Ask abut running here?
    var newBlood = new InstanceOfCombat(p1, p2);
  }

  checkExp(p1);

  p1.inCombat = false;
  p2.inCombat = false;
}

// var NPCDB = [
//   {
//     id: 10,
//     name: "Locust",
//     hp: 3,
//     attack: 1,
//     defense: 1
//   }
// ];

var billy = new Character("BillyBobThorton");
var wesley = new Character("WesleySnipes");
var fight1 =  new Fight(billy, wesley);

console.log(billy);
console.log(wesley);
