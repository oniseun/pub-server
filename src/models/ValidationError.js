module.exports = class ValidationError {
    /**
     * @param {String} message
     * @param { []} errors 
     */
    constructor(message, errors = []) {
        this.message = message ;
        this.errors = errors 
    }
} 
