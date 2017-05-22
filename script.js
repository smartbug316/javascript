window.onload = function(){

	/*var _request = {};
	var self = this;
	
	var _api_method = "POST";
	const cookie_expire_days = 30
	var value = [];
	var _auth_flag = true;
	var store_id = 003;
	var cookie_url = 'http://localhost/priceoye.pk/api/referral_api/ref_cookie_post/';
	var user_url = 'http://localhost/priceoye.pk/api/referral_api/ref_user_post/';
	var today ;
	var get_params = url_params('referral', '');
	var total_price;
	var price ;
	var curCookie ;
	if(get_params === 'po'){
		var cookie =getCookie("po") || null;
		alert("your cookie" + cookie);
		if(cookie === null){
			expirey = new Date();
			expirey.setTime(expirey.getTime() + (cookie_expire_days*24*60*60*1000));
			today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 

			session_id = 'po'+ '-'+yyyy+mm+dd+ store_id + Math.floor(100000 + Math.random() * 900000);
			curCookie = "po" + "=" + "value" + ", session_id = " + session_id + ", date_create=" + expirey.toGMTString() + ";expires=" + expirey.toGMTString()+ "; path=/";
			value[1] = today;
			document.cookie = curCookie;
			alert("Your Cookie : " + today);
			
			
		}

		else{
			resetOnce();
			//curCookie = getCookie('priceoye');
			//alert("Your Cookie : " + getCookie('priceoye'));
			
			
		}
		
			
		var parameters = "session_id ="+ value[1].trim() +"&"+"store_id ="+3+"&"+"value ="+ location.href +"&"+"data_create ="+ new Date()+"&"+"data_modify ="+ new Date()+"&";
		sendRequest(cookie_url,parameters);
		//alert('session_id' + getCookie(session_id));

		document.addEventListener('click', function(e) {
				if(hasClass(e.target, 'AddCartButton')){
					setTimeout(function(){
						total_price = document.getElementsByClassName('SubTotal');
						price = total_price[1].children[2].children[0].innerText
						console.log(price);

					}, 5000);
				}
				else if(hasClass(e.target,'FloatRight') && hasID(e.target,'bottom_payment_button')){
					setTimeout(function(){
						var thanks_for = document.getElementsByClassName('ThanksForOrder');
						var parameters = "store_id ="+ 3 +"&"+"user_session_id ="+value[1].trim()+"&"+"order_number ="+ 'thankyou' +"&"+ "order_price = "+ 1345 + "&" +"cookie_data= "+ getCookie('priceoye')+"&";
						sendRequest(user_url, parameters);
					}, 5000);
				}
		})
	}
	var parameters = "store_id ="+ 3 +"&"+"user_session_id ="+value[1].trim()+"&"+"order_number ="+ 'thankyou' +"&"+ "order_price = "+ 1345 + "&" +"cookie_data= "+ getCookie('priceoye')+"&";
						sendRequest(user_url, parameters);
	
	function sendRequest(url, parameters){
		xmlhttp = new XMLHttpRequest();
		var url = url;
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("X-Auth-Request", "true");
        xmlhttp.setRequestHeader("Authorization", "Basic ");        
		
				    

			xmlhttp.send(parameters);

			handlePriceoyereferralClicksEvent();
			console.log(xmlhttp);
	}

	function hasClass(elm, className){
		return elm.className.split(' ').indexOf(className) > -1;
	}

	function hasID(elm, id){
		return elm.id.split(' ').indexOf(id) > -1;
	}

	function resetOnce() { 
		expirey = new Date();
		expirey.setTime(expirey.getTime() + (cookie_expire_days*24*60*60*1000));
		var cookie = getCookie('po');
		var arrays = cookie.split(',');
		var date_create = arrays[2].split('=');
		value = arrays[1].split('=');
		curCookie = "po" + "=" + "value" + ", session_id = " + value[1].trim() + ", date_create=" + date_create[1].trim() + ";expires=" + expirey.toGMTString()+ "; path=/";
		document.cookie = curCookie;
		
  		
	}

	

	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function url_params(name, url){
		if(!url)
			url = location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec(url);
		return results == null? null : results[1];
	}
	
    function handlePriceoyereferralClicksEvent () {

        // console.log("Priceoye popup plugin initialised");
        var poreferralClasses = [
            "AddCartButton",
            "FloatRight",
        ];

        var poreferralId = [
        	"bottom_payment_button"
        ]
        	


        // Append google analytics library in header
        includeGoogleAnalyticsLibrary();


        // Create ga tracker for priceoye

        ga('create', 'UA-6084692-23', 'auto', 'priceoyereferral');


        // Send page event data to priceoye account property
        ga('priceoyereferral.send', 'pageview');


        // Attach click event with 
        document.querySelector('body').addEventListener('click', function(event) {

            poreferralClasses.forEach(function(className) {
                if (event.target.className === className) {

                    // The following event indicating that the priceoye.pk product plugin was clicked
                    ga('priceoyereferral.send', 'event', {
                        'eventCategory': 'Referral Click',
                        'eventAction': 'Clicked',
                        'eventLabel': window.location.href,
                        'hitCallback': _self.googleAnalyticsHitCallback
                    });
                }
            }); 
            poreferralId.forEach(function(className) {
                if (event.target.id.toLowerCase() === className) {

                    // The following event indicating that the priceoye.pk product plugin was clicked
                    ga('priceoyereferral.send', 'event', {
                        'eventCategory': 'Referral Click',
                        'eventAction': 'Clicked',
                        'eventLabel': window.location.href,
                        'hitCallback': _self.googleAnalyticsHitCallback
                    });
                }
            });



        }); // End: Click event
    }


	  // Append library in header if not exist already
    function includeGoogleAnalyticsLibrary() {

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    }*/


   /* this.googleAnalyticsHitCallback = function() {
        // console.log('event sent to Google Analytics');
    }*/

    referral_system.__construct();

}