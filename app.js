/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */
// we need to prime the sails app with a request before loading the window
// or else CSS & JS files are 404'd, it takes some 7-12 seconds for sails to
// finish setting up after it claims sails have been lifted
const jsdom = require('jsdom');
const jquery = require('jquery');
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html>');
const $ = jquery(dom.window);
global.jq = $;

const request = require('request');
// electron config stuff
var backgroundColor = '#1A1A1A';
var width = 800, height = 600;
// get electron
const electron = require('electron');
// prime electron app
const app = electron.app;
// get the theme handler
// const nativeTheme = require('electron').nativeTheme;
// set dark theme
// nativeTheme.themeSource = 'dark';
// try to prevent multiple instances of the app running
app.requestSingleInstanceLock();
// flags: don't enter GUI launch until both sails & electron report ready
var electronIsReady = false;
var sailsIsReady = false;
var gruntIsReady = false;
// block repeat launches (edge contingency)
var windowIsLaunching = false;
var splashIsUp = false;
// electron window(s)
var mainWindow = null;
var splashWindow = null;
// delay after all preflight checks pass
var windowCreationDelay = 0;
// sails app address
const appAddress = 'http://127.0.0.1';
const appPort = 1337;

const BrowserWindow = electron.BrowserWindow;
if (app) app.on('ready', tryLaunchingForElectron);
else electronIsReady = true;

function tryLaunchingForSails() {
  sailsIsReady = true;
  try {
    // "prime" the webapp by requesting content early
    request(`${appAddress}:${appPort}`, (error,response,body) => {/*nada*/});
    if (app && electronIsReady && gruntIsReady) createWindow();
  }
  catch (e) { console.error(e); }
}
function tryLaunchingForElectron() {
  electronIsReady = true;
  if (!splashIsUp) {
    splashIsUp = true;
    // show splash screen
    splashWindow = new BrowserWindow({
      width: width, height: height,
      transparent: true, frame: false, alwaysOnTop: true,
      focusable: false, fullscreenable: false
    });
    splashWindow.loadURL(`file://${__dirname}/splash.html`);
  }
  // enter UI phase if sails is also ready
  if (app && sailsIsReady && gruntIsReady) createWindow();
}

function createWindow() {
  if (windowIsLaunching === true) return -1;
  windowIsLaunching = true;
  // optional: give sails time to get it fully together
  setTimeout(() => {
    try {
      // create the browser window
      if (app) {
        mainWindow = new BrowserWindow({show: false, width: width, height: height,
          backgroundColor: backgroundColor
        });
        // hide menu bar where available
        mainWindow.setMenuBarVisibility(false);
        // hide cursor while typing where available (mac only, crashes others)
        // mainWindow.setAutoHideCursor(true);
        // maximize the window
        mainWindow.maximize();
        // bring to the front
        mainWindow.focus();
        // go to the sails app
        mainWindow.loadURL(`${appAddress}:${appPort}/`);
        // show javascript & DOM consoles
        //mainWindow.webContents.openDevTools();
        // show browser only when it's ready to render itself
        mainWindow.once('ready-to-show', () => {
          // show the main window
          mainWindow.setAlwaysOnTop(true);
          mainWindow.show();
          mainWindow.setAlwaysOnTop(false);
          app.focus();
        });
        // setup close function
        mainWindow.on('closed', function() {
          mainWindow = null;
        });
      }
    }
    catch (e) { console.error(e); }
  }, windowCreationDelay);
}

// quit when all windows are closed
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    sails.lower(function (err) {
      if (err) {
        console.log(err);
        app.exit(1);
      } else
        app.exit();
    });
  }
});

// probably for mobile
if (app) app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
})

// sails wants this
process.chdir(__dirname);

// import sails & rc
var sails;
var rc;
try {
	sails = require('sails');
  sails.on('hook:grunt:done', () => {
    gruntIsReady = true;
    tryLaunchingForSails();
  });
	rc = require('sails/accessible/rc');
} catch (err) {
	console.error(err);
}

// Start server
try {
  sails.lift(rc('sails'), tryLaunchingForSails );
}
catch (e) { console.log(e); }
