import { DIRECTION } from "../../common/direction.js";
import Cannon from "../../components/weapon/cannon.js";
import PlayerWeapon from "../../components/weapon/playerWeapon.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {

    _weapon = null;
    _movementSpeed = 400;
    

    /**
     * 
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate } coordinate
     * @param {string} texture 
     */
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);
        
        this.playerControls = this.scene.input.keyboard.createCursorKeys();
        this._weapon = new Cannon(scene, 0, 0);
        this.weaponGroup = new PlayerWeapon(scene, this._weapon);
        
        
        // Add player sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        // Set player sprite to collide with world bounds
        this.setCollideWorldBounds(true);

        // Create player animations
        this.idle = DIRECTION.IDLE;

        // Create player animations
        this._createAnimations(scene, texture);
    }

    /**
     * @param {Phaser.Scene} scene
     * @returns {void}
     * @static
     * @description Preload player assets
     * @example
     * Player.preload(this);
     */
    static preload(scene) {
        scene.load.spritesheet(
            'player', 
            'assets/player/ship_01/ships/normal_1_1.png',
            { frameWidth: 65, frameHeight: 73}
        );
    }
    /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @returns {void}
     */
    _createAnimations(scene, texture) {
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
     * @returns {void}
     * @description Update player movement
     * @example
     * player.update(400);
    */    
    update() {

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
            this.setVelocity(-this._movementSpeed, -this._movementSpeed);
            this.anims.play(DIRECTION.IDLE, true);
        }

        else if (this.playerControls.left.isDown && this.playerControls.down.isDown) {
            this.setVelocity(-this._movementSpeed, this._movementSpeed);
            this.anims.play(DIRECTION.DOWN, true);
        }

        else if (this.playerControls.left.isDown) {
            this.setVelocity(-this._movementSpeed, 0);
            this.anims.play(DIRECTION.IDLE, true);
        }
        // Right movement
        else if (this.playerControls.right.isDown && this.playerControls.up.isDown) {
            this.setVelocity(this._movementSpeed, -this._movementSpeed);
            this.anims.play(DIRECTION.UP, true);
            // this.idle = 'idle-back'
        }
        else if (this.playerControls.right.isDown && this.playerControls.down.isDown) {
            this.setVelocity(this._movementSpeed, this._movementSpeed);
            this.anims.play(DIRECTION.DOWN, true);
            // this.idle = 'idle-front'
        }
        else if (this.playerControls.right.isDown) {
            this.setVelocity(this._movementSpeed, 0);
            this.anims.play(DIRECTION.IDLE, true);
            // this.idle = 'idle-side'

        }
        // Up movement
        else if (this.playerControls.up.isDown) {
            this.setVelocity(0, -this._movementSpeed);
            this.anims.play(DIRECTION.UP, true);
            // this.idle = 'idle-back'
        }
        // Down movement
        else {
            this.setVelocity(0, this._movementSpeed);
            this.anims.play(DIRECTION.DOWN, true);
            // this.idle = 'idle'
        }
    }

    /**
     * @returns {void}
     * @description Shoot weapon
     * @example
     * player.shootWeapon();
     */
    shootWeapon() {
        if (this.scene.game.loop.time > this._weapon.nextFire) {
            this._weapon.nextFire = this.scene.game.loop.time + this._weapon.fireRate;
            this.weaponGroup.fireWeapon(this.x, this.y - 20);
        }
    }
}           
