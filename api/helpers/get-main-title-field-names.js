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
    r.location  = Location.getTitleFieldNames()[0];
    r.setting   = Setting.getTitleFieldNames()[0];
    r.story   = Story.getTitleFieldNames()[0];
    return r;
  }
};
