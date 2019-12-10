module.exports = {
  friendlyName: 'Make story icons',
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
      var stories = await Story.find({where:{trash: false}});
      while (stories === undefined) {}
      for (let x = 0; x < stories.length; x++) {
        let s = stories[x];
        let id = s.id;
        let t = await Title.findOne({id: s.mainTitle});
        while (t===undefined) {}
        let title = t.content;
        output += `<div id="Story_${id}" class="deskicon story-icon"><a onclick="requestPage('story/${id}');" associd="${t.id}" href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
