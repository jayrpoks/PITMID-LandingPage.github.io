// --- TOP NAV: SCROLL DETECTOR CORE HELPERS -----------------------------------

if ( typeof scrollpos === 'undefined' ) {
	let scrollpos = window.scrollY;
}

const topnav = document.getElementById("topnav");

// Get the actual height of the element
// const topnav_height = topnav.clientHeight;

// Use when the top nav is bumped down by something like the Dr. Phil banner
const topnav_height = topnav.offsetTop;

// --- FAQ TOGGLER -------------------------------------------------------------

// Show FAQ answers if the question is clicked.

jQuery(document).ready(function() {
	jQuery("dl.faq-togglable dt").click( function() {
		jQuery(this).next().slideToggle();
		jQuery(this).find(".chevron").toggle();
	});
});

// "Show all" button

jQuery(".faq__viewall").click( function() {
	jQuery("dl.faq dd").show();
	jQuery("dl.faq").find(".up").show();
	jQuery("dl.faq").find(".down").hide();
});

// --- MAKE CLICKABLE ----------------------------------------------------------

// Finds the HREF within a DIV and makes the entire DIV a link to that URL

jQuery(".make-clickable").click(function() {
	window.location = jQuery(this).find("a").attr("href");
	return false;
});

// --- MOBILE NAV --------------------------------------------------------------

jQuery(".topnav__burger").click(function() {
	this.classList.toggle('is-active');
	jQuery("#topnav__mobile__container").slideToggle();
});

jQuery(".navdropdown").change(function(){
    // console.log("Mobile nav: " + jQuery("#nav-mobile").val(), this);
    window.location = jQuery(this).val();
});

jQuery("#topnav__mobile .has-dropdown").click(function() {
	jQuery(this).find(".chevron-right").toggle();
	jQuery(this).find(".chevron-down").toggle();
	jQuery(this).children(".has-children").toggle();
});


// --- EDGE PRICING TABLE SWITCH CONTROLLER ------------------------------------

jQuery(".input-switch").click(function() {
	jQuery(".price-monthly").toggle();
	jQuery(".price-annual").toggle();
});

// --- DEBUG REVEALER ----------------------------------------------------------

jQuery(".show_debug").click(function() {
	jQuery(".debug_data").show();
});

// --- CAROUSEL ----------------------------------------------------------------

jQuery(".carousel__next").click(function() {
	jQuery(this).parents(".carousel").find(".grid").animate({
		scrollLeft: "+=775px"
	}, "slow");

});

jQuery(".carousel__prev").click(function() {
	jQuery(this).parents(".carousel").find(".grid").animate({
		scrollLeft: "-=775px"
	}, "slow");
});

// --- FAQ-EXT -----------------------------------------------------------------

// --- SCROLL SPY ---

// Adapted from https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/

window.addEventListener('DOMContentLoaded', () => {

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			// console.log( id + ' = ' + entry.intersectionRatio );
			if (entry.intersectionRatio > 0) {
				document.querySelector(`.sticky__stuck a[href="#${id}"]`).parentElement.classList.add('active');
			} else {
				document.querySelector(`.sticky__stuck a[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	});

	// Track all sections that have an `id` applied
	document.querySelectorAll('div.anchor[id]').forEach((section) => {
		observer.observe(section);
	});

});

// --- SMHF --------------------------------------------------------------------

jQuery(".show-extra").click(function() {
	jQuery(".smhf__list__overlay").hide();
	jQuery(".hide-extra").removeClass("hide-extra");
	jQuery(".show-extra").closest("p").hide();
});

// --- SMHF --------------------------------------------------------------------

jQuery(".show-extra").click(function() {
	jQuery(".smhf__list__overlay").hide();
	jQuery(".hide-extra").removeClass("hide-extra");
	jQuery(".show-extra").closest("p").hide();
});

// --- VIMEO LOAD-ON-CLICK -----------------------------------------------------

jQuery(".embed-player-vimeo").click(function() {

	// Don't allow multiple clicks
	jQuery(this).prop("disabled", true);

	jQuery(this).css( "background-image", "" );
	jQuery(this).css( "padding", "" );
	jQuery(this).find("button").css( "display", "none" );
	jQuery(this).find("iframe").css( "display", "inherit" );
	jQuery(this).find("iframe").attr( "src", jQuery(this).find("iframe").attr("data-src") );
});

// --- COOKIE ------------------------------------------------------------------

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

// --- PARTNER BANNER ----------------------------------------------------------

// If one of the partner campaign cookies is detected
// - Inject the banner into the page at #inject-banner

jQuery(document).ready(function() {

	var cm = getCookie('utm_medium');
	var cs = getCookie('utm_source');

	var header = "";
	var caption = "";

	// console.log( 'Cookie utm_medium = ' + cm );
	// console.log( 'Cookie utm_source = ' + cs );

	if ( 'partner' == cm ) {

		switch( cs ) {

			case 'caringtransitions':
				header = "Sundae &amp; Caring Transitions";
				caption = "<p>Sundae is excited to partner with <strong>Caring Transitions</strong> to support their clients when selling a home that requires updates or repairs.</p>";
			break;

			case 'clearhomesolutions':
				header = "Sundae &amp; Clear Home Solutions";
				caption = "<p>Sundae is excited to partner with <strong>Clear Home Solutions</strong> to support their clients when selling a home that requires updates or repairs.</p>";
			break;

			case 'sunshineretirement':
				header = "Sundae &amp; Sunshine Retirement Living";
				caption = "<p>Sundae is excited to partner with <strong>Sunshine Retirement Living</strong> to support their clients when selling a home that requires updates or repairs.</p>";
			break;

		}

		jQuery("#inject-banner").html( returnBanner( header, caption ) );

	}

});

function returnBanner( header, caption ) {

	var b = "";

	// If there are no header or caption provided,
	// abort so a blank banner doesn't show.

	if ( header === "" ) { return; }
	if ( caption === "" ) { return; }

	b += "<div class=\"bg-paleblue\">";
	b += "<div class=\"container\">";
	b += "<div class=\"grid\">";
	b += "<div class=\"column has-text-center\">";
	b += "<p class=\"h3 font-merriweather\">" + header + "</p>";
	b += caption;
	b += "</div><!--/column-->";
	b += "</div><!--/grid-->";
	b += "</div><!--container-->";
	b += "</div><!--bg-->";

	return b;

}