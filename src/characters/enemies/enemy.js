import Queue from "../../common/queue.js";
import QueueNode from "../../common/queueNode.js";
import Node from "../../common/node.js";
import  Scene  from "../../lib/phaser.js";
import LevelOne from "../../scenes/levelOne.js";
import { createEnemyAnims } from "./enemiesAnims.js";
import { ENEMY_PIRATE_SPRITE_JSON } from "./enemyConfig.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    /** @type { integer } */
    _movementXSpeed = 0;
    /** @type { integer } */
    _movementYSpeed = 0;
    /** @type { Scene } */
    _scene = null;
    /** @type { string } */
    _texture = '';
    /** @type { integer } */
    #enemyLife = 10;
    /** @type { number } */
    #currentNode = 0;
    /** @type { integer } */
    #speed = 3;
    /** @type { Queue } */
    #movementPath = new Queue();

    /**
     * @param {Phaser.Scene} scene
     * @param {import("../../types/typedef").Coordinate} coordinate
     * @param {string} texture
     */ 
    constructor(scene, coordinate, texture) {
        super(scene, coordinate.xPos, coordinate.yPos, texture);

        this._texture = texture;
        this.flipY = true;
        this._moveAnimation = texture + '_MOVE';
        this._deathAnimation = texture + '_DEATH';
        
        // Add enemy sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        this.setScale(0.3);
        createEnemyAnims(scene.anims, texture);       

        // Set default animation
        this.anims.play(this._moveAnimation , true);

        // this.setCollideWorldBounds(true); 

        console.log(`Enemy position: ${this.x}, ${this.y}`);

    }

    getClassType() {
        return this.constructor;
    }

    /**
     * @param {Phaser.Scene} scene
     * @param {string} classType
     * @returns {void}
     * @static
     * @description Preload enemy assets
     * @example
     *  Enemy.preload(this, LevelOne.name);
     */
    static preload(scene, classType) {
        console.log("Enemy preloaded");
        if (classType === LevelOne.name) {
            const enemyKeys = Object.keys(ENEMY_PIRATE_SPRITE_JSON);

            enemyKeys.forEach(key => {
                console.log(key);
                const file_path = ENEMY_PIRATE_SPRITE_JSON[key];
                scene.load.atlas(key, file_path + '.png', file_path + '.json');
                console.log("Enemy preloaded");
                console.log(key);
            });
        }
    }

    /**
     * @param {*} gridGraph 
     * @returns {void}
     * @description Update enemy movement
     * @example
     * enemy.update();
     */
    update(gridGraph) {
        if (this.#movementPath.isEmpty()) {
            this._movementPath(gridGraph);
        }

        this._moveToNextNode();
        this._detectWorldBoundsCollision();
        this.setVelocityX(this._movementXSpeed);
        this.anims.play(this._moveAnimation, true);
    }

    /**
     * @returns {void}
     * @description Detect world bounds collision
     * @example
     * _detectWorldBoundsCollision();
     */
    _detectWorldBoundsCollision() {
        if (this.x - 50 < 0) {
            this._movementXSpeed = Math.abs(this._movementXSpeed);
        } else if (this.x + 50 > this.scene.scale.width) {
            this._movementXSpeed = -Math.abs(this._movementXSpeed);
        }
        
        if (this.y - 50 < 0) {
            this._movementYSpeed = Math.abs(this._movementYSpeed);
        } else if (this.y + 50 > this.scene.scale.height) {
            this._movementYSpeed = -Math.abs(this._movementYSpeed);
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
        console.log("Enemy take damage");
        this.#enemyLife -= damageTaken
        if (this.#enemyLife <= 0) {
            const deathAnimation = this.anims.play(this._deathAnimation, true);
            // deathAnimation.on('animationcomplete', () => {
            this._movementXSpeed = 0;
            this._movementYSpeed = 0;
            this.disableBody(true, true);
            // });
            console.log("Enemy destroyed");
        }
    }

    /**
     * 
     * @param {*} gridGraph 
     * @returns { integer[] }
     */
    _availableNodes(gridGraph) {
        const adjacentNodes = gridGraph[this.#currentNode].adjacentNodes;

        const availableNodes = adjacentNodes.filter(node => {
            return !gridGraph[node].occupied;
        });

        return availableNodes;
    }

    /**
     * @param {*} gridGraph
     * @returns {Node}
     * @description Get next node to move to
     * @example
     * _nextNode(gridGraph);
     */
    _nextNode(gridGraph) {
        const availableNodes = this._availableNodes(gridGraph);
        
        if (availableNodes.length === 0) {
            return gridGraph[this.#currentNode];
        }

        const previousNode = gridGraph[this.#currentNode];
        previousNode.occupied = false;

        const randomIndex = Math.floor(Math.random() * availableNodes.length);
        const nextNodeKey = availableNodes[randomIndex];
        this.#currentNode = nextNodeKey;
        const nextNode = gridGraph[nextNodeKey];
        nextNode.occupied = true;

        return nextNode;
    }

    /**
     * @param {*} gridGraph
     * @returns {void}
     * @description Move enemy to next node
     * @example
     * enemy.movementPath(0, 1);
     */
    _movementPath(gridGraph) {
        const currNode = gridGraph[this.#currentNode];
        const nextNode = this._nextNode(gridGraph);
        this._calculatePath(currNode, nextNode);
    }

    /**
     * @param {Node} currNode
     * @param {Node} nextNode
     * @returns {void}
     * @description Calculate path to move enemy
     * @example
     * _calculatePath(currNode, nextNode);
     */
    _calculatePath(currNode, nextNode) {
        const xPoints = [currNode.coordinate.xPos, nextNode.coordinate.xPos];
        const yPoints = [currNode.coordinate.yPos, nextNode.coordinate.yPos];
        
        const euclideanDistance = 
            Phaser.Math.Distance.BetweenPoints(
                {x: currNode.coordinate.xPos, y: currNode.coordinate.yPos}, 
                {x: nextNode.coordinate.xPos, y: nextNode.coordinate.yPos});

        const step = 1 / (euclideanDistance / this.#speed); 
        

        for (let i = 0; i <= 1; i += step) {
            const x = Phaser.Math.Interpolation.Linear(xPoints, i);
            const y = Phaser.Math.Interpolation.Linear(yPoints, i);
            const pathNode = new QueueNode({xPos: x, yPos: y})

            this.#movementPath.enqueue(pathNode);
        }
    }

    /**
     * @returns {void}
     * @description Move to next node
     * @example
     * _moveToNextNode();
     */
    _moveToNextNode() {
        const nextNode = this.#movementPath.dequeue();
        this.x = nextNode.value.xPos;
        this.y = nextNode.value.yPos;
    }

}