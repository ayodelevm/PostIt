$(document).ready(($) => {
  $('.slider').slider({ full_width: true });
  $('.modal').modal({
    dismissible: true,
  });
  $('.button-collapse').sideNav({
    menuWidth: 315,
    edge: 'left',
    closeOnClick: true,
    draggable: true,
  });
  $('.parallax').parallax();
  Materialize.updateTextFields();
});

