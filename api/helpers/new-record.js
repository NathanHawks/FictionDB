module.exports = {
  friendlyName: 'New record',
  description: 'refactored',
  inputs: {
    classRef: {
      type: 'ref',
      required: true
    },
    className: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs) {
    try {
      let classRef = inputs.classRef;
      let className = inputs.className;
      let lcClassName = className.toLowerCase();
      let fieldName = classRef.getTitleFieldNames()[0];
      var n = await Title.create({
        roleLabel: fieldName,
        content: inputs.name})
      .fetch();
      let q = {};
      q[fieldName] = n.id;
      var c = await classRef.create(q).fetch();
      let r = {};
      r[lcClassName] = c;
      r[fieldName] = n;
      return r;
    } catch (e) { console.log(e); }
  }
};
