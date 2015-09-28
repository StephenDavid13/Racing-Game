var res = {
	Car_temp_png : "res/CarTemp.png",
	Car_temp2_png : "res/CarTemp2.png",
	Car_temp3_png : "res/CarTemp3.png",
	Car_temp4_png : "res/CarTemp4.png",
	Menu_BG_png : "res/menu_bg.png",
	Game_BG_png : "res/menu_bg-v1.png",
	Game_BG1_png : "res/menu_bg-v1.png",
	Start_nope_png : "res/start_n.png",
	Start_yeah_png : "res/start_s.png",
	Left_png : "res/left.png",
	Rigth_png : "res/right.png",
	CloseNormal_png : "res/CloseNormal.png"
};

var g_resources = [
	res.Car_temp_png,
	res.Menu_BG_png,
	res.Game_BG_png,
	res.Game_BG1_png,
	res.Start_nope_png,
	res.Start_yeah_png,
    res.Left_png,
    res.Rigth_png
];
for (var i in res) {
    g_resources.push(res[i]);
}