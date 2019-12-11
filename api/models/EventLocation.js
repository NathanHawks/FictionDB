module.exports = {
  attributes: {
    location: { model: 'Location' },
    sequence: { type: 'number' },
    authorTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' }
  },
  linkRecords: async ({event, location}) => {
    let q = {event: event, location: location};
    let r = await EventLocation.findOne(q);
    if (r === undefined) {
      r = await EventLocation.create(q).fetch();
    }
    return r;
  },

};
