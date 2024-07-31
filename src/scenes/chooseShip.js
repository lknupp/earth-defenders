import LevelOne from "./levelOne.js";
import { SCENCE_KEYS } from "./sceneKeys.js";



export default class ChooseShip extends Phaser.Scene {
    /** @type {string} */
    #chosenShip = null;
    /** @type { string[] } */
    #shipsAvailable = ['SHIP_01', 'SHIP_02', 'SHIP_03'];
    /** @type {integer} */
    #currentShipIndex = 0;
    /** @type {Phaser.GameObjects.Image} */
    #ship = null;
    /** @type {Phaser.GameObjects.Image} */
    #forwardButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #backwardButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #playButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #okButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #closeButton = null;
    /** @type {Phaser.Scene} */
    #nextScene
    /** @type {Phaser.GameObjects.Image} */
    #returnButton = null;

    /**
     * @constructor
     * @description Create a new level one scene
     * @example
     * const levelOne = new LevelOne();
     */
    constructor() {
        super({
            key: SCENCE_KEYS.CHOOSE_SHIP
        });

        

    }

    preload() {
        this.load.image('startMenu', 'assets/background/start_menu/start_menu.png');
        this.load.image('shipWindow' , 'assets/ui/menu/window.png');
        this.load.image('forwardButton', 'assets/ui/menu/forward_btn.png');
        this.load.image('forwardButtonActivate', 'assets/ui/menu/forward_btn_active.png');
        this.load.image('backwardButton', 'assets/ui/menu/backward_btn.png');
        this.load.image('backwardButtonActivate', 'assets/ui/menu/backward_btn_active.png');

        this.load.image('SHIP_01', 'assets/ui/menu/ship_01.png')
        this.load.image('SHIP_02', 'assets/ui/menu/ship_02.png')
        this.load.image('SHIP_03', 'assets/ui/menu/ship_03.png')

        this.load.image('okButton', 'assets/ui/menu/ok_btn.png');
        this.load.image('okButtonHover', 'assets/ui/menu/ok_btn_active.png');
        this.load.image('closeButton', 'assets/ui/menu/close_btn.png');
        this.load.image('closeButtonHover', 'assets/ui/menu/close_btn_active.png');

        this.load.image('playButton', 'assets/ui/menu/play_btn.png');
        this.load.image('playButtonHover', 'assets/ui/menu/play_btn_active.png');

        this.load.image('returnButton', 'assets/ui/menu/return_btn.png');
        this.load.image('returnButtonHover', 'assets/ui/menu/return_btn_active.png');
    }

    create() {
        

        this.add.image(0, 0, 'startMenu').setOrigin(0, 0);
        
        const shipWindow = this.#createShipWindow();
    
        this.#forwardButton = this.#createButton(
            shipWindow.displayWidth / 2 - 150, 
            shipWindow.displayHeight / 2 - 300, 
            'forwardButton'
        );
        this.#backwardButton = this.#createButton(
            -shipWindow.displayWidth / 2 + 50, 
            shipWindow.displayHeight / 2 - 300, 
            'backwardButton'
        );

        this.#playButton = this.#createButton(
            shipWindow.displayWidth / 2 - 280,
            shipWindow.displayHeight / 2 - 150,
            'playButton' 
        );

        this.#okButton = this.#createButton(
            this.scale.width,
            this.scale.height,
            'okButton'
        );

        this.#closeButton = this.#createButton(
            this.scale.width,
            this.scale.height,
            'closeButton'
        );

        this.#returnButton = this.#createButton(
            20,
            this.scale.height - 120,
            'returnButton'
        ).setOrigin(0, 0);

        this.#okButton.setVisible(false);
        this.#closeButton.setVisible(false);

        this.#ship = this.#selectShip(this.#shipsAvailable[this.#currentShipIndex]);


        this.add.container(
            this.scale.width / 2,
            this.scale.height / 2, 
            [
                shipWindow,
                this.#ship,
                this.#forwardButton,
                this.#backwardButton,
                this.#playButton,
                this.#okButton,
                this.#closeButton,
            ]
        );

        this.#createButtonInteraction(this.#forwardButton, 'forwardButton', 'forwardButtonActivate');
        this.#createButtonInteraction(this.#backwardButton, 'backwardButton', 'backwardButtonActivate');
        this.#createButtonInteraction(this.#playButton, 'playButton', 'playButtonHover');
        this.#createButtonInteraction(this.#okButton, 'okButton', 'okButtonHover');
        this.#createButtonInteraction(this.#closeButton, 'closeButton', 'closeButtonHover');
        this.#createButtonInteraction(this.#returnButton, 'returnButton', 'returnButtonHover');

    }

    /**
     * 
     * @param {Phaser.GameObjects.Image} button - button to add interaction
     * @param {string} buttonNormal - normal state texture
     * @param {string} buttonHover - hover state texture
     * @returns {void}
     * @example
     * #createButtonInteraction(this.#forwardButton, 'forwardButton', 'forwardButtonActivate')
     */
    #createButtonInteraction(button, buttonNormal, buttonHover) {
        button.setInteractive();

        button.on('pointerover', () => {
            button.setTexture(buttonHover);
        });
        button.on('pointerout', () => {
            button.setTexture(buttonNormal);
        });

        button.on('pointerup', () => {
            if (buttonNormal === 'forwardButton') {
                this.#currentShipIndex = (this.#currentShipIndex + 1) % this.#shipsAvailable.length;
                console.log('forward')
            }
            else if (buttonNormal === 'backwardButton') {
                this.#currentShipIndex = (this.#currentShipIndex + this.#shipsAvailable.length - 1) % this.#shipsAvailable.length;
                console.log('backward')
            }
            else if (buttonNormal === 'playButton') {
                button.setVisible(false);

                this.#forwardButton.setVisible(false);
                this.#backwardButton.setVisible(false);
                this.#returnButton.setVisible(false);
                this.#okButton.setVisible(true);
                this.#okButton.setX(50);
                this.#okButton.setY(200);
                this.#closeButton.setVisible(true);
                this.#closeButton.setX(-150);
                this.#closeButton.setY(200);
                console.log('play')
            }
            else if (buttonNormal === 'okButton') {
                this.#nextScene = this.scene.add(SCENCE_KEYS.LEVEL_ONE, LevelOne, false, {
                    shipTexture: 'PLAYER_' + this.#shipsAvailable[this.#currentShipIndex],
                    bgType: 'BACKGROUND_01'
                });
                this.scene.stop(SCENCE_KEYS.CHOOSE_SHIP);
                this.scene.start(SCENCE_KEYS.LEVEL_ONE);
            }   
            else if (buttonNormal === 'closeButton') {
                this.#okButton.setVisible(false);
                this.#closeButton.setVisible(false);
                this.#playButton.setVisible(true);
                this.#forwardButton.setVisible(true);
                this.#backwardButton.setVisible(true);
                this.#returnButton.setVisible(true);
            }

            else if(buttonNormal === 'returnButton') {
                this.scene.stop(SCENCE_KEYS.CHOOSE_SHIP);
                this.scene.switch(SCENCE_KEYS.START_MENU);
            }

            this.#ship.setTexture(this.#shipsAvailable[this.#currentShipIndex]);
        });
    }
    
    /**
     * @param void
     * @returns {Phaser.GameObjects.Image}
     * @example
     * #createShipWindow()
     */
    #createShipWindow() {
        const shipWindow = this.add.image(
            0,
            0, 
            'shipWindow'
        ).setScale(0.5);

        return shipWindow;
    }

    /**
     * @param {integer} x - x coordinate
     * @param {integer} y - y coordinate
     * @param {string} key - key of the image
     * @example 
     * #createButton(0, 0, 'startMenu')
     * @returns {Phaser.GameObjects.Image}
     */
    #createButton(x, y, key) {
        const button = this.add.image(
            x,
            y, 
            key
        ).setScale(0.5).setOrigin(0, 0);

        return button;
    }

    /**
     * @param {string} key - key of the image
     * @example 
     * #selectShip('SHIP_01')
     * @returns {Phaser.GameObjects.Image}
     */
    #selectShip(key) {

        const ship = this.add.image(
            0, 
            -100, 
            key
        ).setScale(0.3);

        return ship;
    }    
}