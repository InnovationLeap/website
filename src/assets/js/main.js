/*
	Verti by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// 16:9 aspect for iframe/embed: apply on load, resize, and DOM updates (for SPA content)
	function adjustMediaAspect() {
		var ratio = 1.777777777777777; // 16:9
		$('iframe').each(function() {
			var $el = $(this);
			$el.height($el.width() / ratio);
		});
		$('embed').each(function() {
			var $el = $(this);
			$el.height($el.width() / ratio);
		});
	}

	// On load and resize
	$window.on('load', adjustMediaAspect);
	$window.on('resize', adjustMediaAspect);

	// Observe dynamic content changes under #content (Vue renders markdown later)
	var contentEl = document.getElementById('content');
	if (contentEl && 'MutationObserver' in window) {
		var mo = new MutationObserver(function() { adjustMediaAspect(); });
		mo.observe(contentEl, { childList: true, subtree: true });
	}

})(jQuery);