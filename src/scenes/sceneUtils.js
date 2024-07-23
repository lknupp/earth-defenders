import Enemy from "../characters/enemies/enemy.js";
import Node from "../common/node.js";
import { NODES_ADJACENCY_LIST } from "../common/nodeConfigs.js";
import Bullet from "../components/bullet/bullet.js";
import Phaser from "../lib/phaser.js";


/**
 * @param {Bullet} bullet
 * @param {Enemy} enemy
 * @returns {void}
 * @description Handle bullet and enemy collision
 * @example
 * _onBulletHitEnemyHandle(this.player, this.enemy);
 */
const onBulletHitEnemyHandle = (enemy, bullet) => {
    const damage = bullet.hitEnemy();
    enemy.hitByBullet(damage);
}


/**
 * @param {Phaser.Scene} scene
 * @returns {*}
 * @description Create enemy movement grid
 * @example
 * createEnemyMovementGrid(this);
 */
const createEnemyMovementGrid = (scene) => {
    const width = scene.scale.width;
    var gridGraph = {};

    gridGraph[0] = new Node({xPos: -200, yPos: -200}, NODES_ADJACENCY_LIST[0]);

    const collumns = 6;
    const lines = 3;
    const xDistance = Math.floor(width / collumns);

    const y = 160;
    const initialXPosition = xDistance / 2;
    const initialYPosition = 100;

    for (let line = 0; line < lines; line++) {
        for (let collumn = 0; collumn < collumns; collumn++) {
            const key = line * collumns + collumn + 1;
            const adjacentNodes = NODES_ADJACENCY_LIST[key];
            const xPos = initialXPosition + collumn * xDistance;
            const yPos = initialYPosition + line * y;
            const coordinate = {xPos: xPos, yPos: yPos};
            gridGraph[key] = new Node(coordinate , adjacentNodes);
        }
    }

    return gridGraph;
}

export {
    onBulletHitEnemyHandle,
    createEnemyMovementGrid
}