var uikit = {
  lg: "1450",
  md: "1200",
  sm: "992",
  xs: "640",
  xxs: "480",
  changeWindow: [],
  ww: function () {
    return $(window).width();
  },

  wh: function () {
    return $(window).height();
  },

  ///------------------------------------------------используются в текущем проекте-----------------------------------------------
  stepsQuiz() {
    $(".js-steps-quiz-next").click(function () {
      let cur = $(this).data("current");
      let next = $(this).data("step");
      let data = $(this).parents("form").serializeArray();
      if (uikit.changeWindow[cur - 1] === undefined) {
        uikit.changeWindow.push(data);
      } else {
        uikit.changeWindow[cur - 1] = data;
      }

      /* if() */

      $(".js-steps-quiz").removeClass("is-active");
      $(`#quiz-${next}`).addClass("is-active");
      console.log(uikit.changeWindow);
      return false;
    });

    $(".js-steps-quiz-submit").click(function () {
      return false;
    });
  },

  copyMaterial: function () {
    $(".js-copy-material, .js-copy-color").click(function () {
      let $text_copy = $(".js-data-material");
      let $temp = $("<input>");
      $("body").append($temp);
      $temp.val($text_copy.text()).select();
      document.execCommand("copy");
      $temp.remove();
    });
  },

  chengeColorPalette: function () {
    let id = undefined;
    let article = "";
    let color = "";
    //let id = undefined;
    $(".js-palette").click(function () {
      article = $(this).data("info");
      id = $(this).data("id");
      $(".js-palette").removeClass("is-active");
      $(this).addClass("is-active");
      if (id !== undefined) {
        $(".js-pallette-chenge img").attr("src", `images/color-sol-${id}.png`);
        $(".js-data-material").text(article);
        $(".js-data-material").attr("value", article);
      }

      $(".js-pallette-chenge img:not(.is-active)").attr(
        "src",
        `images/color-sol-${id}.png`
      );

      let a = $(".js-pallette-chenge img.is-active");
      let nota = $(".js-pallette-chenge img:not(.is-active)");
      a.removeClass("is-active");
      nota.addClass("is-active");
    });

    $(".js-palette-profile").click(function () {
      id = $(this).data("id");
      color = $(this).data("color");

      $(".js-palette-profile").removeClass("is-active");
      $(this).addClass("is-active");
      if (id !== undefined) {
        $(".js-pallette-profile-chenge img").attr(
          "src",
          `images/color-sol-${id}.png`
        );
        $(".js-data-color").text(color);
      }

      $(".js-pallette-profile-chenge img:not(.is-active)").attr(
        "src",
        `images/color-sol-second-img-${id}.png`
      );

      let a = $(".js-pallette-profile-chenge img.is-active");
      let nota = $(".js-pallette-profile-chenge img:not(.is-active)");
      a.removeClass("is-active");
      nota.addClass("is-active");
    });
  },

  //-----------------------------------------------------------------------------------------------------------------------------

  validation: function () {
    var classValidate = "is-validate",
      classParent = ".form-group",
      classError = "is-error";

    function error(el) {
      $(el)
        .addClass(classError)
        .removeClass(classValidate)
        .closest(classParent)
        .addClass(classError)
        .removeClass(classValidate);
    }

    function validate(el) {
      $(el)
        .removeClass(classError)
        .addClass(classValidate)
        .closest(classParent)
        .removeClass(classError)
        .addClass(classValidate);
    }

    function reset(el) {
      $(el)
        .removeClass(classValidate + " " + classError)
        .closest(classParent)
        .removeClass(classError)
        .removeClass(classValidate + " " + classError);
    }
    $(".form-control").focus(function () {
      reset($(this));
    });
    $("select").change(function () {
      reset($(this));
    });
    $('input[type="checkbox"], input[type="radio"]').change(function () {
      reset($(this));
    });

    function checkInput(el) {
      var $form = $(el);

      $form.find(".is-error").removeClass("is-error"); //.each(function(){
      //$(this).removeClass('is-error');
      //console.log("!"+$form.find('.is-error').length+"!");
      //});

      $form.find("select.js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      $form.find("input[type=tel].js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      $form.find("input[type=email].js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      $form.find("input[type=text].js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      $form.find("input[type=password].js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      if ($(".js-pass1", $form).length != 0) {
        var pass01 = $form.find(".js-pass1").val();
        var pass02 = $form.find(".js-pass2").val();
        if (pass01 == pass02) {
          validate($(".js-pass1, .js-pass2", $form));
        } else {
          error($(".js-pass1, .js-pass2", $form));
        }
      }
      $form.find("textarea.js-required").each(function () {
        if ($(this).val() != "") {
          validate($(this));
        } else {
          error($(this));
        }
      });
      $form.find("input[type=email]").each(function () {
        var regexp =
          /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        var $this = $(this);
        if ($this.hasClass("js-required")) {
          if (regexp.test($this.val())) {
            validate($this);
          } else {
            error($this);
          }
        } else {
          if ($this.val() != "") {
            if (regexp.test($this.val())) {
              validate($this);
            } else {
              error($this);
            }
          } else {
            reset($this);
          }
        }
      });

      $form.find("input[type=checkbox].js-required").each(function () {
        if ($(this).is(":checked")) {
          validate($(this));
        } else {
          error($(this));
          $(this).parent().addClass("is-error");
        }
      });

      var radios = [];
      $form.find("input[type=radio]:required").each(function () {
        var name = $(this).attr("name");

        if (radios.indexOf(name) == -1) {
          radios.push(name);
          var result = false;
          $form.find("input[name=" + name + "].js-required").each(function () {
            if ($(this).is(":checked")) {
              result = true;
            }
          });
          if (result == true) {
            validate($(this));
            return false;
          } else {
            //console.log(radios);
            $form
              .find("input[name=" + name + "].js-required")
              .addClass(classError);
            error($(this));
          }
        }
      });
    }

    $(".js-edit-input").click(function () {
      $(this)
        .parents(".input")
        .removeClass("is-disabled")
        .find("input, textarea")
        .prop("disabled", false);
      return false;
    });

    $(".js-submit").click(function () {
      var $form = $(this).closest("form");
      checkInput($form);
      var errors = $form.find(".is-error:visible").length;
      //console.log(errors);
      if (errors) {
        return false;
      } else if (
        $(this).data("href") != "" &&
        $(this).data("href") != undefined
      ) {
        // Открытие попапа после отправки формы.

        if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
          var href = $(this).attr("href");
        } else {
          var href = $(this).data("href");
        }
        if ($(this).data("media") == "lg" && uikit.ww() <= uikit.md) {
          return false;
        }

        var bodyWidth = $("body").width();

        $("body, html").addClass("overflow");

        if (bodyWidth - uikit.ww() < 0) {
          //$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
        }

        //$(".mobile-menu").removeClass("active");

        $(".popup").removeClass("active");
        $(href).addClass("active");

        return false;
      }
    });
  },

  tabs: function () {
    $("[data-tab]").click(function (e) {
      e.preventDefault();
      let tab =
        typeof $(this).attr("href") != "undefined" ?
        $(this).attr("href") :
        $(this).attr("data-tab");
      if (typeof $(this).attr("data-parent") != "undefined") {
        $('[href="' + tab + '"], [data-tab="' + tab + '"]')
          .closest($(this).attr("data-parent"))
          .addClass("is-active")
          .siblings()
          .removeClass("is-active");
      } else {
        $(this).addClass("is-active").siblings().removeClass("is-active");
      }
      $(tab).addClass("is-visible").siblings().removeClass("is-visible");
    });

    $(".js-tab-nav").click(function (e) {
      e.preventDefault();
      var href = $(this).attr("href");
      $(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass(
        "is-active"
      );
      $(this).parent().addClass("is-active");
      $(href).addClass("is-active");
    });

    $(".js-tab-show").click(function (e) {
      //alert();
      //console.log("#"+$(this).val());

      if ($(this).attr("href") != undefined) {
        //e.preventDefault();
      }
      var href =
        $(this).attr("href") != undefined ?
        $(this).attr("href") :
        "#" + $(this).val();
      var nav_id = $(this).data("navid");
      $(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass(
        "is-active"
      );
      $(nav_id).addClass("is-active");
      $(href).addClass("is-active");
    });
    //$(".js-tab-show").che
  },

  popups: function () {
    $(document).on("click", ".js-popup-show", function () {
      if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
        var href = $(this).attr("href");
      } else {
        var href = $(this).data("href");
      }
      if ($(this).data("media") == "lg" && uikit.ww() <= uikit.md) {
        return false;
      }

      var bodyWidth = $("body").width();

      $("body, html").addClass("overflow");

      if (bodyWidth - uikit.ww() < 0) {
        //$('body').css('padding-right',((bodyWidth - uikit.ww())* -1)+'px');
      }

      //$(".mobile-menu").removeClass("active");

      $(".popup").removeClass("active");
      $(href).addClass("active");

      return false;
    });

    $(".js-popup-hide").click(function () {
      $(".popup").removeClass("active");
      $("body, html").css("padding-right", 0).removeClass("overflow");
      return false;
    });
  },

  lazy: function () {
    function logElementEvent(eventName, element) {}
    var callback_enter = function (element) {};
    var callback_exit = function (element) {};
    var callback_loading = function (element) {};
    var callback_loaded = function (element) {};
    var callback_error = function (element) {};
    var callback_finish = function () {};
    var callback_cancel = function (element) {};

    var lazyLoadOb = new LazyLoad({
      class_applied: "lz-applied",
      class_loading: "lz-loading",
      class_loaded: "lz-loaded",
      class_error: "lz-error",
      class_entered: "lz-entered",
      class_exited: "lz-exited",
      // Assign the callbacks defined above
      callback_enter: callback_enter,
      callback_exit: callback_exit,
      callback_cancel: callback_cancel,
      callback_loading: callback_loading,
      callback_loaded: callback_loaded,
      callback_error: callback_error,
      callback_finish: callback_finish,
    });
    lazyLoadOb.update();
  },

  fancybox: function () {
    $(".js-fancybox, .fancybox").fancybox({
      // Options will go here
      iframe: {
        preload: false,
      },
    });
  },

  mobile: function () {
    $(".js-mobile-menu-toggle").click(function () {
      $(this).toggleClass("active");
      $("body").toggleClass("overflow");

      $(".js-mobile-menu").slideToggle();

      /* $(document).mouseup(function (e) { // событие клика по веб-документу
				var div = $('.js-menu-toggle').parent(); // тут указываем ID элемента
				if (!div.is(e.target) // если клик был не по нашему блоку
					&& div.has(e.target).length === 0) { // и не по его дочерним элементам
					div.removeClass('hover'); // скрываем его
					$('body').removeClass('overflow');
				}
			}); */

      return false;
    });
  },

  scrollTo: function () {
    $(".js-scroll-to").click(function () {
      var href = $(this).attr("href");
      $("html, body").animate({
          scrollTop: $(href).offset().top,
        },
        400
      );
      return false;
    });
  },

  sliders: function () {
    var ww = this.ww();
    var wh = this.wh();
    var lg = this.lg;
    var md = this.md;
    var sm = this.sm;
    var xs = this.xs;
    var xxs = this.xxs;

    var swiper = new Swiper(".mySwiper", {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      initialSlide: 2,
      coverflowEffect: {
        rotate: 50,
        stretch: 60,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    if ($('.js-slider-product').length) {
      $('.js-slider-product').each(function () {
        var $this = $(this);

        $this.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
          arrows: true,
          dots: false,
          infinite: true,
          adaptiveHeight: true,
          autoplay: false,
          autoplaySpeed: 2000,
          lazyLoad: 'progressive',
          prevArrow: '<a href="#" class="product-block__prev slick-arrow slick-prev" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          nextArrow: '<a href="#" class="product-block__next slick-arrow slick-next" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          responsive: [{
            breakpoint: xs,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });

      });

      $('.js-team-slider-prev').click(function () {
        $('.js-team-slider').slick('slickPrev');
        return false;
      });
      $('.js-team-slider-next').click(function () {
        $('.js-team-slider').slick('slickNext');
        return false;
      });

    }

    if ($('.js-slider-object').length) {
      $('.js-slider-object').each(function () {
        var $this = $(this);

        $this.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
          arrows: true,
          dots: false,
          infinite: true,
          adaptiveHeight: true,
          autoplay: false,
          autoplaySpeed: 2000,
          lazyLoad: 'progressive',
          prevArrow: '<a href="#" class="object-block__prev slick-arrow slick-prev" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          nextArrow: '<a href="#" class="object-block__next slick-arrow slick-next" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          responsive: [{
            breakpoint: xs,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });

      });

      $('.js-team-slider-prev').click(function () {
        $('.js-team-slider').slick('slickPrev');
        return false;
      });
      $('.js-team-slider-next').click(function () {
        $('.js-team-slider').slick('slickNext');
        return false;
      });

    }

    if ($('.js-slider-head').length) {
      $('.js-slider-head').each(function () {
        var $this = $(this);

        $this.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
          arrows: true,
          dots: false,
          infinite: true,
          adaptiveHeight: true,
          autoplay: false,
          autoplaySpeed: 2000,
          lazyLoad: 'progressive',
          prevArrow: '<a href="#" class="head-section__prev slick-arrow slick-prev" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          nextArrow: '<a href="#" class="head-section__next slick-arrow slick-next" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          responsive: [{
            breakpoint: xs,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });

      });

      $('.js-team-slider-prev').click(function () {
        $('.js-team-slider').slick('slickPrev');
        return false;
      });
      $('.js-team-slider-next').click(function () {
        $('.js-team-slider').slick('slickNext');
        return false;
      });

    }

    if ($('.js-slider-head').length) {
      $('.js-slider-head').each(function () {
        var $this = $(this);

        $this.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
          arrows: true,
          dots: false,
          infinite: true,
          adaptiveHeight: true,
          autoplay: false,
          autoplaySpeed: 2000,
          lazyLoad: 'progressive',
          prevArrow: '<a href="#" class="head-section__prev slick-arrow slick-prev" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          nextArrow: '<a href="#" class="head-section__next slick-arrow slick-next" tabindex="-1"><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2894_13921)"><rect width="48" height="49" rx="24" fill="white" fill-opacity="0.2"/><path d="M4.90909 8.90909L30 24.5L4.90909 40.0909L-20.1818 24.5L4.90909 8.90909Z" fill="#E40032"/></g><defs><clipPath id="clip0_2894_13921"><rect width="48" height="49" rx="24" fill="white"/></clipPath></defs></svg></a>',
          responsive: [{
            breakpoint: xs,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        });

      });

      $('.js-team-slider-prev').click(function () {
        $('.js-team-slider').slick('slickPrev');
        return false;
      });
      $('.js-team-slider-next').click(function () {
        $('.js-team-slider').slick('slickNext');
        return false;
      });

    }

  },

  searchBlock: function () {
    $(".js-search-toggle").click(function () {
      if ($(this).hasClass("is-disabled") == true) {
        $(this)
          .removeClass("is-disabled")
          .parents(".js-search-block")
          .addClass("is-active");

        $(document).click(function (e) {
          // событие клика по веб-документу
          var div = $(".js-search-block"); // тут указываем ID элемента
          if (
            !div.is(e.target) && // если клик был не по нашему блоку
            div.has(e.target).length === 0
          ) {
            // и не по его дочерним элементам
            div.removeClass("is-active"); // скрываем его
            div.find(".js-search-toggle").addClass("is-disabled");
          }
        });
        console.log(1);
        return false;
      } else {
        $(this)
          .addClass("is-disabled")
          .parents(".js-search-block")
          .removeClass("is-active");

        return true;
      }
    });
  },

  niceSelect: function () {
    $('select').niceSelect();
    //$('.nice-select .list').mCustomScrollbar();
  },

  accardion: function () {
    $('.js-accardion-toggle').click(function () {
      $(this).toggleClass('is-active').next().toggleClass('is-active');
      return false;
    });
  },
  
  selectsSorting: function () {
    let arr = [];
    $('.js-select-sorting').on('change', 'select', function () {
      let sortBy = $(this).val();
      let list = '<ul>';

      if (arr.length >= 1) {
  
        if (arr.includes(sortBy)) {
          return false
        } else {
          arr.push(sortBy)
        }
  
      } else {
        arr.push(sortBy)
      }
      console.log(arr)

      arr.forEach(function(item, i, arr) {
        list += `<li id=${i}>`+item+'<svg class="selects-section__close js-close-option" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L12.5 12.5" stroke="black" stroke-linecap="round"/><path d="M12.5 0.5L0.5 12.5" stroke="black" stroke-linecap="round"/></svg>'+'</li>';
      });

      $('.js-select-sorting-options').html(list)
    });

    $(function() {
        $(document).on('click touchstart', '.js-close-option', function(){ 
          let list = '<ul>';

          let id = $(this).parent('li').attr('id');
          arr.splice(id, 1);
           arr.forEach(function(item, i, arr) {
            list += `<li id=${i}>`+item+'<svg class="selects-section__close js-close-option" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.5L12.5 12.5" stroke="black" stroke-linecap="round"/><path d="M12.5 0.5L0.5 12.5" stroke="black" stroke-linecap="round"/></svg>'+'</li>';
          });

          $('.js-select-sorting-options').html(list)
        });
    });
  },

  mainInit: function () {
    this.lazy();
    //this.validation();
    this.copyMaterial();
    this.fancybox();
    this.popups();
    this.chengeColorPalette();
    this.mobile();
    this.scrollTo();
    this.searchBlock();
    this.stepsQuiz();
    this.niceSelect();
    this.accardion();
    this.sliders();
    this.selectsSorting();
  },
};
$(document).ready(function () {
  uikit.mainInit();
});
var clrTimeOut;
$(window).on("load", function (e) {
  clearTimeout(clrTimeOut);
  clrTimeOut = setTimeout(function () {}, 200);
});

$(window).resize(function () {
  clearTimeout(clrTimeOut);
  clrTimeOut = setTimeout(function () {}, 200);
});

$(window).scroll(function () {
  //uikit.headerFixed();
});