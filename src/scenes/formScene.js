import User from "../common/user.js";
import { BACKGROUND_KEY } from "../components/background/backgroundKeysConfig.js";
import { BTN_ASSET_KEYS } from "../components/ui/uiAssetKeys.js";
import LevelOne from "./levelOne.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import { createButton } from "./sceneUtils.js";


export default class FormScene extends Phaser.Scene {
    /** @type {Phaser.GameObjects.Image} */
    #playButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #okButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #closeButton = null;
    /** @type {Phaser.GameObjects.Image} */
    #returnButton = null;
    /** @type { string } */
    #bgType = null;
    /** @type { string } */
    #playerShipTexture = null;
    /** @type { Phaser.Scene } */
    #nextScene
    /** @type { HTMLElement } */
    #fieldName = null;
    /** @type { HTMLElement } */
    #fieldEmail = null;
    /** @type { HTMLElement } */
    #fieldNickName = null;
    /** @type { HTMLElement } */
    #fullNameDiv = null;
    /** @type { HTMLElement } */
    #nickNameDiv = null;
    /** @type { HTMLElement } */
    #formTitle = null
    /** @type { boolean } */
    #isFormFieldsVisible = false;
    /** @type { boolean } */
    #hasAnAccount = false;

    /**
     * @constructor
     * 
     */
    constructor() {
        super({
            key: SCENCE_KEYS.FORM_SCENE
        });
        

    }
    init(data) {
        this.#bgType = data.bgType;
        this.#playerShipTexture = data.shipTexture;
    }

    preload() {
        this.load.html('userDataform', 'assets/ui/form/form.html');
    }

    create() {
        this.input.keyboard.disableGlobalCapture();
        this.add.image(0, 0, BACKGROUND_KEY.START_MENU_BACKGROUND).setOrigin(0, 0);

        this.#playButton = createButton(
            this,
            this.game.scale.width / 2 - 50, 
            this.game.scale.height / 2 + 180,
            BTN_ASSET_KEYS.PLAY_BTN 
        ).setOrigin(0, 0);

        this.#okButton = createButton(
            this,
            this.game.scale.width / 2 + 50, 
            this.game.scale.height / 2 + 150,
            BTN_ASSET_KEYS.OK_BTN
        ).setOrigin(0, 0);

        this.#closeButton = createButton(
            this,
            100, 
            200,
            BTN_ASSET_KEYS.CLOSE_BTN
        ).setOrigin(0, 0);

        this.#returnButton = createButton(
            this,
            20,
            this.scale.height - 120,
            BTN_ASSET_KEYS.RETURN_BTN
        ).setOrigin(0, 0);

        this.#createButtonInteraction(this.#playButton, BTN_ASSET_KEYS.PLAY_BTN, BTN_ASSET_KEYS.PLAY_BTN_HOVER);
        this.#createButtonInteraction(this.#okButton, BTN_ASSET_KEYS.OK_BTN, BTN_ASSET_KEYS.OK_BTN_HOVER);
        this.#createButtonInteraction(this.#closeButton, BTN_ASSET_KEYS.CLOSE_BTN, BTN_ASSET_KEYS.CLOSE_BTN_HOVER);
        this.#createButtonInteraction(this.#returnButton, BTN_ASSET_KEYS.RETURN_BTN, BTN_ASSET_KEYS.RETURN_BTN_HOVER);

        this.#okButton.setVisible(false);
        this.#closeButton.setVisible(false);

        this.formInput = this.add.dom(this.game.scale.width / 2, this.game.scale.height / 2 - 100).createFromCache("userDataform");

        this.#fieldName = document.getElementById('name');
        this.#fieldEmail = document.getElementById('email');
        this.#fieldNickName = document.getElementById('nickName');
        this.#formTitle = document.getElementById('form-title-text');
                
    }


    /**
     * 
     * @param {Phaser.GameObjects.Image} button - button to add interaction
     * @param {string} buttonNormal - normal state texture
     * @param {string} buttonHover - hover state texture
     * @returns {Promise<void>}
     * @example
     * #createButtonInteraction(this.#forwardButton, 'forwardButton', 'forwardButtonActivate')
     */
    async #createButtonInteraction(button, buttonNormal, buttonHover) {
        button.setInteractive();

        button.on('pointerover', () => {
            button.setTexture(buttonHover);
        });
        button.on('pointerout', () => {
            button.setTexture(buttonNormal);
        });

        button.on('pointerup', async () => {
            
            if (buttonNormal === BTN_ASSET_KEYS.PLAY_BTN) {
                if (! (await this.#formFieldsHandler('disable'))) {
                    return;
                };
                
                button.setVisible(false);
                this.#returnButton.setVisible(false);
                this.#okButton.setVisible(true);
                this.#okButton.setX(this.scale.width / 2 + 50);
                this.#okButton.setY(this.scale.height / 2 + 180);
                this.#closeButton.setVisible(true);
                this.#closeButton.setX(this.scale.width / 2 - 100);
                this.#closeButton.setY(this.scale.height / 2 + 180);
                
            }
            else if (buttonNormal === BTN_ASSET_KEYS.OK_BTN) {
                this.#isFormFieldsVisible = false;
                try {
                    this.#nextScene = this.scene.add(SCENCE_KEYS.LEVEL_ONE, LevelOne, false, {
                        shipTexture: this.#playerShipTexture,
                        bgType: this.#bgType
                    });
                }
                catch (error) {
                    
                }
                const user = new User();

                user.name = this.#fieldName.value.trim();
                user.nickName = this.#fieldNickName.value.trim();
                user.email = this.#fieldEmail.value.trim();
                if (!this.#hasAnAccount) {
                    user.save();
                }
                else {
                    user.update();
                }
                this.scene.stop(SCENCE_KEYS.FORM_SCENE);
                this.scene.start(SCENCE_KEYS.LEVEL_ONE);
            }   
            else if (buttonNormal === BTN_ASSET_KEYS.CLOSE_BTN) {
                await this.#formFieldsHandler('enable');
                this.#okButton.setVisible(false);
                this.#closeButton.setVisible(false);
                this.#playButton.setVisible(true);
                this.#returnButton.setVisible(true);
            }

            else if(buttonNormal === BTN_ASSET_KEYS.RETURN_BTN) {
                this.#isFormFieldsVisible = false;
                this.#formTitle.value = 'INSIRA SEU EMAIL'
                this.scene.stop(SCENCE_KEYS.FORM_SCENE);
                this.scene.switch(SCENCE_KEYS.CHOOSE_SHIP);
            }
            
        });
    }

    /**
     * 
     * @param {string} action - Enable or disable form fields
     * @returns 
     */
    async #formFieldsHandler(action) {
        if(! (await this.#validateInputs())) {
            return false;
        }

        if (action === 'disable') {
            this.#fieldName.setAttribute('disabled', 'true');
            
            this.#fieldNickName.setAttribute('disabled', 'true');

        }
        else if (action === 'enable') {
            this.#fieldName.removeAttribute('disabled');
            this.#fieldEmail.removeAttribute('disabled');
            this.#fieldNickName.removeAttribute('disabled');
        }

        return true;
    }

    async #validateInputs() {
        let isValid = true;

        const email = this.#fieldEmail.value.trim();
        

        if (email === '') {
            this.#setError(this.#fieldEmail, 'Email é obrigatório');
            return false;
        }
        else if (!this.#isValidEmail(email)) {
            this.#setError(this.#fieldEmail, 'Email inválido');
            return false;
        }
        else {
            this.#setSuccess(this.#fieldEmail);
            this.#fieldEmail.setAttribute('disabled', 'true');
        }
        
        if(!this.#isFormFieldsVisible) {
            if (await this.#userHasAnAccount(email)) {
                this.#formTitle.innerText = 'VERIFIQUE SEUS DADOS'
                this.#hasAnAccount = true;     
                this.#fillFormFields();
                this.#setFormFieldsVisible(true);
                this.#isFormFieldsVisible = true;
            }
            else {
                this.#formTitle.innerText = 'PREENCHA COM SEUS DADOS'
                this.#setFormFieldsVisible(true);
                this.#isFormFieldsVisible = true;
                return false;
            }
        }

        const name = this.#fieldName.value.trim();
        const nickName = this.#fieldNickName.value.trim();

        if (name === '') {
            this.#setError(this.#fieldName, 'Nome completo é obrigatório');
            isValid = false;
        }
        else {
            this.#setSuccess(this.#fieldName);
        }

        if (nickName === '') {
            this.#setError(this.#fieldNickName, 'Apelido é obrigatório');
            isValid = false;
        }
        else if (nickName.length < 3) {
            this.#setError(this.#fieldNickName, 'Apelido deve ter no mínimo 3 caracteres');
            isValid = false;
        }
        else if (nickName.length > 15) {
            this.#setError(this.#fieldNickName, 'Apelido deve ter no máximo 30 caracteres');
            isValid = false;
        }
        else {
            this.#setSuccess(this.#fieldNickName);
        }
        
        return isValid;
        
    }

    #isValidEmail (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    #setError(element, message) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');   
    }

    #setSuccess(element) {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    #setFormFieldsVisible(isVisible) {
        this.#fullNameDiv = document.getElementById('full-name-div');
        this.#nickNameDiv = document.getElementById('nick-name-div');

        this.#fullNameDiv.style.display = 'block';
        this.#nickNameDiv.style.display = 'block';
    }

    async #userHasAnAccount(email) {
        // check if user has an account
        const user = new User();
        return await user.getUserByEmail(email);
    }

    #fillFormFields() {
        const user = new User();

        this.#fieldName.value = user.name;
        this.#fieldNickName.value = user.nickName;
    }
}