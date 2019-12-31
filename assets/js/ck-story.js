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
