module.exports = {
  friendlyName: 'Populate',
  description: 'Populate something.',
  inputs: {
    results: {
      type: 'ref',
      required: true
    },
    modelName: {
      type: 'string',
      required: true
    },
    classRef: {
      type: 'ref',
      required: true
    },
    fieldNames: {
      type: 'ref',
      required: true
    },
    fieldRefs: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function ({results, modelName, classRef, fieldNames, fieldRefs}) {
    var f = [];
    var holder = [];
    // loop results from link table e.g. StoryCharacter
    for (let x = 0; x < results.length; x++) {
      // prime matrix to hold functions to keep them in scope
      f[x] = [];
      // get the associated id (StoryCharacter.character) for the main entity table e.g. Character
      var foundID = results[x][modelName];
      // prep a query
      var q = {};
      q['id'] = foundID;
      q.trash = false;
      // request the e.g. Character identified by e.g. StoryCharacter.character
      holder[x] = await classRef.findOne(q);
      // loop fieldNames param
      if (holder[x] !== undefined) for (let y = 0; y < fieldNames.length; y++) {
        // get a fieldName from the param
        var fieldName = fieldNames[y];
        // store a function in a matrix
        f[x][y] = async (fieldRef, assocID) => {
          // fetch e.g. Title based on e.g. Character.realName & assign to main entity
          return await fieldRef.findOne({id: assocID});
        }
        // try the function
        try {
          if (holder[x][fieldName] !== null) {
            holder[x][fieldName] = await f[x][y](
              fieldRefs[y], holder[x][fieldName]
            );
          } else holder[x][fieldName] = undefined;
        }
        catch (e) { console.log(e); }
        // create empty object if no result
        if (holder[x][fieldName] === undefined) {
          let stub = {};
          for (let key in fieldRefs[y].attributes) {
            stub[key] = '';
          }
          stub.id = -1;
          holder[x][fieldName] = stub;
        }
      }
    }
    return holder;
  }
};
