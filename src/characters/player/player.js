import { DIRECTION } from "../../common/direction.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

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
     * @param {Phaser.Types.Input.Keyboard.CursorKeys} playerControls   
     * @param {number} speed
    */    
    update(playerControls, speed) {

        this.setVelocity(0);
        this.flipX = false;

        if (playerControls.space.isDown) {
            console.log('space is down');
        }
    
        if (!playerControls.left.isDown && !playerControls.right.isDown && !playerControls.up.isDown && !playerControls.down.isDown) {
            this.anims.play(this.idle, true);
            return;
        }
 
        // Left movement
        if (playerControls.left.isDown && playerControls.up.isDown) {
            this.setVelocity(-speed, -speed);
            this.anims.play(DIRECTION.IDLE, true);
        }

        else if (playerControls.left.isDown && playerControls.down.isDown) {
            this.setVelocity(-speed, speed);
            this.anims.play(DIRECTION.DOWN, true);
        }

        else if (playerControls.left.isDown) {
            this.setVelocity(-speed, 0);
            this.anims.play(DIRECTION.IDLE, true);
        }
        // Right movement
        else if (playerControls.right.isDown && playerControls.up.isDown) {
            this.setVelocity(speed, -speed);
            this.anims.play(DIRECTION.UP, true);
            // this.idle = 'idle-back'
        }
        else if (playerControls.right.isDown && playerControls.down.isDown) {
            this.setVelocity(speed, speed);
            this.anims.play(DIRECTION.DOWN, true);
            // this.idle = 'idle-front'
        }
        else if (playerControls.right.isDown) {
            this.setVelocity(speed, 0);
            this.anims.play(DIRECTION.IDLE, true);
            // this.idle = 'idle-side'

        }
        // Up movement
        else if (playerControls.up.isDown) {
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
}
