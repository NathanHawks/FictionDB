try {
  CKEDITOR.replace('noteEditor', {height: '66vh', width: '32vw'});
  // setup toolbar
  $('.btn').button();
  $('input[name="editorType"]').checkboxradio();
  $('#col-2-editorType').controlgroup();
  $('#mainToolbar').controlgroup();
  $('#col-2-mainToolbar').controlgroup();
  var sumBtn = $('#editorType_summary');
  var elvBtn = $('#editorType_elevator');
  $('input[type=radio][name=editorType]').change((event, ui)=>{
    saveStoryNote_helper(event,ui);
  });
  $('#editorSubmit').click((e,ui) => {
    saveNoteWasClicked = true;
    saveStoryNote_helper(e,ui);
  });
} catch (e) { console.log(e); }

async function saveStoryNote_helper(event,ui) {
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newElevatorPitchContent = inst.getData();
      if (newElevatorPitchContent !== elevatorPitchContent && newElevatorPitchContent !== '') {
        saveStoryContent(storyID, 'Note', elevatorPitchID, newElevatorPitchContent, 'elevatorPitch');
        elevatorPitchContent = newElevatorPitchContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newSummaryContent = inst.getData();
      if (newSummaryContent !== summaryContent && newSummaryContent !== '') {
        saveStoryContent(storyID, 'Note', summaryID, newSummaryContent, 'summary');
        summaryContent = newSummaryContent;
      }
    }
    saveNoteWasClicked = false;
  }
  else if (elvBtn.is(':checked')) {
    let newSummaryContent = inst.getData();
    inst.setData(elevatorPitchContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newSummaryContent !== summaryContent && newSummaryContent !== '') {
      saveStoryContent(storyID, 'Note', summaryID, newSummaryContent, 'summary');
      summaryContent = newSummaryContent;
    }
  }
  else if (sumBtn.is(':checked')) {
    let newElevatorPitchContent = inst.getData();
    inst.setData(summaryContent);
    try {
      inst.destroy();
      CKEDITOR.replace('noteEditor', {height: '60vh', width: '32vw'});
    } catch (e) { }
    if (newElevatorPitchContent !== elevatorPitchContent && newElevatorPitchContent !== '') {
      saveStoryContent(storyID, 'Note', elevatorPitchID, newElevatorPitchContent, 'elevatorPitch');
      elevatorPitchContent = newElevatorPitchContent;
    }
  } else {
    console.log('wait what?');
  }
}
