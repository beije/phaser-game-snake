/**
 * Play state
 *
 * @file			PlayState.js
 * @package			Snake.State
 * @dependencies	jQuery, Phaser
 */

;(function(App, window, document, undefined) {
	'use strict';

	App.PlayState = function(phaser) {
		this.phaser = null;
		this.cursors = null;
		this.currentMovement = 2;
		this.player = null;
		this.point = null;
		this.score = 0;
		this.speed = 16;
		this.updateSpeed = 100;
		this.lastUpdate = 0;
		this.scoreText = null;
		this.movement = {
			'UP' : 1,
			'RIGHT' : 2,
			'DOWN' : 4,
			'LEFT' : 8,
		}

		this.initialize = function(phaser) {
			this.phaser = phaser;
		}

		this.preload = function() {

		}
		this.create = function() {
			this.cursors = this.phaser.input.keyboard.createCursorKeys();
			this.score = 0;
			this.point = null;
			this.addPoint();
			this.player = [];
			for(var i = 0; i < 4; i++) {
				this.increaseLength();
			}

			var style = {
				font: "16px Arial",
				fill: "#000",
				align: "center"
			};

			this.scoreText = this.phaser.add.text(10, 10, '', style);
			this.updateScore();
		}

		this.addPoint = function() {
			var widthPoints = this.phaser.width/16;
			var heightPoints = this.phaser.height/16;
			var x = Math.round(Math.random()*(widthPoints-1))*16;
			var y = Math.round(Math.random()*(heightPoints-1))*16;
			if(!this.point) {
				this.point = this.phaser.add.sprite(this.phaser.world.centerX, this.phaser.world.centerY, 'point');
			}
			this.point.x = x;
			this.point.y = y;
		}
		this.updateScore = function() {
			this.scoreText.setText('SCORE: ' + this.score);
		}
		this.increaseLength = function() {
			var x = 160;
			var y = 160;
			if(this.player.length != 0) {
				x = this.player[this.player.length-1].x + 16;
				y = this.player[this.player.length-1].y + 16;
			}
			var ball = this.phaser.add.sprite(x, y, 'playerball');
			this.phaser.physics.arcade.enable(ball);
			
			this.player.push(ball);
		}

		this.updateMovementPosition = function() {
			if (this.cursors.up.isDown) {
				if(this.currentMovement != this.movement.DOWN) {
					this.currentMovement = this.movement.UP;
				}
			}

			if (this.cursors.right.isDown) {
				if(this.currentMovement != this.movement.LEFT) {
					this.currentMovement = this.movement.RIGHT;
				}
			}

			if (this.cursors.down.isDown) {
				if(this.currentMovement != this.movement.UP) {
					this.currentMovement = this.movement.DOWN;
				}
			}

			if (this.cursors.left.isDown){
				if(this.currentMovement != this.movement.RIGHT) {
					this.currentMovement = this.movement.LEFT;
				}
			}
		}
		this.getTimeStamp = function() {
			return new Date().getTime();
		}

		this.isColliding = function(a, b) {
			if(a.body.hitTest(b.x, b.y)) {
				return true;
			}

			return false;
		}

		this.checkCollisionWithSelf = function() {
			for(var i = 1; i < this.player.length; i++) {
				if(this.player[0].body.hitTest(this.player[i].x, this.player[i].y)) {
					return true;
				}
			}

			return false;
		}

		this.checkOutOfBoundry = function() {
			if(this.player[0].x > this.phaser.width || this.player[0].x < 0) {
				return true;
			}
			if(this.player[0].y > this.phaser.height || this.player[0].y < 0) {
				return true;
			}

			return false;
		}

		this.update = function() {
			this.updateMovementPosition();

			if((this.getTimeStamp() - this.lastUpdate) < this.updateSpeed) {
				return;
			}

			if(this.isColliding(this.player[0], this.point)) {
				this.increaseLength();
				this.addPoint();
				this.score++;
				this.updateScore();
			}
			if(this.checkCollisionWithSelf()) {
				this.game.state.start("EndState");
				return;
			}

			this.lastUpdate = this.getTimeStamp();

			var oldX, oldY;
			for(var i = 0; i < this.player.length; i++) {
				var x = this.player[i].x;
				var y = this.player[i].y;
				if(i != 0) {
					this.player[i].x = oldX;
					this.player[i].y = oldY;
				}

				oldX = x;
				oldY = y;
			}

			switch(this.currentMovement) {
				case this.movement.UP:
					this.player[0].y -= this.speed;
				break;
				case this.movement.RIGHT:
					this.player[0].x += this.speed;
				break;
				case this.movement.DOWN:
					this.player[0].y += this.speed;
				break;
				case this.movement.LEFT:
					this.player[0].x -= this.speed;
				break;
			}

			if(this.checkOutOfBoundry()) {
				this.game.state.start("EndState");
				return;
			}

		}

		this.initialize(phaser);
	};

}(namespace('Snake.States'), window, document));
