;(function(window,document,$,undefined){

    var jason = {
        init:   function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.loginSection2Fn();
            that.joinSection2Fn();
            that.main1_1Fn();
        },
        headerFn: function(){
            var that = null;
            var _window = $(window);
            var _header = $('#header');
            var _nav = $('#nav');
            var _menuBar = $('.menu-bar');
            var _mainBtn = $('.main-btn');
            var _sub = $('.sub');
            var _section2 = $('#section2');
            var _htmlBody = $('html,body');
            var _scroll = false;
            var t = false;
            var m = 0;
            var s = -1;
            var topPos = 124;

                _header.on({
                    mouseenter: function(){
                        that = $(this);
                        that.addClass('addH');
                    },
                    mouseleave: function(){
                        that = $(this);
                        if( _scroll === false && m === 0 ){
                            that.removeClass('addH');
                        }
                    }
                });

                _window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        _scroll = true;
                        _header.addClass('addH');
                        if( t === false ){
                            t=true;
                            var headerH = $('#header').height();
                            _htmlBody.stop().animate({ scrollTop: _section2.offset().top-headerH },600,'easeInOutExpo');
                        }
                    }
                    else{
                        t=false;
                        _scroll = false;
                        if( m===0 ){
                            _header.removeClass('addH');
                        }
                    }
                });

                _window.resize(function(){
                    resizeFn();
                });

                function resizeFn(){

                    if( _window.innerWidth() > 1024 ){
                        topPos = 124;
                        _nav.stop().show(0).animate({top:(s*topPos)},300);
                    }
                    else if( _window.innerWidth() > 780 ){
                        topPos = 84;
                        _nav.stop().show(0).animate({top:(s*topPos)},300);
                    }
                    else{
                        topPos = 0;
                        _sub.stop().slideDown(0);
                        _nav.stop().animate({top:0},0);
                        if(m==1){
                            _nav.stop().show(0);
                            $('html').removeClass('addScroll');
                        }
                        else{
                            _nav.stop().hide(0);
                            $('html').removeClass('addScroll');
                        }
                    }
                }
                _nav.stop().hide(0);
                setTimeout(resizeFn,10);

                //네비게이션 이벤트
                _menuBar.on({
                    click: function(e){
                        e.preventDefault();
                        if(m==0){
                            m = 1;
                            s = 1;
                        }
                        else{
                            m = 0;
                            s = -1;
                        }
                        resizeFn();
                        $(this).toggleClass('addBtn');
                    }
                });

                //메인버튼 이벤트
                _mainBtn.on({
                    mouseenter: function(){
                        if( _window.innerWidth() > 780 ){
                            _sub.stop().slideUp(100);
                            $(this).next('.sub').stop().slideDown(300);
                        }
                    }
                });

                //서브메뉴 사라지는 효과 이벤트
                //#nav 를 떠나면 사라짐
                _nav.on({
                    mouseleave: function(){
                        _sub.stop().slideUp(300);
                    }
                });

        },
        section1Fn: function(){
            var cnt = 0;
            var n = $('#main #section1 .slide').length-2;
            var _win = $(window);
            var _nextBtn = $('#main #section1 .next-btn');
            var _prevBtn = $('#main #section1 .prev-btn');
            var _pageBtn = $('#main #section1 .page-btn');
            var _smoothBtn = $('#main #section1 .smooth-btn');
            var _slideWrap = $('#main #section1 .slide-wrap');
            var _section1 = $('#main #section1');
            var _section2 = $('#main #section2');
            var _slide = $('#main #section1 .slide');
            var _htmlBody = $('html,body');
            var setId = null;
            var setId2 = null;
            var _second = 4;
            var tCnt = 0;

                //메인 슬라이드 함수
                function mainSlideFn(){
                    _slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                        if(cnt>n-1){cnt=0;}
                        if(cnt<0){cnt=n-1;}
                        _slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                    });
                    pageBtnFn(cnt);
                }

                //페이지 버튼(인디게이터) 이벤트 함수
                setTimeout(pageBtnFn(0),100);
                function pageBtnFn(z){
                    z==n?z=0:z;
                    z==-1?z=n-1:z;
                    _pageBtn.removeClass('addCurrent');
                    _pageBtn.eq(z).addClass('addCurrent');
                }

                //다음 슬라이드 카운트 함수
                function nextCntFn(){
                    cnt++;
                    mainSlideFn();
                }

                //이전 슬라이드 카운트 함수
                function prevCntFn(){
                    cnt--;
                    mainSlideFn();
                }

                //자동 플레이
                function autoTimerFn(){
                    setId = setInterval(nextCntFn,1000*_second);
                }

                //버튼 이벤트 발생시 타이머 컨트롤 함수
                function timerFn(){
                    tCnt=0;
                    clearInterval(setId2);

                    setId2 = setInterval(function(){
                        tCnt++;
                        if( tCnt>_second ){
                            clearInterval(setId2);
                            nextCntFn();
                            autoTimerFn();
                        }
                    },1000);
                }

                //페이지 버튼(인디게이터) 이벤트
                _pageBtn.each(function(idx){
                    $(this).on({
                        click: function(e){
                            e.preventDefault();
                            clearInterval(setId);
                            timerFn();
                            cnt = idx;
                            mainSlideFn();
                        }
                    });
                });

                //다음 슬라이드 버튼 클릭 이벤트
                _nextBtn.on({
                    click: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        if( !_slideWrap.is(':animated') ){
                            nextCntFn();
                        }
                    }
                });

                //이전 슬라이드 버튼 클릭 이벤트
                _prevBtn.on({
                    click: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        if( !_slideWrap.is(':animated') ){
                            prevCntFn();
                        }
                    }
                });

                //터치 스와이프 이벤트
                _section1.swipe({
                    swipeLeft: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        if( !_slideWrap.is(':animated') ){
                            nextCntFn();
                        }
                    },
                    swipeRight: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        if( !_slideWrap.is(':animated') ){
                            prevCntFn();
                        }
                    }
                });

                setTimeout(autoTimerFn,10);

                //스무스 버튼
                _smoothBtn.on({
                    click: function(e){
                        e.preventDefault();
                        var headerH = $('#header').height();
                        var url = $(this).attr('href');
                        _htmlBody.stop().animate({ scrollTop: $(url).offset().top-headerH },600,'easeInOutExpo');
                    }
                });

                var winW = _win.width();
                var winH = _win.height();
                
                    function resizeFn(){
                        winW = _win.width();
                        winH = _win.height();
                        $('#section1').css({height:winH});
                        _section2.css({marginTop:winH});
                        _slide.css({width:winW});
                    }
                    setTimeout(resizeFn,10);

                    _win.resize(function(){
                        resizeFn();
                    });

        },
        section2Fn: function(){

            var _win = $(window);
            var _gal = $('#main .gallery li');
            var _galW = _gal.width();
            var _galH = _galW * 0.832468967;

                function resizeFn(){
                    _galW = _gal.width();
                    _galH = _galW * 0.832468967;
                    _gal.css({height:_galH});
                }
                setTimeout(resizeFn,10);

                _win.resize(function(){
                    resizeFn();
                });

        },
        section3Fn:function(){

            //박스높이 slide View Box 너비가 1360이하이면 높이 자동 설정 높이 설정  
            var $window    = $(window);
            var $winW      = $window.innerWidth();
            var $slideView = $('#main #section3 .slide-view');
            var $pageBtnW  = $('#main #section3 .pageBtn').innerWidth();
            var $pageWrap  = $('#main #section3 .page-wrap');
            var $slideBg   = $('#main #section3 .slide-bg-image');
            var $slideBgW  = $('#main #section3 .slide-bg-image').innerWidth();
               

                function resizeFn(){
                    $winW = $window.innerWidth();
                    $pageBtnW  = $('#main #section3 .pageBtn').innerWidth();
                    $slideBgW  = $('#main #section3 .slide-bg-image').innerWidth();

                    if($winW<=1360){
                        $slideView.css({height:$winW*0.419117647}); //570 = 1360 * 0.419117647
                        $pageWrap.css({height:$pageBtnW});
                        $slideBg.css({height:$slideBgW});
                    }
                    else{
                        $slideView.css({height:570}); //570 = 1360 * 0.419117647
                    }                
                }   
                
                setTimeout(resizeFn,10);

                $window.resize(function(){
                    resizeFn();
                });



                //페이드 인아웃 반응형 슬라이드 웹개발
                var cnt      = 0;
                var n        = $('#main #section3 .slide').length-1; //2 = 3-1 = index number(0 1 2)
                var $nextBtn = $('#main #section3 .nextBtn');
                var $prevBtn = $('#main #section3 .prevBtn');
                var $slide   = $('#main #section3 .slide');
                var $pageBtn = $('#main #section3 .pageBtn');
                var a = [1,2]; 


                //1.메인 슬라이드 페이드인아웃 함수 //////////
                //1-1메인 다음 슬라이드 함수
                function mainNextSlideFn(){
                    $slide.css({zIndex:1}); //초기화 모든 슬라이드 zIndex:1
                    $slide.eq(cnt==0?n:cnt-1).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); //현재 슬라이드
                    pageBtnFn();                    
                }
                //1-2메인 이전 슬라이드 함수
                function mainPrevSlideFn(){
                    $slide.css({zIndex:1,opacity:1}); //초기화 모든 슬라이드 zIndex:1 opacity:1
                    $slide.eq(cnt).css({zIndex:2}); //현재 이전 슬라이드
                    $slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000); //현재 슬라이드                    
                    pageBtnFn();                    
                }


                //2. 카운트 함수 이벤트 //////////
                //2-1메인 다음 카운트 슬라이드 함수
                function nextCountFn(){
                    cnt++;
                    if(cnt>n){cnt=0;}
                    mainNextSlideFn();
                }
                //2-2메인 이전 카운트 슬라이드 함수
                function prevCountFn(){
                    cnt--;
                    if(cnt<0){cnt=n;}
                    mainPrevSlideFn();
                }
                

                //3. 버튼 클릭 이벤트 //////////
                //3-1 다음 화살 버튼 클릭 이벤트
                $nextBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        nextCountFn();
                    }
                });                
                //3-2 이전 화살 버튼 클릭 이벤트
                $prevBtn.on({
                    click:  function(e){
                        e.preventDefault();
                        prevCountFn();
                    }
                });


                //4. 페이지 버튼(인디게이터 버튼) 이벤트 함수 //////////
                //스토리 보드 : 현재 슬라이드가
                //첫번째 슬라이드 이면 페이지 버튼 1 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                //첫번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //두번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //두번째 슬라이드 이면 페이지 버튼 2 : [2] 세번째 슬라이드 이미지 s3Slide2.jpg

                //세번째 슬라이드 이면 페이지 버튼 1 : [0] 첫번째 슬라이드 이미지 s3Slide0.jpg 
                //세번째 슬라이드 이면 페이지 버튼 2 : [1] 두번째 슬라이드 이미지 s3Slide1.jpg
                function pageBtnFn(){

                    switch(cnt){
                        case 0:
                            a = [1,2];
                            break;
                        case 1:
                            a = [0,2];
                            break;
                        case 2:
                            a = [0,1];
                    }  

                    for(var i=0;i<a.length;i++){
                        $pageBtn.eq(i).css({backgroundImage:'url(./img/s3Slide'+ a[i] +'.jpg)'});
                    }

                }

                //5. 페이지 버튼(인디게이터 버튼) 클릭 이벤트 //////////
                $pageBtn.each(function(idx){
                    $(this).on({
                        click:  function(e){
                            e.preventDefault();

                            var imsi = cnt; 
                                cnt  = a[idx]; 

                                if(imsi < a[idx]){ 
                                    mainNextSlideFn();
                                } 
                                else if(imsi > a[idx]){
                                    mainPrevSlideFn();
                                }   
                        }
                    });    
                });
        },
        section4Fn: function(){
            var _slideN     = 3;
            var _slideCon   = $('#main #section4 .slide-container');
            var _slideW     = _slideCon.innerWidth()/_slideN;
            var _slideWrap  = $('#main #section4 .slide-wrap');
            var _slide      = $('#main #section4 .slide');
            var _pageBtn    = $('#main #section4 .pageBtn');
            var totN        = _slide.length;
            var _win        = $(window);
            var cnt         = 0;
            var setId       = null;
            var setId2      = null;

                function resizeFn(){
                    if( _slideCon.innerWidth() > 1024 ){
                        _slideN = 3;
                    }
                    else if( _slideCon.innerWidth() > 680 ){
                        _slideN = 2;
                    }
                    else{
                        _slideN = 1;
                    }
                    _slideW = _slideCon.innerWidth()/_slideN;
                    _slideWrap.css({width:(_slideW*totN), marginLeft:-(_slideW*3)});
                    _slide.css({width:_slideW, height:_slideW-40});
                    _slideWrap.stop().animate({left:-(_slideW*cnt)},0);
                }

                setTimeout(resizeFn,10);

                _win.resize(function(){
                    resizeFn();
                });
  
                function mainSlideFn(){
                    _slideWrap.stop().animate({left:-(_slideW*cnt)},600, 'easeOutExpo', function(){
                        if(cnt>3){cnt=0;}
                        if(cnt<0){cnt=3;}
                        _slideWrap.stop().animate({left:-(_slideW*cnt)},0);
                    });
                    pageBtnEventFn();
                }
 
                function nextCntFn(){
                    cnt++;
                    mainSlideFn();
                }
 
                function prevCntFn(){
                    cnt--;
                    mainSlideFn();
                }

                _slideCon.swipe({
                    swipeLeft: function(){
                        timerControlFn();
                        if( !_slideWrap.is(':animated') ){
                            nextCntFn();
                        }
                    },
                    swipeRight: function(){
                        timerControlFn();
                        if( !_slideWrap.is(':animated') ){
                            prevCntFn();
                        }
                    }
                });

                function pageBtnEventFn(){
                    var z = cnt;
                    if(z>3){z=0;}
                    if(z<0){z=3;}
                    _pageBtn.removeClass('addPage');
                    _pageBtn.eq(z).addClass('addPage');
                }

                _pageBtn.each(function(idx){
                    $(this).on({
                        click: function(e){
                            e.preventDefault();
                            timerControlFn();
                            cnt=idx;
                            mainSlideFn();
                        }
                    });
                });

                function autoPlayFn(){
                    setId = setInterval(nextCntFn,6000);
                }
                autoPlayFn();

                function timerControlFn(){
                    var tCnt = 0;
                    clearInterval(setId);
                    clearInterval(setId2);
                    setId2 = setInterval(function(){
                        tCnt++;
                        if(tCnt>=6){
                            clearInterval(setId2);
                            nextCntFn();
                            autoPlayFn();
                        }
                    },1000);
                }
        },

        //로그인 페이지
        loginSection2Fn: function(){

            var _submitBtn = $('#login .submitBtn');

                _submitBtn.on({
                    click: function(e){
                        e.preventDefault();

                        var txtEmail = $('#login #email').val();
                        var txtPwd = $('#login #pwd').val();

                            $.ajax({
                                url:'./loginCheck.php',
                                type:'POST',
                                data:{
                                    gaib_email: txtEmail,
                                    gaib_pwd: txtPwd
                                },
                                success:function(data){
                                    $('#login #email').val('');
                                    $('#login #pwd').val('');
                                    $('.login_txt').html(data);
                                },
                                error:function(){
                                    console.log('AJAX 오류!!!');
                                }
                            });
                    }
                });

                //로그아웃
                $(document).on('click','logoutBtn', function(){

                    $.ajax({
                        url:'./logout.php',
                        typa:'POST',
                        success:function(data){
                            $('.login_txt').html(data);

                            $('#login #email').val('');
                            $('#login #pwd').val('');
                        },
                        error:function(){
                            console.log('에러 AJAX!!!');
                        }
                    });
                });
        },

        //회원가입 페이지
        joinSection2Fn: function(){

            //1. 전송 버튼 클릭 AJAX 구현
            $('#join .submitBtn').on({
                click: function(e){
                    e.preventDefault();

                    //2. 폼 데이터 가져오기
                    var txt_id    = $('#gaib_id').val();
                    var txt_pw    = $('#gaib_pwd').val();
                    var txt_name  = $('#gaib_name').val();
                    var txt_phone = $('#gaib_phone').val();
                    var txt_email = $('#gaib_email').val();

                        //AJAX - API
                        $.ajax({
                            url:'./insert.php',
                            type:'POST',
                            data:{
                                gaib_id:    txt_id,
                                gaib_pw:    txt_pw,   
                                gaib_name:  txt_name,
                                gaib_phone: txt_phone,
                                gaib_email: txt_email
                            },
                            success:function(){
                                alert('AJAX 성공!!! 축하합니다. 데이터베이스에 데이터가 저장 되었습니다.');
                            },
                            error:function(){
                                alert('AJAX 실패!!!');
                            }
                        });
                }
            });


            //목록보기 버튼 클릭 이벤트
            $('.listBtn').on({
                click: function(e){
                    e.preventDefault();

                    $.ajax({
                        url:'./select.php',
                        type:'POST',
                        success:function(data){

                            $('.output').html(data);

                        },
                        error:function(){
                            alert('AJAX Error!!!');
                        }
                    });
                }
            });
        },

        //메인1_1 페이지
        main1_1Fn: function(){
            var $win = $(window);
            var $section2WrapW = $('#main1-1 #section2 .wrap').innerWidth();
            var $section2ImgWrap = $('#main1-1 #section2 .img-wrap');
            var $winW = $win.innerWidth();
            var n = 3;

                function resizeFn(){
                    $winW = $win.innerWidth();

                    if( $winW > 1280 ){
                        n = 3;
                    }
                    else if( $winW > 980 ){
                        n = 2;
                    }
                    else{
                        n = 1;
                    }
    
                    $section2WrapW = $('#main1-1 #section2 .wrap').innerWidth();
                    $section2ImgWrap.css({ height: ($section2WrapW/n)*0.6 });
                }
         
                setTimeout(resizeFn,10);

                $win.resize(function(){
                    resizeFn();
                });
        }
    };
    
    jason.init();

})(window,document,jQuery);