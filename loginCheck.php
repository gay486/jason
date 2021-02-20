<?

  include_once('./db_header.php');

?>



<?

    $gaib_email = $_POST['gaib_email'];
    $gaib_pwd = $_POST['gaib_pwd'];


    $sql = "select * from w_member where email = '".$gaib_email."' and pw = '".$gaib_pwd."' ";
    $result = mysqli_query($connect, $sql);

    $txt = '';

    
    if( mysqli_num_rows($result) > 0 ){
        $_SESSION['gaib_email'] = $_POST['gaib_email'];
        
        if( isset( $_SESSION['gaib_email'] ) ){
            session_start();
            $txt .= "<h3>환영합니다.</h3>";
            $txt .= "<h4>'".$_SESSION['gaib_email']."' 님!^^</h4>";
            $txt .= "<p><a href='javascript:void(0);' class='logoutBtn'>로그아웃</a></p>";
        }
        else{
            $txt = "";
        }
    }
    else{
        $txt .= "<h4>회원 '".$_SESSION['gaib_email']."' 님!</h4>";
        $txt .= "<h5> 로그인 정보가 없습니다. </h5>";
        $txt .= "<h5> 회원 가입을 하여야 합니다. </h5>";
    }

    echo $txt;



?>

    


<?

    include_once('./db_footer.php');

?>