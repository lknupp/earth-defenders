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
            this._nextSpawn = scene.time.now + this._spanwRate;

            const weapons = this._weaponGroup.children.entries;
            weapons.push(this._weapon);

        this._setWeaponProperties(
            // @ts-ignore
            weapons,
            0 + Math.floor(Math.random() * 1000),
            3000,
            200,
            3,
            0.3
        );
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
            this._shotWeapon(this._getweaponPosition());
        }

        /**
     * @returns {import("../../types/typedef.js").Coordinate}
     * @description Get weapon position
     * @example
     * this._getweaponPosition(0);
     */
    _getweaponPosition() {
        return {
            xPos: this.x,
            yPos: this.y + 40 
        };
    }

}