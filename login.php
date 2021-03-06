<?
    include_once('./header.php');
?>

<main id="login" class='member'>
    <section id="section1">
        <div class="wrap">
            <div class="gap">
                <div class="container">
                    <div class="title">
                        <h2>Login</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="section2">
        <div class="wrap">
            <div class="gap">
                <div class="container">
                    <div class="content">
                        <ul class='clearfix'>
                            <li>
                                <div class="content-gap">
                                    <div class='title'>
                                        <h3>Login</h3>
                                        <h2>로그인</h2>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="content-gap">
                                    <div class="login-wrap">
                                        <form name='form_login' id='form_login'>
                                            <ul>
                                                <li>
                                                    <div>
                                                        <label for="email">이메일</label><div><input type="email" name="email" id="email" value="" placeholder='등록된 이메일을 입력하세요!'></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <label for="pwd">비밀번호</label><div><input type="password" name="pwd" id="pwd" value="" placeholder='비밀번호를 입력하세요!'></div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <input type="checkbox" name="idSave" id="idSave" value="">
                                                        <label for="idSave" class='idSave-label'>아이디 저장</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class='clearfix'>
                                                        <span class='left-wrap'>아직 회원이 아니신가요?<a href="./join.php" class='memberGaipBtn'>회원가입</a></span>
                                                        <span class='right-wrap'><a href="#" class='idPwdFindBtn'>아이디/비밀번호 찾기</a></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <input type="submit" class="submitBtn" value="로그인">
                                                    </div>
                                                </li>
                                            </ul>
                                        </form>
                                        <div class="login_txt"></div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>


<?
    include_once('./footer.php');
?>

