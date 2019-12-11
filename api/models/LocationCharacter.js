module.exports = {
  attributes: {
    location: { model: 'Location' },
    character: { model: 'Character' }
  },
  linkRecords: async ({location, character}) => {
    let q = {location: location, character: character};
    let r = await LocationCharacter.findOne(q);
    if (r === undefined) {
      r = await LocationCharacter.create(q).fetch();
    }
    return r;
  },

};
