module.exports = {
  friendlyName: 'Splash & Startup',
  description: 'Startup splash page.',
  inputs: {
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/startup'
    }
  },
  fn: async function (inputs) {
    var icons = await sails.helpers.makeIcons(
      [Story, Character, Event, Location, Setting],
      ['Story', 'Character', 'Event', 'Location', 'Setting']
    );
    var mainTitleFieldNames = await sails.helpers.getMainTitleFieldNames();

    return {
      cssClass: '',
      iconsSize: 'large',
      isStartup: true,
      icons: icons,
      mainTitleFieldNames: mainTitleFieldNames,
    };
  }
};
