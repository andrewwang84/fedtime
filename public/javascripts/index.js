$(document).ready(function(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '155953398151066',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
      });
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    $(".facebook").hide();
    $(function () {
      $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD hh:mm A'
      });
    });
    $("#service_content").load("service_content.html");
    $("#likechef").hover(function(){
        $(".fa-heart").css("color", "#ff0066");
      }, function(){
        $(".fa-heart").css("color", "#a6a6a6");
    });
    /*$(".likestar").hover(function(){
        $("i").addClass('fa-star').removeClass('fa-star-o');
      }, function(){
        $("i").addClass('fa-star-o').removeClass('fa-star');
    });*/
    $("#comfirm").click(function() {
        if($("#comfirm").prop('checked') == true){
          $(".facebook").toggle();
        }
        if($("#comfirm").prop('checked') == false){
          $(".facebook").hide();
        }
    });
    $("#checkshop").click(function() {
      window.location.href = '/shops.html';
    });
    $("#profilebtn").click(function() {
      window.location.href = '/profile.html';
    });
    $("#startbtn").click(function() {
      window.location.href = '/search.html';
    });
    $("#indexbs").click(function() {
      window.location.href = '/bestselect.html';
    });
    $("#indexbc").click(function() {
      window.location.href = '/bestchef.html';
    });
    $("#indexlb").click(function() {
      window.location.href = '/localbest.html';
    });
    $(".bcbox").click(function() {
      window.location.href = '/chef.html';
    });
    $(".newshopbtn").click(function() {
      window.location.href = '/newshop.html';
    });
    $(".logoutbtn").click(fbLogoutUser);
    //$("#search_go").click(search);
    $("#subshopbtn").click(subshop);
    if (top.location.pathname == '/shops.html')
      shops();
  	//if (top.location.pathname == '/search.html')
      //search();
});
/*function search() {
  var id = document.location.search;
  var tag = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          tag[ $1 ] = $3;
      }
  );
  $('#search_tag').keyup( function() {
       var that = this;
        // affect all table rows on in systems table
        var tableBody = $('.table-list-search tbody');
        var tableRowsClass = $('.table-list-search tbody tr');
        $('.search-sf').remove();
        tableRowsClass.each( function(i, val) {
            //Lower text for case insensitive
            var rowText = $(val).text().toLowerCase();
            var inputText = $(that).val().toLowerCase();
            if(inputText != '') {
                $('.search-query-sf').remove();
                tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Searching for: "'
                    + $(that).val()
                    + '"</strong></td></tr>');
            }else {
                $('.search-query-sf').remove();
            }
            if( rowText.indexOf( inputText ) == -1 ) {
                //hide rows
                tableRowsClass.eq(i).hide();
            }else {
                $('.search-sf').remove();
                tableRowsClass.eq(i).show();
            }
        });
        //all tr elements are hidden
        if(tableRowsClass.children(':visible').length == 0) {
            tableBody.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
        }
  });
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      type : "GET",
      dataType:'json',
      success:function(data){
        $.each(data, function(index, element) {
          if(){
            
          }
        });
      }
  });
}*/
function subshop() {
  var _id = identity;
  var name = idname;
  var title = $('#title').val();
  var describe = $('#describe').val();
  var c_num = $('#c_num').val();
  var host_t = $.now();
  var start_t = Date.parse($('#start_t').val());
  var end_t = start_t-7200000;
  var cost = $('#cost').val();
  var loc_city = $('#loc_city').val();
  var loc = $('#loc').val();
  var tags = [];
  $('input:checkbox[name=tags]:checked').each(function()
    {
       tags.push($(this).val());
    });
  var phone = $('#phone').val();
  var customerid = null;
  var s_else = $('#s_else').val();
  var final = $('#final').val();
  //var s_pic = $('s_pic').val();
  //console.log(s_pic);
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      data:{
        'uid' : _id,
        'uname' : name,
        'title' : title,
        'describe' : describe,
        'cnum' : c_num,
        'host_t' : host_t,
        'start_t' : start_t,
        'end_t' : end_t,
        'cost' : cost,
        'loc_city' : loc_city,
        'loc' : loc,
        'tags' : JSON.stringify(tags),
        'phone' : phone,
        'customerid' : customerid,
        's_else' : s_else,
        //'s_pic' : s_pic,
        'final' : final
      },
      type : "POST",
      dataType:'json',
      error:function(xhr){
        console.log("post fail");
        swal("失敗!", "出錯了，請再試一次!", "error");
      },
      success:function(){
        console.log("post success ");
        swal({
            title: "成功!",
            text: "成功送出一個新飯局!",
            type: "success",
            showCancelButton: false,
            confirmButtonText: "OK",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm){
            if (isConfirm) {
              location.replace("http://fedtime-ncnuim.rhcloud.com/profile.html");
            }
        });
      }
  });
}
var identity='';
var idname='';
var accessToken='';
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    $('#logincontent-fb').hide();
    $('#logincontent').hide();
    $('.logout').hide();
    $('.login').show();
    identity = response.authResponse.userID;
    accessToken = response.authResponse.accessToken;
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    if (top.location.pathname == '/profile.html'){
      window.location.replace("http://fedtime-ncnuim.rhcloud.com/index.html");
    }
    if (top.location.pathname == '/newshop.html'){
      window.location.replace("http://fedtime-ncnuim.rhcloud.com/index.html");
    }
    console.log('Please log into this app.');
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    if (top.location.pathname == '/profile.html'){
      window.location.replace("http://fedtime-ncnuim.rhcloud.com/index.html");
    }
    if (top.location.pathname == '/newshop.html'){
      window.location.replace("http://fedtime-ncnuim.rhcloud.com/index.html");
    }
    console.log('Please log into Facebook.');
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
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', { access_token: accessToken, fields: 'id,name,gender,email' }, function(response) {
    console.log('Successful login for: ' + response.name);
    $("#fbuser").text(response.name + " 的個人資料");
    $("#fbnav").text("Hi~ " + response.name);
    idname = response.name;
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    $.get("http://fedtime-ncnuim.rhcloud.com/u/" + response.id,
      function(data){
        if(data == null){
          console.log('check user');
          $.post("http://fedtime-ncnuim.rhcloud.com/u",
            {
              _id: response.id,
              name : response.name,
              email : response.email,
              sex : response.gender,
              token : accessToken,
              type : '0',
              agree : 'yes',
              rate : '0',
              shop_suc : '0',
              shop_fail : '0'
            }
          );
        }
        console.log('check token');
        if(data.token != accessToken){
          $.ajax({
            type: 'PATCH',
            url: 'http://fedtime-ncnuim.rhcloud.com/u/'+ response.id,
            dataType: 'json',
            data:{token : accessToken},
            success: function (data) {
              console.log('update token');
            }
          });
        }
        if (top.location.pathname == '/profile.html'){
          console.log('check rate');
          for (var i = 0; i < data.rate; i++) {
            $("#stars").append('<i class="fa fa-star" aria-hidden="true"></i>');
          }
          for (var i = 0; i < 5-data.rate; i++) {
            $("#stars").append('<i class="fa fa-star-o" aria-hidden="true"></i>');
          }
          profileupdate();
        }
    });
  });
}
function profileupdate() {
  FB.api('/me', function(user){
    $.ajax({
      type: 'GET',
      url: 'http://fedtime-ncnuim.rhcloud.com/shop',
      dataType: 'json',
      success: function (data) {
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].uid==user.id){
            var stat = '';
            var date = moment(data[i].start_t).format("YYYY-MM-DD, HH:mm");
            if(data[i].final==0)
              stat='未完成';
            if(data[i].final==1)
              stat='交易成功';
            if(data[i].final==2)
              stat='交易失敗';
            $('#ustoret > tbody').append(
              '<tr id="tr' + i + '" class="warning"><td>' + date + '</td><td><a href=http://fedtime-ncnuim.rhcloud.com/shops.html?_id=' + data[i]._id +'>' + data[i].title + '</a></td><td>' + stat + '</td></tr>'
            );
            if(data[i].final==1)
              $('#tr' + i).addClass('success').removeClass('warning');
            if(data[i].final==2)
              $('#tr' + i).addClass('danger').removeClass('warning');
          }
          i++;
        });
      }
    });
  });
}
function shops(){
  var id = document.location.search;
  var obj = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          obj[ $1 ] = $3;
      }
  );
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop/" + obj._id,
      type : "GET",
      dataType:'json',
      success:function(data){
        $('#stitle').children('strong').text(data.title);
        $('#shost').append(data.uname);
        $('#sinfo').text(data.describe);
        var date = moment(data.start_t).format("YYYY-MM-DD, hh:mm A");
        $('#sstartt').text(date);
        $('#scnum').text(data.cnum);
        $('#sprice').text(data.cost);
        $('#sloc').text(data.loc);
        $('#sother').text(data.s_else);
      }
  });
}
function fbLogoutUser() {
  FB.logout(function(response) {
    location.href= "http://fedtime-ncnuim.rhcloud.com/";
  });
}