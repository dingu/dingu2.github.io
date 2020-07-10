$(function() {

    // Left navigation scroll style
    $(".navigation").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheel: {scrollAmount: 1000}
    });

    // Condition search button height responsible
    $(".condition .right-col button").height($(".condition .right-col").height());

    // Calendar
    if ($(".dates").length > 0) {
        $(".dates input").datepicker({
            dateFormat: 'yy-mm-dd',
            showMonthAfterYear: true,
            yearSuffix: '년',
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
            dayNamesMin: ['일','월','화','수','목','금','토'],
            dayNames: ['일','월','화','수','목','금','토'],

        });
    }


    // Scrolltop
    $(".container").scroll(function() {
        if ( $(".container").scrollTop() > 0 ) {
            $(".scrolltop").fadeIn(300);
        } else {
            $(".scrolltop").fadeOut(300);
        }
    });
    $(".scrolltop button").click(function() {
        $(".container").stop().animate({
            scrollTop: 0
        }, 400, 'swing', function() {});
    });

    

});


/*
    function
*/

// Navigation menu control
function accordionCtr(obj) {
    if ($(obj).hasClass("on")) {
        // hide sub menu
        $(obj).removeClass("on");
        $(obj).next().slideUp(200);
        
    } else {
        //show sub menu
        $(obj).parent().parent().find("> li > a").removeClass("on");
        $(obj).addClass("on");

        $(obj).parent().parent().find("> li > ul").slideUp(200);
        $(obj).next().slideDown(200);
    }
}


// 레이어팝업
function openLayer(id) {
    $("#" + id).show();
    $(".l-dim").show();
}
function closeLayer(id) {
    $("#" + id).hide();
    $(".l-dim").hide();
}


