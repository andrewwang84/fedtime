$(document).ready(
  fbLoginCheck();
  alert('fuck');
);
function fbLoginCheck() {
  FB.getLoginStatus(function(response) {
    if (response && response.status === 'connected') {
      console.log('safe');
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
      window.location.replace("../index.html");
    } else {
      // the user isn't logged in to Facebook.
      window.location.replace("../index.html");
    }
  });
}