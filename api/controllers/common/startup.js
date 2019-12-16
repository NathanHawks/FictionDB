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
    var storyIcons = await sails.helpers.makeStoryIcons();
    var characterIcons = await sails.helpers.makeCharacterIcons();
    var eventIcons = await sails.helpers.makeEventIcons();
    var locationIcons = await sails.helpers.makeLocationIcons();
    var settingIcons = await sails.helpers.makeSettingIcons();
    var mainTitleFieldNames = await sails.helpers.getMainTitleFieldNames();

    return {
      storyIcons: storyIcons,
      characterIcons: characterIcons,
      eventIcons: eventIcons,
      locationIcons: locationIcons,
      settingIcons: settingIcons,
      mainTitleFieldNames: mainTitleFieldNames,
    };
  }
};
