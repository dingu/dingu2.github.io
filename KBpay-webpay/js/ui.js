
// $(function() {
    $(document).ready(function() {
    
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

        // Button group
        var btnCnt = 0;
        if ($(".btn-group").length > 0) {
            $(".btn-group").each(function() {
                // 버튼이 2개일때
                if ($(this).find("button").length == 2) {
                    $(this).find("button:eq(0)").addClass("mr");
                }
            });
        }
    
        // Checkbox
        $(".f-chk").click(function() {
            if (!$(this).find("input").attr("disabled")) {
                if ($(this).find("input").prop("checked")) {
                    $(this).removeClass("checked");
                    $(this).find("input").prop("checked", false);
                } else {
                    $(this).addClass("checked");
                    $(this).find("input").prop("checked", true);
                }
            }
        });

        // Radio
        $(".f-rdo").click(function() {
            if (!$(this).find("input").attr("disabled")) {
                if ($(this).find("input").prop("checked")) {
                    $(this).removeClass("checked");
                    $(this).find("input").prop("checked", false);
                } else {
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
            if ($(this).find("input").prop("checked")) {
                $(this).parent().next().find("label").addClass("checked");
                $(this).parent().next().find("input").prop("checked", true);
                $(this).parent().next().slideUp(150);
                $(this).next().removeClass("on");
            } else {
                $(this).parent().next().find("label").removeClass("checked");
                $(this).parent().next().find("input").prop("checked", false);
                $(this).parent().next().slideDown(150);
                $(this).next().addClass("on");
            }
        });
        // 하위내용 체크 click
        $(".agree-terms .list .f-chk").click(function() {
            var cnt = 0;
            $(this).parents(".list").find(".f-chk").each(function() {
                if ($(this).find("input").prop("checked")) {
                    cnt++;
                }
            });

            if (cnt < $(this).parent().parent().find("> li > .f-chk").length) {
                // 항목 모두 체크되지 않았을때 상위 체크해제
                $(this).parent().parent().prev().find("label").removeClass("checked");
                $(this).parent().parent().prev().find("label input").prop("checked", false);
            } else {
                // 항목 모두 체크되었을때 상위 체크
                $(this).parent().parent().prev().find("label").addClass("checked");
                $(this).parent().parent().prev().find("label input").prop("checked", true);
                if (!$(this).parents(".agree-terms").hasClass("noSlide")) {
                    $(this).parent().parent().prev().find(".btn").removeClass("on");
                    $(this).parent().parent().slideUp(150);
                }
            }
        });
    
    
        // Tab
        $(".tabType01 li a").click(function(e) {
            e.preventDefault();
            $(this).parents(".tab-list").find("a").removeClass("active");
            $(this).addClass("active");
            $(this).parents(".tabUI").find(".tab-item").hide();
            $($(this).attr("href")).show();
        });        

        // Bottom Sheet close
        $(".l-bottom .head .close").click(function() {
            hideBottomSheet($(this).parents(".l-bottom"));
        });

        // Bottom sheet List click
        $(".l-bottom .bottom-list button").click(function() {
            $(".form_text input.curInput").parents(".form_text").addClass("out");
            $(".form_text input.curInput").val($(this).text()).css("opacity", 1);

            $(".curBottom").hide().removeClass("curBottom");
            $(".l-dim").hide();
        });

        // function : Bottom Sheet hide
        function hideBottomSheet(obj) {
            obj.hide();
            // 다른 팝업이 없을때만 dim제거
            if ($(".l-pop").css("display") == "none" || $(".l-pop").length < 1) {
                $(".l-dim").hide();
            }
            $(".l-bottom").removeClass("curBottom");
            if ($(".form_text input.curInput").val() == "") {
                $(".form_text input.curInput").parents(".form_text").removeClass("on");
            }
        }

        
        /*
            하단에 고정(Fixed)버튼이 있을때 스크롤되는 컨텐츠 높이
        */
        // console.log( "window : " + $(window).height() );
        // console.log( ".header : " + $(".header").outerHeight() );
        // console.log( ".bottom-btn-area : " + $(".bottom-btn-area").outerHeight() );
        // console.log( ".contents : " + $(".contents").outerHeight() );
        if ($(".bottom-btn-area.fixed").length > 0) {
            // 윈도우높이 - 헤더 - 하단버튼 = 스크롤 컨텐츠 높이
            $(".contents").outerHeight(
                $(window).height() - $(".header").outerHeight() - $(".bottom-btn-area").outerHeight()
            );
            $(".contents").addClass("scroll");
        }

        /*
            하단 버튼그룹 위치 세팅
        */
        // 하단 버튼 x     
        if ($(".bottom-btn-area").length < 1) {
            /*
                윈도우 높이 - 헤더 > 실제 컨텐츠높이
                => 컨텐츠가 디바이스 높이보다 짧음
                => float클래스 추가(하단에 position 속성부여)
            */
            if (($(window).height() - $(".header").outerHeight()) > ($(".contents").outerHeight())) {
                $(".bottom-btn-area").addClass("float");
            }
        } else {    //하단버튼 o
            /*
                윈도우 높이 - 헤더 - 하단버튼 > 실제 컨텐츠높이
            */
            if (($(window).height() - $(".header").outerHeight() - $(".bottom-btn-area").outerHeight()) > ($(".contents").outerHeight())) {
                $(".bottom-btn-area").addClass("float");
            }
        }        


        // Tooltip
        $(".tip").click(function () {
            $('.tip-box').fadeIn('fast');
        });     
        $(".tip-box .btn-close").click(function () {
            $('.tip-box').fadeOut('fast');
        });


        // Layer popup
        // close
        $(".l-pop .btn-group button").click(function() {
            $(this).parents(".l-pop").hide();
            $(".l-dim").hide();
        });    
    
    
        // Except Event 이벤트 제외
        $("body").on("mouseup", function(e) {

            /*
                Bottom sheet click 예외처리
            */
            // 바텀시트가 존재하고 마스크(l-dim)가 깔려있는 경우
            var idxBotSheet = 0;
            if ($(".l-bottom").length > 0 && $(".l-dim").css("display") == "block") {
                // click한 요소가 Bottom sheet가 아닐때
                if ($(e.target).parents(".l-bottom").length < 1) {
                    // 현재 열려있는 Bottom sheet 닫기
                    $(".l-bottom").each(function(i) {
                        if ($(this).hasClass("curBottom")) {
                            idxBotSheet = i;
                        }
                    });
                    hideBottomSheet($(".l-bottom").eq(idxBotSheet), $(".l-bottom").eq(idxBotSheet).outerHeight());
                }
            }

            /*
                Tooltip click 예외처리
            */
            // Tooltip 요소가 있을때
            if ($(".tip-box").length > 0) {
                if ($(e.target).parents(".tip-box").length < 1) {
                    $('.tip-box').fadeOut('fast');
                }
            }
        });
    });    
    
    
    // 하단 Bottom sheet 열기
    var curInput;
    function opBotSheet(id, obj) {
        blEvent = true;
        $(".l-dim").show();
        $("#" + id).show();

        $(".form_text").each(function() {
            if ($(this).find(".text").val() == "") {
                $(".form_text .text").blur();
                $(".form_text .text").removeClass("on");
            }
        });

        setLayerPopupH();   //컨텐츠 스크롤 영역 높이 세팅

        // click한 객체 선택
        $("#"+id).addClass("curBottom");
        $(".form_text .text").removeClass("curInput");
        $(obj).find("input").addClass("curInput");
    }
    function setLayerPopupH() {
        /*
            Bottom Sheet
        */
        // console.log( "window : " + ($(window).height()) );
        // console.log( ".l-bottom-wrap .head : " + $(".l-bottom-wrap .head").outerHeight() );
        // console.log( ".l-bottom .btn-group : " + $(".l-bottom .btn-group").outerHeight() );

        if ($(".l-bottom").length > 0) {
            // 레이어마다 각각의 스크롤 되는 높이를 설정
            $(".l-bottom").each(function() {
                // 하단 버튼 o
                if ($(this).find(".btn-group").length > 0) {
                    /*
                        window - 16 : 가장 높은 레이어가 상단 여백 16px을 남겨둔다
                        윈도우 높이(상단 여백 16제외) < 현재 레이어 높이 + 레이어 내부의 버튼그룹 높이
                    */
                    if (($(window).height() - 16) < ($(this).find(".l-contents").outerHeight() + $(this).find(".btn-group").outerHeight())) {
                        /*
                            팝업 컨텐츠 높이 : 윈도우 높이 - 32(상하단 여백) - 팝업 헤더 - 버튼영역
                        */
                        $(this).find(".l-contents").height( $(window).height() - 32 - $(this).find(".l-bottom-wrap .head").outerHeight() - $(this).find(".btn-group").outerHeight());
                        $(this).find(".l-bottom-wrap .l-contents").addClass("scroll");
                    }
                // 하단 버튼 x
                } else {
                    if (($(window).height() - 16) < $(this).height()) {
                        $(this).find(".l-bottom-wrap .l-contents").height( $(window).height() - 32 - $(this).find(".l-bottom-wrap .head").outerHeight());
                        $(this).find(".l-bottom-wrap .l-contents").addClass("scroll");
                    }
                }
            });
        }
    }

    // Bottom sheet 하단버튼 확인click
    function closeBotSheet(id) {
        $("#"+id).hide();
        $(".l-dim").hide();
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
        }, 4000);
    }


    // Layer popup (알림, 확인)
    function openLayerPop(id) {
        $(".l-dim").show();
        $("#"+id).fadeIn(200);
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