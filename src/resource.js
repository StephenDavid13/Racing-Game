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
	Pause_nope_png : "res/pause_n.png",
	Pause_yeah_png : "res/pause_s.png",
	Restart_nope_png : "res/restart_n.png",
	Restart_yeah_png : "res/restart_s.png",
	Left_nope_png : "res/left_n.png",
	Left_yeah_png : "res/left_s.png",
	Right_nope_png : "res/right_n.png",
	Right_yeah_png : "res/right_s.png",
	Game_over_BG_png : "res/gameOver-bg.png"
};

var g_resources = [
	res.Car_temp_png,
	res.Menu_BG_png,
	res.Game_BG_png,
	res.Game_BG1_png,
	res.Start_nope_png,
	res.Start_yeah_png,
	res.Pause_nope_png,
	res.Pause_yeah_png,
	res.Restart_nope_png,
	res.Restart_yeah_png,
    res.Left_nope_png,
	res.Left_yeah_png,
    res.Right_png,
	res.Right_yeah_png,
	res.Game_over_BG_png
];
for (var i in res) {
    g_resources.push(res[i]);
}