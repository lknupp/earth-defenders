const baseAPIURL = 'https://earth-defenders-backend.glitch.me';

let user = null;

export default class User {
    /** @type { string } */
    #userId;
    /** @type { string } */
    #name;
    /** @type { string } */
    #nickName;
    /** @type { string } */
    #email;

    /**
     * 
     * @param {string} name 
     * @param {string} nickName 
     * @param {string} email 
     */
    constructor(name = null, nickName = null, email = null) {
        if (user === null) {
            this.#name = name;
            this.#nickName = nickName;
            this.#email = email;
            user = this;
        }
        else {
            return user;
        }
    }

    /**
     * @param {string} userId
     * @returns {void}
     * @example
     * user.userId = '123456'
     */
    set userId(userId) {
        this.#userId = userId;
    }

    /**
     * @returns {string}
     * @example
     * console.log(user.userId)
     */
    get userId() {
        return this.#userId;
    }

    get name() {
        return this.#name;
    }

    set name (name) {
        this.#name = name;
    }

    get nickName() {
        return this.#nickName;
    }

    set nickName(nickName) {
        this.#nickName = nickName;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email;
    }

    #prepareObject() {
        return {
            userName: this.#name,
            nickName: this.#nickName,
            email: this.#email,
        };
    }

    async save() {
        // Save user in database
        const user = await axios.post(`${baseAPIURL}/user`, this.#prepareObject());
        
        this.#userId = user.data._id;
    }

    async getAll() {
        // Get all users from database
        const users = await axios.get(`${baseAPIURL}/user`)
    }

    async getUserByEmail(email) {
        // Get user from database by email
        const user = await axios.get(`${baseAPIURL}/user/email/${email}`);

        if (user.data._id !== undefined) {
            this.#userId = user.data._id;
            this.#name = user.data.userName;
            this.#nickName = user.data.nickName;
            this.#email = user.data.email;
            return true;
        }

        return false;
    }

    async update() {
        // Update user in database
        const user = await axios.put(`${baseAPIURL}/user/${this.#userId}`, this.#prepareObject());
    }

    
}