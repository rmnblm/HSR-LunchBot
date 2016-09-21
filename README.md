# hsr-lunchbot
A Telegram bot to retrieve today's lunch menu at the University of Applied Sciences Rapperswil.

# Getting Started
Add the bot https://telegram.me/HSRLunchBot to a group and call `/get@HSRLunchBot`.

# Develop
1. To host a similar bot like this, clone this repo:
```
$ git clone https://github.com/rmnblm/hsr-lunchbot
```

2. Install all packages with
```
$ npm install
```

3. Make all required changes (especially changing the API key!) to `index.js` and run the app
```
$ node index.js
```

4. Once you’re satisfied with the behavior, commit all your files and deploy the app to Heroku
```
$ heroku create
Creating app... done, ⬢ radiant-refuge-28891
$ git push heroku master
```

5. Run the following command to avoid the error log message `Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch`:
```
$ heroku scale web=0 worker=1
```

# License
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
        Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.
