(function() {
var opts, bn, sImg, sText, sArea, aImgs, isIE = navigator.userAgent.match(/(msie) ([\w.]+)/i), 
show = function(x, y, s) {
	var sp = {
		x : window.pageXOffset || (document.documentElement || document.body).scrollLeft,
		y : window.pageYOffset || (document.documentElement || document.body).scrollTop
	};
	if(s=='i'){
		x = x - 5 - opts.icons[s].width;
		y = y - 5 - opts.icons[s].height;
	} else {
		x = x - opts.icons[s].width*0.4 + 30;
		y = y - opts.icons[s].height*0.3 + 30;
	}
	with (bn.style) {
		left = x + sp.x + "px";
		top = y + sp.y + "px";
		position = "absolute";
		zIndex = "9999";
		width = opts.icons[s].width + "px";
		height = opts.icons[s].height + "px";
		backgroundImage = "url(" + opts.icons[s].src + ")";
		display = "inline-block";
	}
}, slen = function(str) {
	var placeholder = new Array(23).join('x');
	str = str.replace(/(https?|ftp|gopher|telnet|prospero|wais|nntp){1}:\/\/\w*[\u4E00-\u9FA5]*((?![\"| |\t|\r|\n]).)+/ig,
				function(match) {
					return placeholder + match.substr(171);
				}).replace(/[^\u0000-\u00ff]/g, "xx");
	return Math.ceil(str.length / 2);
}, inArea = function(tgt) {
	var areas = opts.areas || [];
	if (!(areas instanceof Array)) {
		areas = opts.areas = [areas];
	}
	sArea = null;
	for (var i = 0; i < areas.length; i++) {
		var z = areas[i];
		if (z && ((z.contains ? z.contains(tgt) : !!(z.compareDocumentPosition(tgt) & 16)) || z == tgt)) {
			sArea = z;
			break;
		}
	}
	return areas.length == 0 || sArea != null;
}, h = function(e) {
	e = e || window.event;
	var type = e.type, tgt = e.target || e.srcElement;
	if (type == 'mouseover' && !sText) {
		if (tgt.tagName == "IMG" && opts.img_minWidth > 0 && opts.img_minHeight > 0 && inArea(tgt)) {
			var bound = tgt.getBoundingClientRect();
			if (tgt.offsetWidth >= opts.img_minWidth && tgt.offsetHeight >= opts.img_minHeight) {
				show(bound.right, bound.bottom, 'i');
				sImg = tgt;
			}
		} else if (tgt != bn) {
			sImg = null;
			bn.style.display = "none";
		}
	} else if (type == 'mouseup' && tgt != bn) {
		var str = tgt.tagName == "IMG" ? null : (document.selection ? document.selection.createRange().text : document.getSelection()).toString(),
		sht = (str || '').replace(/^\s+|\s+$/g, '').replace(/[\s\n]+/g, ' ');
		if (sht.length >= opts.text_minCount && opts.text_minCount > 0 && inArea(tgt)) {
			sText = slen(sht) > 228 ? str : sht;
			var syl = opts.text_hover_style || opts.style;
			show(e.clientX, e.clientY, 't');
			if (e.preventDefault)
				e.preventDefault();
		} else {
			sText = null;
			if (!sImg)
				bn.style.display = "none";
		}
	}
}, postTarget = function(opts) {
	var form = document.createElement('form');
	form.action = opts.url;
	form.target = opts.target;
	form.method = 'POST';
	form.acceptCharset = "utf-8";
	for (var key in opts.params) {
		var val = opts.params[key];
		if (val !== null && val !== undefined) {
			var input = document.createElement('textarea');
			input.name = key;
			input.value = val;
			form.appendChild(input);
		}
	}
	var hidR = document.getElementById('renren-root-hidden');
	if (!hidR) {
		hidR = document.createElement('div');
		var syl = hidR.style;
		syl.positon = 'absolute';
		syl.top = '-10000px';
		syl.width = syl.height = '0px';
		hidR.id = 'renren-root-hidden';
		(document.body || document.getElementsByTagName('body')[0]).appendChild(hidR);
	}
	hidR.appendChild(form);
	try {
		var cst = null;
		if (isIE && document.charset.toLowerCase() != 'utf-8') {
			cst = document.charset;
			document.charset = 'utf-8';
		}
		form.submit();
	} finally {
		form.parentNode.removeChild(form);
		if (cst) {
			document.charset = cst;
		}
	}
}, onclick = function() {
	var anchor = sArea ? sArea.name || sArea.id : null, hl = location.href.indexOf('#'),
	p = {
		api_key : opts.api_key,
		url : (hl == -1 ? location.href : location.href.substr(0, hl)) + (anchor ? "#" + anchor : ''),
		title : (document.title || '').substr(0, 30),
		images : sImg ? sImg.src : aImgs,
		content : sText
	};
	var prm = [];
	for (var i in p) {
		if (p[i])
			prm.push(i + '=' + encodeURIComponent(p[i]));
	}
	var url = 'http://widget.renren.com/dialog/forward?' + prm.join('&'),
	maxLgh = (isIE? 2048 : 4100), wa = 'width=700,height=650,left=0,top=0,resizable=yes,scrollbars=1';
	if (url.length > maxLgh) {
		window.open('about:blank', 'fwd', wa);
		postTarget({
					url : 'http://widget.renren.com/dialog/forward',
					target : 'fwd',
					params : p
				});
	} else {
		window.open(url, 'fwd', wa);
	}
	return false;
}, cfg = function(op) {
	opts = op || window.__fwdCfg || {};
	opts.img_minWidth = opts.img_minWidth === 0 ? 0 : opts.img_minWidth || 100;
	opts.img_minHeight = opts.img_minHeight === 0 ? 0 : opts.img_minHeight || 100;
	opts.text_minCount = opts.text_minCount === 0 ? 0 : opts.text_minCount || 15;
	opts.icons = {t:{src:'http://s.xnimg.cn/actimg/forward/img/icon-1-1.png', width:78, height:25}, i:{src:'http://s.xnimg.cn/actimg/forward/img/icon-1-1.png', width:78, height:25}};
	if(opts.text_hover_icon){
		var tcn = document.createElement("img"), ims = opts.text_hover_icon;
		tcn.onload = function(){
			tcn.onload = null;
			opts.icons.t = tcn;
		};
		tcn.src = ims.indexOf('http://') == 0? ims : 'http://s.xnimg.cn/actimg/forward/img/' + ims;
	}
	if(opts.img_hover_icon){
		var icn = document.createElement("img"), ims = opts.img_hover_icon;
		icn.onload = function(){
			icn.onload = null;
			opts.icons.i = icn;
		};
		icn.src = ims.indexOf('http://') == 0? ims : 'http://s.xnimg.cn/actimg/forward/img/' + ims;
	}
}, init = function() {
	if (init.isReady || document.readyState !== 'complete')
		return;
	bn = document.createElement("a");
	var bsyl = "height:26px;position:absolute;background:no-repeat transparent;display:none;padding:0;margin:0;border:0;";
	bn.setAttribute('href', 'javascript:;');
	bn.setAttribute('title', '\u5C06\u5185\u5BB9\u8F6C\u53D1\u81F3\u4EBA\u4EBA\u7F51');
	bn.setAttribute('style', bsyl);
	bn.style.cssText = bsyl;
	(document.body || document.getElementsByTagName('body')[0]).appendChild(bn);
	var imgs = document.getElementsByTagName('img'), imga = [];
	for (var i = 0; i < imgs.length; i++) {
		if (imgs[i].width >= opts.img_minWidth && imgs[i].height >= opts.img_minHeight) {
			imga.push(imgs[i].src);
		}
	}
	if (imga.length > 0)
		aImgs = imga.join('|');
	if (document.addEventListener) {
		document.addEventListener('mouseup', h, false);
		document.addEventListener('mouseover', h, false);
		bn.addEventListener('click', onclick, false);
		document.removeEventListener('DOMContentLoaded', init, false);
	} else {
		document.attachEvent('onmouseup', h);
		document.attachEvent('onmouseover', h);
		bn.attachEvent('onclick', onclick);
		document.detachEvent('onreadystatechange', init);
	}
	init.isReady = true;
};
cfg();
window.Renren = window.Renren || {};
window.Renren.forward = cfg;
if (document.readyState === 'complete') {
	init();
} else if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', init, false);
	window.addEventListener('load', init, false);
} else {
	document.attachEvent('onreadystatechange', init);
	window.attachEvent('onload', init);
}
})();