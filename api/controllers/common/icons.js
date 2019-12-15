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
    let type = await sails.helpers['uppercaseFirst'](inputs.type);
    let helper = `make${type}Icons`;
    let cssClass = (inputs.cssClass) ? inputs.cssClass : '';
    let clickHandler = (inputs.clickHandler) ? inputs.clickHandler : '';
    let icons = await sails.helpers[helper](cssClass, clickHandler);
    return { icons: icons, cssClass: cssClass };

  }


};
