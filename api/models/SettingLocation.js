module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    location: { model: 'Location' },
    sequence: { type: 'number'},
  },
  getTitleFieldNames: (type) => {
    switch (type) {
      case 'setting':   return Setting.getTitleFieldNames();
      case 'location':  return Location.getTitleFieldNames();
    }
  },
  getTitleFieldRefs: (type) => {
    switch (type) {
      case 'setting':   return Setting.getTitleFieldRefs();
      case 'location':  return Location.getTitleFieldRefs();
    }
  },
  getSettings: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Setting;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'setting';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = SettingLocation;
    // the field in thisRef to match linkedID against
    var linkField = 'location';

    q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;

  },
  getLocations: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Location;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'location';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = SettingLocation;
    // the field in thisRef to match linkedID against
    var linkField = 'setting';

    q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
  },
  linkRecords: async ({setting, location}) => {
    let q = {setting: setting, location: location};
    let r = await SettingLocation.findOne(q);
    if (r === undefined) {
      r = await SettingLocation.create(q).fetch();
    }
    return r;
  },

};
