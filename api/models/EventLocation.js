module.exports = {
  attributes: {
    event: { model: 'Event' },
    location: { model: 'Location' },
    sequence: { type: 'number' },
    authorTitle: { model: 'Title' },
    newsTitle: { model: 'Title' },
    colloqTitle: { model: 'Title' },
    authorNote: { model: 'Note' },
    publicNote: { model: 'Note' }
  },
  getTitleFieldNames: (type) => {
    switch (type) {
      case 'event':    return Event.getTitleFieldNames();
      case 'location': return Location.getTitleFieldNames();
    }
  },
  getTitleFieldRefs: (type) => {
    switch (type) {
      case 'event':    return Event.getTitleFieldRefs();
      case 'location': return Location.getTitleFieldRefs();

    }
  },
  getEvents: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Event;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'event';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = EventLocation;
    // the field in thisRef to match linkedID against
    var linkField = 'location';

    q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({ where: q, sort: 'sequence ASC' });

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
    var thisRef = EventLocation;
    // the field in thisRef to match linkedID against
    var linkField = 'event';

    q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({ where: q, sort: 'sequence ASC' });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      thisRef.getTitleFieldNames(fieldName), thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;

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
