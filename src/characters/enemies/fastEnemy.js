import Enemy from "./enemy.js";

export default class FastEnemy extends Enemy {
        /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @param {*} gridGraph
     * @description Create a new common enemy
     * @example
     * const commonEnemy = new CommonEnemy(scene, 'enemy', gridGraph);
     */
        constructor(scene, texture, gridGraph) {
            super(scene, texture, gridGraph);
            this._spanwRate = 7000 + Math.floor(Math.random() * 1000);
            this._nextSpawn = scene.time.now + this._spanwRate;
        }
    
        /**
         * @returns {void}
         * @description Spawn enemy
         */
        _spawn() {
            if (!this._isActive && this.scene.time.now > this._nextSpawn) {
                this._speed = 2.5;
                this._enemyLife = 3;
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