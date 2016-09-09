/* TODO */

/*
 * - scrollspy: see https://www.grafikart.fr/tutoriels/javascript/intersection-observer-804
 *      or see https://camwiegert.github.io/in-view/
 */

(function ($) {
  console.log("app.js in action 😀");

  // CONFIGURATION

  var CONFIG = {
    namespace: 'TLF',
    debug: true,
    debuggers: ['breakpoints'/*, 'touchzones'*/],
    stickyHeader: true,
    rippleEffect: true,
    rippleSelector: ".btn"
  };

  if (! window[CONFIG.namespace]) {
    // Create the app main object
    window[CONFIG.namespace] = {};
    // Attach the configuration to it
    window[CONFIG.namespace].CONFIG = CONFIG;

  } else {
    console.error("OUCH! window." + CONFIG.namespace + " already exists!");
  }


  // DOM IS READY!

  $(function() {

    // CONFIGURATION BODY TAG CLASSES

    var $body = $("body");

    // Debug classes

    if (window[CONFIG.namespace].CONFIG.debug) {
      $body.addClass("debug");

      if (window[CONFIG.namespace].CONFIG.debuggers) {
        window[CONFIG.namespace].CONFIG.debuggers.forEach(function (debug) {
          $body.addClass("debug--" + debug);
        });
      }
    }

    if (window[CONFIG.namespace].CONFIG.stickyHeader) { $body.addClass("sticky-header"); }
    if (window[CONFIG.namespace].CONFIG.parallaxHero) { $body.addClass("parallax-hero"); }

    // TOGGLE HELPER

    var $togglers = document.querySelectorAll('[data-toggle]');

    Array.prototype.forEach.call($togglers, function($toggler) {

      var $targets = document.querySelectorAll($toggler.getAttribute('data-toggle'));
      var classname = $toggler.getAttribute('data-toggle-classname'); // TODO : name for data-attributes too

      Array.prototype.forEach.call($targets, function($target) {

        $toggler.addEventListener('click', function() {

          toggleStuff(this, $target, classname);

        });
      });

      var toggleStuff = function ($el, $target, classname) {

        var activeClassname = 'active';
        if ($el.classList.contains(activeClassname)) {
            $el.classList.remove(activeClassname);

          } else {
            $el.classList.add(activeClassname);
          }

        if ($target.classList.contains(classname)) {
            $target.classList.remove(classname);

          } else {
            $target.classList.add(classname);
          }
      };
    });


    // RIPPLE EFFECT

    if (window[CONFIG.namespace].CONFIG.rippleEffect) {

      $(window[CONFIG.namespace].CONFIG.rippleSelector).addClass("ripple");

      $(".ripple").click(function(e){
        var rippler = $(this);

        // create .ink element if it doesn't exist
        if(rippler.find(".ink").length == 0) {
          rippler.append("<span class='ink'></span>");
        }

        var ink = rippler.find(".ink");

        // prevent quick double clicks
        ink.removeClass("animate");

        // set .ink diametr
        if(!ink.height() && !ink.width())
        {
          var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
          ink.css({height: d, width: d});
        }

        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width()/2;
        var y = e.pageY - rippler.offset().top - ink.height()/2;

        // set .ink position and add class .animate
        ink.css({
          top: y+'px',
          left:x+'px'
        }).addClass("animate");
      })
    }

  });

}(jQuery))
