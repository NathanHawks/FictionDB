module.exports = {
  friendlyName: 'Icons',
  description: 'Icons common.',
  inputs: {
    type: {
      type: 'string',
      required: true
    },
    cssClass: {
      type: 'string',
      required: false
    },
    clickHandler: {
      type: 'string',
      required: false
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/icons'
    }
  },
  fn: async function (inputs) {
    let className = await sails.helpers['uppercaseFirst'](inputs.type);

    switch (className) {
      case 'Character':  className = 'Character';  classRef = Character;  break;
      case 'Event':      className = 'Event';      classRef = Event;      break;
      case 'Setting':    className = 'Setting';    classRef = Setting;    break;
      case 'Location':   className = 'Location';   classRef = Location;   break;
      case 'Story':      className = 'Story';      classRef = Story;      break;
    }

    let helper = `makeIcons`;
    let cssClass = (inputs.cssClass) ? inputs.cssClass : '';
    let clickHandler = (inputs.clickHandler) ? inputs.clickHandler : '';
    let icons = await sails.helpers[helper](classRef, className, cssClass, clickHandler);
    return { icons: icons, cssClass: cssClass };

  }


};
