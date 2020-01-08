module.exports = {
  friendlyName: 'Make icons',
  description: '',
  inputs: {
    classRef: {
      type: 'ref',
      required: true
    },
    className: {
      type: 'ref',
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
    var classRef, className;
    var results = [], holder = null;
    if (inputs.classRef.constructor === Array) { classRef = inputs.classRef; }
    else classRef = [inputs.classRef];
    if (inputs.className.constructor === Array) { className = inputs.className; }
    else className = [inputs.className];
    for (var x = 0; x < classRef.length; x++) {
      var nameFieldName = classRef[x].getTitleFieldNames()[0];
      var sortFn = null;
      var output = null;
      try {
        holder = await classRef[x].find({where:{trash: false}})
          .populate(nameFieldName);
      } catch (e) { console.log(e); }
      // mutate and concatenate
      for (let ri = 0; ri < holder.length; ri++) {
        // uncomment the next line if you need the classRef in the row
        // holder[ri].classRef = classRef[x];
        holder[ri].className = className[x];
        holder[ri].lcaseName = className[x].toLowerCase();
        holder[ri].nameFieldName = classRef[x].getTitleFieldNames()[0];
        holder[ri].name = holder[ri][nameFieldName].content;
      }
      results = holder.concat(results);
    }
    try {
      // icons are shown in upside-down order so all sorts must be reverse
      switch (sorting) {
        case 'type-desc':
          sortFn = function (a, b) {
            if (a.className < b.className) return -1;
            if (a.className > b.className) return 1;
            return 0;
          }
        break;
        case 'type-asc':
          sortFn = function (a, b) {
            if (a.className < b.className) return 1;
            if (a.className > b.className) return -1;
            return 0;
          }
        break;
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
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }
        case 'alpha-asc':
        default:
          sortFn = function (a, b) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
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
        let t = c[c.nameFieldName];
        let title = c.name;
        let cssClass = (inputs.cssClass) ? inputs.cssClass : 'deskicon'
        let clickHandler = (inputs.clickHandler)
          ? inputs.clickHandler : 'requestPage';
        let icon = $('<div>')
          .attr('id', `${c.className}_${id}`)
          .addClass(`${cssClass} ${c.lcaseName}-icon`);
        let link = $('<a>')
          .attr('associd', t.id)
          .attr('href', '#')
          .attr('onclick', `${clickHandler}('${c.lcaseName}/${id}');`)
          .html(title)
          .appendTo(icon);
        icon.appendTo(output);
      };
    } catch (e) { console.log(e); }
    return output.html();
  }
};
