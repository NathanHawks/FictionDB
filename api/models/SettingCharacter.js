module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    character: { model: 'Character' },
    sequence: {type: 'number'},
  },
  getTitleFieldNames: () => {
    return ['authorTitle', 'newsTitle', 'colloqTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title, Title];
  },
  getCharacters: async (settingID) => {
    var settingCharacters = await SettingCharacter.find({
      where: {setting: settingID}, sort: 'sequence ASC'
    });
    var characters = [];
    // store the functions or the promises will be broken
    var f = [];
    for (x = 0; x < settingCharacters.length; x++) {
      let charID = settingCharacters[x].character;

      f[x] = async (x, charID, characters) => {
        characters[x] = await Character.findOne({id: charID})
          .populate('realName').populate('codeName');
        return Promise.resolve(characters[x]);
      }

      characters[x] = await f[x](x, charID, characters);
    }
    return characters;
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
      thisRef.getTitleFieldNames(), thisRef.getTitleFieldRefs()
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
