
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * ScoreScreen.
 */
function ScoreScreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var ScoreScreen_proto = Object.create(Phaser.State.prototype);
ScoreScreen.prototype = ScoreScreen_proto;
ScoreScreen.prototype.constructor = ScoreScreen;

ScoreScreen.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
};

ScoreScreen.prototype.preload = function () {
	
	this.load.pack('graphics', 'assets/pack.json');
	
};

ScoreScreen.prototype.create = function () {
	var _jetBg = this.add.sprite(0.0, 0.0, 'jetBg');
	
	var _scoreText = this.add.text(287.0, 112.0, '0000\n', {"font":"bold 40px Arial","fill":"#ffffff"});
	_scoreText.anchor.set(0.5, 0.5);
	
	var _yourScore = this.add.text(284.0, 65.0, 'Your score', {"font":"bold 30px Arial","fill":"#ffffff"});
	_yourScore.anchor.set(0.5, 0.5);
	
	var _GameOverTag = this.add.sprite(177.0, 15.0, 'GameOverTag');
	_GameOverTag.scale.set(0.5, 0.5);
	_GameOverTag.anchor.set(0.5, 0.5);
	
	var _meteoritos = this.add.group();
	
	
	
	// fields
	
	this.fJetBg = _jetBg;
	this.fScoreText = _scoreText;
	this.fYourScore = _yourScore;
	this.fGameOverTag = _GameOverTag;
	this.fMeteoritos = _meteoritos;
	this.myCreate();
	
};

/* --- end generated code --- */
// -- user code here --
ScoreScreen.prototype.myCreate = function () {

	this.fGameOverTag.x = this.game.width/2;
	this.fGameOverTag.y = this.game.height/2-200;
	this.fYourScore.x =  this.game.width/2;
	this.fYourScore.y = this.game.height/2-70
	this.fScoreText.x = this.game.width/2;
	this.fScoreText.y = this.game.height/2-30;
	this.fScoreText.text = this.game.score;
	this.fJetBg.width =  this.game.width;
	this.fJetBg.height = this.game.height;

for(var i=0; i<=5; i++){


	var obstacle = new meteorito(this.game, this.game.width+50,Math.random()*this.game.height);
	var warningSign = new warning(this.game, this.game.width+50,Math.random()*this.game.height);
	obstacle.warningSign = warningSign;
	this.add.existing(obstacle);

		this.game.physics.arcade.enable(obstacle);
		obstacle.body.gravity.y=0;
		obstacle.body.velocity.x-=Math.random()*500;
		obstacle.body.moves = true;
		obstacle.body.immovable = false;

		this.fMeteoritos.add(obstacle);
}
	this.fPlayBtn = this.game.add.button(this.game.width/2, this.game.height/2+100, 'reloadBtn', startGame, this, 2, 1, 0);
	this.fPlayBtn.scale.set(0.5);
	this.fPlayBtn.anchor.set(0.5);

	 function startGame(){
	 
		 this.game.state.start('Level3');
		 
	 }
	 this.game.croquetView.setCurrentScene(this.game); //seteamos en que escena me encuentro para croquet
}

ScoreScreen.prototype.update = function () {

	this.fMeteoritos.forEach(function(meteorito) { 	 //en caso de que se deshabilite los sonidos fxs
		if(meteorito.x <= -50){
			meteorito.x = this.game.width+50;
		}
	},this);
}
