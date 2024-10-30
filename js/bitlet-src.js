tinyMCEPopup.requireLangPack();

var BitletDialog = {
	preInit : function() {
		var url;

		if (url = tinyMCEPopup.getParam("external_link_list_url"))
			document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');
	},

	init : function() {
		var f = document.forms[0], ed = tinyMCEPopup.editor;

		// Setup browse button
		document.getElementById('hrefbrowsercontainer').innerHTML = getBrowserHTML('hrefbrowser', 'href', 'file', 'theme_advanced_link');
		if (isVisible('hrefbrowser'))
			document.getElementById('href').style.width = '180px';

		if (e = ed.dom.getParent(ed.selection.getNode(), 'A')) {
			f.href.value = ed.dom.getAttrib(e, 'href').slice(30);
			f.insert.value = ed.getLang('update');
		}
	},

	update : function() {
		var f = document.forms[0], ed = tinyMCEPopup.editor, e, b;

		tinyMCEPopup.restoreSelection();
		e = ed.dom.getParent(ed.selection.getNode(), 'A');

		// Remove element if there is no href
		if (!f.href.value) {
			if (e) {
				tinyMCEPopup.execCommand("mceBeginUndoLevel");
				b = ed.selection.getBookmark();
				ed.dom.remove(e, 1);
				ed.selection.moveToBookmark(b);
				tinyMCEPopup.execCommand("mceEndUndoLevel");
				tinyMCEPopup.close();
				return;
			}
		}

		tinyMCEPopup.execCommand("mceBeginUndoLevel");

		// Create new anchor elements
		if (e == null) {
			tinyMCEPopup.execCommand("CreateLink", false, "#mce_temp_url#", {skip_undo : 1});

			tinymce.each(ed.dom.select("a"), function(n) {
				if (ed.dom.getAttrib(n, 'href') == '#mce_temp_url#') {
					e = n;

					ed.dom.setAttribs(e, {
						href : 'http://www.bitlet.org?torrent=' + f.href.value,
						onclick: 'return BitLet.openDownloadFromAnchor(this);'
					});
				}
			});
		} else {
			ed.dom.setAttribs(e, {
				href : 'http://www.bitlet.org?torrent=' + f.href.value
			});
		}

		// Don't move caret if selection was image
		if (e.childNodes.length != 1 || e.firstChild.nodeName != 'IMG') {
			ed.focus();
			ed.selection.select(e);
			ed.selection.collapse(0);
			tinyMCEPopup.storeSelection();
		}

		tinyMCEPopup.execCommand("mceEndUndoLevel");
		tinyMCEPopup.close();
	},

};

BitletDialog.preInit();
tinyMCEPopup.onInit.add(BitletDialog.init, BitletDialog);