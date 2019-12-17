// back button history
var backBtnHistory = [];

function uppercaseFirst(s) {
  return s.replace(/^[a-z]/,m=>m.toUpperCase());
}

function splitCamelCase(s) {
  return s.replace(/([A-Z][a-z]|[A-Z]+(?=[A-Z]|$))/g, " $1")
  .replace(/./, m => m.toUpperCase())
  .trim()
  ;
}

function fixForJSON(val) {
  return val.replace(/'/g, '&apos;').replace(/\\/g, '\\\\');
}
function getMainTitleFieldName(itemType) {
  return mainTitleFieldNames[itemType];
}

async function saveAssocTitle_helper(
  event,ui, domID, rName, value, parent, parentType
) {
  let titleID = (parent[rName] !== null) ? parent[rName].id : -1;
  let newVal = event.target.value;
  saveAssocContent(parent.id, parentType, 'Title', titleID, newVal, rName );
  // domID option serves as a request to update an accordion header if needed
  if (domID !== null) {
    let [assocType,junk] = domID.split("_");
    assocType = assocType.toLowerCase();
    // update header if we've changed the object's first title field
    if (rName === mainTitleFieldNames[assocType]) {
      $(`#${domID}_header`).html(value)
    }
  }
}

async function saveAssocContent(
  linkedID, linkedType, contentType, assocID, content,
  fieldName, cb=handleResponse_saveAssocContent
) {
  if (!assocID) assocID = -1;
  $.ajax({ url: 'save-content', method: 'POST',
    data: {
      linkedID:linkedID,
      linkedType:linkedType,
      contentType:contentType,
      assocID:assocID,
      content:content,
      fieldName:fieldName
    },
    success: cb
  });
}

function handleResponse_saveAssocContent(data) {
  console.log(data);
}

function saveNativeField_helper(
  event, fieldName, parent, parentType
) {
  let newVal = event.target.value;
  saveNativeField(parent.id, parentType, newVal, fieldName);
}

function saveNativeField(
  linkedID, linkedType, content, fieldName,
  cb=handleResponse_saveNativeField
) {
  $.ajax({ url: 'save-native', method: 'POST',
    data: {
      linkedID: linkedID,
      linkedType: linkedType,
      content: content,
      fieldName: fieldName
    },
    success: cb
  });
}

function handleResponse_saveNativeField(data) {
  console.log(data);
}

function gotoRecord(event, modelName, id, backBtnUrl='/home') {
  modelName = `${modelName}`.toLowerCase();
  backBtnUrl = `${backBtnUrl}`.toLowerCase();
  event.stopPropagation();  // stop jquery from hearing the click
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
  setTimeout(async()=>{
    home.html(data)
    setTimeout(async() => {home.fadeIn(200)}, 250);
  },124);
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

async function closeAllPopups() {
  $('#dialog').hide();
}
