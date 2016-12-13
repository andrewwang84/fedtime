var identity='',
    idname='',
    accessToken=''
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
function bestchef() {
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/u",
      type : "GET",
      dataType:'json',
      success:function(data){
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].type=='1'){
            var url='/chef.html?_id='+ data[i]._id;
            $('.chefdisplay').append(
              '<div class="row col-sm-6 panel-item bcbox">'+
                '<div class="col-xs-4 col-sm-6 bcbox-l"><a href="'+ url +'">'+
                    '<img src="'+ data[i].img +'" class="img-responsive img-thumbnail" alt="Responsive image" id="pic'+data[i]._id+'">'+
                '</div>'+
                '<div class="col-xs-4 col-sm-6 bcbox-r wrap" id="'+ data[i]._id +'">'+
                    '<h3>'+ data[i].name +'</h3>'+
                    '<h3 id="sstartt">專長: '+ data[i].telant +'</h3>'+
                    '<h3 id="scnum">評分: '+ data[i].rate +'/5</h3>'+
                    '<h3 id="sprice">追蹤人數: '+ data[i].follower +'</h3>'+
                '</div></a>'+
            '</div>'
            );
          }
          i++;
        });
      }
  });
}
function chef(){
  var id = document.location.search;
  var obj = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          obj[ $1 ] = $3;
      }
  );
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/u/"+obj._id,
      type : "GET",
      success: function(data) {
        $('#chefimg').attr('src',data.img);
        $('.chefdata').append(
              '<h1 id="chefname">'+ data.name +'</h1>'+
              '<hr>'+
              '<dl class="dl-horizontal chefinfo">'+
                '<dt><h4>專長: </h4></dt>'+
                '<dd><h5 id="chefbest">'+ data.telant +'</h5></dd>'+
                '<dt><h4>整體評價: </h4></dt>'+
                '<dd><h5 id="rate"></h5></dd>'+
                '<dt><h4>餐點: </h4></dt>'+
                '<dd><h5 id="foodrate"></h5></dd>'+
                '<dt><h4>用餐環境: </h4></dt>'+
                '<dd><h5 id="placerate"></h5></dd>'+
                '<dt><h4>交易成功: </h4></dt>'+
                '<dd><h5 id="success">'+ data.shop_suc +'次</h5></dd>'+
                '<dt><h4>交易失敗: </h4></dt>'+
                '<dd><h5 id="fail">'+ data.shop_fail +'次</h5></dd>'+
                '<dt><h4>惡意缺席: </h4></dt>'+
                '<dd><h5 id="meaneat">'+ data.shop_mean_noeat +'次</h5></dd>'+
                '<dt><h4>惡意流局: </h4></dt>'+
                '<dd><h5 id="meancook">'+ data.shop_mean_nocook +'次</h5></dd>'+
                '<dt><h4>主廚的話: </h4></dt>'+
                '<dd><h5 id="chefword">'+ data.words +'</h5></dd>'+
              '</dl>'
        );
        for (var i = 0; i < data.rate; i++) {
          $('#rate').append('<i class="fa fa-star" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5-data.rate; i++) {
          $('#rate').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
        }
        for (var i = 0; i < data.foodrate; i++) {
          $('#foodrate').append('<i class="fa fa-star" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5-data.foodrate; i++) {
          $('#foodrate').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
        }
        for (var i = 0; i < data.placerate; i++) {
          $('#placerate').append('<i class="fa fa-star" aria-hidden="true"></i>');
        }
        for (var i = 0; i < 5-data.placerate; i++) {
          $('#placerate').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
        }
      }
  });
  FB.api('/me', function(user){
    $.get("http://fedtime-ncnuim.rhcloud.com/likechef/" + user.id,
      function(data,url){
        var i=0;
        if(data != null && data.chefid.length != 0){
          $.each(data.chefid, function(index, element) {
            if(obj._id == data.chefid[i]){
              $('#likechef').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消最愛');
              $('.fa-heart').css("color", "#ee245e");
              return false;
            }
            i++;
          });
        }
    });
    $('#checkchef').click(function() {
      window.location.href = '/search.html?_id='+obj._id;
    });
    $('#likechef').click(function() {
      $.get("http://fedtime-ncnuim.rhcloud.com/likechef/" + user.id,
        function(data,url){
          var i=0,
              count=0
          if(data != null && data.chefid.length != 0){
            $.each(data.chefid, function(index, element) {
              if(obj._id == data.chefid[i]){
                $.ajax({
                  url:"http://fedtime-ncnuim.rhcloud.com/likechef/"+user.id,
                  type : "delete",
                  dataType:'json',
                  data:{
                    'chefid' : data.chefid[i]
                  },
                  success:function(){
                    $('#likechef').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp加入最愛');
                    $('.fa-heart').css("color", "#a6a6a6");
                    $.get("http://fedtime-ncnuim.rhcloud.com/u/" + obj._id,
                      function(data,url){
                        var f=data.follower-1;
                        $.ajax({
                          url:"http://fedtime-ncnuim.rhcloud.com/u/"+obj._id,
                          type : "Patch",
                          dataType:'json',
                          data:{
                            'follower' : f
                          },
                          success:function(){
                            console.log(f);
                          }
                        });
                    });
                  }
                });
                return false;
              } else {
                count++;
              }
              i++;
            });
            if(count == data.chefid.length){
              $.ajax({
                url:"http://fedtime-ncnuim.rhcloud.com/likechef/"+user.id,
                type : "Patch",
                dataType:'json',
                data:{
                  'chefid' : obj._id
                },
                success:function(){
                  $('#likechef').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消最愛');
                  $('.fa-heart').css("color", "#ee245e");
                  $.get("http://fedtime-ncnuim.rhcloud.com/u/" + obj._id,
                    function(data,url){
                      var f=data.follower+1;
                      $.ajax({
                        url:"http://fedtime-ncnuim.rhcloud.com/u/"+obj._id,
                        type : "Patch",
                        dataType:'json',
                        data:{
                          'follower' : f
                        },
                        success:function(){
                          console.log(f);
                        }
                      });
                  });
                }
              });
            }
          } else {
            $.ajax({
              url:"http://fedtime-ncnuim.rhcloud.com/likechef",
              type : "Post",
              dataType:'json',
              data:{
                '_id' : identity,
                'chefid' : obj._id
              },
              success:function(){
                $('#likechef').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消最愛');
                $('.fa-heart').css("color", "#ee245e");
                $.get("http://fedtime-ncnuim.rhcloud.com/u/" + obj._id,
                  function(data,url){
                    var f=data.follower+1;
                    $.ajax({
                      url:"http://fedtime-ncnuim.rhcloud.com/u/"+obj._id,
                      type : "Patch",
                      dataType:'json',
                      data:{
                        'follower' : f
                      },
                      success:function(){
                        console.log(f);
                      }
                    });
                });
              }
            });
          }
      });
    });
  });
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
            cost = data[i].cost,
            img = data[i].s_pic,
            date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A"),
            cnum = data[i].cnum
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
                $('.mapcontent').empty();
                $('#shoptitle').append(title);
                $('#chefname').append("By "+name);
                $("#shopimg").attr('src',img);
                $("#sstartt").append("時間: "+date);
                $("#scnum").append("人數: "+cnum);
                $("#sprice").append("價錢: NT$"+cost);
                $('#checkshop').click(function() {
                  window.location.href = url;
                });
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
function initMap2() {
  var i = 0 , marker,
      lat = "",
      lng = "",
      geocoder = new google.maps.Geocoder(),
      addr = ""
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.951374, lng: 120.928642},
    zoom: 15
  });
  var infowindow = new google.maps.InfoWindow();
  var infowindow2 = new google.maps.InfoWindow();
  var marker1 = new google.maps.Marker({map: map});
  var marker2 = new google.maps.Marker({map: map});
  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          infowindow2.setContent(
            '<div class="subshopmap text-center">'+
              '<h4>'+ results[0].formatted_address +'</h4>'+
              '<button class="btn btn-warning" id="loccomfirm2"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp就是這裡&nbsp!</button>'+
            '</div>'
          );
          $("#loccomfirm2").click(function(){
            $("#loc").val(results[0].formatted_address);
            $("#myModalmap").modal('toggle');
          });
        }
      }
    });
    marker2.setPosition(event.latLng);
    infowindow2.open(map, marker2);
  });
  google.maps.event.addListener(marker2, 'click', (function(marker, i) {
    return function() {
      infowindow2.open(map, marker2);
    }
  })(marker, i));
  google.maps.event.addListener(marker1, 'click', (function(marker, i) {
    return function() {
      infowindow.open(map, marker1);
    }
  })(marker, i));
  $("#openmap").click(function() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        marker1.setPosition(pos);
        map.setCenter(pos);
        geocoder.geocode({
          'latLng': pos
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              infowindow.setContent(
                '<div class="subshopmap text-center">'+
                  '<h4>'+ results[0].formatted_address +'</h4>'+
                  '<button class="btn btn-warning btn-sm" id="loccomfirm1"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp就是這裡&nbsp!</button>'+
                '</div>'
              );
              $("#loccomfirm1").click(function(){
                $("#loc").val(results[0].formatted_address);
                $("#myModalmap").modal('toggle');
              });
            }
          }
        });
        //infowindow.open(map, marker1);
      }, function() {
        alert('地圖定位失敗');
      });
    } else {
      // Browser doesn't support Geolocation
      alert('您的瀏覽器不支援定位服務');
    }
  });
}
function initMap3() {
  var id = document.location.search;
  var obj = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          obj[ $1 ] = $3;
      }
  );
  var i = 0 ,
      geocoder = new google.maps.Geocoder(),
      addr = ""
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.951374, lng: 120.928642},
    zoom: 15
  });
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({map: map});
  var pos={};
  $.ajax({
    url:"http://fedtime-ncnuim.rhcloud.com/shop/"+obj._id,
    type : "GET",
    dataType:'json',
    success:function(data){
      addr=data.loc;
      geocoder.geocode({
        'address': addr
      }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          pos = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
            map: map
          });
          map.setCenter(pos);
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(
                '<a href="https://www.google.com/maps/dir//'+addr+'" title="點我看地圖"><i class="fa fa-location-arrow" aria-hidden="true"></i>&nbsp用 Google Map 開啟</a>'
              );
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
      });
    }
  });
  $("#myModalmap1").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    map.setCenter(pos);
  });
}
function newshop() {
  $(function () {
      $('#datetimepicker1').datetimepicker({
        format: 'YYYY/MM/DD hh:mm A'
      });
  });
  var date = moment($.now()+10800000).format("YYYY/MM/DD, hh:mm A");
  $('#start_t').attr("value",date);
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
    //console.log(start_t);
    var cost = $('#cost').val();
    var loc_city = null;
    var loc = $('#loc').val();
    var tags = [];
    $('input:checkbox[name=tags]:checked').each(function()
      {
         tags.push($(this).val());
      });
    var phone = $('#phone').val();
    var s_else = $('#s_else').val();
    var final = $('#final').val();
    var formData0 = new FormData();
    var formData1 = new FormData();
    var formData2 = new FormData();
    var i=0,count=$('#file')[0].files.length;
    var nowdata="";
    if(count > 3){
      $('label[for=upload_preset]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp圖片最多三張喔~');
      $('#upload_preset').focus();
      return false;
    }else{
      for(i=0;i<count;i++){
        nowdata=eval('formData'+i);
        nowdata.append('file', $('#file')[0].files[i]);
        nowdata.append('upload_preset', "testtest");
      }
    }
    if( title == "" ) {
      $('label[for=title]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp請輸入標題');
      $('#title').focus();
      return false;
    }
    if( describe == "" ) {
      $('label[for=describe]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp請輸入簡介');
      $('#describe').focus();
      return false;
    }
    if( c_num <= 0 || c_num > 20) {
      $('label[for=c_num]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp人數須介於1~20之間');
      $('#c_num').focus();
      return false;
    }
    if( minc_num > c_num || minc_num == 0 || minc_num == "") {
      $('label[for=minc_num]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp人數不正確');
      $('#minc_num').focus();
      return false;
    }
    if( cost <= 0 || cost == "") {
      $('label[for=cost]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp請輸入價錢');
      $('#cost').focus();
      return false;
    }
    if( phone.length < 7 || phone.length > 10) {
      $('label[for=phone]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp請輸入正確電話');
      $('#phone').focus();
      return false;
    }
    if( loc == "") {
      $('label[for=loc]').addClass('text-danger').append('&nbsp<i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp請輸入正確地址');
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
              for(i=0;i<count;i++){
                nowdata=eval('formData'+i);
                $.ajax({
                  url:"https://api.cloudinary.com/v1_1/fedtime/image/upload",
                  data: nowdata,
                  type : "POST",
                  processData: false,
                  contentType: false,
                  error:function(xhr){
                    console.log("post fail2");
                    swal("失敗!", "出錯了，請再試一次!", "error");
                  },
                  success:function(response){
                    $.ajax({
                      url:"http://fedtime-ncnuim.rhcloud.com/shop/join/"+res._id,
                      data: {'s_pic' : response.url},
                      type : "PATCH",
                      error:function(xhr){
                        console.log("post fail3");
                        swal("失敗!", "出錯了，請再試一次!", "error");
                      },
                      success:function(){
                        if(i==count){
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
                      }
                    });
                  }
                });
              }
            }
        });
        }, 1000);
    });
  });
}
function search() {
  var id = document.location.search;
  var obj = {};
  id.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          obj[ $1 ] = $3;
      }
  );
  var tf="",
      pf=""
  var date="";
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      type : "GET",
      dataType:'json',
      success:function(data){
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].final=='0'){
            var url='/shops.html?_id='+ data[i]._id;
            date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
            $('.searchdisplay > .searchdisplayr').append(
              '<div class="col-sm-4 panel-itemsearch result">' +
                  '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                      '<div class="box-heading">' +
                          '<img src="'+data[i].s_pic[0]+'">' +
                      '</div>' +
                      '<div class="box-body col-sm-12">' +
                          '<h3>'+ data[i].title +'</h3>'+
                          '<h5>by '+ data[i].uname +'</h5>' +
                          '<h5>'+ date +'</h5>'+
                          '<div class="col-sm-6 city item-info">' +
                            '<h4>'+ data[i].loc +'</h4>' +
                          '</div>' +
                          '<div class="col-sm-6 cost item-info">' +
                            '<h4>$'+ data[i].cost +'/人</h4>' +
                          '</div>' +
                          '<div class="hiddeninfo">'+
                            data[i].uid+data[i].tags+data[i].describe+
                      '</div>' +
                  '</div>' +
              '</div>'
            );
            i++;
          }
        });
      }
  });
  var filteroptiont="";
  $("#timefilter").on('click', 'li', function(){
    $("#tfbtn").text($(this).text());
    tf=this.id;
    $(".searchdisplayr").empty();
    var datenow = moment().valueOf();
    var a=parseInt(datenow)+(24*60*60*1000),
        b=parseInt(datenow)+(7*24*60*60*1000),
        c=parseInt(datenow)+(30*24*60*60*1000),
        d=parseInt(datenow)+(60*24*60*60*1000)
    if(tf == "1day")
      filteroptiont=a;
    if(tf == "1week")
      filteroptiont=b;
    if(tf == "1month")
      filteroptiont=c;
    if(tf == "2months")
      filteroptiont=d;
    if(tf == "allt")
      filteroptiont=""
    $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      type : "GET",
      dataType:'json',
      success:function(data){
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].final=='0'){
            //console.log(filteroptiont);
            //console.log(data[i].start_t);
            if(data[i].start_t <= parseInt(filteroptiont) || filteroptiont == ""){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            i++;
          }
        });
      }
    });
  });
  $("#pricefilter").on('click', 'li', function(){
    $("#pfbtn").text($(this).text());
    pf=this.id;
    $(".searchdisplayr").empty();
    $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop",
      type : "GET",
      dataType:'json',
      success:function(data){
        var i=0;
        $.each(data, function(index, element) {
          if(data[i].final=='0'){
            if(pf == "below100" && data[i].cost <= 100){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            if(pf == "100200" && data[i].cost > 100 && data[i].cost <= 200){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            if(pf == "200300" && data[i].cost > 200 && data[i].cost <= 300){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            if(pf == "300up" && data[i].cost > 300){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            if(pf == "allp"){
              var url='/shops.html?_id='+ data[i]._id;
              date = moment(data[i].start_t).format("YYYY/MM/DD, hh:mm A");
              $('.searchdisplay > .searchdisplayr').append(
                '<div class="col-sm-4 panel-item result">' +
                    '<div class="box col-sm-12" onclick="location.href=\''+ url +'\';">' +
                        '<div class="box-heading">' +
                            '<img src="images/festive-food-1388406500q51.jpg">' +
                        '</div>' +
                        '<div class="box-body col-sm-12">' +
                            '<h3>'+ data[i].title +'</h3>'+
                            '<h5>by '+ data[i].uname +'</h5>' +
                            '<h5>'+ date +'</h5>'+
                            '<div class="col-sm-6 city item-info">' +
                              '<h4>'+ data[i].loc +'</h4>' +
                            '</div>' +
                            '<div class="col-sm-6 cost item-info">' +
                              '<h4>$'+ data[i].cost +'/人</h4>' +
                            '</div>' +
                            '<div class="hiddeninfo">'+
                              data[i].uid+data[i].tags+data[i].describe+
                        '</div>' +
                    '</div>' +
                '</div>'
              );
            }
            i++;
          }
        });
      }
    });
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
  $(window).bind("load", function() {
    if(obj._id != ""){
      $('#search_tag').val(obj._id).keyup();
    }
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
    type: "GET",
    url: "http://fedtime-ncnuim.rhcloud.com/shopcom/" + obj._id,
    dataType:'json',
    success: function(data){
      var i=0;
      if(data != null){
        $.each(data.com, function(index, element) {
          $listComment.append("<div>"+data.com[i]+"</div>");
          i++;
        });
      }
    }
  });
  FB.api('/me', function(user){
    $.get("http://fedtime-ncnuim.rhcloud.com/likeshop/" + user.id,
      function(data,url){
        var i=0;
        if(data != null && data.shopid.length != 0){
          $.each(data.shopid, function(index, element) {
            if(obj._id == data.shopid[i]){
              $('#likeshop').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消追蹤');
              $('.fa-heart').css("color", "#ee245e");
              return false;
            }
            i++;
          });
        }
    });
    $('#likeshop').click(function() {
      $.get("http://fedtime-ncnuim.rhcloud.com/likeshop/" + user.id,
        function(data,url){
          var i=0,
              count=0
          if(data != null ){
            $.each(data.shopid, function(index, element) {
              if(obj._id == data.shopid[i]){
                $.ajax({
                  url:"http://fedtime-ncnuim.rhcloud.com/likeshop/"+user.id,
                  type : "delete",
                  dataType:'json',
                  data:{
                    'shopid' : data.shopid[i]
                  },
                  success:function(){
                    $('#likeshop').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp追蹤');
                    $('.fa-heart').css("color", "#a6a6a6");
                  }
                });
                return false;
              } else {
                count++;
              }
              i++;
            });
            if(count == data.shopid.length){
              $.ajax({
                url:"http://fedtime-ncnuim.rhcloud.com/likeshop/"+user.id,
                type : "Patch",
                dataType:'json',
                data:{
                  'shopid' : obj._id
                },
                success:function(){
                  $('#likeshop').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消追蹤');
                  $('.fa-heart').css("color", "#ee245e");
                }
              });
            }
          } else {
            $.ajax({
                url:"http://fedtime-ncnuim.rhcloud.com/likeshop",
                type : "Post",
                dataType:'json',
                data:{
                  '_id' : identity,
                  'shopid' : obj._id
                },
                success:function(){
                  $('#likeshop').html('<i class="fa fa-heart" aria-hidden="true"></i>&nbsp取消追蹤');
                  $('.fa-heart').css("color", "#ee245e");
                }
              });
          }
      });
    });
  });
  /*start of com*/
  var $text = $("#text"),
      $submit = $("input[type='submit']"),
      $listComment = $(".list-comments"),
      $loading = $(".loading"),
      _data
  $($submit).click(function(){
    if($text.html() == ""){
      swal("失敗!", "請輸入留言", "error");
      $text.focus();
    } else{
      _data = idname + ": " + $text.html();
      $.get("http://fedtime-ncnuim.rhcloud.com/shopcom/" + obj._id,
        function(data,url){
          if(data == null){
            $.ajax({
              type: "POST",
              url: "http://fedtime-ncnuim.rhcloud.com/shopcom",
              data: {
                '_id' : obj._id,
                'com' : _data
              },
              success: function(){
                $loading.show().fadeOut(300);
                $listComment.append("<div>"+_data+"</div>");
                $text.html("");
              }
            });
          } else {
            $.ajax({
              type: "Patch",
              url: "http://fedtime-ncnuim.rhcloud.com/shopcom/" + obj._id,
              data: {
                'com' : _data
              },
              success: function(){
                $loading.show().fadeOut(300);
                $listComment.append("<div>"+_data+"</div>");
                $text.html("");
              }
            });
          }
      });
      return false;
    }
  });
  /*end*/
  $.ajax({
      url:"http://fedtime-ncnuim.rhcloud.com/shop/" + obj._id,
      type : "GET",
      dataType:'json',
      success:function(data){
        var i;
        $('#stitle').children('strong').text(data.title);
        $('#shost').append(
                            '<a href="http://fedtime-ncnuim.rhcloud.com/chef.html?_id=' + data.uid +
                            '">'+ data.uname +'</a>&nbsp'+
                            '<a href="https://www.facebook.com/' + data.uid +
                            '"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>'
                          );
        $('#sinfo').text(data.describe);
        var date = moment(data.start_t).format("YYYY-MM-DD, hh:mm A");
        $('#sstartt').text(date);
        $('#scnum').text(data.cnum + ' (尚餘: ' + data.cavalnum + ' 位)');
        $('#sprice').text(data.cost);
        $('#sloc').append(
          '<strong id="openmap" class="cuslink" data-toggle="modal" data-target="#myModalmap1">'+
          data.loc+
          '</strong>'
        );
        $('#sother').text(data.s_else);
        for(i=0;i<data.s_pic.length;i++){
          $('#simg'+i).attr("src", data.s_pic[i]);
          $('#simgt'+i).attr("src", data.s_pic[i]);
        }
        for(i=data.s_pic.length;i<3;i++){
          $('#simg'+i).attr("src", "images/food.png");
          $('#simgt'+i).attr("src", "images/food.png");
        }
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
                  $('.cosname').append(
                    '<p class="cuslink" data-toggle="modal" data-target="#cusinfo'+ data2._id +'">'+ data2.name +'</p>'
                  );
                  $('.modalspace').append(
                    '<div class="modal fade" id="cusinfo'+ data2._id +'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                      '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                          '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
                            '<h3 class="modal-title"><i class="fa fa-user" id="myModalLabel" aria-hidden="true"></i>&nbsp用戶資訊</h3>'+
                          '</div>'+
                          '<div class="modal-body">'+
                            '<div class="media">'+
                              '<a class="pull-left" href="#">'+
                                '<img class="media-object img-thumbnail" src="'+ data2.img +'" style="width: 150px;height:150px;">'+
                              '</a>'+
                              '<div class="media-body">'+
                                '<h3 class="media-heading">'+ data2.name +
                                '&nbsp<a href="https://www.facebook.com/' + data2._id +'">'+
                                '<i class="fa fa-facebook-square" aria-hidden="true"></i></a></h3>'+
                                '<hr style="margin:8px auto">'+
                                '<h4 id="stars'+ data2._id +'">用戶評價:&nbsp</h4>'+
                                '<h4>惡意缺席次數:&nbsp'+ data2.shop_mean_noeat +'</h4>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'
                  );
                  for (var i = 0; i < data2.rate; i++) {
                    $('#stars'+data2._id).append('<i class="fa fa-star" aria-hidden="true"></i>');
                  }
                  for (var i = 0; i < 5-data2.rate; i++) {
                    $('#stars'+data2._id).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                  }
                }
            });
          }
        }
      }
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
function statusChangeCallback(response) {
  //console.log('statusChangeCallback');
  //console.log(response);
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
  $(document).trigger('fbload');
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
    var url='';
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    $.get("http://fedtime-ncnuim.rhcloud.com/u/" + response.id,
      function(data,url){
        FB.api('/me/picture?width=400', function(response2){
          url=response2.data.url;
          if(data.img != url && url != ""){
            //console.log('check img');
            $.ajax({
              type: 'PATCH',
              url: 'http://fedtime-ncnuim.rhcloud.com/u/'+ response.id,
              dataType: 'json',
              data:{img : url},
              success: function (data) {
                //console.log('update img');
              }
            });
          }
        });
        if(data == null){
          //console.log('check user');
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
              foodrate : '0',
              placerate : '0',
              shop_suc : '0',
              shop_fail : '0',
              follower : '0',
              shop_mean_nocook : '0',
              shop_mean_noeat : '0',
              telant : '好食刻大廚',
              words : '歡迎加入好食刻大廚的行列!',
              img : url
            }
          );
        } else {
          if(data.type == 1){
            $('.chefbtn').show();
            $('.chefid').show();
          }
          //console.log('check token');
          if(data.token != accessToken){
            $.ajax({
              type: 'PATCH',
              url: 'http://fedtime-ncnuim.rhcloud.com/u/'+ response.id,
              dataType: 'json',
              data:{token : accessToken},
              success: function (data) {
                //console.log('update token');
              }
            });
          }
        }
        if (top.location.pathname == '/profile.html'){
          //console.log('check rate');
          for (var i = 0; i < data.rate; i++) {
            $("#stars").append('<i class="fa fa-star" aria-hidden="true"></i>');
          }
          for (var i = 0; i < 5-data.rate; i++) {
            $("#stars").append('<i class="fa fa-star-o" aria-hidden="true"></i>');
          }
          for (var i = 0; i < data.foodrate; i++) {
            $('#foodrate').append('<i class="fa fa-star" aria-hidden="true"></i>');
          }
          for (var i = 0; i < 5-data.foodrate; i++) {
            $('#foodrate').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
          }
          for (var i = 0; i < data.placerate; i++) {
            $('#placerate').append('<i class="fa fa-star" aria-hidden="true"></i>');
          }
          for (var i = 0; i < 5-data.placerate; i++) {
            $('#placerate').append('<i class="fa fa-star-o" aria-hidden="true"></i>');
          }
          $('#specialist').append(
            data.telant+
            '&nbsp<i class="fa fa-pencil-square-o" id="tebtn" aria-hidden="true"></i>&nbsp'+
            '<input type="text" class="telantinput" id="telantinput" name="telantinput" placeholder="請輸入專長~">'+
            '<button type="button" class="btn btn-default btn-sm telantinput" id="tesubbtn">OK</button>'+
            '<button type="button" class="btn btn-default btn-sm telantinput" id="tecancelbtn">取消</button>'
          );
          $('#chefword').append(
            data.words+'&nbsp<i class="fa fa-pencil-square-o" id="cwbtn" aria-hidden="true"></i>&nbsp'+
            '<input type="text" class="chefwordinput" id="chefwordinput" name="chefwordinput" placeholder="輸入簡單自我介紹吧~">'+
            '<button type="button" class="btn btn-default btn-sm chefwordinput" id="cwsubbtn">OK</button>'+
            '<button type="button" class="btn btn-default btn-sm chefwordinput" id="cwcancelbtn">取消</button>'
          );
          $('#suctime').append(data.shop_suc);
          $('#failtime').append(data.shop_fail);
          $('#meannocook').append(data.shop_mean_nocook);
          $('#meannoeat').append(data.shop_mean_noeat);
          profileupdate();
        }
    });
    /*var nowdate = $.now();
    $.get("http://fedtime-ncnuim.rhcloud.com/shop",
      function(data,url){
        $.each(data, function(index, element) {
          if(data[i].start_t+86400000 < nowdate && final == 0){

          } else if(nowdate<) {

          }
        });
    });*/
  });
}
function profileupdate() {
  FB.api('/me/picture?width=400', function(response){
    //console.log(response.data.url);
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
              stat='等待評價中';
            if(data[i].final==2)
              stat='交易成功';
            if(data[i].final==3)
              stat='交易失敗';
            $('#ustoret > tbody').append(
              '<tr id="tr' + i +
              '" class="warning"><td>' + date +
              '</td><td><a href=http://fedtime-ncnuim.rhcloud.com/shops.html?_id=' + data[i]._id +'>'+ data[i].title +
              '</a></td><td>NT$' + data[i].cost +
              '</td><td>' + data[i].cnum +
              '</td><td>' + stat +
              '</td><td><button class="btn btn-warning btn-sm disabled" id="ratebtn'+ data[i]._id +'">給評價</button>'+
              '<button class="btn btn-danger btn-sm disabled" id="badbtn'+ data[i]._id +'">檢舉</button>'+
              '</td></tr>'
            );
            if(data[i].final==2)
              $('#tr' + i).addClass('success').removeClass('warning');
            if(data[i].final==3)
              $('#tr' + i).addClass('danger').removeClass('warning');
            i++;
        });
      }
    });
    $.ajax({
      type: 'GET',
      url: 'http://fedtime-ncnuim.rhcloud.com/shop/c/'+user.id,
      dataType: 'json',
      success: function (data) {
        var i=0;
        $.each(data, function(index, element) {
            var stat = '';
            var date = moment(data[i].start_t).format("YYYY-MM-DD, HH:mm");
            if(data[i].final==0)
              stat='未完成';
            if(data[i].final==1)
              stat='等待評價中';
            if(data[i].final==2)
              stat='交易成功';
            if(data[i].final==3)
              stat='交易失敗';
            $('#ueatt > tbody').append(
              '<tr id="tr' + i +
              '" class="warning"><td>' + date +
              '</td><td><a href=http://fedtime-ncnuim.rhcloud.com/shops.html?_id=' + data[i]._id +'>' + data[i].title +
              '</a></td><td>' + data[i].uname +
              '</td><td>NT$' + data[i].cost +
              '</td><td>' + stat +
              '</td><td><button class="btn btn-warning btn-sm disabled" id="ratebtn'+ data[i]._id +'">給評價</button>'+
              '<button class="btn btn-danger btn-sm disabled" id="badbtn'+ data[i]._id +'">檢舉</button>'+
              '</td></tr>'
            );
            if(data[i].final==2)
              $('#tr' + i).addClass('success').removeClass('warning');
            if(data[i].final==3)
              $('#tr' + i).addClass('danger').removeClass('warning');
            i++;
        });
      }
    });
    $.ajax({
      type: 'GET',
      url: 'http://fedtime-ncnuim.rhcloud.com/likeshop/'+user.id,
      dataType: 'json',
      success: function (data) {
        var i=0;
        $.each(data.shopid, function(index, element) {
          $.ajax({
            type: 'GET',
            url: 'http://fedtime-ncnuim.rhcloud.com/shop/'+data.shopid[i],
            dataType: 'json',
            success: function (data2) {
              var date = moment(data2.start_t).format("YYYY-MM-DD, HH:mm");
              var stat = "";
              if(data2.final==0)
                stat='未完成';
              if(data2.final==1)
                stat='等待評價中';
              if(data2.final==2)
                stat='交易成功';
              if(data2.final==3)
                stat='交易失敗';
              $('#favshop > tbody').append(
                '<tr id="tr' + i +
                '" class="warning"><td>' + date +
                '</td><td><a href=http://fedtime-ncnuim.rhcloud.com/shops.html?_id=' + data2._id +'>' + data2.title +
                '</a></td><td>' + data2.uname +
                '</td><td>NT$' + data2.cost +
                '</td><td>' + stat +
                '</td></tr>'
              );
            }
          });
          i++;
        });
      }
    });
    $.ajax({
      type: 'GET',
      url: 'http://fedtime-ncnuim.rhcloud.com/likechef/'+user.id,
      dataType: 'json',
      success: function (data) {
        var i=0;
        $.each(data.chefid, function(index, element) {
          $.ajax({
            type: 'GET',
            url: 'http://fedtime-ncnuim.rhcloud.com/u/'+data.chefid[i],
            dataType: 'json',
            success: function (data2) {
              $('#favchef').append(
                '<div class="col-sm-2">'+
                    '<div class="col-sm-12 thumbnail text-center" id="thumbnail'+ data2._id +'">'+
                        '<img alt="" class="img-responsive img-rounded favchefimg" src="'+ data2.img +'">'+
                        '<div class="caption">'+
                            '<h4>'+ data2.name +'</h4>'+
                        '</div>'+
                    '</div>'+
                '</div>'
              );
              $('#thumbnail'+data2._id).click(function() {
                window.location.href = '/chef.html?_id='+data2._id;
              });
            }
          });
          i++;
        });
      }
    });
    $('#tebtn').click(function() {
      $('.telantinput').toggle();
    });
    $('#cwbtn').click(function() {
      $('.chefwordinput').toggle();
    });
    $('#tesubbtn').click(function() {
      var text=$('#telantinput').val();
      $.ajax({
        type: 'Patch',
        url: 'http://fedtime-ncnuim.rhcloud.com/u/'+user.id,
        dataType: 'json',
        data: {
          telant : text
        },
        success: function (data) {
          location.reload();
        }
      });
    });
    $('#cwsubbtn').click(function() {
      var text=$('#chefwordinput').val();
      $.ajax({
        type: 'Patch',
        url: 'http://fedtime-ncnuim.rhcloud.com/u/'+user.id,
        dataType: 'json',
        data: {
          words : text
        },
        success: function (data) {
          location.reload();
        }
      });
    });
    $('#tecancelbtn').click(function() {
      $('.telantinput').toggle();
    });
    $('#cwcancelbtn').click(function() {
      $('.chefwordinput').toggle();
    });
  });
}
function fbLogoutUser() {
  FB.logout(function(response) {
    location.href= "http://fedtime-ncnuim.rhcloud.com/";
  });
}
$(document).ready(function(){
    /*window.fbAsyncInit = function() {
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
    }(document, 'script', 'facebook-jssdk'));*/
    $(document).on(
        'fbload',  //  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
        function(){
            //some code that requires the FB object
            if (top.location.pathname == '/chef.html')
              chef();
            if (top.location.pathname == '/shops.html')
              shops();

        }
    );
    $(".facebook").hide();
    $("#service_content").load("service_content.html");
    /*$("#likechef").hover(function(){
        $(".fa-heart").css("color", "#ff0066");
      }, function(){
        $(".fa-heart").css("color", "#a6a6a6");
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
    $(".searchbtn").click(function() {
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
    $(".newshopbtn").click(function() {
      window.location.href = '/newshop.html';
    });
    $(".logoutbtn").click(fbLogoutUser);
    $("#subshopbtn").click(subshop);
    $("#join").click(join);
    if (top.location.pathname == '/search.html')
      search();
    if (top.location.pathname == '/newshop.html')
      newshop();
    if (top.location.pathname == '/bestchef.html')
      bestchef();
    $("#myModalmap").on("shown.bs.modal", function () {
      google.maps.event.trigger(map, "resize");
    });
});