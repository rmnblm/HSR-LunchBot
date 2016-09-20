'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram('176766794:AAHzS9L9ZrSmvfTGSVWVy9ymaJjE82_LDrg')

class MenuController extends TelegramBaseController {
    bistroHandler($) {
        $.sendMessage('http://hochschule-rapperswil.sv-restaurant.ch/de/menuplan/forschungszentrum.html')
    }

    mensaHandler($) {
        $.sendMessage('http://hochschule-rapperswil.sv-restaurant.ch/de/menuplan/mensa.html')
    }

    get routes() {
        return {
            'bistro': 'bistroHandler',
            'mensa': 'mensaHandler'
        }
    }
}

tg.router
    .when(['bistro'], new MenuController())
    .when(['mensa'], new MenuController())
