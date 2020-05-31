
// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * bag
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
function bag(aGame, aX, aY, aKey, aFrame) {
	Phaser.Sprite.call(this, aGame, aX, aY, aKey || 'atlas4', aFrame == undefined || aFrame == null? 'BagDone0000' : aFrame);
	this.animations.add('done', ['BagDone0000', 'BagDone0001', 'BagDone0002', 'BagDone0003', 'BagDone0004', 'BagDone0005', 'BagDone0006', 'BagDone0007', 'BagDone0008', 'BagDone0009', 'BagDone0010', 'BagDone0011', 'BagDone0012', 'BagDone0013', 'BagDone0014', 'BagDone0015', 'BagDone0016', 'BagDone0017', 'BagDone0018', 'BagDone0019', 'BagDone0020', 'BagDone0021', 'BagDone0022', 'BagDone0023', 'BagDone0024', 'BagDone0025', 'BagDone0026', 'BagDone0027', 'BagDone0028', 'BagDone0029', 'BagDone0030', 'BagDone0031', 'BagDone0032', 'BagDone0033', 'BagDone0034', 'BagDone0035', 'BagDone0036', 'BagDone0037', 'BagDone0038', 'BagDone0039', 'BagDone0040', 'BagDone0041', 'BagDone0042', 'BagDone0043', 'BagDone0044', 'BagDone0045'], 60, false);
	this.animations.add('restore', ['bagReload0000', 'bagReload0001', 'bagReload0002', 'bagReload0003', 'bagReload0004', 'bagReload0005', 'BagDone0000', 'BagDone0000'], 60, false);
	this.game.physics.arcade.enable(this);
	
	this.myCreate();
	
}

/** @type Phaser.Sprite */
var bag_proto = Object.create(Phaser.Sprite.prototype);
bag.prototype = bag_proto;
bag.prototype.constructor = bag;

/* --- end generated code --- */
// -- user code here --
bag.prototype.myCreate = function () {
	this.currentClient = '';
};

