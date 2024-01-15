<div class="container">
    This tool was retired in late 2023/early 2024, because - to my surprise - GMX made changes to their backend which disallow the login credentials to be sent from another domain. The current recommendation is to delete any accounts with GMX and move to GMail.

    <hr>

    <form class="form-l form-login" method="post" accept-charset="UTF-8" novalidate="novalidate" action="https://login.gmx.net/login" name="loginForm">
        <input class="form-control" type="hidden" name="loginErrorURL" value="https://www.gmx.net/?status=nologin">
        <input class="form-control" type="hidden" name="service" value="freemail">
        <input class="form-control" type="hidden" name="successURL" value="https://bap.navigator.gmx.net/login">
        <input class="form-control" type="hidden" name="loginFailedURL" value="https://www.gmx.net/logoutlounge/?status=login-failed">
        <input class="form-control" type="hidden" name="statistics" value="xRbXFc8VKmF6s/rp6a5qP4z/NdyBHKIvfVNtKKZ/MIzZ6sV0I7t11UL6HiAYcLrIM/Ua97LhhoApcfeuwhgCrf8OzhYyHaHNFxpFfXyh/gNOFasefWiag2osdLwsoaQUjFgl5KRWNZQn/J+Vf5Yq1vzDMmvcNacavpkSKc0VdsoMzKeZnxxL/l2FTNDJCnPcIHjxpzAgCgOro1V2sZbBxg==">
        <input class="form-control" type="hidden" name="ibaInfo" value="os=5;browser=11;deviceclass=b;abd=false;weather_temp=0;weather_condition=10;deviceclient=browser_clean">
        <input class="form-control" type="hidden" name="uinguserid">
        <input class="form-control" type="hidden" name="tpidHash" value="c05fbfc815e744c3489592881ca374d05b439f17674de508b51f078caf2ac713">
        <input class="form-control" type="hidden" name="salt" value="4zM1SaskxkczzYPXuzCycQI6uIEDsyKLvE_YXWMLkAQ=">

        <div class="row">
            <div class="col-sm-6 col-mx-4">
                <div class="input-group">
                    <span class="input-group-addon">&#128231;</span>
                    <input class="form-control" type="email" id="freemailLoginUsername" tabindex="1" required placeholder="E-Mail-Adresse" name="username" autofocus="autofocus">
                </div><br>
                <div class="input-group">
                    <span class="input-group-addon">&#128274;</span>
                    <input class="form-control" type="password" id="freemailLoginPassword" tabindex="2" required placeholder="Passwort" name="password">
                </div><br>
                <div class="form-group">
                    <input class="btn btn-primary" type="submit" value="Login" tabindex="3">
                </div>
            </div>
        </div>
    </form>
</div>
