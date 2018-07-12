var BlockType = require('../../extension-support/block-type');
var ArgumentType = require('../../extension-support/argument-type');
var THREE = require('three');


var iconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';
var menuIconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';

var alphanums = "abcdefghijklmnopqrstuvwxyz1234567890";


var win = null;
var canvas = null;
var ctx = null;
var lastKeyEvent = null;
// Lets us know if we are opening a new window and a new sesion has begon
var newSession = true;

//This obect will hold all of the collisons data returned from the raycaster
//it holds objects that where previously touch on the last update of the raycaster
//Every time the raycaster updates it will send a new object holding the information
//of which objects our touching. If the scene elements are not in this object then 
//they are not touching.
var collisions = null;
//A list of all the objects that currently have raycasters connected to them
//and all the objects that raycaster is checking
var raycasters = [];

/*
**Mouse Controles
*/
var mouseData = null;
var getMouseData = false;
var getMousePostion = false;
var getMouseClicked = false;
var getMouseUp = false;
var getMouseDown = false;
var getMouseDoubleClicked = false;
var mouseX =null;
var mouseY =null;
var mouseClick = false;
var mousedbClick = false;
var mouseDown = false;
var mouseUp = false;

//var liveURL = "http://localhost:8888/main.html";
var shapes = [];
var materials = [];
var charecters = [];
//var liveURL = "http://033ae09.netsolhost.com//gsd2014team5/Localhost/main.html";
//var liveURL = "http://goodwinj14.github.io/Scratch3D_Beta/server/scratch3d.html";
var liveURL = "http://scratch3d.github.io/tierOne%20/Scratch3D_Beta/server/scratch3d.html";


var raycaster = null;

var Scratch3d = function() {

};

var ext = Scratch3d.prototype;

ext.getInfo = function() {


    var info = {
        id: 'scratch3d',
        name: 'Scratch3D',
        menuIconURI: menuIconURI,
        blockIconURI: iconURI,

        blocks: [{
                opcode: 'testAlert',
                text: 'Alert the tester',
                blockType: BlockType.COMMAND,
                func: 'testAlert'
            },

            {
                opcode: 'initWorld',
                text: 'New 3D World [SCENES] Height: [HEIGHT] Width: [WIDTH]',
                blockType: BlockType.COMMAND,
                func: 'initWorld',

                arguments: {
                    SCENES: {
                        type: ArgumentType.STRING,
                        menu: 'Scenes',
                        defaultValue: 'Grass'
                    },

                    HEIGHT: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    },

                    WIDTH: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                }
            },

            {
                opcode: 'camControls',
                text: 'Add Camera Controls [CAMERACONTROLS] Move Speed: [MOVESPEED] Look Speed: [LOOKSPEED]',
                func: 'testAlert',

                arguments: {
                    CAMERACONTROLS: {
                        type: ArgumentType.STRING,
                        menu: 'CameraControls',
                        defaultValue: 'First Person'
                    },

                    MOVESPEED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    },

                    LOOKSPEED: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 2
                    }
                }
            },

            {
                opcode: 'moveCamera',
                text: "Move Camera [MOVE] [STEPS] steps",
                func: 'testAlert',

                arguments: {
                    MOVE: {
                        type: ArgumentType.STRING,
                        menu: 'Move',
                        defaultValue: 'Direction'
                    },

                    STEPS: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1
                    }
                }
            }


        ],

        menus: {
            Scenes: ['Grid', 'Grass', 'Space', 'Blank'],
            Toggle: ['On', 'Off'],
            Camera: ['Perspective'],
            CameraRotation: ['Left', 'Right', 'Up', 'Down', 'Roll Left', 'Roll Right'],
            CameraOrbit: ['Orbit Left', 'Orbit Right', 'Orbit Up', 'Orbit Down'],
            CameraControls: ['First Person', 'Mouse/Trackball'],
            Sides: ['Back', 'Front'],
            Move: ['Left', 'Right', 'Up', 'Down', 'Forward', 'Back'],
            Shapes: ['Cube', 'Sphere', 'Circle', 'Cylinder', 'Dodecahedron', 'Icosahedron', 'Plane', 'Ring', 'Torus'],
            Planets: ['Earth', 'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto! #savepluto'],
            Materials: ['MeshBasicMaterial', 'MeshNormalMaterial', 'MeshDepthMaterial', 'MeshLambertMaterial', 'MeshPhongMaterial'],
            Images: ['Crate', 'Brick', 'Earth', 'Moon', 'Grass', 'dirt'],
            Keys: ['space', 'up arrow', 'down arrow', 'right arrow', 'left arrow', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
            Charecters: ['Marine', 'Car', 'Cat', 'Cat1', 'Lego Vader', 'Pirate Ship'],
            Lights: ['Ambient', 'Directional', 'Point'],
            Axis3: ['X', 'Y', 'Z'],
            Axis2: ['X', 'Y'],
            MouseOptions: ['Click', 'Down', 'Up', 'Double Click'],
        }
    };

    return info;
};

ext.testAlert = function() {
    alert("Hi, mom!");
};



ext.initWorld = function(scene, width, height, callback) {
    //Opens the three.js window
    //win = window.open (liveURL, "", "width=window.width, height=window.height");
    //Test URLS

    //Clear data from past runs
    collisions = null;
    charecters = new Array();
    materials = new Array();
    shapes = new Array();
    raycaster = new Array();
    //--------------------------

    window.addEventListener("message", receiveMessage, false);

    function receiveMessage() {
        //The command key is experes by KEYNAME_ the key name allows use to know what the message 
        //Type is.
        //Retrevies the command Key of the message denoting which function to call
        var commandKey = null;

        if (event.data.eventType != null) {
            if (event.data.eventType == "MOUSEEVENT") {
                mouseData = event.data;
            }
        } else {
            commandKey = event.data.split("_")[0];
            //the actual data to be procesed by the extention
            var data = event.data.split("_")[1];
            if (commandKey == "KEYSTROKE") {
                lastKeyEvent = data;
            } else if (commandKey == "RAYCASTTOUCH") {
                var collisionData = [];
                var objSpilt = data.split(";");
                console.log("objSpilt ;", objSpilt);
                for (var i = objSpilt.length - 2; i >= 0; i--) {
                    temp = objSpilt[i].split(":");
                    collisionData[temp[0]] = temp[1].split(",");
                };
                collisions = new Object({
                    data: collisionData
                });
                console.log("collisions", collisions);
            }
        }
    }
    win = window.open(liveURL, "", "width=window.width, height=window.height");
    //newSession = false;
    /*
     **Checks Browser Version in win returns null
     **
     */
    if (win == null) {
        var browserData = navigator.userAgent;
        if (browserData.indexOf("Safari") > -1) {
            alert("This extension must open in a separate window. \rTo run please enable pop-ups from this site. \rTo enable PopUps: \rClick Safari, \rClick Preferences, \rClick security, \rUncheck Block pop-up windows, \rThen refresh page. ");
        }
    }
    //**//

    setTimeout(function() {
        var message = "INIT_" + scene + "," + width + "," + height;
        win.postMessage(message, liveURL);
        callback(); //Calls back to Scaratch proggram to allow exicution flow to reStart once the page has been loaded
    }, 3000);
};




ext._shutdown = function() {};

// Status reporting code
// Use this to report missing hardware, plugin or unsupported browser
ext._getStatus = function() {
    return {
        status: 2,
        msg: 'Ready'
    };
};

// ext.initWorld = function(sceneType, width, height) {
//     SCENETYPE = "Grass";
//     SCENEWIDTH = "10";
//     SCENEHEIGHT = "10";
//     sceneWindow = window.open();
//     var script = document.createElement('script');
//     script.onload = function() {
//         alert("Script loaded and ready");
//     };
//     script.src = "http://whatever.com/the/script.js";
// };

ext.uploadFile = function() {
    console.log("Space3", sceneWindow.document);
    console.log("Hello", sceneWindow.connectionTest("World"));
    var sceneParams = ["sceneType", "width", "height"];
    sceneWindow.init_window(sceneParams);
};

module.exports = Scratch3d;
