/**
 * The destination folder you want yours built resources have been
 * @type {string}
 */
var dist = "./client/build/";

var test = "./client/test/";

/**
 * The project sources folders
 * @type {string}
 */
var project = "./client/";

/**
 * The application name (in min case)
 * @type {string}
 */
var appName = "heimdall";

/**
 * The default port where the application is launched
 * @type {number}
 */
var defaultPort = 8080;

module.exports = {
    dist: dist,
    project: project,
    test: test,
    appName: appName,
    defaultPort: defaultPort
};
