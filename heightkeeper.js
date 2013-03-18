/**
 * Height Keeper
 * jQuery plugin for keeping a given element the total height as the viewport at all times.
 * 
 * Version:		0.1.0
 * Download:	https://github.com/benwigley/height-keeper
 * Dependencies:
 *		- jQuery v1.3+
 *
 * Example:
 *		$('.my-div').heightKeeper({offset: 50}, {minWidth: 750});
 *
 *
 * Copyright (c): 2013 Ben Wigley
 *
 * License: MIT License
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
	$.fn.heightKeeper = function(userOptions) {

		var $that = $(this);
		var prevHeight = $(window).height();
		

		// Default options
		// ---------------
		var defaults = {
			// say your div has padding-top: 50px; you can offset 
			// the padding using this parameter
			offset: 0,

			// if you would like to ignore the dynamic height resizing on 
			// a responsive site, then set this to your mobile width.
			minWidth: false
		}

		var options = $.extend({}, defaults, userOptions);


		var resize = function(complete) {
			var currentHeight = $(window).height() - options.offset,
				currentWidth = $(window).width(),
				extra = 0,
				timer = false;

			if (options.minWidth && options.minWidth >= currentWidth) {
				$that.css('min-height', 'auto');
				return;
			}

			if (currentHeight < prevHeight) {
				extra = 1;

				if (timer) clearTimeout(timer);
				timer = setTimeout(function() {
					extra = 0;
					doit(true);
				}, 100);
			}

			var doit = function(doitAnyway) {
				if (currentHeight !== prevHeight || doitAnyway === true) {
					$that.css('min-height', (currentHeight + extra) + 'px');
				}
			};

			doit(complete);

			prevHeight = currentHeight;
		};


		// Resize the div on window resize
		$(window).resize(resize);

		// Initial setup
		resize(true);

		return this;
	};
})(window.jQuery);
