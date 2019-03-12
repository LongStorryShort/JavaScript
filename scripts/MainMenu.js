BasicGame.MainMenu = function (game) { };

var startButton;
var road;
var logo;

BasicGame.MainMenu.prototype = {

	create: function () {
        // outputs the main menu graphics mainly logo, start button and backgorund
        road = this.add.tileSprite(0, 0, 800, 600, 'road');
        logo = this.add.sprite((this.world.width / 2), (this.world.height / 2) - 150, 'logo');
        logo.anchor.setTo(0.5,0.5);
        startButton = this.add.button((this.world.width / 2), (this.world.height / 2) + 50, 'startButton', this.startGame);
        startButton.anchor.setTo(0.5,0.5);

	},

	update: function () {
    },
    startGame: function () {
        //starts the game
        this.game.state.start('Game');
		
	}

};