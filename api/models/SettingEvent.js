module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    event: { model: 'Event' },
    sequence: { type: 'number' },
  },
  getTitleFieldNames: (type) => {
    switch (type) {
      case 'setting': return Setting.getTitleFieldNames();
      case 'event':   return Event.getTitleFieldNames();
    }
  },
  getTitleFieldRefs: (type) => {
    switch (type) {
      case 'setting': return Setting.getTitleFieldRefs();
      case 'event':   return Event.getTitleFieldRefs();
    }
  },
  getEvents: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Event;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'event';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = SettingEvent;
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
  getSettings: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Setting;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'setting';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = SettingEvent;
    // the field in thisRef to match linkedID against
    var linkField = 'event';

    q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldNames(fieldName)
    );

    return holder;
  },
  linkRecords: async ({setting, event}) => {
    let q = {setting: setting, event: event};
    let r = await SettingEvent.findOne(q);
    if (r === undefined) {
      r = await SettingEvent.create(q).fetch();
    }
    return r;
  },

};
