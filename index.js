'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const bot_api_token = process.env.BOT_API_TOKEN;
const tg = new Telegram.Telegram(bot_api_token)
const request = require('request')
const cheerio = require('cheerio')

class MenuController extends TelegramBaseController {
    parse(url, callback) {
      const baseURL = 'http://hochschule-rapperswil.sv-restaurant.ch/de/menuplan/'
      request(baseURL + url, function(err, resp, body){
        let $ = cheerio.load(body)
        let offers = $('#menu-plan-tab1').find('.menu-item')
        var text = ''
        $(offers).each(function(i, offer) {
          let menuDescription = $(offer).find('.menu-description');
          menuDescription.find('br').replaceWith('\n');

          text += '_' + $(offer).find('.menu-title').text().trim() + '_\n'
          text += menuDescription.text() + '\n\n'
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
            text2 = text2.replace(/ Bowl/g, " Schnabelteller");
		        response += '*FORSCHUNGSZENTRUM*\n'
            response += text2
            response = response.replace('`', '')
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
