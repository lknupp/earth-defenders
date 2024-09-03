import { SCENCE_KEYS } from "./sceneKeys.js";
import GameManager from "../common/gameManager.js";
import GameOver from "./gameOver.js";
import Ranking from "../common/ranking.js";


export default class LevelOne extends Phaser.Scene {
    /** @type { string } */
    #bgType = null;
    /** @type { * } */
    #gridGraph = null;
    /** @type { GameManager } */
    #gameManager = null;
    /** @type { string } */
    #playerShipTexture = null;
    /** @type { boolean } */
    #gameOverScreenCreated = false;


    /**
     * @constructor
     * @description Create a new level one scene
     * @example
     * const levelOne = new LevelOne();
     */
    constructor() {
        super({
            key: SCENCE_KEYS.LEVEL_ONE
        });

        this.player = null;
        this.enemies = [];
    }

    init(data) {
        this.#bgType = data.bgType;
        this.#playerShipTexture = data.shipTexture;
    }

    /**
     * @returns {*}
     */
    get gridGraph() {
        return this.#gridGraph;
    }

    preload() {
        GameManager.preload(this, this.#bgType, this.#playerShipTexture);
    }

    create() {
        try {
            this.scene.add(SCENCE_KEYS.GAME_OVER, GameOver, false);

        }
        catch (e){
            console.log('Game over scene already exists');
        }
        this.#gameManager = new GameManager(this, this.#playerShipTexture);
        this.#gameManager.create(this);
    }

    /**
     * @returns {void}
     * @description Update the game state
     * @example
     * this.update();
     */
    update() {
        if (this.#gameManager.isGameOver && !this.#gameOverScreenCreated) {
            this.#handleGameOverScreen();
        }       
        this.#gameManager.update();

    }

    #handleGameOverScreen () {
        this.#gameOverScreenCreated = true;
        this.time.addEvent({
            delay: 1500,
            callback: this.#showGameOver,
            callbackScope: this
        })

    }

    #showGameOver() {
        this.scene.launch(SCENCE_KEYS.GAME_OVER, 
            {
                totalPoints: this.#gameManager.getScore(),
                time: this.#gameManager.getTime()
            }
        );

        let panel = this.scene.get(SCENCE_KEYS.GAME_OVER);

        panel.events.on('clickMenu', this.#handleGoMenu, this);
        panel.events.on('clickTryAgain', this.#handleTryAgain, this);


    }

    #closeGameOver () {
        this.#gameOverScreenCreated = false;
        this.scene.stop(SCENCE_KEYS.GAME_OVER);
    }

    #handleGoMenu () {
        console.log('Go menu');
        this.#closeGameOver();
        this.#goMenu()

    }

    #handleTryAgain() {
        console.log('Try again');
        this.#closeGameOver();
        this.#restartGame();

    }

    #goMenu() {
        this.scene.start(SCENCE_KEYS.START_MENU);
    }

    #restartGame() {
        this.scene.restart();
    }
    
}