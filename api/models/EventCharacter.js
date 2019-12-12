module.exports = {
  attributes: {
    event: { model: 'Event' },
    character: { model: 'Character' },
    role: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' },
    sequence: { type: 'number' },
  },
  linkRecords: async ({event, character}) => {
    let q = {event: event, character: character};
    let r = await EventCharacter.findOne(q);
    if (r === undefined) {
      r = await EventCharacter.create(q).fetch();
    }
    return r;
  },
  getTitleFieldNames: (type) => {
    switch (type) {
      case 'event':     return Event.getTitleFieldNames();
      case 'character': return Character.getTitleFieldNames();
    }
  },
  getTitleFieldRefs: (type) => {
    switch (type) {
      case 'event':     return Event.getTitleFieldRefs();
      case 'character': return Character.getTitleFieldRefs();
    }
  },
  getEvents: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Event;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'event';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = EventCharacter;
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
  getCharacters: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Character;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'character';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = EventCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'event';

    q = {};
    q[linkField] = linkedID
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;

  }
};
