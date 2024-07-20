import Enemy from "./enemy.js";

export default class CommonEnemy extends Enemy {
    
    

    constructor(scene, texture, gridGraph) {
        super(scene, texture, gridGraph);
        this._spanwRate = 6000 + Math.floor(Math.random() * 1000);
        this._nextSpawn = scene.time.now + this._spanwRate;
    }

    /**
     * @returns {void}
     * @description Spawn enemy
     */
    _spawn() {
        if (!this._isActive && this.scene.time.now > this._nextSpawn) {
            this._speed = 2;
            this._enemyLife = 5;
            super._spawn();        
        }
    }

    /**
     * @returns {void}
     * @description Update the enemy
     */
    update() {
        this._spawn();    
        super.update();
    }
}