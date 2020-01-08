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
      case 'Character':  classRef = Character;  break;
      case 'Event':      classRef = Event;      break;
      case 'Setting':    classRef = Setting;    break;
      case 'Location':   classRef = Location;   break;
      case 'Story':      classRef = Story;      break;
    }

    let cssClass = (inputs.cssClass) ? inputs.cssClass : '';
    let clickHandler = (inputs.clickHandler) ? inputs.clickHandler : '';
    let icons = await sails.helpers.makeIcons(classRef, className, cssClass, clickHandler);
    return { icons: icons, cssClass: cssClass };

  }


};
