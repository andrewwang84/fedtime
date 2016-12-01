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
    $("#checkchef").click(function() {
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
    $("#subshopbtn").click(subshop);
    $("#join").click(join);
    if (top.location.pathname == '/shops.html')
      shops();
  	if (top.location.pathname == '/search.html')
      search();
    if (top.location.pathname == '/newshop.html')
      newshop();
});
var identity='',
    idname='',
    accessToken=''
function checkshop(shopid){

}
function initMap() {
  $.ajax({
    url:"http://fedtime-ncnuim.rhcloud.com/shop",
    type : "GET",
    dataType:'json',
    success:function(data){
      var i = 0 , marker;
      var lat = "",
          lng = ""
      var geocoder = new google.maps.Geocoder();
      $.each(data, function(index, element) {
        var url='/shops.html?_id='+ data[i]._id,
            addr = data[i].loc,
            title = data[i].title,
            name = data[i].uname,
            cost = data[i].cost
        geocoder.geocode({
          'address': addr
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
              map: map,
              icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(
                  '<div class="infow">' +
                  '<a href="' + url + '"><h5>' + title + '</h5></a>' +
                  '<h6>by ' + name + '</h6>' +
                  '<h6>每人: ' + cost + '</h6>' +
                  '</div>'
                );
                infowindow.open(map, marker);
                $('#shoptitle').append(title);
                $('#chefname').append(name);
              }
            })(marker, i));
          }
        });
        i++;
      });
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 23.9653936, lng: 120.9629768},
        zoom: 15
      });
      var infowindow = new google.maps.InfoWindow();
      var marker1 = new google.maps.Marker({map: map});
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          marker1.setPosition(pos);
          map.setCenter(pos);
        }, function() {
          alert('地圖定位失敗');
        });
      } else {
        // Browser doesn't support Geolocation
        alert('您的瀏覽器不支援定位服務');
      }
    }
  });
}
function newshop() {
  $(function () {
      $('#datetimepicker1').datetimepicker({
        format: 'YYYY/MM/DD hh:mm A'
      });
  });
  var date = moment($.now()+7200000).format("YYYY/MM/DD, hh:mm A");
  $('#start_t').attr("value",date);
}
function search() {
  var id = document.location.search;
  var tag = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          tag[ $1 ] = $3;
      }
  );
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      type : "GET",
      dataType:'json',
      success:function(data){
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].final=='0'){
            var url='/shops.html?_id='+ data[i]._id;
            $('.searchdisplay > .searchdisplayr').append(
              '<div class="col-sm-4 panel-item result">' +
                  '<div class="box" onclick="location.href=\''+ url +'\';">' +
                      '<div class="box-heading">' +
                          '<img src="images/festive-food-1388406500q51.jpg">' +
                      '</div>' +
                      '<div class="box-body">' +
                          '<h3>'+ data[i].title +'</h3>' +
                          '<div class="col-sm-6 city item-info">' +
                            '<h4>'+ data[i].loc_city +'</h4>' +
                          '</div>' +
                          '<div class="col-sm-6 cost item-info">' +
                            '<h4>$'+ data[i].cost +'/人</h4>' +
                          '</div>' +
                      '</div>' +
                  '</div>' +
              '</div>'
            );
            i++;
          }
        });
      }
  });
  $('#search_tag').keyup( function() {
    var that = this;
    var divBody = $('.searchdisplay .searchdisplayr');
    var divClass = $('.searchdisplay .searchdisplayr .result');
    $('.search-sf').remove();
    divClass.each( function(i, val) {
        //Lower text for case insensitive
        var rowText = $(val).text().toLowerCase();
        var inputText = $(that).val().toLowerCase();
        if(inputText != '') {
            $('.search-query-sf').remove();
            divBody.prepend('<div class="col-sm-9 search-query-sf"><h4><strong>Searching for: "'
                + $(that).val()
                + '"</strong></h4></div>');
        }else {
            $('.search-query-sf').remove();
        }
        if( rowText.indexOf( inputText ) == -1 ) {
            //hide rows
            divClass.eq(i).hide();
        }else {
            $('.search-sf').remove();
            divClass.eq(i).show();
        }
    });
    //all elements are hidden
    if(divClass.children(':visible').length == 0) {
        divBody.append('<div class="col-sm-9 search-sf"><h4 class="text-muted">查無結果</h4></div>');
    }
  });
}
function subshop() {
  FB.api('/me', function(user){
    var _id = identity;
    var name = idname;
    var title = $('#title').val();
    var describe = $('#describe').val();
    var c_num = $('#c_num').val();
    var minc_num = $('#minc_num').val();
    var host_t = $.now();
    var start_t = Date.parse($('#start_t').val());
    var end_t = start_t-7200000;
    console.log(start_t);
    var cost = $('#cost').val();
    var loc_city = $('#loc_city').val();
    var loc = $('#loc').val();
    var tags = [];
    $('input:checkbox[name=tags]:checked').each(function()
      {
         tags.push($(this).val());
      });
    var phone = $('#phone').val();
    var s_else = $('#s_else').val();
    var final = $('#final').val();
    var formData = new FormData();
    formData.append('file', $('#file')[0].files[0]);
    formData.append('upload_preset', "testtest");
    if( title == "" ) {
      $('label[for=title]').addClass('text-danger').append(' *請輸入標題');
      $('#title').focus();
      return false;
    }
    if( describe == "" ) {
      $('label[for=describe]').addClass('text-danger').append(' *請輸入簡介');
      $('#describe').focus();
      return false;
    }
    if( c_num <= 0 || c_num > 20) {
      $('label[for=c_num]').addClass('text-danger').append(' *人數須介於1~20之間');
      $('#c_num').focus();
      return false;
    }
    if( minc_num > c_num || minc_num == 0 || minc_num == "") {
      $('label[for=minc_num]').addClass('text-danger').append(' *人數不正確');
      $('#minc_num').focus();
      return false;
    }
    if( cost <= 0 || cost == "") {
      $('label[for=cost]').addClass('text-danger').append(' *請輸入價錢');
      $('#cost').focus();
      return false;
    }
    if( phone.length < 7 || phone.length > 10) {
      $('label[for=phone]').addClass('text-danger').append(' *請輸入正確電話');
      $('#phone').focus();
      return false;
    }
    if( loc_city == "") {
      $('label[for=loc_city]').addClass('text-danger').append(' *請輸入城市');
      $('#loc_city').focus();
      return false;
    }
    if( loc == "") {
      $('label[for=loc]').addClass('text-danger').append(' *請輸入正確地址');
      $('#loc').focus();
      return false;
    }
    swal({
        title: "你確定嗎?",
        text: "時間: " + $('#start_t').val() + "， 價錢: NT$ " + cost + "/人",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
      },
      function(){
        setTimeout(function(){
          $.ajax({
            url:"http://fedtime-ncnuim.rhcloud.com/shop",
            data:{
              'uid' : _id,
              'uname' : name,
              'title' : title,
              'describe' : describe,
              'cnum' : c_num,
              'mincnum' : minc_num,
              'cavalnum' : c_num,
              'host_t' : host_t,
              'start_t' : start_t,
              'end_t' : end_t,
              'cost' : cost,
              'loc_city' : loc_city,
              'loc' : loc,
              'tags' : JSON.stringify(tags),
              'phone' : phone,
              's_else' : s_else,
              'final' : final
            },
            type : "POST",
            dataType:'json',
            error:function(xhr){
              console.log("post fail1");
              swal("失敗!", "出錯了，請再試一次!", "error");
            },
            success:function(res){
              $.ajax({
                  url:"https://api.cloudinary.com/v1_1/fedtime/image/upload",
                  data: formData,
                  type : "POST",
                  processData: false,
                  contentType: false,
                  error:function(xhr){
                    console.log("post fail2");
                    swal("失敗!", "出錯了，請再試一次!", "error");
                  },
                  success:function(response){
                    $.ajax({
                      url:"http://fedtime-ncnuim.rhcloud.com/shop/"+res._id,
                      data: {'s_pic' : response.url},
                      type : "PATCH",
                      error:function(xhr){
                        console.log("post fail3");
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
              });
            }
        });
        }, 2000);
    });
  });
}
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
    $("#fbuser").text(response.name + " 的首頁");
    $("#fbnav").text("Hi~ " + response.name);
    idname = response.name;
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    $.get("http://fedtime-ncnuim.rhcloud.com/u/" + response.id,
      function(data){
        if(data == null){
          console.log('check user');
          console.log(response.link);
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
  FB.api('/me/picture?width=400', function(response){
    console.log(response.data.url);
    $('#profilepic').attr("src", response.data.url);
  });
  FB.api('/me', function(user){
    $.ajax({
      type: 'GET',
      url: 'http://fedtime-ncnuim.rhcloud.com/shop/s/'+user.id,
      dataType: 'json',
      success: function (data) {
        var i=0;
        $.each(data, function(index, element) {
            var stat = '';
            var date = moment(data[i].start_t).format("YYYY-MM-DD, HH:mm");
            if(data[i].final==0)
              stat='未完成';
            if(data[i].final==1)
              stat='交易成功';
            if(data[i].final==2)
              stat='交易失敗';
            $('#ustoret > tbody').append(
              '<tr id="tr' + i + '" class="warning"><td>' + date + '</td><td><a href=http://fedtime-ncnuim.rhcloud.com/shops.html?_id=' + data[i]._id +'>' + data[i].title + '</a></td><td>NT$' + data[i].cost + '</td><td>' + data[i].cnum + '</td><td>' + stat + '</td></tr>'
            );
            if(data[i].final==1)
              $('#tr' + i).addClass('success').removeClass('warning');
            if(data[i].final==2)
              $('#tr' + i).addClass('danger').removeClass('warning');
            i++;
        });
      }
    });
  });
}
function join() {
  var id = document.location.search;
  var obj = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          obj[ $1 ] = $3;
      }
  );
  FB.api('/me', function(user){
    $.ajax({
        url:"http://fedtime-ncnuim.rhcloud.com/shop/" + obj._id,
        type : "GET",
        success: function(data2) {
          $.ajax({
              url:"http://fedtime-ncnuim.rhcloud.com/shop/join/" + obj._id,
              type : "PATCH",
              dataType:'json',
              data: {
                'customerid' : identity
              },
              success: function(data) {
                var avalnumnow = parseInt(data2.cavalnum)-1;
                $.ajax({
                    url:"http://fedtime-ncnuim.rhcloud.com/shop/" + obj._id,
                    type : "PATCH",
                    dataType:'json',
                    data: {
                      'cavalnum' : avalnumnow
                    },
                    success: function(data) {
                      swal({
                          title: "成功!",
                          text: "成功參與這個飯局!",
                          type: "success",
                          showCancelButton: false,
                          confirmButtonText: "OK",
                          closeOnConfirm: false,
                          closeOnCancel: false
                        },
                        function(isConfirm){
                          if (isConfirm) {
                            location.reload();
                          }
                      });
                    }
                });
              }
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
        var i;
        $('#stitle').children('strong').text(data.title);
        $('#shost').append(data.uname);
        $('#sinfo').text(data.describe);
        var date = moment(data.start_t).format("YYYY-MM-DD, hh:mm A");
        $('#sstartt').text(date);
        $('#scnum').text(data.cnum + ' (尚餘: ' + data.cavalnum + ' 位)');
        $('#sprice').text(data.cost);
        $('#sloc').text(data.loc);
        $('#sother').text(data.s_else);
        $('#simg').attr("src", data.s_pic);
        $('#simgt').attr("src", data.s_pic);
        if(data.cavalnum <= 0){
          $('#scnum').addClass('text-danger').removeClass('text-success');
          $('#join').addClass('disabled');
        }
        if(data.cavalnum < data.cnum){
          for(i=0;i<data.customerid.length;i++){
            $.ajax({
                url:"http://fedtime-ncnuim.rhcloud.com/u/" + data.customerid[i],
                type : "GET",
                success: function(data2) {
                  $('.cosname').append('<a href="https://www.facebook.com/' + data2._id + '"><h3>' + data2.name + '</h3></a>');
                }
            });
          }
        }
      }
  });
}
function fbsendmessage(to) {
  FB.ui({
      method: 'send',
      name: "sdfds jj jjjsdj j j ",
      link: 'https://apps.facebook.com/xxxxxxxaxsa',
      to:to,
      description:'sasa d d dssd ds sd s s s '
  });
}
function fbLogoutUser() {
  FB.logout(function(response) {
    location.href= "http://fedtime-ncnuim.rhcloud.com/";
  });
}