class AnyKey extends Phaser.Scene {
    constructor() {
        super("anykeyScene");
    }

    preload() {
        this.load.path = "assets/";
        this.load.image('skull', 'skull.png');
    }

    create() {
        // print message
        this.add.text(centerX, centerY, 'Press any key to continue').setOrigin(0.5);

        // monitor any key down
        this.input.keyboard.on('keydown', () => {
            // switch scenes
            this.scene.start("cursorsScene");
        }, this);
    }
}

class Cursors extends Phaser.Scene {
    constructor() {
        super("cursorsScene");
    }

    create() {
        // new bg color
        this.cameras.main.backgroundColor = 0x000022;

        // print message
        this.add.text(centerX, centerY, 'Cursors Scene').setOrigin(0.5);

        // define cursors
        const cursors = this.input.keyboard.createCursorKeys();
        console.log(cursors);
    }
}

// game configuration
let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    scene: [ AnyKey, Cursors ],
}

let game = new Phaser.Game(config);

// some globals
let w = game.config.width;
let h = game.config.height;
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;