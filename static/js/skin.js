var $jscomp = {
    scope: {}, findInternal: function (a, k, e) {
        a instanceof String && (a = String(a));
        for (var g = a.length, h = 0; h < g; h++) {
            var m = a[h];
            if (k.call(e, m, h, a)) return {i: h, v: m}
        }
        return {i: -1, v: void 0}
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, k, e) {
    if (e.get || e.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[k] = e.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, k, e, g) {
    if (k) {
        e = $jscomp.global;
        a = a.split(".");
        for (g = 0; g < a.length - 1; g++) {
            var h = a[g];
            h in e || (e[h] = {});
            e = e[h]
        }
        a = a[a.length - 1];
        g = e[a];
        k = k(g);
        k != g && null != k && $jscomp.defineProperty(e, a, {configurable: !0, writable: !0, value: k})
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, e) {
        return $jscomp.findInternal(this, a, e).v
    }
}, "es6-impl", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.arrayIterator = function (a) {
    var k = 0;
    return $jscomp.iteratorPrototype(function () {
        return k < a.length ? {done: !1, value: a[k++]} : {done: !0}
    })
};
$jscomp.iteratorPrototype = function (a) {
    $jscomp.initSymbolIterator();
    a = {next: a};
    a[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return a
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function (a, k) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var e = 0, g = {
        next: function () {
            if (e < a.length) {
                var h = e++;
                return {value: k(h, a[h]), done: !1}
            }
            g.next = function () {
                return {done: !0, value: void 0}
            };
            return g.next()
        }
    };
    g[Symbol.iterator] = function () {
        return g
    };
    return g
};
$jscomp.polyfill("Array.prototype.keys", function (a) {
    return a ? a : function () {
        return $jscomp.iteratorFromArray(this, function (a) {
            return a
        })
    }
}, "es6-impl", "es3");
(function (a) {
    var k = 0, e = !1;
    "touchmove" in document.createElement("div") && (e = !0);
    a(document).ready(function () {
        y();
        z();
        if ("undefined" === typeof LocalConst.IS_MOBILE) return !1;
        888 > window.innerWidth && (new Headroom(document.querySelector("#toggle-nav"), {
            tolerance: 5,
            offset: 5,
            classes: {initial: "show", pinned: "show", unpinned: "hide"}
        })).init();
        A();
        n();
        a(window).bind("scroll", function (b) {
            b = a("#wrap");
            b.find("#nav").width() < k && (LocalConst.IS_MOBILE && e || !LocalConst.IS_MOBILE) && (a("#wrap.display-nav").find("#body").unbind("click"),
                b.removeClass("display-nav"), a("body").removeClass("display-nav"), a("#nav-toolbar").find(".side-toolbar").removeClass("show-read-settings"), a("#footer").removeClass("display-nav"));
            p()
        });
        a(window).bind("mousemove", function (a) {
            k = a.clientX
        });
        a(".slide-toggle").click(function (b) {
            a(".category-list").each(function () {
                a(this).toggleClass("hide")
            })
        });
        t();
        B();
        C();
        D();
        a(".blog-notice>a.blog-notice-close").click(function (b) {
            a(this).parent().remove()
        });
        LocalConst.COMMENT_SYSTEM === LocalConst.COMMENT_SYSTEM_EMBED &&
        u();
        v()
    });
    window.onload = function () {
        w(200)
    };
    // console.log("\n %c Mirages " + LocalConst.THEME_VERSION + " %c https://get233.com/archives/mirages-intro.html \n\n", "color: #fff; background-image: linear-gradient(90deg, rgb(47, 172, 178) 0%, rgb(45, 190, 96) 100%); padding:5px 1px;", "background-image: linear-gradient(90deg, rgb(45, 190, 96) 0%, rgb(255, 255, 255) 100%); padding:5px 0;");
    var g = {}, h = [], m = 1, z = function () {
            var b = a("span#backtop"), c = a("body");
            b.click(function () {
                a("html, body").animate({scrollTop: 0},
                    600)
            });
            100 < a(window).scrollTop() && c.addClass("show-back-to-top");
            a(window).scroll(function () {
                100 < a(window).scrollTop() ? c.addClass("show-back-to-top") : c.removeClass("show-back-to-top")
            })
        }, F = function (a, c) {
            var b = document.body, f = document.documentElement, x = function () {
                return Math.max(b.scrollHeight, b.offsetHeight, f.clientHeight, f.scrollHeight, f.offsetHeight)
            }, g = x(), e;
            (function E() {
                e = x();
                g !== e && c();
                g = e;
                b.onElementHeightChangeTimer && clearTimeout(b.onElementHeightChangeTimer);
                b.onElementHeightChangeTimer =
                    setTimeout(E, a)
            })()
        }, y = function () {
            a("#feedback").click(function () {
                a("html, body").animate({scrollTop: a("#comments").offset().top})
            })
        }, A = function () {
            a("#toggle-nav").off("click").on("click", function (b) {
                var c = a("#wrap"), d = a("body");
                c.removeClass("scale-up").toggleClass("display-nav");
                d.toggleClass("display-nav");
                var f = a("#nav-toolbar").find(".side-toolbar");
                f.removeClass("show-read-settings");
                LocalConst.TOC_AT_LEFT ? c.toggleClass("hide-menu-tree") : (c.removeClass("display-menu-tree"), d.removeClass("display-menu-tree"));
                a("#footer").toggleClass("display-nav");
                a("#toggle-nav").removeClass("hide");
                setTimeout(function () {
                    var b = a("#body");
                    b.off("click").on("click", function (g) {
                        b.off("click");
                        c.removeClass("display-nav").removeClass("hide-menu-tree");
                        d.removeClass("display-nav");
                        LocalConst.TOC_AT_LEFT || (a("#wrap").removeClass("display-menu-tree"), d.removeClass("display-menu-tree"));
                        f.removeClass("show-read-settings");
                        a("#footer").removeClass("display-nav");
                        g.preventDefault()
                    });
                    b.off("touchmove").on("touchmove", function (g) {
                        b.off("click");
                        c.removeClass("display-nav").removeClass("hide-menu-tree");
                        d.removeClass("display-nav");
                        LocalConst.TOC_AT_LEFT || (a("#wrap").removeClass("display-menu-tree"), d.removeClass("display-menu-tree"));
                        f.removeClass("show-read-settings");
                        a("#footer").removeClass("display-nav")
                    })
                }, 500)
            })
        }, v = function () {
            if (LocalConst.ENABLE_PJAX) a("#comment-form").off("submit").on("submit", function (b) {
                var c = a(this), d = c.find("#submit"), f = c.parents(".respond").parent(), g = c.find("#author").val();
                b = c.find("#url").val();
                var e = c.find("#textarea").val();
                if (null === e || "" === a.trim(e)) return alert(d.attr("data-empty-comment")), !1;
                0 === c.find("#author").length && 0 === c.find("#url").length && (g = a('a[href$="profile.php"]').text(), b = document.location.origin);
                d.attr("disabled", "disabled").val(d.attr("data-posting"));
                var h = "newComment-" + m;
                m++;
                b = '<li itemscope="" itemtype="http://schema.org/UserComments" id="' + h + '" class="comment-body"><div class="comment-author" itemprop="creator" itemscope="" itemtype="http://schema.org/Person"><span itemprop="image"><img class="avatar" src="https://secure.gravatar.com/avatar/8d0cad9fd3e982f30620bc96ec639cfb?s=100&amp;r=PG&amp;d=" alt="' +
                    g + '" width="100" height="100"></span><cite class="fn color-main" itemprop="name"><a href="' + b + '" rel="external nofollow" target="_blank">' + g + '</a></cite></div><div class="comment-meta"><a href="javascript:void(0)"><time itemprop="commentTime" datetime="' + d.attr("data-now") + '">' + d.attr("data-now") + '</time></a><span id="' + h + '-status" class="comment-posting">' + d.attr("data-posting") + '</span></div><div class="comment-content" itemprop="commentText"><p>' + q(e) + "</p></div></li>";
                var k = e = !1, l = "DESC" === LocalConst.COMMENTS_ORDER;
                f.is("div") && "comments" === f.attr("id") ? (0 < f.children(".comment-list").length ? l ? f.children(".comment-list").first().prepend(b) : f.children(".comment-list").first().append(b) : (f.append('<div class="comment-separator"><div class="comment-tab-current"><span class="comment-num">\u5df2\u6709 1 \u6761\u8bc4\u8bba</span></div></div>'), f.append('<ol class="comment-list">' + b + "</ol>"), k = !0), e = !0) : f.is("li") && f.hasClass("comment-body") && (f.parent().parent().is("div") && "comments" === f.parent().parent().attr("id") ?
                    0 < f.children(".comment-children").first().children(".comment-list").length ? f.children(".comment-children").first().children(".comment-list").first().append(b) : f.append('<div class="comment-children" itemprop="discusses"><ol class="comment-list">' + b + "</ol></div>") : f.parents(".comment-list").first().append(b), e = !0);
                if (e) {
                    try {
                        var n = a("#" + h).offset();
                        "undefined" !== typeof n && a("html, body").animate({scrollTop: n.top - 50}, 300)
                    } catch (r) {
                        console.error(r)
                    }
                    var p = function () {
                        try {
                            k ? (f.children(".comment-separator").first().remove(),
                                f.children(".comment-list").first().remove()) : a("#" + h).remove();
                            var b = a("#comment-form").offset();
                            "undefined" !== typeof b && a("html, body").animate({scrollTop: b.top - 100}, 300)
                        } catch (G) {
                            console.error(G)
                        }
                    };
                    try {
                        a.ajax({
                            url: c.attr("action"), type: c.attr("method"), data: c.serializeArray(), success: function (b) {
                                if ("undefined" === typeof b) return window.location.reload(), !1;
                                if (0 < b.indexOf("<title>Error</title>")) {
                                    var f = a("<div></div>");
                                    f.html(b);
                                    alert(a.trim(a(".container", f).text()));
                                    p()
                                } else if (c.find("#textarea").val(""),
                                "undefined" !== typeof TypechoComment && TypechoComment.cancelReply(), f = b.match(/id="comment-\d+"/g), null === f || 0 === f.length) window.location.reload(); else {
                                    var f = f.join().match(/\d+/g).sort(function (a, b) {
                                        return a - b
                                    }).pop(), e = a("<div></div>");
                                    e.html(b);
                                    b = a("#comment-" + f, e);
                                    a.trim(b.children(".comment-author").find("cite.fn a").text()) === a.trim(g) ? (b.children(".comment-meta").append('<span id="comment-' + f + '-status" class="comment-posted">' + d.attr("data-posted") + "</span>"), f = b.children(".comment-content"),
                                        f.html(q(f.html())), a("#" + h).replaceWith(b)) : a("#" + h + "-status").text(d.attr("data-posted")).removeClass("comment-posting").addClass("comment-posted")
                                }
                                d.removeAttr("disabled").val(d.attr("data-init"))
                            }, error: function (a) {
                                console.error(a);
                                p();
                                d.removeAttr("disabled").val(d.attr("data-init"))
                            }
                        })
                    } catch (r) {
                        console.error(r)
                    }
                }
                return !1
            })
        }, n = function () {
            if (LocalConst.SHOW_TOC) {
                888 > window.innerWidth && (new Headroom(document.querySelector("#toggle-menu-tree"), {
                    tolerance: 5, offset: 5, classes: {
                        initial: "show", pinned: "show",
                        unpinned: "hide"
                    }
                })).init();
                document.body.onElementHeightChangeTimer && clearTimeout(document.body.onElementHeightChangeTimer);
                F(700, function () {
                    H()
                });
                a("div.post-content>h1, div.post-content>h2, div.post-content>h3, div.post-content>h4, div.post-content>h5, div.post-content>h6").each(function () {
                    a(this).append('<span class="toc">\u5c55\u5f00\u76ee\u5f55</span>');
                    a(this).find("span.toc").click(function (c) {
                        0 < a(this).css("opacity") && b(c)
                    })
                });
                var b = function (b) {
                    a("#wrap").removeClass("scale-up").removeClass("display-nav").toggleClass("display-menu-tree");
                    a("body").removeClass("display-nav").toggleClass("display-menu-tree");
                    a(this).removeClass("hide");
                    p();
                    if (1E3 > window.innerWidth) {
                        var c = a("#post");
                        c.off("click").on("click", function (b) {
                            c.off("click");
                            a("#wrap").removeClass("display-menu-tree").removeClass("display-nav");
                            a("body").removeClass("display-menu-tree").removeClass("display-nav");
                            b.preventDefault()
                        });
                        c.off("touchmove").on("touchmove", function (b) {
                            c.off("click");
                            a("#wrap").removeClass("display-menu-tree").removeClass("display-nav");
                            a("body").removeClass("display-menu-tree").removeClass("display-nav")
                        })
                    }
                };
                a("#toggle-menu-tree").click(function (a) {
                    b(a)
                });
                g = {};
                a('a.index-menu-link[href^="#menu_index_"]').each(function () {
                    var b = a(this).attr("href");
                    b.match(/menu_index_\d+/) && (a(this).click(function () {
                        Page.scrollPageTo(b.substring(1), !0);
                        1E3 > window.innerWidth && (a("#wrap").removeClass("display-menu-tree").removeClass("display-nav"), a("body").removeClass("display-menu-tree").removeClass("display-nav"))
                    }), g[parseInt(a(b).offset().top)] = b)
                });
                h = Object.keys(g);
                h = h.sort(function (a, b) {
                    return a - b
                });
                a(".index-menu>.index-menu-list>li.index-menu-item").each(function (b) {
                    a(this).find(".index-menu-list").hide()
                })
            }
        },
        H = function () {
            LocalConst.SHOW_TOC && (g = {}, a('a.index-menu-link[href^="#menu_index_"]').each(function () {
                var b = a(this).attr("href");
                b.match(/menu_index_\d+/) && (g[parseInt(a(b).offset().top)] = b)
            }), h = Object.keys(g), h = h.sort(function (a, c) {
                return a - c
            }))
        }, p = function () {
            if (LocalConst.SHOW_TOC) {
                var b = a(window).scrollTop() + 100;
                20 < b && a("#toggle-menu-tree").removeClass("revert");
                if (a("#wrap").hasClass("display-menu-tree")) {
                    for (var c = 0, d = 0; d < h.length; d++) {
                        var f = h[d];
                        if (f <= b) c = g[f]; else break
                    }
                    b = a('.index-menu-item>a.index-menu-link[href="' +
                        c + '"]').first();
                    c = b.parent().parent().parent();
                    c.hasClass("index-menu") ? (c = b.parent(), c.prev().find(".index-menu-list").hide(), c.next().find(".index-menu-list").hide(), c.find(".index-menu-list").show()) : (c.prev().find(".index-menu-list").hide(), c.next().find(".index-menu-list").hide(), c.find(".index-menu-list").show(), b.parent().find(".index-menu-list").show());
                    a('a.index-menu-link[href^="#menu_index_"]').each(function () {
                        a(this).attr("href").match(/menu_index_\d+/) && a(this).parent().removeClass("current")
                    });
                    b.parent().addClass("current")
                }
            }
        }, q = function (a) {
            var b, d = "";
            for (void 0 !== window.devicePixelRatio && 1.49 <= window.devicePixelRatio && (d = "_2x"); b = a.match(/@\(\s*(\u5475\u5475|\u54c8\u54c8|\u5410\u820c|\u592a\u5f00\u5fc3|\u7b11\u773c|\u82b1\u5fc3|\u5c0f\u4e56|\u4e56|\u6342\u5634\u7b11|\u6ed1\u7a3d|\u4f60\u61c2\u7684|\u4e0d\u9ad8\u5174|\u6012|\u6c57|\u9ed1\u7ebf|\u6cea|\u771f\u68d2|\u55b7|\u60ca\u54ed|\u9634\u9669|\u9119\u89c6|\u9177|\u554a|\u72c2\u6c57|what|\u7591\u95ee|\u9178\u723d|\u5440\u54a9\u7239|\u59d4\u5c48|\u60ca\u8bb6|\u7761\u89c9|\u7b11\u5c3f|\u6316\u9f3b|\u5410|\u7280\u5229|\u5c0f\u7ea2\u8138|\u61d2\u5f97\u7406|\u52c9\u5f3a|\u7231\u5fc3|\u5fc3\u788e|\u73ab\u7470|\u793c\u7269|\u5f69\u8679|\u592a\u9633|\u661f\u661f\u6708\u4eae|\u94b1\u5e01|\u8336\u676f|\u86cb\u7cd5|\u5927\u62c7\u6307|\u80dc\u5229|haha|OK|\u6c99\u53d1|\u624b\u7eb8|\u9999\u8549|\u4fbf\u4fbf|\u836f\u4e38|\u7ea2\u9886\u5dfe|\u8721\u70db|\u97f3\u4e50|\u706f\u6ce1|\u5f00\u5fc3|\u94b1|\u54a6|\u547c|\u51b7|\u751f\u6c14|\u5f31|\u5410\u8840)\s*\)/);) a =
                a.replace(b[0], '<img src="' + LocalConst.BIAOQING_PAOPAO_PATH + encodeURI(b[1]).replace(/%/g, "") + d + '.png" class="biaoqing newpaopao" height=30 width=30 no-zoom />');
            for (; b = a.match(/#\(\s*(\u9ad8\u5174|\u5c0f\u6012|\u8138\u7ea2|\u5185\u4f24|\u88c5\u5927\u6b3e|\u8d5e\u4e00\u4e2a|\u5bb3\u7f9e|\u6c57|\u5410\u8840\u5012\u5730|\u6df1\u601d|\u4e0d\u9ad8\u5174|\u65e0\u8bed|\u4eb2\u4eb2|\u53e3\u6c34|\u5c34\u5c2c|\u4e2d\u6307|\u60f3\u4e00\u60f3|\u54ed\u6ce3|\u4fbf\u4fbf|\u732e\u82b1|\u76b1\u7709|\u50bb\u7b11|\u72c2\u6c57|\u5410|\u55b7\u6c34|\u770b\u4e0d\u89c1|\u9f13\u638c|\u9634\u6697|\u957f\u8349|\u732e\u9ec4\u74dc|\u90aa\u6076|\u671f\u5f85|\u5f97\u610f|\u5410\u820c|\u55b7\u8840|\u65e0\u6240\u8c13|\u89c2\u5bdf|\u6697\u5730\u89c2\u5bdf|\u80bf\u5305|\u4e2d\u67aa|\u5927\u56e7|\u5472\u7259|\u62a0\u9f3b|\u4e0d\u8bf4\u8bdd|\u54bd\u6c14|\u6b22\u547c|\u9501\u7709|\u8721\u70db|\u5750\u7b49|\u51fb\u638c|\u60ca\u559c|\u559c\u6781\u800c\u6ce3|\u62bd\u70df|\u4e0d\u51fa\u6240\u6599|\u6124\u6012|\u65e0\u5948|\u9ed1\u7ebf|\u6295\u964d|\u770b\u70ed\u95f9|\u6247\u8033\u5149|\u5c0f\u773c\u775b|\u4e2d\u5200)\s*\)/);) a =
                a.replace(b[0], '<img src="' + LocalConst.BIAOQING_ARU_PATH + encodeURI(b[1]).replace(/%/g, "") + d + '.png" class="biaoqing alu" height=33 width=33 no-zoom />');
            "function" === typeof customRenderSmiles && (a = customRenderSmiles(a));
            return a
        }, u = function () {
            a("#comments").find(".comment-content>p").each(function (b, c) {
                a(c).html(q(a(c).html()))
            });
            var b = document.getElementsByClassName("OwO")[0], c = document.getElementById("textarea");
            void 0 !== b && void 0 !== c && new OwO({
                logo: "^_^", container: b, target: c, api: LocalConst.BASE_SCRIPT_URL +
                "js/OwO.json", position: "down", style: "max-width: 100%;", maxHeight: "250px"
            })
        }, l = function (a, c, d) {
            var b = new Date;
            b.setDate(b.getDate() + d);
            document.cookie = a + "=" + encodeURIComponent(c) + (null === d ? "" : ";expires=" + b.toGMTString()) + ";path=/"
        }, t = function () {
            a("#side-toolbar-read-settings").off("click").on("click", function (b) {
                b = a("#nav-toolbar").find(".side-toolbar");
                b.hasClass("show-read-settings") ? (a(this).parent().removeClass("selected"), b.removeClass("show-read-settings")) : (a(this).parent().addClass("selected"),
                    b.addClass("show-read-settings"))
            });
            a("#page-read-setting-toggle").off("click").on("click", function (b) {
                a("#toggle-nav").trigger("click");
                b = a("#nav-toolbar").find(".side-toolbar");
                a("#side-toolbar-read-settings").parent().addClass("selected");
                b.addClass("show-read-settings")
            })
        }, B = function () {
            a("a.background-color-control").off("click").on("click", function (b) {
                a("a.background-color-control").removeClass("selected");
                a(this).addClass("selected");
                b = a(this).attr("data-mode");
                if ("auto" === b) {
                    b = a("body");
                    var c =
                        a("#side-toolbar-night-shift");
                    b.removeClass("theme-dark").addClass(LocalConst.LIGHT_THEME_CLASS);
                    var d = (new Date).getHours();
                    5 >= d || 22 <= d ? (b.removeClass("theme-white").removeClass("theme-sunset").addClass("theme-dark"), c.addClass("night")) : b.removeClass("theme-dark").removeClass("theme-sunset").addClass(LocalConst.LIGHT_THEME_CLASS);
                    l("MIRAGES_NIGHT_SHIFT_MODE", "AUTO")
                } else "white" === b ? (a("body").removeClass("theme-dark").removeClass("theme-sunset").addClass(LocalConst.LIGHT_THEME_CLASS), l("MIRAGES_NIGHT_SHIFT_MODE",
                    "DAY")) : "sunset" === b ? (a("body").removeClass("theme-dark").addClass(LocalConst.LIGHT_THEME_CLASS).addClass("theme-sunset"), l("MIRAGES_NIGHT_SHIFT_MODE", "SUNSET")) : "dark" === b && (a("body").removeClass("theme-white").removeClass("theme-sunset").addClass("theme-dark"), l("MIRAGES_NIGHT_SHIFT_MODE", "NIGHT"))
            })
        }, C = function () {
            a("button.font-family-control").off("click").on("click", function (b) {
                b = a(this).attr("data-mode");
                "serif" === b ? Page.switchToSerifFonts() : "sans-serif" === b && Page.switchToSansSerifFonts()
            })
        },
        w = function (b) {
            setTimeout(function () {
                a(".sp-progress").css("opacity", "0")
            }, b || 0)
        }, D = function () {
            var b = a("#font-size-display"), c = function (c) {
                var d = parseInt(a("#font-size-display").text()), d = d + c;
                80 > d || 200 < d || (a("html").css("font-size", d + "%"), b.text(d + "%"), l("MIRAGES_ROOT_FONT_SIZE", d))
            };
            (function () {
                var a = parseInt(LocalConst.ROOT_FONT_SIZE);
                b.text(a + "%")
            })();
            a(".font-size-control").off("click").on("click", function (b) {
                b = a(this).attr("data-mode");
                "smaller" === b ? c(-5) : "larger" === b && c(5)
            })
        }, I = function () {
            var b =
                new Date;
            window.asyncBannerLoadNum = 0;
            window.asyncBannerLoadCompleteNum = 0;
            window.asyncImageLoadNum = 0;
            window.asyncImageLoadCompleteNum = 0;
            var c = function (a) {
                Mlog(a.type.toUpperCase());
                if (window.asyncBannerLoadNum === window.asyncBannerLoadCompleteNum && window.asyncImageLoadNum === window.asyncImageLoadCompleteNum && window.asyncBannerLoadNum === window.asyncImageLoadNum && -1170 === window.asyncImageLoadNum) {
                    var c = new Date - b;
                    Mlog("All Done[" + c + "ms][" + a.type.toUpperCase() + "]");
                    w(1170 > c ? 1170 - c : 0)
                }
            };
            a("body").off("ajax-image:done").on("ajax-image:done",
                c).off("ajax-banner:done").on("ajax-banner:done", c)
        };
    window.Page = {
        setupLazyLoadImage: function () {
            a("section.lazy-load").each(function () {
                0 <= window.asyncImageLoadNum && (window.asyncImageLoadNum++, Mlog("Loading..." + window.asyncImageLoadNum));
                var b = a(this), c = b.find(".progressiveMedia"), d = c.find(".img-small"),
                    f = b.attr("data-" + LocalConst.KEY_CDN_TYPE), f = getImageAddon(f), e = new Image;
                e.src = d.attr("data-src") + f;
                e.classList.add("img-large");
                a(e).attr("no-zoom", !0);
                e.onload = function () {
                    c.addClass("large-image-loaded");
                    setTimeout(function () {
                            a(e).addClass("loaded").attr("data-action", "zoom").removeAttr("no-zoom").removeAttr("width").removeAttr("height").css("height", "").attr("data-shadow", b.attr("data-shadow"));
                            b.replaceWith(a(e));
                            0 <= window.asyncImageLoadCompleteNum && (window.asyncImageLoadCompleteNum++, Mlog("Loaded: " + window.asyncImageLoadCompleteNum), window.asyncImageLoadCompleteNum === window.asyncImageLoadNum && (window.asyncImageLoadNum = -1170, window.asyncImageLoadCompleteNum = -1170, a("body").trigger("ajax-image:done")))
                        },
                        1001)
                };
                c.append(e)
            });
            isNaN(window.asyncImageLoadNum) || 0 !== window.asyncImageLoadNum || (Mlog("Async Image Nothing to Load"), window.asyncImageLoadNum = -1170, window.asyncImageLoadCompleteNum = -1170, a("body").trigger("ajax-image:done"))
        }, setupCDNImageOptimize: function () {
            a("article img:not(code img, pre img, .lazy-load img)").each(function () {
                var b = a(this).attr("data-src"), c = a(this).attr("data-" + LocalConst.KEY_CDN_TYPE),
                    c = getImageAddon(c);
                null !== b && void 0 !== b && "" !== b && (a(this).attr("src", b + c), a(this).removeAttr("data-src"))
            })
        },
        loadDisqus: function () {
            if (a("#disqus_thread").length) if (window.DISQUS) DISQUS.reset({reload: !0}); else {
                var b = document.createElement("script");
                b.type = "text/javascript";
                b.async = !0;
                b.src = "//" + LocalConst.DISQUS_SHORT_NAME + ".disqus.com/embed.js";
                (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(b)
            }
        }, scrollPageTo: function (b, c) {
            b = isNaN(b) ? a("#" + b).offset().top : b;
            var d = void 0 !== c && !0 === c ? 600 : 0;
            a("body,html").animate({scrollTop: b}, d);
            return !1
        }, autoScrollPage: function () {
            var a =
                location.hash.indexOf("#");
            0 > a || (a = window.location.hash.substring(a + 1), this.scrollPageTo(a))
        }, setupContents: function () {
            a("article img:not(article .link-box img, img[no-zoom])").each(function () {
                a(this).attr("data-action", "zoom");
                a(this).next().is("br") && a(this).next().remove()
            });
            a(".post-content a:not(code a, pre a), #content a:not(code a, pre a), #comments a").each(function () {
                var b = a(this).attr("href");
                b.startWith("http") && !b.startWith(location.origin) && a(this).attr("target", "_blank")
            });
            a(".post-content p.more a").each(function () {
                a(this).removeAttr("target")
            });
            a("li.task-list-item").each(function () {
                var b = a(this).parent();
                b.hasClass("task-list") || b.addClass("task-list")
            });
            a(".post-content table").wrap("<div class='table-responsive'></div>");
            a(".post-content embed.video-4-3, .post-content embed.video").wrap("<div class='video-container video-4-3'></div>");
            a(".post-content embed.video-16-9").wrap("<div class='video-container video-16-9'></div>")
        }, highlightCodeBlock: function () {
            LocalConst.ENABLE_FLOW_CHART && a("pre>code.lang-flow").each(function (b) {
                a(this).addClass("nohighlight").attr("data-flow-chart-index",
                    b).parent().addClass("display-none").after('<div id="flow-chart-' + b + '" class="flow-chart"></div>')
            });
            a("pre code").each(function (a, c) {
                hljs.highlightBlock(c)
            })
        }, renderFlowChart: function () {
            a("pre>code.lang-flow").each(function () {
                var b = a(this).attr("data-flow-chart-index"), c = this.innerText;
                if ("undefined" !== typeof c) {
                    var d = 2;
                    void 0 !== window.devicePixelRatio && 1.49 <= window.devicePixelRatio && (d = 1.5);
                    c = flowchart.parse(c);
                    d = {
                        x: 0,
                        y: 0,
                        "line-width": d,
                        "text-margin": 15,
                        "font-size": 13,
                        font: "normal",
                        "font-family": 'Consolas, Menlo, Monaco, "lucida console", "Liberation Mono", "Courier New", "andale mono", monospaceX, sans-serif',
                        "font-weight": "normal",
                        fill: "none",
                        "yes-text": "yes",
                        "no-text": "no",
                        "arrow-end": "block",
                        scale: 1
                    };
                    a(body).hasClass("theme-dark") && (d["line-color"] = "white", d["element-color"] = "white", d["font-color"] = "white");
                    c.drawSVG("flow-chart-" + b, d)
                }
                a(this).parent().remove()
            })
        }, resetStatus: function () {
            a("#wrap").removeClass("display-nav").removeClass("display-menu-tree");
            a("#footer").removeClass("display-nav");
            a("#body").off("click");
            a("body").removeClass("show-reward-qr-box").removeClass("show-post-qr-box").removeClass("display-nav").removeClass("display-menu-tree");
            document.body.onElementHeightChangeTimer && clearTimeout(document.body.onElementHeightChangeTimer)
        }, bindQRCodeBlockEvents: function () {
            a("#toggle-post-qr-code").off("click").on("click", function (b) {
                a("body").removeClass("show-reward-qr-box").toggleClass("show-post-qr-box")
            });
            a("#toggle-reward-qr-code").off("click").on("click", function (b) {
                a("body").removeClass("show-post-qr-box").toggleClass("show-reward-qr-box")
            })
        }, reInitAPlayer: function () {
            if ("undefined" !== typeof APlayerOptions && "undefined" !== typeof APlayers) for (var a =
                APlayerOptions.length, c = 0; c < a; c++) APlayers[c] = new APlayer({
                element: document.getElementById("player" + APlayerOptions[c].id),
                narrow: !1,
                preload: APlayerOptions[c].preload,
                mutex: APlayerOptions[c].mutex,
                autoplay: APlayerOptions[c].autoplay,
                showlrc: APlayerOptions[c].showlrc,
                music: APlayerOptions[c].music,
                theme: APlayerOptions[c].theme
            }), APlayers[c].init()
        }, reInitDPlayer: function () {
            if ("undefined" !== typeof dPlayerOptions && "undefined" !== typeof dPlayers) for (var a = dPlayerOptions.length, c = 0; c < a; c++) {
                var d = document.getElementById("player" +
                    dPlayerOptions[c].id);
                "undefined" !== typeof d && null !== d && (dPlayers[c] = new DPlayer({
                    element: d,
                    autoplay: dPlayerOptions[c].autoplay,
                    video: dPlayerOptions[c].video,
                    theme: dPlayerOptions[c].theme,
                    danmaku: dPlayerOptions[c].danmaku
                }))
            }
        }, switchToSerifFonts: function () {
            l("MIRAGES_USE_SERIF_FONTS", "1");
            "undefined" === typeof Typekit && Page.loadTypeKitService();
            a("body").addClass("serif-fonts");
            a(".font-family-control").removeClass("selected");
            a(".font-family-control.control-btn-serif").addClass("selected");
            alert(LocalConst.SERIF_LOAD_NOTICE)
        },
        switchToSansSerifFonts: function () {
            l("MIRAGES_USE_SERIF_FONTS", "");
            a("body").removeClass("serif-fonts");
            a(".font-family-control").removeClass("selected");
            a(".font-family-control.control-btn-sans-serif").addClass("selected")
        }, loadTypeKitService: function () {
            (function (a) {
                var b = LocalConst.TYPEKIT_CONFIG, d = a.documentElement, f = setTimeout(function () {
                    d.className = d.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"
                }, b.scriptTimeout), e = a.createElement("script"), g = !1;
                a = a.getElementsByTagName("script")[0];
                var h;
                d.className += " wf-loading";
                e.src = "https://use.typekit.net/" + b.kitId + ".js";
                e.async = !0;
                e.onload = e.onreadystatechange = function () {
                    h = this.readyState;
                    if (!(g || h && "complete" != h && "loaded" != h)) {
                        g = !0;
                        clearTimeout(f);
                        try {
                            Typekit.load(b)
                        } catch (J) {
                        }
                    }
                };
                a.parentNode.insertBefore(e, a)
            })(document)
        }, showReadSettings: function (a) {
            l("SHOW_READ_SETTINGS", a)
        }, doPJAXClickAction: function () {
            I();
            a("body").attr("data-prev-href", document.location.pathname + document.location.search + document.location.hash).removeClass("display-menu-tree");
            a("#wrap").removeClass("display-menu-tree");
            LocalConst.PJAX_LOAD_STYLE === LocalConst.PJAX_LOAD_STYLE_SIMPLE && a(".sp-progress").css("opacity", "1")
        }, doPJAXSendAction: function () {
            LocalConst.PJAX_LOAD_STYLE !== LocalConst.PJAX_LOAD_STYLE_SIMPLE && LocalConst.PJAX_LOAD_STYLE === LocalConst.PJAX_LOAD_STYLE_CIRCLE && a("#loader-wrapper").addClass("in");
            Page.resetStatus()
        }, doPJAXCompleteAction: function () {
            LocalConst.PJAX_LOAD_STYLE !== LocalConst.PJAX_LOAD_STYLE_SIMPLE && LocalConst.PJAX_LOAD_STYLE === LocalConst.PJAX_LOAD_STYLE_CIRCLE &&
            a("#loader-wrapper").removeClass("in");
            t();
            var b = a("body"), c = b.attr("data-prev-href"),
                d = document.location.pathname + document.location.search + document.location.hash;
            _czc.push(["_trackPageview", d, c]);
            _hmt.push(["_trackPageview", d]);
            pangu.spacingElementById("body");
            isNaN(window.asyncBannerLoadNum) || 0 !== window.asyncBannerLoadNum || (Mlog("Async Banner Nothing to Load"), window.asyncBannerLoadNum = -1170, window.asyncBannerLoadCompleteNum = -1170, b.trigger("ajax-banner:done"));
            this.setupLazyLoadImage();
            this.setupCDNImageOptimize();
            this.setupContents();
            this.highlightCodeBlock();
            this.bindQRCodeBlockEvents();
            this.autoScrollPage();
            n();
            this.renderFlowChart();
            this.reInitAPlayer();
            this.reInitDPlayer();
            LocalConst.COMMENT_SYSTEM === LocalConst.COMMENT_SYSTEM_DISQUS ? this.loadDisqus() : LocalConst.COMMENT_SYSTEM === LocalConst.COMMENT_SYSTEM_EMBED && (v(), u())
        }
    };
    String.prototype.startWith = function (a) {
        return null === a || "" === a || 0 === this.length || a.length > this.length ? !1 : this.substr(0, a.length) === a
    }
})(jQuery);
