// back button history
var backBtnHistory = [];

function uppercaseFirst(s) {
  return s.replace(/^[a-z]/,m=>m.toUpperCase());
}

function fixForJSON(val) {
  return val.replace(/'/g, '&apos;').replace(/\\/g, '\\\\');
}
function getMainTitleFieldName(itemType) {
  switch (itemType) {
    case 'Character':
      return 'realName';
    case 'Story':
      return 'mainTitle';
    case 'Event':
    case 'Location':
    case 'Setting':
      return 'authorTitle';
  }
}
async function saveStoryTitle_helper(event,ui,domID,rName,value,parent) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveStoryContent(parent.id, 'Title', titleID, newVal, rName );
  if (rName === 'mainTitle') {
    // update header
    $(`#${domID}_header`).html(value)
  }
}
async function saveCharacterTitle_helper(event,ui,domID,rName,value,parent) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveCharacterContent(parent.id, 'Title', titleID, newVal, rName );
  if (rName === 'realName') {
    // update header
    $(`#${domID}_header`).html(value)
  }
}
async function saveEventTitle_helper(event,ui,domID,rName,value,parent) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveEventContent(parent.id, 'Title', titleID, newVal, rName );
  if (rName === 'authorTitle') {
    // update header
    $(`#${domID}_header`).html(value)
  }
}
async function saveSettingTitle_helper(event,ui,domID,rName,value,parent) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveSettingContent(parent.id, 'Title', titleID, newVal, rName );
  if (rName === 'authorTitle') {
    // update header
    $(`#${domID}_header`).html(value)
  }
}
async function saveLocationTitle_helper(event,ui,domID,rName,value,parent) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveLocationContent(parent.id, 'Title', titleID, newVal, rName );
  if (rName === 'authorTitle') {
    // update header
    $(`#${domID}_header`).html(value)
  }
}
function gotoRecord(event, modelName, id, backBtnUrl='/home') {
  modelName = `${modelName}`.toLowerCase();
  backBtnUrl = `${backBtnUrl}`.toLowerCase();
  event.stopPropagation();
  requestPage(`${modelName}/${id}`, false, backBtnUrl);
}

async function requestPage(url, instant=false, backBtnUrl='/home') {
  closeAllPopups();
  let response = null;
  // reset some state vars
  iconSelection = [];
  autocompleteContent = [];
  if (backBtnUrl !== 'SKIP') backBtnHistory.unshift(backBtnUrl);
  if (instant) response = handleResponse_requestPage_instant;
  else response = handleResponse_requestPage
  $.ajax({url: url}).done(response);
}

async function requestBackBtn() {
  backBtnUrl = backBtnHistory.shift();
  requestPage(backBtnUrl, false, 'SKIP');
}

function handleResponse_requestPage(data) {
  let home = $('#home-workspace');
  home.fadeOut(125);
  setTimeout(()=>{home.html(data)},124);
  home.fadeIn(200);
}
function handleResponse_requestPage_instant(data) {
  let home = $('#home-workspace');
  home.html(data);
}

function requestIcons(type, cssClass='', clickHandlerName='',
 responseHandler=testIcons_responseHandler
) {
  $.ajax({url: `/icons`, method: 'POST',
    data: {type: type, cssClass: cssClass, clickHandler: clickHandlerName}
  }).done(responseHandler);
}
function testIcons_responseHandler(data) {
  let d = $('#dialog');
  d.hide().html(data).fadeIn(250);
  setTimeout(() => { $('#dialog').fadeOut(250); }, 3000);
}

async function saveStoryContent(storyID, contentType, assocID, content,
  fieldName, cb=handleResponse_saveStoryContent
) {
  $.ajax({ url: 'story/save-content', method: 'POST',
    data: {storyID:storyID, contentType:contentType, assocID:assocID, content:content, fieldName:fieldName},
    success: cb
  });
}
async function saveCharacterContent(characterID, contentType, assocID, content,
  fieldName, cb=handleResponse_saveStoryContent
) {
  $.ajax({ url: 'character/save-content', method: 'POST',
    data: {characterID:characterID, contentType:contentType, assocID:assocID, content:content, fieldName:fieldName},
    success: cb
  });
}
async function saveEventContent(eventID, contentType, assocID, content,
  fieldName, cb=handleResponse_saveStoryContent
) {
  $.ajax({ url: 'event/save-content', method: 'POST',
    data: {eventID:eventID, contentType:contentType, assocID:assocID, content:content, fieldName:fieldName},
    success: cb
  });
}
async function saveLocationContent(locationID, contentType, assocID, content,
  fieldName, cb=handleResponse_saveStoryContent
) {
  $.ajax({ url: 'location/save-content', method: 'POST',
    data: {locationID:locationID, contentType:contentType, assocID:assocID, content:content, fieldName:fieldName},
    success: cb
  });
}

async function saveSettingContent(settingID, contentType, assocID, content, fieldName) {
  $.ajax({ url: 'setting/save-content', method: 'POST',
    data: {settingID:settingID, contentType:contentType, assocID:assocID, content:content, fieldName:fieldName},
    success: handleResponse_saveStoryContent
  });
}
function handleResponse_saveStoryContent(data) {
  console.log(data);
}


async function closeAllPopups() {
  $('#dialog').hide();
}
