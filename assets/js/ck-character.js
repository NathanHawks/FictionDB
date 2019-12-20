try {
  CKEDITOR.replace('noteEditor', {height: '66vh', width: '32vw'});
  // setup toolbar
  $('.btn').button();
  $('input[name="editorType"]').checkboxradio();
  $('#col-2-editorType').controlgroup();
  $('#mainToolbar').controlgroup();
  $('#col-2-mainToolbar').controlgroup();
  var sumBtn = $('#editorType_traits');
  var elvBtn = $('#editorType_backstory');
  $('input[type=radio][name=editorType]').change((event, ui)=>{
    saveCharacterNote_helper(event,ui);
    attachAutoSave();
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveCharacterNote_helper(e,ui);
  });
  attachAutoSave();
  indicateSaved();
} catch (e) { console.log(e); }

async function saveCharacterNote_helper(event,ui) {
  disableSaveBtn();
  autosaveCandidate = false;
  clearInterval(autosaveInterval);
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newBackstoryContent = inst.getData();
      if (newBackstoryContent !== assocNotes.backstory.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.backstory.id, newBackstoryContent, 'backstory');
        assocNotes.backstory.content = newBackstoryContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newTraitsContent = inst.getData();
      if (newTraitsContent !== assocNotes.traits.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.traits.id, newTraitsContent, 'traits');
        assocNotes.traits.content = newTraitsContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newTraitsContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.backstory.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
        },50);
      },150);
    } catch (e) { }
    if (newTraitsContent !== assocNotes.traits.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.traits.id, newTraitsContent, 'traits');
      assocNotes.traits.content = newTraitsContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newBackstoryContent = inst.getData();
    $('#cke_veil').hide().fadeIn(150);
    try {
      setTimeout(()=>{
        inst.setData(assocNotes.traits.content);
        inst.destroy();
        CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
        setTimeout(()=>{
          $('#cke_veil').fadeOut(150);
          attachAutoSave();
          indicateSaved();
        },50);
      },150);
    } catch (e) { }
    if (newBackstoryContent !== assocNotes.backstory.content) {
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.backstory.id, newBackstoryContent, 'backstory');
      assocNotes.backstory.content = newBackstoryContent;
    }
  } else {
    console.log('wait what?');
  }
  indicateSaved();
}
