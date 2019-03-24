// Rover Object Goes Here
// ======================
var rover = {
  n: true,
  s: false,
  e: false,
  w: false,
  x: 0,
  y: 0,
  travelLog: ["[0,0]"]
};
// ======================

var roverDirection = "n";
//var orders = "rhffrf"; //Ignore wrong commands
//var orders = "rhffbb"; //Go backwards
//var orders = "rfflf"; //Try to go outside the grid
var orders = "rffrflf"; //Step into an obstacle

var gridRover = [
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "S", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""]
];
var stoppedByObstacle = false;

function turnLeft(rover) {
  switch (true) {
    case rover.n:
      rover.w = true;
      rover.n = false;
      rover.s = false;
      rover.e = false;
      roverDirection = "w";
      previousCommand = "Turn Left";
      console.log("Rover is facing West");
      break;
    case rover.s:
      rover.w = false;
      rover.n = false;
      rover.s = false;
      rover.e = true;
      roverDirection = "e";
      previousCommand = "Turn Left";
      console.log("Rover is facing East");
      break;
    case rover.e:
      rover.w = false;
      rover.n = true;
      rover.s = false;
      rover.e = false;
      roverDirection = "n";
      previousCommand = "Turn Left";
      console.log("Rover is facing North");
      break;
    case rover.w:
      rover.w = false;
      rover.n = false;
      rover.s = true;
      rover.e = false;
      roverDirection = "s";
      previousCommand = "Turn Left";
      console.log("Rover is facing South");
      break;
  }
}

function turnRight(rover) {
  switch (true) {
    case rover.n:
      rover.n = false;
      rover.w = true;
      rover.n = false;
      rover.s = false;
      rover.e = true;
      roverDirection = "e";
      console.log("Rover is facing East");
      break;
    case rover.s:
      rover.w = true;
      rover.n = false;
      rover.s = false;
      rover.e = false;
      roverDirection = "w";
      console.log("Rover is facing West");
      break;
    case rover.e:
      rover.w = false;
      rover.n = false;
      rover.s = true;
      rover.e = false;
      roverDirection = "s";
      console.log("Rover is facing South");
      break;
    case rover.w:
      rover.w = false;
      rover.n = true;
      rover.s = false;
      rover.e = false;
      roverDirection = "n";
      console.log("Rover is facing North");
      break;
  }
}

function moveForward(rover) {
  switch (roverDirection) {
    case "n":
      if (rover.y !== 0 && gridRover[rover.y - 1][rover.x] !== "S") {
        rover.y = rover.y - 1;
        rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
        console.log("Advancing to [" + rover.x + ", " + rover.y + "]");
      } else {
        console.log(
          "Reporting an obstacle at [" + rover.x + ", " + rover.y + "]"
        );
        stoppedByObstacle = true;
      }
      break;
    case "s":
      if (rover.y !== 9 && gridRover[rover.y + 1][rover.x] !== "S") {
        rover.y = rover.y + 1;
        rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
        console.log("Advancing to [" + rover.x + ", " + rover.y + "]");
      } else {
        console.log(
          "Reporting an obstacle at [" + rover.x + ", " + rover.y + "]"
        );
        stoppedByObstacle = true;
      }
      break;
    case "e":
      if (rover.x !== 9 && gridRover[rover.y][rover.x + 1] !== "S") {
        rover.x = rover.x + 1;
        rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
        console.log("Advancing to [" + rover.x + ", " + rover.y + "]");
      } else {
        console.log(
          "Reporting an obstacle at [" + rover.x + ", " + rover.y + "]"
        );
        stoppedByObstacle = true;
      }
      break;
    case "w":
      if (rover.x !== 0 && gridRover[rover.y][rover.x - 1] !== "S") {
        rover.x = rover.x - 1;
        rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
        console.log("Advancing to [" + rover.x + ", " + rover.y + "]");
      } else {
        console.log(
          "Reporting an obstacle at [" + rover.x + ", " + rover.y + "]"
        );
        stoppedByObstacle = true;
      }
      break;
  }
}

function moveBackward(rover) {
  switch (roverDirection) {
    case "n":
      if (rover.y !== 0) {
        rover.y = rover.y + 1;
      }
      console.log("Coordenadas: [" + rover.x + ", " + rover.y + "]");
      rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
      break;
    case "s":
      if (rover.y !== 9) {
        rover.y = rover.y - 1;
      }
      console.log("Coordenadas: [" + rover.x + ", " + rover.y + "]");
      rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
      break;
    case "e":
      if (rover.x !== 9) {
        rover.x = rover.x - 1;
      }
      console.log("Coordenadas: [" + rover.x + ", " + rover.y + "]");
      rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
      break;
    case "w":
      if (rover.x !== 0) {
        rover.x = rover.x + 1;
      }
      console.log("Coordenadas: [" + rover.x + ", " + rover.y + "]");
      rover.travelLog.push("[" + rover.x + ", " + rover.y + "]");
      break;
  }
}

function destination(orders) {
  for (var i = 0; i < orders.length; i++) {
    if (
      orders[i] === "l" ||
      orders[i] === "r" ||
      orders[i] === "f" ||
      orders[i] === "b"
    ) {
      switch (orders[i]) {
        case "l":
          turnLeft(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
      }
    }
  }
  console.log(rover.travelLog);
}

destination(orders);
