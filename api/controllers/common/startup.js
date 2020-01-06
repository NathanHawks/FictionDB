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
    var storyIcons = await sails.helpers.makeIcons(Story, 'Story');
    var characterIcons = await sails.helpers.makeIcons(Character, 'Character');
    var eventIcons = await sails.helpers.makeIcons(Event, 'Event');
    var locationIcons = await sails.helpers.makeIcons(Location, 'Location');
    var settingIcons = await sails.helpers.makeIcons(Setting, 'Setting');
    var mainTitleFieldNames = await sails.helpers.getMainTitleFieldNames();

    return {
      cssClass: '',
      iconsSize: 'large',
      isStartup: true,
      storyIcons: storyIcons,
      characterIcons: characterIcons,
      eventIcons: eventIcons,
      locationIcons: locationIcons,
      settingIcons: settingIcons,
      mainTitleFieldNames: mainTitleFieldNames,
    };
  }
};
