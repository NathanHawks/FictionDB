module.exports = {
  attributes: {
    setting: { model: 'Setting' },
    location: { model: 'Location' },
    sequence: { type: 'number'},
  },
  getLocations: async (settingID) => {
    var settingLocations = await SettingLocation.find({
      where: {setting: settingID}, sort: 'sequence ASC'
    });
    var locations = [];
    // store the functions
    var f = [];
    for (x = 0; x < settingLocations.length; x++) {
      let locID = settingLocations[x].location

      f[x] = async (x, locID, locations) => {
        locations[x] = await Location.findOne({id: locID})
          .populate('authorTitle').populate('newsTitle').populate('colloqTitle');
        return Promise.resolve(locations[x]);
      }

      locations[x] = await f[x](x, locID, locations);
    }
    return locations;
  },
  linkRecords: async ({setting, location}) => {
    let q = {setting: setting, location: location};
    let r = await SettingLocation.findOne(q);
    if (r === undefined) {
      r = await SettingLocation.create(q).fetch();
    }
    return r;
  },

};
