window.onload = function() {
	
		//var Pixelratio = window.screen.availWidth / 640;
	  var width = 640  ;﻿﻿﻿
	  var height = 960 ;
	  var firstRunLandscape = false;
	  
	console.log("pixel ratio "+  window.devicePixelRatio); 
	console.log("largo "  + width + " ancho " + height);
	  
	var game = new Phaser.Game(width,height, Phaser.CANVAS);
	

	function Boot() {
	
		Phaser.State.call(this);
	
		}

		var Boot_proto = Object.create(Phaser.State.prototype);
		Boot.prototype = Boot_proto;
		Boot.prototype.constructor = Boot;

		Boot.prototype.init = function () {
			
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
			
		};

		Boot.prototype.preload = function () {
			
		this.load.pack('loader', 'assets/loaderSprites.json');

 		var loadSprite = game.add.sprite(0, 0, 'loadBar');

        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;

	
		};



		Boot.prototype.create = function () {
		
		game.time.events.add(Phaser.Timer.SECOND * 1, iniciarJuego, this);

		function iniciarJuego(){

			console.log('im here');
			game.state.start("LoaderTime");

		} 
		

		};

		function LoaderTime() {
	
		Phaser.State.call(this);
	
		}

		var LoaderTime_proto = Object.create(Phaser.State.prototype);
		LoaderTime.prototype = LoaderTime_proto;
		LoaderTime.prototype.constructor = LoaderTime;

		LoaderTime.prototype.init = function () {
		
			
		};

		LoaderTime.prototype.preload = function () {
		var loaderContainer = game.add.sprite(0, 0, 'loaderContainer');	
		
        loaderContainer.width = game.width;
   		loaderContainer.x = game.world.centerX - loaderContainer.width / 2;
        loaderContainer.y = game.world.centerY - 16;

		var loadSprite = game.add.sprite(0, 0, 'loadBar');

		  //loadSprite.width = 100;
        loadSprite.x = game.world.centerX - loadSprite.width / 2;
        loadSprite.y = game.world.centerY - 16;

		 game.load.onFileComplete.add(function (progress, key, success, loaded, total) {
 
            loadSprite.width = game.width * (progress / 100);
            loadSprite.x = game.world.centerX - loadSprite.width / 2;
 			

            console.log('progress: ' + progress);
            console.log('key: ' + key);
            console.log('success: ' + success);
            console.log('loaded: ' + loaded + '\/' + total);
            console.log('**********');
 
        }, this);	



		this.load.pack('graphics', 'assets/pack.json');
		this.load.pack('Fonts', 'assets/pack.json');
		this.load.pack('animations', 'assets/pack.json');
		
	this.game.load.audio('jumpBall', ['assets/audio/jump.mp3','assets/audio/jump.ogg']);
	
	
	this.game.load.audio('BgMusic', ['assets/audio/BgMusic.mp3','assets/audio/BgMusic.ogg']);
	this.game.load.audio('BgMusic2', ['assets/audio/BgMusic2.mp3','assets/audio/BgMusic2.ogg']);

	this.game.load.audio('sonidoLevel', ['assets/audio/sonidoLevel.mp3','assets/audio/sonidoLevel.ogg']);

	this.game.load.audio('shoot', ['assets/audio/shoot.mp3','assets/audio/shoot.ogg']);
	
	this.game.load.audio('zombieWound1', ['assets/audio/zombieWound1.mp3','assets/audio/zombieWound1.ogg']);
	this.game.load.audio('zombieWound2', ['assets/audio/zombieWound2.mp3','assets/audio/zombieWound2.ogg']);
	this.game.load.audio('zombieWound3', ['assets/audio/zombieWound3.mp3','assets/audio/zombieWound3.ogg']);
	this.game.load.audio('zombieWound4', ['assets/audio/zombieWound4.mp3','assets/audio/zombieWound4.ogg']);
	
	this.game.load.audio('brainsAudio', ['assets/audio/brainsAudio.mp3','assets/audio/brainsAudio.ogg']);
	this.game.load.audio('getCoin', ['assets/audio/getCoin.mp3','assets/audio/getCoin.ogg']);
	this.game.load.audio('gotIngredient', ['assets/audio/gotIngredient.mp3','assets/audio/gotIngredient.ogg']);
	this.game.load.audio('openStore', ['assets/audio/openStore.mp3','assets/audio/openStore.ogg']);
	this.game.load.audio('buy', ['assets/audio/buy.mp3','assets/audio/buy.ogg']);
	this.game.load.audio('win', ['assets/audio/win.mp3','assets/audio/win.ogg']);
	this.game.load.audio('boil', ['assets/audio/boil.mp3','assets/audio/boil.ogg']);
	this.game.load.audio('ding', ['assets/audio/ding.mp3','assets/audio/ding.ogg']);
	this.game.load.audio('pop', ['assets/audio/pop.mp3','assets/audio/pop.ogg']);
	this.game.load.audio('gunReload', ['assets/audio/gunReload.mp3','assets/audio/gunReload.ogg']);
	this.game.load.audio('shuperShot', ['assets/audio/shuperShot.mp3','assets/audio/shuperShot.ogg']);
	this.game.load.audio('gotKey', ['assets/audio/gotKey.mp3','assets/audio/gotKey.ogg']);
	this.game.load.audio('rollUpgrade', ['assets/audio/rollUpgrade.mp3','assets/audio/rollUpgrade.ogg']);



				firstRunLandscape = game.scale.isGameLandscape;
				if(game.device.desktop){
					game.scale.forceOrientation(false, false);
				}else{
					game.scale.forceOrientation(false, true);
					
				}
				
				game.scale.enterIncorrectOrientation.add(handleIncorrect);
				game.scale.leaveIncorrectOrientation.add(handleCorrect);

				function handleIncorrect(){
     	if(!game.device.desktop){
     		document.getElementById("turn").style.display="block";
     	}
	}
	
	function handleCorrect(){
		if(!game.device.desktop){
			if(firstRunLandscape){
				
				gameRatio = window.innerWidth/window.innerHeight;		
				game.width = Math.ceil(640*gameRatio);
				game.height = 560;
				game.renderer.resize(game.width,game.height);
				game.state.start("Intro");		
			}
			document.getElementById("turn").style.display="none";
		}
	}

		};

		LoaderTime.prototype.create = function () {

        game.state.start("Intro");
		};
	// Add the States your game has.
	 game.state.add("Boot", Boot);
	 	game.state.add("LoaderTime", LoaderTime);

	game.state.add("Level3", Level3);
	game.state.add("looseScreen", looseScreen);
	game.state.add("winScreen", winScreen);
	game.state.add("Intro", Intro);

	game.state.start("Boot",true,true);

};
