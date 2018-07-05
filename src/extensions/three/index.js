const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const THREE = require('three');

const iconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';
const menuIconURI = 'https://www.studycbsenotes.com/wp-content/uploads/2017/02/1971933n7Uqu8EB-1050x600.jpg';


class Three {

    constructor () {
    }

    getInfo () {
        return {
            id: 'three',
            name: 'Three.js',
            menuIconURI: menuIconURI,
            blockIconURI: iconURI,
            blocks: [

                {
                    opcode: 'create_scene',
                    text: 'Create a new scene',
                    blockType: BlockType.COMMAND,
                    func: 'createScene'
                },

                {
                    opcode: 'animate_scene',
                    text: 'Animate the existing scene',
                    blockType: BlockType.COMMAND,
                    func: 'animate'
                }

                // {
                //     opcode: 'line1',
                //     text: 'I met a traveler from an antique land',
                //     blockType: BlockType.COMMAND,
                //     func: 'noop'
                // },


                // {
                //     opcode: 'line2',
                //     text: 'Who said—“Two vast and trunkless legs of stone',
                //     blockType: BlockType.COMMAND,
                //     func: 'noop'
                // },

                // {
                //     opcode: 'line3',
                //     text: 'Stand in the desert. . . . Near them, on the sand,',
                //     blockType: BlockType.COMMAND,
                //     func: 'noop'
                // }

            ]
        };
    }

    createScene () {
        this.window = window.open("", "", "width=500,height=500");

        this.window.scene = new THREE.Scene();

        this.window.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        // this.window.camera = new THREE.PerspectiveCamera( 75, this.window.innerWidth / this.window.innerHeight, 0.1, 1000 );

        this.window.renderer = new THREE.WebGLRenderer();
        this.window.document.body.appendChild( this.window.renderer.domElement );

        this.window.renderer.setSize( 500, 500 );
        // this.window.renderer.setSize( this.window.innerWidth, this.window.innerHeight );

        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshBasicMaterial( { color: 0x800000, wireframe: true } );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.window.scene.add( this.cube );

        this.light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.window.scene.add( this.light );

        this.window.camera.position.z = 5;
    }

    animate () {
        this.cube.rotation.y += 0.005;
        this.cube.rotation.x += 0.005;
	      this.window.requestAnimationFrame( this.animate );
	      this.window.renderer.render( this.window.scene, this.window.camera );
    }

    noop () { }
}

module.exports = Three;
