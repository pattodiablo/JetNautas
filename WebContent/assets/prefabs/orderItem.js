
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * orderItem
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
function orderItem(aGame, aX, aY, aKey, aFrame) {
	Phaser.Sprite.call(this, aGame, aX, aY, aKey || 'orderItem', aFrame == undefined || aFrame == null? null : aFrame);
	this.anchor.set(0.5, 0.5);
	
	this.myCreate();
	
}

/** @type Phaser.Sprite */
var orderItem_proto = Object.create(Phaser.Sprite.prototype);
orderItem.prototype = orderItem_proto;
orderItem.prototype.constructor = orderItem;

/* --- end generated code --- */
// -- user code here --
orderItem.prototype.myCreate = function() {

	this.saborCreado = 'null';
	this.game.physics.arcade.enable(this);
	this.body.moves = false;
	this.anchor.setTo(0.5,0.5);
	this.myClientIs='null';
	this.myOrderFlavor = 'null';
	this.wichCandy = 'null'
	
}

orderItem.prototype.createFlavor = function() {
	
	var cualSabor = Math.ceil(Math.random()*9);
	this.game.state.getCurrentState﻿().fOrdersFlavor.add(this);
	console.log('cual sabor ' + cualSabor )
	switch (cualSabor){
	
	case 1:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'strawberryChocolate', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 2:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'strawberryChilli', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 3:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'strawberryCherry', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 4:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'lemonChocolate', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 5:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'lemonChilli', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 6:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'lemonCherry', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 7:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'bannanaChocolate', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 8:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'bannanaChilli', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	case 9:
		this.wichCandy = this.game.add.sprite(this.x, this.y-3, 'bannanaCherry', null,this.game.state.getCurrentState﻿().fOrdersFlavor);
		break;
	
	
	
	}
	
	this.myOrderFlavor = this.wichCandy;
	this.saborCreado=this.wichCandy.key;

	this.wichCandy.scale.setTo(0.7);
	this.wichCandy.anchor.setTo(0.5);
	this.z=0;
	this.wichCandy.z=10;
	
}



