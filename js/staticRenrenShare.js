if (!window.XN) {
    window.XN = {}
}
if (!window.XN.Share) {
    var static_url = "http://s.xnimg.cn/connect";
    var connect_url = "http://www.connect.renren.com";
    XN.Share = {
        init: function(a) {
            var b = document.createElement("link");
            b.rel = "stylesheet";
            b.type = "text/css";
            b.href = static_url + "/css/share_button.css";
            this.insertDom(b);
            this.prober = setInterval(XN.Share.probe, 700);
            if (window.attachEvent) {
                window.attachEvent("onload", XN.Share.stopProbe)
            } else {
                window.addEventListener("load", XN.Share.stopProbe, false)
            }
        },
        insertDom: function(a) {
            (document.getElementsByTagName("head")[0] || document.body).appendChild(a)
        },
        addQS: function(e, b) {
            var c = [];
            for (var d in b) {
                if (b[d]) {
                    c.push(d.toString() + "=" + encodeURIComponent(b[d]))
                }
            }
            return e + "?" + c.join("&")
        },
        probe: function() {
            var c = document.getElementsByName("xn_share");
            for (var b = 0; b < c.length; b++) {
                var a = c[b];
                if (!a.rendered) {
                    XN.Share.Button.renderButton(a)
                }
            }
            if (XN.Share.Counter.urls.length > 0) {
                XN.Share.Counter.fetchData()
            }
        },
        stopProbe: function() {
            clearInterval(XN.Share.prober);
            XN.Share.probe()
        }
    },
    XN.Share.Button = {
        getType: function(a) {
            return a.getAttribute("type") || "button_count"
        },
        getUrl: function(a) {
            if ("#" == a.getAttribute("href")) {
                return window.location.href
            } else {
                return a.href
            }
        },
        renderButton: function(c) {
            var a = this.getUrl(c)
              , g = this.getType(c).split("_")
              , k = c.innerHTML.length > 0 ? c.innerHTML : "\u5206\u4eab\u5230\u4eba\u4eba"
              , h = g[1] && g[1] == "count"
              , m = g[h ? 3 : 1] || "small"
              , j = g[2] || "right"
              , b = g[0] == "icon" ? "icon" : "button";
            var d = '<span class="xn_share_wrapper xn_share_' + j + '"><span class="xn_share_' + m + '">'
              , e = '<span class="xn_share_' + b + '">';
            if (b == "button") {
                e += '<span class="xn_share_button_head"></span>'
            }
            e += '<span class="xn_share_label">' + k + "</span>";
            if (b == "button") {
                e += '<span class="xn_share_button_end"></span>'
            }
            e += "</span>";
            if (h) {
                var l = '<span class="xn_share_count_nub xn_share_no_count"></span>';
                var f = '<span class="xn_share_counter xn_share_no_count"></span>';
                if (j == "right" || j == "bottom") {
                    d += e + l + f
                } else {
                    d += f + l + e
                }
            } else {
                d += e
            }
            c.innerHTML = d + "</span></span>";
            c.href = XN.Share.addQS(connect_url + "/share/sharer", {
                url: a,
                title: a == window.location.href ? document.title : null 
            });
            c.onclick = function() {
                if (!this.xn_clicked) {
                    this.xn_count += 1;
                    XN.Share.Button.renderCounter(this);
                    this.xn_clicked = true
                }
                window.open(this.href, "sharer", "toolbar=0,status=0,width=550,height=400,left=" + (screen.width - 550) / 2 + ",top=" + (screen.height - 500) / 2);
                return false
            }
            ,
            c.style.textDecoration = "none";
            if (this.getType(c).indexOf("count") >= 0) {
                c.renderCounter = this.renderCounter;
                var i = XN.Share.Counter.counters[a];
                if (i == undefined || i.c == undefined) {
                    XN.Share.Counter.addCounter(a, c)
                } else {
                    if (i.c != undefined) {
                        c.xn_count = i.c;
                        if (c.renderCounter) {
                            c.renderCounter(c)
                        }
                    }
                }
            }
            c.rendered = true
        },
        renderCounter: function(c) {
            if (typeof (c.xn_count) == "number" && !isNaN(c.xn_count) && c.xn_count > 0) {
                for (var b = 0, a = c.firstChild.firstChild.childNodes.length; b < a; b++) {
                    var d = c.firstChild.firstChild.childNodes[b];
                    d.className = d.className.replace("xn_share_no_count", "");
                    if (d.className.indexOf("xn_share_counter") >= 0) {
                        d.innerHTML = XN.Share.Counter.pretty(c.xn_count)
                    }
                }
            }
        }
    },
    XN.Share.Counter = {
        counters: {},
        urls: [],
        fetchData: function() {
            var a = document.createElement("script");
            a.src = XN.Share.addQS(connect_url + "/share/linksCounter", {
                urls: this.urls.join(","),
                format: "json",
                callback: "XN.Share.Counter.onFetchData"
            });
            console.log(a);
            XN.Share.insertDom(a);
            this.urls.length = 0
        },
        pretty: function(a) {
            return a >= 10000000 ? Math.round(a / 1000000) + "M" : (a >= 10000 ? Math.round(a / 1000) + "K" : a)
        },
        addCounter: function(a, b) {
            if (this.counters[a] == undefined) {
                this.counters[a] = {
                    cts: []
                }
            }
            this.counters[a].cts.push(b);
            this.urls.push(a)
        },
        onFetchData: function(e) {
            for (var d = 0; e && d < e.length; d++) {
                var f = e[d].share_count
                  , a = this.counters[e[d].url].cts;
                this.counters[e[d].url].c = f;
                for (var b = 0; b < a.length; b++) {
                    a[b].xn_count = f;
                    if (a[b].renderCounter) {
                        a[b].renderCounter(a[b])
                    }
                }
            }
        }
    };
    XN.Share.init()
}
;