<?

  include_once('./db_header.php');

?>



<?

    //메인 영역////////////////////////////////////////////////////////////////

    //저장된 데이터베이스 내용(목록)을 가져오기 order by ascending 오름차순(asc)  descending 내림차순(desc)
    $sql = "select * from w_member order by idx desc";
    $result = mysqli_query($connect, $sql);

    $txt='';
    $cnt=mysqli_num_rows($result);


    $txt .= '<table>';

    if( mysqli_num_rows($result) > 0 ){

        while( $row = mysqli_fetch_array($result) ){
            
            $txt .= '<tr>';
                $txt .= '<td>'.$cnt.'</td>';
                $txt .= '<td>'.$row['id'].'</td>';
                $txt .= '<td>'.$row['pw'].'</td>';
                $txt .= '<td>'.$row['name'].'</td>';
                $txt .= '<td>'.$row['phone'].'</td>';
                $txt .= '<td>'.$row['email'].'</td>';
            $txt .= '</tr>';
            $cnt--;
        }
    }

    $txt .= '</table>';
    echo $txt;

?>

    


<?

    include_once('./db_footer.php');

?>