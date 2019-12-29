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
const request = require('request');
// electron config stuff
var backgroundColor = '#1A1A1A';
var width = 800, height = 600;
// get electron
const electron = require('electron');
// prime electron app
const app = electron.app;
// flags: don't enter GUI launch until both sails & electron report ready
var electronIsReady = false;
var sailsIsReady = false;
var gruntIsReady = false;
// block repeat launches (edge contingency)
var windowIsLaunching = false;
// electron window(s)
var mainWindow = null;
// when sails says it's lifted, wait a delay or else JS & CSS return 404's
var windowCreationDelay = 0;
// sails app address
const appAddress = 'http://127.0.0.1';
const appPort = 1337;

const BrowserWindow = electron.BrowserWindow;
if (app) app.on('ready', tryLaunchingForElectron);
else electronIsReady = true;

function tryLaunchingForSails() {
  sailsIsReady = true;
  // "prime" the webapp by requesting content early
  try {
    request(`${appAddress}:${appPort}`,function (error,response,body) {/*nada*/});
    if (app && electronIsReady && gruntIsReady) createWindow();
  }
  catch (e) { console.error(e); }
}
function tryLaunchingForElectron() {
  electronIsReady = true;
  // enter UI phase if sails is also ready
  if (app && sailsIsReady) createWindow();
}

function createWindow() {
  if (windowIsLaunching === true) return -1;
  windowIsLaunching = true;
  // give sails about 7-12 more seconds to get its crap fully together
  setTimeout(() => {
    try {
      // create the browser window
      if (app) {
        mainWindow = new BrowserWindow({show: false, width: width, height: height,
          backgroundColor: backgroundColor, darkTheme: true /*linux only*/
        });
        // hide menu bar where available
        mainWindow.setMenuBarVisibility(false);
        // hide cursor while typing where available (mac only, crashes others)
        // mainWindow.setAutoHideCursor(true);
        // maximize the window
        mainWindow.maximize();
        // go to the sails app
        mainWindow.loadURL(`http://127.0.0.1:1337/`);
        // show javascript & DOM consoles
        mainWindow.webContents.openDevTools();
        // show browser only when it's ready to render itself
        mainWindow.once('ready-to-show', () => {
          mainWindow.show();
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
if (app) app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

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
