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
			sld.innerHeight() + 8 >=  
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

    // arrow2

    var sld2 = $(".pergamena-content");
	
	function onArrow2() {
		if (sld2.scrollTop() + 
			sld2.innerHeight() + 8 >=  
			sld2[0].scrollHeight) { 
			$(".arrowcontainer2").hide();
		} else {
			$(".arrowcontainer2").show();
		}
	}
	
	var timeout2;
	var speed2 = 400;

	// Increment button
	$('.arrowcontainer2').on('mousedown mouseup mouseleave', e => {
	  if (e.type == "mousedown") {
		increment(speed);
	  } else {
		stop()
	  }
	});

	// Increment function
	function increment(speed) {
	  sld2.scrollTop(sld2.scrollTop()+15)
	  timeout2 = setTimeout(() => {
		increment(speed2*0.9);
	  }, speed2);
	}

	function stop() {
	  clearTimeout(timeout2);
	}
	
	sld2.on('scroll', function() { 
		onArrow2();
	}); 
    ///

	window.addEventListener("resize", onResize, {passive: false});

    var objNode = document.createElement("div");
    objNode.style.width  = "100vw";
    objNode.style.height = "100vh";
    document.body.appendChild(objNode);
    var intViewportWidth  = objNode.offsetWidth;
    var intViewportHeight = objNode.offsetHeight;
    document.body.removeChild(objNode);
    SetSize(intViewportHeight);

	onResize();
	
    function hashChanged() {
        if (window.location.hash=="#map") {
            swiper.slideTo(3);
        }
        else if (window.location.hash=="#play") {
            swiper.slideTo(1);
            window.showClient();
        }
        else if (window.location.hash=="#home") {
            swiper.slideTo(0);
        }
        else if (window.location.hash=="#forum") {
            swiper.slideTo(2);
        }
    };

    window.hashChanged = hashChanged;
    window.player = new rPlayer();
    window.playAudio = function() {
        eraseCookie("audiopaused");
        window.player.play("./sitefiles/music.mp3");
        window.player._audio.loop = true;
    };
    window.pauseAudio = function() {
        eraseCookie("audiopaused");
        createCookie("audiopaused", true, 30);
        window.player.pause();
    };

    window.audioForward = function() {
        let p = window.player;
        let t = p._audio.currentTime;
        let d = p._audio.duration;
        if (t < d) t+=(d/20);
        if (t >= d) t = d;
        p.currentTime = t;
    };

    window.audioPrev = function() {
        let p = window.player;
        let t = p._audio.currentTime;
        let d = p._audio.duration;
        if (t > 0) t-=(d/20);
        if (t <= 0) t = 0;
        p.currentTime = t;
    };

    $(".play-button").click(window.playAudio);
    $(".pause-button").click(window.pauseAudio);
    $(".next-button").click(window.audioForward);
    $(".prev-button").click(window.audioPrev);

    if (window.location.hash) window.needhashChanged = true;

    $("document").ready(function() {       
        swiper.slideTo(0);
        onResize();
        hashChanged();
        window.player.stop();
    });

    window.addEventListener("hashchange", hashChanged, false);

    setInterval(() => {
        if (window.player.playing) {
            $(".pause-button").show();
            $(".play-button").hide();
            $(".next-button").show();
            $(".prev-button").show();
        } else {
            $(".play-button").show();
            $(".pause-button").hide();
            $(".next-button").hide();
            $(".prev-button").hide();
        }
    }, 200);

    function getRenderedSize(contains, cWidth, cHeight, width, height, pos, pos2){
        var oRatio = width / height,
            cRatio = cWidth / cHeight;
        return function() {
          if (contains ? (oRatio > cRatio) : (oRatio < cRatio)) {
            this.width = cWidth;
            this.height = cWidth / oRatio;
          } else {
            this.width = cHeight * oRatio;
            this.height = cHeight;
          }      
          this.left = (cWidth - this.width)*(pos/100);
          this.right = this.width + this.left;
          this.top = (cHeight - this.height)*(pos2/100);
          this.bottom = this.height + this.top;
          return this;
        }.call({});
      }

    function getImgSizeInfo(img) {
        var pos = window.getComputedStyle(img).getPropertyValue('object-position').split(' ');
        return getRenderedSize(true,
                               img.width,
                               img.height,
                               img.naturalWidth,
                               img.naturalHeight,
                               parseInt(pos[0]), pos[1] ? parseInt(pos[1]):100);
      }

      window.getImgSizeInfo = getImgSizeInfo;

      var preventTimeout = 0;
      function preventMap(img) {
        $('.iv-image-view .map-selector').addClass('unhover');
        $(img).removeAttr("usemap");
        if (preventTimeout) {
            clearTimeout(preventTimeout);
        }
        preventTimeout = setTimeout(() => {
            $(img).attr("usemap","#image-map");
        }, 500);
      }

      var previousWidth = 4096;
      var previousLeft = 0;
      var previousTop = 0;
    window.ImageMap = function (map, img) {
        var n,
            areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = [];
        for (n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',');
        }
        this.resize = function () {
              var sizeInfo = (getImgSizeInfo(img));
              if (previousLeft != sizeInfo.left ||
                previousTop != sizeInfo.top ||
                sizeInfo.width!=previousWidth) {
                    $(this).removeClass("pergamena-visible");
                }
            if (sizeInfo.width==previousWidth) return;
            $(map).attr("")
            preventMap(img);
            var n, m, clen,
                x = sizeInfo.width / previousWidth;
            for (n = 0; n < len; n++) {
                clen = coords[n].length;
                for (m = 0; m < clen; m++) {
                    coords[n][m] *= x;
                }
                
                var tmp = [];
                for (m = 0; m < clen; m++) {
                    tmp[m] = coords[n][m];
                }
                tmp[0] += sizeInfo.left;
                tmp[1] += sizeInfo.top;
                areas[n].coords = tmp.join(',');
            }
            previousWidth = sizeInfo.width;
            previousLeft = sizeInfo.left;
            previousTop = sizeInfo.top;
            return true;
        };
        setInterval(this.resize, 200);
    }

    function checkImageLoaded() {
        var img = $('.iv-large-image');
        if (img.length<1) return;
        $('.iv-image-view').append("<div class='map-selector unhover'>");
        $('#image-map area').hover(
            function () { 
                if (img.attr("usemap")!="#image-map") {
                    $('.iv-image-view .map-selector').addClass("unhover");
                    return;
                }
                var coords = $(this).attr('coords').split(',');
                var sizeInfo = getImgSizeInfo(img[0]);
                var x = img[0].naturalWidth / sizeInfo.width;
                coords[0] = parseInt(coords[0])
                coords[1] = parseInt(coords[1])
                coords[2] = parseInt(coords[2])
                /*coords[0] /= x;
                coords[1] /= x;
                coords[2] /= x;*/

                coords[0] = parseInt(coords[0]) + img.position().left;
                coords[1] = parseInt(coords[1]) + img.position().top;

                var tmp = {
                    'left': (parseInt(coords[0])-parseInt(coords[2])/2),
                    'top': (parseInt(coords[1])-parseInt(coords[2])/2),
                    'right': (parseInt(coords[0])+parseInt(coords[2])/2),
                    'bottom': (parseInt(coords[1])+parseInt(coords[2])/2),
                    'borderradius': parseInt(parseInt(coords[2])),
                };
                tmp.width = tmp.right-tmp.left;
                tmp.height = tmp.bottom-tmp.top;
                $('.iv-image-view .map-selector').removeClass('unhover').css({
                    'left': tmp.left+'px',
                    'top': tmp.top + 'px',
                    'width': tmp.width + 'px',
                    'height': tmp.height + 'px',
                    'border-radius': tmp.borderradius+'px',
                })
            },
            function () { 
                $('.iv-image-view .map-selector').addClass('unhover');
            }
        )
        img.attr("usemap","#image-map");
        var imageMap = new window.ImageMap(document.getElementById('image-map'), img[0]);
        imageMap.resize();
        clearInterval(timeout);
    }
    $(".pergamena").on("mouseout", function(ev) {
        var e = ev.toElement || ev.relatedTarget;
        if (!e || e.parentNode == this || e == this) {
           return;
        }
        if ($(e).parents(".pergamena").length) {
            return;
        }
        $(this).removeClass("pergamena-visible");
    });

    $("area").click((ev) => {
        var pg = $(".pergamena");
        $(".pergamena-title", pg).html("<p>"+$(ev.target).attr("alt")+"</p>");
        $(".pergamena-content", pg).html("<p>Le descrizioni delle zone sono ancora in sviluppo</p><p>C'e' un palio di divini per chi scrive le descrizioni migliori delle aree e le manda a Traxter.</p><p><b>Torna a vedere in futuro quando sono finite.</b></p><p>E in bocca al lupo per il concorso!</p>");
        $(".pergamena-content").trigger("scroll");
        $(".pergamena-content")[0].scrollTop = 0;
        pg.removeClass("pergamena-visible")
        .css({'left':ev.clientX-pg.width()/2, 'top': ev.clientY-pg.height()/2})
        .addClass("pergamena-visible");
        return false;
    });

    $("area").bind('mousewheel', function(e){
        var img = $('.iv-large-image');
        preventMap(img);
    });

    var timeout = setInterval(checkImageLoaded, 500);
    /*$(".pergamena-content").each(function (element, node) { 
        new SimpleBar(node); 
    });*/
    
})(window);

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function playGame() {
    if (!window.player.playing && !readCookie("audiopaused")) {
        window.playAudio();
    }
    swiper.slideTo(1);history.replaceState(undefined, undefined, '#play');
}

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

window.showClient=function() {
	if ($("#gioco").find("iframe").length == 0) {
		var ifr = $('<iframe frameBorder="0" width="100%" height="100%" style="position:fixed;margin:0 !important;padding:0 !important;width: 100%;height:100%" src="/client/index.html?host=auto&rng=' + Math.ceil(Math.random() * 1000000) + '">Browser non compatibile. Usa Firefox o Chrome.</iframe>');
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
		let scrollbarsInitilized = false;
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
			init: function() { 
				if (window.needhashChanged == true) {
					window.needhashChanged = false;
					setTimeout(window.hashChanged, 500);
					return;
				}
			},
            onSlideChangeEnd: function() {
                if (window.swiper) $('.expanded-timeline__counter span:first-child').text(swiper.activeIndex + 1);
				if (window.swiper && window.swiper != undefined && window.swiper.activeIndex == 1) {
					$(".play-game").hide();
					window.showClient();
				} else {
					$(".play-game").show();
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