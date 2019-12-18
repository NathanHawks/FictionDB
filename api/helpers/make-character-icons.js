module.exports = {
  friendlyName: 'Make character icons',
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
      var characters = await Character.find({where:{trash: false}})
        .populate('realName');
      // icons are shown in upside-down order so all sorts must be reverse
      switch (sorting) {
        case 'creat-desc':
          sortFn = (a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            if (a.createdAt > b.createdAt) return 1;
            return 0;
          }
        break;
        case 'creat-asc':
          sortFn = (a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            if (a.createdAt > b.createdAt) return -1;
            return 0;
          }
        break;
        case 'updat-desc':
          sortFn = (a, b) => {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            return 0;
          }
        break;
        case 'updat-asc':
          sortFn = (a, b) => {
            if (a.updatedAt < b.updatedAt) return -1;
            if (a.updatedAt > b.updatedAt) return 1;
            return 0;
          }
        break;
        case 'alpha-desc':
          sortFn = (a, b) => {
            if (a.realName.content < b.realName.content) return -1;
            if (a.realName.content > b.realName.content) return 1;
            return 0;
          }
        case 'alpha-asc':
        default:
          sortFn = (a, b) => {
            if (a.realName.content < b.realName.content) return 1;
            if (a.realName.content > b.realName.content) return -1;
            return 0;
          }
        break;
      }
      characters.sort(sortFn);
      for (let x = 0; x < characters.length; x++) {
        let c = characters[x];
        let id = c.id;
        let t = c.realName;
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        output += `<div id="Character_${id}" class="${cssClass} character-icon">`
        + `<a onclick="${clickHandler}('character/${id}');" associd="${t.id}" `
        + ` href="#">${title}</a></div>`;
      };
    } catch (e) { console.log(e); }
    return output;
  }
};
