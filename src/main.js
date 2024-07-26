import Phaser from './lib/phaser.js';
import LevelOne from './scenes/levelOne.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'game-container',
        // width: 1920,
        // height: 1080,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game-container',
    backgroundColor: '#000000',
    roundPixels: true,
    render: {
        pixelArt: true,
        antialias: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
                x: 0,
            },
            debug: false,
        }
    },
    
    scene: LevelOne
}

const game =  new Phaser.Game(config);
