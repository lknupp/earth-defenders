import Player from "../characters/player/player.js";

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super('levelOne');
        this.player = null;
        this.playerControls = null;
    }

    preload() {
        
        this.load.spritesheet(
            'player', 
            'assets/player/ship_01/ships/normal_1_1.png',
            { frameWidth: 65, frameHeight: 73}
        )
            
    }

    create() {
        
        this.player = new Player(this, 500, 500, 'player');
        this.playerControls = this.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 400;
        this.player.update(this.playerControls, speed);
    }
}