module.exports = {
  attributes: {
    location: { model: 'Location' },
    character: { model: 'Character' },
    sequence: { type: 'number' }
  },
  getTitleFieldNames: () => {
    return ['authorTitle', 'newsTitle', 'colloqTitle'];
  },
  getTitleFieldRefs: () => {
    return [Title, Title, Title];
  },
  getCharacters: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Character;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'character';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = LocationCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'location';

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
  getLocations: async (linkedID) => {
    // the model we're collecting and returning
    var classRef = Location;
    // lowercase string of same; link table field name (fkey)
    var fieldName = 'location';
    // a reference to this model since we can't have nice things (this/self)
    var thisRef = LocationCharacter;
    // the field in thisRef to match linkedID against
    var linkField = 'character';

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
  linkRecords: async ({location, character}) => {
    let q = {location: location, character: character};
    let r = await LocationCharacter.findOne(q);
    if (r === undefined) {
      r = await LocationCharacter.create(q).fetch();
    }
    return r;
  },

};
