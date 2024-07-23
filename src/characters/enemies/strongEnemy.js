import Enemy from "./enemy.js";

export default class StrongEnemy extends Enemy {

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
            this._spanwRate = 10000 + Math.floor(Math.random() * 3000);
            console.log(this._spanwRate);
            this._nextSpawn = scene.time.now + this._spanwRate;
        }
    
        /**
         * @returns {void}
         * @description Spawn enemy
         */
        _spawn() {
            if (!this._isActive && this.scene.time.now > this._nextSpawn) {
                this._speed = 1;
                this._enemyLife = 12;
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