var dropdown_content;

$(function() {
    dropdown_content = new DropdownContent();
});

function DropdownContent() {
    var dc = this;

    dc.debug = false;

    var collection = [];
    var ids = [];
    var windowWidth = window.innerWidth;
    var closeDropsTimeout;

    dc.initiate_instance = function(elem) {
        var $elem = $(elem);

        $elem.addClass("cd-init");
        collection.push(elem);
        ids.push($elem.attr("id"));

        $elem.on("open",function() {
            dc.closeItems();
            $elem.addClass("dc-open");
        });

        $elem.on("close",function() {
            $elem.removeClass("dc-open");
        });

        //$elem.append("<button type='button' class='dc-close jsDcClose'></button>");

    };

    dc.instance_location = function(btn, id) {
        if (dc.debug) console.log($(btn).offset().left + ', '+ $(btn).position().top + ', '+ windowWidth);

        var align_left_or_right = "left";
        var position_left = $(btn).offset().left;
        var windowWidth_half = windowWidth / 2;
        if (position_left > windowWidth_half || $( window ).width() < 640) {align_left_or_right = "right";}

        if (align_left_or_right === "left") {//align to left of button
            $("#"+id).css({
                "top" : $(btn).position().top + $(btn).outerHeight() + 15,
            }).addClass("aligned-left");
            if (dc.debug) console.log("align left");
        }
        else {//align to right of button
            var $btn = $(btn),
                $box = $("#"+id);

            if (dc.debug) {
                console.log("windowWidth: "+windowWidth);
                console.log("$btn.position().left: "+$btn.position().left);
                console.log("$box.outerWidth(): "+$box.outerWidth());
            }
            var boxWidth = $box.outerWidth();
            var btnWidth = $(btn).outerWidth();
            var minusLeftOffset = boxWidth - btnWidth;
            $box.css({
                "top" : $btn.position().top + $btn.outerHeight() + 15,
                "marginLeft": -+minusLeftOffset
            }).addClass("aligned-right");
            if (dc.debug) console.log("align right");
        }
    };

    dc.closeItems = function() {

        for(var i = 0; i < collection.length; i++) {
            var $elem = $(collection[i]);

            if ($elem.hasClass("dc-open")) {
                if ($elem.data("closeCallback")) {
                    var callback = $elem.data("closeCallback");

                    var fn = window[callback];

                    // is object a function?
                    if (typeof fn === "function") fn();

                }
                //run close functions
                $elem.trigger("close");
            }

        }
        $("*[data-toggle-dropdown-content]").removeClass("active");
    };

    dc.triggers = function() {

        //open
        $("*[data-toggle-dropdown-content]:not(.dc-btn-init)").each(function() {
            var $btn = $(this);
            $btn.addClass("dc-btn-init");
            var id = $btn.data("toggleDropdownContent");
            $btn.on("click",function(e) {
                e.preventDefault();
                $("#"+id).trigger("open");
                $btn.addClass("active");
                dc.instance_location(this, id);
            });
        });

        //clicked outside
        //close when clicking outside element
        document.addEventListener("click", function(evt) {

            for (var ii = 0; ii < ids.length; ii++) {

                var dropdown_elem = document.getElementById(ids[ii]),
                    targetElement = evt.target;  // clicked element

                if (!targetElement.classList.contains("dc-btn-init")) {
                    do {
                        if (targetElement == dropdown_elem) {
                            // This is a click inside. Do nothing, just return.
                            if (dc.debug) console.log("Clicked inside!");
                            clearTimeout(closeDropsTimeout);
                            return;
                        }
                        // Go up the DOM
                        targetElement = targetElement.parentNode;
                    } while (targetElement);

                    // This is a click outside.
                    if (dc.debug) console.log("Clicked outside!");
                    clearTimeout(closeDropsTimeout);
                    closeDropsTimeout = setTimeout(function() {
                        dc.closeItems();
                    },250);

                }
                else {
                    if (dc.debug) console.log("open btn clicked");
                    clearTimeout(closeDropsTimeout);
                }
            }
        });

        //close btns
        $('.jsDcClose').on("click", function(e) {
            e.preventDefault();
            dc.closeItems(0);
        });


    };



    dc.init = function() {
        $("*[data-dropdown-content]:not(.dc-init)").each(function() {
            dc.initiate_instance(this);
        });
        dc.triggers();
    };

    this.init();

}