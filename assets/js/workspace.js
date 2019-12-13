var autosaveInterval = null;
var autosaveInterval_loopDelay = 1000;
var autosaveMinimumIdleMS = 2000;
var autosaveCandidate = false; // flag is true when change has been detected
var autosaveLastInput = null; // timestamp

async function attachAutoSave() {
  let inst = CKEDITOR.instances.noteEditor;
  inst.on('contentDom', () => {
    inst.on('change', async (e) => {
      await autosaveOnChange_handler(e);
      autosaveInterval = setInterval(async () => {await autosaveInterval_handler()},
        autosaveInterval_loopDelay
      );
    });
  });
}

async function autosaveOnChange_handler(e) {
  enableSaveBtn();
  autosaveCandidate = true;
  autosaveLastInput = new Date().getTime();
}

async function autosaveInterval_handler() {
  let currentMS = new Date().getTime();
  if (autosaveCandidate === true
    && currentMS - autosaveLastInput > autosaveMinimumIdleMS
  ) {
    // fake a click on the save button
    $('#editorSubmit').trigger('click');
    autosaveCandidate = false;
  }
}

async function disableSaveBtn() {
  $('#editorSubmit').prop('disabled', true);
  $('#editorSubmit').attr('value', 'Saving');
}

async function enableSaveBtn() {
  $('#editorSubmit').prop('disabled', false);
  $('#editorSubmit').attr('value', 'Save');
}

async function indicateSaved() {
  $('#editorSubmit').prop('disabled', true);
  $('#editorSubmit').attr('value', 'Saved');
}
