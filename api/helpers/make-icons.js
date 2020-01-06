module.exports = {
  friendlyName: 'Make icons',
  description: '',
  inputs: {
    classRef: {
      type: 'ref',
      required: true
    },
    className: {
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
    },
    sorting: {
      type: 'string',
      required: false
    },
  },
  exits: {
    success: {
      description: 'Refactored to handle all types.',
    },
  },
  fn: async function (inputs) {
    var sorting = inputs.sorting;
    var classRef = inputs.classRef;
    var className = inputs.className;
    var lowerClassName = className.toLowerCase();
    var nameFieldName = classRef.getTitleFieldNames()[0];
    var sortFn = null;
    var output = null;
    try {
      var results = await classRef.find({where:{trash: false}})
        .populate(nameFieldName);
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
            if (a[nameFieldName].content < b[nameFieldName].content) return -1;
            if (a[nameFieldName].content > b[nameFieldName].content) return 1;
            return 0;
          }
        case 'alpha-asc':
        default:
          sortFn = function (a, b) {
            if (a[nameFieldName].content < b[nameFieldName].content) return 1;
            if (a[nameFieldName].content > b[nameFieldName].content) return -1;
            return 0;
          }
        break;
      }
      results.sort(sortFn);
      var $ = global.jq;
      output = $('<div>');
      for (let x = 0; x < results.length; x++) {
        let c = results[x];
        let id = c.id;
        let t = c[nameFieldName];
        let title = t.content;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        let icon = $('<div>')
          .attr('id', `${className}_${id}`)
          .addClass(`${cssClass} ${lowerClassName}-icon`);
        let link = $('<a>')
          .attr('associd', t.id)
          .attr('href', '#')
          .attr('onclick', `${clickHandler}('${lowerClassName}/${id}');`)
          .html(title)
          .appendTo(icon);
        icon.appendTo(output);
      };
    } catch (e) { console.log(e); }
    return output.html();
  }
};
