var BasicGame = {};

BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
       //create a loading sign
        this.preloaderText = this.add.text(this.world.centerX, this.world.centerY, 'Loading...', {
			fontSize: '96px',
			fill: '#fff',
			align: 'center'
		});
		this.preloaderText.anchor.setTo(0.5, 0.5);
        //this section preloads the graphics in the game and names them for later on in the code
		this.load.image('logo', 'assets/Logo.png');
		this.load.image('road', 'assets/Road.png');
		this.load.image('startButton', 'assets/start.png');
		this.load.image('ME', 'assets/CarGood.png');
		this.load.image('car', 'assets/CarBad.jpg');
		this.load.image('life', 'assets/lives.png');
        this.load.spritesheet('kaboom', 'assets/explode.png', 128, 128, 16);
  
        
	},

	create: function () {
	
	},

	update: function () {

		
			this.game.state.start('MainMenu');
	}

};