import Enemy from "./enemy.js";

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
    _scene = null;
    #classType = null;
    
    /**
     * @param {Phaser.Scene} scene
     * @param { * } enemy
     * @description Create a group of enemies
     * @example
     * new EnemyGroup(this, enemy);
     */
    constructor(scene, enemy) {
        super(scene.physics.world, scene);
        this._scene = scene;
        // 'PIRATE_ENEMY_01'        
       

        this.createMultiple({
            frameQuantity: 6,
            key: enemy,
            active: false,
            visible: false,
            classType: enemy.getClassType(),
            setXY: {
                x: 500,
                y: -1000
            }
        });
    }

    /**
     * @param {string} key
     * @returns {Function}
     * @description Get the enemy class type
     * @example
     * this._getEnemyClassType(key);
     */
    _getEnemyClassType(key) {
        if (key === 'PIRATE_ENEMY_01') {
            return Enemy;
        }
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    spawnEnemy(x, y) {
        const enemy = this.getFirstDead(false);

        if (enemy) {
            enemy._spawn(x, y);
        }
    }
    
    
}