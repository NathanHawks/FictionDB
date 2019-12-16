module.exports = {
  friendlyName: 'Get main title names',
  description: '',
  inputs: {

  },
  exits: {
    success: {
      outputFriendlyName: 'Main title names',
    },
  },
  fn: async function (inputs) {
    var r = {};
    r.character = Character.getTitleFieldNames()[0];
    r.event     = Event.getTitleFieldNames()[0];
    r.location  = Character.getTitleFieldNames()[0];
    r.setting   = Character.getTitleFieldNames()[0];
    r.story   = Character.getTitleFieldNames()[0];
    return r;

  }


};
