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
		} else if ($(this).scrollTop() > 40) {
			$('#header').addClass('header-scroll');
		} else {
			$('#header').removeClass('header-scroll');
		}

	});
	
	// lightGallery
		$(".lightgallery").lightGallery({
				mode: 'lg-fade',
				cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)'
		}); 

	
	// toggle menu
	$('a.menu').click(function(){
		$(this).children('span').toggleClass('checked');
		$('ul.nav-items').toggleClass('show-nav');
	});
	
});

