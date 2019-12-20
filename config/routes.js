/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { action: 'common/startup', locals: {layout: 'layouts/layout'} },
  '/home': { action: 'common/home' },
  'POST /dragdrop': { action: 'common/dragdrop' },
  'POST /create-attach': { action: 'common/create-attach' },
  'POST /unlink': { action: 'common/unlink' },
  'POST /icons': {action: 'common/icons' },
  'GET /new-story': { action: 'common/new-story' },
  'GET /new-character': { action: 'common/new-character' },
  'GET /new-event': { action: 'common/new-event' },
  'GET /new-location': { action: 'common/new-location' },
  'GET /new-setting': { action: 'common/new-setting' },
  'POST /save-content': { action: 'common/save-content' },
  'POST /save-native': { action: 'common/save-native' },
  '/story/:storyID': { action: 'story/workspace' },
  '/character/:characterID': { action: 'character/workspace' },
  '/event/:eventID': { action: 'event/workspace' },
  '/location/:locationID': { action: 'location/workspace' },
  '/setting/:settingID': { action: 'setting/workspace' },
  'POST /common/send-to-trash': { action: 'common/send-to-trash' },
  'POST /story/save-sequence': { action: 'story/save-sequence' },
  'POST /setting/save-sequence': { action: 'setting/save-sequence' },
  'POST /location/save-sequence': {action: 'location/save-sequence' },
  'POST /character/save-sequence': {action: 'character/save-sequence' },
  'POST /event/save-sequence': {action: 'event/save-sequence' },
  '/intensity-graph': {action: 'common/intensity-graph' },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
