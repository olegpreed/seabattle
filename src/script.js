let bigShip = document.querySelector(".me .big");
let subMarines = document.querySelectorAll(".me .sub");
let mediumBoat = document.querySelectorAll(".me .medium");
let smallBoat = document.querySelectorAll(".me .small");

const tableSlotsMe = document.querySelectorAll(".gridfield.me > div");
let chooseWeapon = [0, 0, 0, 0];
let wait = 0;

let ShipState = {
  chosenOne: 0,
  coordinates: [-1, -1, -1, -1],
  hits: 0,
  size: 0,
  index: 0,
};
for (let i = 0; i < smallBoat.length; i++) {
  smallBoat[i] = Object.assign(smallBoat[i], ShipState);
  smallBoat[i].size = 1;
  smallBoat[i].index = i;
}
for (let i = 0; i < mediumBoat.length; i++) {
  mediumBoat[i] = Object.assign(mediumBoat[i], ShipState);
  mediumBoat[i].size = 2;
  mediumBoat[i].index = i;
}
for (let i = 0; i < subMarines.length; i++) {
  subMarines[i] = Object.assign(subMarines[i], ShipState);
  subMarines[i].size = 3;
  subMarines[i].index = i;
}
bigShip = Object.assign(bigShip, ShipState);
bigShip.size = 4;

addEventListener("click", function () {
  console.log(mediumBoat);
});

bigShip.addEventListener("click", (e) => {
  if (chooseWeapon.every((e) => e === 0)) {
    bigShip.style.filter = "opacity(10%)";
    chooseWeapon = [1, 0, 0, 0];
    bigShip.chosenOne = 1;
  } else if (chooseWeapon[0] === 1) {
    bigShip.style.filter = "opacity(100%)";
    chooseWeapon = [0, 0, 0, 0];
    bigShip.chosenOne = 0;
  }
});

for (let i = 0; i < subMarines.length; i++) {
  subMarines[i].addEventListener("click", (e) => {
    if (chooseWeapon.every((e) => e === 0)) {
      subMarines[i].style.filter = "opacity(10%)";
      chooseWeapon = [0, 1, 0, 0];
      subMarines[i].chosenOne = 1;
    } else if (chooseWeapon[1] === 1 && subMarines[i].chosenOne === 1) {
      subMarines[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      subMarines[i].chosenOne = 0;
    }
  });
}

for (let i = 0; i < mediumBoat.length; i++) {
  mediumBoat[i].addEventListener("click", (e) => {
    if (chooseWeapon.every((e) => e === 0)) {
      mediumBoat[i].style.filter = "opacity(10%)";
      chooseWeapon = [0, 0, 1, 0];
      mediumBoat[i].chosenOne = 1;
    } else if (chooseWeapon[2] === 1 && mediumBoat[i].chosenOne === 1) {
      mediumBoat[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      mediumBoat[i].chosenOne = 0;
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
      smallBoat[i].chosenOne = 1;
    } else if (chooseWeapon[3] === 1 && smallBoat[i].chosenOne === 1) {
      smallBoat[i].style.filter = "opacity(100%)";
      chooseWeapon = [0, 0, 0, 0];
      smallBoat[i].chosenOne = 0;
    }
  });
}

for (let j = 0; j < tableSlotsMe.length; j++) {
  tableSlotsMe[j].addEventListener("click", (e) => {
    if (
      chooseWeapon[3] === 1 &&
      tableSlotsMe[j].style.backgroundColor != "black"
    ) {
      tableSlotsMe[j].style.backgroundColor = "black";
      chooseWeapon = [0, 0, 0, 0];
      for (e of smallBoat)
        if (e.chosenOne === 1) {
          e.chosenOne = 3;
          e.coordinates = [
            j % 10,
            (j - (j % 10)) / 10,
            j % 10,
            (j - (j % 10)) / 10,
          ];
        }
    } else if (tableSlotsMe[j].style.backgroundColor === "black") {
      tableSlotsMe[j].style.backgroundColor = "rgb(208 208 208)";
      for (e of smallBoat)
        if (
          e.chosenOne === 3 &&
          j === e.coordinates[1] * 10 + e.coordinates[0]
        ) {
          e.chosenOne = 0;
          e.coordinates = [-1, -1, -1, -1];
          smallBoat[e.index].style.filter = "opacity(100%)";
        }
      for (e of mediumBoat)
        if (
          (e.chosenOne === 2 || e.chosenOne === 3) &&
          (j === e.coordinates[1] * 10 + e.coordinates[0] || j === e.coordinates[3] * 10 + e.coordinates[2])
        ) {
            if (e.chosenOne === 3) {
            if (j === e.coordinates[3] * 10 + e.coordinates[2]) tableSlotsMe[e.coordinates[1] * 10 + e.coordinates[0]].style.backgroundColor = "rgb(208 208 208)";
            else if (j === e.coordinates[1] * 10 + e.coordinates[0]) tableSlotsMe[e.coordinates[3] * 10 + e.coordinates[2]].style.backgroundColor = "rgb(208 208 208)";
            }
          e.chosenOne = 0;
          e.coordinates = [-1, -1, -1, -1];
          wait = 0;
          mediumBoat[e.index].style.filter = "opacity(100%)";
        }
      chooseWeapon = [0, 0, 0, 0];
    } else if (
      !wait &&
      chooseWeapon[2] === 1 &&
      tableSlotsMe[j].style.backgroundColor != "black"
    ) {
      wait = 1;
      tableSlotsMe[j].style.backgroundColor = "black";
      for (e of mediumBoat)
        if (e.chosenOne === 1) {
          e.chosenOne = 2;
          e.coordinates = [j % 10, (j - (j % 10)) / 10, -1, -1];
        }
    }
    else if (wait) {
        for (e of mediumBoat) {
            if (e.chosenOne === 2 && 
                ((j === e.coordinates[1] * 10 + e.coordinates[0] + 10) || 
                (j === e.coordinates[1] * 10 + e.coordinates[0] - 10) || 
                (j === e.coordinates[1] * 10 + e.coordinates[0] - 1) || 
                (j === e.coordinates[1] * 10 + e.coordinates[0] + 1))) {
                    e.chosenOne = 3;
                    tableSlotsMe[j].style.backgroundColor = "black";
                    chooseWeapon = [0, 0, 0, 0];
                    e.coordinates = [j % 10, (j - (j % 10)) / 10, -1, -1];
                    wait = 0
                }
        }
    }
  });
}
