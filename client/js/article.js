function loadmyarticlepage() {
  $("#app").html(`
  <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
  <a class="navbar-brand" href="#"><i class="fa fa-pencil text-primary fa-2x" aria-hidden="true"></i><br><small>MINI WP</small></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarToggle">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item mx-3 text-center">
        <a class="nav-link" href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i><br>Feeds</a>
      </li>
      <li class="nav-item mx-3 text-center">
        <a class="nav-link" href="#"><i class="fa fa-bookmark-o" aria-hidden="true"></i><br>My Articles</a>
      </li>
      <li class="nav-item mx-3 text-center">
        <a class="nav-link" href="#"><i class="fa fa-user-circle" aria-hidden="true"></i><br>Account</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item mx-3 text-center" onclick="signOut()">
        <a class="nav-link" href="#"><i class="fa fa-sign-out" aria-hidden="true"></i><br>Sign Out</a>
      </li>
    </ul>
  </div>
</nav>





    MY ARTICLE
    `);
}