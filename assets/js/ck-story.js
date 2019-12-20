try {
  CKEDITOR.replace('noteEditor', {height: '66vh', width: '32vw'});
  // setup toolbar
  $('.btn').button();
  $('input[name="editorType"]').checkboxradio();
  $('#col-2-editorType').controlgroup();
  $('#mainToolbar').controlgroup();
  $('#col-2-mainToolbar').controlgroup();
  var sumBtn = $('#editorType_summary');
  var elvBtn = $('#editorType_elevatorPitch');
  $('input[type=radio][name=editorType]').change((event, ui)=>{
    saveStoryNote_helper(event,ui);
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveStoryNote_helper(e,ui);
  });
  attachAutoSave();
  indicateSaved();
} catch (e) { console.log(e); }

async function saveStoryNote_helper(event,ui) {
  disableSaveBtn();
  autosaveCandidate = false;
  clearInterval(autosaveInterval);
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newElevatorPitchContent = inst.getData();
      if (newElevatorPitchContent !== assocNotes.elevatorPitch.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.elevatorPitch.id, newElevatorPitchContent, 'elevatorPitch');
        assocNotes.elevatorPitch.content = newElevatorPitchContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newSummaryContent = inst.getData();
      if (newSummaryContent !== assocNotes.summary.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.summary.id, newSummaryContent, 'summary');
        assocNotes.summary.content = newSummaryContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newSummaryContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.elevatorPitch.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
        },50);
      },150);
    } catch (e) { }
    if (newSummaryContent !== assocNotes.summary.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.summary.id, newSummaryContent, 'summary');
      assocNotes.summary.content = newSummaryContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newElevatorPitchContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.summary.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
        },50);
      },150);
    } catch (e) { }
    if (newElevatorPitchContent !== assocNotes.elevatorPitch.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.elevatorPitch.id, newElevatorPitchContent, 'elevatorPitch');
      assocNotes.elevatorPitch.content = newElevatorPitchContent;
    }
  } else {
    console.log('wait what?');
  }
  indicateSaved();
}
