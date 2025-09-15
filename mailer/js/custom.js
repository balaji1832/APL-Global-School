function openCity(evt, cityName) { }

 AOS.init({easing: 'ease-in-out-sine'});

   var rangeValue, roiValue, numYears, numMonth;
    var loanVal;

    function valueChange() {
        $('#range').on('change', function() {
            rangeValue = $(this).val();
            loanVal = rangeValue * 100000;
            $('.loan').val(custom_rupees(rangeValue * 100000));
            // $('.loan').val(rangeValue * 100000);
        });
        $('#roi').on('change', function() {
            roiValue = $(this).val();
            var roi = $('.roi').val(roiValue);
        });
        $('#year').on('change', function() {
            numYears = $(this).val();
            $('.year').val(numYears);
        });
        $('#month').on('change', function() {
            numMonth = $(this).val();
            $('.month').val(numMonth);
        });
      }
    valueChange();
    $('.btnCalculate').click(function() {
        var loanAmt = $('.loan').val();
        var roiValue = $('.roi').val();
        var yrNumber = $('.year').val();
    });
    $('#swap_yr').css({
        'display': 'block'
    });
    $('.noYrSwaper span').on('click', function() {
        var curId = 'swap_' + $(this).attr('id');
        $('.yearPanel .slider-rt').css({
            'display': 'none'
        });
        $("#" + curId).fadeIn(500);
        $('.noYrSwaper span').removeClass('activeSwapper');
        $(this).addClass('activeSwapper');
        // $('.emi_span').html($(this).attr('id'));
    });
    $('.searchBtn').on('click', function() {
        $('.searchCon').slideToggle();
    });


   $(function () {
        $("#range").ionRangeSlider({
          hide_min_max: true,
          keyboard: true,
          min: 0,
          max: 200,
          from: 0,
          to: 25,
          type: 'single',
          step: 1,
          postfix: "L",
          grid: true
        });
        $("#roi").ionRangeSlider({
          hide_min_max: true,
          keyboard: true,
          min: 0,
          max: 25,
          from: 0,
          to: 200,
          type: 'single',
          step: 0.1,
          grid: true
        });
        $("#year").ionRangeSlider({
          hide_min_max: true,
          keyboard: true,
          min: 0,
          max:25,
          from: 0,
          to: 5,
          type: 'single',
          step: 1,
          grid: true
        });
        $("#month").ionRangeSlider({
          hide_min_max: true,
          keyboard: true,
          min: 0,
          max:360,
          from: 0,
          to: 5,
          type: 'single',
          step: 1,
          grid: true
        });
    
      });

    function Calculate()
    {
        var P       = document.getElementById('loan1').value;
        var R       = document.getElementById('roi1').value;
        var Year    = document.getElementById('year1').value;
        var Month   = document.getElementById('month1').value;
        
        if(P!= '' || R!= '' || Year!= '' || Month!= ''){

            P = P.replace(/,/g, "");
            // alert(P);

            R           = R/1200;
            if(jQuery('.noYrSwaper #yr').hasClass('activeSwapper')){
                var N=Year*12;
            }
            
            if(jQuery('.noYrSwaper #mo').hasClass('activeSwapper')){
                var N=Month
            }        
            var principal3 = (P*R*Math.pow(1+R, N))/(Math.pow(1+R, N)-1);
            var emi        = Math.round(principal3);
            var finalemi   = (emi.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
            // alert(finalemi);
            document.getElementById('finalemi').value = finalemi;   
        }     
    }


    function custom_rupees(amt){
        var x=amt;
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    
     


    
 