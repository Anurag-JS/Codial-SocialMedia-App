
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
        jwt_secret : 'codial',
        
    }
}

const production = {
    name : 'production'
}