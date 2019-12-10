module.exports = {
  friendlyName: 'Make location icons',
  description: '',
  inputs: {
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
        output += `<div id="Location_${id}" class="deskicon location-icon"><a onclick="requestPage('location/${id}');" associd="${t.id}" href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
