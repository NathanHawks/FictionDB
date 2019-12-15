module.exports = {
  friendlyName: 'Make location icons',
  description: '',
  inputs: {
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
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    var output = '';
    try {
      var locations = await Location.find({where:{trash: false}});
      while (locations === undefined) {}
      for (let x = 0; x < locations.length; x++) {
        let l = locations[x];
        let id = l.id;
        let t = await Title.findOne({id: l.authorTitle});
        while (t===undefined) {}
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Location_${id}" class="${cssClass} location-icon">`
        + `<a onclick="${clickHandler}('location/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
