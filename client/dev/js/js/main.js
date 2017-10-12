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
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false,
    hover: false,
    gutter: 0,
    belowOrigin: true,
    alignment: 'left',
    stopPropagation: false
  });
  $('.collapsible').collapsible({
    accordion: true,
  });
});

