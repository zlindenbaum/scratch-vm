const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const THREE = require('three');


const iconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';
const menuIconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';

var Scratch3d = function() {};

Scratch3d.prototype.getInfo = function() {
    return {
        id: 'scratch3d',
        name: 'Scratch3D',
        menuIconURI: menuIconURI,
        blockIconURI: iconURI,

        blocks: [
            {
                opcode: 'test_alert',
                text: 'Alert the tester',
                blockType: BlockType.COMMAND,
                func: 'testAlert'
            }
        ]
    };
};

Scratch3d.prototype.testAlert = function() {
    alert("Hi, mom!");
};

module.exports = Scratch3d;
