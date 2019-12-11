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
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveCharacterNote_helper(e,ui);
  });
} catch (e) { console.log(e); }

async function saveCharacterNote_helper(event,ui) {
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newBackstoryContent = inst.getData();
      if (newBackstoryContent !== backstoryContent && newBackstoryContent !== '') {
        saveCharacterContent(characterID, 'Note', backstoryID, newBackstoryContent, 'backstory');
        backstoryContent = newBackstoryContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newTraitsContent = inst.getData();
      if (newTraitsContent !== traitsContent && newTraitsContent !== '') {
        saveCharacterContent(characterID, 'Note', traitsID, newTraitsContent, 'traits');
        traitsContent = newTraitsContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newTraitsContent = inst.getData();
    inst.setData(backstoryContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newTraitsContent !== traitsContent && newTraitsContent !== '') {
      saveCharacterContent(characterID, 'Note', traitsID, newTraitsContent, 'traits');
      traitsContent = newTraitsContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newBackstoryContent = inst.getData();
    inst.setData(traitsContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newBackstoryContent !== backstoryContent && newBackstoryContent !== '') {
      saveCharacterContent(characterID, 'Note', backstoryID, newBackstoryContent, 'backstory');
      backstoryContent = newBackstoryContent;
    }
  } else {
    console.log('wait what?');
  }
}
