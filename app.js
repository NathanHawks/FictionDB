// server-side jquery
const jquery = require('jquery');
// global usage necessary for scope in .ejs files and helpers
global.jq = jquery(new (require('jsdom')).JSDOM('<!DOCTYPE html>').window);
// for priming the webapp
const request = require('request');
// electron config stuff
var backgroundColor = '#1A1A1A', width = 800, height = 600;
// get electron
const electron = require('electron');
// get electron app
const app = electron.app;
// flags: don't enter GUI launch until both sails & electron report ready
var electronIsReady = sailsIsReady = gruntIsReady = false;
// block repeat launches (edge contingency)
var windowIsLaunching = splashIsUp = false;
var splashResponse = 'pong';
// electron window(s)
var mainWindow = splashWindow = null;
// delay after all preflight checks pass
var windowCreationDelay = 0;
// sails app address
const appAddress = 'http://127.0.0.1', appPort = 1337;

const BrowserWindow = electron.BrowserWindow;
if (app) app.on('ready', tryLaunchingForElectron);
else electronIsReady = true;

function tryLaunchingForSails() {
  sailsIsReady = true;
  try {
    if (app && electronIsReady && gruntIsReady) createWindow();
  }
  catch (e) { console.error(e); }
}
function tryLaunchingForElectron() {
  // try to prevent multiple instances of the app running
  app.requestSingleInstanceLock();
  electronIsReady = true;
  if (!splashIsUp) {
    splashIsUp = true;
    // show splash screen
    splashWindow = new BrowserWindow({
      width: width, height: height,
      transparent: true, frame: false, alwaysOnTop: true,
      focusable: false, fullscreenable: false,
      webPreferences: { nodeIntegration: true }
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
  setTimeout(function() {
    try {
      // tell the splash page to close
      splashResponse = 'close';
      // create main window
      mainWindow = new BrowserWindow({show: false, width: width, height: height,
        backgroundColor: backgroundColor
      });
      // hide menu bar where available
      mainWindow.setMenuBarVisibility(false);
      // maximize the window
      mainWindow.maximize();
      // bring to the front
      mainWindow.focus();
      // go to the sails app
      mainWindow.loadURL(`${appAddress}:${appPort}/`);
      // show javascript & DOM consoles
      mainWindow.webContents.openDevTools();
      // show browser only when it's ready to render itself
      mainWindow.once('ready-to-show', function() {
        // get the splash out of the way
        splashWindow.setAlwaysOnTop(false);
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
    catch (e) { console.error(e); }
  }, windowCreationDelay);
}

// tell the splash window when it's time to hide & close
if (app) app.on('ready', function() {
  var ipcMain = electron.ipcMain;
  ipcMain.on('splashPing', (event, arg) => {
    try {
      event.sender.send('splashPing', splashResponse);
    } catch (e) { console.log(e); }
    if (splashResponse === 'close') {
      //splashWindow = null;
      ipcMain.removeAllListeners('splashPing');
    }
    // console.log(`${arg}||${splashResponse}`);
  });
});

// quit when all windows are closed
if (app) app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    sails.lower(function (err) {
      if (err) {
        console.log(err);
        app.exit(1);
      } else
        app.quit();
      setTimeout(()=>{app.quit();},5000);
    });
  }
});

// probably for mobile
if (app) app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
})

// if (app) app.on('ready', function() {
//   nativeTheme = electron.nativeTheme;
//   nativeTheme.themeSource = 'dark';
// });

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
