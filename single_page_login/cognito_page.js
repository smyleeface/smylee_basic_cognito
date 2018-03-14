
$('#cognito_tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

//Verify User is logged in
var cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
    cognitoUser.getSession(function(err, session) {
        if (err) {
            // alert(err);
            $( "#login_success" ).html('&nbsp;');
            $( "#error_message" ).html(err);
            return;
        }
        console.log('session validity: ' + session.isValid());
        console.log(session);
        console.log(cognitoUser);
        console.log(cognitoUser.username);
        $( "#login_success" ).html('session validity: ' + session.isValid() + '<br>Token: ' + session.getAccessToken().getJwtToken());
        $( "#error_message" ).html('&nbsp;');
        if (session.isValid()) {
        	$("#li_logout").show();
        	$("#loggedinlogin").html('You are logged in.');
        	$("#loginform").hide();
        }
    });
}else{
	console.log('session::'+cognitoUser);
    $("#li_logout").hide();
}

//login form
$('#loginform').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    $un = $( "#un" ).val();
    $pw = $( "#pw" ).val();
    console.log($un, $pw);
    /* Validations go here */


    var authenticationData = {
        Username : $un,
        Password : $pw,
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var userData = {
        Username : $un,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
     cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            $( "#login_success" ).html(result.getAccessToken().getJwtToken());
            $( "#error_message" ).html("&nbsp;");
            $("#li_logout").show();
        	$("#loggedinlogin").html('You are logged in.');
        	$("#loginform").hide();
        },

        onFailure: function(err) {
            // console.log(err);
            $( "#login_success" ).text("&nbsp;");
            $( "#error_message" ).text("Incorrect username or password.");
        },

        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });

});

//create user
$('#createform').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    $un = $( "#create_un" ).val();
    $pw = $( "#create_pw" ).val();
    $phone_number = '+1'+$( "#phone_number" ).val();
    $person_name = $( "#person_name" ).val();
    $email = $( "#email" ).val();
    $city = $( "#city" ).val();
    console.log($un, $pw, $person_name, $email, $phone_number, $city);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : $email
    };
    var dataName = {
        Name : 'name',
        Value : $person_name
    };
    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : $phone_number
    };
    var dataPreferred = {
        Name : 'preferred_username',
        Value : $un
    };
    var dataCity = {
        Name : 'custom:city',
        Value : $city
    };

    var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
    var attributePreferred = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPreferred);
    var attributeCity = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataCity);

    attributeList.push(attributeName);
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attributePreferred);
    attributeList.push(attributeCity);

	var cognitoUser;
    userPool.signUp($un, $pw, attributeList, null, function(err, result){
        if (err) {
            // alert(err);
    		console.log(err);
        	$( "#login_success" ).html('&nbsp;');
    		$( "#error_message" ).html(err);
            return;
        }
        cognitoUser = result.user;
        $( "#login_success" ).html('Username is ' + cognitoUser.getUsername() + '. Please verify your account. ');
        $( "#error_message" ).html('&nbsp;');
        console.log('Username is ' + cognitoUser.getUsername() + '. Please verify your account. ');
    });

});


//enable user account with verification form
$('#verifyform').submit(function(ev) {
    ev.preventDefault(); // to stop the form from submitting
    $un = $( "#verify_un" ).val();
    $verify = $( "#verify" ).val();

    var userData = {
        Username : $un,
        Pool : userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.confirmRegistration($verify, true, function(err, result) {
        if (err) {
            // alert(err);
	        $( "#login_success" ).html('&nbsp;');
	        $( "#error_message" ).html(err);
            return;
        }
        console.log('call result: ' + result);
        $( "#login_success" ).html('verification ' +result);
        $( "#error_message" ).html('&nbsp;');
    });

});

//log out the current user
$('#logoutform').submit(function(ev) {
	ev.preventDefault();

	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser != null) {
	     cognitoUser.signOut();
		console.log("LOGGED OUT... ")
	    $( "#login_success" ).html("LOGGED OUT... ");
	    $( "#error_message" ).html('&nbsp;');
	    $("#li_logout").hide();
		$("#loggedinlogin").html('');
		$("#loginform").show();

	}else{
		console.log("not signed in...")
	    $( "#login_success" ).html("not signed in...");
	    $( "#error_message" ).html('&nbsp;');
	    $("#li_logout").hide();
	}
});
