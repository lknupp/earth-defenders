

export default class BulletGroup extends Phaser.Physics.Arcade.Group {
    /**
     * @param {Phaser.Scene} scene
     * @param {*} weapon
     */
    constructor(scene, weapon) {
        super(scene.physics.world, scene);

        this.weapon = weapon;

        this.createMultiple({
            frameQuantity: 30,
            key: this.weapon,
            active: false,
            visible: false,
            classType: weapon.getClassType(),
            setXY: {
                x: 500,
                y: 1000
            }
        });
        
    }
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    fireWeapon(x, y) {
        
        const weapon = this.getFirstDead(false);
        
        if (weapon && this.scene.game.loop.time > weapon.nextFire) {
            weapon.fire(x, y);
            weapon.nextFire = this.scene.game.loop.time + weapon.fireRate;
        }
    }

}