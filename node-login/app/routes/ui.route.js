
const uictrl = require('../controllers/ui.controller.js');


module.exports = (app) => {
    
    app.post('/register', uictrl.usignup);
    app.post('/sendotp', uictrl.sendOtp);
    app.post('/login', uictrl.uiLogin);
    
}