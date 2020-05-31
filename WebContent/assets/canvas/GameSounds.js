/**
 * GameSounds
 */

function GameSounds() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */

var GameSounds_proto = Object.create(Phaser.State.prototype);
GameSounds.prototype = GameSounds_proto;
GameSounds.prototype.constructor = GameSounds;



GameSounds.prototype.preload = function (game) {
	
	game.load.audio('IntroMusic', ['assets/audio/IntroMusic.mp3','assets/audio/IntroMusic.ogg']);

	
};

GameSounds.prototype.create = function (game) {
	
	var allSounds = {};
	
	IntroMusic = game.add.audio('IntroMusic');
	IntroMusic.allowMultiple = true;
	IntroMusic.addMarker('IntroMusic', 0, 28.74);
	

	
	allSounds.IntroMusic = IntroMusic;
	
	return allSounds;
	
};


