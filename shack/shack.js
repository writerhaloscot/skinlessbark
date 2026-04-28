$(function () {
    if (typeof jQuery !== 'undefined') {
        console.log("jQuery is loaded!");
    } else {
        console.log("jQuery is NOT loaded.");
    }


    /* CONTROLS */
    $('.controls a').on('click', function (e) {
        e.preventDefault();
        $('.controls a').removeClass('active');
        $(this).addClass('active');
        $('#shack').removeClass().addClass($(this).attr('href').replace('#', ''));
    });

    $(document).on('keydown', function (e) {
        if (e.which === 38 || e.which === 87) {
            // W or up arrow
            $('.controls a[href="#move-forward"]').trigger('click');
        }
        if (e.which === 40 || e.which === 83) {
            // S or down arrow
            $('.controls a[href="#move-back"]').trigger('click');
        }
        if (e.which === 37 || e.which === 65) {
            // A or left arrow
            $('.controls a[href="#turn-left"]').trigger('click');
        }
        if (e.which === 39 || e.which === 68) {
            // D or right arrow
            $('.controls a[href="#turn-right"]').trigger('click');
        }
        if (e.which === 8) {
            // x
            $('.controls a[href="#reset"]').trigger('click');
        }
    });

    /* INTERACTIONS FOR JUMP SCARES */
    const jumpscare = new Audio('../sound/pixabay/alex_jauk-sudden-screaming-sound-193070.mp3');

    const jumpscare1 = new Audio('../sound/pixabay/kalsstockmedia-sudden-scary-jump-scare-effect-2-294237.mp3');
    const jumpscare2 = new Audio('../sound/pixabay/kalsstockmedia-horror-jump-scare-effect-3-250460.mp3');
    const jumpscare3 = new Audio('../sound/pixabay/kalsstockmedia-horror-jump-scare-effect-4-250459.mp3');

    $('.wall, .floor, .ceiling').on('click', function (e) {
        $('html').removeClass().addClass('theme-gray');
    });
    $('.cpt').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.overlay, #moose').fadeIn();
        $('body').addClass('dead');
        $('.floor').addClass('blood');
        setTimeout(function () {
            $('html').removeClass().addClass('theme-gray');
            $('.overlay, #moose').fadeOut();
            $('#moose').removeClass();
            $('body').removeClass('dead');
        }, 3000);
    });
    $('.door').on('click', function (e) {
        jumpscare1.play();
        jumpscare.play();
        $('html').removeClass().addClass('theme-green');
        $('#moose').removeClass().addClass('attack-door flicker');
    });
    $('.fire').on('click', function (e) {
        jumpscare2.play();
        $('html').removeClass().addClass('theme-red');
        $('#moose').removeClass().addClass('attack-fire flicker');
    });
    $('.window').on('click', function (e) {
        jumpscare3.play();
        $('html').removeClass().addClass('theme-blue');
        $('#moose').removeClass().addClass('attack-window flicker');
    });

});
