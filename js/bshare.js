var BSHARE_SHOST_NAME = "http://static.bshare.cn"
  , BSHARE_BUTTON_HOST = "http://bshare.optimix.asia"
  , BSHARE_WEB_HOST = "http://www.bshare.cn";
(function(e, g) {
    if (!e.bShareUtil || !e.bShareControl) {
        var l = g.documentElement
          , d = navigator;
        e.BUZZ = {};
        e.bShareControl = {
            count: 0,
            viewed: !1,
            bShareLoad: !1,
            clicked: !1
        };
        var h = e.bShareUtil = {
            requestedScripts: [],
            encode: encodeURIComponent,
            isIe6: /msie|MSIE 6/.test(d.userAgent),
            isIe7: /MSIE 7/.test(d.userAgent),
            isIe8: /MSIE 8/.test(d.userAgent),
            isIe9: /MSIE 9/.test(d.userAgent),
            isIe: /Microsoft Internet Explorer/.test(d.appName),
            isSt: g.compatMode == "CSS1Compat",
            isQk: function() {
                return h.isIe6 || h.isIe && !h.isSt
            },
            eleInViewport: function(a) {
                if (a.getBoundingClientRect)
                    return a = 
                    a.getBoundingClientRect(),
                    a.top >= 0 && a.left >= 0 && a.bottom <= (e.innerHeight || l.clientHeight) && a.right <= (e.innerWidth || l.clientWidth);
                for (var b = a.offsetTop, c = a.offsetLeft, f = a.offsetWidth, k = a.offsetHeight; a.offsetParent; )
                    a = a.offsetParent,
                    b += a.offsetTop,
                    c += a.offsetLeft;
                return b >= e.pageYOffset && c >= e.pageXOffset && b + k <= e.pageYOffset + e.innerHeight && c + f <= e.pageXOffset + e.innerWidth
            },
            getElemById: function(a) {
                return g.getElementById(a)
            },
            createElement: function(a, b, c, f, k) {
                a = g.createElement(a);
                if (b)
                    a.id = b;
                if (c)
                    a.className = 
                    c;
                if (f)
                    a.style.cssText = f;
                if (k)
                    a.innerHTML = k;
                return a
            },
            formatParam: function(a, b) {
                return typeof a == "number" ? +b : typeof a == "boolean" ? /^true$/i.test(b) : b
            },
            isUndefined: function(a) {
                return typeof a == "undefined"
            },
            arrayContains: function(a, b, c) {
                for (var f = a.length; f--; )
                    if (!h.isUndefined(b) && a[f] === b || !h.isUndefined(c) && c.test(a[f]))
                        return !0;
                return !1
            },
            loadScript: function(a, b) {
                var c = h.requestedScripts;
                if (!h.arrayContains(c, a))
                    /(bsMore|bshareS887)(Org)?\.js/.test(a) && c.push(a),
                    b = b || function() {}
                    ,
                    c = h.createElement("script"),
                    c.src = a,
                    c.type = "text/javascript",
                    c.charset = "utf-8",
                    c.onload = b,
                    c.onreadystatechange = function() {
                        /complete|loaded/.test(this.readyState) && b()
                    }
                    ,
                    g.getElementsByTagName("head")[0].appendChild(c)
            },
            loadStyle: function(a) {
                var b = h.createElement("style");
                b.type = "text/css";
                b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(g.createTextNode(a));
                g.getElementsByTagName("head")[0].appendChild(b)
            },
            getOffset: function(a) {
                for (var b = {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    h: a.offsetHeight,
                    w: a.offsetWidth
                }; a = a.offsetParent; b.x += a.offsetLeft,
                b.y += a.offsetTop)
                    ;
                return b
            },
            getElem: function(a, b, c, f) {
                for (var a = a.getElementsByTagName(b), b = [], k = 0, d = 0, e = a.length; k < e; k++) {
                    var g = a[k];
                    if (!c || g.className.indexOf(c) != -1)
                        b.push(g),
                        typeof f == "function" && f(g, d++)
                }
                return b
            },
            getText: function(a) {
                return h.isIe ? a.innerText : a.textContent
            },
            insertAfter: function(a, b) {
                var c = b.parentNode;
                c.lastChild === b ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
            },
            getWH: function() {
                return {
                    h: (h.isSt ? l : g.body).clientHeight,
                    w: (h.isSt ? l : g.body).clientWidth
                }
            },
            stopProp: function(a) {
                a = 
                a || e.event || {};
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            },
            getScript: function(a) {
                for (var b = g.getElementsByTagName("script"), c = [], f = 0, k = b.length; f < k; f++) {
                    var d = b[f].src;
                    d && d.search(a) >= 0 && /bshare.(cn|com|me)|static.(local|dev)/i.test(d) && c.push(b[f])
                }
                return c
            },
            parseOptions: function(a, b) {
                var c = {};
                if (a = /\?(.*)|#(.*)/.exec(a))
                    for (var a = a[0].slice(1).replace("+", " "), f = a.split(/[&;]/g), k = 0, d = f.length; k < d; k++) {
                        var e = f[k].split("=")
                          , g = decodeURIComponent(e[0])
                          , h = b ? e[1] : null ;
                        if (!b)
                            try {
                                h = decodeURIComponent(e[1])
                            } catch (l) {}
                        c[g] = 
                        h
                    }
                return c
            },
            submitForm: function(a, b, c, f) {
                var f = f || "post"
                  , k = h.createElement("form");
                g.body.appendChild(k);
                k.method = f;
                k.target = c;
                k.setAttribute("accept-charset", "utf-8");
                k.action = a;
                for (var d in b)
                    if (typeof b[d] != "function")
                        a = h.createElement("input"),
                        a.type = "hidden",
                        a.name = d,
                        a.value = b[d],
                        k.appendChild(a);
                if (h.isIe)
                    g.charset = "utf-8";
                k.submit();
                g.body.removeChild(k)
            },
            replaceParam: function(a, b, c) {
                return b ? c.replace(a, h.encode(b)) : c.replace(a, "")
            },
            ready: function(a) {
                if (g.addEventListener)
                    g.addEventListener("DOMContentLoaded", 
                    function() {
                        g.removeEventListener("DOMContentLoaded", arguments.callee, !1);
                        a.call()
                    }, !1),
                    e.addEventListener("load", a, !1);
                else if (g.attachEvent) {
                    g.attachEvent("onreadystatechange", function() {
                        g.readyState == "complete" && (g.detachEvent("onreadystatechange", arguments.callee),
                        a.call())
                    });
                    e.attachEvent("onload", a);
                    var b = !1;
                    try {
                        b = e.frameElement === null 
                    } catch (c) {}
                    l.doScroll && b && function() {
                        try {
                            l.doScroll("left")
                        } catch (b) {
                            setTimeout(arguments.callee, 10);
                            return
                        }
                        a.call()
                    }()
                } else
                    e.onload = a
            },
            createBuzzObject: function(a, 
            b) {
                if (e[a])
                    return e[a];
                b.namespace = a;
                var c = e[a] = {
                    shost: e.BSHARE_SHOST_NAME,
                    bhost: e.BSHARE_BUTTON_HOST,
                    whost: e.BSHARE_WEB_HOST,
                    defaultConfig: b,
                    params: {
                        type: 0,
                        publisherUuid: "",
                        url: "",
                        title: "",
                        summary: "",
                        content: "",
                        pic: "",
                        pics: "",
                        video: "",
                        vTag: "",
                        vUid: "",
                        vEmail: "",
                        product: "",
                        price: "0",
                        brand: "",
                        tag: "",
                        category: "",
                        template: "1",
                        popcss: "",
                        apvuid: "",
                        apts: "",
                        apsign: ""
                    },
                    isReady: !1,
                    completed: !1,
                    curb: 0,
                    preb: -1,
                    entries: [],
                    counters: [],
                    viewInfo: null 
                };
                c.config = {};
                c.elems = {
                    powerBy: '<div id="bsPower" style="float:right;text-align:right;overflow:hidden;height:100%;"><a class="bsSiteLink" style="font-size:10px;vertical-align:text-bottom;line-height:24px;cursor:pointer;" href="' + 
                    c.whost + '" target="_blank"><span style="font-size:10px;vertical-align:text-bottom;"><span style="color:#f60;">b</span>Share</span></a></div>'
                };
                for (var f in c.defaultConfig)
                    c.config[f] = c.defaultConfig[f];
                c.imageBasePath = c.shost + "/frame/images/";
                c.jsBasePath = c.shost + "/b/";
                c.addEntry = function(a) {
                    if (typeof c.counters == "number")
                        c.counters = [];
                    c.entries.push(a);
                    c.counters.push(0)
                }
                ;
                return e[a]
            },
            parseBuzzOptions: function(a, b, c, f, k) {
                var i;
                i = (a = h.getScript(b)[a]) ? h.parseOptions(a.src) : {},
                a = i;
                k && (a = k(a));
                for (var d in a)
                    if (!h.isUndefined(a[d]) && 
                    !(a[d] === null  || typeof c[d] == "number" && a[d] === ""))
                        h.isUndefined(c[d]) ? h.isUndefined(f[d]) || (f[d] = h.formatParam(f[d], a[d])) : c[d] = h.formatParam(c[d], a[d])
            }
        }
    }
})(window, document);
(function(e, g, l) {
    var d = g.bShareUtil
      , h = g.bShareControl;
    if (!(h.count > 0)) {
        var a = d.createBuzzObject(e, {
            lang: "zh",
            height: 0,
            width: 0,
            image: "",
            bgc: "none",
            fgc: "#333",
            poptxtc: "#666",
            popbgc: "#f2f2f2",
            sn: !1,
            logo: !0,
            style: 1,
            fs: 0,
            inline: !1,
            beta: !1,
            popjs: "",
            popHCol: 2,
            pop: 0,
            mdiv: 0,
            poph: "auto",
            bps: "",
            bps2: "",
            showShareCount: !0,
            icon: !0,
            text: null ,
            promote: !1
        })
          , b = a.config
          , c = a.params;
        a.boxConfig = {
            position: 0,
            boxHeight: 408,
            boxWidth: 548,
            closeTop: 8,
            closeRight: 20,
            hasTop: !0,
            hasFrame: !0,
            hasMore: !0
        };
        a.boxConfigEC = {
            position: 0,
            boxHeight: 404,
            boxWidth: 650,
            closeTop: 10,
            closeRight: 16,
            hasFrame: !0
        };
        a.boxConfigWX = {
            id: "bsWXBox",
            position: 0,
            boxHeight: 245,
            boxWidth: 220,
            closeTop: 8,
            closeRight: 20,
            hasTop: !0
        };
        a.customization = {};
        a.loadOptions = function() {
            d.parseBuzzOptions(0, /button(Lite)?(Org)?\.js|bshare_load/, b, c, function(b) {
                if (!d.isUndefined(g.bShareOpt))
                    for (var c in g.bShareOpt)
                        b[c] = g.bShareOpt[c];
                if (!d.arrayContains(a.langs, b.lang))
                    b.lang = "zh";
                if (b.h && b.w && b.img)
                    b.height = b.h,
                    b.width = b.w,
                    b.image = b.img;
                b.bgc = b.bgcolor || void 0;
                b.fgc = b.textcolor || void 0;
                b.logo = !(b.logo && /^false$/i.test(b.logo));
                b.popHCol = b.pophcol || void 0;
                if (b.style)
                    b.style = /^(-1|0|1|2|3|4|5|10|11|999)$/.test(b.style) ? +b.style : void 0;
                if (b.bp)
                    b.style && b.style == 2 ? b.bps2 = b.bp.split(",") : b.bps = b.bp.split(",");
                b.showShareCount = b.style && /3|4|5/.test(b.style) ? !1 : !(b.ssc && /^false$/i.test(b.ssc.toString()));
                b.type = g.BSHARE_BUTTON_TYPE || b.type;
                b.publisherUuid = b.uuid || void 0;
                return b
            });
            for (var f in a.defaultConfig)
                a.defaultConfig[f] !== b[f] && (a.customization[f] = b[f]);
            if (c.type != 15)
                c.popcss = 
                "";
            if (g.location.href.indexOf(a.whost + "/moreStyles") < 0)
                b.promote = !1
        }
        ;
        a.writeButton = function() {
            var c = ""
              , e = {
                0: 0,
                1: [110, 85],
                10: [90, 51],
                11: [82, 82]
            }
              , g = {
                0: 16,
                1: 24,
                10: 21,
                11: 49
            }
              , h = a.imageBasePath
              , i = b.style
              , m = b.image
              , o = b.showShareCount
              , n = b.width
              , p = b.height;
            /^(3|4|5)$/.test(i) || (c = '<div class="bsPromo bsPromo1"></div>');
            i > 1 && i < 6 ? a.writeBshareDiv(c) : i == -1 ? (d.getElem(l, "div", "bshare-custom", function(b) {
                if (!b.childNodes[0].className || b.childNodes[0].className.indexOf("bsPromo") < 0) {
                    var c = d.createElement("div", 
                    "", "bsPromo bsPromo" + (a.isLite ? 2 : 1));
                    b.insertBefore(c, b.childNodes[0])
                }
            }),
            (b.beta || b.popjs) && a.writeBshareDiv('<div class="buzzButton">' + b.text + "</div>", "")) : i >= 0 && (i != 999 && (m = h + "logo_square_s.gif",
            i != 0 && (m = h + "button_custom" + i + "-" + (b.lang == "en" ? "en" : "zh"),
            o && (m += "-c"),
            i == 10 && (n = /Blue|Red|Green|Grey|Orange/.test(b.bgc) ? b.bgc : "Orange",
            m += "-" + n),
            m += ".gif"),
            n = e[i][o ? 0 : 1],
            p = g[i]),
            c += '<div class="buzzButton bsStyle' + i + '" style="height:' + p + "px;color:" + b.fgc + ";",
            i == 0 ? (c += b.icon ? "background:transparent url(" + 
            m + ") no-repeat;" : "",
            c += 'float:left"><div style="padding:0 4px 0 ' + (b.icon ? "21px" : "0") + ";" + (a.isLite ? "height:16px;" : "") + '"><span class="bshareText" style="line-height:18px;float:left;">' + (b.text === null  ? "\u5206\u4eab" : b.text) + "</span></div></div>",
            o && (c += '<div style="background:transparent url(' + h + 'counter_box.gif) no-repeat;float:left;width:40px;height:16px;text-align:center;font-weight:bold;">&nbsp;<span style="position:relative;line-height:16px;" class="shareCount"></span></div>')) : (c += ";background:transparent url(" + 
            m + ") no-repeat;text-align:center;width:" + n + 'px;">',
            o && i != 999 && (c += '<span style="font-weight:bold;position:relative;line-height:' + (i == 10 ? "22" : "25") + 'px;" class="shareCount"></span>'),
            c += "</div>"),
            c += '<div style="clear:both;"></div>',
            a.writeBshareDiv(c, "font-size:12px;height:" + p + "px;width:" + n + "px;"))
        }
        ;
        a.more = function() {
            return typeof a.moreDiv == "function" ? (a.moreDiv(),
            !0) : !1
        }
        ;
        a.load = function(f) {
            if (!f) {
                if (b.mdiv < 0)
                    return;
                var e = 0
                  , q = setInterval(function() {
                    a.more() || e >= 30 ? clearInterval(q) : ++e
                }, 100);
                return !1
            }
            c.target = 
            f || "";
            a.click();
            a.disappear();
            a.prepare();
            if (!a.loadPlus || !a.loadPlus()) {
                var j;
                if (f == "weixin") {
                    j = a.bhost + "/barCode?site=weixin";
                    for (var i in c)
                        !/content|target/.test(i) && typeof c[i] != "function" && (j += "&" + i + "=" + d.encode(c[i]));
                    l.getElementById("bsWXBox") || a.createBox(a.boxConfigWX);
                    console.log( '<img style="width:178px;height:178px;margin:21px;display:inline-block;" src="' + j + '" />');
                    a.getFrame(a.boxConfigWX).innerHTML = '<img style="width:178px;height:178px;margin:21px;display:inline-block;" src="' + j + '" />';
                    a.display(!1, a.boxConfigWX)
                } else {
                    if (h.bShareLoad)
                        for (i in j = a.bhost + "/bshare_redirect?site=" + f,
                        c)
                            !/content|target/.test(i) && typeof c[i] != "function" && (j += "&" + i + "=" + d.encode(c[i]));
                    else
                        (j = g.BS_PURL_MAP[f]) || alert(a.iL8n.loadFailed),
                        f == "gmw" ? j = d.replaceParam("${URL}", c.url.replace("http://", ""), j) : c.url && (j = d.replaceParam("${URL}", c.url, j)),
                        j = d.replaceParam("${TITLE}", c.title, j),
                        j = d.replaceParam("${CONTENT}", c.summary, j),
                        j = d.replaceParam("${IMG}", c.pic, j),
                        j = d.replaceParam("${VIDEO}", c.video, j);
                    console.log(j);
                    g.open(j, "", "height=600,width=800,top=100,left=100,screenX=100,screenY=100,scrollbars=yes,resizable=yes")
                }
            }
        }
        ;
        a.show = function() {
            a.load()
        }
        ;
        a.onLoad = function() {
            d.getElem(l, "a", "bshareDiv", function(b, c) {
                d.getElem(b, "div", "buzzButton", function(b) {
                    b.onclick = 
                    function(b) {
                        return function(c) {
                            a.more(c, b);
                            return !1
                        }
                    }(c)
                })
            });
            var c = b.showShareCount;
            if (b.style == 0) {
                var e = d.getElem(l, "div", "buzzButton")[0].offsetWidth;
                c && (e += 41);
                d.getElem(l, "a", "bshareDiv", function(a) {
                    a.style.width = e + "px"
                })
            }
            var h = a.entries.length;
            if (c && h > 0) {
                for (var c = "", j = 0; j < h; j++) {
                    var i = a.entries[j];
                    if (typeof i.url == "string") {
                        if (d.isIe && c.length + i.url.length > 2E3)
                            break;
                        c != "" && (c += "|");
                        c += i.url
                    }
                }
                c != "" && (c += "|");
                c += g.location.href;
                a.count(c)
            }
        }
        ;
        a.renderButton = function() {
            d.loadStyle("a.bshareDiv,#bsPanel,#bsMorePanel,#bshareF{border:none;background:none;padding:0;margin:0;font:12px Helvetica,Calibri,Tahoma,Arial,\u5b8b\u4f53,sans-serif;line-height:14px;}#bsPanel div,#bsMorePanel div,#bshareF div{display:block;}.bsRlogo .bsPopupAwd,.bsRlogoSel .bsPopupAwd,.bsLogo .bsPopupAwd,.bsLogoSel .bsPopupAwd{line-height:16px !important;}a.bshareDiv div,#bsFloatTab div{*display:inline;zoom:1;display:inline-block;}a.bshareDiv img,a.bshareDiv div,a.bshareDiv span,a.bshareDiv a,#bshareF table,#bshareF tr,#bshareF td{text-decoration:none;background:none;margin:0;padding:0;border:none;line-height:1.2}a.bshareDiv span{display:inline;float:none;}div.buzzButton{cursor:pointer;font-weight:bold;}.buzzButton .shareCount a{color:#333}.bsStyle1 .shareCount a{color:#fff}span.bshareText{white-space:nowrap;}span.bshareText:hover{text-decoration:underline;}a.bshareDiv .bsPromo,div.bshare-custom .bsPromo{display:none;position:absolute;z-index:100;}a.bshareDiv .bsPromo.bsPromo1,div.bshare-custom .bsPromo.bsPromo1{width:51px;height:18px;top:-18px;left:0;line-height:16px;font-size:12px !important;font-weight:normal !important;color:#fff;text-align:center;background:url(" + 
            a.imageBasePath + "bshare_box_sprite2.gif) no-repeat 0 -606px;}div.bshare-custom .bsPromo.bsPromo2{background:url(" + a.imageBasePath + "bshare_promo_sprite.gif) no-repeat;cursor:pointer;}");
            a.writeButton();
            c.type == 15 && a.filterECPlats()
        }
        ;
        a.loadButtonStyle = function() {
            if (c.type != 15) {
                var f, e = b.style;
                if (b.beta)
                    f = a.jsBasePath + "styles/bshareS888.js?v=20160206";
                else if (b.popjs)
                    f = b.popjs;
                else if (b.style != -1 && (f = a.jsBasePath + "styles/bshareS" + (e > 1 && e < 6 ? e : 1) + ".js?v=20160206",
                b.pop == -1 && (e <= 1 || e >= 6)))
                    f = "";
                f && d.loadScript(f)
            }
        }
        ;
        a.international = 
        function(c) {
            b.lang == "zh" ? c() : d.loadScript(a.jsBasePath + "langs/bs-lang-" + b.lang + ".js?v=20160206", c)
        }
        ;
        a.start = function() {
            d.loadEngine && (d.loadEngine(e),
            a.loadOptions(),
            a.international(function() {
                if (!a.completed) {
                    if (d.isUndefined(b.text) || b.text === null )
                        b.text = b.style == 0 ? a.iL8n.shareTextShort : a.iL8n.shareText;
                    c.type != 1 && a.renderButton();
                    d.createShareBox(e);
                    if (c.type == 15)
                        a.boxConfig = a.boxConfigEC;
                    a.createBox();
                    b.mdiv >= 0 && c.type != 15 && d.loadScript(a.jsBasePath + "components/bsMore.js?v=20160206");
                    if (c.type == 1)
                        return a.load(),
                        !1;
                    a.loadButtonStyle();
                    a.onLoad();
                    a.prepare(0);
                    setTimeout(function() {
                        h.viewed || a.view();
                        setTimeout(function() {
                            h.bShareLoad || d.loadScript(a.jsBasePath + "components/bsPlatforms.js?v=20160206")
                        }, 3E3)
                    }, 3E3);
                    a.completed = !0
                }
            }))
        }
        ;
        a.init = function() {
            if (!a.isReady)
                a.isReady = !0,
                d.loadScript(a.shost + "/js/libs/fingerprint2.min.js"),
                d.loadScript(a.jsBasePath + "engines/bs-engine.js?v=20160206", a.start)
        }
        ;
        d.loadScript(a.jsBasePath + "components/bsStatic.js?v=20160206")
    }
})("bShare", window, document);
(function(e, g, l) {
    if (!(g.bShareControl.count > 0)) {
        g.bShareControl.count += 1;
        var d = g.bShareUtil
          , e = g[e]
          , h = e.config;
        e.isLite = !0;
        e.customization.type = "lite";
        e.writeBshareDiv = function(a, b) {
            d.getElem(l, "a", "bshareDiv", function(c) {
                if (a)
                    c.innerHTML = a;
                else if (c.innerHTML.length < 24)
                    c.innerHTML = "";
                c.onclick = function() {
                    return !1
                }
                ;
                c.style.cssText = (h.inline ? "" : "display:block;") + "text-decoration:none;padding:0;margin:0;" + b || ""
            })
        }
        ;
        d.ready(e.init)
    }
})("bShare", window, document);
(function() {
    var e = window.bShare;
    if (!e)
        e = window.bShare = {};
    e.pnMap = {
        115: ["115\u6536\u85cf\u5939", 0],
        "139mail": ["139\u90ae\u7bb1", 2],
        "9dian": ["\u8c46\u74e39\u70b9", 6],
        baiducang: ["\u767e\u5ea6\u641c\u85cf", 7],
        baiduhi: ["\u767e\u5ea6\u7a7a\u95f4", 8],
        bgoogle: ["Google\u4e66\u7b7e", 10],
        bsharesync: ["\u4e00\u952e\u901a", 16],
        caimi: ["\u8d22\u8ff7", 17],
        cfol: ["\u4e2d\u91d1\u5fae\u535a", 18],
        chouti: ["\u62bd\u5c49", 20],
        clipboard: ["\u590d\u5236\u7f51\u5740", 21],
        cyolbbs: ["\u4e2d\u9752\u8bba\u575b", 22],
        cyzone: ["\u521b\u4e1a\u5427", 23],
        delicious: ["\u7f8e\u5473\u4e66\u7b7e", 24],
        dig24: ["\u9012\u5ba2\u7f51", 25],
        digg: ["Digg", 26],
        diglog: ["\u5947\u5ba2\u53d1\u73b0", 27],
        diigo: ["Diigo", 29],
        douban: ["\u8c46\u74e3\u7f51", 30],
        dream: ["\u68a6\u5e7b\u4eba\u751f", 31],
        duitang: ["\u5806\u7cd6", 32],
        eastdaymb: ["\u4e1c\u65b9\u5fae\u535a", 33],
        email: ["\u7535\u5b50\u90ae\u4ef6", 
        34],
        evernote: ["Evernote", 35],
        facebook: ["Facebook", 36],
        fanfou: ["\u996d\u5426", 37],
        favorite: ["\u6536\u85cf\u5939", 38],
        feixin: ["\u98de\u4fe1", 39],
        friendfeed: ["FriendFeed", 40],
        fwisp: ["Fwisp", 42],
        ganniu: ["\u8d76\u725b\u5fae\u535a", 43],
        gmail: ["Gmail", 44],
        gmw: ["\u5149\u660e\u7f51", 45],
        gtranslate: ["\u8c37\u6b4c\u7ffb\u8bd1", 46],
        hemidemi: ["\u9ed1\u7c73\u4e66\u7b7e", 47],
        hexunmb: ["\u548c\u8baf\u5fae\u535a", 48],
        huaban: ["\u82b1\u74e3", 49],
        ifengkb: ["\u51e4\u51f0\u5feb\u535a", 50],
        ifengmb: ["\u51e4\u51f0\u5fae\u535a", 51],
        ifensi: ["\u7c89\u4e1d\u7f51", 52],
        instapaper: ["Instapaper", 53],
        itieba: ["i\u8d34\u5427", 54],
        joinwish: ["\u597d\u613f\u7f51", 55],
        kaixin001: ["\u5f00\u5fc3\u7f51", 56],
        laodao: ["\u5520\u53e8\u7f51", 57],
        leihou: ["\u96f7\u7334", 58],
        leshou: ["\u4e50\u6536", 59],
        linkedin: ["LinkedIn", 
        60],
        livespace: ["MS Livespace", 61],
        mala: ["\u9ebb\u8fa3\u5fae\u535a", 63],
        masar: ["\u739b\u6492\u7f51", 65],
        meilishuo: ["\u7f8e\u4e3d\u8bf4", 66],
        miliao: ["\u7c73\u804a", 67],
        mister_wong: ["Mister Wong", 68],
        mogujie: ["\u8611\u83c7\u8857", 69],
        moptk: ["\u732b\u6251\u63a8\u5ba2", 70],
        msn: ["MSN", 71],
        myshare: ["MyShare", 72],
        myspace: ["MySpace", 73],
        neteasemb: ["\u7f51\u6613\u5fae\u535a", 74],
        netvibes: ["Netvibes", 75],
        peoplemb: ["\u4eba\u6c11\u5fae\u535a", 76],
        pinterest: ["Pinterest", 79],
        poco: ["Poco\u7f51", 81],
        printer: ["\u6253\u5370", 82],
        printf: ["Print Friendly", 83],
        qqmb: ["\u817e\u8baf\u5fae\u535a", 84],
        qqshuqian: ["QQ\u4e66\u7b7e", 85],
        qqxiaoyou: ["\u670b\u53cb\u7f51", 86],
        qzone: ["QQ\u7a7a\u95f4", 87],
        readitlater: ["ReadItLater", 88],
        reddit: ["Reddit", 89],
        redmb: ["\u7ea2\u5fae\u535a", 90],
        renjian: ["\u4eba\u95f4\u7f51", 91],
        renmaiku: ["\u4eba\u8109\u5e93", 92],
        renren: ["\u4eba\u4eba\u7f51", 93],
        shouji: ["\u624b\u673a", 95],
        sinaminiblog: ["\u65b0\u6d6a\u5fae\u535a", 96],
        sinaqing: ["\u65b0\u6d6aQing", 97],
        sinavivi: ["\u65b0\u6d6aVivi", 98],
        sohubai: ["\u641c\u72d0\u767d\u793e\u4f1a", 99],
        sohuminiblog: ["\u641c\u72d0\u5fae\u535a", 100],
        southmb: ["\u5357\u65b9\u5fae\u535a", 101],
        stumbleupon: ["StumbleUpon", 102],
        szone: ["\u5b88\u682a\u7f51", 103],
        taojianghu: ["\u6dd8\u6c5f\u6e56", 104],
        tianya: ["\u5929\u6daf", 105],
        tongxue: ["\u540c\u5b66\u5fae\u535a", 106],
        tuita: ["\u63a8\u4ed6", 107],
        tumblr: ["Tumblr", 108],
        twitter: ["Twitter", 109],
        ushi: ["\u4f18\u58eb\u7f51", 110],
        waakee: ["\u6316\u5ba2", 112],
        wealink: ["\u82e5\u90bb\u7f51", 113],
        woshao: ["\u6211\u70e7\u7f51", 115],
        xianguo: ["\u9c9c\u679c\u7f51", 
        116],
        xiaomeisns: ["\u6821\u5a92\u91c7\u901a", 117],
        xinminmb: ["\u65b0\u6c11\u5fae\u535a", 118],
        xyweibo: ["\u5fae\u535a\u6821\u56ed", 119],
        yaolanmb: ["\u6447\u7bee\u5fae\u535a", 120],
        yijee: ["\u6613\u96c6\u7f51", 121],
        youdao: ["\u6709\u9053\u4e66\u7b7e", 122],
        zjol: ["\u6d59\u6c5f\u5fae\u535a", 124],
        xinhuamb: ["\u65b0\u534e\u5fae\u535a"],
        szmb: ["\u6df1\u5733\u5fae\u535a"],
        changshamb: ["\u5fae\u957f\u6c99"],
        hefeimb: ["\u5408\u80a5\u5fae\u535a"],
        wansha: ["\u73a9\u5565e\u65cf"],
        "189share": ["\u624b\u673a\u5feb\u4f20"],
        diandian: ["\u70b9\u70b9\u7f51"],
        tianji: ["\u5929\u9645\u7f51"],
        jipin: ["\u5f00\u5fc3\u96c6\u54c1"],
        chezhumb: ["\u8f66\u4e3b\u5fae\u535a"],
        gplus: ["Google+"],
        yidongweibo: ["\u79fb\u52a8\u5fae\u535a"],
        youdaonote: ["\u6709\u9053\u7b14\u8bb0"],
        jschina: ["\u5fae\u6c5f\u82cf"],
        mingdao: ["\u660e\u9053"],
        jxcn: ["\u6c5f\u897f\u5fae\u535a"],
        qileke: ["\u5947\u4e50\u6536\u85cf"],
        sohukan: ["\u641c\u72d0\u968f\u8eab\u770b"],
        maikunote: ["\u9ea6\u5e93\u8bb0\u4e8b"],
        lezhimark: ["\u4e50\u77e5\u4e66\u7b7e"],
        "189mail": ["189\u90ae\u7bb1"],
        wo: ["WO+\u5206\u4eab"],
        gmweibo: ["\u5149\u660e\u5fae\u535a"],
        jianweibo: ["\u5409\u5b89\u5fae\u535a"],
        qingbiji: ["\u8f7b\u7b14\u8bb0"],
        duankou: ["\u7aef\u53e3\u7f51"],
        qqim: ["QQ\u597d\u53cb"],
        kdweibo: ["\u4e91\u4e4b\u5bb6"],
        xueqiu: ["\u96ea\u7403"],
        weixin: ["\u5fae\u4fe1"]
    };
    e.iL8n = {
        promoteHot: "\u70ed",
        promoteNew: "\u65b0",
        promoteRec: "\u63a8\u8350",
        rtnTxt: "\u9009\u62e9\u5176\u4ed6\u5e73\u53f0 >>",
        shareText: "\u5206\u4eab\u5230",
        shareTextShort: "\u5206\u4eab",
        shareTextPromote: "\u5206\u4eab\u6709\u793c",
        morePlats: "\u66f4\u591a\u5e73\u53f0...",
        morePlatsShort: "\u66f4\u591a...",
        whatsThis: "\u8fd9\u662f\u4ec0\u4e48\u5de5\u5177\uff1f",
        promote: "\u5206\u4eab\u6709\u793c",
        promoteShort: "\u5956",
        searchHint: "\u8f93\u5165\u5e73\u53f0\u5173\u952e\u5b57\u67e5\u8be2",
        closeHint: "30\u5206\u949f\u5185\u4e0d\u518d\u51fa\u73b0\u6b64\u5206\u4eab\u6846",
        loadFailed: "\u7f51\u7edc\u592a\u6162\u65e0\u6cd5\u52a0\u8f7d\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",
        loadFailed2: "\u5f88\u62b1\u6b49\uff0c\u65e0\u6cd5\u8fde\u63a5\u670d\u52a1\u5668\u3002\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",
        notSupport: "\u4e0d\u652f\u6301\uff01",
        copySuccess: "\u590d\u5236\u6210\u529f\uff01\u60a8\u53ef\u4ee5\u7c98\u8d34\u5230QQ/MSN\u4e0a\u5206\u4eab\u7ed9\u60a8\u7684\u597d\u53cb\uff01",
        copyTip: "\u8bf7\u6309Ctrl+C\u590d\u5236\uff0c\u7136\u540e\u60a8\u53ef\u4ee5\u7c98\u8d34\u5230QQ/MSN\u4e0a\u5206\u4eab\u7ed9\u60a8\u7684\u597d\u53cb\uff01",
        bookmarkTip: "\u6309\u4e86OK\u4ee5\u540e\uff0c\u8bf7\u6309Ctrl+D\uff08Macs\u7528Command+D\uff09\u3002",
        confirmClose: "\u5173\u95ed\u540e\uff0c\u8be5\u5206\u4eab\u6309\u94ae30\u5206\u949f\u5c06\u4e0d\u518d\u51fa\u73b0\uff0c\u60a8\u4e5f\u65e0\u6cd5\u4f7f\u7528\u5206\u4eab\u529f\u80fd\uff0c\u786e\u5b9a\u5417\uff1f"
    }
})();



(function() {
    function C() {
        var g = ".bshare-custom{font-size:13px;line-height:16px !important;}.bshare-custom.icon-medium{font-size:14px;line-height:20px !important;}.bshare-custom.icon-medium-plus,.bshare-custom.icon-large{font-size:16px;line-height:26px !important;}.bshare-custom.icon-large{line-height:44px !important;}.bshare-custom a{padding-left:19px;height:16px;_height:18px;text-decoration:none;display:none;zoom:1;vertical-align:middle;cursor:pointer;color:#333;margin-right:3px;-moz-opacity:1;-khtml-opacity:1;opacity:1;}.bshare-custom a:hover{text-decoration:underline;-moz-opacity:0.75;-khtml-opacity:0.75;opacity:0.75;}.bshare-custom.icon-medium a{padding-left:27px;height:24px;}.bshare-custom.icon-medium-plus a{padding-left:35px;height:32px;}.bshare-custom.icon-large a{padding-left:53px;height:50px;}.bshare-custom .bshare-more{padding-left:0 !important;color:#333 !important;" + 
        c + ".bshare-custom #bshare-shareto{color:#333;text-decoration:none;font-weight:bold;margin-right:8px;" + c;
        for (b in d.pnMap)
            a = d.topMap[b],
            g += ".bshare-custom .bshare-" + b + '{background:url("' + p + (a ? l : b) + q + '")' + (a ? " no-repeat 0 " + a * D + "px;" + c : m) + ".bshare-custom.icon-medium .bshare-" + b + '{background:url("' + r + (a ? l : b) + '.gif")' + (a ? " no-repeat 0 " + a * E + "px;" + c : m) + ".bshare-custom.icon-medium-plus .bshare-" + b + '{background:url("' + s + (a ? l : b) + '.gif")' + (a ? " no-repeat 0 " + a * F + "px;" + c : m) + ".bshare-custom.icon-large .bshare-" + 
            b + '{background:url("' + t + (a ? l : b) + '.gif")' + (a ? " no-repeat 0 " + a * G + "px;" + c : m);
        g += '.bshare-custom #bshare-more-icon,.bshare-custom .bshare-more-icon{background:url("' + p + "more" + q + '") no-repeat;padding-left:19px !important;}.bshare-custom.icon-medium #bshare-more-icon,.bshare-custom.icon-medium .bshare-more-icon{background:url("' + r + 'more.gif") no-repeat;padding-left:27px !important;}.bshare-custom.icon-medium-plus #bshare-more-icon,.bshare-custom.icon-medium-plus .bshare-more-icon{background:url("' + s + 'more.gif") no-repeat;padding-left:35px !important;}.bshare-custom.icon-large #bshare-more-icon,.bshare-custom.icon-large .bshare-more-icon{background:url("' + 
        t + 'more.gif") no-repeat;padding-left:53px !important;}';
        for (b in y)
            e = H + y[b],
            g += ".bshare-custom .bshare-more." + e + "{background:url(" + p + e + q + ") no-repeat;}.bshare-custom.icon-medium a.bshare-more." + e + "{background:url(" + r + e + ".gif) no-repeat;}.bshare-custom.icon-medium-plus a.bshare-more." + e + "{background:url(" + s + e + ".gif) no-repeat;}.bshare-custom.icon-large a.bshare-more." + e + "{background:url(" + t + e + ".gif) no-repeat;}";
        g += ".bshare-custom .bshare-share-count{width:41px;background:transparent url(" + h + "counter_box_18.gif) no-repeat;height:18px;line-height:18px !important;color:#333;text-align:center;font:bold 11px Arial,\u5b8b\u4f53,sans-serif;zoom:1;_padding-top:2px;" + 
        c + ".bshare-custom.icon-medium .bshare-share-count{width:45px;padding:0 0 0 2px;vertical-align:bottom;background:transparent url(" + h + "counter_box_24.gif) no-repeat;height:24px;color:#444;line-height:24px !important;text-align:center;font:bold 12px Arial,\u5b8b\u4f53,sans-serif;zoom:1;_padding-top:5px;" + c + ".bshare-custom.icon-medium-plus .bshare-share-count{width:60px !important;padding:0 0 0 3px;vertical-align:bottom;background:transparent url(" + h + "counter_box_32.gif) no-repeat;height:32px;line-height:32px !important;text-align:center;color:#444;font:normal 18px Arial,\u5b8b\u4f53,sans-serif;zoom:1;_padding-top:6px;" + 
        c + ".bshare-custom.icon-large .bshare-share-count{width:94px !important;padding:0 0 0 5px;vertical-align:bottom;background:transparent url(" + h + "counter_box_50.gif) no-repeat;height:50px;line-height:50px !important;text-align:center;color:#444;font:normal 22px Arial,\u5b8b\u4f53,sans-serif;zoom:1;_padding-top:12px;" + c;
        j.loadStyle(g);
        if (!d.anchorsBinded) {
            d.anchorsBinded = !0;
            var u, v, z, k, g = function(a) {
                if (!a)
                    a = w.event;
                if (u = a.target || a.srcElement) {
                    v = u.className.split(" ");
                    z = u.buttonIndex;
                    for (f = 0; f < v.length; f++)
                        if (i = 
                        v[f],
                        /^bshare-/.test(i)) {
                            k = i.slice(7);
                            break
                        }
                    if (k) {
                        if (k == "more") {
                            if (n.pop == -2)
                                return !1;
                            d.more(a);
                            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                            return !1
                        }
                        d.share(a, k, z)
                    }
                    k = null ;
                    return !1
                }
            }
            , B = j.getElem(A, "div", "bshare-custom"), x, o;
            for (f = 0; f < B.length; f++) {
                x = B[f].getElementsByTagName("a");
                for (i = 0; i < x.length; i++)
                    o = x[i],
                    o.buttonIndex = f,
                    A.addEventListener ? o.addEventListener("click", g, !1) : o.attachEvent("onclick", g)
            }
        }
    }
    var w = window, j = w.bShareUtil, d = w.bShare, n = d.config, h = d.imageBasePath, A = document, p = h + "logos/s4/", 
    r = h + "logos/m2/", s = h + "logos/mp2/", t = h + "logos/l3/", D = -18, E = -26, F = -34, G = -52, l = "sprite/top_logos_sprite", c = "*display:inline;display:inline-block;}", m = " no-repeat;" + c, f, i, b, a, q = j.isIe ? ".gif" : ".png", H = "more-style-", e, y = ["android", "apple", "sharethis", "sharethis-orange", "addthis"];
    j.ready(function() {
        var a = function() {
            d.completed ? (C(),
            d.params.type != 15 && n.pop != -1 && !n.beta && !n.popjs && j.loadScript(d.jsBasePath + "styles/bshareS887.js?v=20160206")) : setTimeout(a, 50)
        }
        ;
        a()
    })
})();

