module.exports = {
  friendlyName: 'Dragdrop',
  description: 'Dragdrop common.',
  inputs: {
    draggedIDs: {
      type: 'ref',
      required: true
    },
    dropTargetID: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'common/dragdrop'
    }
  },
  fn: async function ({draggedIDs, dropTargetID}) {
    let [dropTargetType,dropTargetDBID] = dropTargetID.split('_');
    let typesArr = ['Story','Character','Event','Location','Setting'];
    let r = null;
    draggedIDs.map(async (dropped) => {
      let [dragTargetType,dragTargetDBID] = dropped.split('_');
      await sails.helpers.linkRecords(
        dragTargetType,dragTargetDBID,dropTargetType,dropTargetDBID
      );
    });
    return {response: 'OK', dropTargetID: dropTargetID};
  }
};
