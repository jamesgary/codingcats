(function() {
  var minimize;

  minimize = document.getElementById('minimize');

  if (minimize) minimize.addEventListener('click', pokki.closePopup);

  pokki.addEventListener('popup_hiding', NB.Director.pause);

  $('a.twitter').click(function() {
    return pokki.openURLInDefaultBrowser('https://twitter.com/#!/james_gary');
  });

}).call(this);
