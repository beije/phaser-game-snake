/**
 * Start state
 *
 * @file			State.js
 * @package			Snake.State
 * @dependencies	jQuery, Phaser
 */

;(function(App, window, document, undefined) {
	'use strict';

	App.StartState = function(phaser) {
		this.phaser = null;
		this.isStart = true;

		this.initialize = function(phaser) {
			this.phaser = phaser;
		}

		this.preload = function() {
			this.phaser.load.image('gameover', 'gfx/gameover.png');
			this.phaser.load.image('point', 'gfx/point.png');
			this.phaser.load.image('playerball', 'gfx/player-ball.png');
			this.phaser.load.image('play', 'gfx/play.png');
		};

		this.create = function() {
			var playButton = this.game.add.button(this.phaser.world.centerX, this.phaser.world.centerY,"play",this.startTheGame,this);
			playButton.anchor.setTo(0.5,0.5);
		};

		this.startTheGame = function() {
			this.game.state.start("PlayState");
		}

		this.initialize(phaser);
	};

}(namespace('Snake.States'), window, document));