// Properties window =========================================================
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

function setupSort(tmpType) {
  $(`#Nav${tmpType}Container`).on('sortstop', null, null, (event) => {
    // get the character sortables as jquery objects
    let sortables = $(`#Nav${tmpType}Container .item_accordion .Navigator_item .Navigator_TopTitle`);
    let sorted = [];
    for (let x = 0; x < sortables.length; x++) {
      let domID = sortables.get(x).id;
      let info = domID.split('_');
      sorted[sorted.length] = {type: info[0], id: info[1], sequence: x, storyID: storyID};
    }
    $.ajax({url: '/common/save-sequence', method: 'POST', data: {items: sorted}})
      .done(handleResponse_saveStoryContent);
  });
}
setupSort('Character');
setupSort('Event');
setupSort('Setting');
