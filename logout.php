<?

    //로그아웃
    session_start();
    session_destroy();

    $txt = '';

    $txt = $_SESSION['gaib_email'].'님 바이바이! 수고하셨습니다.';

    echo $txt;

?>

