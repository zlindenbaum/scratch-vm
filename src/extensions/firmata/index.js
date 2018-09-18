const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const WebusbFirmata = require('./p5.webusbFirmata.js');

const iconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';
const menuIconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';

var webusbFirmata;

class Firmata{
    getInfo () {
        return {
            id: 'Firmata',
            name: 'Firmata',
            menuIconURI: menuIconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    opcode: 'line1',
                    text: 'I met a traveler from an antique land',
                    blockType: BlockType.COMMAND,
                    func: 'noop'
                },

                {
                    opcode: 'connect',
                    text: 'Connect to Firmata Device',
                    blockType: BlockType.COMMAND,
                    func: '_connect'
                }
            ]
        };
    }

    _connect () {
        chrome.permissions.request({
            permissions: ['tabs'],
            origins: ['http://www.google.com/']
        }, function(granted) {
            // The callback argument will be true if the user granted the permissions.
            if (granted) {
                webusbFirmata = new WebusbFirmata();
                webusbFirmata.connect();
            } else {
                console.log('didn\'t grant permission');
            }
        });
    }

    noop () { }
}

module.exports = Firmata;
