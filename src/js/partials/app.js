var uikit = {
	lg: '1450',
	md: '1200',
	sm: '992',
	xs: '640',
	xxs: '480',
	ww: function () {
		return $(window).width();
	},

	wh: function () {
		return $(window).height();
	},

	mask: function () {
		$("input[type='tel']").mask('+7 (000) 000-0000', {
			placeholder: '+7 (___) ___-____'
		});
		$("input.js-mask-sms").mask('0 0 0 0 0 0', {
			placeholder: '_ _ _ _ _ _'
		});
	},

	niceSelect: function () {
		$('select').niceSelect();
		$('.nice-select .list').mCustomScrollbar();
	},

	niceSelectUpdate: function () {
		$('select').niceSelect('update');
		$('.nice-select .list').mCustomScrollbar();
	},



	/* headerFix: function () {
		var scroller = 0;
		var hpos = hpos = $('.header__bottom').offset().top;
		$(document).scroll(function () {
			scroller = $('html,body').scrollTop();

			console.log(scroller >= hpos);
			if (scroller >= hpos) {
				$('.header').height($('.header').height());
				$('.header__bottom').addClass('fixed');
			} else {
				$('.header').attr('style', '');
				$('.header__bottom').removeClass('fixed');
			}
		});

	}, */

	///------------------------------------------------используются в текущем проекте-----------------------------------------------
	chengeColorPalette: function () {
		let id = undefined;
		//let id = undefined;
		$('.js-palette').click(function () {

			id = $(this).data('id');
			$('.js-palette').removeClass('is-active');
			$(this).addClass('is-active');
			if (id !== undefined) {
				$(".js-pallette-chenge img").attr("src", `images/color-sol-${id}.png`);
			}

			$(".js-pallette-chenge img:not(.is-active)").attr("src", `images/color-sol-${id}.png`);

			// setTimeout(function () {
			// 	var a = $('.js-pallette-chenge img.is-active');
			// 	var nota = $('.js-pallette-chenge img:not(.is-active)');
			// 	a.removeClass('is-active');
			// 	nota.addClass('is-active');
			// }, 1000);
			let a = $('.js-pallette-chenge img.is-active');
			let nota = $('.js-pallette-chenge img:not(.is-active)');
			a.removeClass('is-active');
			nota.addClass('is-active');
		});

		$('.js-palette-profile').click(function () {

			id = $(this).data('id');
			$('.js-palette-profile').removeClass('is-active');
			$(this).addClass('is-active');
			if (id !== undefined) {
				$(".js-pallette-profile-chenge img").attr("src", `images/color-sol-${id}.png`);
			}

			$(".js-pallette-profile-chenge img:not(.is-active)").attr("src", `images/color-sol-second-img-${id}.png`);

			// setTimeout(function () {
			// 	var a = $('.js-pallette-chenge img.is-active');
			// 	var nota = $('.js-pallette-chenge img:not(.is-active)');
			// 	a.removeClass('is-active');
			// 	nota.addClass('is-active');
			// }, 1000);
			let a = $('.js-pallette-profile-chenge img.is-active');
			let nota = $('.js-pallette-profile-chenge img:not(.is-active)');
			a.removeClass('is-active');
			nota.addClass('is-active');
		});

		// let id = undefined;
		// $('#js-palette').click(function () {
		// 	console.log($(this).dataset.id)
		// 	id = e.target.dataset.id
		// 	$('#js-palette').children('img.is-active').removeClass('is-active');
		// 	e.target.classList.add('is-active')
		// 	if(id != undefined) {
		// 		$('.js-pallette-chenge img').attr("src", `images/color-sol-${e.target.dataset.id}.png`)
		// 	}
		// 	// console.log(src)
		// })
	},
	///-----------------------------------------------------------------------------------------------------------------------------

	countBlock: function () {
		// Количество +-
		$(".js-count-plus").click(function () {
			var count = $(this).parent().children('input').val();
			$(this).parent().children('input').val(++count);
			return false;
		});

		$(".js-count-minus").click(function () {
			var tempCount = $(this).parent().children('input').val();
			var count = (--tempCount <= 1) ? 1 : tempCount;

			$(this).parent().children('input').val(count);
			return false;
		});
	},
	upload: function () {

		function formatSize(length) {
			var i = 0,
				type = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];
			while ((length / 1000 | 0) && i < type.length - 1) {
				length /= 1024;
				i++;
			}
			return length.toFixed(2) + ' ' + type[i];
		}


		// File Upload
		$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
			var fileIdCounter = 0;

			this.parents('.js-files-form').find(".js-file-input").change(function (evt) {
				var output = [];

				for (var i = 0; i < evt.target.files.length; i++) {
					fileIdCounter++;
					var file = evt.target.files[i];
					var fileId = sectionIdentifier + fileIdCounter;

					filesToUpload.push({
						id: fileId,
						file: file
					});

					var size = uikit.formatSize(file.size);
					var removeLink = "<a class=\"js-file-delete upload-block__result-close\" href=\"#\" data-fileid=\"" + fileId + "\"><svg class=\"icon icon_close\"><use xlink:href=\"images/sprite-svg.svg#close\"></use></svg></a>";

					output.push("<div class=\"upload-block__result-item\"><svg class=\"icon icon_close upload-block__result-icon\"><use xlink:href=\"images/sprite-svg.svg#list\"></use></svg>", "<span>", escape(file.name), "</span>",
						"<span class=\"upload-block__result-size\">", size, "</span>",
						removeLink, "</div>");
				};

				$(this).parents('.js-files-form').find(".js-files-list")
					.append(output.join(""));

				//reset the input to null - nice little chrome bug!
				evt.target.value = null;
			});

			$(document).on("click", ".js-file-delete", function (e) {
				e.preventDefault();

				var fileId = $(this).parent().children("a").data("fileid");

				// loop through the files array and check if the name of that file matches FileName
				// and get the index of the match
				for (var i = 0; i < filesToUpload.length; ++i) {
					if (filesToUpload[i].id === fileId)
						filesToUpload.splice(i, 1);
				}

				$(this).parent().remove();
			});

			this.clear = function () {
				for (var i = 0; i < filesToUpload.length; ++i) {
					if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
						filesToUpload.splice(i, 1);
				}

				$(this).children(".js-files-list").empty();
			}

			return this;
		};

		(function () {
			var filesToUpload = [];

			var files1Uploader = $(".js-file-input").fileUploader(filesToUpload, "files1");
			//var files2Uploader = $("#files2").fileUploader(filesToUpload, "files2");
			//var files3Uploader = $("#files3").fileUploader(filesToUpload, "files3");

			$(document).on('click', '.js-upload-btn', function (e) {
				e.preventDefault();

				var formData = new FormData();

				for (var i = 0, len = filesToUpload.length; i < len; i++) {
					formData.append("files", filesToUpload[i].file);
				}

				$.ajax({
					url: "http://requestb.in/1k0dxvs1",
					data: formData,
					processData: false,
					contentType: false,
					type: "POST",
					success: function (data) {
						alert("DONE");

						files1Uploader.clear();
						files2Uploader.clear();
						files3Uploader.clear();
					},
					error: function (data) {
						alert("ERROR - " + data.responseText);
					}
				});
			});
		})()
	},

	/* customScroll: function () {
		$('.js-custom-scroll').mCustomScrollbar();
	}, */

	validation: function () {
		var
			classValidate = 'is-validate',
			classParent = '.form-group',
			classError = 'is-error';

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
				.removeClass(classValidate + ' ' + classError)
				.closest(classParent)
				.removeClass(classError)
				.removeClass(classValidate + ' ' + classError)
		}
		$('.form-control').focus(function () {
			reset($(this))
		});
		$('select').change(function () {
			reset($(this))
		});
		$('input[type="checkbox"], input[type="radio"]').change(function () {
			reset($(this))
		});

		function checkInput(el) {
			var $form = $(el);

			$form.find('.is-error').removeClass('is-error'); //.each(function(){
			//$(this).removeClass('is-error');
			//console.log("!"+$form.find('.is-error').length+"!");
			//});

			$form.find('select.js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=tel].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=email].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=text].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=password].js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			if ($('.js-pass1', $form).length != 0) {
				var pass01 = $form.find('.js-pass1').val();
				var pass02 = $form.find('.js-pass2').val();
				if (pass01 == pass02) {
					validate($('.js-pass1, .js-pass2', $form));
				} else {
					error($('.js-pass1, .js-pass2', $form));
				}
			}
			$form.find('textarea.js-required').each(function () {
				if ($(this).val() != '') {
					validate($(this));
				} else {
					error($(this));
				}
			});
			$form.find('input[type=email]').each(function () {
				var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
				var $this = $(this);
				if ($this.hasClass('js-required')) {
					if (regexp.test($this.val())) {
						validate($this);
					} else {
						error($this);
					}
				} else {
					if ($this.val() != '') {
						if (regexp.test($this.val())) {
							validate($this);
						} else {
							error($this);
						}
					} else {
						reset($this)
					}
				}
			});

			$form.find('input[type=checkbox].js-required').each(function () {

				if ($(this).is(':checked')) {
					validate($(this));
				} else {
					error($(this));
					$(this).parent().addClass('is-error');
				}
			});

			var radios = [];
			$form.find('input[type=radio]:required').each(function () {
				var name = $(this).attr('name');

				if (radios.indexOf(name) == -1) {

					radios.push(name);
					var result = false;
					$form.find('input[name=' + name + '].js-required').each(function () {

						if ($(this).is(':checked')) {
							result = true;
						}
					});
					if (result == true) {
						validate($(this));
						return false;
					} else {
						//console.log(radios);
						$form.find('input[name=' + name + '].js-required').addClass(classError);
						error($(this));
					}
				}
			});
		}

		$('.js-edit-input').click(function () {
			$(this).parents('.input').removeClass('is-disabled').find('input, textarea').prop('disabled', false);
			return false;
		});

		$('.js-submit').click(function () {
			var $form = $(this).closest('form');
			checkInput($form);
			var errors = $form.find('.is-error:visible').length;
			//console.log(errors);
			if (errors) {
				return false;
			} else if ($(this).data('href') != "" && $(this).data('href') != undefined) {

				// Открытие попапа после отправки формы.

				if ($(this).attr("href") != "" && $(this).attr("href") != undefined) {
					var href = $(this).attr("href");
				} else {
					var href = $(this).data("href");
				}
				if ($(this).data('media') == "lg" && uikit.ww() <= uikit.md) {
					return false;
				}

				var bodyWidth = $('body').width();

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
		$('[data-tab]').click(function (e) {
			e.preventDefault();
			let tab = typeof ($(this).attr('href')) != 'undefined' ? $(this).attr('href') : $(this).attr('data-tab');
			if (typeof ($(this).attr('data-parent')) != 'undefined') {
				$('[href="' + tab + '"], [data-tab="' + tab + '"]').closest($(this).attr('data-parent')).addClass('is-active').siblings().removeClass('is-active');
			} else {
				$(this).addClass('is-active').siblings().removeClass('is-active');
			}
			$(tab).addClass('is-visible').siblings().removeClass('is-visible');
		});

		$(".js-tab-nav").click(function (e) {
			e.preventDefault();
			var href = $(this).attr("href");
			$(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
			$(this).parent().addClass("is-active");
			$(href).addClass("is-active");
		});

		$(".js-tab-show").click(function (e) {
			//alert(); 
			//console.log("#"+$(this).val()); 

			if ($(this).attr('href') != undefined) {

				//e.preventDefault(); 
			}
			var href = ($(this).attr("href") != undefined) ? $(this).attr("href") : "#" + $(this).val();
			var nav_id = $(this).data("navid");
			$(".tabs__nav__item, .tabs__nav-item, .tabs__body").removeClass("is-active");
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
			if ($(this).data('media') == "lg" && uikit.ww() <= uikit.md) {
				return false;
			}

			var bodyWidth = $('body').width();

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
			$("body, html").css('padding-right', 0).removeClass("overflow");
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
		var callback_cancel = function (element) {

		};

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
			callback_finish: callback_finish
		});
		lazyLoadOb.update();
	},

	sliders: function () {
		var ww = this.ww();
		var wh = this.wh();
		var lg = this.lg;
		var md = this.md;
		var sm = this.sm;
		var xs = this.xs;
		var xxs = this.xxs;

		if ($('.js-gallery-main').length) {

			$('.js-gallery-main').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
				arrows: false,
				dots: false,
				infinite: true,
				autoplay: false,
				autoplaySpeed: 2000,
				lazyLoad: 'progressive',
				//fade: true,
				asNavFor: '.js-gallery-thumb'
			});

			$(".js-gallery-thumb").slick({
				focusOnSelect: true,
				infinite: true,
				variableWidth: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				centerMode: false,
				lazyLoad: 'progressive',
				arrows: false,
				fade: false,
				vertical: true,
				asNavFor: '.js-gallery-main',
				nextArrow: '<button type="button" class="gallery-block__thumb-next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				prevArrow: '<button type="button" class="gallery-block__thumb-prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#arrow-right"></svg></button>',
				responsive: [{
					breakpoint: md,
					settings: {
						slidesToShow: 4,
						vertical: false,
					}
				}, {
					breakpoint: xs,
					settings: {
						slidesToShow: 4,
						vertical: false,
					}
				}]
			});

		}

		if ($(".js-index-slider-img").length || $(".js-index-slider-info").length) {

			$(".js-index-slider-img").slick({
				infinite: true,
				variableWidth: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'progressive',
				arrows: true,
				nextArrow: '<button type="button" class="slider-section__next slick-next slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></svg></button>',
				prevArrow: '<button type="button" class="slider-section__prev slick-prev slick-arrow"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></svg></button>',
				fade: false,
				dots: true,
				dotsClass: 'slick-dots slider-section__dots',
				responsive: [
					/* {
						breakpoint: sm,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}, */
					{
						breakpoint: xs,
						settings: {
							dots: false
						}
					}
				]
				//asNavFor: $('.js-index-slider-info'),
			});

			/* $(".js-index-slider-info").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				lazyLoad: 'progressive',

				arrows: false,
				dots: true,
				asNavFor: $('.js-index-slider-img'),
				appendDots: $('.js-index-slider-dots'),
				fade: true,
				//nextArrow: '<button type="button" class="slider-section__next slick-next slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-right-2"></svg></button>',
				//prevArrow: '<button type="button" class="slider-section__prev slick-prev slick-arrow slick-arrow--circle slick-arrow--white"><svg class="icon"><use xlink:href="images/sprite.svg#arrow-left-2"></svg></button>',
				responsive: [{
					breakpoint: xs,
					settings: {
						adaptiveHeight: true
					}
				}]
			});

			$('.js-index-slider-next').click(function () {
				$('.js-index-slider-img').slick('slickNext');
				$('.js-index-slider-info').slick('slickNext');
				return false;
			}); */

		}



		if ($('.js-other-products-slider').length) {
			$('.js-other-products-slider').each(function () {
				var $this = $(this);

				$this.slick({
					slidesToShow: 6,
					slidesToScroll: 2,
					centerMode: false,
					variableWidth: false,
					arrows: true,
					dots: false,
					infinite: true,
					autoplay: false,
					autoplaySpeed: 2000,
					lazyLoad: 'progressive',
					prevArrow: '<a href="#" class="product-page__products-prev slick-arrow slick-arrow--gray-2 slick-prev" tabindex="-1"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></use></svg></a>',
					nextArrow: '<a href="#" class="product-page__products-next slick-arrow slick-arrow--gray-2 slick-next" tabindex="-1"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></use></svg></a>',
					responsive: [{
							breakpoint: lg,
							settings: {
								slidesToShow: 5,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: md,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: xs,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1
							}
						}
					]
				});

			});

			/* $('.js-products-slider-prev').click(function () {
				$('.js-products-slider').slick('slickPrev');
				return false;
			});
			$('.js-products-slider-next').click(function () {
				$('.js-products-slider').slick('slickNext');
				return false;
			}); */

		}


		if ($('.js-catalog-slider').length) {
			$('.js-catalog-slider').each(function () {
				var $this = $(this);

				$this.slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					centerMode: false,
					variableWidth: false,
					arrows: true,
					dots: false,
					infinite: true,
					autoplay: false,
					autoplaySpeed: 2000,
					lazyLoad: 'progressive',
					prevArrow: '<a href="#" class="catalog-section__prev slick-arrow slick-arrow--gray-2 slick-prev" tabindex="-1"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></use></svg></a>',
					nextArrow: '<a href="#" class="catalog-section__next slick-arrow slick-arrow--gray-2 slick-next" tabindex="-1"><svg class="icon"><use xlink:href="images/sprite-svg.svg#slider-arrow-right"></use></svg></a>',
					responsive: [
						/* {
							breakpoint: sm,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						}, */
						{
							breakpoint: xs,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1
							}
						}
					]
				});

			});

			/* $('.js-products-slider-prev').click(function () {
				$('.js-products-slider').slick('slickPrev');
				return false;
			});
			$('.js-products-slider-next').click(function () {
				$('.js-products-slider').slick('slickNext');
				return false;
			}); */

		}

		if ($('.js-default-xs-slider').length && uikit.ww() <= uikit.xs) {

			$('.js-default-xs-slider').each(function () {
				var carousel = $(this);
				//var nav = $(this).parent().find('.js-slick-nav');

				carousel.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrow: true,
					dots: false,
					prevArrow: '<button class="slick-prev slick-arrow"><svg class="icon icon_arrow-right"><use xlink:href="/images/sprite-svg.svg#slider-arrow-right"></use></svg></button>',
					nextArrow: '<button class="slick-next slick-arrow"><svg class="icon icon_arrow-right"><use xlink:href="/images/sprite-svg.svg#slider-arrow-right"></use></svg></button>',
					//appendArrows: nav
				});
			});
		}

	},

	fancybox: function () {
		$(".js-fancybox, .fancybox").fancybox({
			// Options will go here
			iframe: {
				preload: false
			}
		});
	},

	accardion: function () {
		$('.js-accardion-toggle').click(function () {
			$(this).toggleClass('is-active').next().toggleClass('is-active');
			return false;
		});
	},

	mobile: function () {

		$('.js-mobile-menu-toggle').click(function () {
			$(this).toggleClass('active');
			$('body').toggleClass('overflow');

			$('.js-mobile-menu').slideToggle();

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
			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 400);
			return false;
		});
	},

	searchBlock: function () {
		$('.js-search-toggle').click(function () {
			if ($(this).hasClass('is-disabled') == true) {
				$(this).removeClass('is-disabled').parents('.js-search-block').addClass('is-active');

				$(document).click(function (e) { // событие клика по веб-документу
					var div = $('.js-search-block'); // тут указываем ID элемента
					if (!div.is(e.target) // если клик был не по нашему блоку
						&&
						div.has(e.target).length === 0) { // и не по его дочерним элементам
						div.removeClass('is-active'); // скрываем его
						div.find('.js-search-toggle').addClass('is-disabled');
					}
				});
				console.log(1);
				return false;
			} else {
				$(this).addClass('is-disabled').parents('.js-search-block').removeClass('is-active');

				return true;
			}
		});
	},


	mainInit: function () {

		//this.sliders();

		this.lazy();
		//this.validation();

		//this.tabs();

		//this.niceSelect();
		//this.countBlock();
		//this.fancybox();
		this.popups();
		this.chengeColorPalette();
		//this.mask();
		//this.accardion();
		this.mobile();
		//this.upload();
		this.scrollTo();
		this.searchBlock();
		//this.headerFix();


	}
};
$(document).ready(function () {

	uikit.mainInit();

	// Разворот текстового описания
	$(".js-more-text").click(function () {
		if ($(this).parent().hasClass('is-hide') == false) {
			$(this).parent().addClass('is-hide');
			$(this).parent().parent().find(".js-wrap-text").removeClass("is-overflow");
		} else {
			$(this).parent().removeClass('is-hide');
			$(this).parent().parent().find(".js-wrap-text").addClass("is-overflow");
		}
		return false;
	});

});
var clrTimeOut;
$(window).on('load', function (e) {
	clearTimeout(clrTimeOut);
	clrTimeOut = setTimeout(function () {

	}, 200);
});

$(window).resize(function () {
	clearTimeout(clrTimeOut);
	clrTimeOut = setTimeout(function () {

	}, 200);

});

$(window).scroll(function () {
	//uikit.headerFixed();
});