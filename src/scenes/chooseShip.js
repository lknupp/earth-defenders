import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { BTN_ASSET_KEYS } from "../components/ui/uiAssetKeys.js";
import FormScene from "./formScene.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import { createButton } from "./sceneUtils.js";


export default class ChooseShip extends Phaser.Scene {
    /** @type {string} */
    #chosenShip = null;
    /** @type { string[] } */
    #shipsAvailable = [BACKGROUND_KEY.SHIP_01_SELECTION, BACKGROUND_KEY.SHIP_02_SELECTION, BACKGROUND_KEY.SHIP_03_SELECTION];
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
    /** @type {Phaser.GameObjects.Text} */
    #shipWindowMessage = null;

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

    create() {
        
        this.#shipWindowMessage = this.add.text(this.scale.width / 2, 70, "Escolha sua nave.", {
            color: "#FFFFFF",
            fontSize: "42px",
            fontStyle: "bold",
            fontFamily: 'Lucida Console'
        }).setOrigin(0.5).setDepth(1);


        this.add.image(0, 0, BACKGROUND_KEY.START_MENU_BACKGROUND).setOrigin(0, 0);
        
        const shipWindow = this.#createShipWindow();
    
        this.#forwardButton = createButton(
            this, 
            shipWindow.displayWidth / 2 - 150, 
            shipWindow.displayHeight / 2 - 300, 
            BTN_ASSET_KEYS.FORWARD_BTN
        );
        this.#backwardButton = createButton(
            this,
            -shipWindow.displayWidth / 2 + 50, 
            shipWindow.displayHeight / 2 - 300, 
            BTN_ASSET_KEYS.BACKWARD_BTN
        );

        this.#playButton = createButton(
            this,
            shipWindow.displayWidth / 2 - 280,
            shipWindow.displayHeight / 2 - 150,
            BTN_ASSET_KEYS.PLAY_BTN
        );

        this.#okButton = createButton(
            this,
            this.scale.width,
            this.scale.height,
            BTN_ASSET_KEYS.OK_BTN
        );

        this.#closeButton = createButton(
            this,
            this.scale.width,
            this.scale.height,
            BTN_ASSET_KEYS.CLOSE_BTN
        );

        this.#returnButton = createButton(
            this,
            20,
            this.scale.height - 120,
            BTN_ASSET_KEYS.RETURN_BTN
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

        this.#createButtonInteraction(this.#forwardButton, BTN_ASSET_KEYS.FORWARD_BTN, BTN_ASSET_KEYS.FORWARD_BTN_HOVER);
        this.#createButtonInteraction(this.#backwardButton, BTN_ASSET_KEYS.BACKWARD_BTN, BTN_ASSET_KEYS.BACKWARD_BTN_HOVER);
        this.#createButtonInteraction(this.#playButton, BTN_ASSET_KEYS.PLAY_BTN, BTN_ASSET_KEYS.PLAY_BTN_HOVER);
        this.#createButtonInteraction(this.#okButton, BTN_ASSET_KEYS.OK_BTN, BTN_ASSET_KEYS.OK_BTN_HOVER);
        this.#createButtonInteraction(this.#closeButton, BTN_ASSET_KEYS.CLOSE_BTN, BTN_ASSET_KEYS.CLOSE_BTN_HOVER);
        this.#createButtonInteraction(this.#returnButton, BTN_ASSET_KEYS.RETURN_BTN, BTN_ASSET_KEYS.RETURN_BTN_HOVER);

    }

    /**
     * 
     * @param {Phaser.GameObjects.Image} button - button to add interaction
     * @param {string} buttonNormal - normal state texture
     * @param {string} buttonHover - hover state texture
     * @returns {void}
     * @example
     * #createButtonInteraction(this.#forwardButton, BTN_ASSET_KEYS.FORWARD_BTN, BTN_ASSET_KEYS.FORWARD_BTN_HOVER);
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
            if (buttonNormal === BTN_ASSET_KEYS.FORWARD_BTN) {
                this.#currentShipIndex = (this.#currentShipIndex + 1) % this.#shipsAvailable.length;
            }
            else if (buttonNormal === BTN_ASSET_KEYS.BACKWARD_BTN) {
                this.#currentShipIndex = (this.#currentShipIndex + this.#shipsAvailable.length - 1) % this.#shipsAvailable.length;
            }
            else if (buttonNormal === BTN_ASSET_KEYS.PLAY_BTN) {
                button.setVisible(false);
                this.#shipWindowMessage.setText('Confirme sua escolha.');

                this.#forwardButton.setVisible(false);
                this.#backwardButton.setVisible(false);
                this.#returnButton.setVisible(false);
                this.#okButton.setVisible(true);
                this.#okButton.setX(50);
                this.#okButton.setY(200);
                this.#closeButton.setVisible(true);
                this.#closeButton.setX(-150);
                this.#closeButton.setY(200);
            }
            else if (buttonNormal === BTN_ASSET_KEYS.OK_BTN) {
                try {
                    this.#nextScene = this.scene.add(SCENCE_KEYS.FORM_SCENE, FormScene, false, {
                        shipTexture: 'PLAYER_' + this.#shipsAvailable[this.#currentShipIndex],
                        bgType: BACKGROUND_KEY.BACKGROUND_01
                    });
                }catch(e) {
                    console.log('Form scene already exists');
                }
                console.log('Stop choose ship');
                console.log('Stopped choose ship');
                this.scene.switch(SCENCE_KEYS.FORM_SCENE);
            }   
            else if (buttonNormal === BTN_ASSET_KEYS.CLOSE_BTN) {
                this.#okButton.setVisible(false);
                this.#shipWindowMessage.setText('Escolha sua nave.');
                this.#closeButton.setVisible(false);
                this.#playButton.setVisible(true);
                this.#forwardButton.setVisible(true);
                this.#backwardButton.setVisible(true);
                this.#returnButton.setVisible(true);
            }

            else if(buttonNormal === BTN_ASSET_KEYS.RETURN_BTN) {
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
            BACKGROUND_KEY.SHIP_WINDOW
        ).setScale(0.5);

        return shipWindow;
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