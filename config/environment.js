const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("file.log", {
  path: logDirectory,
  interval: "1d", // rotate daily
  compress: "gzip" // compress rotated files
});

const development = {
    name : 'development',
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'codial_development',
    nodemailer_smtp : {
        service: 'gmail0',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "shinigamilovesapple420@gmail.com",
          pass: "zvmz wumu hylr ciok",
        },
    },
    jwt_secret : 'codial',
    morgan: {
      mode : 'dev',
      options : {stream : accessLogStream}
    }
}

const production = {
    name : 'production',
    asset_path : '/assets',
    session_cookie_key : 'PGAUvpDoH3Lo2UCG1rqyhgbPagXjVwSi',
    db : 'codial_production',
    nodemailer_smtp : {
        service: 'gmail0',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "shinigamilovesapple420@gmail.com",
          pass: "zvmz wumu hylr ciok",
        },
    },
    jwt_secret : 'ddLaQ8x8T1YWUC652vVBsWsJXcZ00why',
    morgan: {
      mode : 'combined',
      options : {stream : accessLogStream}
    }
}


module.exports = development;