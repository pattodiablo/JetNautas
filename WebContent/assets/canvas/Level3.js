
// -- user code here --
	var musicEnabled = true;
	var fxEnabled = true;
/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * Level3.
 */
function Level3() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Level3_proto = Object.create(Phaser.State.prototype);
Level3.prototype = Level3_proto;
Level3.prototype.constructor = Level3;

Level3.prototype.init = function () {
	
	this.myInit();
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
};

Level3.prototype.preload = function () {
	
	this.myPreload();
	
};

Level3.prototype.create = function () {
	var _jetBg = this.add.sprite(0.0, 0.0, 'jetBg');
	
	var _planets = this.add.group();
	
	var _platformGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
	
	this.add.sprite(0.0, 1000.0, 'bigFloorfake');
	
	this.add.sprite(0.0, 1080.0, 'bottomCover');
	
	var _coinGroup = this.add.group();
	
	var _cristalsGroup = this.add.group();
	
	var _NetplayersGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
	
	var _onlinePlayersFire = this.add.group(_NetplayersGroup);
	
	var _player = new player(this.game, 370.0, 137.0);
	this.add.existing(_player);
	
	var _flyingObstacles = this.add.group();
	
	var _visor = this.add.sprite(0.0, -73.0, 'visor');
	_visor.fixedToCamera = true;
	
	var _energyCell = this.add.sprite(7.0, 5.0, 'energyCell');
	_energyCell.scale.set(0.8, 0.8);
	_energyCell.fixedToCamera = true;
	
	var _distance = this.add.text(194.0, 52.0, '000000', {"font":"bold 28px Arial","fill":"#ffffff","align":"right"});
	_distance.fixedToCamera = true;
	
	var _distanceLabel = this.add.text(67.0, 52.0, 'Distance:', {"font":"bold 28px Arial","fill":"#ffffff","align":"right"});
	_distanceLabel.fixedToCamera = true;
	
	var _cristalsCount = this.add.text(184.0, 80.0, '000000', {"font":"bold 28px Arial","fill":"#ffffff","align":"right"});
	_cristalsCount.fixedToCamera = true;
	
	var _cristalsLabel = this.add.text(67.0, 80.0, 'Cristals:', {"font":"bold 28px Arial","fill":"#ffffff","align":"right"});
	_cristalsLabel.fixedToCamera = true;
	
	
	
	// fields
	
	this.fJetBg = _jetBg;
	this.fPlanets = _planets;
	this.fPlatformGroup = _platformGroup;
	this.fCoinGroup = _coinGroup;
	this.fCristalsGroup = _cristalsGroup;
	this.fNetplayersGroup = _NetplayersGroup;
	this.fOnlinePlayersFire = _onlinePlayersFire;
	this.fPlayer = _player;
	this.fFlyingObstacles = _flyingObstacles;
	this.fDistance = _distance;
	this.fCristalsCount = _cristalsCount;
	
	
	this.myCreate();
	
};

/* --- end generated code --- */
Level3.prototype.myPreload = function () {

	this.game.load.audio('bgmusic1', ['assets/audio/soundtrack4_01.mp3','assets/audio/soundtrack4_01.ogg']);
	this.game.load.audio('bgmusic2', ['assets/audio/soundtrack5_01.mp3','assets/audio/soundtrack5_01.ogg']);
	this.game.load.audio('hurt', ['assets/audio/hurt.mp3','assets/audio/hurt.ogg']);
	this.game.load.audio('getFuel', ['assets/audio/getFuel.mp3','assets/audio/getFuel.ogg']);
	this.game.load.audio('pickCristal', ['assets/audio/pickCristal.mp3','assets/audio/pickCristal.ogg']);
	this.game.load.audio('elevate1', ['assets/audio/elevate1.mp3','assets/audio/elevate1.ogg']);
	this.game.load.audio('elevate2', ['assets/audio/elevate2.mp3','assets/audio/elevate2.ogg']);
	this.game.load.audio('elevate3', ['assets/audio/elevate3.mp3','assets/audio/elevate3.ogg']);


}


Level3.prototype.myInit = function () {

}

Level3.prototype.bgMusicPlay = function () {

	BgMusic = this.game.add.audio('bgmusic1', 0.3); //agregar musica y volumen
	BgMusic.allowMultiple = false;
	BgMusic.loop = true;


	BgMusic2 = this.game.add.audio('bgmusic2', 0.3); //agregar musica y volumen
	BgMusic2.allowMultiple = false;
	BgMusic2.loop = true;
	
	var BgMusicSelector = Math.round(Math.random()) //agreagar musica de bg randomicamente

	if(BgMusicSelector >= 0.5 && musicEnabled){
		console.log('rola 1 selected!');
		this.BgMusic = 1;
		BgMusic.play();
		
	}
	if(BgMusicSelector <= 0.5 && musicEnabled){
		console.log('rola 2 selected!');
		this.BgMusic = 2;
		BgMusic2.play();
		
	}

	hurt = this.game.add.audio('hurt', 0.2);
	hurt.allowMultiple = false;
	hurt.addMarker('hurt', 0, 0.15	);

	getFuel = this.game.add.audio('getFuel', 0.2);
	getFuel.allowMultiple = false;
	getFuel.addMarker('getFuel', 0, 0.30	);

	pickCristal = this.game.add.audio('pickCristal', 0.2);
	pickCristal.allowMultiple = true;
	pickCristal.addMarker('pickCristal', 0, 0.18	);

	elevate1 = this.game.add.audio('elevate1', 0.2);
	elevate1.allowMultiple = true;
	elevate1.addMarker('elevate1', 0, 0.13	);

	elevate2 = this.game.add.audio('elevate2', 0.2);
	elevate2.allowMultiple = true;
	elevate2.addMarker('elevate2', 0, 0.13	);

	elevate3 = this.game.add.audio('elevate3', 0.2);
	elevate3.allowMultiple = true;
	elevate3.addMarker('elevate3', 0, 0.13	);

	this.fxSounds = [hurt,getFuel,pickCristal,elevate1,elevate2,elevate3]; //agreagar aqui todos los sound fx que se necesita adminstrar

	if(!fxEnabled){
		this.fxSounds.forEach(function(soundFx) { 	 //en caso de que se deshabilite los sonidos fxs
		soundFx.mute = true;
	},this);
	}

}

Level3.prototype.switchMusic = function () {


	if(musicEnabled){

		BgMusic.pause();
		BgMusic2.pause();
		musicEnabled = false;
		console.log('musica disabled');
		

	}else{
	

		if(this.BgMusic = 1){

			BgMusic.play();

		}else{

			BgMusic2.stop();

		}
		
		musicEnabled = true;
			console.log('musica musicEnabled');
	}


	};

Level3.prototype.switchFX = function () {
	

	if(fxEnabled){


	this.fxSounds.forEach(function(soundFx) { 	

		soundFx.mute = true;


	},this);

		fxEnabled = false;
		console.log('fx disabled');
		

	}else{
	
	this.fxSounds.forEach(function(soundFx) { 	

	soundFx.mute = false;


	},this);
	
		
		fxEnabled = true;
		console.log('fx enabled');
	}


	};


Level3.prototype.myCreate = function () {

	this.fNetPLayers = [];
	this.platformVelo = 5;
	this.velo = 360;
	this.timesConnected = 0;
	this.alertGroup = [];
	this.bgMusicPlay();

	this.game.input.onDown.add(this.swipeDownAction, this);

	this.game.input.onUp.add(this.swipeUpAction, this);  //manejo de swipe UP control de pantalla

	this.game.world.setBounds(0, 0, 1920, 1080);

    this.game.camera.follow(this.fPlayer,Phaser.Camera.FOLLOW_LOCKON,0.1, 0.1,0,0);

     	
    	var energyBarLine = this.game.add.graphics(this.game.camera.x,this.game.camera.y);
	    energyBarLine.beginFill(0xffffff, 0); 
	    energyBarLine.lineStyle(2, 0xffffff, 1);
	    energyBarLine.moveTo(0,0);
	    energyBarLine.lineTo(252, 0);
	    energyBarLine.lineTo(252, 37);
	    energyBarLine.lineTo(0, 37);
	    energyBarLine.lineTo(0, 0);

	    energyBarLine.endFill();

	    this.energyBarLine = this.game.add.sprite(67, 35, energyBarLine.generateTexture());
	    this.energyBarLine.fixedToCamera = true;
	    this.energyBarLine.anchor.x = 0;
        this.energyBarLine.anchor.y = 0.5;
  		energyBarLine.destroy();

     	var energyBar = this.game.add.graphics(this.game.camera.x,this.game.camera.y);
	    energyBar.beginFill(0xffffff,0.6); 

	    energyBar.moveTo(0,0);
	    energyBar.lineTo(250, 0);
	    energyBar.lineTo(250, 35);
	    energyBar.lineTo(0, 35);
	    energyBar.lineTo(0, 0);

	    energyBar.endFill();

	    this.energyBar = this.game.add.sprite(70, 35, energyBar.generateTexture());

        this.energyBar.anchor.x = 0;
        this.energyBar.anchor.y = 0.5;
   		this.energyBar.fixedToCamera = true;
   		energyBar.destroy();

	this.fJetBg.width=1920;
	this.fJetBg.height=1080;

	this.game.croquetView.setCurrentScene(this.game); //seteamos en que escena me encuentro para croquet
	


	this.createFirstPlatforms();
	this.addPhaserNetworkPlayer(); //registro mi jugador en croquet

		var emitter = this.game.add.emitter(this.game.width/2, this.game.height/2, 400);
    
    	emitter.width = this.game.world.width;
    	emitter.height = this.game.world.height;
    	emitter.angle = 0; // uncomment to set an angle for the rain.
     	emitter.gravity = 0;
    	emitter.makeParticles('particle');
    	emitter.lifespan = 5000;
    	emitter.minParticleScale = 0.6;
    	emitter.maxParticleScale = 1;
    
    	emitter.setYSpeed(0);
    	emitter.setXSpeed(-800, -900);
    
    	emitter.minRotation = 0;
    	emitter.maxRotation = 0;
    
    	emitter.start(false, 200, 0, 0);

}

Level3.prototype.addPhaserNetworkPlayer = function() {
		this.mySession = this.game.croquetView.getSessionID(); //me asigno mi id de usario

		if(this.game.timesConnected<=0){

	  		console.log('anadiendo croquet player');
			this.game.croquetView.confirmPlayerAdded(this.mySession);
			this.game.timesConnected++;

			//this.updatePos();
		}

		this.game.croquetView.updatePlayerList(); //pido lista de usuarios
		this.updatePos();
		this.game.croquetView.getPlayersPos();

		this.fPlayer.isPlaying = true;
		return true;


}

Level3.prototype.addPlayer =function(NetPlayer){
						console.log('creando a :' + NetPlayer)
						var croquetPlayer = new netPlayer(this.game, 0, 0);

						if(croquetPlayer.isPlaying){
							croquetPlayer.visible=true;


						}else{
							croquetPlayer.visible=false;
							croquetPlayer.body.enable=false;
							croquetPlayer.playerThrust.visible=false;
						}
						
						croquetPlayer.body.collideWorldBounds = true;
						this.add.existing(croquetPlayer);
						//agregar aqui jugadores nuevos

						var NetplayerObject = {NetPlayer:croquetPlayer,id:NetPlayer};
						this.fNetPLayers.push(NetplayerObject);
						this.fNetplayersGroup.add(croquetPlayer);
						console.log('largoUsuariosRegistradosEnMiSesion ' + this.fNetPLayers.length);
				
}

Level3.prototype.addPhaserNetworkOnlinePlayer = function(allPlayers){ //add online player

		if(this.game.timesConnected<=0){

		console.log('--creando online players--');
		console.log('online players: ' + allPlayers);
		if(allPlayers.length>0){
			
			allPlayers.forEach((NetPlayer, i) => {
				console.log('id de NetPlayer -> ' + NetPlayer);
				console.log('mi session es -> ' + this.game.croquetView.getSessionID());
		

			
					if(NetPlayer != this.game.croquetView.getSessionID()){
						
						console.log('agrego todos los jugadores que ya estaban en lista ' + NetPlayer);
							this.addPlayer(netPlayer);

							}else{

						console.log('este jugador ya esta creado')
					}

				
				});
			}else {
				console.log('no hay jugadores online');
			}
		}else{

				
				allPlayers.forEach((NetPlayer, i) => {
				const isAnewPLayer = [];
					this.fNetPLayers.forEach((localPlayer, j) => { //reviso si el jugador nuevo es alguno de los que ya estan la lista local

							if(NetPlayer == localPlayer.id){
								isAnewPLayer.push(false);
							}else{
								isAnewPLayer.push(true);
							}
						});

					const allEqual = arr => arr.every( v => v === true );
					const isNew = allEqual( isAnewPLayer );
					console.log('largoUsuariosCroquet ' + allPlayers.length);
					console.log('largoUsuariosRegistradosEnMiSesion ' + this.fNetPLayers.length);
					console.log('isAnewPLayer ' + isAnewPLayer.length);
					console.log('isNew ' + isNew);
					
					if(isNew){
						if(NetPlayer != this.game.croquetView.getSessionID()){
								console.log('there is a new player');
								this.addPlayer(NetPlayer);

						}
					}

				});
				
		}


  	this.updatePos();
	this.game.croquetView.getPlayersPos();


	}


Level3.prototype.updatePos = function() {

	this.netData = {
				sessionId:this.mySession,
				xpos:this.fPlayer.x,
				ypos:this.fPlayer.y,
				xvelo:this.fPlayer.body.velocity.x,
				yvelo:this.fPlayer.body.velocity.y,
				rotation:this.fPlayer.rotation,
				isPlaying:this.fPlayer.isPlaying
			}

		this.game.croquetView.updatePos(this.netData);
}

	Level3.prototype.moveNetPhaserPlayer = function(data){

		this.fNetPLayers.forEach((NetplayerObject, i) => {
	if(NetplayerObject.NetPlayer.body != null){
			if(data.sessionId == NetplayerObject.id){
				NetplayerObject.NetPlayer.visible=true;
				NetplayerObject.NetPlayer.body.enable=true;
				NetplayerObject.NetPlayer.x = data.xpos;
				NetplayerObject.NetPlayer.y = data.ypos;
				NetplayerObject.NetPlayer.body.velocity.x = data.xvelo;
				NetplayerObject.NetPlayer.body.velocity.y = data.yvelo;
				NetplayerObject.NetPlayer.rotation = data.rotation;
				}
			}
		});

	}

		Level3.prototype.removePhaserNetworkPlayer = function(sessionId){


		console.log('nedd to remove ' + sessionId);

		this.fNetPLayers.forEach((NetplayerObject, i) => {
			console.log('searching to remove in game a : ' + sessionId);
			if(sessionId == NetplayerObject.id){
				console.log('removing ' + NetplayerObject.id);
					NetplayerObject.NetPlayer.destroy();
					const index =  this.fNetPLayers.indexOf(NetplayerObject);
					if (index > -1) {
					  var removed = this.fNetPLayers.splice(index, 1);
					  console.log('splice result ' + JSON.stringify(removed,["id"]))
					}
			}
		});

	}


	Level3.prototype.crearPlaneta = function(data){
		//	console.log('creando ' + data.xpos + ' ' + data.ypos);
			//var cristal = new Cristal(this.game,data.xpos,data.ypos-100);
			switch(data.type){
				case 1:
						var planeta=this.game.add.sprite(data.xpos,data.ypos,'planet1');
				break;
				case 2:
						var planeta=this.game.add.sprite(data.xpos,data.ypos,'planet2');
				break;
				case 3:
						var planeta=this.game.add.sprite(data.xpos,data.ypos,'planet3');
				break;
			}
	
			planeta.anchor.x = 0.5;
			planeta.anchor.y = 0.5;
			planeta.scale.y = data.size;
			planeta.blendMode = PIXI.blendModes.MULTIPLY;
			this.game.physics.arcade.enable(planeta);
			planeta.body.velocity.x-=data.velo;
			planeta.scale.x = data.size;
			
			this.fPlanets.add(planeta);
		}


	Level3.prototype.crearObstaculoCroquet = function(data){
		//	console.log('creando ' + data.xpos + ' ' + data.ypos);
			//var cristal = new Cristal(this.game,data.xpos,data.ypos-100);

	var obstacle = new meteorito(this.game, data.xpos,data.ypos-40);
	var warningSign = new warning(this.game, this.game.width-50,data.ypos-40);
	obstacle.warningSign = warningSign;
	this.add.existing(warningSign);
	this.add.existing(obstacle);

		this.game.physics.arcade.enable(obstacle);
		obstacle.body.gravity.y=0;
		obstacle.body.velocity.x-=data.velocity*5;
		obstacle.body.moves = true;
		obstacle.body.immovable = false;
		this.fFlyingObstacles.add(obstacle);
		}


Level3.prototype.crearMonedas = function(data){ //creacion de combustible o monedas tipo 1

	var _cristalCoin = new energyCell(this.game, data.xpos,data.ypos-100);
	this.add.existing(_cristalCoin);

		this.game.physics.arcade.enable(_cristalCoin);
		_cristalCoin.body.gravity.y=0;
		_cristalCoin.body.velocity.x-=450;
		_cristalCoin.body.moves = true;
		_cristalCoin.body.immovable = false;
		this.fCoinGroup.add(_cristalCoin);
		}


Level3.prototype.crearMonedaSeno = function(packmonedas){ //creacion de monedas tipo seno

	packmonedas.forEach((moneda, i) => {
					
		var _cristalCoin = new cristal(this.game, moneda.xpos,moneda.ypos);
		this.add.existing(_cristalCoin);


		this.game.physics.arcade.enable(_cristalCoin);
		_cristalCoin.body.gravity.y=0;
		_cristalCoin.body.velocity.x-=450;
		_cristalCoin.body.moves = true;
		_cristalCoin.body.immovable = false;
		this.fCristalsGroup.add(_cristalCoin);

				});

	
		}


	Level3.prototype.croquetAction = function(session) {
		if(session !== this.mySession){
			this.fNetPLayers.forEach((NetplayerObject, i) => {
					console.log('jugador ' + session + "se impulsa");
					if(session == NetplayerObject.id){

							if(NetplayerObject.NetPlayer.body != null){


							NetplayerObject.NetPlayer.body.velocity.y = -this.velo; //replico la accion del jugador para smooth the action
							
							}else{console.log('no player for action')}
					}
				});
		}


	}

Level3.prototype.swipeDownAction = function(pointer) { //manejo de swipe control de pantalla
const elevateSoundSelect =  Math.ceil(Math.random()*3);

		if(this.fPlayer.canjump){
    		this.fPlayer.body.velocity.y=-this.velo;
    		
    		switch (elevateSoundSelect){
    			case 1:
    			elevate1.play('elevate1');
    			break;
    			case 2:
    			elevate2.play('elevate2');
    			break;
    			case 3:
    			elevate3.play('elevate3');
    			break;
    		}

    		if(this.fPlayer.fuel <= 0){

    			this.killPlayerByFuel();
    		}else{

    			this.fPlayer.fuel-=15;
    		if(this.fPlayer.fuel <= 0){
    			this.fPlayer.fuel=0;
    		}
    		}
    		this.game.croquetView.croquetPlayerAction(this.mySession);
			this.updatePos();
						}
			}

Level3.prototype.swipeUpAction = function (pointer) {



}

Level3.prototype.createFirstPlatforms = function () {

	var platformWidth = this.game.cache.getImage("platform1").width;
	for(var i=0; i<=20; i++){

		var platform=this.game.add.sprite(i*platformWidth,1000,'platform1');
		this.game.physics.arcade.enable(platform);
		platform.body.moves = false;
		platform.body.immovable = true;

		this.totalPlatfomrLength = i*platform.width;
		this.fPlatformGroup.add(platform);

	}

}
Level3.prototype.getCoin = function (player, coin) { //recoger monedas
	this.fPlayer.fuel+=25;
	
	if(this.fPlayer.fuel >=250){
		this.fPlayer.fuel = 250;
	
	}
	
	getFuel.play('getFuel');
	coin.destroy();
}

Level3.prototype.getCristal = function (player, cristal) { //recoger monedas
	this.fPlayer.cristals++;
	pickCristal.play('pickCristal');
	cristal.destroy();
}

Level3.prototype.getOnlineCristal = function (player, cristal) { //recoger monedas

	
	cristal.destroy();
}

Level3.prototype.getOnlineCoin = function (player, coin) { //recoger monedas
	
	
	coin.destroy();
}



Level3.prototype.killPlayerByFuel = function () {

	this.fPlayer.canjump =  false;
	this.fPlayer.rotation+=0.5;
	this.fPlayer.body.bounce.y = 0.5;
	this.fPlayer.body.bounce.x = 0.5;
	this.fPlayer.body.velocity.x -=200;
	//this.fPlayer.body.gravity.y=200;
	this.fPlayer.body.collideWorldBounds = false;

  	this.game.camera.shake(0.02, 250);
  	this.game.camera.flash(0xfdc736, 1000)
	this.game.croquetView.playerKilledByFuel(this.mySession);
	hurt.play('hurt');

}


Level3.prototype.killPlayer = function (player, obstacle) {

	player.canjump =  false;
	player.rotation-=0.5;
	player.body.bounce.y = 0.5;
	player.body.bounce.x = 0.5;
	player.body.velocity.x=-200;
	player.body.collideWorldBounds = false;
	obstacle.destroy();
  	this.game.camera.shake(0.02, 250);
  	this.game.camera.flash(0xff0000, 500)
	this.game.croquetView.playerKilled(this.mySession);
	hurt.play('hurt');


}

Level3.prototype.killOnlinePlayerByFuel = function(sessionId){ //un jugador que ha sido topado por algun obstaculo que no esta sincronizado

		this.fNetPLayers.forEach((NetplayerObject, i) => {
			if( sessionId != this.mySession){
				if(sessionId == NetplayerObject.id ){
					console.log('quiero matar a ' + sessionId);
					NetplayerObject.NetPlayer.canjump=false;
					NetplayerObject.NetPlayer.rotation+=0.5;
					NetplayerObject.NetPlayer.body.bounce.y = 0.5;
					NetplayerObject.NetPlayer.body.bounce.x = 0.5;
					NetplayerObject.NetPlayer.body.velocity.x=-200;
					NetplayerObject.NetPlayer.body.collideWorldBounds = false;
				
				}
			}
		});

	}

Level3.prototype.killOnlinePlayer = function(sessionId){ //un jugador que ha sido topado por algun obstaculo que no esta sincronizado

		this.fNetPLayers.forEach((NetplayerObject, i) => {
			if( sessionId != this.mySession){
				if(sessionId == NetplayerObject.id ){
					console.log('quiero matar a ' + sessionId);
					NetplayerObject.NetPlayer.canjump=false;
					NetplayerObject.NetPlayer.rotation-=0.5;
					NetplayerObject.NetPlayer.body.bounce.y = 0.5;
					NetplayerObject.NetPlayer.body.bounce.x = 0.5;
					NetplayerObject.NetPlayer.body.velocity.x=-200;
					NetplayerObject.NetPlayer.body.collideWorldBounds = false;
				
				}
			}
		});

	}



Level3.prototype.update = function () {

this.energyBar.width=this.fPlayer.fuel;

this.game.physics.arcade.overlap(this.fPlayer , this.fNetplayersGroup);
this.IslayerOnFloor = this.game.physics.arcade.collide(this.fPlayer , this.fPlatformGroup);
this.game.physics.arcade.collide(this.fPlayer , this.fFlyingObstacles, this.killPlayer, null, this);
//this.game.physics.arcade.collide(this.fNetplayersGroup , this.fFlyingObstacles, this.killOnlinePlayer, null, this);

//this.game.physics.arcade.collide(this.fCoinGroup , this.fPlatformGroup);

this.game.physics.arcade.overlap(this.fPlayer , this.fCoinGroup, this.getCoin, null, this);
this.game.physics.arcade.overlap(this.fPlayer , this.fCristalsGroup, this.getCristal, null, this);
this.game.physics.arcade.overlap(this.fNetplayersGroup , this.fCoinGroup, this.getOnlineCoin, null, this);
this.game.physics.arcade.overlap(this.fNetplayersGroup , this.fCristalsGroup, this.getOnlineCristal, null, this);

if(this.fPlayer.canjump){
	this.fPlayer.distance++;
	this.fDistance.text= this.fPlayer.distance/10;
}

if(this.fPlayer.canjump){
	this.fCristalsCount.text = this.fPlayer.cristals;
}


if(this.IslayerOnFloor){

	this.fPlayer.isWalking = true;
	this.fPlayer.fuel++
	if(this.fPlayer.fuel>=250){
			this.fPlayer.fuel = 250;
	}
}else{

	this.fPlayer.isWalking = false;
}

this.fPlatformGroup.forEach(function(platform) {

	if(platform.x<=-platform.width){

		platform.x=this.totalPlatfomrLength; //creo plataforma infinita

	}
	platform.x-=this.platformVelo;


	},this);

if(this.fPlayer.x<=-100){

		this.fNetPLayers = [];
		this.game.croquetView.playerRemoved(this.mySession);
		this.game.state.start("Intro",true,true);
		
}
if(this.fPlayer.y>=1280){


		this.fNetPLayers = [];
		this.game.croquetView.playerRemoved(this.mySession);
		this.game.state.start("Intro",true,true);


}
}

Level3.prototype.printMessage = function (mensaje) { //para mensajes que se necesiten escribir desde croquet

	console.log(mensaje);
}
Level3.prototype.render = function() {
/*
    this.game.debug.body(this.fPlayer);

		this.fNetPLayers.forEach((NetplayerObject, i) => {
	if(NetplayerObject.NetPlayer.body != null){
		 this.game.debug.body(NetplayerObject.NetPlayer);
				
				
			}
		});*/
}
// -- user code here --
