import Phaser from './lib/phaser.js';
import LevelOne from './scenes/levelOne.js';
import StartMenuScreen from './scenes/startMenuScreen.js';

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
    dom: {
        createContainer: true
    },
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
    
    scene: StartMenuScreen
}

const game =  new Phaser.Game(config);
