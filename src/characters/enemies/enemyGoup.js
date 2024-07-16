export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
    _scene = null;
    _enemy = null;
    /**
     * @param {Phaser.Scene} scene
     * @description Create a group of enemies
     * @example
     * new EnemyGroup(this, enemy);
     */
    constructor(scene, enemy) {
        super(scene.physics.world, scene);
        this._scene = scene;
        this._enemy = enemy;

        this.createMultiple({
            frameQuantity: 10,
            key: this._enemy,
            active: false,
            visible: false,
            classType: this._enemy.getClassType()
        });
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    spawnEnemy(x, y) {
        const enemy = this.getFirstDead(false);

        if (enemy) {
            enemy.spawn(x, y);
        }
    }       

}