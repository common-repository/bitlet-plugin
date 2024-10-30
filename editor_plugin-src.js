(function() {
  tinymce.create('tinymce.plugins.bitletplugin', {
    init : function(ed, url) {
	
    ed.addButton('bitletbutton', {
        title : 'Add Torrent',
        image : url + '/images/bitlet.png',
		onclick : function() {			
			// Opens a new dialog with the file.htm file and the size 320x240
			// It also adds a custom parameter this can be retrieved by using tinyMCEPopup.getWindowArg inside the dialog.
			tinyMCE.activeEditor.windowManager.open({
			   title: 'Bitlet plugin',
			   url : url + '/form.htm',
			   width : 350,
			   height : 200,
			   inline: 1
			}, {
			   custom_param : 1
			});		
		}
      });
    },
    getInfo : function() {
      return {
        longname : 'Bitlet plugin',
        author : 'loixiyo.com',
        authorurl : 'http://www.loixiyo.com',
        infourl : 'http://wordpress.org',
        version : '0'
      };
    }
  });
  tinymce.PluginManager.add('bitletplugin', tinymce.plugins.bitletplugin);
})();
