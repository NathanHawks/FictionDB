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
    saveSettingNote_helper(event,ui);
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveSettingNote_helper(e,ui);
  });
} catch (e) { console.log(e); }

async function saveSettingNote_helper(event,ui) {
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newAuthorNoteContent = inst.getData();
      if (newAuthorNoteContent !== authorNoteContent && newAuthorNoteContent !== '') {
        saveSettingContent(settingID, 'Note', authorNoteID, newAuthorNoteContent, 'authorNote');
        authorNoteContent = newAuthorNoteContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newPublicNoteContent = inst.getData();
      if (newPublicNoteContent !== publicNoteContent && newPublicNoteContent !== '') {
        saveSettingContent(settingID, 'Note', publicNoteID, newPublicNoteContent, 'publicNote');
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
    if (newPublicNoteContent !== publicNoteContent && newPublicNoteContent !== '') {
      saveSettingContent(settingID, 'Note', publicNoteID, newPublicNoteContent, 'publicNote');
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
    if (newAuthorNoteContent !== authorNoteContent && newAuthorNoteContent !== '') {
      saveSettingContent(settingID, 'Note', authorNoteID, newAuthorNoteContent, 'authorNote');
      authorNoteContent = newAuthorNoteContent;
    }
  } else {
    console.log('wait what?');
  }
}
