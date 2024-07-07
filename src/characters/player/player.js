import { DIRECTION } from "../../common/direction.js";
import Cannon from "../../components/weapon/cannon.js";
import PlayerWeapon from "../../components/weapon/playerWeapon.js";



export default class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate } coordinate
     * @param {string} texture 
     */
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);
        
        this.playerControls = this.scene.input.keyboard.createCursorKeys();
        this.weapon = new Cannon(scene, 0, 0);
        this.weaponGroup = new PlayerWeapon(scene, this.weapon);
        
        
        // Add player sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        // Create player animations
        this.idle = DIRECTION.IDLE;


        const frameRateAnims = 20;
        
        scene.anims.create({
            key: DIRECTION.IDLE,
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 2 }),
            frameRate: frameRateAnims,
        });


        scene.anims.create({
            key: DIRECTION.DOWN,
            frames: scene.anims.generateFrameNumbers(texture, { start: 3, end: 5 }),
            frameRate: frameRateAnims,
            repeat: -1,
        });

        scene.anims.create({
            key: DIRECTION.UP,
            frames: scene.anims.generateFrameNumbers(texture, { start: 6, end: 8 }),
            frameRate: frameRateAnims,
            repeat: -1,
        });

        // Set default animation
        this.anims.play(this.idle);
    }

    
    /**
     * @param {number} speed
    */    
    update(speed) {

        this.setVelocity(0);
        this.flipX = false;
        
        if (this.playerControls.space.isDown) {
            this.shootWeapon();
            console.log('space is down');
        }     
    
        if (!this.playerControls.left.isDown && !this.playerControls.right.isDown && !this.playerControls.up.isDown && !this.playerControls.down.isDown) {
            this.anims.play(this.idle, true);
            return;
        }
 
        // Left movement
        if (this.playerControls.left.isDown && this.playerControls.up.isDown) {
            this.setVelocity(-speed, -speed);
            this.anims.play(DIRECTION.IDLE, true);
        }

        else if (this.playerControls.left.isDown && this.playerControls.down.isDown) {
            this.setVelocity(-speed, speed);
            this.anims.play(DIRECTION.DOWN, true);
        }

        else if (this.playerControls.left.isDown) {
            this.setVelocity(-speed, 0);
            this.anims.play(DIRECTION.IDLE, true);
        }
        // Right movement
        else if (this.playerControls.right.isDown && this.playerControls.up.isDown) {
            this.setVelocity(speed, -speed);
            this.anims.play(DIRECTION.UP, true);
            // this.idle = 'idle-back'
        }
        else if (this.playerControls.right.isDown && this.playerControls.down.isDown) {
            this.setVelocity(speed, speed);
            this.anims.play(DIRECTION.DOWN, true);
            // this.idle = 'idle-front'
        }
        else if (this.playerControls.right.isDown) {
            this.setVelocity(speed, 0);
            this.anims.play(DIRECTION.IDLE, true);
            // this.idle = 'idle-side'

        }
        // Up movement
        else if (this.playerControls.up.isDown) {
            this.setVelocity(0, -speed);
            this.anims.play(DIRECTION.UP, true);
            // this.idle = 'idle-back'
        }
        // Down movement
        else {
            this.setVelocity(0, speed);
            this.anims.play(DIRECTION.DOWN, true);
            // this.idle = 'idle'
        }
    }

    shootWeapon() {
        if (this.scene.game.loop.time > this.weapon.nextFire) {
            this.weapon.nextFire = this.scene.game.loop.time + this.weapon.fireRate;
            this.weaponGroup.fireWeapon(this.x, this.y - 20);
        }
    }
}           
