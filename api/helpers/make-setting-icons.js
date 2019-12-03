module.exports = {
  friendlyName: 'Make setting icons',
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
      var settings = await Setting.find({where:{trash: false}});
      while (settings === undefined) {}
      for (let x = 0; x < settings.length; x++) {
        let s = settings[x];
        let id = s.id;
        let t = await Title.findOne({id: s.authorTitle});
        while (t===undefined) {}
        let title = t.content;
        output += `<div id="Setting_${id}" class="deskicon setting-icon"><a onclick="requestPage('setting/${id}');" href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
