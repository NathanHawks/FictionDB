async function initDesktop() {
  makeIconsDraggable();
  makeIconsDroppable();
  makeIconsSelectable();
  makeIconsRightClickable();
  makeDesktopCloseThings();
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
  })
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
  let y = xy.top - 48;
  let x = xy.left + 2;
  pop.css({position: 'absolute', top: `${y}px`, left: `${x}px`});
  pop.hide().fadeIn();
  setTimeout(()=>{pop.effect('drop', {direction: 'up'});}, 1400);
  // spin the chevron as it's rising and fading
  var spin = 0;
  let spinIt = function(pop, spin) {
    pop.css('transform', `rotateY(${spin}deg)`);
    spin = spin + 20;
    return spin;
  }
  setTimeout(() => {
    let interval = setInterval( () => {spin = spinIt(pop, spin)}, 20);
    setTimeout(()=>{clearInterval(interval);}, 400);
  }, 1400);
}

function trashItems() {
  $('#context-menu').fadeOut(100);
  let selected = [];
  let items = [];
  if (iconSelection.length) {
    for (let x = 0; x < iconSelection.length; x++) {
      selected[selected.length] = iconSelection.get(x).id;
    }
  }
  let use_multiselect = (selected.indexOf(itemRightClicked) > -1)
    ? true : false;
  // assemble ajax data
  if (use_multiselect) {
    selected.map((i) => {
      let [type,id] = i.split("_");
      items[items.length] = {type: type, id: id};
    });
  } else {
    let [type,id] = itemRightClicked.split("_");
    items = [{type: type, id: id}];
  }
  let strung = JSON.stringify(items);
  $.ajax({url: '/common/send-to-trash', method: 'POST',
    data: {items: strung},
    success: handleResponse_trashItems
  });
}
function handleResponse_trashItems(data) {
  requestPage('/home',true);
}
