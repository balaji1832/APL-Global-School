// Created by Ali Torbati
// ali.torbati@gmail.com
// 2015

(function ($) {

  $.fn.parallaxify = function() {

    return this.each(function() {
      var $element = $(this);

      function percentageSeen () {
        var viewportHeight = $(window).height(),
            winScrollTop = $(window).scrollTop(),
            elementOffsetTop = $element.offset().top,
            elementHeight = $element.height();

        var distance = (winScrollTop + viewportHeight) - elementOffsetTop;
        var percentage = distance / ((viewportHeight + elementHeight) / 100);

        if (percentage < 0) return 0;
        else if (percentage > 100) return 100;
        else return percentage;
      }

      $element.css({ 'background-position-y' : percentageSeen()+'%' });

      $(window).on('scroll', function() {
        $element.css({ 'background-position-y' : percentageSeen()+'%' });
      });
    });
  };

}(jQuery));



 
   jQuery(document).ready(function() { 
        $("#viewport2").mapbox({ 
            mousewheel: true, 
            layerSplit: 8//smoother transition for mousewheel 
        }); 
        jQuery(".map-control a").click(function() {//control panel 
            var viewport = $("#viewport2"); 
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
 