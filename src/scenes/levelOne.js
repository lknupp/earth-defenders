import Enemy from "../characters/enemies/enemy.js";
import Player from "../characters/player/player.js";
import Bullet from "../components/bullet/bullet.js";
import { SCENCE_KEYS } from "./sceneKeys.js";

export default class LevelOne extends Phaser.Scene {
    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        this.player = null;
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
        
        this.physics.add.overlap(this.player.weaponGroup, this.enemies, this._onPlayerBulletHitEnemy, null, this);
    }

    update() {
        this.player.update();
        this.enemies.forEach(enemy => {
            enemy.update();
        });
        
    }

    /**
     * 
     * @param {Enemy} enemy 
     * @param {Bullet} bullet
     * @returns {void}
     * @description Callback function for when the player bullet hits an enemy 
     * @example
     * this._onPlayerBulletHitEnemy(enemy, bullet);
     */
    _onPlayerBulletHitEnemy(enemy, bullet) {
        console.log("Bullet hit enemy");
        const damage = bullet.hitEnemy();      
        enemy.hitByBullet(damage);
        
    }
}