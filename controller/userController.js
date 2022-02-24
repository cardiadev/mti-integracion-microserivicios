const Sequelize = require('sequelize');

const miUser = require('../models').user;

module.exports = {
    create(req,res) {
        return miUser.create({
            clave: req.params.clave,
            passw: req.params.passw,
            rol: req.params.role
        })
        .then(miUser => res.status(200).send(miUser))
        .catch(error => res.status(400).send());
    }
 }