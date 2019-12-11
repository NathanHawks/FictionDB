module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    event: { model: 'Event' },
    sequence: { type: 'number' },
  },
  getEvents: async (settingID) => {
    var settingEvents = await SettingEvent.find({
      where: {setting: settingID}, sort: 'sequence ASC'
    });
    var events = [];
    // store the functions
    var f = [];
    for (x = 0; x < settingEvents.length; x++) {
      evntID = settingEvents[x].event;

      f[x] = async (x,evntID,events) => {
        events[x] = await Event.findOne({id: evntID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(events[x]);
      };

      events[x] = await f[x](x, evntID, events);
    }
    return events;
  },
  linkRecords: async ({setting, event}) => {
    let q = {setting: setting, event: event};
    let r = await SettingEvent.findOne(q);
    if (r === undefined) {
      r = await SettingEvent.create(q).fetch();
    }
    return r;
  },

};
