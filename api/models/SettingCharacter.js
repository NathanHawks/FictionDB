module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    character: { model: 'Character' },
    sequence: {type: 'number'},
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
  linkRecords: async ({setting, character}) => {
    let q = {setting: setting, character: character};
    let r = await SettingCharacter.findOne(q);
    if (r === undefined) {
      r = await SettingCharacter.create(q).fetch();
    }
    return r;
  },
};
