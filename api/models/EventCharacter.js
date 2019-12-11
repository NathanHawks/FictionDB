module.exports = {
  attributes: {
    event: { model: 'Event' },
    character: { model: 'Character' },
    role: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' }
  },
  linkRecords: async ({event, character}) => {
    let q = {event: event, character: character};
    let r = await EventCharacter.findOne(q);
    if (r === undefined) {
      r = await EventCharacter.create(q).fetch();
    }
    return r;
  },

};
