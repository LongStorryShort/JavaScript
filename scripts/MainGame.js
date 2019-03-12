BasicGame.Game = function (game) {};

var ME; 
var cars; //group of enimy cars
var lives; // group of lives

var score; //Your Score
var lifeTotal; // Your Lives
var scoreText; // text that displays scores
var lifeTotalText; // text that displays lives

var seconds; //Number of seconds you have played
var timer; 
var timerText; // text that displays time

var cursors; //keyboard controls
var gameOverText; //game over message
var restartButton; // restart button 
var gameOver;

BasicGame.Game.prototype = {

	create: function () {

		this.physics.startSystem(Phaser.Physics.ARCADE); //create the physics that the world uses
		this.road = this.add.tileSprite(0, 0, 800, 600, 'road'); //background
		ME = this.add.sprite((this.world.width / 2), this.world.height - 50, 'ME'); //creates your sprite
        ME.scale.y = 0.1;
        ME.scale.x = 0.1;
		ME.anchor.setTo(0.5,0);
		this.physics.enable(ME, Phaser.Physics.ARCADE);
		ME.body.collideWorldBounds = true;

		cars = this.add.group(); //create Enemy Sprite
		this.physics.enable(cars, Phaser.Physics.ARCADE);
		
		cars.setAll('outOfBoundsKill', true);
		cars.setAll('checkWorldBounds', true);
        cars.setAll('anchor.x', 0.5);
		cars.setAll('anchor.y', 0.5);
		
		lives = this.add.group(); //creates lives
		this.physics.enable(lives, Phaser.Physics.ARCADE);
		
		lives.setAll('outOfBoundsKill', true);
		lives.setAll('checkWorldBounds', true);
        lives.setAll('anchor.x', 0.5);
		lives.setAll('anchor.y', 0.5);

		scoreText = this.add.text(16, 16, 'Score: 0', { //creates score display
			font: '32px arial',
			fill: '#000'
		});
		score = 0;
		scoreText.text = "Score: " + score;
		
		lifeTotalText = this.add.text(this.world.width - 150, 16, 'Lives: 3', { //creates life display
			font: '32px arial',
			fill: '#000'
		});
		lifeTotal = 1;
		lifeTotalText.text = 'Lives: ' + lifeTotal;
		
		timerText = this.add.text(350, 16, 'Time: 0', { //timer text
			font: '32px arial', 
			fill: '#000'
		});
		timer = this.time.create(false); //timer creation
		seconds = 0;
		timerText.text = 'Time: ' + seconds;
		
		gameOverText = this.add.text(this.world.centerX, this.world.centerY-50, 'Game Over', { //creates Games over text
			font: '96px arial',
			fill: '#000',
			align: 'center'
		});
		gameOverText.anchor.set(0.5); //gameover creation
		gameOverText.visible = false;
		gameOver = false;
		
		restartButton = this.add.button((this.world.width / 2), (this.world.height / 2)+50, 'startButton', this.restartGame); //creates restart button
		restartButton.anchor.set(0.5);
		restartButton.visible = false;
		
		this.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
		cursors = this.input.keyboard.createCursorKeys();
		
		timer.loop(1000, this.updateTimer, this);
		timer.start();
	},

	update: function () {
        this.road.tilePosition.y += 10;
		if (lifeTotal < 1 || gameOver===true) { //start of game
			this.gameOver();
		}
		else {
			this.createcar();
			this.createLife();
			this.moveME();
			this.collisionDetection();
		}
	},

	moveME: function () { //Player movement
		if (cursors.left.isDown) {
			ME.body.velocity.x = -500;
		}
		else if (cursors.right.isDown) {
		    ME.body.velocity.x = 500;
		}
		else {
		    ME.body.velocity.x = 0;
		}
        if (cursors.up.isDown) {
			ME.body.velocity.y = -500;
		}
		else if (cursors.down.isDown) {
		    ME.body.velocity.y = 500;
		}
		else {
		    ME.body.velocity.y = 0;
		}
	},

	createcar: function () { //create enemy 
		var random = this.rnd.integerInRange(0, 25);
		if (random === 0) {
			var randomX = this.rnd.integerInRange(0, this.world.width - 150);
			var car = cars.create(randomX, -50, 'car');
			this.physics.enable(car, Phaser.Physics.ARCADE);
			car.body.velocity.y = this.rnd.integerInRange(200, 300);
		}
	},

	createLife: function () { //create lives
		var random = this.rnd.integerInRange(0, 500);
		if (random === 0) {
			var randomX = this.rnd.integerInRange(0, this.world.width - 150);
			var life = lives.create(randomX, -50, 'life');
			this.physics.enable(life, Phaser.Physics.ARCADE);
			life.body.velocity.y = 150;
		}
	},


	collisionDetection: function () { //collision detection 
		this.physics.arcade.overlap(ME, cars, this.collidecar, null, this);
		this.physics.arcade.overlap(ME, lives, this.collectLife, null, this);
	},

	collidecar: function (ME,car) { //collision between ME and Enimy sprite
		car.kill();
		lifeTotal--;
		lifeTotalText.text = 'Lives: ' + lifeTotal;
        score -= 400;
		scoreText.text = 'Score: ' + score;
        var animation = this.add.sprite(car.body.x, car.body.y, 'kaboom');
		animation.animations.add('explode');
		animation.animations.play('explode', 30, false, true);
	},

	collectLife: function (ME, life) { //collision between me and a life 
		life.kill();
		lifeTotal++;
		lifeTotalText.text = 'Lives: ' + lifeTotal;
	},

	updateTimer: function () { //creates timer
		seconds++;
		timerText.text = 'Time: ' + seconds;
        		score += 50; //timer adds to score
		scoreText.text = 'Score: ' + score;
	},

	gameOver: function () { //Game Over
		ME.body.velocity.x = 0;
		ME.body.x = (this.world.width/2)-(ME.body.width/2);
        ME.body.velocity.y = 0;
		ME.body.y = (this.world.width/2)-(ME.body.width/2);
		cars.callAll('kill');
		lives.callAll('kill');
		gameOverText.visible = true;
		restartButton.visible = true;
		timer.stop();
	},
    
	restartGame: function () { // Restart Function
		this.game.state.start('Game');
	}
	
};