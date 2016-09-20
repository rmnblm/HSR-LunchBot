'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram('176766794:AAHzS9L9ZrSmvfTGSVWVy9ymaJjE82_LDrg')
const request = require('request')
const cheerio = require('cheerio')

class MenuController extends TelegramBaseController {
    parse(url, callback) {
      const baseURL = 'http://hochschule-rapperswil.sv-restaurant.ch/de/menuplan/'
      request(baseURL + url, function(err, resp, body){
        let $ = cheerio.load(body)
        let offers = $('.offer')
        var text = ''
        $(offers).each(function(i, offer) {
          text += '_' + $(offer).find('.offer-description').text().trim() + '_\n'
          text += $(offer).find('.menu-description .title').text() + ' - ' + $(offer).find('.menu-description .trimmings').text() + '\n\n'
        })
        callback(text)
      });
    }

    menuHandler($) {
      const self = this
      var response = ''
      self.parse('mensa.html', function(text1) {
        response += '*MENSA*\n'
        response += text1
        self.parse('forschungszentrum.html', function(text2) {
          response += '*FORSCHUNGSZENTRUM*\n'
          response += text2
          $.sendMessage(response, { parse_mode: 'Markdown'})
        })
      })
    }

    get routes() {
        return {
            'get': 'menuHandler'
        }
    }
}

tg.router
    .when(['get'], new MenuController())
