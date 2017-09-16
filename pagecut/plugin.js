/**
 * @license Copyright (c) 2015, ArtyGrand. All rights reserved.
 */

CKEDITOR.plugins.add( 'pagecut', {
	lang: 'en,ru,de',
	requires: 'widget',
	icons: 'pagecut',
	onLoad: function(){
		var css = ('clear:both;cursor:default;height:14px;background: url(' + CKEDITOR.getUrl( this.path + 'icons/widget.png' ) + ') no-repeat right center;');
		var cssBefore = ('content:"";display:block;height:7px;width:100%;border-bottom:#999 1px dotted;');
		CKEDITOR.addCss( '.pagecut{' + css + '} .pagecut:before{' + cssBefore + '}' );
	},
	init: function(editor){
		CKEDITOR.dtd['cut'] = {};
		CKEDITOR.dtd.$empty['cut'] = 1;
		CKEDITOR.dtd.$nonEditable['cut'] = 1;
		CKEDITOR.dtd.$object['cut'] = 1;
		CKEDITOR.dtd.$block['cut'] = 1;

        editor.filter.allow( 'cut', 'pagecut' );

        editor.widgets.add('pagecut', {
			template: '<div class="pagecut"></div>',
			upcast: function(element){
				return element.name == 'cut';
			},
			downcast: function(element){
				element.setHtml('<cut>');
				var cut = element.getFirst('cut');
				element.replaceWith(cut);
				element = cut;
				return element;
			},
			init: function(){
				this.element.addClass('pagecut');
				var html = this.element.$.outerHTML;
				this.element.$.outerHTML = html.replace('<cut', '<div').replace('/cut', '/div');
			},
		});

		editor.ui.addButton && editor.ui.addButton('Pagecut', {
			label: editor.lang.pagecut.button,
			command: 'pagecut',
			icon: 'pagecut',
			toolbar: 'links'
		});
	}
});