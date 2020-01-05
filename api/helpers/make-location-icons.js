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
      var locations = await Location.find({where:{trash: false}})
        .populate('authorTitle');
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
            if (a.authorTitle.content < b.authorTitle.content) return -1;
            if (a.authorTitle.content > b.authorTitle.content) return 1;
            return 0;
          }
        case 'alpha-asc':
        default:
          sortFn = function (a, b) {
            if (a.authorTitle.content < b.authorTitle.content) return 1;
            if (a.authorTitle.content > b.authorTitle.content) return -1;
            return 0;
          }
        break;
      }
      locations.sort(sortFn);
      for (let x = 0; x < locations.length; x++) {
        let l = locations[x];
        let id = l.id;
        let t = l.authorTitle;
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
