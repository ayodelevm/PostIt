$(document).ready(($, Materialize) => {
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

  $('.chips').material_chip();

$('.chips-placeholder').material_chip({
    placeholder: 'Search username',
    // secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 0
    }
  });
  Materialize.updateTextFields();
});

