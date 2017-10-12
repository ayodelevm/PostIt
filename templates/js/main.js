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
        Apple: null,
        Microsoft: null,
        Google: null
      },
      limit: Infinity,
      minLength: 0
    }
  });
  $('select').material_select();
  Materialize.updateTextFields();
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false,
    hover: true,
    gutter: 0,
    belowOrigin: true,
    alignment: 'left',
    stopPropagation: false
  }
  );
  $('.collapsible').collapsible({
    accordion: true,
    onOpen: function(el) { alert('Open'); },
    onClose: function(el) { alert('Closed'); }
  });
});

