import Enemy from "../characters/enemies/enemy.js";
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

    console.log("Bullet hit enemy");
    const damage = bullet.hitEnemy();      
    enemy.hitByBullet(damage);
}

export {
    onBulletHitEnemyHandle
}