/**
 * End state
 *
 * @file			State.js
 * @package			Snake.State
 * @dependencies	jQuery, Phaser
 */

;(function(App, window, document, undefined) {
	'use strict';

	App.EndState = function(phaser) {
		this.phaser = null;
		this.isStart = false;

		this.initialize = function(phaser) {
			this.phaser = phaser;
		}

		this.preload = function() {

		};

		this.create = function() {
			var playButton = this.game.add.button(
				this.phaser.world.centerX, 
				this.phaser.world.centerY,
				'gameover',
				function() {
					this.game.state.start("PlayState");
				},
				this
			);
			playButton.anchor.setTo(0.5,0.5);
		};

		this.initialize(phaser);
	};

}(namespace('Snake.States'), window, document));