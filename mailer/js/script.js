// JavaScript Document
 

//testimonial //	

$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:1,
        itemsDesktop:[1199,1],
        itemsDesktopSmall:[979,1],
        itemsTablet:[768,1],
        pagination: true,
        autoPlay:false
    });
}); 
 
 
 
 $(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() - 70;
			 if ($(window).scrollTop() > navHeight) {
				 $('.innerMenu').addClass('fixed');
			 }
			 else {
				 $('.innerMenu').removeClass('fixed');
			 }
		});
	});
 


$('body').on('hidden.bs.modal', '.modal', function () {
$('video').trigger('pause');
});
 
 // captcha

$(document).ready(function() {
  $("#reload").click(function() {
	
        $("img#img").remove();
		var id = Math.random();
        $('<img id="img" src="captcha.php?id='+id+'"/>').appendTo("#imgdiv");
		 id ='';
    });
});


$(document).ready(function() {
	 
  $("#reload1").click(function() {
	   $("img#img1").remove();
		var id = Math.random();
        $('<img id="img1" src="captcha1.php?id='+id+'"/>').appendTo("#imgdiv1");
		 id ='';
    });
});
 
 

$('.accordion .item .heading').click(function() {
		
	var a = $(this).closest('.item');
	var b = $(a).hasClass('open');
	var c = $(a).closest('.accordion').find('.open');
		
	if(b != true) {
		$(c).find('.content').slideUp(200);
		$(c).removeClass('open');
	}

	$(a).toggleClass('open');
	$(a).find('.content').slideToggle(200);

});
 
   jQuery(document).ready(function() { 
        $(".viewport2").mapbox({ 
            mousewheel: true, 
            layerSplit: 8//smoother transition for mousewheel 
        }); 
        jQuery(".map-control a").click(function() {//control panel 
            var viewport = $(".viewport2"); 
            //this.className is same as method to be called 
            if(this.className == "zoom" || this.className == "back") { 
                viewport.mapbox(this.className, 2);//step twice 
            } 
            else { 
                viewport.mapbox(this.className); 
            } 
            return false; 
        }); 
    }) 
	
	
	
	 jQuery(document).ready(function() { 
        $(".viewport3").mapbox({ 
            mousewheel: true, 
            layerSplit: 8//smoother transition for mousewheel 
        }); 
        jQuery(".map-control a").click(function() {//control panel 
            var viewport = $(".viewport3"); 
            //this.className is same as method to be called 
            if(this.className == "zoom" || this.className == "back") { 
                viewport.mapbox(this.className, 2);//step twice 
            } 
            else { 
                viewport.mapbox(this.className); 
            } 
            return false; 
        }); 
    }) 
 
 
 

 /*Popup */
$(function(){
		var $gallery = $('.gallery a').simpleLightbox();
		var $gallery = $('.gallery1 a').simpleLightbox();
		var $gallery = $('.gallery2 a').simpleLightbox();
 });
/*Popup */

    $(document).ready(function() {
        //Horizontal Tab
        $('#parentHorizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
		
		        $('#parentHorizontalTab2').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });

        // Child Tab
        $('.ChildVerticalTab_1').easyResponsiveTabs({
            type: 'vertical',
            width: 'auto',
            fit: true,
            tabidentify: 'ver_1', // The tab groups identifier
            activetab_bg: '#fff', // background color for active tabs in this group
            inactive_bg: '#F5F5F5', // background color for inactive tabs in this group
            active_border_color: '#c1c1c1', // border color for active tabs heads in this group
            active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
        });
		
		

        //Vertical Tab
        $('#parentVerticalTab').easyResponsiveTabs({
            type: 'vertical', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            closed: 'accordion', // Start closed if in accordion view
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo2');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
		
    }); 
	
	
	
 

//aos scroll start //

 AOS.init({
        easing: 'ease-in-out-sine'
      });

      setInterval(addItem, 300);

      var itemsCounter = 1;
      var container = document.getElementById('aos-demo');

      function addItem () {
        if (itemsCounter > 42) return;
        var item = document.createElement('div');
        item.classList.add('aos-item');
        item.setAttribute('data-aos', 'fade-up');
        item.innerHTML = '<div class="aos-item__inner"><h3>' + itemsCounter + '</h3></div>';
        container.appendChild(item);
        itemsCounter++;
      }
	  
//aos scroll end //	





	    <!-- testimonial slider-->
    $('.responsivetestimonial').slick({
		
 
     dots: true,
  infinite: true,
  slidesToShow: 1,
 


		
		
 
   
  asNavFor: '.slider-nav',
  
  
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    <!-- testimonial slider End-->


<!-- Icon slider-->
     
  $('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
		 infinite: true,
      }
    }
  ]
});

  <!-- Icon slider End-->	
  
  
  
	
 

 function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 1));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);



// Add active class to the current button (highlight it)
var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("link");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
 
 
 

 
 
 
 
 
 
    