<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FedTime</title>
    <!-- 最新編譯和最佳化的 CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
    <!-- 選擇性佈景主題 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/bselect.css">
  </head>
  <body>
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header navbar-default">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.php">FedTime</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><a href="index.php">首頁 </a></li>
            <li class="active"><a href="01-bestselect.php">編輯精選 <span class="sr-only">(current)</span></a></li>
            <li><a href="01-bestchef.php">人氣大廚 </a></li>
            <li><a href="01-localbest.php">區域美食 </a></li>
          </ul>
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search" id="search_tag" name="search_tag">
            </div>
            <button type="submit" class="btn btn-default" id="search_go" name="search_go">Search</button>
          </form>
          <ul class="nav navbar-nav navbar-right">
            <button type="button" class="btn btn-warning navbar-btn" data-toggle="modal" data-target="#logincontent">注冊</button>
            <button type="button" class="btn btn-warning navbar-btn" data-toggle="modal" data-target="#logincontent-fb">Login</button>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <!--登入-->
    <div class="modal fade" id="logincontent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h3 class="modal-title" id="myModalLabel"><strong>好食刻-服務條款</strong></h4>
          </div>
          <div class="modal-body">
            <p><h4>非常歡迎您光臨「好食刻」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，
            特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：<br/><br/></h4></p>

            <p><h4>一、隱私權保護政策<br/><br/></h4>

              本網站相當重視隱私權的保護。關於您的會員註冊以及其他特定資料，將依「隱私權保護政策」保護與規範。
              當您了解並同意使用本服務時，本服務可依據「隱私權保護政策」之規範進行您個人資料的蒐集與利用，
              如線上活動及網路調查等。<br/><br/></p>

            <p><h4>二、會員的註冊義務及會員帳號、密碼安全<br/><br/></h4>

              為了能使用本服務，您同意並承諾以下事項：<br/>
              1.依本服務註冊流程之提示提供您本人正確及完整的資料，並維持、更新該資料，確保其為正確、最新及完整。<br/>
              2.若您提供任何不完整、錯誤或不實的資料，本網站有權暫停或終止您的帳號，並拒絕您使用本服務之全部或部分。<br/><br/>
              完成本服務的註冊流程後，您將收到一組帳號及密碼。您同意並承諾以下事項：<br/>
              1.此帳號係不可轉讓。<br/>
              2.您有責任維持此帳號及密碼的機密安全。<br/>
              3.當您的帳號遭到盜用或有其他任何安全問題發生時，您將立即通知本網站。<br/><br/></p>

            <p><h4>三、資料之保護<br/><br/></h4>

              本網站均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。<br/><br/></p>

            <p><h4>四、會員使用規範與義務<br/><br/></h4>

              除了遵守本服務條款之約定外，您同意遵守中華民國相關法規、本服務與其他服務條款，並同意不從事以下行為：<br/>
              1.您同意並保證絕不利用本服務從事違法或損害他人權益之行為。<br/>
              2.冒用他人名義使用本服務。<br/>
              3.侵害他人名譽、隱私權、著作權、及其他權利。<br/>
              4.下載、張貼或公布任何不實、誹謗、侮辱、具威脅性、攻擊性、違背公序良俗、引人犯罪或其他不法之文字、圖片或任何形式的檔案。<br/>
              5.違反法律或契約所應負之保密義務。<br/>
              6.破壞及干擾本服務所提供之各項資料、活動或功能，或以任何方式侵入、試圖侵入、破壞本服務之任何系統，或藉由本服務為任何侵害或破壞行為。<br/>
              7.未經同意收集他人電子郵件位址及其他個人資料者。<br/>
              8.其他本網站有正當理由認為不適當之行為。<br/><br/>

              若您有違反前開事項之情事或之虞，本網站有權於通知或未通知之情形下，隨時終止或限制您使用帳號（或其任何部分）或本服務之使用，並將本服務內任何相關「會員內容」加以移除並刪除。您同意若本服務之使用被終止或限制時，本會對您或任何第三人均不承擔責任。<br/><br/></p>

            <p><h4>五、系統中斷或故障<br/><br/></h4>

              本服務有時可能會出現中斷或故障等現象，或許將造成您使用上的不便、資料喪失、錯誤等情形。
              您於使用本服務時宜自行採取防護措施。本網站對於您因使用（或無法使用）本服務而造成的損害，不負任何賠償責任。<br/><br/></p>

            <p><h4>六、不得為商業使用<br/><br/></h4>

              您同意並承諾不對本服務任何部分或本服務（包括但不限於會員內容、網站內容、軟體及會員帳號等）之使用或存取，進行任何商業目的之使用。<br/><br/></p>

            <p><h4>七、服務變更及通知<br/><br/></h4>

              您同意本網站保留於任何時間點，不經通知隨時修改、暫時或永久停止繼續提供本服務（或其任一部分）的權利。
              如依法或其他相關規定須為通知時，本服務得以包括但不限於：張貼於本服務網頁、電子郵件，或其他現在或未來合理之方式通知您，包括本服務條款之變更。但若您違反本服務條款，以未經授權的方式存取本服務，或於註冊時所提供之資料不正確或未更新，您將不會收到前述通知。當您經由授權的方式存取本服務，您即同意本服務所為之任何及所有給您的通知，均視為送達。<br/><br/></p>

            <p><h4>八、與第三方網站之連結及第三方提供之內容<br/><br/></h4>

              本服務可能會提供連結至其他網站或網路資源的連結。您可能會因此連結至其他業者經營的網站，
              但不表示本網站與該等業者有任何關係。其他業者經營的網站均由各該業者自行負責，不屬本網站控制及負責範圍之內。
              本網站對任何檢索結果或外部連結，不擔保其合適性、可依賴性、即時性、有效性、正確性及完整性。您也許會檢索或連結到一些令您厭惡或不需要的網站，這是網際網路運作的可能結果，遇到此類情形時，本網站建議您不要瀏覽或儘速離開該等網站。您並同意本網站無須為您連結至非屬於本網站之網站所生之任何損害，負損害賠償之責任。<br/><br/></p>

            <p><h4>九、隱私權保護政策之修正<br/><br/></h4>

              本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。<br/><br/></p>
          </div>
          <div class="modal-footer">
            <input type="checkbox" id="comfirm" name="comfirm" value="1"/>我同意<br/><br/>
            <div class="facebook">
              <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" size="xlarge">
              Login With Facebook
              </fb:login-button>
              <div id="status">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="logincontent-fb" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          </div>
          <div class="modal-footer">
            <div class="facebook-lg" >
              <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" size="xlarge">
              Login With Facebook
              </fb:login-button>
              <div id="status">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-1"></div>
            <!-- Blog Post Content Column -->
            <div class="col-lg-10">
                <!-- Blog Post -->
                <!-- Title -->
                <h1 class="title">編輯精選</h1>
                <hr>
                <!-- Author -->
                <p class="lead title">
                    by 愛粗ㄟ小編
                &nbsp&nbsp
                <!-- Date/Time -->
                <span class="glyphicon glyphicon-time"></span> Posted on July 7, 2016 at 9:00 PM</p>
                <hr>
                <!-- Preview Image -->
                <img class="img-responsive" src="http://placehold.it/900x300" alt="">
                <hr>
                <!-- Post Content -->
                <strong><p class="blog-lead">開頭</p></strong>
                <p class="blog">第一段</p>
                <p class="blog">第二段</p>
                <p class="blog">第三段</p>
                <p class="blog">第四段</p>
            </div>
            <div class="col-lg-1"></div>
        </div>
        <hr>
    </div>
    <footer class="footer">
        <div class="container-fluid">
            <p class="text-muted">
                &copy;2016 NCNU-IM</br>
                The Essential theme is developed, enhanced and maintained by Andrew Wang
            </p>
        </div>
    </footer>
    <!-- jQuery (Bootstrap 所有外掛均需要使用) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- 最新編譯和最佳化的 JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    <script src="js/index.js"></script>
</body>
</html>
