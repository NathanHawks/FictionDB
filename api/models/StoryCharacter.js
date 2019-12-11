module.exports = {
  attributes: {
    story: { model: 'Story' },
    character: { model: 'Character' },
    group: { type: 'string' },
    outline: { model: 'Note' },
    role: { model: 'Title' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: () => {
    return ['realName','codeName'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title];
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
  linkRecords: async ({story, character}) => {
    let q = {story: story, character: character};
    let r = await StoryCharacter.findOne(q);
    if (r === undefined) {
      r = await StoryCharacter.create(q).fetch();
    }
    return r;
  },
};
