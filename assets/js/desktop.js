// store selected id's because jquery's logic thwarts mine otherwise
var iconSelection = [];
// which item triggered the event
var itemRightClicked = null;
// which checkboxes are checked
var iconsShowing = [];
// which sort was chosen last
var iconsSorting = 'alpha-asc';
// size selection
var iconsSize = 'large';

async function initDesktop() {
  makeIconsDraggable();
  makeIconsDroppable();
  makeIconsSelectable();
  makeIconsRightClickable();
  makeDesktopCloseThings();
  // setup desktop filter field
  setupDesktopFilter();
  // key handler requires the desktop be given focus
  $('#deskicon-container')
    .focus()
    .keyup((event) => {
      if (event.keyCode === 46) deleteKey_handler();
    });
  // special UI commands
  $('.checkbox-btn').checkboxradio({
    icon: false,
  });
  // icon sizing controlled by radio buttons
  $('input[name="iconSize_radio"]').checkboxradio({icon: false}).click((e)=> {
    let [junk,size] = $(e.target).attr('id').split('_'); // lol
    iconsSize = size;
    $.ajax({
      url: '/home', method: 'POST',
      data: {iconsSorting: iconsSorting, iconsShowing: iconsShowing, iconsSize: iconsSize}
    }).done(handleResponse_requestPage_instant);
  });
}
async function makeIconsDraggable() {
  try { $(".deskicon").draggable({
    helper: "clone", revert: true, containment: "parent",
    start: (e, ui) => {
      let multiSelect = [];
      let els = $(".ui-draggable.ui-selected");
      for (let x = 0; x < els.length; x++) {
        if (multiSelect.indexOf(els.get(x).id) === -1)
          multiSelect[multiSelect.length] = els.get(x).id;
      }
      let target = e.currentTarget;
      // did we drag something outside of the multi-select?
      if (multiSelect.indexOf(target.id) === -1) {
        // ignore multi-selection
        for (let x = 0; x < els.length; x++) {
          els.get(x).classList.remove('ui-selected');
        }
        iconSelection = [];
      } else {
        // use multi-selection
        $(".ui-draggable-dragging").get(0).classList.add('multi-drag');
      }
    }
  });
  } catch (e) { console.log(e); }
}
async function makeIconsDroppable() {
  try {
    $('.deskicon').droppable({
      classes: {
        'ui-droppable-hover': 'ui-droppable-hover'
      },
      drop: (event,ui) => {
        iconSelection = $('.deskicon.ui-selected');
        let dropTargetID = event.target.id;
        let dragTargets = (iconSelection.length)
          ? iconSelection
          : ui.draggable;
        let draggedIDs = [];
        for (let x = 0; x < dragTargets.length; x++) {
          if (dragTargets.get(x).id.length) {
            draggedIDs[draggedIDs.length] = dragTargets.get(x).id;
          }
        }
        handleIconDrop(draggedIDs, dropTargetID);
      }
    });
  } catch (e) { console.log(e); }
}
async function makeIconsSelectable() {
  $('#deskicon-container').selectable({
    tolerance: 'touch',
    filter: '.deskicon',
    start: (event, ui) => {
      // store selected icons now bcz touching rubberband changes an item's class
      iconSelection = $('.deskicon.ui-selected');
    },
    selecting: (event, ui) => {
      // de-select already-selected items if ctrl is held down
      let tgtID = ui.selecting.id;
      // build an index of element IDs
      let selectedArr = [];
      if (event.ctrlKey) {
        let selected = iconSelection;
        for (let x = 0; x < selected.length; x++) {
          selectedArr[selectedArr.length] = selected.get(x).id;
        }
      }
      // abort selecting & deselect if ctrl-selecting an already selected element
      // same if the item is a launcher
      if ((event.ctrlKey && selectedArr.indexOf(tgtID)!==-1)
        || launcherIcons.indexOf(tgtID)!==-1)
      {
        event.stopImmediatePropagation();
        el = $(`#${tgtID}`).get(0);
        el.classList.remove('ui-selected');
        el.classList.remove('ui-selecting');
      }
    },
    stop: (event,ui) => {
      // store result
      iconSelection = $('.deskicon.ui-selected');
    }
  });
}
async function makeIconsRightClickable() {
  $('.deskicon').contextmenu((event, ui) => {
    itemRightClicked = event.currentTarget.id;
    // show or hide certain parts of the context menu
    //  based on how many icons are selected
    if (getIconSelection().length === 1) {
      $('.single-select-only').show();
    } else {
      $('.single-select-only').hide();
    }
    var bodyH = window.innerHeight || document.body.clientHeight;
    var bodyW = window.innerWidth  || document.body.clientWidth;
    let menu = $('#context-menu');
    menu.css('position', 'fixed');
    menu.css('display', 'block');
    var menuH = document.getElementById('context-menu').offsetHeight;
    var menuW = document.getElementById('context-menu').offsetWidth;
    var offsH = 0;
    var offsW = 0;
    if (event.clientY > bodyH/2) offsH = menuH;
    if (event.clientX > bodyW/2) offsW = menuW;
    menu.css('top', event.clientY-offsH);
    menu.css('left', event.clientX-offsW);
  });
}
async function makeDesktopCloseThings() {
  $("#deskicon-container").mousedown(()=>{
    // close context menu
    $('#context-menu').fadeOut(100);
    itemRightClicked = null;
    if (closeAllPopups !== null) closeAllPopups();
    $('#deskicon-container').focus();
  });
}

// ajax =================================================

async function handleIconDrop(draggedIDs, dropTargetID) {
  $.ajax({
    url: '/dragdrop', method: 'POST',
    data: {draggedIDs: draggedIDs, dropTargetID: dropTargetID },
    success: (data) => { handleResponse_dragdrop(data); }
  });
}
async function handleResponse_dragdrop(data) {
  data = JSON.parse(data);
  let tgt = $(`#${data.dropTargetID}`);
  let pop = $('#item-toaster');
  let xy = tgt.position();
  let y = xy.top+32;
  let x = xy.left; // half width of icon - padding of chevron
  pop.css({position: 'absolute', top: `${y}px`, left: `${x}px`});
  pop.hide().show();
  setTimeout(()=>{pop.effect('drop', {direction: 'up'});}, 25);
  // spin the chevron as it's rising and fading
  var spin = 0;
  let spinIt = function(pop, spin) {
    pop.css('transform', `rotateZ(${spin}deg)`);
    spin = spin + 20;
    return spin;
  }
  setTimeout(() => {
    let interval = setInterval( () => {spin = spinIt(pop, spin)}, 20);
    setTimeout(()=>{clearInterval(interval);}, 400);
  }, 25);
}

function getIconSelection() {
  let selected = [];
  let items = [];
  if (iconSelection.length) {
    for (let x = 0; x < iconSelection.length; x++) {
      selected[selected.length] = iconSelection.get(x).id;
    }
  }
  let use_multiselect = (itemRightClicked === null
    || selected.indexOf(itemRightClicked) > -1)
    ? true : false;
  // assemble ajax data
  if (use_multiselect) {
    selected.map((i) => {
      let [type,id] = i.split("_");
      items[items.length] = {type: type, id: id};
    });
  } else if (itemRightClicked) {
    let [type,id] = itemRightClicked.split("_");
    items = [{type: type, id: id}];
  } else { items = []; }
  return items;
}
function launchRename() {
  $('#context-menu').fadeOut(95);
  setTimeout( async () => {
    let item = getIconSelection()[0];
    if (item === null) return;
    let fieldName = getMainTitleFieldName(item.type.toLowerCase());
    let icon = $(`#${item.type}_${item.id} a`);
    let assocID = icon.attr('associd');
    let oldName = icon.html();
    let content = prompt(`Rename ${item.type}: Enter a new name for "${oldName}"`);
    if (content !== null && content !== "" && content !== undefined) {
      renameItem(item.id, item.type, fieldName, assocID, content);
    }
  }, 100);
}
function renameItem(itemID, itemType, fieldName, assocID, content) {
  let contentType = 'Title';
  let cb = (data) => { requestPage('/home', true, 'SKIP'); }
  saveAssocContent(itemID, itemType, contentType, assocID, content, fieldName, cb);
}

async function deleteKey_handler() {
  let items = getIconSelection();
  if (items.length > 0) {
    let strung = JSON.stringify(items);
    $.ajax({url: '/common/send-to-trash', method: 'POST',
      data: {items: strung},
      success: handleResponse_trashItems
    });
  }
}
async function trashItems() {
  $('#context-menu').fadeOut(100);
  let items = getIconSelection();
  let strung = JSON.stringify(items);
  $.ajax({url: '/common/send-to-trash', method: 'POST',
    data: {items: strung},
    success: handleResponse_trashItems
  });
}
function handleResponse_trashItems(data) {
  requestPage('/home',true,'SKIP');
}

function setupDesktopFilter() {
  let icons = $('.deskicon').not('.new-icon').children('a');
  autocompleteContent = [];
  icons.each((i,el) => {
    autocompleteContent[i] = fixForDisplay($(el).html());
  });
  $('#desktop_filter_input').autocomplete({
    source: autocompleteContent
  }).keydown((e) => {
    if (e.keyCode === 65 && event.ctrlKey) {
      $('#desktop_filter_input').focus().select();
    } else if (e.keyCode === 13) {
      desktopFilterSubmit();
    }
  }).focus((e) => {
    if ($('#desktop_filter_input').val() === '(filter)') {
      $('#desktop_filter_input').val('').css('color', '#bdbdbd');
    }
  }).blur((e) => {
    if ($('#desktop_filter_input').val() === '') {
      $('#desktop_filter_input').val('(filter)').css('color', '#606060');
    }
  });
}

function desktopFilterSubmit() {
  // close menu, focus and select the field, get the value
  $('#desktop_filter_input').focus().select().autocomplete('close');
  var filter = $('#desktop_filter_input').val();
  let items = $('.deskicon');
  if (filter.length) {
    // index of bands, heads and items will match
    // show all (in case we're going directly from one filter to another)
    items.each((index, item) => { $(item).show(); });
    // hide non-matching items
    items.each((index, item) => {
      var matched = false;
      let a = $(item).children('a');

          let val = $(a).html();
          if (fixForDisplay(val.toLowerCase()).includes(fixForDisplay(filter.toLowerCase()))) {
            matched = true;
          }

      if (matched === false) {
        $( item ).hide();
      }
    });

  } else {
    // show all items
    items.each( (index, item) => { $(item).show(); } );
  }
}

function desktopFilterClear() {
  $('#desktop_filter_input').val('');
  desktopFilterSubmit();
}
