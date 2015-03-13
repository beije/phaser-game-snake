/**
 * Example state
 *
 * @file			State.js
 * @package			Snake.State
 * @dependencies	jQuery, Phaser
 */

;(function(App, window, document, undefined) {
	'use strict';

	App.State = function(phaser) {
		this.phaser = null;

		this.initialize = function(phaser) {
			this.phaser = phaser;
		}

		this.preload = function() {

		}
		this.create = function() {

		}
		this.update = function() {

		}

		this.initialize(phaser);
	};

}(namespace('Snake.States'), window, document));
