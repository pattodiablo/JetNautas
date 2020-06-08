function loadGame(options){

		const Q = Croquet.Constants;
		Q.CoinRate = 300;
		Q.PlanetRate = 60000;
		Q.ObstacleRate = 1000;

class MirrorModel extends Croquet.Model {

		init() {

			this.allPlayers = new Array();
			this.subscribe('gameNetwork',"darEmitiendoMensaje",this.emitirMensaje);
			this.subscribe('gameNetwork',"createNetworkPlayer", this.createCroquetPlayer);
			this.subscribe('gameNetwork',"confirmPlayer",this.storePlayer);
 			this.subscribe(this.sessionId, "view-join", this.addUser);
		 	this.subscribe(this.sessionId, "view-exit", this.deleteUser);
			this.subscribe('gameNetwork',"updatePlayerList",this.updatePlayerList);
		  	this.subscribe('gameNetwork',"updatePos", this.moveNetPlayer);
			this.subscribe('gameNetwork',"croquetPlayerAction", this.emmitAction);
			this.subscribe('gameNetwork',"playerKilled",  this.propagateKill);
			this.subscribe('gameNetwork',"playerKilledByFuel",  this.propagateKillByFuel);
			this.subscribe('gameNetwork',"playerRemoved",  this.propagateRemove);

			this.crearMonedas();
			this.crearMonedaSeno();
			this.crearObstaculo();
			this.crearPlanetas();
			console.log('mySessionID ' + this.sessionId);
		}


		emmitAction(sessionId){

			this.publish('gameNetwork',"croquetPlayerExecuteAction",sessionId);

		}

		crearMonedas(){
			if(this.allPlayers.length > 0){

				//console.log('voy a crear monedas');

						var ypos = Math.random()*1000;
						var xpos = 2000;
						var type = 'cristals';
						var data = {ypos:ypos, xpos:xpos, type:type};

						this.publish('gameNetwork',"crearMonedasCroquet",data);


			}
			this.future(Q.CoinRate).crearMonedas();
		}

			crearPlanetas(){
			if(this.allPlayers.length > 0){

			
				const planetType = Math.ceil(Math.random()*3);

						var ypos = Math.random()* (1000 - 500) + 500;
						var xpos = 2500;
						var type = planetType;
						var velo = Math.random() * (100 - 20) + 20;
						var size = Math.random() * (2 - 0.3) + 0.3;
						var data = {ypos:ypos, xpos:xpos, type:type, velo:velo, size};


						this.publish('gameNetwork',"crearPlanetasCroquet",data);


			}
			this.future(Q.PlanetRate).crearPlanetas();
		}




		crearMonedaSeno(){
			if(this.allPlayers.length > 0){

				//console.log('voy a crear monedas');
					var packmonedas = [];
					var siglong = 500;
					var Nc = Math.random()*40;
					var offset = 2000;
					var yoffset = Math.random()*650;
					var amp = Math.random()*200;
					var freq = 1/siglong
					for (var i = 0+offset; i <= siglong + offset ; i+=siglong/Nc) {
						var xpos = i;
						var ypos =  yoffset + amp*Math.sin(2*Math.PI*(freq)*xpos);
						
						var type = 'cristals';
						var data = {ypos:ypos, xpos:xpos, type:type};
						packmonedas.push(data)

					}
				
					this.publish('gameNetwork',"crearMonedaSenoCroquet",packmonedas);
						
			}
			this.future(3000).crearMonedaSeno();
		}

		crearObstaculo(){
			if(this.allPlayers.length > 0){

				//console.log('voy a crear monedas');

						var ypos = Math.random()*1000;
						var xpos = 2000;
						var type = 'cristals';
						var velocity = Math.random()*200;
						if(velocity<=100){
							velocity =  100;
						}
						var data = {ypos:ypos, xpos:xpos, type:type, velocity:velocity};

						this.publish('gameNetwork',"crearObstaculoCroquet",data);


			}
			this.future(Q.ObstacleRate).crearObstaculo();
		}


		addUser(id) {

			console.log(id + ' acaba de ingresar');

		}

		propagateKillByFuel(id) {


				this.publish('gameNetwork',"propagateKilledPlayerByFuel",id);
				console.log('user ' + id + ' has no fuel');

	     }

		propagateKill(id) {


				this.publish('gameNetwork',"propagateKilledPlayer",id);
				console.log('user ' + id + ' has been meteorized');

	     }

	     propagateRemove(id) {


				this.publish('gameNetwork',"propagateKilledRemove",id);
				console.log('user ' + id + ' propagated to be removed ');

	     }

		deleteUser(id) {

				const index =  this.allPlayers.indexOf(id);
				if (index > -1) {
				   this.allPlayers.splice(index, 1);
				}

				this.publish('gameNetwork',"removePlayer",id);
				console.log('user ' + id + ' has been removed from Model');

	     }

		storePlayer(sessionId){

				this.allPlayers.push(sessionId);
				console.log('sesion registrada: ' +  this.allPlayers );

			//	this.publish('gameNetwork', "populatePlayers", this.allPlayers);
				//console.log('hasta aqui ' + allPlayers.getLength());

			}

		updatePlayerList(sessionId){

	  			this.publish('gameNetwork', "populatePlayers", this.allPlayers);

		}

		createCroquetPlayer(){

				this.publish('gameNetwork',"createPLayer",  this.allPlayers);
		}


		moveNetPlayer(data){

				this.publish('gameNetwork',"populateMovement",  data);
		}


		emitirMensaje(mensaje){

			var numeroRandom = Math.ceil(this.random()*10);

			var fraseCompleta = mensaje + ' ' + 'numero ' + numeroRandom;

			this.publish('gameNetwork',"emitirMensaje", fraseCompleta );

		}
	}


	MirrorModel.register();


class ClientViews extends Croquet.View {

		constructor(model) {
			super(model);
			this.model =  model;

			this.subscribe('gameNetwork',"emitirMensaje",this.escribirMensaje);
			this.subscribe('gameNetwork',"createPLayer",this.createCroquetPlayer);
			this.subscribe('gameNetwork',"removePlayer",this.removeCroquetPlayer);
 			this.subscribe('gameNetwork', "populatePlayers", this.populatePlayers);
			this.subscribe('gameNetwork',"populateMovement",  this.moveNetPhaserPlayer);
			this.subscribe('gameNetwork',"crearMonedasCroquet",this.crearMonedas);
			this.subscribe('gameNetwork',"crearMonedaSenoCroquet",this.crearMonedaSeno);
			this.subscribe('gameNetwork',"crearObstaculoCroquet",this.crearObstaculoCroquet);
			this.subscribe('gameNetwork',"propagateKilledPlayer",this.killOnlinePlayer);
			this.subscribe('gameNetwork',"propagateKilledPlayerByFuel",this.killOnlinePlayerByFuel);
			this.subscribe('gameNetwork',"propagateKilledRemove",this.removeOnlinePlayer);
			this.subscribe('gameNetwork',"croquetPlayerExecuteAction", this.doAction);
			this.subscribe('gameNetwork',"crearPlanetasCroquet",this.crearPlaneta);

			this.game = null;
			this.crearJuego(this); //me paso croquet
			console.log('MyCroquetId ' + this.viewId);
		}


			crearPlaneta(data){

					if(typeof(this.gameScene) != 'undefined'){
					if(this.gameScene.key == 'Level3'){

						this.gameScene.crearPlaneta(data);

						}
					}
			}

			removeOnlinePlayer(sessionId){

	console.log('estoy en RemoveOnlinePlayer de croquetView');
				if(typeof(this.gameScene) != 'undefined'){
					if(this.gameScene.key == 'Level3'){

						this.gameScene.removePhaserNetworkPlayer(sessionId);

						}
					}
			}

			killOnlinePlayerByFuel(sessionId){
				console.log('estoy en killOnlinePlayer de croquetView');
				if(typeof(this.gameScene) != 'undefined'){
					if(this.gameScene.key == 'Level3'){

						this.gameScene.killOnlinePlayerByFuel(sessionId);

						}
					}
			}

			killOnlinePlayer(sessionId){
				console.log('estoy en killOnlinePlayer de croquetView');
				if(typeof(this.gameScene) != 'undefined'){
					if(this.gameScene.key == 'Level3'){

						this.gameScene.killOnlinePlayer(sessionId);

						}
					}
			}

			playerKilledByFuel(sessionId){
				this.publish('gameNetwork',"playerKilledByFuel",  sessionId);
			}


			playerKilled(sessionId){
				this.publish('gameNetwork',"playerKilled",  sessionId);
			}

			playerRemoved(sessionId){
				this.publish('gameNetwork',"playerRemoved",  sessionId);
			}

			crearObstaculoCroquet(data){

			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){

					this.gameScene.crearObstaculoCroquet(data);
				}
			}


			}

		doAction(sessionId){
			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
				this.gameScene.croquetAction(sessionId);
				}
			}
		}

		crearJuego(croquetView){ //recibo croquet

			var width = document.body.clientWidth;﻿﻿﻿
			var height = document.documentElement["scrollHeight"];
			var firstRunLandscape = true;

		var game = new Phaser.Game(width,height, Phaser.CANVAS);
		game.croquetView = croquetView; //envio croquet a phaser
		game.nickName = options.nickName;
		game.musicOption = options.musicOption;
		game.timesConnected = 0;


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


		};



		Boot.prototype.create = function () {

		this.loadSprite = game.add.sprite(0, 0, 'loadBar');
		this.loadSprite.x = game.world.centerX - this.loadSprite.width / 2;
		this.loadSprite.y = game.world.centerY - 16;
		var loadSprite = this.loadSprite;

		iniciarJuego();
		//	game.time.events.add(Phaser.Timer.SECOND * 2, iniciarJuego, this);

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

        }, this);



		this.load.pack('graphics', 'assets/pack.json');
		this.load.pack('Fonts', 'assets/pack.json');
		this.load.pack('animations', 'assets/pack.json');

		

				firstRunLandscape = game.scale.isGameLandscape;
				if(!game.device.desktop){
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
								//gameRatio = window.innerWidth/window.innerHeight;
								//game.width = Math.ceil(960*gameRatio);
								//game.height = 640;
								//game.renderer.resize(game.width,game.height);
								game.state.start("Level3");
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
			game.state.add("Intro", Intro);
			game.state.start("Intro",true,true);

		}


		setCurrentScene(game){

			this.gameScene = game.state.getCurrentState﻿();
			console.log('gameScene ' + this.gameScene.key);

		}

		confirmPlayerAdded(sessionId){
				console.log('registrando en croquet usuario ' + sessionId);
				this.publish('gameNetwork',"confirmPlayer", sessionId);

		}
		getSessionID(){
			return this.viewId;
		//	console.log(this.sessionId);
		}
		addCroquetNetworkPlayer(){
				this.publish('gameNetwork',"createNetworkPlayer");

		}

		populatePlayers(allPlayers){
			console.log('populando');
				if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
			this.gameScene.addPhaserNetworkOnlinePlayer(allPlayers);
			}
			}
		}

		removeCroquetPlayer(sessionId){
			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
			this.gameScene.removePhaserNetworkPlayer(sessionId);
			}
			}
		}

		updatePlayerList(){

			this.publish('gameNetwork',"updatePlayerList");

		}

		createCroquetPlayer(allPlayers){

			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
			var hasPlayer =	this.gameScene.addPhaserNetworkPlayer(allPlayers);
			}
			}

		}

		crearMonedas(data){
		//	console.log('nombre escena  ' + this.gameScene.key);
			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
					this.gameScene.crearMonedas(data);
				}
			}

		}

		crearMonedaSeno(packmonedas){
		//	console.log('nombre escena  ' + this.gameScene.key);
			if(typeof(this.gameScene) != 'undefined'){
				if(this.gameScene.key == 'Level3'){
					this.gameScene.crearMonedaSeno(packmonedas);
				}
			}

		}

		getPlayersPos(){
		if(typeof(this.gameScene) != 'undefined'){
			if(this.gameScene.key == 'Level3'){
				this.gameScene.updatePos();
			}
				}
		}

		croquetPlayerAction(sessionId){

			this.publish('gameNetwork',"croquetPlayerAction", sessionId);
		}
		moveNetPhaserPlayer(data){

				if(typeof(this.gameScene) != 'undefined'){
						if(this.gameScene.key == 'Level3'){
				this.gameScene.moveNetPhaserPlayer(data);
					}
				}

		}

		updatePos(data){
				this.publish('gameNetwork',"updatePos", data);
		}

		darEmitiendoMensaje(mensaje){

			this.publish('gameNetwork',"darEmitiendoMensaje",mensaje)
		}

		escribirMensaje(mensaje){
			if(typeof(this.gameScene) != 'undefined'){
			if(this.gameScene.key == 'Level3'){
			this.gameScene.printMessage(mensaje);
			}
			}
		}


	}


	Croquet.Session.join('JetONautasC',MirrorModel,ClientViews);


document.addEventListener('touchstart', function(event){
    event.preventDefault();
}, {passive: false});

	}
