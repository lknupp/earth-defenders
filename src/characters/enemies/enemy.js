import Queue from "../../common/queue.js";
import QueueNode from "../../common/queueNode.js";
import Node from "../../common/node.js";
import  Scene  from "../../lib/phaser.js";
import LevelOne from "../../scenes/levelOne.js";
import { createEnemyAnims } from "./enemiesAnims.js";
import { ENEMY_PIRATE_SPRITE_JSON } from "./enemyConfig.js";


export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    /** @type { boolean } */
    _isActive = false;
    /** @type { Scene } */
    _scene = null;
    /** @type { string } */
    _texture = '';
    /** @type { integer } */
    _enemyLife = 10;
    /** @type { number } */
    #currentNode = 0;
    /** @type { integer } */
    _speed = 3;
    /** @type { Queue } */
    #movementPath = new Queue();
    /** @type {number} */
    _spanwRate = 1000;
    /** @type {integer} */
    _timeToLive = 0;
    /** @type {number} */
    _nextSpawn = 0;
    _gridGraph = null;
    
    /**
     * @param {Phaser.Scene} scene
     * @param {string} texture
     */ 
    constructor(scene, texture, gridGraph) {
        super(scene, 
            500, -1000, 
            texture
        );

        this._texture = texture;
        this._gridGraph = gridGraph;
        this.flipY = true;
        this._moveAnimation = texture + '_MOVE';
        this._deathAnimation = texture + '_DEATH';
        this.setActive(false);
        this.setVisible(false);
        // Add enemy sprite to scene
        scene.add.existing(this);

        // Add physics body to player sprite
        scene.physics.add.existing(this);

        this.setScale(0.3);
        createEnemyAnims(scene.anims, texture);       

        // Set default animation
        this.anims.play(this._moveAnimation , true);

        // this.setCollideWorldBounds(true); 
    }

    /**
     * @returns {Function}
     * @description Get the class type
     * @example
     * enemy.getClassType();
     */
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
        if (classType === LevelOne.name) {
            const enemyKeys = Object.keys(ENEMY_PIRATE_SPRITE_JSON);
            enemyKeys.forEach(key => {
                const file_path = ENEMY_PIRATE_SPRITE_JSON[key];
                scene.load.atlas(key, file_path + '.png', file_path + '.json');
            });
        }
    }

    // preUpdate(time, delta) {
    //     super.preUpdate(time, delta);
    //     if (this.y > this.scene.scale.height) {
    //         this.y = -1000;
    //     }
    // }

    /**
     * @returns {void}
     * @description Update enemy movement
     * @example
     * enemy.update();
     */
    update() {
        if (!this._isActive) {
            return;
        }
        
        if (this.#movementPath.isEmpty()) {
            this._movementPath(this._gridGraph);

        }

        this._moveToNextNode();
        this.anims.play(this._moveAnimation, true);
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
        this._enemyLife -= damageTaken
        if (this._enemyLife <= 0) {
            const deathAnimation = this.anims.play(this._deathAnimation, true);
            // deathAnimation.on('animationcomplete', () => {
            // this.disableBody(true, true);
            this._disableEnemy();
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

        const step = 1 / (euclideanDistance / this._speed); 
        

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

    _enableEnemy() {
        this.#currentNode = 0;
        this.enableBody(
            true, 
            500,
            -1000,
            true, 
            true);
        this.setActive(true);
        this.setVisible(true);
    }

    _disableEnemy() {
        this._isActive = false;
        this.#movementPath.clear();
        this._gridGraph[this.#currentNode].occupied = false;
        console.log(this.#movementPath.isEmpty());
        this.setActive(false);
        this.setVisible(false);
        this.setX(500);
        this.setY(-1000);
        this._nextSpawn = this.scene.time.now + this._spanwRate;        
    }

    /**
     * @returns {void}
     * @description Spawn enemy
     * @example
     * _spawn(10);
     */
    _spawn() {
        console.log("Enemy spawned");
        this._spawnedTime = this.scene.time.now;
        // this._enableEnemy();
        this._isActive = true;
        this._enableEnemy();
        // this.setActive(true);
        // this.setVisible(true);
    }
}