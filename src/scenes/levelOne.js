import Enemy from "../characters/enemies/enemy.js";
import Player from "../characters/player/player.js";
import { SCENCE_KEYS } from "./sceneKeys.js";

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        this.player = null;
        this.playerControls = null;
        this.enemies = [];
    }

    preload() {
        Player.preload(this);
        Enemy.preload(this, LevelOne.name);
                     
        this.load.spritesheet(
            'cannon', 
            'assets/weapon/ship_01/cannon.png',
            { frameWidth: 22, frameHeight: 60 });            
    }

    create() {
        const coordinate = {xPos: 500, yPos: 500};
        this.player = new Player(this, coordinate, 'player');

        this.enemies.push(new Enemy(this, {xPos: 100, yPos: 100}, 'ENEMY_00'));

        this.enemies.push(new Enemy(this, {xPos: 200, yPos: 200}, 'ENEMY_01'));
                
    }

    update() {
        this.player.update();
        this.enemies.forEach(enemy => {
            enemy.update();
        });
        
    }
}