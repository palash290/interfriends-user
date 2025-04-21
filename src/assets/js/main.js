$(document).ready(function () {
  $(".et_menu_bar").click(function () {
    $(".et_navbar").addClass("et_show");
  });
  $(".et_close_menu").click(function () {
    $(".et_navbar").removeClass("et_show");
  });

  //   Key Fact Slider js S
  $(".et_key_fact_slider").owlCarousel({
    loop: true,
    margin: 20,
    center: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  //   Key Fact Slider js E
  //   Testimonial Slider js S
  $(".et_testimonial_slider").owlCarousel({
    loop: true,
    margin: 20,
    center: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
  //   Testimonial Slider js E

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    //>=, not <=
    if (scroll >= 300) {
      //clearHeader, not clearheader - caps H
      $(".et_header").addClass("et_sticky_menu");
    } else {
      $(".et_header").removeClass("et_sticky_menu");
    }
  }); //missing );
});

var owl = $(".owl-carousel");
owl.owlCarousel();
$(".next-btn").click(function () {
  owl.trigger("next.owl.carousel");
});
$(".prev-btn").click(function () {
  owl.trigger("prev.owl.carousel");
});
$(".prev-btn").addClass("disabled");
$(owl).on("translated.owl.carousel", function (event) {
  if ($(".owl-prev").hasClass("disabled")) {
    $(".prev-btn").addClass("disabled");
  } else {
    $(".prev-btn").removeClass("disabled");
  }
  if ($(".owl-next").hasClass("disabled")) {
    $(".next-btn").addClass("disabled");
  } else {
    $(".next-btn").removeClass("disabled");
  }
});