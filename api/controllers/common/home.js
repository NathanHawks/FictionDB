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
    },
    cssClass: {
      type: 'string',
      required: false
    },
    iconsSize: {
      type: 'string',
      required: false,
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/home'
    }
  },
  fn: async function (inputs) {
    let cssClass = (inputs.cssClass) ? inputs.cssClass : '';
    let sorting = (inputs.iconsSorting) ? inputs.iconsSorting : 'alpha-asc';
    let showing = (inputs.iconsShowing) ? inputs.iconsShowing : 'all';
    let iconsSize = (inputs.iconsSize) ? inputs.iconsSize : '';
    cssClass += (iconsSize === 'small') ? 'deskicon dialogicon ' : '';
    var storyIcons = [];
    var characterIcons = [];
    var eventIcons = [];
    var locationIcons = [];
    var settingIcons = [];
    if (showing === 'all' || showing.includes('story'))
      storyIcons = await sails.helpers.makeIcons(Story, 'Story', cssClass, '', sorting);
    if (showing === 'all' || showing.includes('character'))
      characterIcons = await sails.helpers.makeIcons(Character, 'Character', cssClass, '', sorting);
    if (showing === 'all' || showing.includes('event'))
      eventIcons = await sails.helpers.makeIcons(Event, 'Event', cssClass, '', sorting);
    if (showing === 'all' || showing.includes('location'))
      locationIcons = await sails.helpers.makeIcons(Location, 'Location', cssClass, '', sorting);
    if (showing === 'all' || showing.includes('setting'))
      settingIcons = await sails.helpers.makeIcons(Setting, 'Setting', cssClass, '', sorting);

    // template gets whiny if cssClass === ''
    cssClass = (cssClass) ? cssClass : ' ';
    return {
      iconsSize: iconsSize,
      cssClass: cssClass,
      isStartup: false,
      storyIcons: storyIcons,
      characterIcons: characterIcons,
      eventIcons: eventIcons,
      locationIcons: locationIcons,
      settingIcons: settingIcons
    };
  }
};
