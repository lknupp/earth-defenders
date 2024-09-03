import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { BTN_ASSET_KEYS } from "../components/ui/uiAssetKeys.js";
import ChooseShip from "./chooseShip.js";
import { SCENCE_KEYS } from "./sceneKeys.js";


const baseAPIURL = 'https://earth-defenders-backend.glitch.me';

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
        this.#wakeUpAPI();
        
        this.load.image(BACKGROUND_KEY.START_MENU_BACKGROUND, 'assets/background/start_menu/start_menu.png');
        this.load.image(BTN_ASSET_KEYS.START_BTN, 'assets/ui/menu/start_btn.png');
        this.load.image(BTN_ASSET_KEYS.START_BTN_HOVER, 'assets/ui/menu/start_btn_active.png');
        this.load.image(BTN_ASSET_KEYS.SETTINGS_BTN, 'assets/ui/menu/settings_btn.png');
        this.load.image(BTN_ASSET_KEYS.SETTINGS_BTN_HOVER, 'assets/ui/menu/settings_btn_active.png');
        this.load.image(BTN_ASSET_KEYS.SHOP_BTN, 'assets/ui/menu/shop_btn.png');
        this.load.image(BTN_ASSET_KEYS.SHOP_BTN_HOVER, 'assets/ui/menu/shop_btn_active.png');

        this.load.image(BTN_ASSET_KEYS.OK_BTN, 'assets/ui/menu/ok_btn.png');
        this.load.image(BTN_ASSET_KEYS.OK_BTN_HOVER, 'assets/ui/menu/ok_btn_active.png');

        this.load.image(BTN_ASSET_KEYS.RETURN_BTN, 'assets/ui/menu/backward_btn.png');
        this.load.image(BTN_ASSET_KEYS.RETURN_BTN_HOVER, 'assets/ui/menu/backward_btn_active.png');
        
        this.load.image(BTN_ASSET_KEYS.CLOSE_BTN, 'assets/ui/menu/close_btn.png');
        this.load.image(BTN_ASSET_KEYS.CLOSE_BTN_HOVER, 'assets/ui/menu/close_btn_active.png');

        this.load.image(BTN_ASSET_KEYS.PLAY_BTN, 'assets/ui/menu/play_btn.png');
        this.load.image(BTN_ASSET_KEYS.PLAY_BTN_HOVER, 'assets/ui/menu/play_btn_active.png');

        this.load.image(BACKGROUND_KEY.SHIP_WINDOW , 'assets/ui/menu/window.png');
        this.load.image(BTN_ASSET_KEYS.FORWARD_BTN, 'assets/ui/menu/forward_btn.png');
        this.load.image(BTN_ASSET_KEYS.FORWARD_BTN_HOVER, 'assets/ui/menu/forward_btn_active.png');
        this.load.image(BTN_ASSET_KEYS.BACKWARD_BTN, 'assets/ui/menu/backward_btn.png');
        this.load.image(BTN_ASSET_KEYS.BACKWARD_BTN_HOVER, 'assets/ui/menu/backward_btn_active.png');

        this.load.image(BACKGROUND_KEY.SHIP_01_SELECTION, 'assets/ui/menu/ship_01.png')
        this.load.image(BACKGROUND_KEY.SHIP_02_SELECTION, 'assets/ui/menu/ship_02.png')
        this.load.image(BACKGROUND_KEY.SHIP_03_SELECTION, 'assets/ui/menu/ship_03.png')

        this.load.image(BTN_ASSET_KEYS.RATING_BTN, 'assets/ui/menu/rating_btn.png');
        this.load.image(BTN_ASSET_KEYS.RATING_BTN_HOVER, 'assets/ui/menu/rating_btn_active.png');

        this.load.image(BTN_ASSET_KEYS.BACK_TO_MENU_BTN, 'assets/ui/menu/menu_btn.png');
        this.load.image(BTN_ASSET_KEYS.BACK_TO_MENU_BTN_HOVER, 'assets/ui/menu/menu_btn_active.png');

        this.load.image(BTN_ASSET_KEYS.TRY_AGAIN_BTN, 'assets/ui/menu/replay_btn.png');
        this.load.image(BTN_ASSET_KEYS.TRY_AGAIN_BTN_HOVER, 'assets/ui/menu/replay_btn_active.png');

    }

    create() {
        try {
            this.scene.add(SCENCE_KEYS.CHOOSE_SHIP, ChooseShip, false);
        }
        catch (e) {
            console.log('Choose ship scene already exists');            
        }

        this.add.image(0, 0, BACKGROUND_KEY.START_MENU_BACKGROUND).setOrigin(0, 0);

        const startButton = this.add.image(
            this.scale.width / 2,
             this.scale.height / 2, 
             BTN_ASSET_KEYS.START_BTN
        ).setScale(0.7);

        const settingsButton = this.add.image(
            this.scale.width / 3 ,
             this.scale.height / 2 + 200, 
             BTN_ASSET_KEYS.SETTINGS_BTN
        ).setScale(0.4);

        const shopButton = this.add.image(
            this.scale.width / 3 * 2,
             this.scale.height / 2  + 200, 
             BTN_ASSET_KEYS.SHOP_BTN
        ).setScale(0.4);

        this.#createButtonInteraction(startButton, BTN_ASSET_KEYS.START_BTN, BTN_ASSET_KEYS.START_BTN_HOVER);
        this.#createButtonInteraction(settingsButton, BTN_ASSET_KEYS.SETTINGS_BTN , BTN_ASSET_KEYS.SETTINGS_BTN_HOVER);
        this.#createButtonInteraction(shopButton, BTN_ASSET_KEYS.SHOP_BTN, BTN_ASSET_KEYS.SHOP_BTN_HOVER);

        startButton.on('pointerup', () => {
            this.scene.stop(SCENCE_KEYS.START_MENU);
            this.scene.start(SCENCE_KEYS.CHOOSE_SHIP);
            

            // this.scene.start(SCENCE_KEYS.FORM_SCENE);
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

    /**
     * @returns {void}
     * @description Wake up the API
     * @example
     * #wakeUpAPI();
     */
    #wakeUpAPI() {
        const wakeUp = axios.get(baseAPIURL);
    }
    
}