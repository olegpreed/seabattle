let bigShip = document.querySelector(".me .big");
let subMarines = document.querySelectorAll(".me .sub");
let mediumBoat = document.querySelectorAll(".me .medium");
let smallBoat = document.querySelectorAll(".me .small");

const tableSlots = document.querySelectorAll("td");
let chooseWeapon = [0, 0, 0, 0];

let ShipState = {
  chosenOne: 0,
  coordinates: [0, 0, 0, 0],
  hits: 0,
  size: 0
};
for (let i = 0; i < smallBoat.length; i++) {
  smallBoat[i] = Object.assign(smallBoat[i], ShipState);
  smallBoat[i].size = 1
}
for (let i = 0; i < mediumBoat.length; i++) {
  mediumBoat[i] = Object.assign(mediumBoat[i], ShipState);
  mediumBoat[i].size = 2
}
for (let i = 0; i < subMarines.length; i++) {
  subMarines[i] = Object.assign(subMarines[i], ShipState);
  subMarines[i].size = 3
}
bigShip = Object.assign(bigShip, ShipState);
bigShip.size = 4

addEventListener("click", (e) => console.log(chooseWeapon, smallBoat));

bigShip.addEventListener("click", (e) => {
  if (chooseWeapon.every((e) => e === 0)) {
    bigShip.style.filter = "opacity(10%)";
    chooseWeapon = [1, 0, 0, 0];
    bigShip.chosenOne = 1
  } else if (chooseWeapon[0] === 1) {
    bigShip.style.filter = "opacity(100%)";
    chooseWeapon = [0, 0, 0, 0];
    bigShip.chosenOne = 0
  }
});

for (let i = 0; i < subMarines.length; i++) {
  subMarines[i].addEventListener("click", (e) => {
    if (chooseWeapon.every((e) => e === 0)) {
      subMarines[i].style.filter = "opacity(10%)";
      chooseWeapon = [0, 1, 0, 0];
      subMarines[i].chosenOne = 1
    } else if (chooseWeapon[1] === 1) {
      subMarines[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      subMarines[i].chosenOne = 0
    }
  });
}

for (let i = 0; i < mediumBoat.length; i++) {
  mediumBoat[i].addEventListener("click", (e) => {
    if (chooseWeapon.every((e) => e === 0)) {
      mediumBoat[i].style.filter = "opacity(10%)";
      chooseWeapon = [0, 0, 1, 0];
      mediumBoat[i].chosenOne = 1
    } else if (chooseWeapon[2] === 1) {
      mediumBoat[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      mediumBoat[i].chosenOne = 0
    }
  });
}

for (let i = 0; i < smallBoat.length; i++) {
  smallBoat[i].addEventListener("click", (e) => {
    if (
      chooseWeapon.every((e) => e === 0) &&
      smallBoat[i].style.filter != "opacity(10%)"
    ) {
      smallBoat[i].style.filter = "opacity(10%)";
      chooseWeapon = [0, 0, 0, 1];
      smallBoat[i].chosenOne = 1
    } else if (chooseWeapon[3] === 1) {
      smallBoat[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      smallBoat[i].chosenOne = 0
    }
  });
}

for (let j = 0; j < tableSlots.length; j++) {
  tableSlots[j].addEventListener("click", (e) => {
    if (
      chooseWeapon[3] === 1 &&
      tableSlots[j].style.backgroundColor != "black"
    ) {
      tableSlots[j].style.backgroundColor = "black";
      chooseWeapon = [0, 0, 0, 0];
    } else if (tableSlots[j].style.backgroundColor === "black") {
      tableSlots[j].style.backgroundColor = "rgb(208 208 208)";
      chooseWeapon = [0, 0, 0, 1];
    }
  });
}
