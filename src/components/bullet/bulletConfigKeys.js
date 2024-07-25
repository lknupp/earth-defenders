
export const CANNON_F_PATH = Object.freeze({
    CANNON_01: "assets/weapon/ship_01/cannon.png",
});

export const CANNON_FRAME_DIMENSION = Object.freeze({
    CANNON_01: { frameWidth: 22, frameHeight: 60}
});

export const BULLET_STATE = Object.freeze({
    BULLET_SHOT : "BULLET_SHOT",
    BULLET_TRAVEL : "BULLET_TRAVEL",
    BULLET_HIT : "BULLET_HIT",
});

export const BULLET_TYPE = Object.freeze({
    // PLAYER_BULLET_01: "PLAYER_BULLET_01",
    // PLAYER_BULLET_02: "PLAYER_BULLET_02",
    // PLAYER_BULLET_03: "PLAYER_BULLET_03",
    PLAYER_SHOT_04: "assets/weapon/bullets/player_shot_04",
    PIRATE_ENEMY_BULLET_01: "assets/weapon/bullets/pirate_enemy_shot",
    // PIRATE_ENEMY_BULLET_02: "PIRATE_ENEMY_BULLET_02",
});

export const BULLET_TYPE_JSON_KEYS = Object.freeze({
    BULLET_SHOT : {prefix: 'BULLET_SHOOTED_', suffix: '.png'} ,
    BULLET_TRAVEL : {prefix: 'BULLET_TRAVEL_', suffix: '.png'},
    BULLET_HIT : {prefix: 'BULLET_HIT_', suffix: '.png'},
});


