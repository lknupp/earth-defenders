import ChooseShip from "./chooseShip.js";
import LevelOne from "./levelOne.js";
import { SCENCE_KEYS } from "./sceneKeys.js";



export default class StartMenuScreen extends Phaser.Scene {



    /**
     * @constructor
     * @description Create a new level one scene
     * @example
     * const levelOne = new LevelOne();
     */
    constructor() {
        super({
            key: SCENCE_KEYS.START_MENU
        });


    }

    preload() {
        this.load.image('startMenu', 'assets/background/start_menu/start_menu.png');
        this.load.image('startButton', 'assets/ui/menu/start_btn.png');
        this.load.image('startButtonHover', 'assets/ui/menu/start_btn_active.png');
        this.load.image('settingsButton', 'assets/ui/menu/settings_btn.png');
        this.load.image('settingsButtonHover', 'assets/ui/menu/settings_btn_active.png');
        this.load.image('shopButton', 'assets/ui/menu/shop_btn.png');
        this.load.image('shopButtonHover', 'assets/ui/menu/shop_btn_active.png');
    }

    create() {
        try {
            this.scene.add(SCENCE_KEYS.CHOOSE_SHIP, ChooseShip, false);
        }
        catch (e) {
            
        }

        this.add.image(0, 0, 'startMenu').setOrigin(0, 0);
        const startButton = this.add.image(
            this.scale.width / 2,
             this.scale.height / 2, 
             'startButton'
        ).setScale(0.7);

        const settingsButton = this.add.image(
            this.scale.width / 3 ,
             this.scale.height / 2 + 200, 
             'settingsButton'
        ).setScale(0.4);

        const shopButton = this.add.image(
            this.scale.width / 3 * 2,
             this.scale.height / 2  + 200, 
             'shopButton'
        ).setScale(0.4);

        this.#createButtonInteraction(startButton, 'startButton', 'startButtonHover');
        this.#createButtonInteraction(settingsButton,'settingsButton' ,'settingsButtonHover');
        this.#createButtonInteraction(shopButton, 'shopButton', 'shopButtonHover');

        startButton.on('pointerup', () => {
            this.scene.stop(SCENCE_KEYS.START_MENU);
            this.scene.start(SCENCE_KEYS.CHOOSE_SHIP);
        });
    }

 
    update() {
 
    }

    #createButtonInteraction(button, buttonNormal, buttonHover) {
        button.setInteractive();

        button.on('pointerover', () => {
            button.setTexture(buttonHover);
        });
        button.on('pointerout', () => {
            button.setTexture(buttonNormal);
        });
    }
    
}