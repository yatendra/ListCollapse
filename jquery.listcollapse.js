/* -------------------------------------------------- *
* List Collapse 1.0
* Updated: 11/09/10
* --------------------------------------------------- *
* Author: Yatendra Khandelwal
* URL: http://yatendra.com/
* Copyright: 2010-2011 Yatendra Khandelwal
* License: MIT License
* Note: This plugin is based on Collapsorz 1.1 created
        by Aaron Kuzemchak(http://aaronkuzemchak.com/)
** -------------------------------------------------- */

(function($) {
    $.fn.listcollapse = function(options) {
        // default settings
        var defaults = {
            toggle: "> *", // elements inside the object to toggle
            maximum: 5, // number to show in collapsed form
            showText: "Show", // text for the expand link
            hideText: "Hide", // text for the collapse link
            linkLocation: "after", // use "after" or "before" to determine where link displays
            defaultState: "collapsed", // use "collapsed" or "expanded" to show or hide items by default
            wrapLink: null // specify HTML code to wrap around the link
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
            // setup variables
            var $obj = $(this);
            var $targets = $(options.toggle, this);
            var $linkobject = null;
            // hide/show items
            if (options.defaultState == "collapsed") {
                $targets.filter(":gt(" + (options.maximum - 1) + ")").hide();
                $targets.filter(":lt(" + options.maximum + ")").show();
            }
            if (options.linkLocation == "before") {
                $linkobject = $obj.prev();
                if (options.wrapLink == null) {
                    if (!$linkobject.is('a')) {
                        $linkobject = null;
                    }
                }
                else {
                    if ($linkobject.children('a.toggler').length == 0) {
                        $linkobject = null;
                    }
                }
            }
            else {
                $linkobject = $obj.next();
                if (options.wrapLink == null) {
                    if (!$linkobject.is('a')) {
                        $linkobject = null;
                    }
                }
                else {
                    if ($linkobject.children('a.toggler').length == 0) {
                        $linkobject = null;
                    }
                }
            }
            //if toggle link not present and number of items are greter than maximum add link
            if (($linkobject == null) && ($targets.length > options.maximum)) {
                // append/prepend the toggle link to the object
                var $toggler = $('<a href="#" class="toggler"></a>');
                if (options.linkLocation == "before") {
                    $obj.before($toggler);
                }
                else {
                    $obj.after($toggler);
                }
                if (options.wrapLink) {
                    $toggler.wrap(options.wrapLink);
                }
                // set data, link class, and link text
                if (options.defaultState == "expanded") {
                    $obj.data("status", "expanded");
                    $toggler.addClass("expanded");
                    $toggler.html(options.hideText);
                }
                else {
                    $obj.data("status", "collapsed");
                    $toggler.addClass("collapsed");
                    $toggler.html(options.showText);
                }
                // click actions
                $toggler.click(function() {
                    if ($obj.data("status") == "collapsed") {
                        $targets.filter(":hidden").show();
                        $toggler.html(options.hideText);
                        $obj.data("status", "expanded");
                    }
                    else if ($obj.data("status") == "expanded") {
                        $targets.filter(":gt(" + (options.maximum - 1) + ")").hide();
                        $toggler.html(options.showText);
                        $obj.data("status", "collapsed");
                    }
                    $(this).toggleClass("collapsed").toggleClass("expanded");
                    return false;
                });
            }
            else {
                //remove toggle link if present and number of items less than or equal to maximum
                if (($targets.length <= options.maximum) && ($linkobject != null)) {
                    $obj.next().remove();
                }
            }
        });
    }
})(jQuery);