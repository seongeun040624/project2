$(function(){
    const $menu = $('.bgmenu > .inner > .inmenu > li');
    const $show=$('.outnav>li .inmenu >li:first-child').find('.depth');
   
    //gnb menu
    $('#nav>.inner>ul>li').mouseenter(function(){
        $(this).find('.bgmenu').show();
    });
    $('#nav>.inner>ul>li').mouseleave(function(){
        $(this).find('.bgmenu').hide();
        const $currentFirstDepth = $(this)
        .children('.depth')
        .first();

        $menu.children('.depth').first().show();
        $currentFirstDepth.show();
    });

    //console.log($show);
       
   
   /*  $show.show(); */
    $menu.on('mouseenter', function () {
        // 모든 depth 숨김
        $menu.children('.depth').hide();

        // hover한 li의 depth만 표시
        $(this).children('.depth').show();
        //console.log("hi")
    });

    $menu.on('mouseleave', function () {
        // 전체 depth 숨김
        $menu.children('.depth').hide();
        $(this).children('.depth').show();

        // 첫 번째 depth 다시 표시
       $show.show();
    });



    //mainslider + btn
    let slider = $('.mainSlider .sliderImg ul li');
    let controlBtn = $('.mainSliderBtn ul li');
    let slideCount = slider.length;
    let index = 0;
    let timer;

    // 초기 설정
    slider.css({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
    });

    slider.eq(0).css('opacity', 1);
    controlBtn.eq(0).addClass('active');

    // 슬라이드 이동 함수
    function moveSlide(nextIndex) {
        if (nextIndex === index) return;

        slider.eq(index).stop().animate({ opacity: 0 }, 500);
        slider.eq(nextIndex).stop().animate({ opacity: 1 }, 500);

        controlBtn.removeClass('main-active');
        controlBtn.eq(nextIndex).addClass('main-active');

        index = nextIndex;
    }

    // 자동 슬라이드
    function autoSlide() {
        let next = index + 1;
        if (next === slideCount) next = 0;
        moveSlide(next);
    }
    timer = setInterval(autoSlide, 3000);

    // 컨트롤 버튼 클릭 시
    controlBtn.click(function () {
        let btnIndex = $(this).index();
        clearInterval(timer);
        moveSlide(btnIndex);
        timer = setInterval(autoSlide, 3000);
    });


    let isPlaying = true; // 현재 자동 실행 중인지 상태
    $('.mainActBtn').click(function(){
        if (isPlaying) {
            // 실행 중 → 정지
            $(this).find('img').attr('src', 'img/visual-play.png');
            clearInterval(timer);
            isPlaying = false;
        } else {
            // 정지 상태 → 다시 실행
            timer = setInterval(autoSlide, 3000);
            $(this).find('img').attr('src', 'img/visual-pause.png');
            isPlaying = true;
        }
    });

    //슬라이더양옆버튼
    $('.sliderBtn ul li').hover(function(){
        let btnIdx = $(this).index();

        if(btnIdx === 0){
            $(this).find('img').attr('src','./img/visual_prev_act.png');
        }else{
            $(this).find('img').attr('src','./img/visual_next_act.png');
        }
    }, function(){
        let btnIdx = $(this).index();

        if(btnIdx === 0){
            $(this).find('img').attr('src','./img/visual_prev.png');
        }else{
            $(this).find('img').attr('src','./img/visual_next.png');
        }
    });
    $('.sliderBtn ul li').click(function(e){
        e.preventDefault();
        clearInterval(timer);

        let btnIdx = $(this).index();
        let nextIndex;

        if (btnIdx === 0) {
            // 이전 버튼
            nextIndex = index - 1;
            if (nextIndex < 0) nextIndex = slideCount - 1;
        } else {
            // 다음 버튼
            nextIndex = index + 1;
            if (nextIndex >= slideCount) nextIndex = 0;
        }

        moveSlide(nextIndex);

        if (isPlaying) {
            timer = setInterval(autoSlide, 3000);
        }
    });



    //content3
      //tabcontent
    $('.tabTitle>ul>li').click(function(e){
        e.preventDefault();
        $('.tabTitle>ul>li').removeClass('tabsOn');
        $(this).addClass('tabsOn');

        let tabIdx = $(this).index();
        $('.tabContents>div').hide();
        $('.tabContents>div').eq(tabIdx).show();
    });

      //banner
      let a=true;
    $('.bannerBtns>ul>li').click(function(e){
        e.preventDefault();
        if(a===true){
              $(this).find('img').attr('src','./img/slide_play.png');
              a=false;
        }else{
            $(this).find('img').attr('src','./img/slide_pause.png');
            a=true;
        }
    });


    //lastTabs 혼자한 부분// 탭이 열리고 닫히는데 다른 탭을 선택해도 이전 탭이 닫히지 않음
    /* let b = true;
    $('.lastTabs>ul>li').click(function(e){
        e.preventDefault();
        if(b === true){
            $(this).find('a').addClass('tabActive');
            $(this).css('background','#555');
            $(this).find('.lastSection').show();

            if(){}
            b=false;
        }else{
            $(this).find('a').removeClass('tabActive');
            $(this).css('background','none');
            $(this).find('.lastSection').hide();

            b=true;
        }
    }) */


    $('.lastTabs>ul>li').click(function (e){
        e.preventDefault(); //a 효과 제거
        e.stopPropagation(); //이 클릭 이벤트는 여기서 끝내고, document까지 전달하지 마라

        //현재 클릭한 탭이 열려 있는지 먼저 저장
        let isActive = $(this).find('a').hasClass('tabActive');
        //hasClass : 해당 a에 tabActive 클래스가 있으면 true, 없으면 false 를 반환

        //모든 탭 초기화
        $('.lastTabs>ul>li a').removeClass('tabActive');
        $('.lastTabs>ul>li').css('background', 'none');
        $('.lastSection').hide();

        //이전에 열려 있지 않았던 경우만 다시 열기
        if (!isActive) { //!결과 반대로 뒤집음 => isActive가 아니면=> a가 활성화되지 않은(false) 상태라면
            $(this).find('a').addClass('tabActive');
            $(this).css('background', '#555');
            $(this).find('.lastSection').show();
        }
    });

    //탭 바깥 영역 클릭 시 탭 닫힘
    $(document).click(function(){
        // 탭과 관련된 모든 활성 상태 제거
        $('.lastTabs>ul>li a').removeClass('tabActive');
        $('.lastTabs>ul>li').css('background', 'none');
        $('.lastSection').hide();
    });


    //footer
    /* $('.snsWrap ul li').hover(function(){
        $(this).find('img').attr('src', './img/ico_sns_youtube_on.png');
        $(this).find('img').attr('src', './img/ico_sns_instagram_on.png');
        $(this).find('img').attr('src', './img/ico_sns_facebook_on.png');
        $(this).find('img').attr('src', './img/ico_sns_x_on.png');
        $(this).find('img').attr('src', './img/ico_sns_blog_on.png'); */
        /* $('li.youtub').find('img').attr('src', './img/ico_sns_youtube_on.png');
        $('li.insta').find('img').attr('src', './img/ico_sns_instagram_on.png');
        $('li.faceb').find('img').attr('src', './img/ico_sns_facebook_on.png');
        $('li.twit').find('img').attr('src', './img/ico_sns_x_on.png');
        $('li.blog').find('img').attr('src', './img/ico_sns_blog_on.png'); */
    //}, function(){})
});

