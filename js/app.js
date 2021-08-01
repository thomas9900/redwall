window.onscroll = function () {
    if (pageYOffset >= 500 ) {
        document.getElementById('toContactBtn').style.visibility = "visible";
    } else {
        document.getElementById('toContactBtn').style.visibility = "hidden";
    }
};

$(function () {
    const $blocks = $('.animBlock.notViewed');
    const $window = $(window);

    $window.on('scroll', function (e) {
        $blocks.each(function (i, elem) {
            if ($(this).hasClass('viewed'))
                return;

            isScrolledIntoView($(this));
        });
    });
});

function isScrolledIntoView(elem) {
    const docViewTop = $(window).scrollTop();
    const docViewBottom = docViewTop + $(window).height();
    let elemOffset = 0;

    if (elem.data('offset') != undefined) {
        elemOffset = elem.data('offset');
    }
    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();

    if (elemOffset != 0) { // custom offset is updated based on scrolling direction
        if (docViewTop - elemTop >= 0) {
            // scrolling up from bottom
            elemTop = $(elem).offset().top + elemOffset;
        } else {
            // scrolling down from top
            elemBottom = elemTop + $(elem).height() - elemOffset
        }
    }

    if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
        // once an element is visible exchange the classes
        $(elem).removeClass('notViewed').addClass('viewed');

        var animElemsLeft = $('.animBlock.notViewed').length;
        if (animElemsLeft == 0) {
            // with no animated elements left debind the scroll event
            $(window).off('scroll');
        }
    }
}