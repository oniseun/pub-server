module.exports = class AppResponse {
 
    constructor(success, message, data = {}, errors = []) {
        this.success = success
        this.message = message ;
        this.data = data ;
        this.errors = errors 
    }
} 