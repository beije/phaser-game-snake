/**
 * Initializes the game.
 *
 * @file			bootstrap.js
 * @package			-
 * @dependencies	jQuery
 */

;(function(window, document, undefined) {
	'use strict';

	function initialize() {
		new Snake.Core();
	}

	$(document).bind('ready', initialize);

}(window, document));