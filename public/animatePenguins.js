var lastCall, fps;

function detectFps() {
    var delta;
    if (lastCall) {
        delta = (Date.now() - lastCall)/1000;
        lastCall = Date.now();
        fps = 1/delta;
    } else {
        lastCall = Date.now();
        fps = 0;
    }
}

function updatePenguins() {
    detectFps();
    for (var i = 0; i < penguinArray.length; i++) {
        penguinArray[i].doUpdate();
    }
    requestAnimationFrame(updatePenguins);
}

// Each index is every 10 pixels
var boundary = [
    [400,500],
    [300,500],
    [300,600],
    [250,650],
    [250,700],
    [230,1000],
    [210,1150],
    [200,1150],
    [190,1200],
    [180,1200],
    [50,1200],
    [50,1200],
    [50,1200],
    [50,1200],
    [50,1200],
    [50,1200],
    [50,1150],
    [50,1130],
    [50,1110],
    [50,1100],
    [50,1090],
    [50,1070],
    [50,1050],
    [50,1030],
    [100,1000],
    [100,900],
];
var gap = 10;
var numPenguins = 38;
var penguinArray = [];

for (var i = 0; i < numPenguins; i++) {
    var penguinObj = document.getElementById(`penguin${i+1}`);
    var randomSpeed = 1;
    var randomAxis = Math.floor(Math.random() * boundary.length);
    var penguin = new WalkingPenguin(boundary, gap, boundary[randomAxis][0], boundary[randomAxis][1], randomAxis*gap, randomSpeed, penguinObj);
    penguinArray.push(penguin);
}

detectFps();
requestAnimationFrame(updatePenguins);