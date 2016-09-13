//$(document).foundation();
// nav on scroll
$(document).ready(function () {



	//	$('.pos').append(top);

	var top = $(window).scrollTop();
	var offsetHeader = $('header').height();
	var offsetBanner = $('.block-1').height();
	var offset = 500;
	var page = $('.page-content').scrollTop();
	console.log(page);

	//alert('you scrolled!');
	$(window).scroll(function () {

		if ($(this).scrollTop() > offset) {
			$('#header').addClass('header-scroll');
		} else if ($(this).scrollTop() > page) {
			$('#header').addClass('header-scroll');
		} else {
			$('#header').removeClass('header-scroll');
		}

	});

});