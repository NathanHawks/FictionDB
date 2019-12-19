// Properties Navigator window =================================================
var autocompleteContent = [];

function setupAccordion() {
  // two points are required to mix with .sortable in the way we want
  $( '.item_accordion' ).accordion({ // each item must be its own accordion
    animate: 100,
    collapsible: true,
    header: 'h3',
    heightStyle: 'content',
    beforeActivate: (event,ui) => {
      // prevent state-change caused by dragdrop click
      if (sorting) { event.preventDefault(); }
    },
    classes: {
      'ui-accordion-header': 'Navigator_TopTitle',
      'ui-accordion-header-collapsed': 'Navigator_TopTitle',
      'ui-accordion-content': 'Navigator_item'
    }, active: false
  });

  $('.Navigator_container').sortable({axis: 'y', handle: 'h3',
    distance: 5,
    revert: 200,
    start: (event,ui)=>{
      // prevent accordion state-change during dragdrop
      sorting = true;
    },
    stop: (event,ui)=>{
      $('.item_accordion').accordion('refresh');
      // prevent accordion state-change during dragdrop
      sorting = false;
    }
  });
}
function setupSort(tmpType) {
  $(`#Nav${tmpType}Container`).on('sortstop', null, null, (event) => {
    let cb = null;
    if ((tmpType === 'Event' && linkedType === 'story')
      || (false && tmpType === 'Story' && linkedType === 'event')
    ) {
      // special treatment for StoryEvent to reload intensity graph
      cb = (data) => {
        makeStoryEventIntensityGraphs();
        handleResponse_saveAssocContent(data);
        // requestPage(`${linkedType}/${linkedID}`, true, 'SKIP');
      }
    } else {
      cb = handleResponse_saveAssocContent;
    }
    // get the character sortables as jquery objects
    let sortables = $(`#Nav${tmpType}Container .item_accordion .Navigator_item .Navigator_TopTitle`);
    // prep data for ajax call
    let sorted = [];
    for (let x = 0; x < sortables.length; x++) {
      let domID = sortables.get(x).id;
      let info = domID.split('_');
      sorted[sorted.length] = {type: info[0], id: info[1], sequence: x, linkedID: linkedID};
    }
    $.ajax({url: `/${linkedType}/save-sequence`, method: 'POST', data: {items: sorted}})
      .done(cb);
  });
}

async function navigatorExpandAll() {
  let heads = $(".ui-accordion-header");
  heads.each((index, el) => {
    if ($(el).hasClass("ui-accordion-header-collapsed") === true)
      $(el).trigger("click");
  });
}

async function navigatorCollapseAll() {
  let heads = $(".ui-accordion-header");
  heads.each((index, el) => {
    if ($(el).hasClass("ui-accordion-header-collapsed") === false)
      $(el).trigger("click");
  });
}

function makeAttachItemMenu() {
  $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
   _renderItem: function( ul, item ) {
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

  $('#attachItemMenu').iconselectmenu({
    change: (event, ui) => {
      attachItemMenu_changeHandler();
    }
  });
   //.iconselectmenu( "menuWidget" )
}

function attachItemMenu_changeHandler() {
  // first get the value...
  let type = $('#attachItemMenu').val();
  // ...before resetting and redrawing the menu
  $('#attachItemMenu').val('none').iconselectmenu('refresh');

  requestIcons(type, 'dialogicon', 'attachItemMenu_action', attachItemMenu_iconsResponseHandler);
}

function attachItemMenu_iconsResponseHandler(data) {
  $('#dialog span').html(`Attach Item`);
  let d = $('#dialog');
  let dc = $('#dialogContent');
  dc.html(data);
  d.hide().fadeIn(250);
  // setTimeout(() => { $('#dialog').fadeOut(250); }, 3000);
}

function attachItemMenu_action(parseme) {
  let [attachType,attachID] = parseme.split('/');
  let at = uppercaseFirst(attachType);
  let lt = uppercaseFirst(linkedType);
  let dropTarget = `${lt}_${linkedID}`;
  let draggedIDs = [`${at}_${attachID}`];
  $.ajax({
    url: '/dragdrop', method: 'POST',
    data: { draggedIDs: draggedIDs, dropTargetID: dropTarget }
  }).done(attachItemMenu_responseHandler);
}

function attachItemMenu_responseHandler(data) {
  $('#dialog').fadeOut(250);
  reloadNavigator(linkedType, linkedID);
  // pulse the new item
}


function makeNewAttachItemMenu() {
  $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
   _renderItem: function( ul, item ) {
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

  $('#newAttachItemMenu').iconselectmenu({
    change: (event, ui) => {
      newAttachItemMenu_changeHandler();
    }
  });
   //.iconselectmenu( "menuWidget" )
}

function newAttachItemMenu_changeHandler() {
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
  }).done((data) => { newAttachItemMenu_responseHandler(data); });
}

function newAttachItemMenu_responseHandler(data) {
  // refresh the navigator
  reloadNavigator(linkedType, linkedID);
  // pulse the new item
}

function setupFilterField() {
  $('#Navigator_filter_input').autocomplete({
    source: autocompleteContent
  }).keydown((e) => {
    if (e.keyCode === 65 && event.ctrlKey) {
      $('#Navigator_filter_input').focus().select();
    } else if (e.keyCode === 13) {
      navFilterSubmit();
    }
  }).focus((e) => {
    if ($('#Navigator_filter_input').val() === '(filter)') {
      $('#Navigator_filter_input').val('').css('color', '#bdbdbd');
    }
  }).blur((e) => {
    if ($('#Navigator_filter_input').val() === '') {
      $('#Navigator_filter_input').val('(filter)').css('color', '#606060');
    }
  });
}

function navFilterSubmit() {
  // close menu, focus and select the field, get the value
  $('#Navigator_filter_input').focus().select().autocomplete('close');
  var filter = $('#Navigator_filter_input').val();
  // get the containers for the items
  var bands = $('.item_accordion');
  if (filter.length) {
    // index of bands, heads and items will match
    let heads = $('.item_accordion .ui-accordion-header');
    let items = $('.item_accordion .Navigator_item');
    // show all (in case we're going directly from one filter to another)
    bands.each((index, item) => { $(item).show(); });
    // hide non-matching items
    items.each((index, item) => {
      var matched = false;
      let kids = $(item).children();
      kids.each((index, kid) => {
        let divs = $(kid).children('div');
        divs.each((index, div) => {
          let val = $(div).html();
          if (val.toLowerCase().includes(filter.toLowerCase())) {
            matched = true;
          }
        });
      });
      if (matched === false) {
        $( bands.get(index) ).hide();
      }
    });

  } else {
    // show all items
    bands.each( (index, item) => { $(item).show(); } );
  }
}

function navFilterClear() {
  $('#Navigator_filter_input').val('');
  navFilterSubmit();
}

function reloadNavigator(type, id) {
  $.ajax({url: `${type}/${id}`, method: 'POST', data: {navigatorOnly: true}})
    .done(reloadNavigator_handleResponse);
}
function reloadNavigator_handleResponse(data) {
  autocompleteContent = [];
  $('#Navigator_table').html(data);
  $('#Navigator_filter_input').autocomplete('destroy');
  setupFilterField();
  setupAccordion();
  setupSorts();
  setupClickHandlers();
  $('.btn').button();
}

function setupSorts() {
  setupSort('Character');
  setupSort('Setting');
  setupSort('Location');
  setupSort('Story');
  setupSort('Event');
}

async function navigatorTitleClick_handler(event,ui,domID,rName,rn,parent,linkedType) {
  // sanitize value
  rn = rn.replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  // prep editors
  let rContainer = $(`#${domID}_${rName}`);
  let rBox = $(`#${domID}_${rName} div`);
  rContainer.off('click');
  rBox.html(
    `<input id="${domID}_${rName}_editor" type='text' value="${rn}">`
  );
  let rEditor = $(`#${domID}_${rName}_editor`);
  rEditor.focus().select();
  rEditor.keydown((event,ui) => {
    if (event.keyCode === 65 && event.ctrlKey) {
      rEditor.focus().select();
    }
    else if (event.keyCode === 13) {
      let v = rEditor.val().replace(/"/g, '&quot;').replace(/'/g, '&apos;');
      // update autocomplete
      let oldText = (parent[rName] !== null) ? parent[rName].content : '';
      if (oldText) {
        let oldACndx = autocompleteContent.indexOf(oldText);
        autocompleteContent[oldACndx] = v;
      } else {
        autocompleteContent[autocompleteContent.length] = v;
      }
      // save
      saveAssocTitle_helper(event,ui,domID,rName,v,parent,linkedType);
      // convert back to display
      rBox.html(v);
      rContainer.click((event,ui) => {
        navigatorTitleClick_handler(event,ui,domID,rName,v,parent,linkedType);
      });
      // update page-internal data
      if (parent[rName] === null) parent[rName] = {};
      parent[rName].content = v;
    } else if (event.keyCode === 27) {
      // revert
      let text = (parent[rName] !== null) ? parent[rName].content : '';
      rBox.html(text);
      rContainer.click((event,ui) => {
        navigatorTitleClick_handler(event,ui,domID,rName,rn,parent,linkedType);
      });
    }
  });
}

async function navigatorNativeClick_handler(event,ui,domID,fieldName,parent,linkedType,opt) {
  let rContainer = $(`#${domID}_${fieldName}`);
  let rBox = $(`#${domID}_${fieldName} div`);
  rContainer.off('click');
  let val = parent[fieldName];
  // setup bare interface
  switch (opt.u) {
    case 'spinner':
      // sanitize value
      val = Number(val);
      val = (val >= opt.v[0] && val <= opt.v[opt.v.length-1]) ? val : opt.v[0];
      // spinner and others
      rBox.html(
        `<input id="${domID}_${fieldName}_editor" type='text' value="${val}">`
      );
    break;
    case 'select':
      let select = `<select id="${domID}_${fieldName}_editor">`;
      for (let x = 0; x < opt.v.length; x++) {
        let active = (x == val) ? 'selected' : ''
        select += `<option value="${x}" ${active}>${opt.v[x]}</option>`
      }
      select += `</select>`
      rBox.html( select );
    break;
  }

  let rEditor = $(`#${domID}_${fieldName}_editor`);

  // add tricks
  switch (opt.u) {
    case 'spinner':
      rEditor.spinner({
        min: opt.v[0], max: opt.v[opt.v.length-1], step: 1, start: val,
      });
      // jquery mangles the wheel event
      document.getElementById(`${domID}_${fieldName}_editor`)
        .addEventListener('wheel', (e) =>
      {
        e.preventDefault();
        let updown = (-e.deltaY > 0) ? 'up' : 'down';
        switch (updown) {
          case 'up': rEditor.spinner('stepUp'); break;
          case 'down': rEditor.spinner('stepDown'); break;
        }
      });
    break;
    case 'select':
      rEditor.change((event) => {
        let v = rEditor.val().replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        // save
        saveNativeField_helper(event, fieldName, parent, opt.p);
        // convert back to display
        rBox.html(opt.v[v]);
        rContainer.click((event,ui) => {
          navigatorNativeClick_handler(event,ui,domID,fieldName,parent,linkedType,opt);
        });
        // update page-internal data
        parent[fieldName] = v;

      });
    break;
  }
  // key controls
  rEditor.focus().select();
  rEditor.keydown((event,ui) => {
    if (event.keyCode === 65 && event.ctrlKey) {
      rEditor.focus().select();
    }
    else if (event.keyCode === 13) {
      // enter key -- save
      let v = rEditor.val().replace(/"/g, '&quot;').replace(/'/g, '&apos;');
      let newVal = event.target.value;
      // determine callback (some cases get special treatment)
      let cb = handleResponse_saveNativeField;
      // special treatment for story event intensity, to refresh graph
      if (fieldName === 'intensity' && linkedType === 'story') {
        cb = (data) => {
          $.ajax({ url: `/intensity-graph/story/${linkedID}`}).done((data)=>{
            $('#col-3-mod-1').html(data);
          });
        };
      }
      saveNativeField(parent.id, opt.p, newVal, fieldName, cb);
      // convert back to display
      switch (opt.u) {
        case 'spinner':
          rBox.html(v);
        break;
        case 'select':
          rBox.html(opt.v[v]);
        break;
      }
      // re-add click handler to display
      rContainer.click((event,ui) => {
        navigatorNativeClick_handler(event,ui,domID,fieldName,parent,linkedType,opt);
      });
      // update page-internal data
      parent[fieldName] = v;
    } else if (event.keyCode === 27) {
      // esc key -- revert
      switch (opt.u) {
        case 'spinner':
          let val = (parent[fieldName] !== null) ? parent[fieldName] : '1';
          val = (val >= opt.v[0] && val <= opt.v[opt.v.length-1]) ? val : opt.v[0];
          rBox.html(val);
        break;
        case 'select':
          rBox.html(opt.v[parent[fieldName]]);
        break;
      }
      rContainer.click((event,ui) => {
        navigatorNativeClick_handler(event,ui,domID,fieldName,parent,linkedType,opt);
      });
    }
  });
}
