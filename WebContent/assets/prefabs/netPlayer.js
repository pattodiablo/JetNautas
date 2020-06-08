
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * netPlayer
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
function netPlayer(aGame, aX, aY, aKey, aFrame) {
	Phaser.Sprite.call(this, aGame, aX, aY, aKey || 'netPlayers', aFrame == undefined || aFrame == null? null : aFrame);
	this.anchor.set(0.5, 0.5);
	this.game.physics.arcade.enable(this);
	this.body.bounce.y = 0.2;
	this.body.gravity.y = 800.0;
	
	this.myCreate();
	
}

/** @type Phaser.Sprite */
var netPlayer_proto = Object.create(Phaser.Sprite.prototype);
netPlayer.prototype = netPlayer_proto;
netPlayer.prototype.constructor = netPlayer;

/* --- end generated code --- */
// -- user code here --
netPlayer.prototype.myCreate = function() {
	
	this.isPlaying =  false;
	this.isWalking =  false;
	this.canjump =  true;
	this.playerThrust=this.game.add.sprite(this.x,this.y,'playerThrust');
	this.playerThrust.visible=this.visible;
	this.game.state.getCurrentState﻿().fOnlinePlayersFire.add(this.playerThrust);
	
	this.NetPlayerName = this.game.add.text(this.x-30, this.y, 'noName', {"font":"bold 18px Arial","fill":"#ffffff","align":"right"});
	this.NetPlayerName.anchor.x = 0.5;
	this.NetPlayerName.anchor.y = 0.5;
	
}

netPlayer.prototype.update = function() {
	
	this.IsOnlineplayerOnFloor = this.game.physics.arcade.collide(this, this.game.state.getCurrentState﻿().fPlatformGroup);
	

	this.NetPlayerName.x = this.x;
	this.NetPlayerName.y = this.y-50;

	
if(this.IsOnlineplayerOnFloor){
	
	this.playerThrust.visible=false;
}else{
	if(this.canjump){
		this.playerThrust.visible=true;
	}else{
		this.playerThrust.visible=false;
	}
	this.playerThrust.visible=true;
}

	
		this.playerThrust.x = this.x-15;
		this.playerThrust.y =  this.y+25;
	}