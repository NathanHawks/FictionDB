module.exports = {
  attributes: {
    story: { model: 'Story' },
    event: { model: 'Event' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: async (type) => {
    switch (type) {
      case 'story':
        return ['mainTitle'];
      case 'event':
        return ['authorTitle','newsTitle','colloqTitle'];
    }
  },
  getTitleFieldRefs: async (type) => {
    switch (type) {
      case 'story':
        return [Title];
      case 'event':
        return [Title, Title, Title];
    }
  },
  getStories: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Story;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'story';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StoryEvent;
    // the field in thisRef to match linkedID against
    var linkField = 'event';

    var q = {};
    q[linkField] = linkedID
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
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

    var q = {};
    q[linkField] = linkedID
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
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
  },
  unlinkRecords: async ({story, event}) => {
    let q = {story: story, event: event};
    let r = await StoryEvent.destroy(q);
  }
};
