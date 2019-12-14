var autosaveInterval = null;
var autosaveInterval_loopDelay = 1000;
var autosaveMinimumIdleMS = 2000;
var autosaveCandidate = false; // flag is true when change has been detected
var autosaveLastInput = null; // timestamp

async function makeNewAttachItemMenu() {
  $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
   _renderItem: async function( ul, item ) {
     var li = $( "<li>" );
     var wrapper = $( "<div>", { text: item.label } );
     // add icon
     $( "<span>", {
       style: item.element.attr( "data-style" ),
       "class": "ui-icon " + item.element.attr( "data-class" )
     })
       .appendTo( wrapper );

     return li.append( wrapper ).appendTo( ul );
   }
 });

 $( "#newAttachItemMenu" )
   .iconselectmenu()
   .iconselectmenu( "menuWidget" )
   .addClass( "ui-menu-icons customicons" )
   .on('change', async (e, ui) => {
     await newAttachItemMenu_changeHandler(e, ui);
   });
}

async function newAttachItemMenu_changeHandler(e, ui) {
  // first get the value...
  let newType = $('#newAttachItemMenu').val();
  // ...before resetting and redrawing the menu
  $('#newAttachItemMenu').val('none').iconselectmenu('refresh');
  // create and attach the item
  $.ajax({
    url: '/create-attach', method: 'POST',
    data: {
      linkedType: linkedType,
      linkedID: linkedID,
      createType: newType
    }
  }).done(newAttachItemMenu_responseHandler);
}

async function newAttachItemMenu_responseHandler(data) {
  // refresh the navigator
  reloadNavigator(linkedType, linkedID);
  // pulse the new item

}

async function attachAutoSave() {
  let inst = CKEDITOR.instances.noteEditor;
  inst.on('contentDom', () => {
    inst.on('change', async (e) => {
      await autosaveOnChange_handler(e);
      autosaveInterval = setInterval(async () => {await autosaveInterval_handler()},
        autosaveInterval_loopDelay
      );
    });
  });
}

async function autosaveOnChange_handler(e) {
  enableSaveBtn();
  autosaveCandidate = true;
  autosaveLastInput = new Date().getTime();
}

async function autosaveInterval_handler() {
  let currentMS = new Date().getTime();
  if (autosaveCandidate === true
    && currentMS - autosaveLastInput > autosaveMinimumIdleMS
  ) {
    // fake a click on the save button
    $('#editorSubmit').trigger('click');
    autosaveCandidate = false;
  }
}

async function disableSaveBtn() {
  $('#editorSubmit').prop('disabled', true);
  $('#editorSubmit').attr('value', 'Saving');
}

async function enableSaveBtn() {
  $('#editorSubmit').prop('disabled', false);
  $('#editorSubmit').attr('value', 'Save');
}

async function indicateSaved() {
  $('#editorSubmit').prop('disabled', true);
  $('#editorSubmit').attr('value', 'Saved');
}
