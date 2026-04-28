$(function () {
    if (typeof jQuery !== 'undefined') {
        // console.log("jQuery is loaded!");
    } else {
        // console.log("jQuery is NOT loaded.");
    }

    /* INSTRUCTIONS */
    alert('Secure the room.\n\nUse a mouse or the arrow keys to navigate.\nClick or press [enter] to select.\n\nClick the moose’s heart or press [H] to attack.');
    alert('Don’t trust the moose.');


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
    var moose_health = 100;
    var moose_damage = 5;
    const jumpscare = new Audio('../sound/pixabay/alex_jauk-sudden-screaming-sound-193070.mp3');
    const jumpscare1 = new Audio('../sound/pixabay/kalsstockmedia-sudden-scary-jump-scare-effect-2-294237.mp3');
    const jumpscare2 = new Audio('../sound/pixabay/kalsstockmedia-horror-jump-scare-effect-3-250460.mp3');
    const jumpscare3 = new Audio('../sound/pixabay/kalsstockmedia-horror-jump-scare-effect-4-250459.mp3');
    let mooseTimer;

    function startTimer() {
        // console.log("Timer started...");
        mooseTimer = setTimeout(() => {
            if (moose_health > 15) {
                alert('You died!');
                window.location.href = 'https: //writerhaloscot.github.io/skinlessbark/';
            }
        }, 5000);
    }

    function stopTimer() {
        clearTimeout(mooseTimer);
        // console.log("Timer stopped!");
    }

    $('.wall, .floor, .ceiling').on('click', function (e) {
        $('html').removeClass().addClass('theme-gray');
    });

    $('.cpt').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const rand = Math.floor(Math.random() * 3) + 1;

        if (rand == 1) {
            $('.overlay, #moose').fadeIn();
            $('.moose-fight').css('display', 'flex');
            $('body').addClass('dead');
            $('.floor').addClass('blood');
            $('.moose-health-bar').removeAttr('style');
            $('.moose-health-bar').removeClass('mid').removeClass('low');
            moose_health = 100;
            const randomNumber = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
            moose_damage = randomNumber;

            if ($(this).hasClass('door')) {
                jumpscare1.play();
                jumpscare.play();
                $('html').removeClass().addClass('theme-green');
                $('#moose').removeClass().addClass('attack-door flicker');
            }
            if ($(this).hasClass('fire')) {
                jumpscare2.play();
                $('html').removeClass().addClass('theme-red');
                $('#moose').removeClass().addClass('attack-fire flicker');
            }
            if ($(this).hasClass('window')) {
                jumpscare3.play();
                $('html').removeClass().addClass('theme-blue');
                $('#moose').removeClass().addClass('attack-window flicker');
            }

            /* DIE IF DON'T KILL MOOSE IN 5 SECONDS */
            startTimer();
        } else {
            alert('You are safe! For now…');
        }
    });

    /* MOOSE HEALTH */
    $(document).on('keydown', function (e) {
        if (e.which === 72) {
            if ($('#moose').is(":visible")) {
                $('.moose-heart').trigger('click');
            }
        }
    });
    $('.moose-heart').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        kill_moose();
    });

    function kill_moose() {
        moose_health = moose_health - moose_damage;
        $('.moose-health-bar').css('width', moose_health + '%');
        if (moose_health <= 70 && moose_health >= 40) {
            $('.moose-health-bar').addClass('mid');
        }
        if (moose_health <= 39) {
            $('.moose-health-bar').removeClass('mid').addClass('low');
        }
        if (moose_health <= 5) {
            $('html').removeClass().addClass('theme-gray');
            $('.overlay, #moose, .moose-fight').fadeOut();
            $('#moose').removeClass();
            $('body').removeClass('dead');
            $('.moose-health-bar').removeAttr('style');
            stopTimer();
            alert('You survived!');
        }
    }

});
