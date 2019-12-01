/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */


CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	config.extraPlugins = 'font,colorbutton,colordialog,autolink,find,justify,emoji,save';
	config.removePlugins = 'specialchar,about';
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'editing',     groups: [ 'save', 'undo', 'find', 'selection' ] },
		{ name: 'links' },
		{ name: 'forms' },
		{ name: 'tools', groups: [ 'others', 'tools'] },
		"/",
		{ name: 'paragraph',   groups: [  'indent', 'align', 'bidi' ] },
		{ name: 'insert' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'list', 'colors', 'blocks'] },
		"/",
		{ name: 'styles', groups: ['cleanup', 'styles'] },
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'pastefromword,pastetext,paste';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

};
