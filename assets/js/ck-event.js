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
