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

  '/': { action: 'common/startup'},
  '/home': { action: 'common/home', locals: {layout: null} },
  'POST /dragdrop': { action: 'common/dragdrop', locals: {layout: null}},
  'GET /new-story': { action: 'common/new-story', locals: {layout: null} },
  'POST /story/save-content': { action: 'story/save-content', locals: {layout: null} },
  'POST /character/save-content': { action: 'character/save-content', locals: {layout: null} },
  'POST /event/save-content': { action: 'event/save-content', locals: {layout: null} },
  'POST /setting/save-content': { action: 'setting/save-content', locals: {layout: null} },
  'GET /new-character': { action: 'common/new-character', locals: {layout: null} },
  'GET /new-event': { action: 'common/new-event', locals: {layout: null} },
  'GET /new-location': { action: 'common/new-location', locals: {layout: null} },
  'GET /new-setting': { action: 'common/new-setting', locals: {layout: null} },
  '/story/:storyID': { action: 'story/workspace', locals: {layout: null} },
  '/character/:characterID': { action: 'character/workspace', locals: {layout: null} },
  '/event/:eventID': { action: 'event/workspace', locals: {layout: null} },
  '/location/:locationID': { action: 'location/workspace', locals: {layout: null} },
  '/setting/:settingID': { action: 'setting/workspace', locals: {layout: null} },
  'POST /common/send-to-trash': { action: 'common/send-to-trash', locals: {layout: null} },
  'POST /common/save-sequence': { action: 'common/save-sequence', locals: {layout: null} },
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
