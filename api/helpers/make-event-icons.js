module.exports = {
  friendlyName: 'Make event icons',
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
      var events = await Event.find({where:{trash: false}});
      while (events === undefined) {}
      for (let x = 0; x < events.length; x++) {
        let r = events[x];
        let id = r.id;
        let t = await Title.findOne({id: r.authorTitle});
        while (t===undefined) {}
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Event_${id}" class="${cssClass} event-icon">`
        + `<a onclick="${clickHandler}('event/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
