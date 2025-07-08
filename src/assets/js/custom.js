 $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    //>=, not <=
    if (scroll >= 300) {
      //clearHeader, not clearheader - caps H
      $(".et_header_menu23").addClass("et_sticky_menu");
    } else {
      $(".et_header_menu23").removeClass("et_sticky_menu");
    }
  }); //missing );