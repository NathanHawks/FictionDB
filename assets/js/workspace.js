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

async function makeStoryEventIntensityGraphs() {
  $('.mod-intensity-graph').fadeOut(150);
  setTimeout(() => {
    $('.mod-intensity-graph').remove();
    for (let x = 0; x < stories.length; x++) {
      let modX = x + 1;
      let div = $('<div>').attr('id', `col-3-mod-${modX}`)
        .addClass('mod-col-3 mod mod-intensity-graph').appendTo('.col-3-scroller')
        .hide().fadeIn(250);
      $.ajax({ url: `intensity-graph/${linkedType}/${stories[x].id}`}).done((data) => {
        $(`#col-3-mod-${modX}`).html(data);
      });
    }
  },150);
}
