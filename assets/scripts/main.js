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
function checkWinner(p1, p2) {
  if (p1.hp === 0) {
    return "p2";
  } else if (p2.hp === 0) {
    return "p1";
  } else {
    console.log("Wow the fight's over and they're both alive.  Something broke and IDK what.  Good luck finding it, loser.");
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

  p1.exp = p1.exp + p2DamageTaken;
  p2.exp = p2.exp + p1DamageTaken;

  // Prevent negative HP as described above
  if (p1.hp < 0) {
    p1.hp = 0;
  }
  if (p2.hp < 0) {
    p2.hp = 0;
  }

  console.log(p1AttackRoll, p1DefenseRoll, p2AttackRoll, p2DefenseRoll);
  console.log(p1DamageTaken, p2DamageTaken);
};

var Fight = function Fight(p1, p2) {
  // Insert check for in-combat players here

  p1.inCombat = true;
  p2.inCombat = true;

  var firstBlood = new InstanceOfCombat(p1, p2);

  while (canContinue(p1, p2)) {
    // Ask abut running here?
    var newBlood = new InstanceOfCombat(p1, p2);
  }

  if (checkWinner(p1, p2) === "p1") {
    console.log(p1.name + " is the winner.");
  } else if (checkWinner(p1, p2) === "p2") {
    console.log(p2.name + " is the winner.");
  } else {
    console.log("They're both dad.");
  }

  p1.inCombat = false;
  p2.inCombat = false;
}

// var expLvl1To6 = [40, 60, 90, 135, 202.5];
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
