import Ranking from "../common/ranking.js";
import { BTN_ASSET_KEYS } from "../components/ui/uiAssetKeys.js";
import { SCENCE_KEYS } from "./sceneKeys.js";
import { createButton } from "./sceneUtils.js";

export default class GameOver extends Phaser.Scene {
    /** @type { number } */
    #totalPoints = null;
    /** @type { number } */
    #time = null;
    /** @type { Phaser.GameObjects.Graphics } */
    #background = null;
    /** @type { Phaser.GameObjects.Text } */
    #title = null;
    /** @type { Phaser.GameObjects.Text } */
    #txtTotalPoints = null;
    /** @type { Phaser.GameObjects.Text } */
    #txtTime = null;
    /** @type { integer } */
    #xWindowPos = 100;
    /** @type { integer } */
    #yWindowPos = 100;
    /** @type { integer } */
    #wWindowPos = 100;
    /** @type { integer } */
    #hWindowPos = 100;
    /** @type { any[] } */
    #rankingData = null;

    constructor() {
        super({
            key: SCENCE_KEYS.GAME_OVER,
            active: false
        })

    }

    init(data) {
        this.#totalPoints = data.totalPoints;
        this.#time = data.time;
    }

    create () {
        this.#xWindowPos = 100;
        this.#wWindowPos = this.scale.width - 2 * this.#xWindowPos;

        this.#hWindowPos = 632;
        this.#yWindowPos = (this.scale.height - this.#hWindowPos) / 2;

        this.#background = this.add.graphics(
            {
                x: this.#xWindowPos, 
                y: this.#yWindowPos
            }
        );
        this.#background.fillStyle(0x302C2E, 1);
        this.#background.fillRoundedRect(0, 0, this.#wWindowPos, this.#hWindowPos, 15);

        this.#title = this.add.text(this.#wWindowPos / 2, this.#yWindowPos + 20, 'Game Over', {
            fontFamily: 'Lucida Console',
            fontSize: '60px',
            strokeThickness: 3,
        }).setOrigin(0);

        this.#txtTotalPoints = this.add.text(this.#xWindowPos + 20, this.#yWindowPos + 150, `Score: ${this.#totalPoints}`, {
            fontFamily: 'Lucida Console',
            fontSize: '44px',
        })

        this.#txtTime = this.add.text(this.#xWindowPos + 20, this.#yWindowPos + 250, `Time: ${this.#time} seconds`, {
            fontFamily: 'Lucida Console',
            fontSize: '44px',
        })

        this.#createAllButtons(this.#xWindowPos, this.#yWindowPos, this.#wWindowPos, this.#hWindowPos);
        

        this.time.addEvent({
            delay: 5000,
            callback: this.#showRanking,
            callbackScope: this
        })        
        
    }

    #createAllButtons(x, y, w, h) {
        const offSet = 30;        
        const yOffSet = h + y - 150

        const restartButton = createButton(this, 0, yOffSet, BTN_ASSET_KEYS.TRY_AGAIN_BTN).setInteractive().on('pointerdown', this.#clickTryAgain, this);

        const buttonWidth = restartButton.displayWidth;
        const borderSideDistance = x + (w - buttonWidth * 3 + 2 * offSet) / 2;
        restartButton.x = borderSideDistance;

        const mainMenuButton = createButton(this, borderSideDistance + offSet + buttonWidth, yOffSet, BTN_ASSET_KEYS.BACK_TO_MENU_BTN).setInteractive().on('pointerdown', this.#clickMenu, this);

        const ratingButton = createButton(this, borderSideDistance + 2 * offSet + 2 * buttonWidth, yOffSet, BTN_ASSET_KEYS.RATING_BTN).setInteractive().on('pointerdown', this.#clickRanking, this);

        this.#createButtonInteraction(restartButton, BTN_ASSET_KEYS.TRY_AGAIN_BTN, BTN_ASSET_KEYS.TRY_AGAIN_BTN_HOVER);
        this.#createButtonInteraction(mainMenuButton, BTN_ASSET_KEYS.BACK_TO_MENU_BTN, BTN_ASSET_KEYS.BACK_TO_MENU_BTN_HOVER);
        this.#createButtonInteraction(ratingButton, BTN_ASSET_KEYS.RATING_BTN, BTN_ASSET_KEYS.RATING_BTN_HOVER);

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

        if (buttonNormal === BTN_ASSET_KEYS.TRY_AGAIN_BTN) {
            button.on('pointerup', this.#clickTryAgain, this);
        }
        else if (buttonNormal === BTN_ASSET_KEYS.BACK_TO_MENU_BTN) { 
            button.on('pointerup', this.#clickMenu, this);
        }
        else if (buttonNormal === BTN_ASSET_KEYS.RATING_BTN) {
            button.on('pointerup', this.#clickRanking, this);
        }
    }

    #clickMenu() {
        const ranking = new Ranking().resetRanking();
        this.events.emit('clickMenu');
    }

    #clickTryAgain() {
        const ranking = new Ranking().resetRanking();
        this.events.emit('clickTryAgain');
    }

    #clickRanking() {
        this.#showRanking();        
    }

        
    async #showRanking() {
        const ranking = new Ranking();
        this.#rankingData = await ranking.getRanking();
        this.#txtTotalPoints.setVisible(false);
        this.#txtTime.setVisible(false);
        this.#title.setText('Ranking');
        
        const sortedRanking = this.#sortBypoints();

        this.#showRankingTable(sortedRanking);
    }

    #sortBypoints() {
        let sortedRanking = this.#rankingData.data;

        sortedRanking.sort((a, b) => {
            return b.totalPoints - a.totalPoints;
        });

        return sortedRanking;
    }

    #showRankingTable(rank) {
        const x = this.#xWindowPos + 20;
        const y = this.#yWindowPos;
        const w = this.#wWindowPos - 40;
        const h = this.#hWindowPos - 200;

        const offSet = 40;
        const yOffSet = 80;
        const xOffSet = 20;

        const currRankingId = new Ranking().rankId;
        let isTopTen = false;

        for (let i = 0; i < 9 && i < rank.length; i++) {
            if (currRankingId === rank[i]._id) {
                isTopTen = true;
                const rankText = this.add.text(x + xOffSet, y + yOffSet + i * offSet, `${i + 1}º - ${rank[i].user.nickName} - ${rank[i].totalPoints} pontos`, {
                    fontFamily: 'Lucida Console',
                    fontSize: '30px',
                    color: '#FFD700'
                })
            }
            else {
                const rankText = this.add.text(x + xOffSet, y + yOffSet + i * offSet, `${i + 1}º - ${rank[i].user.nickName} - ${rank[i].totalPoints} pontos`, {
                    fontFamily: 'Lucida Console',
                    fontSize: '30px',
                })
            }
        }

        if (!isTopTen) {
            console.log('entrou')
            for (let i = 0; i < rank.length; i++) {
                if (currRankingId === rank[i]._id) {
                    const rankText = this.add.text(x + xOffSet, y + yOffSet + 9 * offSet, `${i + 1}º - ${rank[i].user.nickName} - ${rank[i].totalPoints} pontos`, {
                        fontFamily: 'Lucida Console',
                        fontSize: '30px',
                        color: '#FFD700'
                    })
                }
            }
        }
        else {
            const rankText = this.add.text(x + xOffSet, y + yOffSet + 9 * offSet, `${9 + 1}º - ${rank[9].user.nickName} - ${rank[9].totalPoints} pontos`, {
                fontFamily: 'Lucida Console',
                fontSize: '30px',
            })
        }
     
    }
    

}