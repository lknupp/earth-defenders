import { DIRECTION } from "../../common/direction.js";
import Bullet from "../../components/bullet/bullet.js";
import BulletGroup from "../../components/bullet/bulletGroup.js";
import HealthBar from "../../components/ui/healthBar.js";
import { PLAYER_SPRITE_JSON, PLAYER_SPRITE_JSON_KEYS } from "./playerConfig.js";



export default class Player extends Phaser.Physics.Arcade.Sprite {
    /** @type { Bullet } */
    _weapon = null;
    /** @type { number } */
    _movementSpeed = 400;
    /** @type { number } */
    _playerLife = 10;
    /** @type {HealthBar} */
    #healthBar = null;
    /** @type {boolean} */
    #isAlive = true;

    

    /**
     * @description Create a new player
     * @constructor
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate } coordinate
     * @param {string} texture 
     */
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);
        
        this.setScale(0.08);
        this.playerControls = this.scene.input.keyboard.createCursorKeys();
        this._weapon = new Bullet(scene, coordinate.xPos, coordinate.yPos, 'PLAYER_SHOT_04', false);
        this.weaponGroup = new BulletGroup(scene, this._weapon, 30);
        this.#healthBar = new HealthBar(scene, this._playerLife);

        
        const weapons = this.weaponGroup.children.entries;
        weapons.push(this._weapon);
        // @ts-ignore
        this._setWeaponProperties(weapons);

        // Add player sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        // Set player sprite to collide with world bounds
        this.setCollideWorldBounds(true);

        // Create player animations
        this._moveAnimation = texture + '_MOVE';
        this._deathAnimation = texture + '_DEATH';

        // Create player animations
        this._createAnimations(scene, texture);
    }

    /**
     * @param {Phaser.Scene} scene - The scene object
     * @param {string} playerShip - The player ship texture
     * @returns {void}
     * @static
     * @description Preload player assets
     * @example
     * Player.preload(this);
     */
    static preload(scene, playerShip) {
        const file_path = PLAYER_SPRITE_JSON[playerShip];
        scene.load.atlas(playerShip, file_path + '.png', file_path + '.json');
        // scene.load.spritesheet(
        //     'player', 
        //     'assets/player/ship_01/ships/normal_1_1.png',
        //     { frameWidth: 65, frameHeight: 73}
        // );
    }
    /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     * @returns {void}
     */
    _createAnimations(scene, texture) {
        const frameRateAnims = 20;
        
        scene.anims.create({
            key: this._moveAnimation,
            frames: scene.anims.generateFrameNames(
                texture, 
                { 
                    start: 0, 
                    end: 9,
                    prefix: PLAYER_SPRITE_JSON_KEYS.PLAYER_SHIP_MOVE.prefix,
                    suffix: PLAYER_SPRITE_JSON_KEYS.PLAYER_SHIP_MOVE.suffix
                }
            ),
            frameRate: frameRateAnims,
            repeat: -1,
        });

        scene.anims.create({
            key: this._deathAnimation,
            frames: scene.anims.generateFrameNames(
                texture, 
                { 
                    start: 0, 
                    end: 6,
                    prefix: PLAYER_SPRITE_JSON_KEYS.PLAYER_SHIP_DEATH.prefix,
                    suffix: PLAYER_SPRITE_JSON_KEYS.PLAYER_SHIP_DEATH.suffix
                }
            ),
            frameRate: 8,
            // delay: 50,
            repeat: 0,
        });

        // Set default animation
        this.anims.play(this._moveAnimation, true);
    }

    /**
     * @param {Bullet[]} weapons
     * @returns {void}
     * @description Set weapon properties
     * @example
     * player.setWeaponProperties(weapons);
     */
    _setWeaponProperties(weapons) {
        for (const weapon of weapons) {
            weapon.nextFire = 0;
            weapon.fireRate = 400;
            weapon.bulletSpeed = -300;
            weapon.weaponDamage = 1;
        }
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
        if (this.#isAlive) {
            this.anims.play(this._moveAnimation, true);
        }
        
        if (this.playerControls.space.isDown) {
            this.shootWeapon();
        }     
    
        if (!this.playerControls.left.isDown && !this.playerControls.right.isDown && !this.playerControls.up.isDown && !this.playerControls.down.isDown) {
            return;
        }
 
        // Left movement
        if (this.playerControls.left.isDown && this.playerControls.up.isDown) {
            this.setVelocity(-this._movementSpeed, -this._movementSpeed);
        }

        else if (this.playerControls.left.isDown && this.playerControls.down.isDown) {
            this.setVelocity(-this._movementSpeed, this._movementSpeed);
        }

        else if (this.playerControls.left.isDown) {
            this.setVelocity(-this._movementSpeed, 0);
        }
        // Right movement
        else if (this.playerControls.right.isDown && this.playerControls.up.isDown) {
            this.setVelocity(this._movementSpeed, -this._movementSpeed);
        }
        else if (this.playerControls.right.isDown && this.playerControls.down.isDown) {
            this.setVelocity(this._movementSpeed, this._movementSpeed);
            
        }
        else if (this.playerControls.right.isDown) {
            this.setVelocity(this._movementSpeed, 0);
        }
        // Up movement
        else if (this.playerControls.up.isDown) {
            this.setVelocity(0, -this._movementSpeed);
        }
        // Down movement
        else {
            this.setVelocity(0, this._movementSpeed);
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
            this.weaponGroup.fireWeapon(this.x, this.y - 80);
        }
    }

    /**
     * @param {number} damageTaken
     * @returns {void}
     * @description Take damage
     * @example
     * enemy.takeDamage(bullet);
     */
    hitByBullet(damageTaken) {
        if (damageTaken === 0) {
            return;
        }

        this.#healthBar.disableHealthBarDot(this._playerLife, damageTaken);
        this._playerLife -= damageTaken;
        
        if (this._playerLife <= 0) {
            this.#isAlive = false;
            console.log('Player is dead');
            this.body.enable = false;
            this.anims.play(this._deathAnimation, true).on('animationcomplete', () => {
                this.setVisible(false);
                this.setActive(false);
                this.disableBody(true, true);
            });
        }
    }
}           
