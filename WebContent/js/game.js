function loadGame(options){

		const Q = Croquet.Constants;
		Q.CoinRate = 300;
		Q.PlanetRate = 60000;
		Q.ObstacleRate = 1000;

class MirrorModel extends Croquet.Model {

		init() {

			this.allPlayers = new Array();
			this.allPlayerObjects =  new Array();
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
			this.subscribe('gameNetwork',"getPlayersName",  this.sendNames);

			this.crearMonedas();
			this.crearMonedaSeno();
			this.crearObstaculo();
			this.crearPlanetas();
			console.log('mySessionID ' + this.sessionId);
		}

			sendNames(sessionId){

				this.publish('gameNetwork',"sendNames",  this.allPlayerObjects);

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
						var tipo = Math.random()*1;
						if(tipo > 0.1 ){
							var type =  true;
						}else{
							var type = false;
						}

						var ypos = Math.random()*1000;
						var xpos = 2000;
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


				this.allPlayerObjects.forEach((PlayerObject, j) => { 
					
					if(PlayerObject.sessionId == id){

						var removedObject = this.allPlayerObjects.indexOf(PlayerObject);

						if (removedObject > -1) {
						   this.allPlayerObjects.splice(removedObject, 1);
						}
					}

				});

				if (index > -1) {
				   this.allPlayers.splice(index, 1);
				}
	

				this.publish('gameNetwork',"removePlayer",id);
				console.log('user ' + id + ' has been removed from Model');

	     }

		storePlayer(sessionObject){

				this.allPlayers.push(sessionObject.sessionId);
				this.allPlayerObjects.push(sessionObject); //ide con relacion a nickname de cada jugador
				console.log('sesion registrada: ' +  sessionObject.nickName );

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


	MirrorModel.register("MirrorModel");


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
			this.subscribe('gameNetwork',"sendNames",  this.emitNickNames);

			this.game = null;
			this.crearJuego(this); //me paso croquet
			console.log('MyCroquetId ' + this.viewId);
		}
			
			emitNickNames(allPlayerObjects){
				if(typeof(this.gameScene) != 'undefined'){
					if(this.gameScene.key == 'Level3'){
						this.gameScene.sincronizarNombres(allPlayerObjects);

				}}
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
			if(width>=1920){
				width=1920;
			}
			if(height>=1080){
				height=1080;
			}
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

		};

		Boot.prototype.preload = function () {

		//this.load.pack('loader', 'assets/loaderSprites.json');

		};



		Boot.prototype.create = function () {

		game.state.start("Intro");
	
		};


			// Add the States your game has.
			game.state.add("Boot", Boot);
			game.state.add("Level3", Level3);
			game.state.add("Intro", Intro);
			game.state.add("ScoreScreen", ScoreScreen);
			game.state.start("Boot",true,true);

		}


		setCurrentScene(game){

			this.gameScene = game.state.getCurrentState();
			console.log('gameScene ' + this.gameScene.key);

		}

		confirmPlayerAdded(sessionId, nickName){
				console.log('registrando en croquet usuario ' + sessionId + 'con nickName: ' + nickName);
				var sessionObject={ sessionId:sessionId, nickName:nickName}
				this.publish('gameNetwork',"confirmPlayer", sessionObject);

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

		getPlayersName(){
			this.publish('gameNetwork',"getPlayersName");
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
console.log('estoy en crear croquet player');
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




const apiKey = "168sOIIM3fuIhJ8qgCiiqvpA9l0JImozIxAxl2AFc"; // paste from croquet.io/keys
const appId = "com.weveana.spacewalk";
const name = Croquet.App.autoSession();
const password = Croquet.App.autoPassword();

Croquet.Session.join({apiKey, appId, name, password, model: MirrorModel, view: ClientViews});


document.addEventListener('touchstart', function(event){
    event.preventDefault();
}, {passive: false});

	}
