module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    character: { model: 'Character' },
    sequence: {type: 'number'},
  },
  getTitleFieldNames: (type) => {
    switch (type) {
      case 'setting':     return Setting.getTitleFieldNames();
      case 'character':   return Character.getTitleFieldNames();
    }
  },
  getTitleFieldRefs: (type) => {
    switch (type) {
      case 'setting':     return Setting.getTitleFieldRefs();
      case 'character':   return Character.getTitleFieldRefs();
    }
  },
  getCharacters: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Character;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'character';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = SettingCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'setting';

    q = {};
    q[linkField] = linkedID
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
    var thisRef = SettingCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'character';

    q = {};
    q[linkField] = linkedID
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;

  },
  linkRecords: async ({setting, character}) => {
    let q = {setting: setting, character: character};
    let r = await SettingCharacter.findOne(q);
    if (r === undefined) {
      r = await SettingCharacter.create(q).fetch();
    }
    return r;
  },
};
