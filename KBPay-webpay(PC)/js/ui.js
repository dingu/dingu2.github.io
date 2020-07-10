$(function() {

    // init
    
    // 컨텐츠 & 레이어내부 컨텐츠 영역 높이 세팅
    pageCtsH = $(".contents").height(); // Page 컨텐츠 높이
    pageBtmH = $(".bottom-group").outerHeight();    // Page 하단영역 높이
    layerBtmH = $(".l-bottom-group").outerHeight(); // Layer popup 하단영역 높이

    setContentsH(); // 페이지 컨텐츠 스크롤 영역 세팅
    
    
    /*
        Form
    */
    // Input : text & number
    $(".form_text").focusin(function () {
        $(this).addClass('on');
    });     
    $(".form_text").focusout(function() {
        $(".form_text").each(function() {
            if ($(this).find(".text").val() == "") {
                // 텍스트 안에 값이 없다면 라벨원위치
                if (!$(this).find("input").hasClass("curInput")) {
                    $(this).removeClass('on');
                }

            } else {
                // 텍스트 안에 값이 있다면 라벨 상단 유지
                $(this).addClass('out');
            }
        });
    });

    // Checkbox
    $(".f-chk").click(function() {
        chkToggle(this);
    });
    $(".f-chk").keydown(function() {
        if (window.event.keyCode == 13) {
            chkToggle(this);
        }
    });
    function chkToggle(obj) {
        if (!$(obj).find("input").attr("disabled")) {
            if ($(obj).find("input").prop("checked")) {
                $(obj).removeClass("checked");
                $(obj).find("input").prop("checked", false);
            } else {
                $(obj).addClass("checked");
                $(obj).find("input").prop("checked", true);
            }
        }
    }

    // Radio
    $(".f-rdo").click(function() {
        if (!$(this).find("input").attr("disabled")) {
            if (!$(this).find("input").prop("checked")) {
                $(this).addClass("checked");
                $(this).find("input").prop("checked", true);
            }
        }
    });
    $(".rdoGroup .f-rdo").click(function() {
        $(this).parents(".rdoGroup").find(".f-rdo").removeClass("checked");
        $(this).addClass("checked");
    });


    /*
        약관동의
    */
    // 유형 1 : 하위항목 체크시 상위체크 후 슬라이드 접기
    // 전체동의 click
    $(".agree-terms .checkAll").click(function() {
        checkAll(this);
    });
    $(".agree-terms .checkAll").keydown(function() {
        if (window.event.keyCode == 13) {
            checkAll(this);
        }
    });
    function checkAll(obj) {
        if ($(obj).find("input").prop("checked")) {
            $(obj).parent().next().find("label").addClass("checked");
            $(obj).parent().next().find("input").prop("checked", true);
            $(obj).parent().next().slideUp(150);
            $(obj).next().removeClass("on");
        } else {
            $(obj).parent().next().find("label").removeClass("checked");
            $(obj).parent().next().find("input").prop("checked", false);
            $(obj).parent().next().slideDown(150);
            $(obj).next().addClass("on");
        }
    }
    // 하위내용 체크 click
    $(".agree-terms .list .f-chk").click(function () {
        subCheck(this);
    });
    $(".agree-terms .list .f-chk").keydown(function() {
        if (window.event.keyCode == 13) {
            subCheck(this);
        }
    });
    function subCheck(obj) {
        var cnt = 0;
        $(obj).parents(".list").find(".f-chk").each(function() {
            if ($(this).find("input").prop("checked")) {
                cnt++;
            }
        });

        if (cnt < $(obj).parent().parent().find("> li > .f-chk").length) {
            // 항목 모두 체크되지 않았을때 상위 체크해제
            $(obj).parent().parent().prev().find("label").removeClass("checked");
            $(obj).parent().parent().prev().find("label input").prop("checked", false);
        } else {
            // 항목 모두 체크되었을때 상위 체크
            $(obj).parent().parent().prev().find("label").addClass("checked");
            $(obj).parent().parent().prev().find("label input").prop("checked", true);
            if (!$(obj).parents(".agree-terms").hasClass("noSlide")) {
                $(obj).parent().parent().prev().find(".btn").removeClass("on");
                $(obj).parent().parent().slideUp(150);
            }
        }
        cnt = 0;
    }


    // Tooltip
    $(".tip").click(function () {
        $('.tip-box').fadeIn('fast');
    });     
    $(".tip-box .btn-close").click(function () {
        $('.tip-box').fadeOut('fast');
    });
    
});

/*
    Function
*/

    /*
        페이지 컨텐츠 높이
    */

    var pageCtsH = 0;
    var pageBtmH = 0;
    var layerBtmH = 0;

    // 페이지 컨텐츠영역
    function setContentsH() {
        if ($(".bottom-group").length > 0) {
            $(".contents").height(pageCtsH - pageBtmH);
        }
    }


    /*
        open Layer popup
        id : layer popup ID
        obj : click event가 발생한 객체(팝업을 닫은 후 다시 이동하기 위해 호출할때 명시 - 접근성 이슈)
    */
    var callBtnObj;     //이벤트 발생한 객체(button, a 등)
    var maxLayerH = 430;    // 레이어 팝업 최대높이
    function openLayer(id, obj) {
        // 이벤트 발생한 객체를 global변수에 세팅    
        callBtnObj = $(obj);
        // Dim(마스킹처리) 보여주기
        $(".l-dim").show();
        // 레이어팝업 보여주기
        $("#" + id).show();

        // 접근성을 위해 레이어를 열면서 자동 포커싱을 하는데 그때 엔터로 누르는 경우 열고닫는 이벤트를 동시에 발생시키는 문제로 setTimeout으로 시간차를 벌림
        setTimeout(function() {
            /*
                높이를 재정의하는 이유는 display: none 처리된 레이어의 높이를 화면 로딩할때 js가 가져오지 못함
            */
            // Bottom 있을때 : 컨텐츠영역 높이( 430 - 상하단 여백 32 - 헤더 - 바텀영역
            if ($("#" + id).find(".l-bottom-group").length > 0) {
                var standard = 430 - 32 - 8 - $("#"+id).find(".l-header").outerHeight() - $("#"+id).find(".l-bottom-group").outerHeight();
                // 팝업 컨텐츠 내용이 클때
                if (standard < $("#"+id).find(".l-contents").outerHeight()) {
                    $("#"+id).find(".l-contents").height(standard);
                }
            
            // Bottom 없을때
            } else {
                var standard = 430 - 32 - 8 - $("#"+id).find(".l-header").outerHeight();
                // 팝업 컨텐츠 내용이 클때
                if (standard < $("#"+id).find(".l-contents").outerHeight()) {
                    $("#"+id).find(".l-contents").height(standard);
                }
            }
        }, 1);

        // 팝업 호출 후 닫기버튼으로 자동이동(접근성 이슈)
        setTimeout(function() {
            $("#" + id).find(".l-header .close").focus();
        }, 300);
    }
    function openLayerEnter(id, obj) {
        if (window.event.keyCode == 13) {
            openLayer(id, obj);
        }
    }

    // 팝업에서 다시 팝업을 호출할때 사용
    function openLayer02(id, obj) {
        callBtnObj = $(obj);
        $("#" + id).show();
        setTimeout(function() {
            if ($("#" + id).find(".l-bottom-group").length > 0) {
                var standard = 430 - 32 - 8 - $("#"+id).find(".l-header").outerHeight() - $("#"+id).find(".l-bottom-group").outerHeight();
                // 팝업 컨텐츠 내용이 클때
                if (standard < $("#"+id).find(".l-contents").outerHeight()) {
                    $("#"+id).find(".l-contents").height(standard);
                }
            
            // Bottom 없을때
            } else {
                var standard = 430 - 32 - 8 - $("#"+id).find(".l-header").outerHeight();
                // 팝업 컨텐츠 내용이 클때
                if (standard < $("#"+id).find(".l-contents").outerHeight()) {
                    $("#"+id).find(".l-contents").height(standard);
                }
            }
        }, 1);
        setTimeout(function() {
            $("#" + id).find(".l-header .close").focus();
        }, 300);
    }
    function openLayerEnter02(id, obj) {
        if (window.event.keyCode == 13) {
            openLayer(id, obj);
        }
    }

    // close Layer popup
    function closeLayer(id) {
        $("#" + id).hide();
        $(".l-dim").hide();
        setTimeout(function() {
            callBtnObj.focus();
        }, 300);
    }
    function closeLayer02(id) {
        $("#" + id).hide();
        setTimeout(function() {
            callBtnObj.focus();
        }, 300);
    }

    // 우측 콤보버튼 click
    function agreeCombo(obj) {
        if ($(obj).hasClass("on")) {
            $(obj).removeClass("on");
            $(obj).parent().next().slideUp(150);
        } else {
            $(obj).addClass("on");
            $(obj).parent().next().slideDown(150);
        }
    }


    // Toast popup call
    function showToast(obj, msg) {
        var str = "<p class='msg-toast'><span>" + msg + "</span></p>";
        $("."+obj).after(str).fadeIn(1000);
        setTimeout(function() {
            $(".msg-toast").fadeOut(500);
        }, 2500);
        setTimeout(function() {
            $(".msg-toast").remove();
        }, 3000);
    }