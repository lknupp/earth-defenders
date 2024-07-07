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

        this.load.image('cannon', 'assets/weapon/ship_01/cannon.png');
            
    }

    create() {
        const coordinate = {xPos: 500, yPos: 500};
        this.player = new Player(this, coordinate, 'player');
        
    }

    update() {
        const speed = 400;
        this.player.update(speed);
    }
}