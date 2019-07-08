'use strict'

module.exports = function(apps){
    //======================================
    //IMPORT CONTROLLER NAME
    const controler1 = require('../Controller/controller1')
    apps.get('/',controler1.hello)
}