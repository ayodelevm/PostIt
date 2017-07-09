$(document).ready(() => {
    $('.slider').slider({ full_width: true });
    $('.modal').modal({
      dismissible: true,
    });
    $('.button-collapse').sideNav({
      menuWidth: 350, 
      edge: 'left',
      closeOnClick: true,
      draggable: true,
    });
});

