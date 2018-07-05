const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const syllable = require('syllable');


const iconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';
const menuIconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';

class Ozymandias{
    getInfo () {
        return {
            id: 'ozymandias',
            name: 'Ozymandias',
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
                    opcode: 'line2',
                    text: 'Who said—“Two vast and trunkless legs of stone',
                    blockType: BlockType.COMMAND,
                    func: 'noop'
                },

                {
                    opcode: 'line3',
                    text: 'Stand in the desert. . . . Near them, on the sand,',
                    blockType: BlockType.COMMAND,
                    func: 'noop'
                },

                {
                    opcode: 'syl',
                    blockType: BlockType.REPORTER,
                    text: 'number of syllables in [TEXT]',
                    isTerminal: true,

                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'word'
                        }
                    },

                    func: '_syllable'
                }

            ]
        };
    }

    _syllable (args) {
        return syllable(args.TEXT);
    }

    noop () { }
}

module.exports = Ozymandias;
