module.exports = {
  friendlyName: 'Home',
  description: 'Homepage',
  inputs: {
    iconsSorting: {
      type: 'string',
      required: false
    },
    iconsShowing: {
      type: 'ref',
      required: false
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/home'
    }
  },
  fn: async function (inputs) {
    let sorting = (inputs.iconsSorting) ? inputs.iconsSorting : 'alpha-asc';
    let showing = (inputs.iconsShowing) ? inputs.iconsShowing : 'all';
    var storyIcons = [];
    var characterIcons = [];
    var eventIcons = [];
    var locationIcons = [];
    var settingIcons = [];
    if (showing === 'all' || showing.includes('story'))
      storyIcons = await sails.helpers.makeStoryIcons('', '', sorting);
    if (showing === 'all' || showing.includes('character'))
      characterIcons = await sails.helpers.makeCharacterIcons('', '', sorting);
    if (showing === 'all' || showing.includes('event'))
      eventIcons = await sails.helpers.makeEventIcons('', '', sorting);
    if (showing === 'all' || showing.includes('location'))
      locationIcons = await sails.helpers.makeLocationIcons('', '', sorting);
    if (showing === 'all' || showing.includes('setting'))
      settingIcons = await sails.helpers.makeSettingIcons('', '', sorting);

    return {
      isStartup: false,
      storyIcons: storyIcons,
      characterIcons: characterIcons,
      eventIcons: eventIcons,
      locationIcons: locationIcons,
      settingIcons: settingIcons
    };
  }
};
