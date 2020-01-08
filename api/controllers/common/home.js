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
    var showRef = [], showStr = [];
    let cssClass = (inputs.cssClass) ? inputs.cssClass : '';
    let sorting = (inputs.iconsSorting) ? inputs.iconsSorting : 'alpha-asc';
    let showing = (inputs.iconsShowing) ? inputs.iconsShowing : 'all';
    let iconsSize = (inputs.iconsSize) ? inputs.iconsSize : '';
    cssClass += (iconsSize === 'small') ? 'deskicon dialogicon ' : '';
    var icons = [];
    if (showing === 'all' || showing.includes('story'))
      { showRef[showRef.length] = Story;      showStr[showStr.length] = 'Story'; }
    if (showing === 'all' || showing.includes('character'))
      { showRef[showRef.length] = Character;  showStr[showStr.length] = 'Character'; }
    if (showing === 'all' || showing.includes('event'))
      { showRef[showRef.length] = Event;      showStr[showStr.length] = 'Event'; }
    if (showing === 'all' || showing.includes('location'))
      { showRef[showRef.length] = Location;   showStr[showStr.length] = 'Location'; }
    if (showing === 'all' || showing.includes('setting'))
      { showRef[showRef.length] = Setting;    showStr[showStr.length] = 'Setting'; }
    var icons = await sails.helpers.makeIcons( showRef, showStr, cssClass, '', sorting );

    // template gets whiny if cssClass === ''
    cssClass = (cssClass) ? cssClass : ' ';
    return {
      iconsSize: iconsSize,
      cssClass: cssClass,
      isStartup: false,
      icons: icons
    };
  }
};
