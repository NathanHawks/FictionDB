module.exports = {
  attributes: {
    story: { model: 'Story' },
    setting: { model: 'Setting' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: async (type) => {
    switch (type) {
      case 'setting':
        return ['authorTitle','newsTitle','colloqTitle'];
      case 'story':
        return ['mainTitle'];
    }
  },
  getTitleFieldRefs: async (type) => {
    switch (type) {
      case 'setting':
        return [Title, Title, Title];
      case 'story':
        return [Title];
    }
  },
  getStories: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Story;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'story';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StorySetting;
    // the field in thisRef to match linkedID against
    var linkField = 'setting';

    var q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
  },
  getSettings: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Setting;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'setting';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StorySetting;
    // the field in thisRef to match linkedID against
    var linkField = 'story';

    var q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
  },
  linkRecords: async ({story, setting}) => {
    let q = {story: story, setting: setting};
    let r = await StorySetting.findOne(q);
    if (r === undefined) {
      r = await StorySetting.create(q).fetch();
    }
    return r;
  },
  unlinkRecords: async ({story, setting}) => {
    let q = {story: story, setting: setting};
    let r = await StorySetting.destroy(q);
  }
};
