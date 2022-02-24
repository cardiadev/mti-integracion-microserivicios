const userController = require('../controller/userController');

module.exports = (app) => {
    app.get('/api', (req, res) => {
        res.status(200).send({ status: 'OK', message: 'API Service Bancomex 0.0.1 ready to work!'})
    })
    app.post('/api/user/create/clave/:clave/passw/:passw/rol/:role', userController.create)

};