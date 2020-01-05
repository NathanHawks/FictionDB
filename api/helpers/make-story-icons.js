module.exports = {
  friendlyName: 'Make story icons',
  description: '',
  inputs: {
    cssClass: {
      type: 'string',
      required: false
    },
    clickHandler: {
      type: 'string',
      required: false
    },
    sorting: {
      type: 'string',
      required: false
    },
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    var sorting = inputs.sorting;
    var output = '';
    var sortFn = null;
    try {
      var stories = await Story.find({where:{trash: false}})
        .populate('mainTitle');
      // icons are shown in upside-down order so all sorts must be reverse
      switch (sorting) {
        case 'creat-desc':
          sortFn = function (a, b) {
            if (a.createdAt < b.createdAt) return -1;
            if (a.createdAt > b.createdAt) return 1;
            return 0;
          }
        break;
        case 'creat-asc':
          sortFn = function (a, b) {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
          }
        break;
        case 'updat-desc':
          sortFn = function (a, b) {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            return 0;
          }
        break;
        case 'updat-asc':
          sortFn = function (a, b) {
            if (a.updatedAt < b.updatedAt) return -1;
            if (a.updatedAt > b.updatedAt) return 1;
            return 0;
          }
        break;
        case 'alpha-desc':
          sortFn = function (a, b) {
            if (a.mainTitle.content < b.mainTitle.content) return -1;
            if (a.mainTitle.content > b.mainTitle.content) return 1;
            return 0;
          }
        case 'alpha-asc':
        default:
          sortFn = function (a, b) {
            if (a.mainTitle.content < b.mainTitle.content) return 1;
            if (a.mainTitle.content > b.mainTitle.content) return -1;
            return 0;
          }
        break;
      }
      stories.sort(sortFn);
      for (let x = 0; x < stories.length; x++) {
        let s = stories[x];
        let id = s.id;
        let t = s.mainTitle;
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Story_${id}" class="${cssClass} story-icon">`
        + `<a onclick="${clickHandler}('story/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
