// Nathan Altice
// Updated: 4/20/23
// Low Key
// Demonstrating a few Phaser Keyboard events and objects

class AnyKey extends Phaser.Scene {
    constructor() {
        super('anykeyScene');
    }

    preload() {
        // load our assets
        this.load.path = 'assets/';
        this.load.image('balloon', 'balloon.png');
        this.load.image('skull', 'skull.png');
        this.load.image('cursed', 'cursed.jpg');
    }

    create() {
        // print message
        this.add.text(centerX, centerY, 'Press any key to continue').setOrigin(0.5);

        // monitor *any* key down...
        this.input.keyboard.on('keydown', () => {
            this.scene.start('cursorsScene');   // ...and switch scenes
        }, this);   // <-- note `this` allows you to pass current context to the event
    }
}

class Cursors extends Phaser.Scene {
    constructor() {
        super('cursorsScene');
    }

    create() {
        // new bg color
        this.cameras.main.setBackgroundColor('#0000AA');

        // print messages
        this.message = this.add.text(centerX, centerY, '').setOrigin(0.5);
        this.add.text(centerX, height-100, 'Cursors (Press arrows, shift, or space)').setOrigin(0.5);
        this.add.text(centerX, height-50, 'Press \'C\' to Change scene').setOrigin(0.5);

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('C');
    }

    update() {
        // check for all cursors object keys
        if (cursors.up.isDown) {
            this.message.text = 'UP';
        } else if (cursors.down.isDown) {
            this.message.text = 'DOWN';
        } else if (cursors.left.isDown) {
            this.message.text = 'LEFT';
        } else if (cursors.right.isDown) {
            this.message.text = 'RIGHT';
        } else if (cursors.shift.isDown) {
            this.message.text = 'SHIFT';
        } else if (cursors.space.isDown) {
            this.message.text = 'SPACE';
        } else {
            this.message.text = '';
        }

        // scene switching
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start('justdownScene');
        }
    }
}

class JustDown extends Phaser.Scene {
    constructor() {
        super('justdownScene');
    }

    create() {
        // new bg color
        this.cameras.main.setBackgroundColor('#0ACADE');

        // add balloon
        this.balloon = this.add.sprite(centerX, centerY, 'balloon');

        // print messages
        this.message = this.add.text(centerX, centerY, '').setOrigin(0.5);
        this.add.text(centerX, height-100, 'Tap UP ARROW to make balloon go up').setOrigin(0.5);
        this.add.text(centerX, height-50, 'Press \'C\' to change Scene').setOrigin(0.5);

        // define cursors and S key
        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('C');
    }

    update() {
        // note that `cursors` does not have a JustDown method :<<<<<
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.balloon.y -= 1;
            this.message.text = 'GO!!!';
        } else {
            this.message.text = '';
        }
        // scene switching
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start('keycomboScene');
        }
    }
}

class KeyCombo extends Phaser.Scene {
    constructor() {
        super('keycomboScene');
    }

    create() {
        // new bg color
        this.cameras.main.setBackgroundColor('#110000');

        // print messages
        this.message = this.add.text(centerX, centerY, '').setOrigin(0.5);
        this.add.text(centerX, height-100, 'Type \'skull\' to summon skellies').setOrigin(0.5);
        this.add.text(centerX, height-50, 'Press \'C\' to change Scene').setOrigin(0.5);

        // define two key combos
        // you can type this one as slow as you want
        let facadeCombo = this.input.keyboard.createCombo('skull', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: true,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: false    // if combo matches, will it delete itself?
        });
        // for this one, you gotta type fast
        let fastCombo = this.input.keyboard.createCombo('fast', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 200,       // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: true,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true     // if combo matches, will it delete itself?
        });
        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === facadeCombo) { 
                this.add.sprite(0,0, 'skull').setRandomPosition();
            }
            if (combo === fastCombo) {
                this.add.sprite(centerX, centerY, 'cursed').setScale(0.5).setDepth(-1);
            }   
        });

        this.swap = this.input.keyboard.addKey('C');
    }

    update() {
        // scene switching
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start('anykeyScene');
        }
    }
}

// game configuration
let config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    scene: [ AnyKey, Cursors, JustDown, KeyCombo ],
}

let game = new Phaser.Game(config);

// some globals
const { width, height } = game.config;
let centerX = width / 2;
let centerY = height / 2;
let cursors = null;