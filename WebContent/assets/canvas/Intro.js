
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * Intro.
 */
function Intro() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Intro_proto = Object.create(Phaser.State.prototype);
Intro.prototype = Intro_proto;
Intro.prototype.constructor = Intro;

Intro.prototype.init = function () {
	
	this.myInit();
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
};

Intro.prototype.preload = function () {
	
	this.load.pack('loader', 'assets/loaderSprites.json');
	
	this.myPreload();
	
	this.load.pack('graphics', 'assets/pack.json');
	
};

Intro.prototype.create = function () {
	var _jetBg = this.add.sprite(0.0, -4.0, 'jetBg');
	
	var _playBtn = this.add.sprite(-178.0, 96.0, 'playBtn');
	
	var _ReadyText = this.add.text(364.0, 201.0, 'click anywhere to begin', {"font":"bold 20px Arial","fill":"#ffffff"});
	
	
	
	// fields
	
	this.fJetBg = _jetBg;
	this.fPlayBtn = _playBtn;
	this.fReadyText = _ReadyText;
	
	
	this.myCreate();
	
};

/* --- end generated code --- */
// -- user code here --
Intro.prototype.myInit = function () {
	this.game.stage.disableVisibilityChange = true;
};

Intro.prototype.myPreload = function () {


		var loaderOutline = this.game.add.graphics(0, 0);
		
		loaderOutline.beginFill(0x602530, 0.6); 
	    loaderOutline.moveTo(0,0);
	    loaderOutline.lineTo(100, 0);
	    loaderOutline.lineTo(100, 30);
	    loaderOutline.lineTo(0, 30);
	    loaderOutline.lineTo(0, 0);
	    loaderOutline.endFill();

	    var loaderOutline2 = this.game.add.graphics(0, 0);
		
		loaderOutline2.beginFill(0xc12354, 0.6); 
	    loaderOutline2.moveTo(0,0);
	    loaderOutline2.lineTo(100, 0);
	    loaderOutline2.lineTo(100, 25);
	    loaderOutline2.lineTo(0, 25);
	    loaderOutline2.lineTo(0, 0);
	    loaderOutline2.endFill();


	    var loaderContainer = this.game.add.sprite(0,0, loaderOutline.generateTexture());
	    loaderOutline.destroy();

		
		
        loaderContainer.width = this.game.width;
   		loaderContainer.x = this.game.world.centerX - loaderContainer.width / 2;
        loaderContainer.y = this.game.world.centerY - 16;

		var loadSprite = this.game.add.sprite(0,0, loaderOutline2.generateTexture());
		   loaderOutline2.destroy();

		  //loadSprite.width = 100;
        loadSprite.x = this.game.world.centerX - loadSprite.width / 2;
        loadSprite.y = this.game.world.centerY - 14;

		 this.game.load.onFileComplete.add(function (progress, key, success, loaded, total) {
 
        loadSprite.width = this.game.width * (progress / 100);
        loadSprite.x = this.game.world.centerX - loadSprite.width / 2;
 			

            console.log('progress: ' + progress);
            console.log('key: ' + key);
            console.log('success: ' + success);
            console.log('loaded: ' + loaded + '\/' + total);
            console.log('**********');
 
        }, this);	
	
	this.game.load.audio('hurt', ['assets/audio/hurt.mp3','assets/audio/hurt.ogg']);
	this.game.load.audio('getFuel', ['assets/audio/getFuel.mp3','assets/audio/getFuel.ogg']);
	this.game.load.audio('pickCristal', ['assets/audio/pickCristal.mp3','assets/audio/pickCristal.ogg']);
	this.game.load.audio('elevate1', ['assets/audio/elevate1.mp3','assets/audio/elevate1.ogg']);
	this.game.load.audio('elevate2', ['assets/audio/elevate2.mp3','assets/audio/elevate2.ogg']);
	this.game.load.audio('elevate3', ['assets/audio/elevate3.mp3','assets/audio/elevate3.ogg']);

	if(this.game.musicOption != '3'){ 

		this.game.load.audio('bgmusic1', ['assets/audio/soundtrack4_01.mp3','assets/audio/soundtrack4_01.ogg']);
		this.game.load.audio('bgmusic2', ['assets/audio/soundtrack5_01.mp3','assets/audio/soundtrack5_01.ogg']);

	}

	this.game.load.image('playBtn', 'assets/images/playBtn.png')

	
};

	Intro.prototype.removePhaserNetworkPlayer = function(sessionId){


		console.log('nothign to remove here ');

	}


Intro.prototype.myCreate = function () {
	
	 
	this.fJetBg.width =  this.game.width;
	this.fJetBg.height = this.game.height;
	this.fReadyText.x = this.game.width/2;	
	this.game.input.onUp.addOnce(starScene, this);
	
	function starScene(){
		

	
	//player.sounds.fxCoin.play("coin");
	
	 this.fPlayBtn = this.game.add.button(this.game.width/2, 955.0, 'playBtn', startGame, this, 2, 1, 0);
	 this.fPlayBtn.anchor.set(0.5);
	 pigArrives = this.game.add.tween( this.fPlayBtn);
	    
	    pigArrives.to({y:this.game.height/2}, 1000, Phaser.Easing.Bounce.Out);
	    pigArrives.onComplete.add(firstTween, this);
	    pigArrives.start();
	}   
	    function firstTween() {

	        s = this.game.add.tween(this.fPlayBtn.scale);
	        s.to({x: 1.05, y:1.05}, 500, Phaser.Easing.Linear.None);
	        s.onComplete.addOnce(theEnd, this);
	        s.start();

	    }
	    
	    function theEnd() {
	    	
	    	
	    	  s = this.game.add.tween(this.fPlayBtn.scale);
		        s.to({x: 1, y:1}, 500, Phaser.Easing.Linear.None);
		        s.onComplete.addOnce(firstTween, this);
		        s.start();

	    }
	    
	 function startGame(){
	 
		 this.game.state.start('Level3');
		 
	 }
	
	this.game.croquetView.setCurrentScene(this.game); //seteamos en que escena me encuentro para croquet
};


Intro.prototype.crearMonedas = function(data){
			console.log('no time now for monedas');
		
		}

Intro.prototype.addPhaserNetworkOnlinePlayer = function(allPlayers){

	console.log('no time now to add players, this should be in the Level3 scene');
}