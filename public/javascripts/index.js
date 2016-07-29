$(document).ready(function(){
    $(".facebook").hide();
    $("#comfirm").click(function() {
        if($("#comfirm").prop('checked') == true){
          $(".facebook").toggle();
        }
        if($("#comfirm").prop('checked') == false){
          $(".facebook").hide();
        }
    });
    $(function () {
      $('#datetimepicker1').datetimepicker();
    });
    $("#newshop").on('click', function(){
      //先取得欄位值
      var uid = $('#uid').val();
      var c_num = $('c_num').val();
      var start_t = $('#start_t').val();
      var cost = $('#cost').val();
      var loc_city = $('#loc_city').val();
      var loc = $('#loc').val();
      var phone = $('#phone').val();
      var tags = "";
      $(":checkbox").each(function () {
          var ischecked = $(this).is(":checked");
          if (ischecked) {
              tags += $(this).val() + "|";
          }
      });
      var s_else = $('#s_else').val();
      //判斷有無正確填寫
      if(c_num=="" || start_t=="" || cost=="" || loc_city=="" || loc=="" || phone==""){
          alert("欄位不可留空");
          return false;
      }
      //真正的ajax動作從這裡開始
      $.ajax({
          url:"03-newshop.php",
          type:"POST",
          data:"uid="+uid+"&c_num="+c_num+"&start_t="+start_t+"&cost="+cost+"&loc_city="+loc_city+"&loc="+loc+"&phone="+phone+"&tags="+tags+"&s_else="+s_else,
          success:function(){
              alert('成功');
          },
          error:function(){
              alert('Ajax request 發生錯誤');
          },
      });
    });
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '155953398151066',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.2' // use version 2.2
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });
    }
});
