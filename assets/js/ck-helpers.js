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

async function saveEventNote_helper(event,ui) {
  disableSaveBtn();
  autosaveCandidate = false;
  clearInterval(autosaveInterval);
  let inst = CKEDITOR.instances.noteEditor;
  if (saveNoteWasClicked) {
    if (elvBtn.is(':checked')) {
      let newAuthorNoteContent = inst.getData();
      if (newAuthorNoteContent !== assocNotes.authorNote.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.authorNote.id,
          newAuthorNoteContent, 'authorNote'
        );
        assocNotes.authorNote.content = newAuthorNoteContent;
      }
    } else if (sumBtn.is(':checked')) {
      let newPublicNoteContent = inst.getData();
      if (newPublicNoteContent !== assocNotes.publicNote.content) {
        saveAssocContent(linkedID, linkedType, 'Note', assocNotes.publicNote.id,
          newPublicNoteContent, 'publicNote'
        );
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
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.publicNote.id,
        newPublicNoteContent, 'publicNote'
      );
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
      saveAssocContent(linkedID, linkedType, 'Note', assocNotes.authorNote.id,
        newAuthorNoteContent, 'authorNote'
      );
      assocNotes.authorNote.content = newAuthorNoteContent;
    }
  } else {
    console.log('wait what?');
  }
  indicateSaved();
}

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

async function saveSettingNote_helper(event,ui) {
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
