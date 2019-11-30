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
var backgroundColor = '#1A1A1A';
var width = 800, height = 600;
const electron = require('electron');
const app = electron.app;
// don't create window until sails is fully lifted
var electronIsReady = false;
var sailsIsReady = false;
var mainWindow = null;

BrowserWindow = electron.BrowserWindow;
app.on('ready', tryLaunchingForElectron);

function tryLaunchingForSails() {
  sailsIsReady = true;
  if (electronIsReady) createWindow();
}
function tryLaunchingForElectron() {
  electronIsReady = true;
  if (sailsIsReady) createWindow();
}

function createWindow() {
  mainWindow = new BrowserWindow({show: false, width: width, height: height,
    backgroundColor: backgroundColor, darkTheme: true /*linux only*/
  });
  mainWindow.setMenuBarVisibility(false); // doesn't work
  // mainWindow.setAutoHideCursor(true); // mac only
  mainWindow.maximize();
  mainWindow.loadURL(`http://127.0.0.1:1337/`);
  mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
})
	process.chdir(__dirname);

	// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
	var sails;
	var rc;
	try {
  	sails = require('sails');
  	rc = require('sails/accessible/rc');
	} catch (err) {
  	console.error('Encountered an error when attempting to require(\'sails\'):');
  	console.error(err.stack);
  	console.error('--');
  	console.error('To run an app using `node app.js`, you need to have Sails installed');
  	console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  	console.error('in the same directory as your app and run `npm install`.');
  	console.error();
  	console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  	console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  	console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  	console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  	return;
	}//-•

	// Start server
	sails.lift(rc('sails'), tryLaunchingForSails );
