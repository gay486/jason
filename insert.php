<?

  include_once('./db_header.php');

?>



<?

    //메인 영역////////////////////////////////////////////////////////////////

    $gaib_id    = $_POST['gaib_id'];
    $gaib_pw    = $_POST['gaib_pw'];
    $gaib_name  = $_POST['gaib_name'];
    $gaib_phone = $_POST['gaib_phone'];
    $gaib_email = $_POST['gaib_email'];


    $sql = "insert into w_member(id, pw, name, phone, email) values
            ('".$gaib_id."', '".$gaib_pw."', '".$gaib_name."', '".$gaib_phone."', '".$gaib_email."')";
    mysqli_query($connect,$sql);


?>

    


<?

    include_once('./db_footer.php');

?>