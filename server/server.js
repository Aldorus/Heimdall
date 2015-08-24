var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

var oauth2 = require('loopback-oauth2orize');

var options = {
    dataSource: app.dataSources.db, // Data source for oAuth2 metadata persistence
    loginPage: '/login', // The login page url
    loginPath: '/login' // The login form processing url
};

oauth2.oAuth2Provider(
    app, // The app instance
    options // The options
);

app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
    if (err) {
        throw err
    };

    // start the server if `$ node server.js`
    if (require.main === module) {
        app.start();
    }
});

