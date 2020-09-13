(function(window) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    // All Funtions
    PageTransition();
    Menu();
    HomeSlider();
    Sort();
    UniteGallery();
    ValidForm();
	//window.scrollTo(0,1);
	function preventBehavior(e) {
		e.preventDefault(); 
	};

	var Body = $("#Body");
	
	function SetSize(h) {
		Body.height(h);
		$(".swiper-container").height(h);
		$(".swiper-wrapper").height(h);
		$(".swiper-slide").height(h);
		//alert(" Height: "+ Body.height());
	}
	
	var sld = $(".swiper-slide-active .slider-box");
	
	function onResize() {
		SetSize(document.documentElement.clientHeight);
		onArrow();
	}
	
	function onArrow() {
		if (sld.scrollTop() + 
			sld.innerHeight() >=  
			sld[0].scrollHeight) { 
			$(".arrowcontainer").hide();
		} else {
			$(".arrowcontainer").show();
		}
	}
	
	var timeout;
	var speed = 400;

	// Increment button
	$('.arrowcontainer').on('mousedown mouseup mouseleave', e => {
	  if (e.type == "mousedown") {
		increment(speed);
	  } else {
		stop()
	  }
	});

	// Increment function
	function increment(speed) {
	  sld.scrollTop(sld.scrollTop()+15)
	  timeout = setTimeout(() => {
		increment(speed*0.9);
	  }, speed);
	}

	function stop() {
	  clearTimeout(timeout);
	}
	
	sld.on('scroll', function() { 
		onArrow();
	}); 

	//document.addEventListener("touchmove", preventBehavior, {passive: false});
	//document.body.addEventListener("touchmove", preventBehavior, {passive: false});

	window.addEventListener("resize", onResize, {passive: false});

var objNode = document.createElement("div");
objNode.style.width  = "100vw";
objNode.style.height = "100vh";
document.body.appendChild(objNode);
var intViewportWidth  = objNode.offsetWidth;
var intViewportHeight = objNode.offsetHeight;
document.body.removeChild(objNode);
//alert("Width: " + intViewportWidth + " Height: "+ intViewportHeight);
SetSize(intViewportHeight);
	onResize();
	
function hashChanged() {
	if (window.location.hash=="#map") {
		swiper.slideTo(3);
	}
	else if (window.location.hash=="#play") {
		swiper.slideTo(1);
	}
	else if (window.location.hash=="#home") {
		swiper.slideTo(0);
	}
};

$("document").ready(function() {
	hashChanged();
});

window.addEventListener("hashchange", hashChanged, false);

})(window);

/*------------------
 Page Transition
-------------------*/
function PageTransition() {
    var preload = anime({
        targets: '.ms-preloader',
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function(preload) {
            $('.ms-preloader').css('visibility', 'hidden');
        }
    });
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function(preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function(e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '' && url != undefined) {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function(preload) {
                    window.location.href = url;
                }
            });
        } else if (url == undefined) {
            $('.hamburger').toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
		}
    });
}

/*------------------
 Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function(e) {
            var burger = $(this),
                clicked = parseInt(burger.data('clicked')) || 0;
            burger.data('clicked', clicked + 1);
            if (clicked % 2 == 0) {
                var current = $(window).scrollTop();
                $(window).scroll(function() {
                    $(window).scrollTop(current);
                });
            } else {
                $(window).off('scroll');
            }
            $(burger).toggleClass('is-active');
			var isActive = $(burger).hasClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
			$('.ms-nav > a').prop('disabled', !isActive);
        });
    }
}

/*------------------
   Home Slider
-------------------*/
function HomeSlider() {
    if ($.exists('.swiper-container')) {
        var interleaveOffset = -.6;
        var interleaveEffect = {
            onProgress: function(swiper, progress) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var translate, innerTranslate;
                    progress = slide.progress;
                    if (progress > 0) {
                        translate = progress * swiper.width;
                        innerTranslate = translate * interleaveOffset;
                    } else {
                        innerTranslate = Math.abs(progress * swiper.width) * interleaveOffset;
                        translate = 0;
                    }
                    $(slide).css({
                        transform: 'translate3d(' + translate + 'px,0,0)'
                    });
                    $(slide).find('.slide-inner').css({
                        transform: 'translate3d(' + innerTranslate + 'px,0,0)',
                    });
                }
            },
            onTouchStart: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i]).css({
                        transition: ''
                    });
                }
            },
            onSetTransition: function(swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.slide-inner')
                        .addBack()
                        .css({
                            transition: speed + 'ms'
                        });
                }
            }
        };
		
        var swiperOptions = {
            loop: false,
            speed: 1000,
            grabCursor: false,
            watchSlidesProgress: true,
            mousewheelControl: false,
            keyboardControl: false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            simulateTouch: true,
            pagination: '.swiper-pagination',
			direction: "horizontal",
			allowTouchMove: false,
			allowSlidePrev: false,
			allowSlideNext: false,
			shortSwipes: false,
			longSwipes: false,
			swipeHandler: "null",
			simulateTouch: true,
			touchMoveStopPropagation: true,
			passiveListeners: false,
			runCallbacksOnInit: true,
			observer: true,
            observeParents: true,
			initialSlide: 2,
			fadeEffect: { crossFade: true },
			slidesPerView: 1,
            paginationType: 'progress',
            onSlideChangeEnd: function() {
                if (window.swiper) $('.expanded-timeline__counter span:first-child').text(swiper.activeIndex + 1);
				if (window.swiper && window.swiper != undefined && window.swiper.activeIndex == 1) {
					$(".ms-logo").hide();
					if ($("#gioco").find("iframe").length == 0) {
						var ifr = $('<iframe frameBorder="0" width="100%" height="100%" src="/client/index.html?host=auto&rng=' + Math.ceil(Math.random() * 1000000) + '">Browser non compatibile. Usa Firefox o Chrome.</iframe>');
						var focusWhenReady = function(){
							var iframe = ifr[0],
							doc = iframe.contentDocument || iframe.contentWindow.document;
							if (doc.readyState == "complete") {
								iframe.contentWindow.focus();
								$(iframe).contents().find("#cmdInput").focus(); 
							} else {
								setTimeout(focusWhenReady, 100)
							}
						}
						ifr.appendTo($("#gioco"));
						setTimeout(focusWhenReady, 100);
					}
				} else {
					$(".ms-logo").show();
				}
            }
        };
        swiperOptions = $.extend(swiperOptions, interleaveEffect);
        var swiper = new Swiper('.swiper-container', swiperOptions);
		swiper.allowTouchMove = false;
		swiper.allowSlidePrev = false;
		swiper.allowSlideNext = false;
		swiper.simulateTouch = true;
		swiper.touchMoveStopPropagation = true;
		swiper.passiveListeners = false;
        $('.expanded-timeline__counter span:first-child').text('1');
        $('.expanded-timeline__counter span:last-child').text(swiper.slides.length);
		window.swiper = swiper;
		swiper.slideTo(0);
    }
}

/*------------------
 Sort
-------------------*/
function Sort() {
    if ($.exists('.filtr-container')) {
        $('.filtr-container').filterizr();
        $('.filtr-btn li').on('click', function() {
            $('.filtr-btn li').removeClass('active');
            $(this).addClass('active');
        });
    }
}
/*------------------
 Unite-Gallery
-------------------*/
function UniteGallery() {
    if ($.exists('#gallery')) {
        $('#gallery').unitegallery({
            gallery_theme: 'tiles',
            tiles_type: "justified",
            tiles_col_width: 400,
            tiles_justified_row_height: 400,
            tiles_justified_space_between: 30,
            // tile_overlay_color: "#000",
            tile_overlay_opacity: 0.7,
            tile_enable_icons: false,
            tile_textpanel_position: "inside_bottom",
        });
    }
}
/*------------------
 Form Validation
-------------------*/
function ValidForm() {
    if ($.exists('#validForm')) {
        $('.form-control').focus(function() {
            $(this).prev('.control-label').addClass('active');
        });
        $('.form-control').focusout(function() {
            $(this).prev('.control-label').removeClass('active');
        });
        $("#validForm").validate({
            ignore: ":hidden",
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 16,
                },
                email: {
                    required: true,
                    email: true,
                },
                subject: {
                    required: true,
                    minlength: 4,
                    maxlength: 32,
                },
                message: {
                    required: true,
                    minlength: 16,
                },
            },
            messages: {
                name: {
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 24</span>",
                },
                email: {
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                subject: {
                    required: "<span>Please enter your subject</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                message: {
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "contact.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        // do something
                    },
                    success: function(data) {
                        if (data == "Email sent!");
                        $('input, textarea').val('');
                        $('.form-group').blur();
                        // do something
                    }
                });
                return false;
            }
        });
    }
}