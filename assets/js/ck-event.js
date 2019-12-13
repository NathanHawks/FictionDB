try {
  CKEDITOR.replace('noteEditor', {height: '66vh', width: '32vw'});
  // setup toolbar
  $('.btn').button();
  $('input[name="editorType"]').checkboxradio();
  $('#col-2-editorType').controlgroup();
  $('#mainToolbar').controlgroup();
  $('#col-2-mainToolbar').controlgroup();
  var sumBtn = $('#editorType_publicNote');
  var elvBtn = $('#editorType_authorNote');
  $('input[type=radio][name=editorType]').change((event, ui)=>{
    saveEventNote_helper(event,ui);
    attachAutoSave();
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveEventNote_helper(e,ui);
  });
  attachAutoSave();
  indicateSaved();
} catch (e) { console.log(e); }

async function saveEventNote_helper(event,ui) {
  disableSaveBtn();
  autosaveCandidate = false;
  clearInterval(autosaveInterval);
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newAuthorNoteContent = inst.getData();
      if (newAuthorNoteContent !== authorNoteContent) {
        saveEventContent(eventID, 'Note', authorNoteID, newAuthorNoteContent, 'authorNote');
        authorNoteContent = newAuthorNoteContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newPublicNoteContent = inst.getData();
      if (newPublicNoteContent !== publicNoteContent) {
        saveEventContent(eventID, 'Note', publicNoteID, newPublicNoteContent, 'publicNote');
        publicNoteContent = newPublicNoteContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newPublicNoteContent = inst.getData();
    inst.setData(authorNoteContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newPublicNoteContent !== publicNoteContent) {
      saveEventContent(eventID, 'Note', publicNoteID, newPublicNoteContent, 'publicNote');
      publicNoteContent = newPublicNoteContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newAuthorNoteContent = inst.getData();
    inst.setData(publicNoteContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newAuthorNoteContent !== authorNoteContent) {
      saveEventContent(eventID, 'Note', authorNoteID, newAuthorNoteContent, 'authorNote');
      authorNoteContent = newAuthorNoteContent;
    }
  } else {
    console.log('wait what?');
  }
  indicateSaved();
}
