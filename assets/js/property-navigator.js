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
    // get the character sortables as jquery objects
    let sortables = $(`#Nav${tmpType}Container .item_accordion .Navigator_item .Navigator_TopTitle`);
    let sorted = [];
    for (let x = 0; x < sortables.length; x++) {
      let domID = sortables.get(x).id;
      let info = domID.split('_');
      sorted[sorted.length] = {type: info[0], id: info[1], sequence: x, linkedID: linkedID};
    }
    $.ajax({url: `/${linkedType}/save-sequence`, method: 'POST', data: {items: sorted}})
      .done(handleResponse_saveStoryContent);
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
  $.ajax({url: `${type}_nav/${id}`, method: 'GET'})
    .done(reloadNavigator_handleResponse);
}
function reloadNavigator_handleResponse(data) {
  $('#Navigator_table').html(data);
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

async function navigatorTitleClick_handler(event,ui,domID,rName,rn,parent) {
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
      // save
      switch (event.target.id.split("_")[0]) {
        case 'Character':
          saveCharacterTitle_helper(event,ui,domID,rName,v,parent);
        break;
        case 'Location':
          saveLocationTitle_helper(event,ui,domID,rName,v,parent);
        break;
        case 'Story':
          saveStoryTitle_helper(event,ui,domID,rName,v,parent);
        break;
        case 'Event':
          saveEventTitle_helper(event,ui,domID,rName,v,parent);
        break;
        case 'Setting':
          saveSettingTitle_helper(event,ui,domID,rName,v,parent);
        break;

      }
      // convert back to display
      rBox.html(v);
      rContainer.click((event,ui) => {
        navigatorTitleClick_handler(event,ui,domID,rName,v,parent);
      });
      // update page-internal data
      if (parent[rName] === null) parent[rName] = {};
      parent[rName].content = v;
    } else if (event.keyCode === 27) {
      // revert
      let text = (parent[rName] !== null) ? parent[rName].content : '';
      rBox.html(text);
      rContainer.click((event,ui) => {
        navigatorTitleClick_handler(event,ui,domID,rName,rn,parent);
      });
    }
  });
}
