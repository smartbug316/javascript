var referral_system = new function(){
	var _request = {};
	var self = this;
	
	var _api_method = "POST";
	const cookie_expire_days = 30
	var value = [];
	var current_location = location.href;
	var date_create = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var _auth_flag = true;
	var store_id = 003;
	var saveCookieData_url = 'http://localhost/priceoye.pk/api/referral_api/ref_cookie_post/';
	var saveOrderData_url = 'http://localhost/priceoye.pk/api/referral_api/ref_order_post/';
	var today ;
	var get_params;
	var session_id;
	var total_price;
	var price ;
	var curCookie ;

	this.__construct = function() {
		get_params = self.url_params('referral', '');
		self.check_cookie();
		self.setClickEvents();
        
    }

    this.check_cookie = function(){
    	if(get_params === 'po'){
		var cookie = self.getCookie("po") || null;
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
			curCookie = "po" + "=" + "value" + ", session_id = " + session_id + ", date_create =" + date_create + ";expires=" + expirey.toGMTString()+ "; path=/";
			value[1] = session_id;
			document.cookie = curCookie;
			//return session_id;
			
			
		}

		else{
			self.resetOnce();
			curCookie = self.getCookie('po');
			//return curCookie;
			
			
			
		}
		
			
		var parameters = "session_id =" + value[1].trim() + "&" + "store_id =" + store_id + "&" + "value =" + current_location + "&" ;
		self.sendRequest(saveCookieData_url,parameters);
		//alert('session_id' + getCookie(session_id));

		
		}
    } 

    this.setClickEvents = function(){
    	document.addEventListener('click', function(e) {
				if(self.hasClass(e.target, 'AddCartButton')){
					setTimeout(function(){
						total_price = document.getElementsByClassName('SubTotal');
						price = total_price[1].children[2].children[0].innerText;
						price = 123;
					}, 5000);
				}
				else if(self.hasClass(e.target,'FloatRight') && self.hasID(e.target,'bottom_payment_button')){
					setTimeout(function(){
						var thanks_for = document.getElementsByClassName('ThanksForOrder');
						var parameters = "store_id ="+ store_id + "&" + "user_session_id =" +value[1].trim() + "&"+"order_number =" + 'thankyou' + "&" + "order_price = "+ 1345 + "&" +"cookie_data= "+ self.getCookie('po')+ "&";
						self.sendRequest(saveOrderData_url, parameters);
					}, 5000);
				}
		})
    }
	
	this.sendRequest = function(url, parameters){
		xmlhttp = new XMLHttpRequest();
		var url = url;
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("X-Auth-Request", "true");
        xmlhttp.setRequestHeader("Authorization", "Basic ");        
		
				    

			xmlhttp.send(parameters);

			//handlePriceoyereferralClicksEvent();
			//console.log(xmlhttp);
	}

	this.hasClass = function(elm, className){
		return elm.className.split(' ').indexOf(className) > -1;
	}

	this.hasID = function(elm, id){
		return elm.id.split(' ').indexOf(id) > -1;
	}

	this.resetOnce = function(){ 
		expirey = new Date();
		expirey.setTime(expirey.getTime() + (cookie_expire_days*24*60*60*1000));
		var cookie = self.getCookie('po');
		var arrays = cookie.split(',');
		var date_create = arrays[2].split('=');
		value = arrays[1].split('=');
		curCookie = "po" + "=" + "value" + ", session_id = " + value[1].trim() + ", date_create=" + date_create[1].trim() + ";expires=" + expirey.toGMTString()+ "; path=/";
		document.cookie = curCookie;
		
  		
	}

	

	this.getCookie = function(cname) {
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

	this.url_params = function(name, url){
		if(!url)
			url = location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec(url);
		return results == null? null : results[1];
	}
    //this.__construct();
}

