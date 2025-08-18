/*
	Verti by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ null,      '736px'  ]
	});

	// Initialize after window load to ensure SPA header is rendered
	$window.on('load', function() {
		// Play initial animations on page load.
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);

		function ensureToggle() {
			if (!$('#navToggle').length) {
				$('<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>')
				.appendTo($body);
			}
		}

		function syncNavPanel() {
			var $nav = $('#nav');
			if (!$nav.length) return false;
			var linkCount = $nav.find('a').length;
			if (!linkCount) return false;

			// init dropdowns once nav exists
			if ($nav.find('> ul').length) {
				$nav.find('> ul').dropotron({ mode: 'fade', noOpenerFade: true, speed: 300 });
			}

			ensureToggle();

			var html = (typeof $.fn.navList === 'function') ? $nav.navList() : '';
			if (!html) return false;

			var $panel = $('#navPanel');
			if ($panel.length) {
				// Update existing panel content if empty or outdated
				var $navContainer = $panel.children('nav');
				if (!$navContainer.length) {
					$panel.html('<nav>' + html + '</nav>');
				} else if ($navContainer.html() !== html) {
					$navContainer.html(html);
				}
			} else {
				$panel = $('<div id="navPanel"><nav>' + html + '</nav></div>')
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
			}
			return true;
		}

		// Try to build immediately; if not ready, retry a few times
		var attempts = 0;
		(function tryBuild() {
			if (syncNavPanel() || attempts >= 20) return; // extend retries for SPA timing
			attempts++;
			setTimeout(tryBuild, 100);
		})();

		// Keep panel in sync if header nav changes (route/i18n updates)
		var headerNav = document.getElementById('nav');
		if (headerNav && 'MutationObserver' in window) {
			var mo = new MutationObserver(function() { syncNavPanel(); });
			mo.observe(headerNav, { childList: true, subtree: true });
		}

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
			var mo2 = new MutationObserver(function() { adjustMediaAspect(); });
			mo2.observe(contentEl, { childList: true, subtree: true });
		}
	});

})(jQuery);