
/* Smooth scrolls with #tags remove */
$(document).ready(function () {
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-140
        }, 1, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            //$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            //$target.focus(); // Set focus again
          };
        });
      }
    }
  });
  
$(".floating").hide();
$(window).scroll(function() {
	if($(window).scrollTop() < 1000) {
	   $(".floating").hide();
	} else {
		 $(".floating").show();
	}
});	

$('#international_PhoneNumber_countrycode').keyup(function(e){
e.preventDefault();
	var phno = document.getElementById('international_PhoneNumber_countrycode').value;
	var phRegx = /^[0-9]+$/;	
	var indPh = document.querySelector(".iti__selected-dial-code").innerText;
	
	if( (!phRegx.test(phno)) || (phno.length<4) || (phno.length>15) || ((indPh=='+91') && (phno.length!=10)) )
	{		
		$('#PhoneNumber_error').show(); 
		return false;		
	}
	else { 
		$('#PhoneNumber_error').hide();
		return true;
	}	
}); 

$('.collapse').on('shown.bs.collapse', function(e) {
  var $card = $(this).closest('.accordion-item');
  var $open = $($(this).data('parent')).find('.collapse.show');
  
  var additionalOffset = 0;
  if($card.prevAll().filter($open.closest('.accordion-item')).length !== 0)
  {
        additionalOffset =  $open.height();
  }
  $('html,body').animate({
    scrollTop: $card.offset().top - additionalOffset
  }, 500);
  
  
});

});


document.addEventListener("DOMContentLoaded", function(){
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#main_nav',
    offset: 200
  })
});
/* Number counter fn call */
(function($) {
    $.fn.counter = function() {
        const $this = $(this),
            numberFrom = parseInt($this.attr('data-from')),
            numberTo = parseInt($this.attr('data-to')),
            delta = numberTo - numberFrom,
            deltaPositive = delta > 0 ? 1 : 0,
            time = parseInt($this.attr('data-time')),
            changeTime = 10;

        let currentNumber = numberFrom,
            value = delta * changeTime / time;
        var interval1;
        const changeNumber = () => {
            currentNumber += value;
            //checks if currentNumber reached numberTo
            (deltaPositive && currentNumber >= numberTo) || (!deltaPositive && currentNumber <= numberTo) ? currentNumber = numberTo: currentNumber;
            this.text(parseInt(currentNumber));
            currentNumber == numberTo ? clearInterval(interval1) : currentNumber;
        }

        interval1 = setInterval(changeNumber, changeTime);
    }
}(jQuery));

/* Country code using intel input on zoho form */
$(document).ready(function() {

 $('.team_pics').click(function(e){

               e.preventDefault(); 
               var photo_fullsize =  $(this).find('.myprofile img').attr('src');
			   var teamcontent =  $(this).find('.myprofile').html();
               $('.main_team img').attr('src',photo_fullsize);
               $('.team_descs').html(teamcontent);
}); 
 
	$("#international_PhoneNumber_countrycodeval").intlTelInput({
	 initialCountry: "auto",
	 geoIpLookup: function(success) {
     fetch("https://api.ipdata.co/?api-key=773d57309f8c0de65bad53b3bf9af349f6c3ef41ce42d9aed32f0516")
        .then(function(response) {
          if (!response.ok) return success("");
          return response.json();
        })
        .then(function(ipdata) {
          success(ipdata.country_code);
		  var selctryVal = $('#zoho_country option:contains(' + ipdata.country_name + ')').text();
		  
		  var ctry_code = ipdata.country_code;
		  
		   $(".triggerOTP").show();
		   //if(ctry_code=="IN") { $(".triggerOTP").show(); } else { $(".triggerOTP").hide();  }
		  
		  $("#zoho_country").val(selctryVal).trigger("change");
        });
    },
	separateDialCode: true,
	excludeCountries: ["CD","COD","IOT","CIV","DOM","SSD","COG","CUW","GNB","BL","STP","VIR","ALA","AO"]

	});

$('.iti__flag-container').click(function() {
	
	
	var countrydtls = $('.iti__selected-flag').attr('title');
	var fistsplit = countrydtls.split(":");
	var ctry = fistsplit[0].split("(");
	var ctry_last = $.trim(ctry[0]).normalize();
	//alert(ctry_last);
	$('#zoho_country option:selected').removeAttr('selected');
	var ctryVal = $('#zoho_country option:contains(' + ctry_last + ')').text();
	$("#zoho_country").val(ctryVal).trigger("change");
	//alert(ctryVal);
	
	var change_ctry = $(".iti__selected-dial-code").html();
	 $(".triggerOTP").show();
	//if(change_ctry=="+91") {  $(".triggerOTP").show(); } else { $(".triggerOTP").hide();  }
	
});

$('.iti__selected-dial-code').bind('DOMSubtreeModified', function () {
var countrydtls = $('.iti__selected-flag').attr('title');
   $(".triggerOTP").show();
  //$(".triggerOTP").show();if(countrydtls.includes("India")) { $(".triggerOTP").show(); } else { $(".triggerOTP").hide();  }
});


    $('.count1').counter();
    $('.count2').counter();
    $('.count3').counter();
    $('.count4').counter();
    $('.count5').counter();
	
   new WOW().init();
	
/* Country based state select on zoho */	
$('#zoho_states').hide();  
$('#zoho_city').hide();
			
	$('#zoho_country').change(function(){	
	   var mycountry = $(this).val();
	   if(mycountry == 'India')  {  
			$('#zoho_states').show();  
			$('#zoho_city').show(); 
			$('#citydefault option[value="None"]').val("-Select-");
			$('#statedefault option[value="None"]').val("-Select-");  
		}
	   else  { 
			$('#citydefault option[value="-Select-"]').val("None");  
			$('#statedefault option[value="-Select-"]').val("None");  
			$('#zoho_states').hide();
			$('#zoho_city').hide();
		}

	});

/* State based city select on zoho */
$('#statedefault').change(function(){
	var mystates = $(this).val();
	
switch(mystates) {

case "Andaman and Nicobar Islands": 
$('#citydefault').empty().append('<optgroup label="Andaman and Nicobar Islands" id="Andaman"><option selected="true" value="-Select-">-Select-</option><option value="Port&#x20;Blair">Port&#x20;Blair</option></optgroup>');
break; 

case "Andhra Pradesh": 
$('#citydefault').empty().append('<optgroup label="Andhra Pradesh" id="AP"><option selected="true" value="-Select-">-Select-</option><option value="Addanki">Addanki</option><option value="Adoni">Adoni</option><option value="Amalapuram">Amalapuram</option><option value="Amudalavalasa">Amudalavalasa</option><option value="Anakapalle">Anakapalle</option><option value="Anantapur">Anantapur</option><option value="Badvel">Badvel</option><option value="Bapatla">Bapatla</option><option value="Bezwada">Bezwada</option><option value="Bheemunipatnam">Bheemunipatnam</option><option value="Bhimavaram">Bhimavaram</option><option value="Bhimunipatnam">Bhimunipatnam</option><option value="Bobbili">Bobbili</option><option value="Chicacole">Chicacole</option><option value="Chilakaluripet">Chilakaluripet</option><option value="Chilakalurupet">Chilakalurupet</option><option value="Chimakurti">Chimakurti</option><option value="Chirala">Chirala</option><option value="Chittoor">Chittoor</option><option value="Cuddapah">Cuddapah</option><option value="Dharmavaram">Dharmavaram</option><option value="Ellore">Ellore</option><option value="Eluru">Eluru</option><option value="Emmiganur">Emmiganur</option><option value="Giddalur">Giddalur</option><option value="Gooty">Gooty</option><option value="Gudivada">Gudivada</option><option value="Gudur">Gudur</option><option value="Guntakal">Guntakal</option><option value="Guntur">Guntur</option><option value="Hindupur">Hindupur</option><option value="Jaggaiahpet">Jaggaiahpet</option><option value="Jammalamadugu">Jammalamadugu</option><option value="Kadapa">Kadapa</option><option value="Kadiri">Kadiri</option><option value="Kakinada">Kakinada</option><option value="Kandukur">Kandukur</option><option value="Kavali">Kavali</option><option value="Koilkuntla">Koilkuntla</option><option value="Kovvur">Kovvur</option><option value="Kurnool">Kurnool</option><option value="Macherla">Macherla</option><option value="Machilipatnam">Machilipatnam</option><option value="Madanapalle">Madanapalle</option><option value="Mandapeta">Mandapeta</option><option value="Mangalagiri">Mangalagiri</option><option value="Markapur">Markapur</option><option value="Nagari">Nagari</option><option value="Naidupet">Naidupet</option><option value="Nandyal">Nandyal</option><option value="Narasannapeta">Narasannapeta</option><option value="Narasapur">Narasapur</option><option value="Narasapuram">Narasapuram</option><option value="Narasaraopet">Narasaraopet</option><option value="Narsipatnam">Narsipatnam</option><option value="Nellore">Nellore</option><option value="Nidadavole">Nidadavole</option><option value="Nuzvid">Nuzvid</option><option value="Ongole">Ongole</option><option value="Palacole">Palacole</option><option value="Palakollu">Palakollu</option><option value="Palasa&#x20;Kasibugga">Palasa&#x20;Kasibugga</option><option value="Palmaner">Palmaner</option><option value="Pamidi">Pamidi</option><option value="Parvathipuram">Parvathipuram</option><option value="Pedana">Pedana</option><option value="Peddapuram">Peddapuram</option><option value="Pithapuram">Pithapuram</option><option value="Ponnur">Ponnur</option><option value="Ponnuru">Ponnuru</option><option value="Proddatur">Proddatur</option><option value="Pulivendla">Pulivendla</option><option value="Punganur">Punganur</option><option value="Punganuru">Punganuru</option><option value="Puttur">Puttur</option><option value="Rajahmundry">Rajahmundry</option><option value="Rajam">Rajam</option><option value="Rajampet">Rajampet</option><option value="Ramachandrapuram">Ramachandrapuram</option><option value="Rayachoti">Rayachoti</option><option value="Rayadurg">Rayadurg</option><option value="Renigunta">Renigunta</option><option value="Repalle">Repalle</option><option value="Salur">Salur</option><option value="Samalkot">Samalkot</option><option value="Sattenapalle">Sattenapalle</option><option value="Srikakulam">Srikakulam</option><option value="Srikalahasti">Srikalahasti</option><option value="Srisailam&#x20;Project&#x20;&#x28;Right&#x20;Flank&#x20;Colony&#x29;&#x20;Township">Srisailam&#x20;Project&#x20;&#x28;Right&#x20;Flank&#x20;Colony&#x29;&#x20;Township</option><option value="Sullurpeta">Sullurpeta</option><option value="Tadepalle">Tadepalle</option><option value="Tadepallegudem">Tadepallegudem</option><option value="Tadepalligudem">Tadepalligudem</option><option value="Tadpatri">Tadpatri</option><option value="Tanuku">Tanuku</option><option value="Tenali">Tenali</option><option value="Tirupati">Tirupati</option><option value="Tiruvuru">Tiruvuru</option><option value="Tuni">Tuni</option><option value="Uravakonda">Uravakonda</option><option value="Venkatagiri">Venkatagiri</option><option value="Vijayawada">Vijayawada</option><option value="Vinukonda">Vinukonda</option><option value="Visakhapatnam">Visakhapatnam</option><option value="Vishakhapatnam">Vishakhapatnam</option><option value="Vizianagaram">Vizianagaram</option><option value="Yemmiganur">Yemmiganur</option><option value="Yerraguntla">Yerraguntla</option></optgroup>');
break;

case "Arunachal Pradesh":
$('#citydefault').empty().append('<optgroup label="Arunachal Pradesh" id="Arunachal"><option selected="true" value="-Select-">-Select-</option><option value="Itanagar">Itanagar</option><option value="Naharlagun">Naharlagun</option><option value="Pasighat">Pasighat</option></optgroup>');
break; 
 
case "Assam": 
$('#citydefault').empty().append('<optgroup label="Assam" id="Assam"><option selected="true" value="-Select-">-Select-</option><option value="Barpeta">Barpeta</option><option value="Bongaigaon&#x20;City">Bongaigaon&#x20;City</option><option value="Dhubri">Dhubri</option><option value="Dibrugarh">Dibrugarh</option><option value="Diphu">Diphu</option><option value="Dispur">Dispur</option><option value="Gauripur">Gauripur</option><option value="Goalpara">Goalpara</option><option value="Guwahati">Guwahati</option><option value="Jorhat">Jorhat</option><option value="Karimganj">Karimganj</option><option value="Lanka">Lanka</option><option value="Lumding">Lumding</option><option value="Mangaldoi">Mangaldoi</option><option value="Mankachar">Mankachar</option><option value="Margherita">Margherita</option><option value="Mariani">Mariani</option><option value="Marigaon">Marigaon</option><option value="Nagaon">Nagaon</option><option value="Nalbari">Nalbari</option><option value="North&#x20;Lakhimpur">North&#x20;Lakhimpur</option><option value="Rangia">Rangia</option><option value="Sibsagar">Sibsagar</option><option value="Silapathar">Silapathar</option><option value="Silchar">Silchar</option><option value="Tezpur">Tezpur</option><option value="Tinsukia">Tinsukia</option></optgroup>');
break;  
 
case "Bihar":
$('#citydefault').empty().append('<optgroup label="Bihar" id="Bihar"><option selected="true" value="-Select-">-Select-</option><option value="Araria">Araria</option><option value="Arrah">Arrah</option><option value="Arwal">Arwal</option><option value="Asarganj">Asarganj</option><option value="Aurangabad">Aurangabad</option><option value="Bagaha">Bagaha</option><option value="Barh">Barh</option><option value="Begusarai">Begusarai</option><option value="Bettiah">Bettiah</option><option value="BhabUrban&#x20;Agglomeration">BhabUrban&#x20;Agglomeration</option><option value="Bhagalpur">Bhagalpur</option><option value="Buxar">Buxar</option><option value="Chhapra">Chhapra</option><option value="Darbhanga">Darbhanga</option><option value="Dehri-on-Sone">Dehri-on-Sone</option><option value="Deo">Deo</option><option value="Dumraon">Dumraon</option><option value="Forbesganj">Forbesganj</option><option value="Gaya">Gaya</option><option value="Gopalganj">Gopalganj</option><option value="Hajipur">Hajipur</option><option value="Jamalpur">Jamalpur</option><option value="Jamui">Jamui</option><option value="Jehanabad">Jehanabad</option><option value="Katihar">Katihar</option><option value="Kishanganj">Kishanganj</option><option value="Lakhisarai">Lakhisarai</option><option value="Lalganj">Lalganj</option><option value="Madhepura">Madhepura</option><option value="Madhubani">Madhubani</option><option value="Maharajganj">Maharajganj</option><option value="Mahnar&#x20;Bazar">Mahnar&#x20;Bazar</option><option value="Makhdumpur">Makhdumpur</option><option value="Maner">Maner</option><option value="Manihari">Manihari</option><option value="Marhaura">Marhaura</option><option value="Masaurhi">Masaurhi</option><option value="Mirganj">Mirganj</option><option value="Mokameh">Mokameh</option><option value="Motihari">Motihari</option><option value="Motipur">Motipur</option><option value="Munger">Munger</option><option value="Murliganj">Murliganj</option><option value="Muzaffarpur">Muzaffarpur</option><option value="Narkatiaganj">Narkatiaganj</option><option value="Naugachhia">Naugachhia</option><option value="Nawada">Nawada</option><option value="Nokha">Nokha</option><option value="Patna">Patna</option><option value="Piro">Piro</option><option value="Purnea">Purnea</option><option value="Purnia">Purnia</option><option value="Rafiganj">Rafiganj</option><option value="Rajgir">Rajgir</option><option value="Ramnagar">Ramnagar</option><option value="Raxaul&#x20;Bazar">Raxaul&#x20;Bazar</option><option value="Revelganj">Revelganj</option><option value="Rosera">Rosera</option><option value="Saharsa">Saharsa</option><option value="Samastipur">Samastipur</option><option value="Sasaram">Sasaram</option><option value="Sheikhpura">Sheikhpura</option><option value="Sheohar">Sheohar</option><option value="Sherghati">Sherghati</option><option value="Silao">Silao</option><option value="Sitamarhi">Sitamarhi</option><option value="Siwan">Siwan</option><option value="Sonepur">Sonepur</option><option value="Sugauli">Sugauli</option><option value="Sultanganj">Sultanganj</option><option value="Supaul">Supaul</option><option value="Warisaliganj">Warisaliganj</option></optgroup>');
break;  
 
case "Chandigarh":
$('#citydefault').empty().append('<optgroup label="Chandigarh" id="Chandigarh"><option selected="true" value="-Select-">-Select-</option><option value="Chandigarh">Chandigarh</option></optgroup>');
break;  
 
case "Chhattisgarh":
$('#citydefault').empty().append('<optgroup label="Chhattisgarh" id="Chhattisgarh"><option selected="true" value="-Select-">-Select-</option><option value="Ambikapur">Ambikapur</option><option value="Bhatapara">Bhatapara</option><option value="Bhilai">Bhilai</option><option value="Bhilai&#x20;Nagar">Bhilai&#x20;Nagar</option><option value="Bilaspur">Bilaspur</option><option value="Chirmiri">Chirmiri</option><option value="Dalli-Rajhara">Dalli-Rajhara</option><option value="Dhamtari">Dhamtari</option><option value="Drug">Drug</option><option value="Durg">Durg</option><option value="Jagdalpur">Jagdalpur</option><option value="Korba">Korba</option><option value="Mahasamund">Mahasamund</option><option value="Manendragarh">Manendragarh</option><option value="Mungeli">Mungeli</option><option value="Naila&#x20;Janjgir">Naila&#x20;Janjgir</option><option value="Raigarh">Raigarh</option><option value="Raipur">Raipur</option><option value="Rajnandgaon">Rajnandgaon</option><option value="Sakti">Sakti</option><option value="Tilda&#x20;Newra">Tilda&#x20;Newra</option></optgroup>');
break;  
 
case "Dadra and Nagar Haveli":
$('#citydefault').empty().append('<optgroup label="Dadra and Nagar Haveli" id="Dadra"><option selected="true" value="-Select-">-Select-</option><option value="Silvassa">Silvassa</option></optgroup>');
break;

case "Daman and Diu":
$('#citydefault').empty().append('<optgroup label="Daman and Diu" id="Daman"><option selected="true" value="-Select-">-Select-</option><option value="Diu">Diu</option></optgroup>');
break;
 
case "Delhi":
$('#citydefault').empty().append('<optgroup label="Delhi" id="Delhi"><option selected="true" value="-Select-">-Select-</option><option value="Delhi">Delhi</option><option value="New&#x20;Delhi">New&#x20;Delhi</option></optgroup>');
break;  
 
case "Goa":
$('#citydefault').empty().append('<optgroup label="Goa" id="Goa"><option selected="true" value="-Select-">-Select-</option><option value="Curchorem">Curchorem</option><option value="Mapusa">Mapusa</option><option value="Margao">Margao</option><option value="Marmagao">Marmagao</option><option value="Panaji">Panaji</option></optgroup>');
break;  

case "Gujarat":
$('#citydefault').empty().append('<optgroup label="Gujarat" id="Gujarat"><option selected="true" value="-Select-">-Select-</option><option value="Adalaj">Adalaj</option><option value="Ahmedabad">Ahmedabad</option><option value="Amreli">Amreli</option><option value="Anand">Anand</option><option value="Anjar">Anjar</option><option value="Ankleshwar">Ankleshwar</option><option value="Bharuch">Bharuch</option><option value="Bhavnagar">Bhavnagar</option><option value="Bhuj">Bhuj</option><option value="Chhapra">Chhapra</option><option value="Daman">Daman</option><option value="Deesa">Deesa</option><option value="Dholka">Dholka</option><option value="Dhoraji">Dhoraji</option><option value="Dwarka">Dwarka</option><option value="Ghandinagar">Ghandinagar</option><option value="Godhra">Godhra</option><option value="Jamnagar">Jamnagar</option><option value="Jasdan">Jasdan</option><option value="Kadi">Kadi</option><option value="Kapadvanj">Kapadvanj</option><option value="Keshod">Keshod</option><option value="Khambhat">Khambhat</option><option value="Khed&#x20;Brahma">Khed&#x20;Brahma</option><option value="Lathi">Lathi</option><option value="Limbdi">Limbdi</option><option value="Lunawada">Lunawada</option><option value="Mahemdabad">Mahemdabad</option><option value="Mahesana">Mahesana</option><option value="Mahuva">Mahuva</option><option value="Manavadar">Manavadar</option><option value="Mandvi">Mandvi</option><option value="Mangrol">Mangrol</option><option value="Mansa">Mansa</option><option value="Modasa">Modasa</option><option value="Morvi">Morvi</option><option value="Nadiad">Nadiad</option><option value="Nandod">Nandod</option><option value="Navsari">Navsari</option><option value="Padra">Padra</option><option value="Palanpur">Palanpur</option><option value="Palitana">Palitana</option><option value="Pardi">Pardi</option><option value="Patan">Patan</option><option value="Petlad">Petlad</option><option value="Porbandar">Porbandar</option><option value="Radhanpur">Radhanpur</option><option value="Rajkot">Rajkot</option><option value="Rajpipla">Rajpipla</option><option value="Rajula">Rajula</option><option value="Ranavav">Ranavav</option><option value="Rapar">Rapar</option><option value="Salaya">Salaya</option><option value="Sanand">Sanand</option><option value="Savarkundla">Savarkundla</option><option value="Sidhpur">Sidhpur</option><option value="Sihor">Sihor</option><option value="Songadh">Songadh</option><option value="Surat">Surat</option><option value="Talaja">Talaja</option><option value="Thangadh">Thangadh</option><option value="Tharad">Tharad</option><option value="Umbergaon">Umbergaon</option><option value="Umreth">Umreth</option><option value="Una">Una</option><option value="Unjha">Unjha</option><option value="Upleta">Upleta</option><option value="Vadnagar">Vadnagar</option><option value="Vadodara">Vadodara</option><option value="Valsad">Valsad</option><option value="Vapi">Vapi</option><option value="Veraval">Veraval</option><option value="Vijapur">Vijapur</option><option value="Viramgam">Viramgam</option><option value="Visnagar">Visnagar</option><option value="Vyara">Vyara</option><option value="Wadhwan">Wadhwan</option><option value="Wankaner">Wankaner</option></optgroup>');
break;  

case "Haryana": 
$('#citydefault').empty().append('<optgroup label="Haryana" id="Haryana"><option selected="true" value="-Select-">-Select-</option><option value="Ambala">Ambala</option><option value="Bahadurgarh">Bahadurgarh</option><option value="Bhiwani">Bhiwani</option><option value="Charkhi&#x20;Dadri">Charkhi&#x20;Dadri</option><option value="Faridabad">Faridabad</option><option value="Fatehabad">Fatehabad</option><option value="Gohana">Gohana</option><option value="Gurgaon">Gurgaon</option><option value="Hansi">Hansi</option><option value="Hisar">Hisar</option><option value="Jind">Jind</option><option value="Kaithal">Kaithal</option><option value="Karnal">Karnal</option><option value="Ladwa">Ladwa</option><option value="Mahendragarh">Mahendragarh</option><option value="Mandi&#x20;Dabwali">Mandi&#x20;Dabwali</option><option value="Narnaul">Narnaul</option><option value="Narwana">Narwana</option><option value="Palwal">Palwal</option><option value="Panchkula">Panchkula</option><option value="Panipat">Panipat</option><option value="Pehowa">Pehowa</option><option value="Pinjore">Pinjore</option><option value="Rania">Rania</option><option value="Ratia">Ratia</option><option value="Rewari">Rewari</option><option value="Rohtak">Rohtak</option><option value="Safidon">Safidon</option><option value="Samalkha">Samalkha</option><option value="Sarsod">Sarsod</option><option value="Shahbad">Shahbad</option><option value="Sirsa">Sirsa</option><option value="Sohna">Sohna</option><option value="Sonipat">Sonipat</option><option value="Taraori">Taraori</option><option value="Thanesar">Thanesar</option><option value="Tohana">Tohana</option><option value="Yamunanagar">Yamunanagar</option></optgroup>');
break;  

case "Himachal Pradesh":
$('#citydefault').empty().append('<optgroup label="Himachal Pradesh" id="Himachal"><option selected="true" value="-Select-">-Select-</option><option value="Mandi">Mandi</option><option value="Nahan">Nahan</option><option value="Palampur">Palampur</option><option value="Shimla">Shimla</option><option value="Solan">Solan</option><option value="Sundarnagar">Sundarnagar</option></optgroup>');
break;  

case "Jammu and Kashmir":
$('#citydefault').empty().append('<optgroup label="Jammu and Kashmir" id="Jammu"><option selected="true" value="-Select-">-Select-</option><option value="Anantnag">Anantnag</option><option value="Bandipura">Bandipura</option><option value="Baramula">Baramula</option><option value="Handwara">Handwara</option><option value="Jammu">Jammu</option><option value="KathUrban&#x20;Agglomeration">KathUrban&#x20;Agglomeration</option><option value="Kulgam">Kulgam</option><option value="Punch">Punch</option><option value="Rajaori">Rajaori</option><option value="Rajauri">Rajauri</option><option value="Sopore">Sopore</option><option value="Sopur">Sopur</option><option value="Srinagar">Srinagar</option><option value="Udhampur">Udhampur</option></optgroup>');
break;  

case "Jharkhand":
$('#citydefault').empty().append('<optgroup label="Jharkhand" id="Jharkhand"><option selected="true" value="-Select-">-Select-</option><option value="Adityapur">Adityapur</option><option value="Bokaro&#x20;Steel&#x20;City">Bokaro&#x20;Steel&#x20;City</option><option value="Chaibasa">Chaibasa</option><option value="Chakradharpur">Chakradharpur</option><option value="Chatra">Chatra</option><option value="Chirkunda">Chirkunda</option><option value="Deoghar">Deoghar</option><option value="Dhanbad">Dhanbad</option><option value="Dumka">Dumka</option><option value="Giridih">Giridih</option><option value="Gumia">Gumia</option><option value="Hazaribag">Hazaribag</option><option value="Jamshedpur">Jamshedpur</option><option value="Jhumri&#x20;Tilaiya">Jhumri&#x20;Tilaiya</option><option value="Lohardaga">Lohardaga</option><option value="Madhupur">Madhupur</option><option value="Medininagar&#x20;&#x28;Daltonganj&#x29;">Medininagar&#x20;&#x28;Daltonganj&#x29;</option><option value="Mihijam">Mihijam</option><option value="Musabani">Musabani</option><option value="Pakaur">Pakaur</option><option value="Patratu">Patratu</option><option value="Phusro">Phusro</option><option value="Ramgarh">Ramgarh</option><option value="Ranchi">Ranchi</option><option value="Sahibganj">Sahibganj</option><option value="Saunda">Saunda</option><option value="Simdega">Simdega</option><option value="Tenu&#x20;dam-cum-Kathhara">Tenu&#x20;dam-cum-Kathhara</option></optgroup>');
break;  

case "Karnataka":
$('#citydefault').empty().append('<optgroup label="Karnataka" id="Karnataka"><option selected="true" value="-Select-">-Select-</option><option value="Adyar">Adyar</option><option value="Afzalpur">Afzalpur</option><option value="Arsikere">Arsikere</option><option value="Athni">Athni</option><option value="Ballari">Ballari</option><option value="Bangalore">Bangalore</option><option value="Belagavi">Belagavi</option><option value="Belgaum">Belgaum</option><option value="Bellary">Bellary</option><option value="Bengaluru">Bengaluru</option><option value="Bidar">Bidar</option><option value="Bijapur">Bijapur</option><option value="Channarayapatna">Channarayapatna</option><option value="Chikkamagaluru">Chikkamagaluru</option><option value="Davanagere">Davanagere</option><option value="Davangere">Davangere</option><option value="Gokak">Gokak</option><option value="Gulbarga">Gulbarga</option><option value="Hassan">Hassan</option><option value="Hospet">Hospet</option><option value="Hubli">Hubli</option><option value="Hubli-Dharwad">Hubli-Dharwad</option><option value="Karwar">Karwar</option><option value="Kolar">Kolar</option><option value="Lakshmeshwar">Lakshmeshwar</option><option value="Lingsugur">Lingsugur</option><option value="Maddur">Maddur</option><option value="Madhugiri">Madhugiri</option><option value="Madikeri">Madikeri</option><option value="Magadi">Magadi</option><option value="Mahalingapura">Mahalingapura</option><option value="Malavalli">Malavalli</option><option value="Malur">Malur</option><option value="Mandya">Mandya</option><option value="Mangalore">Mangalore</option><option value="Mangaluru">Mangaluru</option><option value="Manvi">Manvi</option><option value="Mudabidri">Mudabidri</option><option value="Mudalagi">Mudalagi</option><option value="Muddebihal">Muddebihal</option><option value="Mudhol">Mudhol</option><option value="Mulbagal">Mulbagal</option><option value="Mundargi">Mundargi</option><option value="Mysore">Mysore</option><option value="Nanjangud">Nanjangud</option><option value="Nargund">Nargund</option><option value="Navalgund">Navalgund</option><option value="Nelamangala">Nelamangala</option><option value="Pavagada">Pavagada</option><option value="Piriyapatna">Piriyapatna</option><option value="Puttur">Puttur</option><option value="Raayachuru">Raayachuru</option><option value="Rabkavi&#x20;Banhatti">Rabkavi&#x20;Banhatti</option><option value="Raichur">Raichur</option><option value="Ramanagaram">Ramanagaram</option><option value="Ramdurg">Ramdurg</option><option value="Ranebennuru">Ranebennuru</option><option value="Ranibennur">Ranibennur</option><option value="Robertson&#x20;Pet">Robertson&#x20;Pet</option><option value="Ron">Ron</option><option value="Sadalagi">Sadalagi</option><option value="Sagara">Sagara</option><option value="Sakaleshapura">Sakaleshapura</option><option value="Sanduru">Sanduru</option><option value="Sankeshwara">Sankeshwara</option><option value="Saundatti-Yellamma">Saundatti-Yellamma</option><option value="Savanur">Savanur</option><option value="Sedam">Sedam</option><option value="Shahabad">Shahabad</option><option value="Shahpur">Shahpur</option><option value="Shiggaon">Shiggaon</option><option value="Shikaripur">Shikaripur</option><option value="Shimoga">Shimoga</option><option value="Shivamogga">Shivamogga</option><option value="Shrirangapattana">Shrirangapattana</option><option value="Sidlaghatta">Sidlaghatta</option><option value="Sindagi">Sindagi</option><option value="Sindhagi">Sindhagi</option><option value="Sindhnur">Sindhnur</option><option value="Sira">Sira</option><option value="Sirsi">Sirsi</option><option value="Siruguppa">Siruguppa</option><option value="Srinivaspur">Srinivaspur</option><option value="Surapura">Surapura</option><option value="Talikota">Talikota</option><option value="Tarikere">Tarikere</option><option value="Tekkalakote">Tekkalakote</option><option value="Terdal">Terdal</option><option value="Tiptur">Tiptur</option><option value="Tumkur">Tumkur</option><option value="Udipi">Udipi</option><option value="Udupi">Udupi</option><option value="Vijayapura">Vijayapura</option><option value="Wadi">Wadi</option><option value="Yadgir">Yadgir</option></optgroup>');
break;  

case "Kerala": 
$('#citydefault').empty().append('<optgroup label="Kerala" id="Kerala"><option selected="true" value="-Select-">-Select-</option><option value="Adoor">Adoor</option><option value="Alappuzha">Alappuzha</option><option value="Alleppey">Alleppey</option><option value="Angamali">Angamali</option><option value="Attingal">Attingal</option><option value="Calicut">Calicut</option><option value="Chalakudy">Chalakudy</option><option value="Changanassery">Changanassery</option><option value="Cherthala">Cherthala</option><option value="Chittur-Thathamangalam">Chittur-Thathamangalam</option><option value="Guruvayoor">Guruvayoor</option><option value="Kanhangad">Kanhangad</option><option value="Kannur">Kannur</option><option value="Kasaragod">Kasaragod</option><option value="Kayamkulam">Kayamkulam</option><option value="Kochi">Kochi</option><option value="Kodungallur">Kodungallur</option><option value="Kollam">Kollam</option><option value="Kottayam">Kottayam</option><option value="Koyilandy">Koyilandy</option><option value="Kozhikode">Kozhikode</option><option value="Kunnamkulam">Kunnamkulam</option><option value="Malappuram">Malappuram</option><option value="Mattannur">Mattannur</option><option value="Mavelikkara">Mavelikkara</option><option value="Mavoor">Mavoor</option><option value="Muvattupuzha">Muvattupuzha</option><option value="Nedumangad">Nedumangad</option><option value="Neyyattinkara">Neyyattinkara</option><option value="Nilambur">Nilambur</option><option value="Ottappalam">Ottappalam</option><option value="Palai">Palai</option><option value="Palakkad">Palakkad</option><option value="Palghat">Palghat</option><option value="Panamattom">Panamattom</option><option value="Panniyannur">Panniyannur</option><option value="Pappinisseri">Pappinisseri</option><option value="Paravoor">Paravoor</option><option value="Pathanamthitta">Pathanamthitta</option><option value="Peringathur">Peringathur</option><option value="Perinthalmanna">Perinthalmanna</option><option value="Perumbavoor">Perumbavoor</option><option value="Ponnani">Ponnani</option><option value="Punalur">Punalur</option><option value="Puthuppally">Puthuppally</option><option value="Quilon">Quilon</option><option value="Shoranur">Shoranur</option><option value="Taliparamba">Taliparamba</option><option value="Thiruvalla">Thiruvalla</option><option value="Thiruvananthapuram">Thiruvananthapuram</option><option value="Thodupuzha">Thodupuzha</option><option value="Thrissur">Thrissur</option><option value="Tirur">Tirur</option><option value="Trichur">Trichur</option><option value="Vaikom">Vaikom</option><option value="Varkala">Varkala</option><option value="Vatakara">Vatakara</option></optgroup>');
break;  

case "Lakshadweep":
$('#citydefault').empty().append('<optgroup label="Lakshadweep" id="Lakshadweep"><option selected="true" value="-Select-">-Select-</option><option value="Kavaratti">Kavaratti</option></optgroup>');
break;  

case "Madhya Pradesh":
$('#citydefault').empty().append('<optgroup label="Madhya Pradesh" id="MP"><option selected="true" value="-Select-">-Select-</option><option value="Alirajpur">Alirajpur</option><option value="Ashok&#x20;Nagar">Ashok&#x20;Nagar</option><option value="Balaghat">Balaghat</option><option value="Bhopal">Bhopal</option><option value="Burhanpur">Burhanpur</option><option value="Ganjbasoda">Ganjbasoda</option><option value="Gwalior">Gwalior</option><option value="Indore">Indore</option><option value="Itarsi">Itarsi</option><option value="Jabalpur">Jabalpur</option><option value="Khajuraho">Khajuraho</option><option value="Lahar">Lahar</option><option value="Maharajpur">Maharajpur</option><option value="Mahidpur">Mahidpur</option><option value="Maihar">Maihar</option><option value="Malaj&#x20;Khand">Malaj&#x20;Khand</option><option value="Manasa">Manasa</option><option value="Manawar">Manawar</option><option value="Mandideep">Mandideep</option><option value="Mandla">Mandla</option><option value="Mandsaur">Mandsaur</option><option value="Mauganj">Mauganj</option><option value="Mhow&#x20;Cantonment">Mhow&#x20;Cantonment</option><option value="Mhowgaon">Mhowgaon</option><option value="Morena">Morena</option><option value="Multai">Multai</option><option value="Mundi">Mundi</option><option value="Murwara&#x20;&#x28;Katni&#x29;">Murwara&#x20;&#x28;Katni&#x29;</option><option value="Nagda">Nagda</option><option value="Nainpur">Nainpur</option><option value="Narsinghgarh">Narsinghgarh</option><option value="Neemuch">Neemuch</option><option value="Nepanagar">Nepanagar</option><option value="Niwari">Niwari</option><option value="Nowgong">Nowgong</option><option value="Nowrozabad&#x20;&#x28;Khodargama&#x29;">Nowrozabad&#x20;&#x28;Khodargama&#x29;</option><option value="Pachore">Pachore</option><option value="Pali">Pali</option><option value="Panagar">Panagar</option><option value="Pandhurna">Pandhurna</option><option value="Panna">Panna</option><option value="Pasan">Pasan</option><option value="Pipariya">Pipariya</option><option value="Pithampur">Pithampur</option><option value="Porsa">Porsa</option><option value="Prithvipur">Prithvipur</option><option value="Raghogarh-Vijaypur">Raghogarh-Vijaypur</option><option value="Rahatgarh">Rahatgarh</option><option value="Raisen">Raisen</option><option value="Rajgarh">Rajgarh</option><option value="Ratlam">Ratlam</option><option value="Rau">Rau</option><option value="Rehli">Rehli</option><option value="Rewa">Rewa</option><option value="Sabalgarh">Sabalgarh</option><option value="Sagar">Sagar</option><option value="Sanawad">Sanawad</option><option value="Sannai">Sannai</option><option value="Sarangpur">Sarangpur</option><option value="Sarni">Sarni</option><option value="Satna">Satna</option><option value="Saugor">Saugor</option><option value="Sausar">Sausar</option><option value="Sehore">Sehore</option><option value="Sendhwa">Sendhwa</option><option value="Seoni">Seoni</option><option value="Seoni-Malwa">Seoni-Malwa</option><option value="Shahdol">Shahdol</option><option value="Shajapur">Shajapur</option><option value="Shamgarh">Shamgarh</option><option value="Sheopur">Sheopur</option><option value="Shivpuri">Shivpuri</option><option value="Shujalpur">Shujalpur</option><option value="Sidhi">Sidhi</option><option value="Sihora">Sihora</option><option value="Singrauli">Singrauli</option><option value="Sironj">Sironj</option><option value="Sohagpur">Sohagpur</option><option value="Tarana">Tarana</option><option value="Tikamgarh">Tikamgarh</option><option value="Ujjain">Ujjain</option><option value="Umaria">Umaria</option><option value="Vidisha">Vidisha</option><option value="Vijaypur">Vijaypur</option><option value="Wara&#x20;Seoni">Wara&#x20;Seoni</option></optgroup>');
break;  

case "Maharashtra":
$('#citydefault').empty().append('<optgroup label="Maharashtra" id="Maharashtra"><option selected="true" value="-Select-">-Select-</option><option value="Achalpur">Achalpur</option><option value="Ahmadnagar">Ahmadnagar</option><option value="Ahmednagar">Ahmednagar</option><option value="Akola">Akola</option><option value="Akot">Akot</option><option value="Amalner">Amalner</option><option value="Ambejogai">Ambejogai</option><option value="Amravati">Amravati</option><option value="Anjangaon">Anjangaon</option><option value="Arvi">Arvi</option><option value="Aurangabad">Aurangabad</option><option value="Bhayandar">Bhayandar</option><option value="Bhiwandi">Bhiwandi</option><option value="Bhusaval">Bhusaval</option><option value="Chanda">Chanda</option><option value="Chinchvad">Chinchvad</option><option value="Dhule">Dhule</option><option value="Dhulia">Dhulia</option><option value="Ichalkaranji">Ichalkaranji</option><option value="Jalgaon">Jalgaon</option><option value="Junnar">Junnar</option><option value="Kalyan">Kalyan</option><option value="Kalyan-Dombivali">Kalyan-Dombivali</option><option value="Karjat">Karjat</option><option value="Kolhapur">Kolhapur</option><option value="Latur">Latur</option><option value="Loha">Loha</option><option value="Lonar">Lonar</option><option value="Lonavla">Lonavla</option><option value="Mahad">Mahad</option><option value="Malegaon">Malegaon</option><option value="Malkapur">Malkapur</option><option value="Mangalvedhe">Mangalvedhe</option><option value="Mangrulpir">Mangrulpir</option><option value="Manjlegaon">Manjlegaon</option><option value="Manmad">Manmad</option><option value="Manwath">Manwath</option><option value="Mehkar">Mehkar</option><option value="Mhaswad">Mhaswad</option><option value="Mira-Bhayandar">Mira-Bhayandar</option><option value="Morshi">Morshi</option><option value="Mukhed">Mukhed</option><option value="Mul">Mul</option><option value="Mumbai">Mumbai</option><option value="Murtijapur">Murtijapur</option><option value="Nagpur">Nagpur</option><option value="Nanded">Nanded</option><option value="Nanded-Waghala">Nanded-Waghala</option><option value="Nandgaon">Nandgaon</option><option value="Nandura">Nandura</option><option value="Nandurbar">Nandurbar</option><option value="Narkhed">Narkhed</option><option value="Nashik">Nashik</option><option value="Nasik">Nasik</option><option value="Nawapur">Nawapur</option><option value="Nilanga">Nilanga</option><option value="Osmanabad">Osmanabad</option><option value="Ozar">Ozar</option><option value="Pachora">Pachora</option><option value="Paithan">Paithan</option><option value="Palghar">Palghar</option><option value="Pandharkaoda">Pandharkaoda</option><option value="Pandharpur">Pandharpur</option><option value="Panvel">Panvel</option><option value="Parbhani">Parbhani</option><option value="Parli">Parli</option><option value="Partur">Partur</option><option value="Pathardi">Pathardi</option><option value="Pathri">Pathri</option><option value="Patur">Patur</option><option value="Pauni">Pauni</option><option value="Pen">Pen</option><option value="Phaltan">Phaltan</option><option value="Pulgaon">Pulgaon</option><option value="Pune">Pune</option><option value="Purna">Purna</option><option value="Pusad">Pusad</option><option value="Rahuri">Rahuri</option><option value="Rajura">Rajura</option><option value="Ramtek">Ramtek</option><option value="Ratnagiri">Ratnagiri</option><option value="Raver">Raver</option><option value="Risod">Risod</option><option value="Sailu">Sailu</option><option value="Sangamner">Sangamner</option><option value="Sangli">Sangli</option><option value="Sangole">Sangole</option><option value="Sasvad">Sasvad</option><option value="Satana">Satana</option><option value="Satara">Satara</option><option value="Savner">Savner</option><option value="Sawantwadi">Sawantwadi</option><option value="Shahade">Shahade</option><option value="Shegaon">Shegaon</option><option value="Shendurjana">Shendurjana</option><option value="Shirdi">Shirdi</option><option value="Shirpur-Warwade">Shirpur-Warwade</option><option value="Shirur">Shirur</option><option value="Shrigonda">Shrigonda</option><option value="Shrirampur">Shrirampur</option><option value="Sillod">Sillod</option><option value="Sinnar">Sinnar</option><option value="Solapur">Solapur</option><option value="Soyagaon">Soyagaon</option><option value="Talegaon&#x20;Dabhade">Talegaon&#x20;Dabhade</option><option value="Talode">Talode</option><option value="Tasgaon">Tasgaon</option><option value="Thane">Thane</option><option value="Tirora">Tirora</option><option value="Tuljapur">Tuljapur</option><option value="Tumsar">Tumsar</option><option value="Uchgaon">Uchgaon</option><option value="Udgir">Udgir</option><option value="Ulhasnagar">Ulhasnagar</option><option value="Umarga">Umarga</option><option value="Umarkhed">Umarkhed</option><option value="Umred">Umred</option><option value="Uran">Uran</option><option value="Uran&#x20;Islampur">Uran&#x20;Islampur</option><option value="Vadgaon&#x20;Kasba">Vadgaon&#x20;Kasba</option><option value="Vaijapur">Vaijapur</option><option value="Vasai-Virar">Vasai-Virar</option><option value="Vita">Vita</option><option value="Wadgaon&#x20;Road">Wadgaon&#x20;Road</option><option value="Wai">Wai</option><option value="Wani">Wani</option><option value="Wardha">Wardha</option><option value="Warora">Warora</option><option value="Warud">Warud</option><option value="Washim">Washim</option><option value="Yavatmal">Yavatmal</option><option value="Yawal">Yawal</option><option value="Yevla">Yevla</option></optgroup>');
break;  

case "Manipur":
$('#citydefault').empty().append('<optgroup label="Manipur" id="Manipur"><option selected="true" value="-Select-">-Select-</option><option value="Imphal">Imphal</option><option value="Lilong">Lilong</option><option value="Mayang&#x20;Imphal">Mayang&#x20;Imphal</option><option value="Thoubal">Thoubal</option></optgroup>');
break;  

case "Meghalaya":
$('#citydefault').empty().append('<optgroup label="Meghalaya" id="Meghalaya"><option selected="true" value="-Select-">-Select-</option><option value="Nongstoin">Nongstoin</option><option value="Shillong">Shillong</option><option value="Tura">Tura</option></optgroup>');
break;  

case "Mizoram":
$('#citydefault').empty().append('<optgroup label="Mizoram" id="Mizoram"><option selected="true" value="-Select-">-Select-</option><option value="Aizawl">Aizawl</option><option value="Lunglei">Lunglei</option><option value="Saiha">Saiha</option></optgroup>');
break;  

case "Nagaland":
$('#citydefault').empty().append('<optgroup label="Nagaland" id="Nagaland"><option selected="true" value="-Select-">-Select-</option><option value="Dimapur">Dimapur</option><option value="Kohima">Kohima</option><option value="Mokokchung">Mokokchung</option><option value="Tuensang">Tuensang</option><option value="Wokha">Wokha</option><option value="Zunheboto">Zunheboto</option></optgroup>');
break;  

case "Odisha":
$('#citydefault').empty().append('<optgroup label="Odisha" id="Odisha"><option selected="true" value="-Select-">-Select-</option><option value="Balangir">Balangir</option><option value="Baleshwar&#x20;Town">Baleshwar&#x20;Town</option><option value="Barbil">Barbil</option><option value="Bargarh">Bargarh</option><option value="Baripada&#x20;Town">Baripada&#x20;Town</option><option value="Bhadrak">Bhadrak</option><option value="Bhawanipatna">Bhawanipatna</option><option value="Bhubaneshwar">Bhubaneshwar</option><option value="Bhubaneswar">Bhubaneswar</option><option value="Brahmapur">Brahmapur</option><option value="Byasanagar">Byasanagar</option><option value="Cuttack">Cuttack</option><option value="Dhenkanal">Dhenkanal</option><option value="Jatani">Jatani</option><option value="Jharsuguda">Jharsuguda</option><option value="Kendrapara">Kendrapara</option><option value="Kendujhar">Kendujhar</option><option value="Malkangiri">Malkangiri</option><option value="Nabarangapur">Nabarangapur</option><option value="Paradip">Paradip</option><option value="Parlakhemundi">Parlakhemundi</option><option value="Pattamundai">Pattamundai</option><option value="Phulabani">Phulabani</option><option value="Puri">Puri</option><option value="Rairangpur">Rairangpur</option><option value="Rajagangapur">Rajagangapur</option><option value="Raurkela">Raurkela</option><option value="Rayagada">Rayagada</option><option value="Sambalpur">Sambalpur</option><option value="Soro">Soro</option><option value="Sunabeda">Sunabeda</option><option value="Sundargarh">Sundargarh</option><option value="Talcher">Talcher</option><option value="Tarbha">Tarbha</option><option value="Titlagarh">Titlagarh</option></optgroup>');
break;  

case "Puducherry":
$('#citydefault').empty().append('<optgroup label="Puducherry" id="Puducherry"><option selected="true" value="-Select-">-Select-</option><option value="Karaikal">Karaikal</option><option value="Mahe">Mahe</option><option value="Pondicherry">Pondicherry</option><option value="Puducherry">Puducherry</option><option value="Yanam">Yanam</option></optgroup>');
break;  

case "Punjab":
$('#citydefault').empty().append('<optgroup label="Punjab" id="Punjab"><option selected="true" value="-Select-">-Select-</option><option value="Abohar">Abohar</option><option value="Amritsar">Amritsar</option><option value="Barnala">Barnala</option><option value="Batala">Batala</option><option value="Bathinda">Bathinda</option><option value="Dhuri">Dhuri</option><option value="Faridkot">Faridkot</option><option value="Fazilka">Fazilka</option><option value="Firozpur">Firozpur</option><option value="Firozpur&#x20;Cantt.">Firozpur&#x20;Cantt.</option><option value="Gobindgarh">Gobindgarh</option><option value="Gurdaspur">Gurdaspur</option><option value="Haripur">Haripur</option><option value="Hoshiarpur">Hoshiarpur</option><option value="Jagraon">Jagraon</option><option value="Jalandhar">Jalandhar</option><option value="Jalandhar&#x20;Cantt.">Jalandhar&#x20;Cantt.</option><option value="Kapurthala">Kapurthala</option><option value="Khanna">Khanna</option><option value="Kharar">Kharar</option><option value="Kot&#x20;Kapura">Kot&#x20;Kapura</option><option value="Longowal">Longowal</option><option value="Ludhiana">Ludhiana</option><option value="Malaut">Malaut</option><option value="Malerkotla">Malerkotla</option><option value="Malout">Malout</option><option value="Mansa">Mansa</option><option value="Mauli">Mauli</option><option value="Moga">Moga</option><option value="Mohali">Mohali</option><option value="Morinda">Morinda</option><option value="India">India</option><option value="Mukerian">Mukerian</option><option value="Muktsar">Muktsar</option><option value="Nabha">Nabha</option><option value="Nakodar">Nakodar</option><option value="Nangal">Nangal</option><option value="Nawanshahr">Nawanshahr</option><option value="Pathankot">Pathankot</option><option value="Patiala">Patiala</option><option value="Patti">Patti</option><option value="Pattran">Pattran</option><option value="Phagwara">Phagwara</option><option value="Phillaur">Phillaur</option><option value="Qadian">Qadian</option><option value="Raikot">Raikot</option><option value="Rajpura">Rajpura</option><option value="Rampura&#x20;Phul">Rampura&#x20;Phul</option><option value="Rupnagar">Rupnagar</option><option value="Samana">Samana</option><option value="Sangrur">Sangrur</option><option value="Sirhind&#x20;Fatehgarh&#x20;Sahib">Sirhind&#x20;Fatehgarh&#x20;Sahib</option><option value="Sujanpur">Sujanpur</option><option value="Sunam">Sunam</option><option value="Talwara">Talwara</option><option value="Tarn&#x20;Taran">Tarn&#x20;Taran</option><option value="Urmar&#x20;Tanda">Urmar&#x20;Tanda</option><option value="Zira">Zira</option><option value="Zirakpur">Zirakpur</option></optgroup>');
break;  

case "Rajasthan":
$('#citydefault').empty().append('<optgroup label="Rajasthan" id="Rajasthan"><option selected="true" value="-Select-">-Select-</option><option value="Abu">Abu</option><option value="Ajmer">Ajmer</option><option value="Alwar">Alwar</option><option value="Barmer">Barmer</option><option value="Bharatpur">Bharatpur</option><option value="Bhilwara">Bhilwara</option><option value="Bikaner">Bikaner</option><option value="Chittaurgarh">Chittaurgarh</option><option value="Jaipur">Jaipur</option><option value="Jaisalmer">Jaisalmer</option><option value="Jalor">Jalor</option><option value="Jodhpur">Jodhpur</option><option value="Kota">Kota</option><option value="Lachhmangarh">Lachhmangarh</option><option value="Ladnu">Ladnu</option><option value="Lakheri">Lakheri</option><option value="Lalsot">Lalsot</option><option value="Losal">Losal</option><option value="Makrana">Makrana</option><option value="Malpura">Malpura</option><option value="Mandalgarh">Mandalgarh</option><option value="Mandawa">Mandawa</option><option value="Mangrol">Mangrol</option><option value="Merta&#x20;City">Merta&#x20;City</option><option value="Mount&#x20;Abu">Mount&#x20;Abu</option><option value="Nadbai">Nadbai</option><option value="Nagar">Nagar</option><option value="Nagaur">Nagaur</option><option value="Nasirabad">Nasirabad</option><option value="Nathdwara">Nathdwara</option><option value="Neem-Ka-Thana">Neem-Ka-Thana</option><option value="Nimbahera">Nimbahera</option><option value="Nohar">Nohar</option><option value="Nokha">Nokha</option><option value="Pali">Pali</option><option value="Phalodi">Phalodi</option><option value="Phulera">Phulera</option><option value="Pilani">Pilani</option><option value="Pilibanga">Pilibanga</option><option value="Pindwara">Pindwara</option><option value="Pipar&#x20;City">Pipar&#x20;City</option><option value="Prantij">Prantij</option><option value="Pratapgarh">Pratapgarh</option><option value="Raisinghnagar">Raisinghnagar</option><option value="Rajakhera">Rajakhera</option><option value="Rajaldesar">Rajaldesar</option><option value="Rajgarh&#x20;&#x28;Alwar&#x29;">Rajgarh&#x20;&#x28;Alwar&#x29;</option><option value="Rajgarh&#x20;&#x28;Churu&#x29;">Rajgarh&#x20;&#x28;Churu&#x29;</option><option value="Rajsamand">Rajsamand</option><option value="Ramganj&#x20;Mandi">Ramganj&#x20;Mandi</option><option value="Ramngarh">Ramngarh</option><option value="Ratangarh">Ratangarh</option><option value="Rawatbhata">Rawatbhata</option><option value="Rawatsar">Rawatsar</option><option value="Reengus">Reengus</option><option value="Sadri">Sadri</option><option value="Sadulpur">Sadulpur</option><option value="Sadulshahar">Sadulshahar</option><option value="Sagwara">Sagwara</option><option value="Sambhar">Sambhar</option><option value="Sanchore">Sanchore</option><option value="Sangaria">Sangaria</option><option value="Sardarshahar">Sardarshahar</option><option value="Sawai&#x20;Madhopur">Sawai&#x20;Madhopur</option><option value="Shahpura">Shahpura</option><option value="Sheoganj">Sheoganj</option><option value="Sikar">Sikar</option><option value="Sirohi">Sirohi</option><option value="Sojat">Sojat</option><option value="Sri&#x20;Madhopur">Sri&#x20;Madhopur</option><option value="Sujangarh">Sujangarh</option><option value="Sumerpur">Sumerpur</option><option value="Suratgarh">Suratgarh</option><option value="Takhatgarh">Takhatgarh</option><option value="Taranagar">Taranagar</option><option value="Todabhim">Todabhim</option><option value="Todaraisingh">Todaraisingh</option><option value="Tonk">Tonk</option><option value="Udaipur">Udaipur</option><option value="Udaipurwati">Udaipurwati</option><option value="Vijainagar">Vijainagar</option><option value="Ajmer">Ajmer</option></optgroup>');
break;  

case "Sikkim":
$('#citydefault').empty().append('<optgroup label="Sikkim" id="Sikkim"><option selected="true" value="-Select-">-Select-</option><option value="Gangtok">Gangtok</option></optgroup>');
break;  

case "Tamil Nadu":
$('#citydefault').empty().append('<optgroup label="Tamil Nadu" id="TN"><option selected="true" value="-Select-">-Select-</option><option value="Arakkonam">Arakkonam</option><option value="Aruppukkottai">Aruppukkottai</option><option value="Chennai">Chennai</option><option value="Coimbatore">Coimbatore</option><option value="Conjeeveram">Conjeeveram</option><option value="Cuddalore">Cuddalore</option><option value="Dindigul">Dindigul</option><option value="Erode">Erode</option><option value="Gobichettipalayam">Gobichettipalayam</option><option value="Kancheepuram">Kancheepuram</option><option value="Karur">Karur</option><option value="Kodaikanal">Kodaikanal</option><option value="Kumbakonam">Kumbakonam</option><option value="Lalgudi">Lalgudi</option><option value="Madurai">Madurai</option><option value="Manachanallur">Manachanallur</option><option value="Nagapattinam">Nagapattinam</option><option value="Nagercoil">Nagercoil</option><option value="Namagiripettai">Namagiripettai</option><option value="Namakkal">Namakkal</option><option value="Nandivaram-Guduvancheri">Nandivaram-Guduvancheri</option><option value="Nanjikottai">Nanjikottai</option><option value="Natham">Natham</option><option value="Negapatam">Negapatam</option><option value="Nellikuppam">Nellikuppam</option><option value="Neyveli&#x20;&#x28;TS&#x29;">Neyveli&#x20;&#x28;TS&#x29;</option><option value="O&#x27;&#x20;Valley">O&#x27;&#x20;Valley</option><option value="Oddanchatram">Oddanchatram</option><option value="Ootacamund">Ootacamund</option><option value="P.N.Patti">P.N.Patti</option><option value="Pacode">Pacode</option><option value="Padmanabhapuram">Padmanabhapuram</option><option value="Palani">Palani</option><option value="Palladam">Palladam</option><option value="Pallapatti">Pallapatti</option><option value="Pallikonda">Pallikonda</option><option value="Panagudi">Panagudi</option><option value="Panruti">Panruti</option><option value="Paramakudi">Paramakudi</option><option value="Parangipettai">Parangipettai</option><option value="Pattukkottai">Pattukkottai</option><option value="Perambalur">Perambalur</option><option value="Peravurani">Peravurani</option><option value="Periyakulam">Periyakulam</option><option value="Periyasemur">Periyasemur</option><option value="Pernampattu">Pernampattu</option><option value="Pollachi">Pollachi</option><option value="Polur">Polur</option><option value="Ponneri">Ponneri</option><option value="Pudukkottai">Pudukkottai</option><option value="Pudupattinam">Pudupattinam</option><option value="Puliyankudi">Puliyankudi</option><option value="Punjaipugalur">Punjaipugalur</option><option value="Rajapalaiyam">Rajapalaiyam</option><option value="Rajapalayam">Rajapalayam</option><option value="Ramanathapuram">Ramanathapuram</option><option value="Rameshwaram">Rameshwaram</option><option value="Rameswaram">Rameswaram</option><option value="Ranipet">Ranipet</option><option value="Rasipuram">Rasipuram</option><option value="Salem">Salem</option><option value="Sankarankovil">Sankarankovil</option><option value="Sankari">Sankari</option><option value="Sathyamangalam">Sathyamangalam</option><option value="Sattur">Sattur</option><option value="Shenkottai">Shenkottai</option><option value="Sholavandan">Sholavandan</option><option value="Sholingur">Sholingur</option><option value="Sirkali">Sirkali</option><option value="Sivaganga">Sivaganga</option><option value="Sivagiri">Sivagiri</option><option value="Sivakasi">Sivakasi</option><option value="Srivilliputhur">Srivilliputhur</option><option value="Surandai">Surandai</option><option value="Suriyampalayam">Suriyampalayam</option><option value="Tanjore">Tanjore</option><option value="Tenkasi">Tenkasi</option><option value="Thammampatti">Thammampatti</option><option value="Thanjavur">Thanjavur</option><option value="Tharamangalam">Tharamangalam</option><option value="Tharangambadi">Tharangambadi</option><option value="Theni&#x20;Allinagaram">Theni&#x20;Allinagaram</option><option value="Thirumangalam">Thirumangalam</option><option value="Thirupuvanam">Thirupuvanam</option><option value="Thiruthuraipoondi">Thiruthuraipoondi</option><option value="Thiruvallur">Thiruvallur</option><option value="Thiruvarur">Thiruvarur</option><option value="Thuraiyur">Thuraiyur</option><option value="Tindivanam">Tindivanam</option><option value="Tinnevelly">Tinnevelly</option><option value="Tiruchendur">Tiruchendur</option><option value="Tiruchengode">Tiruchengode</option><option value="Tiruchirappalli">Tiruchirappalli</option><option value="Tirukalukundram">Tirukalukundram</option><option value="Tirukkoyilur">Tirukkoyilur</option><option value="Tirunelveli">Tirunelveli</option><option value="Tirupathur">Tirupathur</option><option value="Tiruppur">Tiruppur</option><option value="Tiruttani">Tiruttani</option><option value="Tiruvannamalai">Tiruvannamalai</option><option value="Tiruvethipuram">Tiruvethipuram</option><option value="Tittakudi">Tittakudi</option><option value="Trichinopoly">Trichinopoly</option><option value="Tuticorin">Tuticorin</option><option value="Udhagamandalam">Udhagamandalam</option><option value="Udumalaipettai">Udumalaipettai</option><option value="Unnamalaikadai">Unnamalaikadai</option><option value="Usilampatti">Usilampatti</option><option value="Uthamapalayam">Uthamapalayam</option><option value="Uthiramerur">Uthiramerur</option><option value="Vadakkuvalliyur">Vadakkuvalliyur</option><option value="Vadalur">Vadalur</option><option value="Vadipatti">Vadipatti</option><option value="Valparai">Valparai</option><option value="Vandavasi">Vandavasi</option><option value="Vaniyambadi">Vaniyambadi</option><option value="Vedaranyam">Vedaranyam</option><option value="Vellakoil">Vellakoil</option><option value="Vellore">Vellore</option><option value="Vikramasingapuram">Vikramasingapuram</option><option value="Viluppuram">Viluppuram</option><option value="Virudhachalam">Virudhachalam</option><option value="Virudhunagar">Virudhunagar</option><option value="Viswanatham">Viswanatham</option></optgroup>');
break;  

case "Telangana":
$('#citydefault').empty().append('<optgroup label="Telangana" id="Telangana"><option selected="true" value="-Select-">-Select-</option><option value="Adilabad">Adilabad</option><option value="Armur">Armur</option><option value="Belampalli">Belampalli</option><option value="Bellampalle">Bellampalle</option><option value="Bhadrachalam">Bhadrachalam</option><option value="Bhainsa">Bhainsa</option><option value="Bhongir">Bhongir</option><option value="Bodhan">Bodhan</option><option value="Bodupal">Bodupal</option><option value="Devarkonda">Devarkonda</option><option value="Farooqnagar">Farooqnagar</option><option value="Gadwal">Gadwal</option><option value="Hyderabad">Hyderabad</option><option value="Jaggayyapeta">Jaggayyapeta</option><option value="Jagtial">Jagtial</option><option value="Jangaon">Jangaon</option><option value="Kagaznagar">Kagaznagar</option><option value="Kamareddipet">Kamareddipet</option><option value="Kamareddy">Kamareddy</option><option value="Karimnagar">Karimnagar</option><option value="Khammam">Khammam</option><option value="Koratla">Koratla</option><option value="Kothagudem">Kothagudem</option><option value="Kothapet">Kothapet</option><option value="Kottagudem">Kottagudem</option><option value="Kyathampalle">Kyathampalle</option><option value="Mahbubnagar">Mahbubnagar</option><option value="Mancheral">Mancheral</option><option value="Mancherial">Mancherial</option><option value="Mandamari">Mandamari</option><option value="Mandamarri">Mandamarri</option><option value="Mangur">Mangur</option><option value="Manuguru">Manuguru</option><option value="Medak">Medak</option><option value="Metpalli">Metpalli</option><option value="Miryalaguda">Miryalaguda</option><option value="Nagarkurnool">Nagarkurnool</option><option value="Nalgonda">Nalgonda</option><option value="Narayanpet">Narayanpet</option><option value="Nirmal">Nirmal</option><option value="Nizamabad">Nizamabad</option><option value="Paloncha">Paloncha</option><option value="Palwancha">Palwancha</option><option value="Ramagundam">Ramagundam</option><option value="Ramgundam">Ramgundam</option><option value="Sadasivpet">Sadasivpet</option><option value="Sangareddy">Sangareddy</option><option value="Secunderabad">Secunderabad</option><option value="Siddipet">Siddipet</option><option value="Sircilla">Sircilla</option><option value="Sirsilla">Sirsilla</option><option value="Suriapet">Suriapet</option><option value="Suryapet">Suryapet</option><option value="Tandur">Tandur</option><option value="Vikarabad">Vikarabad</option><option value="Wanaparthy">Wanaparthy</option><option value="Wanparti">Wanparti</option><option value="Warangal">Warangal</option><option value="Yellandu">Yellandu</option></optgroup>');
break;  

case "Tripura":
$('#citydefault').empty().append('<optgroup label="Tripura" id="Tripura"><option selected="true" value="-Select-">-Select-</option><option value="Agartala">Agartala</option><option value="Belonia">Belonia</option><option value="Dharmanagar">Dharmanagar</option><option value="Kailasahar">Kailasahar</option><option value="Khowai">Khowai</option><option value="Pratapgarh">Pratapgarh</option><option value="Udaipur">Udaipur</option></optgroup>');
break;  
   
case "Uttar Pradesh":
$('#citydefault').empty().append('<optgroup label="Uttar Pradesh" id="UP"><option selected="true" value="-Select-">-Select-</option><option value="Achhnera">Achhnera</option><option value="Agra">Agra</option><option value="Aligarh">Aligarh</option><option value="Allahabad">Allahabad</option><option value="Amroha">Amroha</option><option value="Azamgarh">Azamgarh</option><option value="Bahraich">Bahraich</option><option value="Bahraigh">Bahraigh</option><option value="Bareilly">Bareilly</option><option value="Budaun">Budaun</option><option value="Bulandshahr">Bulandshahr</option><option value="Cawnpore">Cawnpore</option><option value="Chandausi">Chandausi</option><option value="Etawah">Etawah</option><option value="Fatehpur">Fatehpur</option><option value="Fatehpur&#x20;Sikri">Fatehpur&#x20;Sikri</option><option value="Firozabad">Firozabad</option><option value="Fyzabad">Fyzabad</option><option value="Ghaziabad">Ghaziabad</option><option value="Gorakhpur">Gorakhpur</option><option value="Hapur">Hapur</option><option value="Hardoi">Hardoi</option><option value="Hathras">Hathras</option><option value="Jaunpur">Jaunpur</option><option value="Jhansi">Jhansi</option><option value="Kairana">Kairana</option><option value="Kalpi">Kalpi</option><option value="Kanpur">Kanpur</option><option value="Khair">Khair</option><option value="Laharpur">Laharpur</option><option value="Lakhimpur">Lakhimpur</option><option value="Lal&#x20;Gopalganj&#x20;Nindaura">Lal&#x20;Gopalganj&#x20;Nindaura</option><option value="Lalganj">Lalganj</option><option value="Lalitpur">Lalitpur</option><option value="Lar">Lar</option><option value="Loni">Loni</option><option value="Lucknow">Lucknow</option><option value="Mathura">Mathura</option><option value="Meerut">Meerut</option><option value="Mirzapur">Mirzapur</option><option value="Modinagar">Modinagar</option><option value="Moradabad">Moradabad</option><option value="Muzaffarnagar">Muzaffarnagar</option><option value="Nagina">Nagina</option><option value="Najibabad">Najibabad</option><option value="Nakur">Nakur</option><option value="Nanpara">Nanpara</option><option value="Naraura">Naraura</option><option value="Naugawan&#x20;Sadat">Naugawan&#x20;Sadat</option><option value="Nautanwa">Nautanwa</option><option value="Nawabganj">Nawabganj</option><option value="Nehtaur">Nehtaur</option><option value="Niwai">Niwai</option><option value="Noida">Noida</option><option value="Noorpur">Noorpur</option><option value="Obra">Obra</option><option value="Orai">Orai</option><option value="Padrauna">Padrauna</option><option value="Palia&#x20;Kalan">Palia&#x20;Kalan</option><option value="Parasi">Parasi</option><option value="Phulpur">Phulpur</option><option value="Pihani">Pihani</option><option value="Pilibhit">Pilibhit</option><option value="Pilkhuwa">Pilkhuwa</option><option value="Powayan">Powayan</option><option value="Pukhrayan">Pukhrayan</option><option value="Puranpur">Puranpur</option><option value="PurqUrban&#x20;Agglomerationzi">PurqUrban&#x20;Agglomerationzi</option><option value="Purwa">Purwa</option><option value="Rae&#x20;Bareli">Rae&#x20;Bareli</option><option value="Rampur">Rampur</option><option value="Rampur&#x20;Maniharan">Rampur&#x20;Maniharan</option><option value="Rasra">Rasra</option><option value="Rath">Rath</option><option value="Renukoot">Renukoot</option><option value="Reoti">Reoti</option><option value="Robertsganj">Robertsganj</option><option value="Rudauli">Rudauli</option><option value="Rudrapur">Rudrapur</option><option value="Sadabad">Sadabad</option><option value="Safipur">Safipur</option><option value="Saharanpur">Saharanpur</option><option value="Sahaspur">Sahaspur</option><option value="Sahaswan">Sahaswan</option><option value="Sahawar">Sahawar</option><option value="Sahjanwa">Sahjanwa</option><option value="Saidpur">Saidpur</option><option value="Sambhal">Sambhal</option><option value="Samdhan">Samdhan</option><option value="Samthar">Samthar</option><option value="Sandi">Sandi</option><option value="Sandila">Sandila</option><option value="Sardhana">Sardhana</option><option value="Seohara">Seohara</option><option value="Shahabad">Shahabad</option><option value="Hardoi">Hardoi</option><option value="Shahabad">Shahabad</option><option value="Rampur">Rampur</option><option value="Shahganj">Shahganj</option><option value="Shahjahanpur">Shahjahanpur</option><option value="Shahjanpur">Shahjanpur</option><option value="Shamli">Shamli</option><option value="Shamsabad">Shamsabad</option><option value="Agra">Agra</option><option value="Shamsabad">Shamsabad</option><option value="Farrukhabad">Farrukhabad</option><option value="Sherkot">Sherkot</option><option value="Shikarpur">Shikarpur</option><option value="Bulandshahr">Bulandshahr</option><option value="Shikohabad">Shikohabad</option><option value="Shishgarh">Shishgarh</option><option value="Siana">Siana</option><option value="Sikanderpur">Sikanderpur</option><option value="Sikandra&#x20;Rao">Sikandra&#x20;Rao</option><option value="Sikandrabad">Sikandrabad</option><option value="Sirsaganj">Sirsaganj</option><option value="Sirsi">Sirsi</option><option value="Sitalpur">Sitalpur</option><option value="Sitapur">Sitapur</option><option value="Soron">Soron</option><option value="Sultanpur">Sultanpur</option><option value="Sumerpur">Sumerpur</option><option value="SUrban&#x20;Agglomerationr">SUrban&#x20;Agglomerationr</option><option value="Tanda">Tanda</option><option value="Thakurdwara">Thakurdwara</option><option value="Thana&#x20;Bhawan">Thana&#x20;Bhawan</option><option value="Tilhar">Tilhar</option><option value="Tirwaganj">Tirwaganj</option><option value="Tulsipur">Tulsipur</option><option value="Tundla">Tundla</option><option value="Ujhani">Ujhani</option><option value="Unnao">Unnao</option><option value="Utraula">Utraula</option><option value="Varanasi">Varanasi</option><option value="Vrindavan">Vrindavan</option><option value="Warhapur">Warhapur</option><option value="Zaidpur">Zaidpur</option><option value="Zamania">Zamania</option></optgroup>');
break;  

case "Uttarakhand":
$('#citydefault').empty().append('<optgroup label="Uttarakhand" id="Uttarakhand"><option selected="true" value="-Select-">-Select-</option><option value="Bageshwar">Bageshwar</option><option value="Dehra&#x20;Dun">Dehra&#x20;Dun</option><option value="Dehradun">Dehradun</option><option value="Haldwani-cum-Kathgodam">Haldwani-cum-Kathgodam</option><option value="Hardwar">Hardwar</option><option value="Kashipur">Kashipur</option><option value="Manglaur">Manglaur</option><option value="Mussoorie">Mussoorie</option><option value="Nagla">Nagla</option><option value="Naini&#x20;Tal">Naini&#x20;Tal</option><option value="Nainital">Nainital</option><option value="Pauri">Pauri</option><option value="Pithoragarh">Pithoragarh</option><option value="Ramnagar">Ramnagar</option><option value="Rishikesh">Rishikesh</option><option value="Roorkee">Roorkee</option><option value="Rudrapur">Rudrapur</option><option value="Sitarganj">Sitarganj</option><option value="Srinagar">Srinagar</option><option value="Tehri">Tehri</option></optgroup>');
break;  

case "West Bengal":
$('#citydefault').empty().append('<optgroup label="West Bengal" id="WB"><option selected="true" value="-Select-">-Select-</option><option value="Adra">Adra</option><option value="Alipur&#x20;Duar">Alipur&#x20;Duar</option><option value="AlipurdUrban&#x20;Agglomerationr">AlipurdUrban&#x20;Agglomerationr</option><option value="Arambagh">Arambagh</option><option value="Asansol">Asansol</option><option value="Baharampur">Baharampur</option><option value="Baidyabati">Baidyabati</option><option value="Bali">Bali</option><option value="Balurghat">Balurghat</option><option value="Bangaon">Bangaon</option><option value="Bankura">Bankura</option><option value="Bansbaria">Bansbaria</option><option value="Barasat">Barasat</option><option value="Barddhaman">Barddhaman</option><option value="Basirhat">Basirhat</option><option value="Bhadreswar">Bhadreswar</option><option value="Bhatpara">Bhatpara</option><option value="Champdani">Champdani</option><option value="Chandannagar">Chandannagar</option><option value="Dam&#x20;Dam">Dam&#x20;Dam</option><option value="Darjeeling">Darjeeling</option><option value="Darjiling">Darjiling</option><option value="Durgapur">Durgapur</option><option value="English&#x20;Bazar">English&#x20;Bazar</option><option value="Gangarampur">Gangarampur</option><option value="Habra">Habra</option><option value="Haldia">Haldia</option><option value="Halisahar">Halisahar</option><option value="Haora">Haora</option><option value="Hugli">Hugli</option><option value="Hugli-Chinsurah">Hugli-Chinsurah</option><option value="Ingraj&#x20;Bazar">Ingraj&#x20;Bazar</option><option value="Jalpaiguri">Jalpaiguri</option><option value="Jamuria">Jamuria</option><option value="Jaynagar-Majilpur">Jaynagar-Majilpur</option><option value="Jhargram">Jhargram</option><option value="Kalimpong">Kalimpong</option><option value="Kalyani">Kalyani</option><option value="Kamarhati">Kamarhati</option><option value="Kanchrapara">Kanchrapara</option><option value="Kharagpur">Kharagpur</option><option value="Khardah">Khardah</option><option value="Kolkata">Kolkata</option><option value="Krishnanagar">Krishnanagar</option><option value="Kulti">Kulti</option><option value="Madhyamgram">Madhyamgram</option><option value="Mainaguri">Mainaguri</option><option value="Malda">Malda</option><option value="Mathabhanga">Mathabhanga</option><option value="Medinipur">Medinipur</option><option value="Memari">Memari</option><option value="Monoharpur">Monoharpur</option><option value="Murshidabad">Murshidabad</option><option value="Nabadwip">Nabadwip</option><option value="Naihati">Naihati</option><option value="Navadwip">Navadwip</option><option value="Panchla">Panchla</option><option value="PandUrban&#x20;Agglomeration">PandUrban&#x20;Agglomeration</option><option value="Panihati">Panihati</option><option value="Paschim&#x20;Punropara">Paschim&#x20;Punropara</option><option value="Purulia">Purulia</option><option value="Raghunathganj">Raghunathganj</option><option value="Raghunathpur">Raghunathpur</option><option value="Raiganj">Raiganj</option><option value="Rampurhat">Rampurhat</option><option value="Ranaghat">Ranaghat</option><option value="Rishra">Rishra</option><option value="Sainthia">Sainthia</option><option value="Santipur">Santipur</option><option value="Shantipur">Shantipur</option><option value="Shiliguri">Shiliguri</option><option value="Shrirampur">Shrirampur</option><option value="Siliguri">Siliguri</option><option value="Sonamukhi">Sonamukhi</option><option value="Srirampore">Srirampore</option><option value="Suri">Suri</option><option value="Taki">Taki</option><option value="Tamluk">Tamluk</option><option value="Tarakeswar">Tarakeswar</option><option value="Titagarh">Titagarh</option><option value="Uluberiya">Uluberiya</option></optgroup>');
break;  
}

});
/* End of city options change */

  
});

/* Swiper slider home & events & testimonials */
var home_swiper = new Swiper(".homeslider_swiper", {
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	},
	autoplay: 
    {
      delay: 5000,
    },
    loop: true
});

var swiper = new Swiper(".team_Slider", {
navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},
});
	  
var swiper = new Swiper(".testimonials_swiper", {
navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},
pagination: {
  el: ".swiper-pagination",
  clickable: true
},
});
