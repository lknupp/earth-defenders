const baseAPIURL = 'https://earth-defenders-backend.glitch.me';

let ranking = null

export default class Ranking {
    /** @type {string} */
    #userId;
    /** @type {number} */
    #time;
    /** @type {number} */
    #totalPoints;
    /** @type {string} */
    #rankId;

    constructor (userId = null, time = null, totalPoints = null) {
        if (ranking !== null) {
            return ranking;
        }
        
        this.#userId = userId;
        this.#time = time;
        this.#totalPoints = totalPoints;

        ranking = this;
    }

    /**
     * @param {number} time
     * @returns {void}
     * @example
     * rank.time = 120
     */
    set time(time) {
        this.#time = time;
    }

    /**
     * @returns {number}
     * @example
     * console.log(rank.time)
     */
    set totalPoints(totalPoints) {
        this.#totalPoints = totalPoints;
    }

    get rankId() {
        return this.#rankId;
    }

    resetRanking() {
        this.#userId = null;
        this.#time = null;
        this.#totalPoints = null;
        this.#rankId = null;
        ranking = null;
    }

    #prepareObject() {
        return {
            user: this.#userId,
            time: this.#time,
            totalPoints: this.#totalPoints,
        };
    }

    async save() {
        // save ranking
        const ranking = await axios.post(`${baseAPIURL}/ranking`, this.#prepareObject());
        this.#rankId = ranking.data._id;
    }

    async getRanking() {
        // get ranking
        const ranking = await axios.get(`${baseAPIURL}/ranking`);
        return ranking;
    }

    async getRankingSortedByPoints() {
        // get ranking
        const ranking = await this.getRanking();

        let sortedRanking = []

        console.log(sortedRanking);
        for (let i = 0; i < ranking.length; i++) {
            sortedRanking.push({
                user: ranking[i].user,
                time: ranking[i].time,
                totalPoints: ranking[i].totalPoints
            });
        }

        console.log(sortedRanking);

        sortedRanking.sort((a, b) => {
            return a.totalPoints - b.totalPoints;
        });

        
        return sortedRanking;
    }

    async getRankingSortedByTime() {
        console.log('getRankingSortedByTime');
        // get ranking
        const ranking = await this.getRanking();
        let sortedRanking = []

        for (let i = 0; i < ranking.length; i++) {
            const user = ranking[i].user;
            const time = ranking[i].time;
            const totalPoints = ranking[i].totalPoints;
            console.log(user, time, totalPoints);
            sortedRanking.push({
                user: ranking[i].user,
                time: ranking[i].time,
                totalPoints: ranking[i].totalPoints
            });
        }
        
        sortedRanking.sort((a, b) => {
            return a.time - b.time;
        });
        return sortedRanking;
    }
}