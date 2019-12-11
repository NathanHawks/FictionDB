module.exports = {
  attributes: {
    story: { model: 'Story' },
    event: { model: 'Event' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: () => {
    return ['authorTitle','newsTitle','colloqTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title, Title];
  },
  getEvents: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Event;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'event';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StoryEvent;
    // the field in thisRef to match linkedID against
    var linkField = 'story';

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
  linkRecords: async ({story, event}) => {
    let q = {story: story, event: event};
    let r = await StoryEvent.findOne(q);
    if (r === undefined) {
      r = await StoryEvent.create(q).fetch();
    }
    return r;

  }
};
