<div class="container">
    <form class="form-l form-login" method="post" accept-charset="UTF-8" novalidate="novalidate" action="https://service.gmx.net/de/cgi/login?hal=true" name="loginForm">
        <div class="row">
            <input class="form-control" type="hidden" name="service" value="freemail">
            <input class="form-control" type="hidden" name="successURL" value="https://navigator.gmx.net/login">
            <input class="form-control" type="hidden" name="loginErrorURL" value="https://navigator.gmx.net/loginerror">
            <div class="col-sm-6 col-mx-4">
                <div class="input-group">
                    <span class="input-group-addon">&#128231;</span>
                    <input class="form-control" type="email" tabindex="1" required="required" value="" placeholder="Email address" name="username" title="" autofocus="autofocus">
                </div><br>
                <div class="input-group">
                    <span class="input-group-addon">&#128274;</span>
                    <input class="form-control" type="password" tabindex="2" required="required" placeholder="Passwort" value="" name="password" title="">
                </div><br>
                <div class="form-group">
                    <input class="btn btn-primary" type="submit" value="Login" tabindex="3">
                </div>
            </div>
        </div>
    </form>
</div>