module.exports = {
  attributes: {
    story: { model: 'Story' },
    character: { model: 'Character' },
    group: { type: 'string' },
    outline: { model: 'Note' },
    role: { model: 'Title' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: async (type) => {
    switch (type) {
      case 'story':
        return ['mainTitle'];
      break;
      case 'character':
        return ['realName', 'codeName'];
      break;

    }
  },
  getTitleFieldRefs: async (type) => {
    switch (type) {
      case 'story':
        return [Title];
      break;
      case 'character':
        return [Title, Title];
      break;
    }
  },
  getCharacters: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Character;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'character';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StoryCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'story';

    var q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
  },
  getStories: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Story;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'story';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = StoryCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'character';

    var q = {};
    q[linkField] = linkedID;
    var results = await thisRef.find({
      where: q, sort: 'sequence ASC'
    });

    var holder = await sails.helpers.populate(results, fieldName, classRef,
      await thisRef.getTitleFieldNames(fieldName), await thisRef.getTitleFieldRefs(fieldName)
    );

    return holder;
  },
  linkRecords: async ({story, character}) => {
    let q = {story: story, character: character};
    let r = await StoryCharacter.findOne(q);
    if (r === undefined) {
      r = await StoryCharacter.create(q).fetch();
    }
    return r;
  },
  unlinkRecords: async ({story, character}) => {
    let q = {story: story, character: character};
    let r = await StoryCharacter.destroy(q);
  }
};
