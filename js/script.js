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


    //mainSlider
    /* let slider = $('.mainSlider ul li');
    let slideCount = slider.length;
    let index = 0;

    slider.css({
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
    });

    slider.eq(0).css('opacity', 1);

    function mainslidersMove () {
        let current = index;
        index++;

        if (index === slideCount) {
            index = 0;
        }

        slider.eq(current).stop().animate({ opacity: 0 }, 500);
        slider.eq(index).stop().animate({ opacity: 1 }, 500);

        controlBtn.removeClass('active');
        controlBtn.eq(index).addClass('active');
    }
    setInterval(mainslidersMove, 3000); */


    //mainsliderbtn
    
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

    })
})

