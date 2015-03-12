/**
 * Coordinates all the different components of the game.
 *
 * @file			Core.js
 * @package			Snake
 * @dependencies	jQuery, Phaser
 */

;(function(App, window, document, undefined) {
	'use strict';

	App.Core = function() {
		this.phaser = null;
		this.startState = 'StartState';

		this.initialize = function() {
			this.phaser = new Phaser.Game(
				800, 
				608, 
				Phaser.AUTO,
				'Snake'
			);

			/* Bug in phaser, can't use create to set background color*/
			setTimeout(
				function() {
					this.phaser.stage.backgroundColor = '#777964';
				}.bind(this),
				100
			);

			this.loadStates();
		}

		this.loadStates = function() {
			var start = false;
			for(var i in Snake.States) {
				if(!Snake.States.hasOwnProperty(i)) {
					continue;
				}
				var state = new Snake.States[i](this.phaser);
				this.phaser.state.add(i,state);
				if(state.isStart) {
					start = i;
				}
			}

			this.phaser.state.start(start);
		};

		this.initialize();
	};

}(namespace('Snake'), window, document));