try {
  CKEDITOR.replace('noteEditor', {height: '66vh', width: '32vw'});
} catch (e) { console.log(e); }
try {
  // setup toolbar
  $('.btn').button();
  $('input[name="editorType"]').checkboxradio();
  $('#col-2-editorType').controlgroup();
  $('#mainToolbar').controlgroup();
  $('#col-2-mainToolbar').controlgroup();
  var sumBtn = $('#editorType_publicNote');
  var elvBtn = $('#editorType_authorNote');
  $('input[type=radio][name=editorType]').change((event, ui)=>{
    saveLocationNote_helper(event,ui);
    attachAutoSave();
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveLocationNote_helper(e,ui);
  });
  attachAutoSave();
  indicateSaved();
} catch (e) { console.log(e); }

async function saveLocationNote_helper(event,ui) {
  disableSaveBtn();
  autosaveCandidate = false;
  clearInterval(autosaveInterval);
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newAuthorNoteContent = inst.getData();
      if (newAuthorNoteContent !== assocNotes.authorNote.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.authorNote.id, newAuthorNoteContent, 'authorNote');
        assocNotes.authorNote.content = newAuthorNoteContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newPublicNoteContent = inst.getData();
      if (newPublicNoteContent !== assocNotes.publicNote.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.publicNote.id, newPublicNoteContent, 'publicNote');
        assocNotes.publicNote.content = newPublicNoteContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newPublicNoteContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.authorNote.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
      },50);
      },150);
    } catch (e) { }
    if (newPublicNoteContent !== assocNotes.publicNote.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.publicNote.id, newPublicNoteContent, 'publicNote');
      assocNotes.publicNote.content = newPublicNoteContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newAuthorNoteContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.publicNote.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
      },50);
      },150);
    } catch (e) { }
    if (newAuthorNoteContent !== assocNotes.authorNote.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.authorNote.id, newAuthorNoteContent, 'authorNote');
      assocNotes.authorNote.content = newAuthorNoteContent;
    }
  } else {
    console.log('wait what?');
  }
  indicateSaved();
}
