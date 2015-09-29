var StatusLayer = cc.Layer.extend({
    labelMeter:null,
	score:0,
	updateRate:0.1,

    onEnter:function () {
		var winsize = cc.director.getWinSize();
		
		score=0;
		var labelName = "" + score + " M";

        labelMeter = new cc.LabelTTF(labelName, "Helvetica", 20);
        labelMeter.setPosition(cc.p(winsize.width - 50, winsize.height - 20));
		
		updateRate=0.1;
		
        this.addChild(labelMeter);
		this.schedule(this.updateNumber, updateRate);
    },
	updateNumber:function() {
		score++;
		
		if(labelMeter == null) return;
		
		labelMeter.setString("" + score + " M");
	}
});