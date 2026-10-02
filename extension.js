game.import("extension", function (lib, game, ui, get, ai, _status) {
	const EXT_NAME = "将灵X";
	const EXT_CONF = "extension_" + EXT_NAME + "_";
	const layoutPath = lib.assetURL + "extension/将灵X/resources/";
	const conf = function (key) {
		return lib.config[EXT_CONF + key];
	};

	//-------------------------- 将灵数据 --------------------------
	const jlname = {

		// s_character
		// 猪猪侠（S 品阶）：糖果 tangguo / 亢掌 kangzhang（+收尾子技能 kangzhang_qi）
		zhuzhuxia: {
			name: "猪猪侠",
			des: "",
			skill: {
				"【糖果】": "▶你使用牌指定自己为目标时，有90%的概率摸2~4张牌（每回合限2次）。",
				"【亢掌】":
					"▶你对距离2以内的其他角色造成伤害时，有85%的概率伤害+1，且该角色随机弃置1~3张手牌（每回合限2次）。",
			},
		},
		shenlvmeng: {
			name: "神吕蒙",
			des: "",
			skill: {
				"【涉猎】":
					"▶摸牌阶段，你有90%的概率额外随机获得弃牌堆中每种花色的牌各一张，这些牌本回合不计入手牌上限。",
				"【攻心】":
					"▶出牌阶段，你使用牌指定其他角色为目标后，有90%的概率观看其中一个目标的手牌，然后获得其中一张牌（每回合限三次）。",
			},
		},
		simayiyi: {
			name: "司马一一",
			des: "",
			skill: {
				"【懿佐】":
					"▶准备阶段，你有85%的概率对一名其他角色造成随机点数的伤害并获得其若干张牌，总数为6。",
				"【拯危】":
					"▶每回合限一次，当你获得牌时，你有90%的概率令至多两名角色各摸与你获得牌等量牌（最多为5）。",
			},
		},
		zhaoxiang: {
			name: "赵襄",
			des: "",
			skill: {
				"【芳魂】":
					"▶当你使用或打出的【杀】或【闪】进入弃牌堆时，你有90%的概率可以获得此牌，然后你可以弃置一名其他角色至多3张牌，并摸1~3张牌，再对其造成1点伤害。（每回合限触发3次）",
				"【扶汉】":
					"▶当你造成或受到伤害后，有85%的概率可以随机获得一个蜀国武将技能直到你的回合结束。若你已因此获得3个技能，则改为回复1点体力并摸两张牌（每回合限触发3次）",
			},
		},
		shenluxun: {
			name: "神陆逊",
			des: "",
			skill: {
				"【军略】":
					"▶当你造成或受到伤害后，你有90%的概率获得1~2个“军略”标记并摸1~2张牌（最多5个标记）。",
				"【绽火】":
					"▶出牌阶段结束时，你有90%的概率可以移去全部“军略”标记，横置并弃置一名角色装备区里的所有牌，然后弃置其与“军略”数量相等的手牌并对其造成等量的火焰伤害。",
			},
		},
		// s_character
		xiaoshan: {
			name: "小闪",
			des: "",
			skill: {
				"【闪魄】":
					"▶当有角色使用或打出【闪】时，你有90%的概率可以弃置该角色1~3张牌，然后获得这张【闪】（每回合限触发1次）。如果使用者是你，则改为摸1~3张牌。",
				"【昙花】":
					"▶出牌阶段开始时，你有90%的概率可以弃置至多4张【闪】并摸等量的牌，然后对一名角色造成X点伤害（X为弃牌堆中【闪】的数量且至多为8）。",
			},
		},
		zhouyi: {
			name: "周夷",
			des: "",
			skill: {
				"【逐寇】":
					"▶每回合限一次，当你于一名角色的出牌阶段造成伤害后，你有90%的概率摸X张牌并回复1点体力（X为本回合你已使用的牌数）。",
				"【氓情】":
					"▶准备阶段，你有85%的概率选择一项（每有一个受伤角色可多选一项）：1.对一名角色造成2点伤害；2.摸2~3张牌；3.本回合出牌阶段可以多使用3张【杀】；4.本回合手牌上限+4。",
			},
		},
		caochun: {
			name: "曹纯",
			des: "",
			skill: {
				"【缮甲】":
					"▶每名角色的出牌阶段开始时，你有85%的概率可以摸2~4张牌，然后若此时是你的回合内，你可以视为使用一张【杀】，此【杀】不能被响应且伤害+1~2。（每轮限3次）",
				"【骁锐】":
					"▶当你对其他角色造成伤害时，你有90%的概率随机获得其1~4张牌且此伤害+1~4（每回合限触发4次）。",
			},
		},
		zhangqiying: {
			name: "张琪瑛",
			des: "",
			skill: {
				"【法箓】":
					"▶结束阶段，你有90%的概率随机获得牌堆中四种花色的牌各一张。若你因此获得了点数相同的牌，你回复1点体力并对至多两名其他角色各造成1点伤害。",
				"【点化】":
					"▶准备阶段，你有90%的概率可以观看牌堆顶的四张牌，然后以任意顺序放回牌堆顶。",
				"【真仪】":
					"▶当你对其他角色造成伤害时，你有85%的概率令此伤害+1，然后随机获得其一张牌；当你受到其他角色造成的伤害时，你有85%的概率防止此伤害，然后你随机弃置伤害来源两张牌。（每个效果每回合各限触发2次）",
			},
		},
		shenguanyu: {
			name: "神关羽",
			des: "",
			skill: {
				"【武神】":
					"▶准备阶段，你有85%的概率视为对至多3名角色各使用一张【杀】。此【杀】每次对目标角色造成伤害后你摸一张牌。",
				"【武魂】":
					"▶你的回合外，与你距离1以内的角色受到伤害后，你有80%的概率获得1个“梦魇”标记。此回合结束时，若你有梦魇标记，你可令当前回合角色失去X点体力（X为“梦魇”标记数量且最多为5）。",
			},
		},
		guansuo: {
			name: "关索",
			des: "",
			skill: {
				"【撷芳】":
					"▶出牌阶段开始时，你有85%的概率获得以下效果：摸X张牌、此阶段计算与其他角色的距离-X、此阶段可以多使用X张【杀】，且【杀】的伤害+X（此阶段限触发2次），X为场上女性角色数+1。",
				"【征南】":
					"▶一名角色受到伤害后，若其体力值小于等于你，你有95%的概率摸1~3张牌，然后在“武圣”、“当先”、“制蛮”里选择并获得一个技能直到你的回合结束（每回合每名角色限触发一次），若未获得技能则你回复1点体力。",
			},
		},
		huaman: {
			name: "花鬘",
			des: "",
			skill: {
				"【蛮嗣】":
					"▶出牌阶段开始时，你有95%的概率可以选择至多三名其他角色，此阶段你对这些角色造成的伤害+1且你使用的【杀】、【决斗】、【火攻】可以额外选择其中一名角色为目标（每回合限触发2次）。",
				"【系力】":
					"▶其他角色于其回合内前两次造成伤害时，你有90%的概率可以和该角色各摸1~2张牌，然后此伤害+1。",
			},
		},
		wuliuqi: {
			name: "伍六七",
			des: "",
			skill: {
				"【飞剪】":
					"▶出牌阶段结束时，你有85%的概率可以弃置任意张装备牌（可以不弃），然后对任意名其他角色造成共计至多X+2点伤害值（X为你弃置的装备牌数），每名角色至多分配5点。",
				"【削发】":
					"▶你对一名其他角色造成伤害后，你有90%的概率可以令该角色随机弃置2~3张牌（每回合限触发2次）。",
			},
		},
		xiaosha: {
			name: "小杀",
			des: "小杀，娇生惯养但是想独立的富家女孩，因为喜欢玩游戏，所以参加了三国杀组织的《三国之星》选秀比赛，一路靠着颜值和风风火火的爽快性格过关斩将吸粉无数，获得了冠军，成为了官方签约的形象代言人。",
			skill: {
				"【瑰杀】":
					"▶出牌阶段开始时，你有90%的概率此阶段出杀次数增加2~4次，且使用前三张【杀】时摸等同于你此阶段使用【杀】次数的牌。",
				"【姝丽】":
					"▶结束阶段，你有95%的概率从弃牌堆获得Y张基本牌（Y为你本回合造成的伤害数且范围为3~8），然后你可以将其中的牌交给任意名角色每人一张。",
			},
		},
		shencaocao: {
			name: "神曹操",
			des: "",
			skill: {
				"【飞影】":
					"▶其他角色的准备阶段，你有95%的概率令其本回合计算与你的距离+2且你摸1~2张牌并回复1点体力（每轮限两次）。",
				"【归心】":
					"▶结束阶段，你有95%的概率可以随机获得任意名角色每人一张手牌，然后这些角色再随机弃置一张装备区里的牌，因此失去最后一张手牌或装备区的牌的角色失去1点体力。",
			},
		},
		caoying: {
			name: "曹婴",
			des: "曹婴作为曹操的孙女，文武双全，弓马娴熟，深得曹操兵道和攻心之术。诸葛亮北伐，以赵云为先锋作饵，实则图谋魏国凉州六郡。于凤鸣山一战中担任魏军大都督阻止诸葛亮北伐并因罗平安的告密而全歼关兴、张苞、赵云率领的蜀军部队。这是“常胜将军”赵云少有的败绩，曹婴因此成名。",
			skill: {
				"【凌人】":
					"▶你使用【杀】或伤害类锦囊牌指定目标后，你有85%的概率选择其中一个目标使此牌对其伤害+1~2然后你摸1~3张牌，并且你获得“奸雄”、“行殇”直到你下回合开始。（每回合限触发2次）",
				"【伏间】":
					"▶准备阶段或结束阶段，你有90%的概率可以观看一名其他角色的手牌，然后你可以获得其中至多两张牌，若颜色相同，对其造成1点伤害。",
			},
		},
		zhugeguo: {
			name: "诸葛果",
			des: "诸葛果为《历代神仙通鉴》中诸葛亮女儿的名字 传说是诸葛亮的女儿，容貌甚美，与人异焉 其出生时，野外仙气缥缈、白鹤环绕 生来天资聪慧，对道学由衷热爱 后最终修成仙道，羽化升天。",
			skill: {
				"【祈禳】":
					"▶当你使用一张装备牌或每回合使用第一张基本牌时，你有95%的概率从牌堆或弃牌堆摸两至四张锦囊牌（每回合限触发两次，回合外限触发一次）。",
				"【羽化】":
					"▶结束阶段，你有95%的概率观看牌堆顶X张牌（X为你本回合使用的锦囊牌数且至少为4），然后获得其中至多三张牌。若这三张牌花色均不同，你随机对与你阵营不同的一名其他角色造成1-2点伤害。",
			},
		},
		nianshou: {
			name: "年兽",
			des: "",
			skill: {
				"【反戈】":
					"▶当你受到伤害后，你有90%的概率摸两张牌，然后获得伤害来源一至两张牌，再对伤害来源造成1~2点伤害。",
				"【寻猎】":
					"▶一名角色的回合结束时，你有95%的概率选择一项：令其回复1点体力并摸两张牌；或对其造成1点伤害并随机弃置两张牌。（每轮限触发两次）",
			},
		},
		shenzhaoyun: {
			name: "神赵云",
			des: "赵云（？－229年）,字子龙，常山真定(今河北省定南)人。自幼刚正雄壮，喜好练武，遇事善于思考。少年时期喜武但不逞强，有勇但不斗勇。曾先后在袁绍、公孙瓒帐下为将，后改投刘备，与刘备一见如故，倍受重用，从此追随刘备，直至病逝。",
			skill: {
				"【绝境】":
					"▶准备阶段、结束阶段或当你进入或脱离濒死状态时，你有90%的概率摸二至四张牌并回复1点体力（每回合限三次）。",
				"【龙魂】":
					"▶你使用【杀】或【桃】时，有90%的概率此牌伤害或回复值+1~3，且你使用【闪】或【无懈可击】时，有90%概率获得当前回合角色至多两张牌。",
			},
		},
		lingju: {
			name: "灵雎",
			des: "灵雎，《铜雀台》中的角色，相传为吕布和貂蝉的女儿，被汉献帝掳走并训练为死士，被秘密送入宫中接近曹操，成为其“忘年红颜知己”。外表是柔弱的女子，实际上身怀致命的杀人绝技，等待时机给予曹操致命一击。",
			skill: {
				"【竭缘】":
					"▶当你造成伤害时，有85%概率伤害+1至2点；当你受到伤害时，有85%概率伤害-1至2点。（每回合每项限触发1次）",
				"【焚心】":
					"▶一名角色进入濒死状态时，你有90%概率摸3～5张牌并回复1～2点体力。（每回合限触发一次）",
			},
		},
		shenzhouyu: {
			name: "神周瑜",
			des: "周瑜(175年-210年)，字公瑾，庐江舒县人。东汉末年名将，洛阳令周异之子，堂祖父周景、堂叔周忠，都官至太尉。周瑜“性度恢廓”“实奇才也”，孙权称赞周瑜有“王佐之资”，范成大誉之为“世间豪杰英雄士，江左风流美丈夫”。",
			skill: {
				"【琴音】": "▶结束阶段，你有90%的概率可以选择两名角色分别失去或回复1点体力。",
				"【业炎】":
					"▶出牌阶段开始时，你有90%的概率可以选择至多2名角色，对这些角色各造成2点火焰伤害",
			},
		},
		// a_character
		// 参考第 22 位：超人强（未实现，占位保留；实现后在原位放开注释）
		guoxiaoye: {
			name: "郭小野",
			des: "",
			skill: {
				"【冷锋】":
					"▶每回合限三次，当你造成伤害后，你有80%的概率回复1点体力并摸一张牌。",
				"【嘉翼】":
					"▶准备阶段，你有50%的概率摸两张牌且本回合使用【杀】次数+1。然后重复执行上述效果X次（X为连续没有触发的回合数+1）。",
			},
		},
		zhangfei: {
			name: "张飞",
			des: "",
			skill: {
				"【咆哮】":
					"▶出牌阶段开始时，你有85%的概率此阶段出【杀】次数+1~5且使用【杀】无距离限制。",
				"【替身】": "▶当你受到伤害后，你有80%的概率回复1点体力并摸1~3张牌。（每轮限三次）",
			},
		},
		jidabao: {
			name: "鸡大保",
			des: "",
			skill: {
				"【气霸】":
					"▶当你造成或受到伤害后，你有80%的概率可以令至多两名角色各摸一张牌（每回合限3次）。",
				"【坚韧】":
					"▶当你进入濒死状态时，你有90%的概率回复体力至4点并摸三张牌。（每局游戏限一次）。",
			},
		},
		zhangxingcai: {
			name: "张星彩",
			des: "",
			skill: {
				"【甚贤】":
					"▶每名角色的回合限2次，当其他角色因弃置而失去基本牌后，你有85%的概率可以摸1~2张牌。",
				"【枪舞】":
					"▶出牌阶段开始时，你有95%的概率本回合出【杀】次数+2~3且使用【杀】无距离限制。",
			},
		},
		sunce: {
			name: "孙策",
			des: "",
			skill: {
				"【制霸】":
					"▶结束阶段，你有90%的概率可以和一名其他角色拼点。若你赢，你随机获得其一张手牌且视为你对其使用一张【决斗】；若你没赢，你获得双方拼点的牌并摸一张牌。",
				"【激昂】":
					"▶当你使用或被使用伤害类锦囊牌或红色【杀】后（指定或成为目标后），你有85%的概率摸1~2张牌（每回合限两次）。",
			},
		},
		sunshangxiang: {
			name: "孙尚香",
			skill: {
				"【结姻】":
					"▶出牌阶段开始时，你有80%的概率令你和一名其他角色回复1点体力并摸1~2张牌。",
				"【枭姬】": "▶当你失去一张装备区里的牌时，你有85%的概率摸1~2张牌。（每轮限四次）",
			},
		},
		lvbu: {
			name: "吕布",
			des: "",
			skill: {
				"【无双】":
					"▶你使用的【杀】有85%的概率不能被抵消并无视防具，且在结算后将此【杀】收回并获得弃牌堆中一张【决斗】。（每回合限触发两次）",
				"【利驭】":
					"▶当你使用牌造成伤害后，你有85%的概率获得目标角色区域里一张牌并对其造成1点伤害。（每回合限触发3次）",
			},
		},
		zhoufei: {
			name: "周妃",
			des: "",
			skill: {
				"【良姻】":
					"▶当有牌移出游戏或从游戏外加入任意角色的手牌时，你有85%的概率可令一名角色摸一至三张牌（每回合限触发两次）。",
				"【箜声】":
					"▶准备阶段，你有85%的概率随机获得弃牌堆里的四张牌名不同的牌。结束阶段若这些牌还在手牌中则弃置。",
			},
		},
		menghuo: {
			name: "孟获",
			des: "孟获（生卒年不详），三国时期南中地区的首领，公元225年起兵反叛蜀汉，被诸葛亮率领大军擒拿后被赦免，遂降服，此后不再叛乱，后孟获随诸葛亮回到成都，担任御史中丞。",
			skill: {
				"【再起】":
					"▶摸牌阶段，你有95%的概率亮出牌堆顶的牌，如果不是黑桃，你回复1点体力并获得此牌。",
				"【祸首】": "▶伤害类锦囊牌有80%的概率对你无效且你摸两张牌。（每回合限触发两次）",
			},
		},
		xiaoqiao: {
			name: "小乔",
			des: "",
			skill: {
				"【天香】":
					"▶当你受到伤害时，你有90%的概率可以弃置一张手牌，防止此次伤害并选择一名其他角色，令其失去1点体力，然后其获得你弃置的牌（每回合限触发两次）",
				"【红颜】": "▶当你弃置手牌时，你有95%的概率摸2张牌（每回合限触发三次）",
			},
		},
		xizhicai: {
			name: "戏志才",
			des: "戏志才（？—约196年），志才或为字，名不详，颍川郡（今河南省禹州市）人。东汉末年曹操帐下谋士。由荀彧推荐出山辅佐曹操，为人多谋略，受曹操器重甚。",
			skill: {
				"【筹策】":
					"▶当你受到伤害后，你有90%的概率令一名角色摸两张牌，然后弃置一名角色至多两张牌。",
				"【先辅】":
					"▶结束阶段，你有85%的概率可以选择一名角色。直到你的下回合开始，该角色造成或受到伤害后，你回复1点体力并摸两张牌。（每回合限触发一次）",
			},
		},
		zhurong: {
			name: "祝融",
			des: "祝融夫人，《三国演义》中人物，不见于正史记载。小说中为南蛮王孟获之妻，带来洞主之姐，相传为火神祝融氏的后裔。有勇有谋，武艺高强，善使飞刀，百发百中，是《三国演义》中唯一正式上过战场的女子。在诸葛亮七擒七纵孟获之后，随孟获归顺蜀汉。",
			skill: {
				"【烈刃】":
					"▶你的【杀】或【决斗】指定目标后，你有95%的概率获得该角色一张牌并摸一张牌（每回合限三次）。",
				"【巨象】":
					"▶其他角色使用的伤害类锦囊牌有80%的概率在结算完毕进入弃牌堆时你获得之并摸1~2张牌。（每回合限触发三次）",
			},
		},
		zhugeliang: {
			name: "诸葛亮",
			skill: {
				"【火计】":
					"▶出牌阶段开始时，你有90%的概率可摸一张牌并可以视为使用一张【火攻】，且你可以获得此【火攻】你弃置的牌。",
				"【看破】":
					"▶其他角色使用的锦囊牌对你生效前，你有80%的概率可令此锦囊对你无效，然后摸一张牌（每回合限触发两次）。",
			},
		},
		daqiao: {
			name: "大乔",
			des: "",
			skill: {
				"【国色】":
					"▶出牌阶段开始时，你有85%的概率可摸一张方块牌并可以此牌当【乐不思蜀】使用，且可以弃置场上一张【乐不思蜀】。",
				"【流离】":
					"▶成为【杀】的目标后，你有85%的概率可弃置一张牌将此【杀】转移给你攻击范围内的一名其他角色并摸一张牌（不能是【杀】的使用者，每回合限触发两次）。",
			},
		},
		jiangwei: {
			name: "姜维",
			des: "",
			skill: {
				"【挑衅】": "▶出牌阶段开始时或结束时，你有70%的概率弃置至多两名其他角色各一张牌。",
				"【观星】":
					"▶准备阶段，你有75%的概率观看牌堆顶五张牌，然后以任意顺序放回牌堆顶或牌堆底。",
			},
		},
		guojia: {
			name: "郭嘉",
			des: "郭嘉（170年－207年），字奉孝，颍川阳翟（今河南禹州）人。曹操帐下著名谋士。原为袁绍部下，后转投曹操，为曹操统一中国北方立下了功勋，官至军师祭酒，封洧阳亭侯。在曹操征伐乌丸时病逝，年仅三十八岁。谥号贞侯。史书称“才策谋略，世之奇士”。",
			skill: {
				"【遗计】":
					"▶当你受到1点伤害后，你有69%的概率可以摸3张牌，然后你可以将至多3张手牌交给一至三名其他角色。",
				"【天妒】": "▶当你的判定牌生效后，你有74%的概率获得此牌并从牌堆额外摸2张牌。",
			},
		},
		luxun: {
			name: "陆逊",
			des: "陆逊(183-245)，字伯言，本名陆仪，吴郡吴县华亭(今上海松江)人，孙策之婿，著名的军事家和政治家。“刘备天下称雄，一世所惮，陆逊春秋方壮，威名未著，摧而克之，罔不如志。予既奇逊之谋略，又叹权之识才，所以济大事也。”————《三国志·吴书·陆逊传》",
			skill: {
				"【连营】":
					"▶当你失去最后手牌后，你有74%的概率可以令至多X名角色各摸1张牌和1-2张【杀】（X为你失去的手牌数）。",
				"【谦逊】":
					"▶当你成为其他角色使用的锦囊牌和【杀】的目标后，你有64%的概率可以摸2张牌。",
			},
		},
		guanyu: {
			name: "关羽",
			des: "",
			skill: {
				"【武圣】": "▶出牌阶段，你的【杀】造成伤害时，有74%的概率伤害+1或2点。",
				"【义绝】":
					"▶出牌阶段开始时，你有59%的概率下一张【杀】无距离限制且不计次数，并无视目标角色的防具以及其非锁定技失效直到回合结束。",
			},
		},
		diaochan: {
			name: "貂蝉",
			des: "",
			skill: {
				"【闭月】": "▶结束阶段，你有84%的概率摸2~3张牌。",
				"【离间】": "▶出牌阶段开始时，你有49%的概率可以选择一名男性角色失去2点体力。",
			},
		},
		// b_character
		xunyou: {
			name: "荀攸",
			skill: {
				"【智愚】": "▶当你受到1点伤害后，你有73%的概率可以摸1张牌，伤害来源弃置1张手牌",
			},
		},
		guanyinping: {
			name: "关银屏",
			skill: {
				"【雪恨】":
					"▶当你使用红色牌造成伤害时，你有83%的概率使得伤害+1并摸一张牌（每回合限触发一次）。",
			},
		},
		caorui: {
			name: "曹叡",
			skill: {
				"【恢拓】": "▶当你受到伤害后，你有28%的概率摸1张牌并回复1点体力。",
			},
		},
		guohuanghou: {
			name: "郭皇后",
			skill: {
				"【矫诏】": "▶出牌阶段开始时，你有80%的概率随机获得牌堆中1张锦囊牌。",
			},
		},
		sundeng: {
			name: "孙登",
			skill: {
				"【匡弼】": "▶回合开始时，你有68%的概率获得弃牌堆中的1-3张牌。",
			},
		},
		huaxiong: {
			name: "华雄",
			skill: {
				"【耀武】": "▶当你受到【杀】或【决斗】造成的伤害时，你有78%的概率从摸2张牌。",
			},
		},
		yuanshao: {
			name: "袁绍",
			skill: {
				"【血裔】":
					"▶出牌阶段开始时，你有68%的概率本回合手牌上限+3，并可以额外使用一张【杀】。",
			},
		},
		// c_character
		zhangyi: {
			name: "张嶷",
			skill: {
				"【矢志】": "▶出牌阶段开始时，你有52%的概率本阶段出【杀】次数+2。",
			},
		},
		// 参考第 49 位：马忠（未实现，占位保留；实现后在原位放开注释）
		// "mazhong": {
		//   "name": "马忠",
		//   "skill": {
		//     "【抚蛮】": "▶出牌阶段开始时，你有51%的概率获得牌堆中的一张【杀】，并在此阶段可额外使用一张【杀】。"
		//   }
		// },
		guohuai: {
			name: "郭淮",
			skill: {
				"【精策】": "▶结束阶段，若你的手牌数小于体力值，你有49%的概率摸两张牌。",
			},
		},
		sunluban: {
			name: "孙鲁班",
			skill: {
				"【骄矜】": "▶当你受到其他角色造成的伤害时，你有26%的概率伤害-1。",
			},
		},
		// 参考第 52 位：徐盛（未实现，占位保留；实现后在原位放开注释）
		// "xusheng": {
		//   "name": "徐盛",
		//   "skill": {
		//     "【破军】": "▶你使用【杀】指定目标后，有42%的概率弃置其两张牌。"
		//   }
		// },
		// 参考第 53 位：蹋顿（未实现，占位保留；实现后在原位放开注释）
		// "tadun": {
		//   "name": "蹋顿",
		//   "skill": {
		//     "【乱战】": "▶当你使用【杀】或黑色锦囊牌指定目标后，你有26%的概率可以多选择至多两个目标。"
		//   }
		// },
		// 参考第 54 位：文聘（未实现，占位保留；实现后在原位放开注释）
		// "wenpin": {
		//   "name": "文聘",
		//   "skill": {
		//     "【镇卫】": "▶每回合结束时，若你本回合受到过伤害，你有26%的概率获得牌堆中一张红色牌。"
		//   }
		// },
		// 参考第 55 位：祖茂（未实现，占位保留；实现后在原位放开注释）
		// "zumao": {
		//   "name": "祖茂",
		//   "skill": {
		//     "【绝地】": "▶准备阶段，你有26%的概率回复1点体力。"
		//   }
		// },
		// 参考第 56 位：张梁（未实现，占位保留；实现后在原位放开注释）
		// "zhangliang": {
		//   "name": "张梁",
		//   "skill": {
		//     "【集军】": "▶当你使用一张装备牌时，你有46%的概率摸一张牌（每回合限触发一次）。"
		//   }
		// },
		// 参考第 57 位：公孙瓒（未实现，占位保留；实现后在原位放开注释）
		// "gongsunzan": {
		//   "name": "公孙瓒",
		//   "skill": {
		//     "【水溅跃】": "▶公孙瓒使用了水溅跃，然而什么都没有发生。"
		//   }
		// },
	};
	const qualityMap = { s: "S", a: "A", b: "B", c: "C", d: "D", e: "E" };
	const jlQuality = {

		zhuzhuxia: "s",
		shenlvmeng: "s",
		simayiyi: "s",
		zhaoxiang: "s",
		shenluxun: "s",
		xiaoshan: "s",
		zhouyi: "s",
		caochun: "s",
		zhangqiying: "s",
		shenguanyu: "s",
		guansuo: "s",
		huaman: "s",
		wuliuqi: "s",
		xiaosha: "s",
		shencaocao: "s",
		caoying: "s",
		zhugeguo: "s",
		nianshou: "s",
		shenzhaoyun: "s",
		lingju: "s",
		shenzhouyu: "s",
		guoxiaoye: "a",
		zhangfei: "a",
		jidabao: "a",
		zhangxingcai: "a",
		sunce: "a",
		sunshangxiang: "a",
		lvbu: "a",
		zhoufei: "a",
		menghuo: "a",
		xiaoqiao: "a",
		xizhicai: "a",
		zhurong: "a",
		zhugeliang: "a",
		daqiao: "a",
		jiangwei: "a",
		guojia: "a",
		luxun: "a",
		guanyu: "a",
		diaochan: "a",
		xunyou: "b",
		guanyinping: "b",
		caorui: "b",
		guohuanghou: "b",
		sundeng: "b",
		huaxiong: "b",
		yuanshao: "b",
		zhangyi: "c",
		guohuai: "c",
		sunluban: "c",
	};

	// 品级字母配色（S/A/B/C/D/E 依次对应；D、E 目前没有将灵，先按给定色值占位）
	// 2026-09-27 实机检查后调整：原 B/C/D 偏深、可读性差，改用下列提亮后的色值
	const qualityColor = {
		s: "#FB3119",
		a: "#EFC151",
		b: "#A262CE",
		c: "#2188A3",
		d: "#228D6A",
		e: "#AFA68B",
	};
	// 某将灵的品级字母（未登记品级时沿用原逻辑，按 A 处理）
	const jlQualityLetter = function (key) {
		return qualityMap[jlQuality[key]] || qualityMap.a;
	};
	// 带颜色的品级字母（HTML 上下文用；引擎配置菜单的 item 文本按 innerHTML 渲染，可直接内嵌）
	const jlQualityHTML = function (key) {
		return '<span style="color:' + (qualityColor[jlQuality[key]] || qualityColor.a) + '">' + jlQualityLetter(key) + "</span>";
	};
	// 将灵头像（选择列表用）：character_head 素材为 100×100 方图，
	// 按字号缩放 1.1em（≈17.6px）贴合 20px 高的配置行，既不超出也不显小；宽高一致以免变形
	const jlHeadHTML = function (key) {
		return (
			'<img src="' + layoutPath + 'image/character_head/jl_imgh_' + key + '.png" ' +
			'style="height:1.1em;width:1.1em;vertical-align:-0.16em;margin-right:0.3em;border-radius:0.12em">'
		);
	};

	//-------------------------- 语音 --------------------------
	const jlVoiceList = new Set([

		"jl_caochun_shanjia1",
		"jl_caochun_xiaorui1",
		"jl_caorui_huituo1",
		"jl_caoying_fujian1",
		"jl_caoying_lingren1",
		"jl_chaorenqiang_jianti1",
		"jl_chaorenqiang_mengtu1",
		"jl_daqiao_guose1",
		"jl_daqiao_liuli1",
		"jl_diaochan_biyue1",
		"jl_diaochan_lijian1",
		"jl_guansuo_xiefang1",
		"jl_guansuo_zhengnan1",
		"jl_guanyinping_xuehen1",
		"jl_guanyu_wusheng1",
		"jl_guanyu_yijue1",
		"jl_guohuai_jingce1",
		"jl_guohuanghou_jiaozhao1",
		"jl_guojia_tiandu1",
		"jl_guojia_yiji1",
		"jl_guoxiaoye_jiayi1",
		"jl_guoxiaoye_lengfeng1",
		"jl_huaman_mansi1",
		"jl_huaman_xili1",
		"jl_huaxiong_yaowu1",
		"jl_jiangwei_guanxing1",
		"jl_jiangwei_tiaoxin1",
		"jl_jidabao_jianren1",
		"jl_jidabao_qiba1",
		"jl_lingju_fenxin1",
		"jl_lingju_jieyuan1",
		"jl_luxun_lianying1",
		"jl_luxun_qianxun1",
		"jl_lvbu_liyu1",
		"jl_lvbu_wushuang1",
		"jl_mazhong_fuman1",
		"jl_menghuo_huoshou1",
		"jl_menghuo_zaiqi1",
		"jl_nianshou_fange1",
		"jl_nianshou_xunlie1",
		"jl_shencaocao_feiying1",
		"jl_shencaocao_guixin1",
		"jl_shenguanyu_wuhun1",
		"jl_shenguanyu_wushen1",
		"jl_shenluxun_junlue1",
		"jl_shenluxun_zhanhuo1",
		"jl_shenlvmeng_gongxin1",
		"jl_shenlvmeng_shelie1",
		"jl_shenzhaoyun_juejing1",
		"jl_shenzhaoyun_longhun1",
		"jl_shenzhouyu_qinyin1",
		"jl_shenzhouyu_yeyan1",
		"jl_simayiyi_yizuo1",
		"jl_simayiyi_zhengwei1",
		"jl_sunce_jiang1",
		"jl_sunce_zhiba1",
		"jl_sundeng_kuangbi1",
		"jl_sunluban_jiaoyin1",
		"jl_sunshangxiang_jieyin1",
		"jl_sunshangxiang_xiaoji1",
		"jl_tadun_luanzhan1",
		"jl_wuliuqi_feijian1",
		"jl_wuliuqi_xuefa1",
		"jl_xiaoqiao_hongyan1",
		"jl_xiaoqiao_tianxiang1",
		"jl_xiaosha_guisha1",
		"jl_xiaosha_shuli1",
		"jl_xiaoshan_shanpo1",
		"jl_xiaoshan_tanhua1",
		"jl_xizhicai_chouce1",
		"jl_xizhicai_xianfu1",
		"jl_xunyou_zhiyu1",
		"jl_xusheng_pojun1",
		"jl_yuanshao_xueyi1",
		"jl_zhangfei_paoxiao1",
		"jl_zhangfei_tishen1",
		"jl_zhangliang_jijun1",
		"jl_zhangqiying_dianhua1",
		"jl_zhangqiying_falu1",
		"jl_zhangqiying_zhenyi1",
		"jl_zhangxingcai_qiangwu1",
		"jl_zhangxingcai_shenxian1",
		"jl_zhangyi_shizhi1",
		"jl_zhaoxiang_fanghun1",
		"jl_zhaoxiang_fuhan1",
		"jl_zhoufei_kongsheng1",
		"jl_zhoufei_liangyin1",
		"jl_zhouyi_mangqing1",
		"jl_zhouyi_zhukou1",
		"jl_zhugeguo_qirang1",
		"jl_zhugeguo_yuhua1",
		"jl_zhugeliang_huoji1",
		"jl_zhugeliang_kanpo1",
		"jl_zhurong_juxiang1",
		"jl_zhurong_lieren1",
		"jl_zhuzhuxia_kangzhang1",
		"jl_zhuzhuxia_tangguo1",
		"jl_zumao_juedi1",
	]);
	const jlPlayVoice = function (file) {
		if (!lib.config.background_speak || !file) return;
		const name = file.replace(/^voice\//, "").replace(/\.mp3$/, "");
		if (!jlVoiceList.has(name)) return;
		// 必须带 .mp3 扩展名：引擎 playAudio 用 lib.path.extname 判断是否为文件路径
		// （noname/game/index.js:2543-2553），无扩展名的 ext: 路径会被 URL.canParse 当成 URL 直接交给浏览器，
		// 触发 net::ERR_UNKNOWN_URL_SCHEME、语音静音
		game.playAudio("ext:将灵X/resources/audio/voice/" + name + ".mp3");
	};
	// 等阶特权：名称/图标与 resources/image/icon 下素材一一对应；XF_COST 为各等级累计消耗
	// （0→1=15；1→2/2→3/3→4=各10；4→5=20），升级消耗与面板显示同源，避免两处不一致
	const XF_ITEMS = [
		{ key: "回复", name: "重获生机", icon: "icon_chonghuoshengji.jpg" },
		{ key: "减伤", name: "免减一伤", icon: "icon_mianjianyishang.jpg" },
		{ key: "加伤", name: "武力盖世", icon: "icon_wuligaishi.jpg" },
		{ key: "摸牌", name: "粮多牌足", icon: "icon_paiduoliangzu.jpg" },
	];
	const XF_COST = [0, 15, 25, 35, 45, 65];
	// 面板底部的规则提示（作为表格整行显示，随表格居中）
	const XF_HINT = "减伤需先激活回复，摸牌需先激活加伤。";
	// 预设加点：按钮名即四项等级（回复/减伤/加伤/摸牌），三个预设的总消耗都是 110 点（五阶满点）
	const XF_PRESETS = [
		{ name: "4500", levels: [4, 5, 0, 0] },
		{ name: "4050", levels: [4, 0, 5, 0] },
		{ name: "0054", levels: [0, 0, 5, 4] },
	];
	// 预设总消耗（按同一张 XF_COST 累计表算，与逐级加点一致）
	const xfPresetCost = function (preset) {
		return preset.levels.reduce(function (sum, lv) {
			return sum + XF_COST[lv];
		}, 0);
	};
	// 图标边长与单行文字高度：用于控制面板总高度，
	// 保证在 20:9 手机（视口较矮，底部按钮栏位于视口 2/3 高度处）上也不需要滚动
	const XF_ICON_SIZE = 56;
	// 响应式排布：常规屏用两行两列（每格 120px），矮屏用一行四项（每格 88px）
	// 判定依据是「纵向可用高度」而非宽高比：按钮栏 #control 顶边固定在视口 2/3 高度处，
	// 对话框顶边 40px、按钮栏自身约 56px，故面板可用高度 ≈ 视口高 × 2/3 − 104；
	// 两行两列约需 260px → 视口高需 ≥ 550px；一行四项表格约 362px → 视口宽不足 380px 时退回两行两列
	const XF_2X2_MIN_H = 550;
	const XF_1ROW_MIN_W = 380;
	const XF_CELL_W = { 2: 120, 4: 88 };
	// 返回每行显示的特权数（2 或 4）。宽高可显式传入，便于打桩覆盖边界
	const pickPerRow = function (vw, vh) {
		if (vw == undefined) {
			vw = (ui.window && ui.window.offsetWidth) || (typeof window != "undefined" && window.innerWidth) || 900;
		}
		if (vh == undefined) {
			vh = (ui.window && ui.window.offsetHeight) || (typeof window != "undefined" && window.innerHeight) || 600;
		}
		if (vw < XF_1ROW_MIN_W) return 2; // 宽度护栏：一行四项放不下
		return vh >= XF_2X2_MIN_H ? 2 : 4; // 常规屏两行两列，矮屏一行四项
	};
	// 加点面板 HTML（纯函数，便于打桩核对）：按 pickPerRow 决定一行几项，保证图标横竖对齐；
	// 每格自上而下为 图标 → 特权名称 → “x级(y点)”，y 为升级到下一级所需点数
	// 注意：引擎全局样式为 div { display:inline-block; position:absolute }（layout/default/layout.css:31-35），
	// 面板内一律不使用 div —— 用文本 + <br> + <span>，否则文字会脱离文档流、与图标重叠错位
	const buildXfPanelHTML = function (status, lvPoint, jlTotal) {
		var perRow = pickPerRow();
		var str =
			"请选择你的等阶特权<br>" +
			'<table style="margin:0 auto;border-collapse:separate;border-spacing:2px;text-align:center">';
		for (var i = 0; i < XF_ITEMS.length; i++) {
			if (i % perRow == 0) str += "<tr>";
			var item = XF_ITEMS[i];
			var level = (status && status[item.key]) || 0;
			var next = level >= 5 ? "已满" : XF_COST[level + 1] - XF_COST[level] + "点";
			str +=
				'<td style="width:' + XF_CELL_W[perRow] + 'px;vertical-align:top;text-align:center">' +
				'<img src="' +
				layoutPath +
				"image/icon/" +
				item.icon +
				'" data-xf="' +
				item.key +
				// 移动端长按图片会触发系统选图/呼出菜单，这里关掉 callout 与选中
				'" style="-webkit-touch-callout:none;-webkit-user-select:none;user-select:none" width="' +
				XF_ICON_SIZE +
				'" height="' +
				XF_ICON_SIZE +
				'"><br>' +
				'<span style="color:#FFD700;font-size:16px">' + item.name + "</span><br>" +
				'<span style="font-size:16px">' + level + "级(" + next + ")</span></td>";
			if (i % perRow == perRow - 1 || i == XF_ITEMS.length - 1) str += "</tr>";
		}
		// 「剩余点数」与规则提示放在**第二张整宽表格**里：文字因此能单行放下并自然居中，
		// 同时不会撑开上面图标表格的列宽（两行两列时图标仍紧凑居中）。
		// 若把它们作为图标表格的 colspan 整行，两行两列时整行只有 2 列宽（246px），提示会被挤成两行
		str += "</table>";
		str +=
			'<table style="width:100%;border-spacing:0;text-align:center"><tr><td style="padding-top:8px;font-size:16px">剩余点数：' +
			lvPoint +
			" / " +
			jlTotal +
			"</td></tr>";
		str += '<tr><td style="padding-top:8px;font-size:16px">' + XF_HINT + "</td></tr></table>";
		return str;
	};
	// 各等级（0~5）对应的触发概率（%）。这是**唯一来源**：技能的 filter 用 event.list（由本表 /100 得到），
	// 详情卡也用它把 {x} 替换成当前等级的概率，避免两处数字漂移
	const XF_LEVEL_PCT = [0, 10, 20, 30, 40, 60];
	// 四项特权的详情（长按/右键图标时显示）。{x} 会替换成该特权**当前等级**的概率
	const XF_DETAILS = {
		回复: { title: "重获生机", text: "你的回合开始时，你有{x}的概率回复一点体力。" },
		减伤: { title: "免减一伤", text: "当你受到伤害时，你有{x}的概率减少一点伤害。" },
		加伤: { title: "武力盖世", text: "你的回合内，当你造成伤害时有{x}的概率使伤害值+1。" },
		摸牌: { title: "粮多牌足", text: "摸牌阶段，你有{x}的概率额外摸一张牌。" },
	};
	// 等级夹取（越界一律夹到 0~5 级）
	const xfLevelOf = function (level) {
		var lv = parseInt(level, 10);
		if (!(lv >= 0)) lv = 0;
		if (lv > 5) lv = 5;
		return lv;
	};
	// 概率阶梯（嵌在正文里）：形如 0/10/20/30/40/60%，其中**当前等级的“数字”用黄色高亮**
	// （高亮不含末尾的 % ，与“0/10/20/30/40/<黄>60</黄>%”的写法一致）
	const XF_PCT_COLOR = "#FFD700";
	const buildXfLadderHTML = function (level) {
		var lv = xfLevelOf(level);
		var parts = [];
		for (var i = 0; i < XF_LEVEL_PCT.length; i++) {
			var txt = String(XF_LEVEL_PCT[i]);
			parts.push(i == lv ? '<span style="color:' + XF_PCT_COLOR + '">' + txt + "</span>" : txt);
		}
		return parts.join("/") + "%";
	};
	// 详情卡片 HTML（纯函数，便于打桩核对）：标题 + 一句技能描述，描述里的 {x} 展开为上面的阶梯。
	// 同样不使用 div —— 见 buildXfPanelHTML 的说明
	const buildXfDetailHTML = function (key, level) {
		var info = XF_DETAILS[key];
		if (!info) return "";
		return (
			'<span style="color:' + XF_PCT_COLOR + ';font-size:18px">【' + info.title + "】</span><br>" +
			'<span style="font-size:16px">' + info.text.split("{x}").join(buildXfLadderHTML(level)) + "</span>"
		);
	};
	// 当前显示的详情卡片与点击层（同时只允许一个）
	var xfDetailNodes = null;
	const hideXfDetail = function () {
		if (!xfDetailNodes) return;
		for (var i = 0; i < xfDetailNodes.length; i++) {
			var node = xfDetailNodes[i];
			if (node && typeof node.remove == "function") node.remove();
		}
		xfDetailNodes = null;
	};
	// 弹出居中的详情卡片 + 引擎自带的全屏点击层（点卡片外任意处关闭，与武将/技能介绍卡一致）
	const showXfDetail = function (key, level) {
		if (!ui.window || !ui.create || typeof ui.create.div != "function") return;
		hideXfDetail();
		var html = buildXfDetailHTML(key, level);
		if (!html) return;
		var card = ui.create.div(".xfdetail", ui.window);
		card.innerHTML = html;
		var winW = ui.window.offsetWidth || 400;
		var cardW = Math.round(Math.min(300, winW - 60));
		card.style.cssText =
			"position:absolute;z-index:30;transition:none;text-align:center;line-height:24px;color:#fff;" +
			"padding:10px;border-radius:8px;background:rgba(0,0,0,0.85);box-shadow:rgba(0,0,0,0.4) 0 0 12px;" +
			"width:" + cardW + "px;left:" + Math.round((winW - cardW) / 2) + "px;top:40px;";
		// .poplayer 是引擎自带的整屏点击层（layout.css:553-561），改 z-index 使其位于卡片之下、对话框之上
		var layer = ui.create.div(".poplayer", ui.window);
		layer.style.zIndex = "29";
		layer.addEventListener(lib.config.touchscreen ? "touchend" : "click", hideXfDetail);
		xfDetailNodes = [card, layer];
	};
	// 在面板所在节点上做事件委托：setDialogText 每次只替换 innerHTML，节点本身不变，故只需绑定一次。
	// 长按 500ms 或右键图标 → 弹详情（x 取该特权当前等级的概率，故需实时读 event.status）；
	// 抬起/移出/拖动（touchmove，面板可滚动）都会取消长按
	const bindXfDetail = function (dialog, getStatus) {
		if (!dialog || !dialog.content) return;
		var caption = dialog.content.firstChild;
		if (!caption || caption.xfDetailBound) return;
		caption.xfDetailBound = true;
		var timer = null;
		var xfKeyOf = function (target) {
			if (!target || target.tagName != "IMG" || !target.dataset) return "";
			return target.dataset.xf || "";
		};
		var levelOf = function (key) {
			var status = null;
			try {
				status = typeof getStatus == "function" ? getStatus() : null;
			} catch (e) {
				status = null;
			}
			return (status && status[key]) || 0;
		};
		var start = function (e) {
			var key = xfKeyOf(e.target);
			if (!key) return;
			if (timer) clearTimeout(timer);
			timer = setTimeout(function () {
				timer = null;
				showXfDetail(key, levelOf(key));
			}, 500);
		};
		var cancel = function () {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		};
		caption.addEventListener("mousedown", start);
		caption.addEventListener("touchstart", start);
		caption.addEventListener("mouseup", cancel);
		caption.addEventListener("mouseleave", cancel);
		caption.addEventListener("touchend", cancel);
		caption.addEventListener("touchmove", cancel);
		caption.addEventListener("contextmenu", function (e) {
			var key = xfKeyOf(e.target);
			if (!key) return;
			e.preventDefault(); // 拦住系统右键菜单
			showXfDetail(key, levelOf(key));
		});
	};
	//-------------------------- 将灵详情卡（选择列表里右键/长按将灵名） --------------------------
	// 详情卡上的品级写法（**仅详情卡**使用）：S→SA、A→AA，其余品级原样；颜色仍取 qualityColor。
	// 菜单与「将灵列表」继续用 jlQualityHTML 的 S/A 单字母写法，不受此处影响
	const JL_DETAIL_GRADE = { S: "SA", A: "AA" };
	// 品级文字（S→SA、A→AA，其余原样），供需要自行包颜色的地方使用（如「当前将灵」介绍卡里名称与品级同色）
	const jlDetailGradeText = function (key) {
		var letter = jlQualityLetter(key);
		return JL_DETAIL_GRADE[letter] || letter;
	};
	// 某将灵品级对应的颜色（未登记品级时按 A）
	const jlQualityColorOf = function (key) {
		return qualityColor[jlQuality[key]] || qualityColor.a;
	};
	const jlDetailGradeHTML = function (key) {
		return '<span style="color:' + jlQualityColorOf(key) + '">' + jlDetailGradeText(key) + "</span>";
	};
	// 技能名与描述的清洗：文案键是「【糖果】」这种写法、描述开头带 ▶，展示时统一去掉
	const jlSkillName = function (s) {
		return String(s).replace(/^【/, "").replace(/】$/, "");
	};
	const jlSkillText = function (t) {
		return String(t).replace(/^▶\s*/, "");
	};
	// 单个技能的完整文本卡（点技能名弹出）：标题取品级色，正文为「技能名：完整描述」的展开
	const buildJlSkillTextHTML = function (key, s) {
		var info = jlname[key];
		if (!info || !info.skill || info.skill[s] === undefined) return "";
		return (
			'<span style="color:' + jlQualityColorOf(key) + ';font-size:17px">' + jlSkillName(s) + "</span>" +
			'<span style="display:block;font-size:15px;line-height:22px;margin-top:6px;text-align:left">' + jlSkillText(info.skill[s]) + "</span>"
		);
	};
	// 卡片 HTML（纯函数，便于打桩核对）：顶部是将灵名(彩色品级) + character_half 半身像，
	// 下方逐条列出「技能名：完整描述」（去掉文案键上的【】与描述开头的 ▶）。
	// 同样不使用 div（引擎全局 div{display:inline-block;position:absolute}），分块用 display:block 的 span
	const buildJlDetailHTML = function (key) {
		var info = jlname[key];
		if (!info) return "";
		var html =
			'<span style="color:#FFD700;font-size:18px">' + info.name + "</span>" +
			'<span style="font-size:15px">(' + jlDetailGradeHTML(key) + ")</span><br>" +
			'<img src="' + layoutPath + "image/character_half/jl_imga_" + key + '.png" ' +
			'style="width:186px;max-width:100%;margin:6px 0 2px">';
		for (var s in info.skill) {
			html +=
				'<span style="display:block;font-size:15px;line-height:22px;margin-top:6px">' +
				jlSkillName(s) + "：" + jlSkillText(info.skill[s]) + "</span>";
		}
		return html;
	};
	// 当前显示的弹层卡片与点击层（同时只允许一个；详情卡与技能文本卡共用）
	var jlCardNodes = null;
	const hideJlCard = function () {
		if (!jlCardNodes) return;
		for (var i = 0; i < jlCardNodes.length; i++) {
			var node = jlCardNodes[i];
			if (node && typeof node.remove == "function") node.remove();
		}
		jlCardNodes = null;
	};
	// 弹出居中的卡片 + 引擎自带的全屏点击层（点卡片外任意处关闭，与特权详情/武将介绍卡一致）
	const showJlCard = function (html) {
		if (!ui.window || !ui.create || typeof ui.create.div != "function") return;
		hideJlCard();
		if (!html) return;
		var card = ui.create.div(".jldetail", ui.window);
		card.innerHTML = html;
		var winW = ui.window.offsetWidth || 400;
		var winH = ui.window.offsetHeight || 600;
		var cardW = Math.round(Math.min(300, winW - 60));
		card.style.cssText =
			"position:absolute;z-index:30;transition:none;text-align:center;line-height:24px;color:#fff;" +
			"padding:10px;border-radius:8px;background:rgba(0,0,0,0.9);box-shadow:rgba(0,0,0,0.4) 0 0 12px;" +
			"overflow-y:auto;-webkit-overflow-scrolling:touch;" +
			"width:" + cardW + "px;left:" + Math.round((winW - cardW) / 2) + "px;top:40px;" +
			"max-height:" + Math.max(200, winH - 130) + "px;";
		// .poplayer 是引擎自带的整屏点击层（layout.css:553-561），z-index 置于卡片之下
		var layer = ui.create.div(".poplayer", ui.window);
		layer.style.zIndex = "29";
		layer.addEventListener(lib.config.touchscreen ? "touchend" : "click", hideJlCard);
		jlCardNodes = [card, layer];
	};
	const hideJlDetail = hideJlCard;
	const showJlDetail = function (key) {
		showJlCard(buildJlDetailHTML(key));
	};
	const hideJlSkillText = hideJlCard;
	const showJlSkillText = function (key, s) {
		showJlCard(buildJlSkillTextHTML(key, s));
	};
	// 点技能名看完整文本：文案由引擎渲染在它自己的节点里，无法逐个绑定，
	// 因此在 document 上做事件委托——只处理带 data-jl 的元素（点击也可能落在内层 <ins> 上，需向上找）
	const jlSkillClick = function (e) {
		var node = e && e.target;
		while (node && node != document && !(node.dataset && node.dataset.jl)) node = node.parentNode;
		if (!node || node == document || !node.dataset) return;
		var parts = String(node.dataset.jl).split(":");
		var info = jlname[parts[0]];
		if (!info || !info.skill) return;
		var s = Object.keys(info.skill)[Number(parts[1])];
		if (s === undefined) return;
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
		showJlSkillText(parts[0], s);
	};
	if (typeof document != "undefined" && document.addEventListener && !document.jlSkillClickBound) {
		document.jlSkillClickBound = true;
		document.addEventListener("click", jlSkillClick, true);
	}
	// 给将灵选择列表的某一项绑定：右键 / 长按 500ms → 弹完整技能介绍。
	// 长按弹出后会在捕获阶段拦掉紧随其后的一次 click（否则会顺手把该项选上，菜单跟着关掉）
	const bindJlDetail = function (node, key) {
		if (!node || !key || key == "nothing" || !jlname[key]) return;
		if (node.jlDetailBound) return;
		node.jlDetailBound = true;
		var timer = null;
		var start = function () {
			if (timer) clearTimeout(timer);
			timer = setTimeout(function () {
				timer = null;
				if (typeof document != "undefined" && document.addEventListener) {
					var blocker = function (e) {
						if (!e || !e.target || !node.contains || !node.contains(e.target)) return;
						e.stopPropagation();
						e.preventDefault();
					};
					document.addEventListener("click", blocker, true);
					setTimeout(function () {
						document.removeEventListener("click", blocker, true);
					}, 700);
				}
				showJlDetail(key);
			}, 500);
		};
		var cancel = function () {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		};
		node.addEventListener("mousedown", start);
		node.addEventListener("touchstart", start);
		node.addEventListener("mouseup", cancel);
		node.addEventListener("mouseleave", cancel);
		node.addEventListener("touchend", cancel);
		node.addEventListener("touchmove", cancel);
		node.addEventListener("contextmenu", function (e) {
			e.preventDefault(); // 拦住系统右键菜单
			showJlDetail(key);
		});
	};
	// 配置文件给每个下拉项留的钩子：textMenu(node, key, text, config)
	const jlTextMenu = function (node, key) {
		bindJlDetail(node, key);
	};
	// step 内容会被引擎动态编译，无法访问闭包变量，统一通过 lib.jlX 暴露
	lib.jlX = {
		layoutPath: layoutPath,
		playVoice: jlPlayVoice,
		conf: conf,
		xfItems: XF_ITEMS,
		// 响应式排布判定（暴露出来便于打桩覆盖边界）
		pickPerRow: pickPerRow,
		// 预设加点与总消耗（step 内容经桥接读取，避免闭包不可见）
		xfPresets: XF_PRESETS,
		xfPresetCost: xfPresetCost,
		xfHint: XF_HINT,
		// 特权详情（长按/右键图标）：数据、概率表、HTML 生成、绑定与关闭
		xfDetails: XF_DETAILS,
		xfLevelPct: XF_LEVEL_PCT,
		xfDetailHTML: buildXfDetailHTML,
		xfLadderHTML: buildXfLadderHTML,
		bindXfDetail: bindXfDetail,
		hideXfDetail: hideXfDetail,
		// 将灵详情卡（选择列表右键/长按）：HTML 生成、弹出、关闭、按项绑定
		jlname: jlname,
		jlDetailHTML: buildJlDetailHTML,
		jlSkillTextHTML: buildJlSkillTextHTML,
		showJlSkillText: showJlSkillText,
		hideJlSkillText: hideJlSkillText,
		detailGradeText: jlDetailGradeText,
		detailGradeHTML: jlDetailGradeHTML,
		showJlDetail: showJlDetail,
		hideJlDetail: hideJlDetail,
		bindJlDetail: bindJlDetail,
		// 对话框高度按内容自适应（取代 fullheight 的固定高度，避免内容下方拖出大段空白）：
		// 贴合「内容自然高度 + 少量留白」，且不超过 fullheight 的口径（容器高度 - 80px）；
		// top 固定 40px 与 fullheight 一致，位置不变
		fitDialog: function (dialog) {
			if (!dialog || !dialog.style || !dialog.contentContainer) return;
			var need = (dialog.contentContainer.scrollHeight || 0) + 24;
			var parentH = (dialog.parentNode && dialog.parentNode.clientHeight) || 0;
			var max = parentH > 120 ? parentH - 80 : need;
			dialog.style.top = "40px";
			dialog.style.height = Math.round(Math.min(Math.max(need, 160), max)) + "px";
		},
		// 某等级升到下一级需要的点数（满级返回 -1）。step 式 content 会被引擎用 toString() 重编译，
		// 闭包里的 XF_COST 不可见，因此升级扣费必须经此桥接（与面板显示的 x级(y点) 同源）
		xfNextCost: function (level) {
			return level >= 5 ? -1 : XF_COST[level + 1] - XF_COST[level];
		},
		xfPanelHTML: buildXfPanelHTML,
		// 品级字母与配色（菜单项、将灵列表、技能简介等处统一取用，保证颜色一致）
		qualityColor: qualityColor,
		qualityMap: qualityMap,
		qualityOf: function (key) {
			return jlQuality[key];
		},
		qualityLetter: jlQualityLetter,
		qualityHTML: jlQualityHTML,
		headHTML: jlHeadHTML,
		// 扩展说明里「将灵列表」那段可折叠 HTML（暴露出来便于调试与打桩）
		get listHTML() {
			return jlListHTML;
		},
		// 开局冻结的"玩家角色"（gameStart 的 firstDo 时写入；
		// 挑战模式「单人控制」下引擎的 autoswap 会在开局过程中把 game.me 换成队友，不能直接用它判定）
		me: null,
		setDialogText: function (dialog, str) {
			if (!dialog || !dialog.content) return;
			const node = dialog.content.firstChild;
			if (node && typeof node.innerHTML == "string") node.innerHTML = str;
		},
		replaceDialogText: function (dialog, from, to) {
			if (!dialog || !dialog.content) return;
			const node = dialog.content.firstChild;
			if (node && typeof node.innerHTML == "string") node.innerHTML = node.innerHTML.replace(from, to);
		},
		// 新服五阶自动分配：按「加伤 → 摸牌 → 回血 → 减伤」贪心花预算
		// 各等级累计消耗：0→1=15；1→2/2→3/3→4=各10；4→5=20（单项满级65）
		autoAllocate: function (points) {
			const cost = [0, 15, 25, 35, 45, 65];
			const levels = [0, 0, 0, 0];
			const order = [2, 3, 0, 1];
			let remaining = points;
			while (true) {
				let acted = false;
				for (const idx of order) {
					while (true) {
						const next = levels[idx] + 1;
						if (next > 5) break;
						if (idx === 1 && levels[0] < 1) break;
						if (idx === 3 && levels[2] < 1) break;
						const need = cost[next] - cost[levels[idx]];
						if (remaining < need) break;
						remaining -= need;
						levels[idx] = next;
						acted = true;
					}
				}
				if (!acted) break;
			}
			return levels;
		},
	};

	//-------------------------- 等阶（新服五阶点数体系） --------------------------
	const LEVEL_POINTS = { "1": 0, "2": 10, "3": 30, "4": 60, "5": 110 };
	// 本扩展的将灵与等阶特权是否生效：勾选「仅在挑战模式启用」后只在挑战模式（mode id 为 boss）生效。
	// 三个开局部署钩子（_lvJlBegin / _lvJlBeginFd / _lvJlBeginAi）都以此为准，等阶特权的唯一入口是 applyLevel
	const jlEnabled = function () {
		if (lib.jlX.conf("onlyBoss") !== true) return true;
		return typeof get != "undefined" && get.mode && get.mode() == "boss";
	};
	const applyLevel = function (player, level) {
		if (level == "xinfu") level = "5";
		const points = LEVEL_POINTS[level] || 0;
		// 等阶附加特权：四阶初始手牌+1；五阶初始手牌+2、体力上限+1
		player.storage.jlStartDraw = level == "5" ? 2 : level == "4" ? 1 : 0;
		if (level == "5") {
			player.maxHp += 1;
			player.hp += 1;
		}
		if (points < 15) return;
		player.storage.levelPoint = points;
		player.addSkill("levelBuffXf");
	};
	const getJlSkill = function (key) {
		if (!key || key == "nothing" || !jlname[key]) return "";
		return "jl_" + key;
	};

	//-------------------------- 新将灵辅助 --------------------------
	// 军略标记名（引擎按它读写 storage 与标记显示），上限 5 个
	const JUNLUE = "jl_shenluxun_junlue";
	const JUNLUE_MAX = 5;
	const FANGHUN = "jl_zhaoxiang_fanghun";
	const FUHAN = "jl_zhaoxiang_fuhan";
	// 扶汉：同时持有的临时技能数达到该值后改为回血摸牌
	const FUHAN_MAX = 3;
	const ZHIBA = "jl_sunce_zhiba";
	const JIANG = "jl_sunce_jiang";
	const GUOSE = "jl_daqiao_guose";
	const LIULI = "jl_daqiao_liuli";
	const YIZUO = "jl_simayiyi_yizuo";
	const ZHENGWEI = "jl_simayiyi_zhengwei";
	const SHELIE = "jl_shenlvmeng_shelie";
	const GONGXIN = "jl_shenlvmeng_gongxin";
	const QIBA = "jl_jidabao_qiba";
	const JIANREN = "jl_jidabao_jianren";
	const LENGFENG = "jl_guoxiaoye_lengfeng";
	const JIAYI = "jl_guoxiaoye_jiayi";
	const JIAYI_BUFF = "jl_guoxiaoye_jiayi_buff";
	// 涉猎：打在牌上的标记名（视觉提示），回合结束由子技能移去
	const SHELIE_TAG = "涉猎";
	// 懿佐：伤害点数 + 获得牌数 的总和
	const YIZUO_TOTAL = 6;
	// 拯危：单次能让每名角色摸牌的上限
	const ZHENGWEI_MAX = 5;

	// 「使用或打出的牌进入弃牌堆」的官方判定链：cardsDiscard ← orderingDiscard ← useCard/respond
	// 属性杀在 Card.init 里已归一为 sha（带 nature），故只判 sha/shan 就含雷杀火杀。
	const fanghunCards = function (event, player) {
		if (!event || !Array.isArray(event.cards)) {
			return [];
		}
		const discarding = event.getParent();
		if (!discarding || discarding.name != "orderingDiscard") {
			return [];
		}
		const used = discarding.relatedEvent || discarding.getParent();
		if (!used || (used.name != "useCard" && used.name != "respond") || used.player != player) {
			return [];
		}
		return event.cards.filterInD("d").filter(card => get.name(card) == "sha" || get.name(card) == "shan");
	};

	// 扶汉的候选池：蜀势力武将的技能，且必须能被 addTempSkill 正常收回、不会递归再拿技能
	const fuhanCandidate = function (skill, player) {
		if (typeof skill != "string" || skill.startsWith("jl_") || skill.startsWith("jltest_")) {
			return false;
		}
		const info = lib.skill[skill];
		if (
			!info ||
			info.locked ||
			info.juexingji ||
			info.limited ||
			info.hiddenSkill ||
			info.zhuSkill ||
			info.dutySkill ||
			info.charlotte ||
			info.superCharlotte ||
			info.fixed ||
			info.init ||
			info.subSkill
		) {
			return false;
		}
		// skillDisabled 覆盖：缺翻译 / unique / temp / 子技能派生 / vanish；zhuanhuanji 覆盖转换技
		if (lib.filter.skillDisabled(skill) || get.is.zhuanhuanji(skill, player)) {
			return false;
		}
		return !player.hasSkill(skill);
	};

	const shuSkillPool = function (player) {
		let names;
		if (_status.characterlist) {
			names = _status.characterlist.filter(name => lib.character[name] && lib.character[name][1] == "shu");
		} else if (_status.connectMode) {
			// charactersOL 的谓词是「符合则排除」
			names = get.charactersOL(name => !lib.character[name] || lib.character[name][1] != "shu");
		} else {
			// gainableCharacters 的谓词是「符合则保留」，与 charactersOL 相反
			names = get.gainableCharacters(info => info[1] == "shu");
		}
		const pool = [];
		for (const name of names) {
			const skills = lib.character[name][3];
			if (!Array.isArray(skills)) {
				continue;
			}
			for (const skill of skills) {
				if (!pool.includes(skill) && fuhanCandidate(skill, player)) {
					pool.push(skill);
				}
			}
		}
		return pool;
	};

	// 激昂认可的牌：伤害类锦囊（决斗/火攻/南蛮入侵/万箭齐发）与红色【杀】
	// 属性杀已在 Card.init 归一为 sha，get.color 按花色判红黑（红桃/方块）
	const jiangCards = function (card) {
		if (!card) {
			return false;
		}
		const name = get.name(card);
		if (name == "sha") {
			return get.color(card) == "red";
		}
		return name == "juedou" || name == "huogong" || name == "nanman" || name == "wanjian";
	};

	// 判定区里挂着乐不思蜀的角色；get.name 会读 viewAs，所以国色贴上去的方块实体牌也算
	const lebuHolders = function () {
		return game.players.filter(target => target.getCards("j").some(card => get.name(card) == "lebu"));
	};

	// 弃牌堆里活着的牌：get.cardPile / childNodes 都不过滤失效节点，DOM 里可能残留正在移除或被移出游戏的牌，要自己跳过
	const liveCard = function (card) {
		if (!card || !card.classList || "destroyed" in card) {
			return false;
		}
		return !card.classList.contains("removing") && !card.classList.contains("feichu");
	};

	// 涉猎：弃牌堆里每种花色**各随机一张**（用户 2026-09-21 要求）。
	// 不按顺序遍历（视觉顶/底）是因为同一批牌会被反复摸回去，顺序取会稳定拿到那几张。
	const discardPerSuit = function () {
		const pool = Array.from(ui.discardPile.childNodes).filter(liveCard);
		const list = [];
		for (const suit of lib.suit) {
			const candidates = pool.filter(card => get.suit(card) == suit);
			if (candidates.length) {
				list.push(candidates.randomGet());
			}
		}
		return list;
	};

	// 攻心：这张牌的目标里，除神吕蒙之外还有牌可看的角色
	const gongxinTargets = function (event, player) {
		if (!event || !Array.isArray(event.targets)) {
			return [];
		}
		return event.targets.filter(target => target != player && target.isAlive() && target.countCards("h") > 0);
	};

	//-------------------------- 将灵技能 --------------------------
	const jlSkillList = {

		levelBuffXf: {
			trigger: { global: "gameStart" },
			forced: true,
			locked: true,
			unique: true,
			content: function () {
				"step 0";
				event.jlTotal = player.storage.levelPoint || 0;
				event.list = lib.jlX.xfLevelPct.map(function (pct) {
					return pct / 100;
				});
				"step 1";
				event.videoId = lib.status.videoId++;
				if (player.isUnderControl()) {
					game.modeSwapPlayer(player);
				}
				var createDialog = function (player, id) {
					if (player == event.player) return;
					var str = get.translation(player) + "正在选择特权加点<br>";
					for (var i = 1; i < 5; i++) {
						str += get.translation("xflevel" + i);
						str += "　　";
					}
					ui.create.dialog(str, "forcebutton").videoId = id;
				};
				var switchToAuto = function () {
					game.pause();
					game.countChoose();
					setTimeout(function () {
						_status.imchoosing = false;
						event._result = {
							bool: true,
						};
						var levels = lib.jlX.autoAllocate(event.jlTotal);
						player.storage.levelBuffXf_buff = [];
						for (var i = 0; i < 4; i++) {
							player.storage.levelBuffXf_buff[i] = event.list[levels[i]];
						}
						if (event.dialog) event.dialog.close();
						if (event.control) event.control.close();
						if (event.presetControls) {
							event.presetControls.forEach(function (node) {
								if (node && node.close) node.close();
							});
						}
						lib.jlX.hideXfDetail();
						game.resume();
					}, 500);
				};
				var chooseButton = function (player) {
					var event = _status.event;
					player = event.player;
					event.status = {
						回复: 0,
						减伤: 0,
						加伤: 0,
						摸牌: 0,
					};
					event.powers = {
						回复: 0,
						减伤: 0,
						加伤: 0,
						摸牌: 0,
					};
					event.lvPoint = event.jlTotal;
					event.finishedx = [];
					player.storage.levelBuffXf_buff = [];
					// 对话框创建用的占位内容；实际面板由 lib.jlX.xfPanelHTML 生成
					// （一行四项或两行两列：图标 → 特权名称 → x级(y点)，末尾整行为剩余点数与规则提示）
					event.str = "请选择你的等阶特权";
					var getStr = function () {
						return lib.jlX.xfPanelHTML(event.status, event.lvPoint, event.jlTotal);
					};
					var showTip = function (str) {
						var tip = ui.create.div("", str, event.dialog.content);
						tip.style.cssText = "color:#ffcc00;text-align:center;margin-top:6px;";
						setTimeout(function () {
							tip.remove();
						}, 900);
					};
					event.dialog = ui.create.dialog(event.str, "forcebutton", "hidden");
					event.dialog.open();
					lib.jlX.setDialogText(event.dialog, getStr());
					// 高度贴合内容（原先的 fullheight 固定高度会在内容下方拖出大段空白），位置保持 top 40px
					lib.jlX.fitDialog(event.dialog);
					// 长按/右键特权图标 → 弹详情（事件委托绑在面板节点上，面板刷新不影响绑定；
					// 详情里的概率 x 实时取自 event.status，即该特权当前等级）
					lib.jlX.bindXfDetail(event.dialog, function () {
						return event.status;
					});
					// 关闭对话框与全部按钮栏（加点按钮 + 各预设按钮）
					var closeAll = function () {
						lib.jlX.hideXfDetail();
						[event.dialog, event.control]
							.concat(event.presetControls || [])
							.forEach(function (node) {
								if (node && node.close) node.close();
							});
					};
					for (var i = 0; i < event.dialog.buttons.length; i++) {
						event.dialog.buttons[i].classList.add("pointerdiv");
					}
					event.switchToAuto = function () {
						var levels = lib.jlX.autoAllocate(event.jlTotal);
						player.storage.levelBuffXf_buff = [];
						for (var i = 0; i < 4; i++) {
							player.storage.levelBuffXf_buff[i] = event.list[levels[i]];
						}
						event._result = {
							bool: true,
							links: event.finishedx.slice(0),
						};
						closeAll();
						game.resume();
						_status.imchoosing = false;
					};
					event.control = ui.create.control("回复", "减伤", "加伤", "摸牌", function (link) {
						var event = _status.event;
						if (event.finishedx.contains(link)) return;
						if (link == "减伤" && event.status["回复"] < 1) {
							showTip("需先激活【" + lib.jlX.xfItems[0].name + "】");
							return;
						}
						if (link == "摸牌" && event.status["加伤"] < 1) {
							showTip("需先激活【" + lib.jlX.xfItems[2].name + "】");
							return;
						}
						// 升级消耗按等级查表（与面板显示的“x级(y点)”同源）：0→1=15；1→2/2→3/3→4=各10；4→5=20
						// 必须经 lib.jlX 桥接：本段代码位于 step 式 content 内，被引擎重编译后看不到闭包变量
						var cost = lib.jlX.xfNextCost(event.status[link]);
						if (cost < 0) return;
						if (event.lvPoint < cost) {
							showTip("点数不足");
							return;
						}
						event.status[link]++;
						event.powers[link] += cost;
						event.lvPoint -= cost;
						if (event.powers[link] >= 65) {
							event.powers[link] = 65;
							event.status[link] = 5;
							event.finishedx.push(link);
						}
						lib.jlX.setDialogText(event.dialog, getStr());
						var j = 0;
						if (link == "回复") j = 0;
						if (link == "减伤") j = 1;
						if (link == "加伤") j = 2;
						if (link == "摸牌") j = 3;
						player.storage.levelBuffXf_buff[j] = event.list[event.status[link]];
						if (event.lvPoint <= 5) {
							event._result = {
								bool: true,
								links: event.finishedx.slice(0),
							};
							closeAll();
							game.resume();
							_status.imchoosing = false;
						}
					});
					// 预设按钮（4500 / 4050 / 0054）：按 lib.jlX.xfPresets 顺序创建，等级与总消耗同源
					event.presetControls = lib.jlX.xfPresets.map(function (preset) {
						return ui.create.control(preset.name, function () {
							var need = lib.jlX.xfPresetCost(preset);
							if (event.jlTotal < need) {
								showTip("点数不足（" + preset.name + "需要" + need + "点）");
								return;
							}
							for (var i = 0; i < preset.levels.length; i++) {
								player.storage.levelBuffXf_buff[i] = event.list[preset.levels[i]];
							}
							event._result = {
								bool: true,
								links: event.finishedx.slice(0),
							};
							closeAll();
							game.resume();
							_status.imchoosing = false;
						});
					});
					for (var i = 0; i < event.dialog.buttons.length; i++) {
						event.dialog.buttons[i].classList.add("selectable");
					}
					game.pause();
					game.countChoose();
				};
				game.broadcastAll(createDialog, player, event.videoId);
				if (event.isMine() || lib.jlX.conf("levelXinfFdAuto")) {
					chooseButton();
				} else if (event.isOnline()) {
					event.player.send(chooseButton, event.player);
					event.player.wait();
					game.pause();
				} else {
					switchToAuto();
				}
				"step 2";
				game.broadcastAll("closeDialog", event.videoId);
				var storage = player.storage.levelBuffXf_buff || [0, 0, 0, 0];
				if (storage[0] && storage[0] != 0) {
					player.addSkill("levelBuffXf_hF");
				}
				if (storage[1] && storage[1] != 0) {
					player.addSkill("levelBuffXf_mS");
				}
				if (storage[2] && storage[2] != 0) {
					player.addSkill("levelBuffXf_jS");
				}
				if (storage[3] && storage[3] != 0) {
					player.addSkill("levelBuffXf_mP");
				}
			},
			mark: true,
			marktext: "点",
			locked: true,
			intro: {
				name: "等阶特权",
				content: function (event, player) {
					var storage = [];
					for (var i = 0; i < 4; i++) {
						if (player.storage.levelBuffXf_buff[i]) storage[i] = player.storage.levelBuffXf_buff[i];
						else storage[i] = 0;
					}
					return (
						"可分配总点数：" +
						(player.storage.levelPoint || 0) +
						"<br>回复概率：" +
						storage[0] * 100 +
						"%<br>" +
						"免伤概率：" +
						storage[1] * 100 +
						"%<br>" +
						"加伤概率：" +
						storage[2] * 100 +
						"%<br>" +
						"摸牌概率：" +
						storage[3] * 100 +
						"%"
					);
				},
			},
			subSkill: {
				hF: {
					name: "重获生机",
					forced: false,
					locked: true,
					prompt2: "回复1点体力值",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < player.storage.levelBuffXf_buff[0] && player.isDamaged();
					},
					trigger: { player: "phaseZhunbeiBegin" },
					content: function () {
						player.recover();
					},
					ai: {
						threaten: 0.8,
					},
				},
				mS: {
					name: "免减一伤",
					forced: false,
					locked: true,
					prompt2: "令受到的伤害-1",
					filter: function (event, player) {
						var numa = Math.random();
						return numa <= player.storage.levelBuffXf_buff[1];
					},
					trigger: { player: "damageBegin4" },
					content: function () {
						trigger.num = trigger.num - 1;
					},
					ai: {
						threaten: 0.6,
					},
				},
				jS: {
					name: "武力盖世",
					forced: false,
					locked: true,
					prompt2: "自己回合内造成伤害+1",
					filter: function (event, player) {
						var numa = Math.random();
						return _status.currentPhase == player && numa <= player.storage.levelBuffXf_buff[2];
					},
					trigger: { source: "damageBegin1" },
					content: function () {
						trigger.num = trigger.num + 1;
					},
					check: function (event, player) {
						// 伤害事件用 event.player 表示受伤者（无 target 字段）
						return get.attitude(player, event.player) <= 0;
					},
					ai: {
						threaten: 1.4,
					},
				},
				mP: {
					name: "粮多牌足",
					forced: false,
					locked: true,
					prompt2: "摸牌阶段额外摸一张牌",
					filter: function (event, player) {
						var numa = Math.random();
						return numa <= player.storage.levelBuffXf_buff[3];
					},
					// 不加 !event.numFixed：替换型摸牌技能（突袭/偏宠）归零后仍需额外摸一张
					trigger: { player: "phaseDrawBegin2" },
					content: function () {
						trigger.num = trigger.num + 1;
					},
				},
			},
		},
		jl_xiaoshan: {
			charlotte: true,
			locked: true,
			group: ["jl_xiaoshan_shanpo", "jl_xiaoshan_tanhua"],
			subSkill: {
				shanpo: {
					name: "闪魄",
					forced: false,
					locked: true,
					usable: 1,
					prompt2:
						"当有角色使用或打出【闪】时，你有90%的概率可以弃置该角色1~3张牌，然后获得这张【闪】（每回合限触发1次）。如果使用者是你，则改为摸1~3张牌。",
					filter: function (event, player) {
						const numa = Math.random();
						if (numa > 0.9) return false;
						const card = event.card;
						return card.name === "shan";
					},
					trigger: { global: ["useCard", "respond"] },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");
						if (event._trigger.player === player) {
							const drawNum = [1, 2, 3].randomGet();
							player.draw(drawNum);
						} else {
							player.line(event._trigger.player, "gold");
							const discardNum = [1, 2, 3].randomGet();
							player.discardPlayerCard(event._trigger.player, "he", [
								1,
								discardNum,
							]);
							player.gain(event._trigger.cards[0], "giveAuto", "bySelf");
						}
					},
					check: function (event, player) {
						return event.player === player || get.attitude(player, event.player) <= 0;
					},
				},
				tanhua: {
					name: "昙花",
					forced: false,
					locked: true,
					prompt2:
						"出牌阶段开始时，你有90%的概率可以弃置至多4张【闪】并摸等量的牌，然后对一名角色造成X点伤害（X为弃牌堆中【闪】的数量且至多为8）。",
					filter: function (event) {
						const num = Math.random();
						return num < 0.9;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");
						player.chooseToDiscard(
							[1, 4],
							get.prompt2("jl_xiaoshan_tanhua"),
							function (card) {
								return card.name === "shan";
							},
							"h"
						);
						("step 1");
						if (result.bool) {
							player.draw(result.cards.length);
						}
						let shanCardsNum = 0;
						for (let i = 0; i < ui.discardPile.childNodes.length; i++) {
							if (ui.discardPile.childNodes[i].name === "shan") {
								shanCardsNum++;
							}
						}
						if (shanCardsNum > 0) {
							event.tanhuaDamage = shanCardsNum <= 8 ? shanCardsNum : 8;
							player
								.chooseTarget(
									`选择一名角色造成${event.tanhuaDamage}点伤害`,
									true
								)
								.set("ai", function (target) {
									return get.attitude(_status.event.player, target) <= 0;
								});
						} else {
							event.finish();
						}
						("step 2");
						if (result.bool) {
							const target = result.targets[0];
							player.line(target, "gold");
							target.damage(event.tanhuaDamage);
						}
					},
					check: function (event, player) {
						return game.hasPlayer(function (current) {
							return current != player && get.attitude(player, current) <= 0;
						});
					},
				},
			},
		},
		jl_zhouyi: {
			charlotte: true,
			locked: true,
			group: ["jl_zhouyi_zhukou", "jl_zhouyi_mangqing", "jl_zhouyi_mangqing_clear"],
			subSkill: {
				zhukou: {
					name: "逐寇",
					audio: false,
					forced: false,
					locked: true,
					usable: 1,
					prompt2:
						"每回合限一次，当你于一名角色的出牌阶段造成伤害后，你有90%的概率摸X张牌并回复1点体力（X为本回合你已使用的牌数）。",
					trigger: {
						source: "damageSource",
					},
					filter: function (event, player) {
						const evt = event.getParent("phaseUse");
						if (!evt || !evt.player) return false;
						if (
							player
								.getHistory("sourceDamage", function (event) {
									return event.getParent("phaseUse") === evt;
								})
								.indexOf(event) === 0
						) {
							return Math.random() < 0.9;
						}
					},
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");
						player.draw(player.getHistory("useCard").length);
						player.recover();
					},
				},
				mangqing: {
					name: "氓情",
					audio: false,
					forced: false,
					locked: true,
					frequent: true,
					prompt2:
						"准备阶段，你有85%的概率选择一项（每有一个受伤角色可多选一项）：1.对一名角色造成2点伤害；2.摸2~3张牌；3.本回合出牌阶段可以多使用3张【杀】；4.本回合手牌上限+4。",
					trigger: {
						player: "phaseZhunbeiBegin",
					},
					filter: function (event, player) {
						return Math.random() < 0.85;
					},
					content: function () {
						"step 0";
						const isDamagedNum = game.countPlayer(function (current) {
							return current.isDamaged();
						});
						// 可选上限与提示文本严格一致：受伤角色数 0 → 仅一项；否则一至 min(4, 受伤数+1) 项
						const maxSelect = Math.min(4, isDamagedNum + 1);
						const list = [
							"选项一：对一名角色造成2点伤害",
							"选项二：摸2~3张牌",
							"选项三：本回合出牌阶段可以多使用3张【杀】",
							"选项四：本回合手牌上限+4",
						];
						for (var i = 0; i < list.length; i++) {
							list[i] = [i, list[i]];
						}
						let next = player.chooseButton([
							`氓情：请选择一${isDamagedNum ? "至" + get.cnNumber(maxSelect) : ""}项`,
							[list, "tdnodes"],
						]);
						next.set(
							"selectButton",
							isDamagedNum === 0 ? [1, 1] : [1, maxSelect]
						);
						("step 1");
						// 玩家可在弹窗点取消放弃发动（result 为 {bool:false}；防御非取消残留的无 links 结果）
						if (!result || result.bool === false || !Array.isArray(result.links)) {
							event.finish();
							return;
						}
						lib.jlX.playVoice("voice/" + event.name + "1");
						for (const i of result.links) {
							game.log(
								player,
								"选择了",
								"#g【氓情】",
								"的",
								"#y选项" + get.cnNumber(1 + i, true)
							);
						}
						event.links = result.links;
						// 记录长效效果（选项三/四）并挂"氓"字标记（本回合内 hover 可见，回合结束清除）；
						// 仅即时生效的选项（伤害/摸牌）不进入标记
						const lastingLinks = result.links.filter(function (i) {
							return i === 2 || i === 3;
						});
						player.storage.jl_zhouyi_mangqing_mark = lastingLinks;
						if (lastingLinks.length) player.markSkill("jl_zhouyi_mangqing_mark");
						if (result.links.includes(1)) player.draw([2, 3].randomGet());
						if (result.links.includes(2))
							player.addTempSkill("jl_zhouyi_mangqing2");
						if (result.links.includes(3))
							player.addTempSkill("jl_zhouyi_mangqing3");
						("step 2");
						if (event.links.includes(0)) {
							player
								.chooseTarget("对一名角色造成2点伤害", true)
								.set("ai", function (target) {
									const player = _status.event.player;
									return get.damageEffect(target, player, player);
								});
						} else {
							event.finish();
						}
						("step 3");
						if (result.bool) {
							const target = result.targets[0];
							player.line(target, "gold");
							target.damage(2);
						}
					},
				},
				mangqing2: {
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name === "sha") return num + 3;
						},
					},
				},
				mangqing3: {
					mod: {
						maxHandcard: function (player, num) {
							return num + 4;
						},
					},
				},
				mangqing_mark: {
					marktext: "氓",
					intro: {
						name: "氓情",
						content: function (storage) {
							const map = [
								"本回合出牌阶段可以多使用3张【杀】",
								"本回合手牌上限+4",
							];
							if (!Array.isArray(storage)) {
								return "本回合未拥有长效效果";
							}
							const lasting = storage.filter(function (i) {
								return i === 2 || i === 3;
							});
							if (!lasting.length) {
								return "本回合未拥有长效效果";
							}
							return (
								"本回合拥有如下效果：" +
								lasting
									.map(function (i) {
										return map[i - 2];
									})
									.join("、")
							);
						},
					},
				},
				mangqing_clear: {
					trigger: {
						player: "phaseEnd",
					},
					forced: true,
					silent: true,
					content: async function (event, trigger, player) {
						player.unmarkSkill("jl_zhouyi_mangqing_mark");
						delete player.storage.jl_zhouyi_mangqing_mark;
					},
				},
			},
		},
		jl_caochun: {
			charlotte: true,
			locked: true,
			group: ["jl_caochun_shanjia", "jl_caochun_xiaorui"],
			subSkill: {
				shanjia: {
					name: "缮甲",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"每名角色的出牌阶段开始时，你有85%的概率可以摸2~4张牌，然后若此时是你的回合内，你可以视为使用一张【杀】，此【杀】不能被响应且伤害+1~2。（每轮限3次）",
					trigger: {
						global: "phaseUseBegin",
					},
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.85 && !player.hasSkill("jl_caochun_count3");
					},
					content: function () {
						"step 0";
						if (player.hasSkill("jl_caochun_count2"))
							player.addTempSkill("jl_caochun_count3", "roundStart");
						else if (player.hasSkill("jl_caochun_count1"))
							player.addTempSkill("jl_caochun_count2", "roundStart");
						else player.addTempSkill("jl_caochun_count1", "roundStart");
						("step 1");
						lib.jlX.playVoice("voice/" + event.name + "1");
						var numa = [2, 3, 4].randomGet();
						player.draw(numa);
						("step 2");
						if (event._trigger.player === player) {
							player.chooseTarget(
								get.prompt("jl_caochun_shanjia"),
								"视为使用一张【杀】，此【杀】不能被响应且伤害+1~2",
								function (card, player, target) {
									if (player == target) return false;
									return player.canUse({ name: "sha" }, target, false);
								}
							);
						}
						("step 3");
						if (
							event._trigger.player === player &&
							result.bool &&
							result.targets &&
							result.targets.length
						) {
							player.storage.shanjiaSha = true;
							player.addTempSkill("jl_caochun_count4", { player: "shaEnd" });
							player.logSkill("jl_caochun_shanjia", result.targets);
							player.useCard(
								{ name: "sha", isCard: true },
								result.targets[0],
								false
							);
							result.targets[0].addTempSkill("jl_caochun_count5", {
								target: "shaEnd",
							});
						}
						("step 4");
						player.storage.shanjiaSha = false;
					},
				},
				xiaorui: {
					name: "骁锐",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"当你对其他角色造成伤害时，你有90%的概率随机获得其1~4张牌且此伤害+1~4（每回合限触发4次）。",
					trigger: {
						source: "damageBefore",
					},
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.9 && !player.hasSkill("jl_caochun_count9");
					},
					content: function () {
						"step 0";
						if (player.hasSkill("jl_caochun_count8"))
							player.addTempSkill("jl_caochun_count9", "phaseEnd");
						else if (player.hasSkill("jl_caochun_count7"))
							player.addTempSkill("jl_caochun_count8", "phaseEnd");
						else if (player.hasSkill("jl_caochun_count6"))
							player.addTempSkill("jl_caochun_count7", "phaseEnd");
						else player.addTempSkill("jl_caochun_count6", "phaseEnd");
						("step 1");
						if (trigger.player) {
							lib.jlX.playVoice("voice/" + event.name + "1");
							const numb = [1, 2, 3, 4].randomGet();
							player.line(trigger.player, "gold");
							let cardList = [];
							while (
								cardList.length < numb &&
								cardList.length < trigger.player.countCards("he")
							) {
								const card = trigger.player.getCards("he").randomGet();
								if (card && !cardList.includes(card)) {
									cardList.push(card);
								}
							}
							if (cardList.length > 0) {
								player.gain(cardList, trigger.player, "giveAuto", "bySelf");
							}
							player.line(trigger.player, "fire");
							const damage = [1, 2, 3, 4].randomGet();
							trigger.num += damage;
						}
					},
				},
				count1: {},
				count2: {},
				count3: {},
				count4: {
					audio: false,
					forced: true,
					locked: true,
					trigger: {
						player: "useCard",
					},
					filter: function (event, player) {
						return player.storage.shanjiaSha && get.name(event.card) === "sha";
					},
					content: function () {
						trigger.directHit.addArray(
							game.filterPlayer(function (current) {
								return current !== player;
							})
						);
					},
				},
				count5: {
					audio: false,
					charlotte: true,
					frequent: true,
					forced: true,
					trigger: {
						player: "damageBefore",
					},
					filter: function (event, player) {
						return event.source && event.source.storage.shanjiaSha;
					},
					content: function () {
						var numb = [1, 2].randomGet();
						trigger.num += numb;
					},
				},
				count6: {},
				count7: {},
				count8: {},
				count9: {},
			},
		},
		jl_zhangqiying: {
			charlotte: true,
			locked: true,
			group: [
				"jl_zhangqiying_falu",
				"jl_zhangqiying_dianhua",
				"jl_zhangqiying_zhenyi1",
				"jl_zhangqiying_zhenyi2",
			],
			subSkill: {
				falu: {
					name: "法箓",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"结束阶段，你有90%的概率随机获得牌堆中四种花色的牌各一张。若你因此获得了点数相同的牌，你回复1点体力并对至多两名其他角色各造成1点伤害。",
					trigger: {
						player: "phaseJieshuBegin",
					},
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");
						event.list = [];
						event.num = 0;
						("step 1");
						var candidates = [];
						for (var i = 0; i < ui.cardPile.childNodes.length; i++) {
							var cardx = ui.cardPile.childNodes[i];
							if (
								cardx.classList.contains("removing") ||
								cardx.classList.contains("feichu") ||
								cardx.destroyed
							)
								continue;
							if (event.list.includes(cardx)) continue;
							var dup = false;
							for (var j = 0; j < event.list.length; j++) {
								if (cardx.suit == event.list[j].suit) {
									dup = true;
									break;
								}
							}
							if (!dup) candidates.push(cardx);
						}
						var card = candidates.randomGet();
						if (card) event.list.push(card);
						event.num++;
						("step 2");
						if (event.num < 4) event.goto(1);
						("step 3");
						let numOfCards = new Set();
						for (let i = 0; i < 4; i++) {
							numOfCards.add(get.number(event.list[i]));
						}
						player.gain(event.list, "gain2");
						if (numOfCards.size < 4) {
							player.recover();
						} else event.finish();
						("step 4");
						player.chooseTarget(
							"选择至多两名其他角色各造成1点伤害",
							[1, 2],
							function (card, player, target) {
								return player != target;
							}
						);
						("step 5");
						if (result.bool) {
							result.targets.sortBySeat();
							let targets = result.targets;
							for (const target of targets) {
								player.line(target, "fire");
								target.damage();
							}
						}
					},
				},
				dianhua: {
					name: "点化",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"准备阶段，你有90%的概率可以观看牌堆顶的四张牌，然后以任意顺序放回牌堆顶。",
					trigger: {
						player: "phaseZhunbeiBegin",
					},
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 交互对齐观星（chooseToMove 拖放组件）：仅"牌堆顶"一列排序（点化无牌堆底）
						const cards = get.cards(4);
						await game.cardsGotoOrdering(cards);
						const result = await player
							.chooseToMove("allowChooseAll")
							.set("list", [["牌堆顶", cards]])
							.set("prompt", "点化：点击或拖动将牌移动到牌堆顶")
							.set("processAI", function (list) {
								const move = list[0][1].slice();
								move.sort(function (a, b) {
									return get.value(b, player) - get.value(a, player);
								});
								return [move];
							})
							.forResult();
						const moved = result && result.moved ? result.moved[0] : null;
						// 防御：未取得排序结果（异常路径）按原顺序放回，避免牌滞留处理区
						const top = (Array.isArray(moved) && moved.length ? moved : cards).slice();
						top.reverse();
						await game.cardsGotoPile(top, ["dianhua_top", top], function (evt, card) {
							if (evt.dianhua_top.includes(card)) return ui.cardPile.firstChild;
							return null;
						});
						game.addCardKnower(top, player);
						player.popup(get.cnNumber(top.length) + "上");
						game.log(player, "将" + get.cnNumber(top.length) + "张牌置于牌堆顶");
						await game.delayx();
					},
				},
				zhenyi1: {
					name: "真仪",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"当你对其他角色造成伤害时，你有85%的概率令此伤害+1，然后随机获得其一张牌（每回合限触发2次）。",
					trigger: {
						source: "damageBegin1",
					},
					filter: function (trigger, player) {
						var numa = Math.random();
						return (
							numa < 0.85 &&
							trigger.player != player &&
							!player.hasSkill("jl_zhangqiying_count2")
						);
					},
					content: function () {
						lib.jlX.playVoice("voice/jl_zhangqiying_zhenyi1");
						if (player.hasSkill("jl_zhangqiying_count1"))
							player.addTempSkill(
								"jl_zhangqiying_count2",
								"phaseZhunbeiBegin"
							);
						else
							player.addTempSkill(
								"jl_zhangqiying_count1",
								"phaseZhunbeiBegin"
							);
						trigger.num = trigger.num + 1;
						player.line(trigger.player, "gold");
						var card = trigger.player.getCards("he").randomGet();
						player.gain(card, trigger.player, "giveAuto", "bySelf");
					},
				},
				zhenyi2: {
					name: "真仪",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"当你受到其他角色造成的伤害时，你有85%的概率防止此伤害，然后你随机弃置伤害来源两张牌（每回合限触发2次）。",
					trigger: {
						player: "damageBegin3",
					},
					filter: function (trigger, player) {
						var numa = Math.random();
						return (
							numa < 0.85 &&
							trigger.source &&
							trigger.source != player &&
							!player.hasSkill("jl_zhangqiying_count4")
						);
					},
					content: function () {
						lib.jlX.playVoice("voice/jl_zhangqiying_zhenyi1");
						if (player.hasSkill("jl_zhangqiying_count3"))
							player.addTempSkill(
								"jl_zhangqiying_count4",
								"phaseZhunbeiBegin"
							);
						else
							player.addTempSkill(
								"jl_zhangqiying_count3",
								"phaseZhunbeiBegin"
							);
						trigger.num = 0;
						var cards = trigger.source.getCards("he").randomGets(2);
						player.line(trigger.source, "fire");
						trigger.source.discard(cards);
					},
				},
				count1: {},
				count2: {},
				count3: {},
				count4: {},
			},
		},
		jl_shenguanyu: {
			charlotte: true,
			locked: true,
			group: [
				"jl_shenguanyu_wushen1",
				"jl_shenguanyu_wushen2",
				"jl_shenguanyu_wuhun1",
				"jl_shenguanyu_wuhun2",
			],
			subSkill: {
				wushen1: {
					name: "武神",
					forced: false,
					direct: true,
					trigger: { player: "phaseZhunbeiBegin" },
					filter: function () {
						var numa = Math.random();
						return numa < 0.85;
					},
					content: function () {
						"step 0";
						player
							.chooseTarget(
								get.prompt("武神"),
								[1, 3],
								function (card, player, target) {
									// 【杀】不能以自己为目标
									return target != player;
								}
							)
							.set("prompt2", "你可以对至多3名角色各使用一张【杀】")
							.set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								if (att <= 0)
									return Math.max(att * (target.hp - 6), att * -1);
								else return -1;
							});
						("step 1");
						if (result.targets) {
							lib.jlX.playVoice("voice/jl_shenguanyu_wushen1");

							result.targets.sortBySeat();
							for (var i = 0; i < result.targets.length; i++) {
								player.useCard(
									{ name: "sha", isCard: true },
									result.targets[i],
									false
								);
							}
						}
						event.finish();
					},
					ai: {
						threaten: 3,
						order: 6,
						result: {
							target: function () {
								return -1;
							},
						},
					},
				},
				wushen2: {
					//name:'武神',
					forced: true,
					locked: true,
					preHidden: true,
					trigger: { source: "damageAfter" },
					filter: function (event) {
						return (
							event.getParent().getParent().getParent().name ==
							"jl_shenguanyu_wushen1"
						);
					},
					content: function () {
						player.draw();
					},
				},
				//if(game.hasPlayer2(function(current){return current.getHistory('damage',function(event){console.log(event);console.log(event.getParent());console.log(event.getParent().getParent());console.log(event.getParent().getParent().getParent());return event.getParent().getParent().getParent().name=='jl_shenguanyu_wushen1';}).length>0})) player.draw();
				wuhun1: {
					name: "武魂",
					forced: false,
					prompt2: "获得1个'梦魇'标记",
					trigger: { global: "damageAfter" },
					filter: function (event, player, current) {
						var numa = Math.random();
						if (numa > 0.8) return false;
						return (
							get.distance(player, event.player) <= 1 &&
							_status.currentPhase != player &&
							player.countMark("jl_shenguanyu_jlwuhun") < 5
						);
					},
					content: function () {
						"step 0";
						player.addMark("jl_shenguanyu_jlwuhun", 1);
					},
				},
				wuhun2: {
					name: "武魂",
					forced: false,
					locked: true,
					trigger: { global: "phaseEnd" },
					prompt2: "是否弃置全部梦魇标记，并令当前回合角色失去等量体力？",
					filter: function (event, player) {
						return (
							player.countMark("jl_shenguanyu_jlwuhun") > 0 &&
							_status.currentPhase != player
						);
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/jl_shenguanyu_wuhun1");

						_status.currentPhase.loseHp(
							player.countMark("jl_shenguanyu_jlwuhun")
						);
						player.removeMark(
							"jl_shenguanyu_jlwuhun",
							player.countMark("jl_shenguanyu_jlwuhun")
						);
					},
					ai: {
						threaten: 2.5,
						order: 6,
						result: {
							target: function (game, event) {
								var att = get.attitude(_status.currentPhase, player);
								return -2 * player.countMark("jl_shenguanyu_jlwuhun");
							},
						},
					},
				},
				jlwuhun: {
					marktext: "魇",
					mark: true,
					intro: {
						name: "梦魇",
						content: "mark",
					},
					locked: true,
				},
			},
		},
		jl_guansuo: {
			charlotte: true,
			locked: true,
			group: ["jl_guansuo_zhengnan", "jl_guansuo_zhengnan_clear", "jl_guansuo_xiefang"],
			subSkill: {
				xiefang: {
					name: "撷芳",
					forced: false,
					locked: true,
					prompt2:
						"出牌阶段开始时，你有85%的概率获得以下效果：摸X张牌、此阶段计算与其他角色的距离-X、此阶段可以多使用X张【杀】，且【杀】的伤害+X（此阶段限触发2次），X为场上女性角色数+1。",
					trigger: {
						player: "phaseUseBegin",
					},
					filter: function () {
						var numa = Math.random();
						return numa < 0.85;
					},
					content: function () {
						var x = game.countPlayer(function (current) {
							return current.hasSex("female");
						});
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.draw(x + 1);
						player.storage.jl_guansuo_buff1 = x + 1;
						player.addTempSkill("jl_guansuo_buff1");
						player.addTempSkill("jl_guansuo_buff2");
					},
					ai: {
						threaten: 2.5,
						order: 6,
						result: {
							player: function (game, event) {
								var x = game.countPlayer(function (current) {
									return current.hasSex("female");
								});
								return 1.5 * (x + 1);
							},
						},
					},
				},
				zhengnan: {
					name: "征南",
					forced: false,
					locked: true,
					prompt2:
						"一名角色受到伤害后，若其体力值小于等于你，你有95%的概率摸1~3张牌，然后在“武圣”、“当先”、“制蛮”里选择并获得一个技能直到你的回合结束（每回合每名角色限触发一次），若未获得技能则你回复1点体力。",
					trigger: {
						global: "damageAfter",
					},
					filter: function (event, player) {
						// 受伤角色体力值须小于等于你
						if (event.player.hp > player.hp) return false;
						// 每回合每名角色限触发一次（记录由 zhengnan_clear 于每名角色回合结束时清空）
						const list = player.storage.jl_guansuo_zhengnan;
						if (Array.isArray(list) && list.includes(event.player))
							return false;
						return Math.random() < 0.95;
					},
					content: function () {
						"step 0";
						if (!Array.isArray(player.storage.jl_guansuo_zhengnan)) {
							player.storage.jl_guansuo_zhengnan = [];
						}
						player.storage.jl_guansuo_zhengnan.add(trigger.player);
						// 先摸 1~3 张牌
						player.draw([1, 2, 3].randomGet());
						// 每获得一个技能则少一个按钮：已拥有（本回合生效中）的不再提供
						event.list = [
							"new_rewusheng",
							"xindangxian",
							"rezhiman",
						].filter(function (skill) {
							return !player.hasSkill(skill);
						});
						lib.jlX.playVoice("voice/" + event.name + "1");
						("step 1");
						if (event.list.length) {
							player
								.chooseControl(event.list)
								.set("prompt", "征南：选择获得下列技能中的一个")
								.set("ai", function () {
									if (event.list.includes("xindangxian"))
										return "xindangxian";
									return 0;
								});
						} else {
							// 没有可用技能 → 回复 1 点体力
							player.recover();
							event.finish();
						}
						("step 2");
						if (result.control) {
							if (result.control == "xindangxian") {
								// 修改版当先：额外出牌阶段询问"是否失去1点体力并获得一张【杀】"
								// （本体当先仅当 storage.xinfuli 为真时才提供该选择，否则强制失去体力拿杀）
								player.storage.xinfuli = true;
							}
							player.addTempSkill(result.control, {
								player: "phaseEnd",
							});
							player.popup(get.translation(result.control));
							game.log(
								player,
								"获得了技能",
								"#g【" + get.translation(result.control) + "】"
							);
						}
					},
					ai: {
						threaten: 6.5,
						order: 6,
						result: {
							player: function (game, event) {
								return 5;
							},
						},
					},
					derivation: ["new_rewusheng", "xindangxian", "rezhiman"],
				},
				zhengnan_clear: {
					trigger: {
						global: "phaseEnd",
					},
					forced: true,
					silent: true,
					content: async function (event, trigger, player) {
						player.storage.jl_guansuo_zhengnan = [];
					},
				},
				buff1: {
					name: "撷芳",
					mark: true,
					locked: true,
					marktext: "撷芳",
					onremove: true,
					intro: { content: "与其他角色的距离-$、多使用$张【杀】。" },
					mod: {
						globalFrom: function (from, to, distance) {
							return (
								distance -
								1 -
								game.countPlayer(function (current) {
									return current.hasSex("female");
								})
							);
						},
						cardUsable: function (card, player, num) {
							if (card.name == "sha") {
								return (
									num +
									1 +
									game.countPlayer(function (current) {
										return current.hasSex("female");
									})
								);
							}
						},
					},
				},
				buff2: {
					usable: 2,
					name: "撷芳",
					locked: true,
					forced: false,
					prompt2: "是否令此伤害+X,X为场上的女性角色。",
					trigger: { source: "damageBegin" },
					filter: function (event, player) {
						// 仅【杀】造成的伤害可加伤（文案："且【杀】的伤害+X"）
						return event.card && event.card.name == "sha";
					},
					content: function () {
						var numb = game.countPlayer(function (current) {
							return current.hasSex("female");
						});
						trigger.num = trigger.num + numb + 1;
					},
					ai: {
						threaten: 1,
						order: 6,
						result: {
							player: function (game, event) {
								var x = game.countPlayer(function (current) {
									return current.hasSex("female");
								});
								return 2 * (x + 1);
							},
						},
					},
				},
			},
		},
		jl_huaman: {
			charlotte: true,
			locked: true,
			group: [
				"jl_huaman_mansi1",
				"jl_huaman_mansi2",
				"jl_huaman_mansi3",
				"jl_huaman_xili",
				"jl_huaman_xili1",
			],
			subSkill: {
				mansi_mark: {
					name: "蛮嗣",
					mark: true,
					marktext: "蛮",
					locked: true,
					intro: {
						name: "蛮嗣",
					},
					onremove: true,
				},
				mansi1: {
					name: "蛮嗣",
					locked: true,
					direct: true,
					prompt2:
						"选择至多三名其他角色，此阶段你对这些角色造成的伤害+1且你使用的【杀】、【决斗】、【火攻】可以额外选择其中一名角色为目标（每回合限触发2次）。",
					filter: function () {
						if (game.players.length < 2) return false;
						return Math.random() < 0.95;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						"step 0";
						player
							.chooseTarget(
								[1, 3],
								get.prompt("jl_huaman_mansi1"),
								function (card, player, target) {
									return player != target;
								}
							)
							.set("ai", function (target) {
								return get.attitude(player, target) <= 0;
							});
						("step 1");
						if (result.targets) {
							for (let i of result.targets)
								i.addTempSkill("jl_huaman_mansi_mark", "phaseUseAfter");
						}
					},
				},
				mansi2: {
					name: "蛮嗣",
					locked: true,
					direct: true,
					filter: function (event, player) {
						if (!player.isPhaseUsing()) return false;
						if (!["sha", "juedou", "huogong"].includes(event.card.name))
							return false;
						let t = 0,
							p = 0;
						game.players.forEach(value => {
							if (value.hasSkill("jl_huaman_mansi_mark")) t++;
						});
						if (t == 0) return false;
						event.targets.forEach(value => {
							if (value.hasSkill("jl_huaman_mansi_mark")) p++;
						});
						if (t - p < 1) return false;
						return true;
					},
					usable: 2,
					trigger: { player: "useCard" },
					content: function () {
						"step 0";
						player
							.chooseTarget("选择额外目标", function (card, player, target) {
								return (
									target.hasSkill("jl_huaman_mansi_mark") &&
									!trigger.targets.includes(target) &&
									lib.filter.targetEnabled2(
										event._trigger.card,
										player,
										target
									)
								);
							})
							.set("ai", function (target) {
								if (event._trigger.card.name != "juedou") return true;
								if (
									target.countCards("h") < 4 ||
									player.countCards("h", { name: "sha" }) > 1
								)
									return true;

								return false;
							});
						("step 1");
						if (result.targets) {
							player.logSkill("jl_huaman_mansi1");
							lib.jlX.playVoice("voice/jl_huaman_mansi1");

							trigger.targets.addArray(result.targets);
						} else {
							player.storage.counttrigger.jl_huaman_mansi2--;
							event.finish();
						}
					},
				},
				mansi3: {
					name: "蛮嗣",
					locked: true,
					direct: true,
					trigger: { source: "damageBegin" },
					filter: function (event, player) {
						return (
							player.isPhaseUsing() &&
							event.player.hasSkill("jl_huaman_mansi_mark")
						);
					},
					content: function () {
						trigger.num++;
					},
				},
				xili: {
					name: "系力",
					locked: true,
					usable: 2,
					prompt2: "和伤害来源各摸1~2张牌，然后此伤害+1。",
					trigger: { global: "damageBegin" },
					filter: function (event, player) {
						if (!event.source) return false;
						if (
							_status.currentPhase == event.source &&
							event.source != player
						) {
							player.storage.jl_huaman_xili++;
							if (Math.random() < 0.9 && player.storage.jl_huaman_xili < 3)
								return true;
						}
						return false;
					},
					content: function () {
						let n = [1, 2].randomGet();
						lib.jlX.playVoice("voice/" + event.name + "1");

						trigger.source.draw(n);
						player.draw(n);
						trigger.num++;
					},
					check: function (event, player) {
						if (
							get.attitude(player, event.player) <= 0 &&
							player != event.player
						)
							return true;
						return false;
					},
				},
				xili1: {
					trigger: { global: ["phaseBefore", "phaseAfter"] },
					locked: true,
					direct: true,
					init: function (player) {
						player.storage.jl_huaman_xili = 0;
					},
					content: function () {
						player.storage.jl_huaman_xili = 0;
					},
				},
			},
		},
		jl_wuliuqi: {
			charlotte: true,
			locked: true,
			group: ["jl_wuliuqi_feijian", "jl_wuliuqi_xuefa"],
			subSkill: {
				feijian: {
					name: "飞剪",
					trigger: { player: "phaseUseEnd" },
					locked: true,
					prompt2:
						"出牌阶段结束时，你有85%的概率可以弃置任意张装备牌（可以不弃），然后对任意名其他角色造成共计至多X+2点伤害值（X为你弃置的装备牌数），每名角色至多分配5点。",
					filter: function () {
						return Math.random() < 0.85;
					},
					check: function () {
						return true;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");
						player
							.chooseToDiscard(
								[1, Infinity],
								get.prompt2("jl_wuliuqi_feijian"),
								function (card) {
									return get.type2(card) == "equip";
								},
								"he"
							)
							.set("ai", function (card) {
								return 9 - get.value(card);
							});
						("step 1");
						event.targets = [];
						event.targets.push(player);
						if (result.cards) {
							event.feijian = result.cards.length + 2;
						} else event.feijian = 2;
						("step 2");
						player
							.chooseTarget(
								"选择一名角色造成伤害",
								function (card, player, target) {
									return !event.targets.includes(target);
								}
							)
							.set("ai", function (event, target) {
								return get.attitude(event.player, target) <= 0;
							});
						("step 3");
						if (!result.bool) {
							event.finish();
						} else {
							event.target = result.targets[0];
							event.targets.push(result.targets[0]);
							let btn = [];
							let damagenum = Math.min(event.feijian, 5);
							for (let i = 1; i <= damagenum; i++) btn.push(i + "");
							btn.push("cancel2");
							player.chooseControl(btn).set("ai", function () {
								let nm =
									event.feijian > event.target.hp
										? event.target.hp
										: event.feijian;
								nm = Math.min(nm, 5);
								return nm + "";
							});
						}
						("step 4");
						if (result.control != "cancel2") {
							event.target.damage(parseInt(result.control), player);
							event.feijian -= parseInt(result.control);
							if (event.feijian == 0) event.finish();
							event.goto(2);
						} else event.finish();
					},
				},
				xuefa: {
					name: "削发",
					locked: true,
					usable: 2,
					prompt2:
						"你对一名其他角色造成伤害后，你有90%的概率可以令该角色随机弃置2~3张牌（每回合限触发2次）。",
					trigger: { source: "damageEnd" },
					filter: function (event, player) {
						if (!event.player.isAlive()) return false;
						if (event.player == player) return false;
						return Math.random() < 0.9;
					},
					content: function () {
						let n = [2, 3].randomGet();
						lib.jlX.playVoice("voice/" + event.name + "1");

						let cards = trigger.player.getCards("he").randomGets(n);
						trigger.player.discard(cards);
					},
					check: function (trigger, player) {
						if (get.attitude(player, trigger.player) <= 0) return true;
						return false;
					},
				},
			},
		},
		jl_xiaosha: {
			charlotte: true,
			locked: true,
			group: ["jl_xiaosha_guisha", "jl_xiaosha_shuli"],
			subSkill: {
				guisha: {
					name: "瑰杀",
					forced: false,
					locked: true,
					prompt2:
						"出牌阶段开始时，你有90%的概率此阶段出杀次数增加2~4次，且使用前三张【杀】时摸等同于你此阶段使用【杀】次数的牌。",
					filter: function () {
						const numa = Math.random();
						return numa < 0.9;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.addTempSkill("jl_xiaosha_gui");
						player.storage.jl_xiaosha_gui = [2, 3, 4].randomGet();
						player.addTempSkill("jl_xiaosha_sha");
					},
				},
				gui: {
					name: "瑰杀",
					mark: true,
					locked: true,
					marktext: "瑰杀",
					onremove: true,
					intro: { content: "出杀次数增加#次" },
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name === "sha") {
								return num + player.storage.jl_xiaosha_gui;
							}
						},
					},
				},
				sha: {
					forced: true,
					locked: true,
					usable: 3,
					trigger: { player: "useCard" },
					filter: function (event, player) {
						return event.card.name === "sha";
					},
					content: function () {
						const drawNum = player.getHistory("useCard", function (evt) {
							return evt.card && evt.card.name === "sha";
						}).length;
						player.draw(drawNum);
					},
				},
				shuli: {
					name: "姝丽",
					forced: false,
					locked: true,
					prompt2:
						"结束阶段，你有95%的概率从弃牌堆获得Y张基本牌（Y为你本回合造成的伤害数且范围为3~8），然后你可以将其中的牌交给任意名角色每人一张。",
					trigger: {
						player: "phaseJieshuBegin",
					},
					filter: function () {
						const numa = Math.random();
						return numa < 0.95;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						let damage = player.getStat("damage") || 0;
						event.damage = damage < 3 ? 3 : damage > 8 ? 8 : damage;
						event.gainList = [];
						event.giveList = [];
						("step 1");
						// 一次性从弃牌堆获得至多 event.damage 张基本牌（逐张获得观感不符文案）
						const cards = [];
						while (cards.length < event.damage) {
							const card = get.discardPile(function (card) {
								return (
									get.type(card) === "basic" &&
									!cards.includes(card)
								);
							});
							if (!card) break;
							cards.push(card);
						}
						event.gainList = cards;
						if (cards.length) player.gain(cards, "gain2");
						("step 2");
						if (
							!player.getCards("h").some(function (card) {
								return event.gainList.includes(card);
							}) ||
							!game.hasPlayer(function (current) {
								return current != player && !event.giveList.includes(current);
							})
						) {
							event.finish();
						} else {
							player.chooseCardTarget({
								filterCard: function (card) {
									return event.gainList.includes(card) && player.getCards("h").includes(card);
								},
								selectCard: 1,
								filterTarget: function (card, player, target) {
									return target != player && !event.giveList.includes(target);
								},
								prompt: "选择要交给其他角色的牌（可取消）",
								ai1: function (card) {
									return 10 - get.value(card);
								},
								ai2: function (target) {
									return get.attitude(player, target);
								},
							});
						}
						("step 3");
						if (result.bool) {
							event.giveList.push(result.targets[0]);
							result.targets[0].gain(result.cards, player, "giveAuto");
							if (
								player.getCards("h").some(function (card) {
									return event.gainList.includes(card);
								}) &&
								game.hasPlayer(function (current) {
									return current != player && !event.giveList.includes(current);
								})
							)
								event.goto(2);
						}
					},
				},
			},
		},
		jl_shencaocao: {
			charlotte: true,
			locked: true,
			group: ["jl_shencaocao_feiying", "jl_shencaocao_feiying_clear", "jl_shencaocao_guixin"],
			subSkill: {
				feiying: {
					name: "飞影",
					audio: false,
					forced: false,
					locked: true,
					trigger: {
						global: "phaseZhunbeiBegin",
					},
					prompt2:
						"其他角色的准备阶段，你有95%的概率令其本回合计算与你的距离+2且你摸1~2张牌并回复1点体力（每轮限两次）。",
					filter: function (event, player) {
						return (
							Math.random() < 0.95 &&
							event.player !== player &&
							!player.hasSkill("jl_shencaocao_count2")
						);
					},
					check: function (event, player) {
						return get.attitude(player, event.player) <= 0;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");
						if (player.hasSkill("jl_shencaocao_count1"))
							player.addTempSkill("jl_shencaocao_count2", "roundStart");
						else player.addTempSkill("jl_shencaocao_count1", "roundStart");
						("step 1");
						event._trigger.player.addTempSkill("jl_shencaocao_range");
						event._trigger.player.storage.feiying = player;
						// "飞"字标记：提示该角色本回合计算与你的距离+2（其回合结束自动清除）
						event._trigger.player.storage.jl_shencaocao_feiying_mark =
							player;
						event._trigger.player.markSkill(
							"jl_shencaocao_feiying_mark"
						);
						player.draw([1, 2].randomGet());
						player.recover();
					},
					subSkill: {},
				},
				count1: {},
				count2: {},
				range: {
					mod: {
						globalFrom: function (from, to, num) {
							if (to === from.storage.feiying) {
								return num + 2;
							}
						},
					},
				},
				feiying_mark: {
					marktext: "飞",
					intro: {
						name: "飞影",
						content: function (storage, player) {
							return (
								"本回合计算与" +
								(storage
									? get.translation(storage)
									: "你") +
								"的距离+2"
							);
						},
					},
				},
				feiying_clear: {
					trigger: {
						global: "phaseEnd",
					},
					forced: true,
					silent: true,
					filter: function (event, player) {
						return event.player.storage.jl_shencaocao_feiying_mark;
					},
					content: async function (event, trigger, player) {
						event.player.unmarkSkill("jl_shencaocao_feiying_mark");
						event.player.removeSkill("jl_shencaocao_range");
						delete event.player.storage.jl_shencaocao_feiying_mark;
						delete event.player.storage.feiying;
					},
				},
				guixin: {
					name: "归心",
					audio: false,
					forced: false,
					locked: true,
					trigger: {
						player: "phaseJieshuBegin",
					},
					prompt2:
						"结束阶段，你有95%的概率可以随机获得任意名角色每人一张手牌，然后这些角色再随机弃置一张装备区里的牌，因此失去最后一张手牌或装备区的牌的角色失去1点体力。",
					filter: function (event, player) {
						return Math.random() < 0.95;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");
						player
							.chooseTarget(
								get.prompt("jl_shencaocao_guixin"),
								[1, Infinity],
								function (card, player, target) {
									// 不能以自己为目标
									return target != player;
								}
							)
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target) <= 0;
							});
						("step 1");
						if (result.targets) {
							const targets = result.targets;
							targets.sort(lib.sort.seat);
							event.targets = targets;
							event.count = trigger.num;
							event.loseLastH = [];
							event.loseLastE = [];
						} else event.finish();
						("step 2");
						event.num = 0;
						player.line(event.targets, "green");
						("step 3");
						if (event.num < event.targets.length) {
							const h = event.targets[event.num].getCards("h");
							if (h.length) {
								if (h.length === 1) {
									event.loseLastH.push(event.targets[event.num]);
								}
								const card = h.randomGet();
								// "giveAuto" 动画：牌从目标角色手牌区飞向自己（与顺手牵羊一致）
								player.gain(card, event.targets[event.num], "giveAuto");
							}
							event.num++;
							event.redo();
						}
						("step 4");
						for (const target of event.loseLastH) {
							target.loseHp();
						}
						event.num = 0;
						("step 5");
						if (event.num < event.targets.length) {
							const e = event.targets[event.num].getCards("e");
							if (e.length) {
								if (e.length === 1) {
									event.loseLastE.push(event.targets[event.num]);
								}
								const card = e.randomGet();
								event.targets[event.num].discard(card);
							}
							event.num++;
							event.redo();
						}
						("step 6");
						for (const target of event.loseLastE) {
							target.loseHp();
						}
					},
				},
			},
		},
		jl_caoying: {
			charlotte: true,
			locked: true,
			group: ["jl_caoying_lingren", "jl_caoying_fujian", "jl_caoying_lingrena"],
			subSkill: {
				lingren: {
					name: "凌人",
					usable: 2,
					trigger: {
						player: "useCardToPlayered",
					},
					check: function (event, player) {
						return 1;
					},
					filter: function (event, player) {
						if (event.getParent().triggeredTargets3.length > 1) return false;
						//if(!player.isPhaseUsing()) return false;
						if (!["basic", "trick"].includes(get.type(event.card)))
							return false;
						if (Math.random() > 0.85) return false;
						if (get.tag(event.card, "damage")) return true;
						return false;
					},
					direct: true,
					preHidden: true,
					content: function () {
						"step 0";
						player
							.chooseTarget(
								"是否发动【凌人】？",
								function (event, player, target) {
									return trigger.targets.includes(target);
								}
							)
							.set("ai", function (target) {
								return get.attitude(player, target) <= 0;
							})
							.set(
								"prompt2",
								"你使用【杀】或伤害类锦囊牌指定目标后，你有85%的概率选择其中一个目标使此牌对其伤害+1~2然后你摸1~3张牌，并且你获得“奸雄”、“行殇”直到你下回合开始。（每回合限触发2次）"
							);

						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							event.target = result.targets[0];
							player.logSkill("jl_caoying_lingren", event.target);
							event.target.addTempSkill("jl_caoyingewss", {
								player: "damageAfter",
								global: "useCardAfter",
							});
						} else {
							player.storage.counttrigger.jl_caoying_lingren--;
							event.finish();
						}
						("step 2");
						var numb = [1, 2, 3].randomGet();
						player.draw(numb);
						// lingren_jianxiong / lingren_xingshang 是曹婴【奸雄】【行殇】的语音别名（audioname2）而非技能名，
						// 10thjl 误将其当作技能添加导致此处实际未获得任何技能；
						// 奸雄维持界版（new_rejianxiong，用户确认效果不改）；行殇按指定用标版（shenhua xingshang，即标曹丕技能），
						// 标版技能自带 caoying 语音别名；preHidden 仅提供 UI 暗置入口、默认亮出可正常触发
						player.addTempSkill("new_rejianxiong", { player: "phaseBegin" });
						player.addTempSkill("xingshang", { player: "phaseBegin" });
					},
				},
				lingrena: {
					popup: false,
					trigger: {
						player: "useCardAfter",
					},
					frequent: true,
					content: function () {
						game.countPlayer(function (current) {
							if (current.hasSkill("jl_caoyingewss")) {
								current.removeSkill("jl_caoyingewss");
							}
						});
					},
				},
				fujian: {
					name: "伏间",
					trigger: {
						player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
					},
					filter: function (event, player) {
						if (Math.random() > 0.9) return false;
						var num = game.countPlayer(function (current) {
							return current != player && current.countCards("h") > 0;
						});
						if (num > 0) return true;
						return false;
					},
					check: function (event, player) {
						var num1 = game.countPlayer(function (current) {
							return get.attitude(player, current) <= 0;
						});
						if (num1 > 0) return true;
						return false;
					},
					direct: true,
					preHidden: true,
					content: function () {
						"step 0";
						player
							.chooseTarget(
								"是否发动【伏间】？",
								function (card, player, target) {
									return player != target && target.countCards("h") > 0;
								}
							)
							.set("ai", function (target) {
								return get.attitude(player, target) <= 0;
							})
							.set(
								"prompt2",
								"你的回合开始时或结束时，你可以观看一名其他角色的手牌，然后你可以获得其中至多两张牌，若颜色相同，对其造成一点伤害。"
							);
						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							let t = result.targets[0];
							event.t = t;
							let fujian1 = t.getCards();
							event.tmp = [];
							if (!event.choosefujian) {
								let set = { spade: 0, heart: 0, diamond: 0, club: 0 };
								let fujiancard = {
									spade: [],
									heart: [],
									diamond: [],
									club: [],
								};
								let set1 = [];
								let color = "";
								for (let item of fujian1) {
									// 花色键分组必须用 get.suit（get.color 返回红黑，会命中不存在的键）
									color = get.suit(item);
									set[color]++;
									fujiancard[color].push(item);
								}
								for (let i in set) {
									if (set[i] > 1) {
										set1.push(fujiancard[i]);
									}
								}
								if (set1.length) {
									event.choosefujian = set1.randomGet();
								}
							}
							player
								.chooseCardButton(
									"选择" +
										get.translation(t) +
										"的1~2张手牌并获得之，若颜色相同则" +
										get.translation(t) +
										"受到一点伤害",
									t.getCards("h"),
									[1, 2]
								)
								.set("ai", function (card) {
									if (event.choosefujian) {
										return event.choosefujian.includes(card);
									}
									return true;
								});
						} else {
							event.finish();
						}
						("step 2");
						if (result.bool) {
							player.logSkill(event.name, event.t);
							game.log(player, "获得了", event.t, result.links.length, "张牌");
							var color = [];
							result.links.forEach(item => {
								if (!color.includes(get.color(item)))
									color.push(get.color(item));
							});
							player.gain(result.links, "giveAuto");
							// 单张牌颜色也相同：只要所获牌颜色一致即造成伤害
							if (color.length == 1) event.t.damage();
						}
					},
				},
			},
		},
		jl_zhugeguo: {
			charlotte: true,
			locked: true,
			group: ["jl_zhugeguo_qirang", "jl_zhugeguo_count", "jl_zhugeguo_yuhua"],
			subSkill: {
				qirang: {
					name: "祈禳",
					forced: false,
					locked: true,
					usable: 2,
					prompt2: "获得2~4张锦囊牌",
					filter: function (event, player, name) {
						var numa = Math.random();
						if (numa >= 0.95) return false;
						if (get.type(event.card) == "trick") return false;
						var history = player.getHistory("useCard", function (evt) {
							return get.type(evt.card) == "basic";
						});
						if (get.type(event.card) == "basic")
							return history.length == 1 && history[0] == event;
						if (get.type(event.card) == "equip") return true;
					},
					trigger: { player: ["useCard"] },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						var i = 0;
						var list = [];
						var numb = [2, 3, 4].randomGet();
						while (i++ < numb) {
							var card = get.cardPile2(function (card) {
								if (get.type(card) != "trick") return false;
								if (!list.includes(card)) return true;
							});
							if (card) list.push(card);
							else {
								var card = get.discardPile(function (card) {
									if (get.type(card) != "trick") return false;
									if (!list.includes(card)) return true;
								});
								if (card) list.push(card);
							}
						}
						event.list = list;
						player.gain(event.list, "gain2");
						if (_status.currentPhase != player)
							player.storage.counttrigger.jl_zhugeguo_qirang++;
					},
				},
				count: {
					forced: true,
					locked: true,
					popup: false,
					filter: function (event) {
						return get.type(event.card, "trick") == "trick";
					},
					trigger: { player: "useCardAfter" },
					content: function () {
						player.getHistory("custom").push({ count: true });
					},
				},
				yuhua: {
					name: "羽化",
					forced: false,
					locked: true,
					prompt2: function (event, player) {
						var numb = player.getHistory("custom", function (evt) {
							return evt.count == true;
						}).length;
						var numc;
						if (numb > 4) numc = numb;
						else numc = 4;
						return "观看牌堆顶" + numc + "张牌，然后获得其中至多三张牌";
					},
					trigger: { player: "phaseJieshuBegin" },
					filter: function (event, player) {
						if (Math.random() > 0.95) return false;
						return true;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						var numb = player.getHistory("custom", function (evt) {
							return evt.count == true;
						}).length;
						var numc;
						if (numb > 4) numc = numb;
						else numc = 4;
						event.list = [];
						event.cards = get.cards(numc);
						("step 1");
						player
							.chooseCardButton(
								[1, 3],
								event.cards,
								"请选择要获得的至多三张牌，然后若这三张牌花色均不同，你随机对与你阵营不同的一名其他角色造成1-2点伤害。"
							)
							.set("ai", function (button) {
								return 100 - get.value(button.link);
							});
						("step 2");
						if (result.bool) {
							event.list = result.links.slice(0);
							var list = event.list;
							player.gain(list, "draw");
							for (var i = 0; i < list.length; i++) {
								event.cards.remove(list[i]);
							}
						}
						for (var i = 0; i < event.cards.length; i++) {
							ui.cardPile.insertBefore(
								event.cards[i],
								ui.cardPile.firstChild
							);
						}
						("step 3");
						// 花色判定仅在拿满三张时成立（"若这三张牌花色均不同"）
						if (event.list.length == 3) {
							var suita = get.suit(event.list[0]);
							var suitb = get.suit(event.list[1]);
							var suitc = get.suit(event.list[2]);
							if (suita != suitb && suita != suitc && suitb != suitc) {
								player.chooseBool(
									"是否随机对与你阵营不同的一名其他角色造成1-2点伤害"
								);
							} else event.finish();
						} else event.finish();
						("step 4");
						if (result.bool) {
							var target = game
								.filterPlayer(function (current) {
									return (
										!player.getFriends().includes(current) &&
										current != player
									);
								})
								.randomGet();
							const numd = [1, 2].randomGet();
							if (target) {
								player.line(target, "fire");
								target.damage(numd, "nocard");
							}
						}
					},
				},
			},
		},
		jl_nianshou: {
			charlotte: true,
			locked: true,
			group: ["jl_nianshou_fange", "jl_nianshou_xunlie"],
			subSkill: {
				fange: {
					name: "反戈",
					audio: false,
					forced: false,
					locked: true,
					prompt2: "摸2张牌，获得伤害来源1~2张牌，再对伤害来源造成1点伤害。",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: { player: "damageEnd" },
					logTarget: "source",
					content: function () {
						player.draw(2);
						if (trigger.source) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							player.line(trigger.source, "gold");
							// "一至两张"：玩家在 1~2 张间自选（非随机上限）
							player.gainPlayerCard(
								"选择获得其一至两张牌",
								trigger.source,
								"he",
								[1, 2]
							);
							player.line(trigger.source, "fire");
							const damage = [1, 2].randomGet();
							trigger.source.damage(damage, "nocard");
						}
					},
					check: function (event, player) {
						return get.attitude(player, event.source) <= 0;
					},
					ai: {
						maixie_defend: true,
						expose: 0.4,
					},
				},
				xunlie: {
					name: "寻猎",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"选择令当前回合角色回复1点体力并摸两张牌；或对其造成1点伤害并随机弃置两张牌",
					trigger: { global: "phaseJieshuBegin" },
					filter: function (event, player) {
						var numa = Math.random();
						return (
							numa < 0.95 &&
							event.player.isAlive() &&
							!player.hasSkill("jl_nianshou_count2")
						);
					},
					content: function () {
						"step 0";
						player
							.chooseControl("选项一", "选项二", "cancel2")
							.set(
								"prompt",
								"选项一：令其回复1点体力并摸两张牌；选项二：对其造成1点伤害并随机弃置两张牌"
							)
							.set("ai", function () {
								if (get.attitude(player, trigger.player) < 0)
									return "选项二";
								if (get.attitude(player, trigger.player) > 0)
									return "选项一";
							});
						("step 1");
						if (result.control == "选项一") {
							lib.jlX.playVoice("voice/" + event.name + "1");

							if (player.hasSkill("jl_nianshou_count1"))
								player.addTempSkill("jl_nianshou_count2", "roundStart");
							else player.addTempSkill("jl_nianshou_count1", "roundStart");
							player.line(trigger.player, "green");
							trigger.player.recover();
							player.line(trigger.player, "green");
							trigger.player.draw(2);
						}
						if (result.control == "选项二") {
							lib.jlX.playVoice("voice/" + event.name + "1");

							if (player.hasSkill("jl_nianshou_count1"))
								player.addTempSkill("jl_nianshou_count2", "roundStart");
							else player.addTempSkill("jl_nianshou_count1", "roundStart");
							player.line(trigger.player, "fire");
							trigger.player.damage("nocard");
							var cards = trigger.player.getCards("he").randomGets(2);
							player.line(trigger.player, "fire");
							trigger.player.discard(cards);
						}
						if (result.control == "cancel2") event.finish();
					},
					check: function (event, player) {
						return get.attitude(player, _status.currentPhase) != 0;
					},
				},
				count1: {},
				count2: {},
			},
		},
		jl_shenzhaoyun: {
			charlotte: true,
			locked: true,
			group: [
				"jl_shenzhaoyun_juejing",
				"jl_shenzhaoyun_longhun1",
				"jl_shenzhaoyun_longhun2",
			],
			subSkill: {
				juejing: {
					name: "绝境",
					forced: false,
					locked: true,
					usable: 3,
					prompt2: "摸2~4张牌并回复1点体力",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: {
						player: [
							"phaseZhunbeiBegin",
							"dying",
							"dyingAfter",
							"phaseJieshuBegin",
						],
					},
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						var numb = [2, 3, 4].randomGet();
						player.draw(numb);
						player.recover();
					},
				},
				longhun1: {
					name: "龙魂",
					forced: false,
					locked: true,
					prompt2: "获得当前回合角色至多两张牌",
					filter: function (event) {
						var numa = Math.random();
						if (numa >= 0.9) return false;
						var card = event.card;
						return card.name == "shan" || card.name == "wuxie";
					},
					trigger: { player: "useCard" },
					content: function () {
						lib.jlX.playVoice("voice/jl_shenzhaoyun_longhun1");

						player.line(_status.currentPhase, "gold");
						player.logSkill("jl_shenzhaoyun_longhun1", _status.currentPhase); //ppppppppppppppppppppppppppppppppppp
						player.gainPlayerCard(_status.currentPhase, "he", [1, 2]);
					},
					check: function (event, player) {
						return get.attitude(player, _status.currentPhase) <= 0;
					},
				},
				longhun2: {
					name: "龙魂",
					forced: false,
					locked: true,
					prompt2: "令此牌基数+1~3",
					filter: function (event) {
						var numa = Math.random();
						if (numa >= 0.9) return false;
						var card = event.card;
						return card.name == "sha" || card.name == "tao";
					},
					trigger: { player: "useCard" },
					content: function () {
						lib.jlX.playVoice("voice/jl_shenzhaoyun_longhun1");

						var numb = [1, 2, 3].randomGet();
						trigger.baseDamage += numb;
					},
					check: function (event, player, card) {
						if (event.card.name == "sha")
							return get.attitude(player, event.target) <= 0;
						if (event.card.name == "tao") return true;
					},
				},
			},
		},
		jl_lingju: {
			charlotte: true,
			locked: true,
			group: ["jl_lingju_jieyuan1", "jl_lingju_jieyuan2", "jl_lingju_fenxin"],
			subSkill: {
				jieyuan1: {
					name: "竭缘",
					forced: false,
					locked: true,
					usable: 1,
					prompt2: "令受到的伤害-1~2",
					filter: function () {
						var numa = Math.random();
						return numa < 0.85;
					},
					trigger: { player: "damageBegin4" },
					content: function () {
						lib.jlX.playVoice("voice/jl_lingju_jieyuan1");

						var numb = [1, 2].randomGet();
						trigger.num = trigger.num - numb;
					},
				},
				jieyuan2: {
					name: "竭缘",
					forced: false,
					locked: true,
					prompt2: "令造成的伤害+1~2",
					usable: 1,
					filter: function () {
						var numa = Math.random();
						return numa < 0.85;
					},
					trigger: { source: "damageBegin1" },
					content: function () {
						lib.jlX.playVoice("voice/jl_lingju_jieyuan1");

						var numb = [1, 2].randomGet();
						trigger.num = trigger.num + numb;
					},
					check: function (event, player) {
						// 伤害事件用 event.player 表示受伤者（无 target 字段）
						return get.attitude(player, event.player) <= 0;
					},
				},
				fenxin: {
					name: "焚心",
					forced: false,
					locked: true,
					usable: 1,
					prompt2: "摸3~5张牌并回复1~2点体力",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: { global: "dying" },
					content: function () {
						lib.jlX.playVoice("voice/jl_lingju_fenxin1");

						var numb = [3, 4, 5].randomGet();
						var numc = [1, 2].randomGet();
						player.draw(numb);
						player.recover(numc);
					},
				},
			},
		},
		jl_shenzhouyu: {
			charlotte: true,
			locked: true,
			group: ["jl_shenzhouyu_yeyan", "jl_shenzhouyu_qinyin"],
			subSkill: {
				qinyin: {
					name: "琴音",
					forced: false,
					locked: true,
					direct: true,
					preHidden: true,
					prompt2: "选择两名角色各回复或失去一点体力",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: { player: "phaseJieshuBegin" },
					content: function () {
						"step 0";
						event.num = 0;
						event.targets = [];
						("step 1");
						player
							.chooseTarget(get.prompt("jl_shenzhouyu_qinyin"), [2, 2])
							.set(
								"prompt2",
								"选择两名角色各回复或失去一点体力"
							)
							.set("ai", function (target) {
								var att2 = get.attitude(_status.event.player, target);
								if (att2 <= 0) return Math.max(5.5 + att2 * target.hp, 1);
								else if (att2 > 0 && target.maxHp > target.hp)
									return Math.max(4 - att2 * target.hp, 1);
								else return -1;
							});
						("step 2");
						if (result.bool) {
							result.targets.sortBySeat();
							lib.jlX.playVoice(
								"voice/jl_shenzhouyu_qinyin1"
							);

							player.logSkill("jl_shenzhouyu_qinyin", result.targets);
							var targets = result.targets;
							event.targets = targets;
						} else event.finish();
						("step 3");
						if (event.num < targets.length) {
							player
								.chooseControl("回复体力", "失去体力", "cancel2")
								.set(
									"prompt",
									"目标角色：" + get.translation(targets[event.num])
								)
								.set("ai", function () {
									var att = get.attitude(
										_status.event.player,
										targets[event.num]
									);
									if (att <= 0) return "失去体力";
									else if (att > 0) return "回复体力";
								});
						} else event.finish();
						("step 4");
						if (result.control == "回复体力") {
							player.line(targets[event.num], "green");
							targets[event.num].recover();
							event.num++;
						}
						if (result.control == "失去体力") {
							player.line(targets[event.num], "fire");
							targets[event.num].loseHp();
							event.num++;
						}
						if (result.control == "cancel2") {
							event.num++;
							event.goto(3);
						}
						("step 5");
						event.goto(3);
					},
				},
				yeyan: {
					name: "业炎",
					forced: false,
					locked: true,
					direct: true,
					preHidden: true,
					prompt2: "对至多两名角色各造成两点伤害",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						"step 0";
						player
							.chooseTarget(get.prompt("jl_shenzhouyu_yeyan"), [1, 2])
							.set(
								"prompt2",
								"对至多两名角色各造成两点伤害"
							)
							.set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								if (att <= 0)
									return Math.max(att * (target.hp - 6), att * -1);
								else return -1;
							});
						("step 1");
						if (result.targets) {
							result.targets.sortBySeat();
							lib.jlX.playVoice("voice/" + event.name + "1");

							player.logSkill("jl_shenzhouyu_yeyan", result.targets);
							player.line(result.targets, "fire");
							for (var i = 0; i < result.targets.length; i++) {
								result.targets[i].damage(2, "fire", "nocard");
							}
						}
					},
				},
			},
		},
		jl_zhangxingcai: {
			charlotte: true,
			locked: true,
			group: ["jl_zhangxingcai_shenxian", "jl_zhangxingcai_qiangwu"],
			subSkill: {
				shenxian: {
					name: "甚贤",
					forced: false,
					usable: 2,
					prompt2: "摸1~2张牌(每回合限2次)",
					trigger: { global: "loseAfter" },
					filter: function (event, player) {
						if (
							event.type != "discard" ||
							event.player == player ||
							_status.currentPhase == player
						)
							return false;
						if (!event.cards || !event.cards.some(function (card) {
							return get.type(card) == "basic";
						}))
							return false;
						var numa = Math.random();
						return numa < 0.85;
					},
					content: function () {
						"step 0";
						if (trigger.delay == false) game.delay();
						("step 1");
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.draw([2, 1].randomGet());
					},
					ai: {
						threaten: 2.5,
						order: 6,
						result: {
							player: function () {
								return 1.5;
							},
						},
					},
				},
				qiangwu: {
					name: "枪舞",
					direct: false,
					prompt2: "本回合内使用【杀】的次数上限+2~3，且使用【杀】无距离限制。",
					trigger: { player: "phaseUseBegin" },
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.95;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.addTempSkill("jl_zhangxingcai_buff");
						player.storage.jl_zhangxingcai_buff = [2, 3].randomGet();
					},
					ai: {
						threaten: 1,
						order: 6,
						result: {
							player: function () {
								return 2;
							},
						},
					},
				},

				buff: {
					mark: true,
					marktext: "舞",
					locked: true,
					onremove: true,
					intro: {
						name: "枪舞",
						content: "本回合内使用【杀】的次数上限+#，且使用【杀】无距离限制。",
					},
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name == "sha") {
								return num + player.storage.jl_zhangxingcai_buff;
							}
						},
						targetInRange: function (card, player) {
							if (card.name == "sha") return true;
						},
					},
				},
			},
		},
		jl_zhangfei: {
			charlotte: true,
			locked: true,
			group: ["jl_zhangfei_paoxiao", "jl_zhangfei_tishen"],
			subSkill: {
				paoxiao: {
					name: "咆哮",
					direct: false,
					prompt2: "令本回合出【杀】次数+1~5张牌，且无距离限制？",
					trigger: { player: "phaseUseBegin" },
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.85;
					},
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.addTempSkill("jl_zhangfei_buff");
						player.storage.jl_zhangfei_buff = [1, 2, 3, 4, 5].randomGet();
					},
					ai: {
						threaten: 1.2,
						order: 6,
						result: {
							player: function () {
								return 2;
							},
						},
					},
				},
				buff: {
					mark: true,
					marktext: "咆",
					locked: true,
					onremove: true,
					intro: {
						name: "咆哮",
						content: "本回合内使用【杀】的次数上限+#，且使用【杀】无距离限制。",
					},
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name == "sha") {
								return num + player.storage.jl_zhangfei_buff;
							}
						},
						targetInRange: function (card, player) {
							if (card.name == "sha") return true;
						},
					},
				},
				tishen: {
					name: "替身",
					forced: false,
					prompt2: "是否回复1体力并摸1~3张牌？（每轮限3次）",
					trigger: { player: "damageAfter" },
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.8 && !player.hasSkill("jl_zhangfei_count3");
					},
					content: function () {
						"step 0";
						if (player.hasSkill("jl_zhangfei_count2"))
							player.addTempSkill("jl_zhangfei_count3", "roundStart");
						else if (player.hasSkill("jl_zhangfei_count1"))
							player.addTempSkill("jl_zhangfei_count2", "roundStart");
						else player.addTempSkill("jl_zhangfei_count1", "roundStart");
						("step 1");
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.recover();
						player.draw([1, 2, 3].randomGet());
					},
					ai: {
						threaten: 2,
						order: 6,
						result: {
							player: function () {
								return 3.5;
							},
						},
					},
				},
				count1: {},
				count2: {},
				count3: {},
			},
		},
		jl_sunshangxiang: {
			charlotte: true,
			locked: true,
			group: ["jl_sunshangxiang_jieyin", "jl_sunshangxiang_xiaoji"],
			subSkill: {
				jieyin: {
					name: "结姻",
					trigger: {
						player: "phaseUseBegin",
					},
					prompt2:
						"令你和一名其他角色回复1点体力并摸1~2张牌",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.8;
					},
					content: function () {
						"step 0";
						player
							.chooseTarget(function (card, player, target) {
								return player != target;
							})
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target) > 0;
							})
							.set("prompt", "请选择【结姻】的目标")
							.set(
								"prompt2",
								"令你和一名其他角色回复1点体力并摸1~2张牌"
							);
						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							var num = [1, 2].randomGet();
							player.recover();
							result.targets[0].recover();
							player.draw(num);
							result.targets[0].draw(num);
						}
					},
				},
				xiaoji: {
					name: "枭姬",
					trigger: {
						player: "loseAfter",
						global: [
							"equipAfter",
							"addJudgeAfter",
							"gainAfter",
							"loseAsyncAfter",
						],
					},
					prompt2: "摸1~2张牌（每轮限四次）",
					usable: 4,
					filter: function (event, player) {
						var evt = event.getl(player);
						var numa = Math.random();
						if (numa > 0.85) return false;
						return evt && evt.player == player && evt.es && evt.es.length > 0;
					},
					content: function () {
						"step 0";
						event.count = trigger.getl(player).es.length;
						("step 1");
						event.count--;
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.draw([1, 2].randomGet());
						("step 2");
						if (event.count > 0) {
							player
								.chooseBool(get.prompt2("jl_sunshangxiang_xiaoji"))
								.set("frequentSkill", "jl_sunshangxiang_xiaoji").ai = lib.filter.all;
						}
						("step 3");
						if (event.count > 0 && result.bool) {
							player.logSkill("jl_sunshangxiang_xiaoji");
							event.goto(1);
						}
					},
					ai: {
						noe: true,
						reverseEquip: true,
						effect: {
							target: function (card, player, target, current) {
								if (
									get.type(card) == "equip" &&
									!get.cardtag(card, "gifts")
								)
									return [1, 3];
							},
						},
					},
				},
			},
		},
		jl_lvbu: {
			charlotte: true,
			locked: true,
			group: ["jl_lvbu_wushuang", "jl_lvbu_liyu"],
			subSkill: {
				wushuang: {
					name: "无双",
					forced: false,
					locked: true,
					usable: 2,
					prompt2:
						"你使用的【杀】有85%的概率不能被抵消并无视防具，且在结算后将此【杀】收回并获得弃牌堆中一张【决斗】。（每回合限触发两次）",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.85 && event.card.name == "sha";
					},
					shaRelated: true,
					trigger: { player: "useCardToPlayered" },
					logTarget: "target",
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						trigger.getParent().directHit.push(trigger.target);
						trigger.target.addTempSkill("qinggang2");
						trigger.target.storage.qinggang2.add(trigger.card);
						player.addTempSkill("jl_lvbu_buff", {
							player: "phaseEnd",
						});
					},
				},
				buff: {
					name: "无双",
					forced: true,
					locked: true,
					filter: function (event, player) {
						return (
							event.card.name == "sha" &&
							get.itemtype(event.cards) == "cards" &&
							get.position(event.cards[0], true) == "o"
						);
					},
					priority: 9,
					trigger: { player: "useCardAfter" },
					content: function () {
						"step 0";
						player.gain(trigger.cards, "gain2");
						var cardx = get.discardPile(function (card) {
							if (card.name == "juedou") return true;
						});
						if (cardx) player.gain(cardx, "gain2");
						("step 1");
						player.removeSkill("jl_lvbu_buff");
					},
				},
				liyu: {
					name: "利驭",
					forced: false,
					locked: true,
					usable: 3,
					prompt2: "获得目标角色区域内一张牌，并对其造成一点伤害",
					trigger: { source: "damageSource" },
					filter: function (event, player) {
						if (event._notrigger.includes(event.player)) return false;
						// 仅"使用牌造成的伤害"可触发（非牌伤害如技能伤害、追加伤害不触发）
						if (!event.card) return false;
						var numa = Math.random();
						return (
							numa < 0.85 &&
							event.player != player &&
							event.player.isAlive() &&
							event.player.countGainableCards(player, "hej") > 0
						);
					},
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player
							.gainPlayerCard(
								get.prompt("jl_lvbu_liyu", trigger.player),
								trigger.player,
								"hej",
								"visibleMove"
							)
							.player.line(trigger.targets, "red");
						trigger.player.damage("nocard");
					},
				},
			},
		},
		jl_zhoufei: {
			charlotte: true,
			locked: true,
			group: [
				"jl_zhoufei_liangyin",
				"jl_zhoufei_kongshengBegin",
				"jl_zhoufei_kongshengEnd",
			],
			subSkill: {
				liangyin: {
					name: "良姻",
					forced: false,
					locked: true,
					usable: 2,
					prompt2: "令一名角色摸1~3张牌。",
					filter: function (event, player) {
						var numa = Math.random();
						if (numa >= 0.85) return false;
						if (event.name == "lose" || event.name == "loseAsync")
							return event.getlx !== false && event.toStorage;
						if (event.name == "gain") return event.fromStorage;
						if (event.name == "cardsGotoSpecial") return !event.notrigger;
						return true;
					},
					trigger: {
						global: [
							"gainAfter",
							"loseAfter",
							"addToExpansionAfter",
							"cardsGotoSpecialAfter",
							"loseAsyncAfter",
						],
					},
					content: function () {
						"step 0";
						player
							.chooseTarget("选择一名角色")
							.set(
								"prompt2",
								"令一名角色摸1~3张牌"
							)
							.set("ai", function (target) {
								return get.attitude(player, target);
							});
						("step 1");
						if (result.targets) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							var numb = [1, 2, 3].randomGet();
							player.line(result.targets);
							result.targets[0].draw(numb);
						}
					},
				},
				kongshengBegin: {
					name: "箜声",
					forced: false,
					locked: true,
					prompt2: "随机获得弃牌堆中四张牌名不同的牌,回合结束时弃置这些牌",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.85;
					},
					trigger: { player: "phaseZhunbeiBegin" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/jl_zhoufei_kongsheng1");

						event.list = [];
						event.num = 0;
						("step 1");
						var candidates = [];
						for (var i = 0; i < ui.discardPile.childNodes.length; i++) {
							var cardx = ui.discardPile.childNodes[i];
							if (
								cardx.classList.contains("removing") ||
								cardx.classList.contains("feichu") ||
								cardx.destroyed
							)
								continue;
							if (event.list.includes(cardx)) continue;
							var dup = false;
							for (var j = 0; j < event.list.length; j++) {
								if (cardx.name == event.list[j].name) {
									dup = true;
									break;
								}
							}
							if (!dup) candidates.push(cardx);
						}
						var card = candidates.randomGet();
						if (card) event.list.push(card);
						event.num++;
						("step 2");
						if (event.num < 4) event.goto(1);
						("step 3");
						if (!player.storage.jl_zhoufei_kongshengBegin)
							player.storage.jl_zhoufei_kongshengBegin = [];
						for (var i = 0; i < 4; i++) {
							player.storage.jl_zhoufei_kongshengBegin[i] = event.list[i];
						}
						// 带"箜声"标记获得：牌面标注结束阶段需弃置（弃置时会手动清除）
						player.gain({
							cards: event.list,
							animate: "gain2",
							gaintag: ["箜声"],
						});
					},
				},
				kongshengEnd: {
					name: "箜声",
					forced: true,
					locked: true,
					filter: function (event, player) {
						if (!player.storage.jl_zhoufei_kongshengBegin) return false;
						return true;
					},
					trigger: { player: "phaseJieshuBegin" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/jl_zhoufei_kongsheng1");

						var cards = player.getCards("h");
						var list = player.storage.jl_zhoufei_kongshengBegin;
						event.list = [];
						for (var i = 0; i < 4; i++) {
							if (cards.includes(list[i])) event.list.push(list[i]);
						}
						("step 1");
						// 弃置前清除"箜声"标记（引擎弃置不清除 gaintag，避免残留影响后续获得这些牌的角色）
						for (var i = 0; i < event.list.length; i++) {
							if (event.list[i].removeGaintag)
								event.list[i].removeGaintag(true);
						}
						player.discard(event.list);
						("step 2");
						delete player.storage.jl_zhoufei_kongshengBegin;
					},
				},
			},
		},
		jl_menghuo: {
			charlotte: true,
			locked: true,
			group: ["jl_menghuo_zaiqi", "jl_menghuo_huoshou"],
			subSkill: {
				zaiqi: {
					name: "再起",
					forced: false,
					locked: true,
					prompt2: "亮出牌堆顶一张牌，如果不是黑桃，你回复1点体力并获得此牌。",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.95;
					},
					trigger: { player: "phaseDrawBegin1" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						event.card = get.cards(1);
						game.cardsGotoOrdering(event.card);
						player.showCards(event.card);
						("step 1");
						if (get.suit(event.card[0]) != "spade") {
							player.recover();
							player.gain(event.card[0], "gain2");
						} else event.finish();
					},
				},
				huoshou: {
					name: "祸首",
					forced: false,
					locked: true,
					usable: 2,
					prompt2: "此牌对你无效，然后你摸两张牌",
					filter: function (event, player) {
						var numa = Math.random();
						return (
							get.tag(event.card, "damage") &&
							get.type(event.card) == "trick" &&
							numa < 0.8
						);
					},
					trigger: { target: "useCardToTargeted" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						trigger.getParent().excluded.add(player);
						player.draw(2);
					},
				},
			},
		},
		jl_xiaoqiao: {
			charlotte: true,
			locked: true,
			group: ["jl_xiaoqiao_tianxiang", "jl_xiaoqiao_hongyan"],
			subSkill: {
				tianxiang: {
					name: "天香",
					forced: false,
					locked: true,
					direct: true,
					preHidden: true,
					usable: 2,
					prompt2:
						"弃置一张手牌防止此伤害，然后令一名其他角色失去1点体力并获得你弃置的牌",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.9 && player.countCards("h") > 0 && event.num > 0;
					},
					trigger: { player: "damageBegin4" },
					content: function () {
						"step 0";
						player.chooseCardTarget({
							filterCard: function (card, player) {
								return lib.filter.cardDiscardable(card, player);
							},
							filterTarget: function (card, player, target) {
								return player != target;
							},
							prompt: get.prompt("弃置一张手牌并选择一名角色"),
							ai1: function (card) {
								return 10 - get.value(card);
							},
							ai2: function (target) {
								return -get.attitude(_status.event.player, target);
							},
						});
						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							player.discard(result.cards);
							var target = result.targets[0];
							player.line(target, "fire");
							player.logSkill(event.name, target);
							trigger.cancel();
							event.target = target;
							event.card = result.cards[0];
						} else {
							event.finish();
						}
						("step 2");
						event.related = event.target.loseHp();
						("step 3");
						if (event.related.cancelled || target.isDead()) return;
						if (card.isInPile()) target.gain(card, "gain2");
					},
				},
				hongyan: {
					name: "红颜",
					forced: false,
					locked: true,
					usable: 3,
					prompt2: "摸二张牌",
					filter: function (event, player) {
						if (event.type != "discard") return false;
						if (!event.hs) return false;
						var numa = Math.random();
						return numa < 0.95;
					},
					trigger: { player: "loseAfter" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.draw(2);
					},
				},
			},
		},
		jl_xizhicai: {
			charlotte: true,
			locked: true,
			group: [
				"jl_xizhicai_chouce",
				"jl_xizhicai_add",
				"jl_xizhicai_clear",
				"jl_xizhicai_xianfu",
			],
			subSkill: {
				chouce: {
					name: "筹策",
					forced: false,
					locked: true,
					prompt2: "选择一名角色令其摸两张牌，再选择一名角色弃置其至多两张牌",
					filter: function () {
						var numa = Math.random();
						return numa < 0.9;
					},
					trigger: { player: "damageEnd" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						player
							.chooseTarget("选择一名角色令其摸两张牌")
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target);
							});
						("step 1");
						if (result.bool) {
							player.line(result.targets, "green");
							result.targets[0].draw(2);
						}
						("step 2");
						player
							.chooseTarget("选择一名角色弃置其至多两张牌")
							.set("ai", function (target) {
								return -get.attitude(_status.event.player, target);
							});
						("step 3");
						if (result.bool) {
							player.line(result.targets, "fire");
							player.discardPlayerCard(result.targets[0], "he", [1, 2]);
						}
					},
				},
				add: {
					name: "先辅",
					forced: false,
					locked: true,
					prompt2:
						"选择一名角色，直到你的下回合开始，该角色造成或受到伤害后，你回复1点体力并摸两张牌",
					filter: function () {
						var numa = Math.random();
						return numa < 0.85;
					},
					trigger: { player: "phaseJieshuBegin" },
					content: function () {
						"step 0";
						player
							.chooseTarget("请选择【先辅】的目标")
							.set("ai", function (target) {
								var num = 1 + Math.random();
								if (get.attitude(_status.event.player, target) > 0) {
									num += 0.5;
								}
								return num;
							});
						("step 1");
						if (result.bool) {
							var target = result.targets[0];
							if (!player.storage.jl_xizhicai_xianfu)
								player.storage.jl_xizhicai_xianfu = [];
							player.storage.jl_xizhicai_xianfu.push(target);
							player.line(target, "water");
							target.markSkill("jl_xizhicai_mark");
							if (!target.storage.jl_xizhicai_mark)
								target.storage.jl_xizhicai_mark = [];
							target.storage.jl_xizhicai_mark.add(player);
						}
					},
				},
				clear: {
					trigger: {
						global: "dieBegin",
						player: "phaseBegin",
					},
					silent: true,
					forced: true,
					locked: true,
					filter: function (event, player) {
						if (event.player != player) return false;
						return player.storage.jl_xizhicai_xianfu;
					},
					content: function () {
						"step 0";
						var target = player.storage.jl_xizhicai_xianfu[0];
						target.unmarkSkill("jl_xizhicai_mark");
						("step 1");
						delete player.storage.jl_xizhicai_xianfu;
					},
				},
				mark: {
					marktext: "辅",
					intro: {
						name: "先辅",
						content: "当你受到或造成伤害后，$可以摸两张牌并回复1点体力",
					},
				},
				xianfu: {
					name: "先辅",
					forced: false,
					locked: true,
					prompt2: "回复1点体力并摸两张牌",
					charlotte: true,
					usable: 1,
					filter: function (event, player) {
						if (!player.storage.jl_xizhicai_xianfu || event.num <= 0)
							return false;
						if (
							player.storage.jl_xizhicai_xianfu.includes(event.player) ||
							player.storage.jl_xizhicai_xianfu.includes(event.source)
						)
							return true;
					},
					trigger: { global: "damageEnd" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.recover();
						player.draw(2);
					},
				},
			},
		},
		jl_zhurong: {
			charlotte: true,
			locked: true,
			group: ["jl_zhurong_lieren", "jl_zhurong_juxiang"],
			subSkill: {
				lieren: {
					name: "烈刃",
					usable: 3,
					forced: false,
					locked: true,
					prompt2: "获得对方一张牌，并摸一张牌",
					filter: function (event, player) {
						var numa = Math.random();
						return (
							numa < 0.95 &&
							(event.card.name == "sha" || event.card.name == "juedou") &&
							event.target.countCards("he") > 0
						);
					},
					trigger: { player: "useCardToPlayered" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.gainPlayerCard(trigger.target, true, "he");
						player.draw();
					},
				},
				juxiang: {
					name: "巨象",
					forced: false,
					locked: true,
					usable: 3,
					prompt2: function (event, player) {
						var name = get.translation(event.card.name);
						return "获得【" + name + "】并摸1~2张牌";
					},
					filter: function (event, player) {
						var numa = Math.random();
						return (
							numa < 0.8 &&
							get.tag(event.card, "damage") &&
							get.type(event.card) == "trick" &&
							event.player != player &&
							get.itemtype(event.cards) == "cards" &&
							get.position(event.cards[0], true) == "o"
						);
					},
					trigger: { global: "useCardAfter" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.gain(trigger.cards, "gain2");
						player.draw([1, 2].randomGet());
					},
				},
			},
		},
		jl_zhugeliang: {
			charlotte: true,
			locked: true,
			group: ["jl_zhugeliang_huoji", "jl_zhugeliang_kanpo"],
			subSkill: {
				huoji: {
					trigger: {
						player: "phaseUseBegin",
					},
					frequent: true,
					filter: function () {
						return Math.random() <= 0.9;
					},
					content: function () {
						"step 0";
						player.draw();
						lib.jlX.playVoice("voice/" + event.name + "1");

						("step 1");
						player.chooseUseTarget(
							{ name: "huogong" },
							"是否视为使用一张【火攻】？"
						);
						("step 2");
						var cards = [];
						player.getHistory("lose", function (evt) {
							if (
								evt.type == "discard" &&
								evt.getParent(4).card &&
								evt.getParent(4).card.name == "huogong" &&
								evt.getParent(6).name == event.name
							)
								cards.addArray(evt.cards);
						});
						if (cards.length) {
							player.gain(cards, "gain2");
						}
					},
				},
				kanpo: {
					name: "看破",
					prompt2:
						"令此锦囊对你无效，然后摸一张牌（每回合限触发两次）",
					trigger: {
						target: "useCardToBegin",
					},
					check: function (evt, player) {
						return get.effect(player, evt.card, evt.player, player) < 0;
					},
					filter: function (event, player) {
						if (Math.random() > 0.8) return false;
						if (
							event.card &&
							get.type(event.card, "trick") == "trick" &&
							event.player != player
						)
							return true;
					},
					usable: 2,
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						trigger.cancel();
						player.draw("nodelay");
					},
				},
			},
		},
		jl_jiangwei: {
			charlotte: true,
			locked: true,
			group: ["jl_jiangwei_tiaoxin", "jl_jiangwei_guanxing"],
			subSkill: {
				tiaoxin: {
					name: "挑衅",
					forced: false,
					locked: true,
					direct: true,
					preHidden: true,
					prompt2: "你可以弃置至多两名其他角色各一张牌。",
					filter: function () {
						var numa = Math.random();
						return numa < 0.7;
					},
					trigger: { player: ["phaseUseBegin", "phaseUseEnd"] },
					content: function () {
						"step 0";
						player
							.chooseTarget(
								get.prompt("jl_jiangwei_tiaoxin"),
								"选择至多两名其他角色",
								[1, 2],
								function (card, player, target) {
									return (
										target != player &&
										target.countDiscardableCards(player, "hej") > 0
									);
								}
							)
							.set(
								"prompt2",
								"你可以弃置至多两名其他角色各一张牌"
							)
							.set("ai", function (target) {
								return -get.attitude(_status.event.player, target);
							});
						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							result.targets.sortBySeat();
							event.targets = result.targets;
							player.line(result.targets, "gold");
							player.logSkill("jl_jiangwei_tiaoxin", result.targets);
						} else event.finish();
						("step 2");
						event.current = targets.shift();
						player.discardPlayerCard(event.current, "he", true);
						if (targets.length) event.redo();
					},
				},
				guanxing: {
					name: "观星",
					forced: false,
					locked: true,
					prompt2: "观看牌堆顶五张牌，然后以任意顺序放回牌堆顶或牌堆底",
					filter: function () {
						var numa = Math.random();
						return numa < 0.75;
					},
					trigger: { player: "phaseZhunbeiBegin" },
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 交互对齐界诸葛亮 reguanxing：点击/拖动将牌移动到牌堆顶或牌堆底
						// （引擎 chooseToGuanxing 内置取牌、自动放回牌堆与"X上Y下"口播）
						await player
							.chooseToGuanxing(5)
							.set("prompt", "观星：点击或拖动将牌移动到牌堆顶或牌堆底")
							.forResult();
					},
				},
			},
		},
		jl_guojia: {
			charlotte: true,
			locked: true,
			group: ["jl_guojia_yiji", "jl_guojia_tiandu"],
			subSkill: {
				yiji: {
					name: "遗计",
					forced: false,
					locked: true,
					prompt2: "摸3张牌，将至多3张手牌交给一至三名其他角色",
					filter: function (event) {
						if (!event.num || event.num <= 0) return false;
						var numa = Math.random();
						return numa < 0.69;
					},
					trigger: { player: "damageEnd" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						event.count = 1;
						("step 1");
						player.draw(3);
						event.given = 0;
						("step 2");
						player.chooseCardTarget({
							filterCard: true,
							selectCard: [1, 3 - event.given],
							filterTarget: function (card, player, target) {
								return player != target && target != event.temp;
							},
							prompt: "请选择要送人的卡牌",
						});
						("step 3");
						if (result.bool) {
							player.line(result.targets, "green");
							result.targets[0].gain(result.cards, player, "giveAuto");
							event.given += result.cards.length;
							if (event.given < 3) {
								event.temp = result.targets[0];
								event.goto(2);
							} else if (event.count < trigger.num) {
								delete event.temp;
								event.count++;
								player
									.chooseBool(get.prompt2(event.name))
									.set("frequentSkill", event.name);
							} else event.finish();
						} else if (event.count < trigger.num) {
							delete event.temp;
							event.count++;
							player
								.chooseBool(get.prompt2(event.name))
								.set("frequentSkill", event.name);
						} else event.finish();
						("step 4");
						if (result.bool) {
							player.logSkill(event.name);
							event.goto(1);
						}
					},
				},
				tiandu: {
					name: "天妒",
					forced: false,
					locked: true,
					prompt2: "获得判定牌并摸2牌",
					filter: function (event, player) {
						var numa = Math.random();
						return numa < 0.74 && get.position(event.result.card, true) == "o";
					},
					trigger: { player: "judgeEnd" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.gain(trigger.result.card, "gain2");
						player.draw(2);
					},
				},
			},
		},
		jl_luxun: {
			charlotte: true,
			locked: true,
			group: ["jl_luxun_lianying", "jl_luxun_qianxun"],
			subSkill: {
				lianying: {
					name: "连营",
					forced: false,
					locked: true,
					prompt2: function (event, player) {
						var num = event.hs.length;
						return "令至多" + num + "名角色各摸1张牌和1-2张【杀】";
					},
					filter: function (event, player) {
						if (player.countCards("h")) return false;
						var numa = Math.random();
						return event.hs && event.hs.length && numa < 0.74;
					},
					trigger: { player: "loseAfter" },
					content: function () {
						"step 0";
						lib.jlX.playVoice("voice/" + event.name + "1");

						event.num = 0;
						var numb = trigger.hs.length;
						player
							.chooseTarget("选择发动连营的目标", [1, numb])
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target);
							})
							.set("ai", function (target) {
								return get.attitude(_status.event.player, target);
							});
						("step 1");
						if (result.targets) {
							result.targets.sortBySeat();
							event.targets = result.targets;
						} else event.finish();
						("step 2");
						player.line(event.targets[event.num], "green");
						player.logSkill("jl_luxun_lianying", event.targets[event.num]);
						event.targets[event.num].draw();
						("step 3");
						var numc = [1, 2].randomGet();
						var list = [];
						for (var i = 0; i < numc; i++) {
							var card = get.cardPile2(function (card) {
								if (card.name != "sha") return false;
								if (!list.includes(card)) return true;
							});
							if (card) list.push(card);
						}
						event.targets[event.num].gain(list, "gain2");
						event.num++;
						("step 4");
						if (event.num < event.targets.length) event.goto(2);
					},
				},
				qianxun: {
					name: "谦逊",
					forced: false,
					locked: true,
					prompt2: "摸两张牌",
					filter: function (event, player) {
						var numa = Math.random();
						return (
							(event.card.name == "sha" || get.type(event.card) == "trick") &&
							event.player != player &&
							numa < 0.64
						);
					},
					trigger: { target: "useCardToTargeted" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.draw(2);
					},
				},
			},
		},
		jl_guanyu: {
			charlotte: true,
			locked: true,
			group: ["jl_guanyu_wusheng", "jl_guanyu_yijue"],
			subSkill: {
				wusheng: {
					name: "武圣",
					forced: false,
					locked: true,
					prompt2: "令此【杀】伤害基数+1~2",
					filter: function (event, player) {
						var numa = Math.random();
						var card = event.card;
						return card.name === "sha" && numa < 0.74 && player.isPhaseUsing();
					},
					trigger: { player: "useCard" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						var numb = [1, 2].randomGet();
						trigger.baseDamage += numb;
					},
					check: function (event, player) {
						return get.attitude(player, event.target) <= 0;
					},
				},
				yijue: {
					name: "义绝",
					forced: false,
					locked: true,
					prompt2:
						"令下一张【杀】无距离限制且不计次数，并无视目标角色的防具以及其非锁定技失效直到回合结束",
					filter: function () {
						var numa = Math.random();
						return numa < 0.59;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						player.addTempSkill("jl_guanyu_buff");
					},
				},
				buff: {
					forced: true,
					locked: true,
					mod: {
						targetInRange: function (card, player) {
							if (card.name == "sha") return true;
						},
					},
					shaRelated: true,
					trigger: { player: "useCardToPlayered" },
					filter: function (event, player) {
						return event.card.name == "sha";
					},
					logTarget: "target",
					content: function () {
						"step 0";
						player.logSkill("jl_guanyu_yijue", trigger.target);
						if (!trigger.target.hasSkill("fengyin")) {
							trigger.target.addTempSkill("fengyin");
						}
						trigger.target.addTempSkill("qinggang2");
						trigger.target.storage.qinggang2.add(trigger.card);
						trigger.target.markSkill("qinggang2");
						player.getStat().card.sha--;
						("step 1");
						player.removeSkill("jl_guanyu_buff");
					},
				},
			},
		},
		jl_diaochan: {
			charlotte: true,
			locked: true,
			group: ["jl_diaochan_biyue", "jl_diaochan_lijian"],
			subSkill: {
				biyue: {
					name: "闭月",
					forced: false,
					locked: true,
					prompt2: "摸2~3张牌",
					filter: function () {
						var numa = Math.random();
						return numa < 0.84;
					},
					trigger: { player: "phaseJieshuBegin" },
					content: function () {
						lib.jlX.playVoice("voice/" + event.name + "1");

						var numb = [2, 3].randomGet();
						player.draw(numb);
					},
				},
				lijian: {
					name: "离间",
					forced: false,
					locked: true,
					prompt2: "你可以选择一名男性角色失去2点体力",
					filter: function (event, player) {
						var num = game.countPlayer(function (current) {
							return current != player && current.sex == "male";
						});
						var numa = Math.random();

						return numa < 0.49 && num > 0;
					},
					trigger: { player: "phaseUseBegin" },
					content: function () {
						"step 0";
						player
							.chooseTarget(function (card, player, current) {
								return current != player && current.hasSex("male");
							}, "选择一名男性角色")
							.set(
								"prompt2",
								"你可以选择一名男性角色失去2点体力"
							)
							.set("ai", function (target) {
								var att = get.attitude(_status.event.player, target);
								if (att <= 0)
									return Math.max(att * (target.hp - 10), att * -6);
								else return -1;
							});
						("step 1");
						if (result.bool) {
							lib.jlX.playVoice("voice/" + event.name + "1");

							player.line(result.targets[0], "red");
							player.logSkill("jl_diaochan_lijian", result.targets[0]);
							result.targets[0].loseHp(2);
						} else event.finish();
					},
				},
			},
		},
		jl_xunyou: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【智愚】？",
			prompt2: "摸一张牌，伤害来源弃置一张手牌",
			trigger: {
				player: "damageEnd",
			},
			filter: function (event, player) {
				if (!event.player || !event.num || event.num <= 0) return false;
				var numa = Math.random();
				return event.source && numa < 0.73;
			},
			// 按“受到1点伤害后”逐点结算：同一次伤害按点数排多次触发（73% 由概率包装按事件缓存，一次判定门控全部点数）
			getIndex: function (event) {
				return event.num;
			},
			content: function () {
				"step 0";
				player.draw();
				lib.jlX.playVoice("voice/jl_xunyou_zhiyu1");

				trigger.source.chooseToDiscard(true);
			},
		},
		jl_guanyinping: {
			charlotte: true,
			name: "雪恨",
			forced: false,
			locked: true,
			usable: 1,
			prompt: "是否发动【雪恨】？",
			prompt2: "伤害+1并摸一张牌",
			filter: function (event, player) {
				var numa = Math.random();
				if (numa > 0.83) return false;
				return event.card && get.color(event.card) == "red";
			},
			trigger: {
				source: "damageBegin",
			},
			content: function () {
				lib.jlX.playVoice("voice/jl_guanyinping_xuehen1");
				trigger.num++;
				player.draw();

			},
		},
		jl_caorui: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【恢拓】？",
			prompt2: "摸1张牌并回复1点体力",
			trigger: {
				player: "damageEnd",
			},
			filter: function (event, player) {
				var numa = Math.random();
				return numa < 0.28;
			},
			content: function () {
				lib.jlX.playVoice("voice/jl_caorui_huituo1");
				player.draw();
				player.recover();

			},
			ai: {
				maixie: true,
				maixie_hp: true,
			},
		},
		jl_guohuanghou: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【矫诏】？",
			prompt2: "从牌堆获得一张锦囊牌",
			trigger: {
				player: "phaseUseBegin",
			},
			filter: function (event, player) {
				var numa = Math.random();
				return numa < 0.8;
			},
			content: function () {
				var card = get.cardPile(
					function (card) {
						return get.type(card) == "trick" || get.type(card) == "delay";
					},
					"cardPile",
					"random"
				);
				if (card) {
					lib.jlX.playVoice("voice/jl_guohuanghou_jiaozhao1");

					player.gain(card, "gain2", "log");
				} else {
					game.log("但是牌堆里面已经没有锦囊牌了!");
				}
			},
		},
		jl_sundeng: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【匡弼】？",
			prompt2: "获得弃牌堆的1~3张牌",
			trigger: {
				player: "phaseZhunbeiBegin",
			},
			filter: function (event, player) {
				var numa = Math.random();
				return numa < 0.68;
			},
			content: function () {
				"step 0";
				lib.jlX.playVoice("voice/jl_sundeng_kuangbi1");
				var num = [1, 2, 3].randomGet();
				("step 1");

				var card = get.cardPile(true, "discardPile");
				if (card) {
					// 从弃牌堆获得：用 gain2 动画（牌从弃牌堆飞出）
					player.gain(card, "gain2", "log");

					lib.jlX.playVoice("voice/jl_sundeng_kuangbi1");
					num--;
				} else {
					game.log("弃牌堆没牌!");
					event.finish();
				}

				("step 2");
				if (num > 0) event.goto(1);
			},
		},
		jl_yuanshao: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【血裔】？",
			prompt2: "本回合手牌上限+3，并可以额外使用一张【杀】",
			trigger: {
				player: "phaseUseBegin",
			},
			filter: function () {
				return Math.random() <= 0.68;
			},
			content: function () {
				player.addTempSkill(event.name + "_x");
				lib.jlX.playVoice("voice/jl_yuanshao_xueyi1");

			},
			subSkill: {
				x: {
					mark: true,
					intro: {
						content: "手牌上限+3，可额外使用一张【杀】。",
					},
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name == "sha") return num + 1;
						},
						maxHandcard: function (player, num) {
							return num + 3;
						},
					},
				},
			},
		},
		jl_huaxiong: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【耀武】？",
			prompt2: "摸两张牌",
			trigger: {
				player: "damageAfter",
			},
			filter: function (event, player) {
				var numa = Math.random();
				if (numa > 0.78) return false;
				return (
					event.card && (event.card.name == "sha" || event.card.name == "juedou")
				);
			},
			content: function () {
				player.draw(2);

				lib.jlX.playVoice("voice/jl_huaxiong_yaowu1");
			},
		},
		jl_zhangyi: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【矢志】？",
			prompt2: "令本阶段出【杀】次数+2",
			trigger: {
				player: "phaseUseBegin",
			},
			filter: function (event, player) {
				var numa = Math.random();
				return numa < 0.52;
			},
			// forced:true,
			content: function () {
				lib.jlX.playVoice("voice/jl_zhangyi_shizhi1");

				player.addTempSkill("jl_zhangyi_buff", { player: "phaseUseAfter" }); //
			},
			subSkill: {
				buff: {
					mod: {
						cardUsable: function (card, player, num) {
							if (card.name == "sha") return num + 2;
						},
					},
					sub: true,
				},
			},
		},
		jl_guohuai: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【精策】？",
			prompt2: "摸两张牌",
			trigger: {
				player: "phaseJieshuBegin",
			},
			filter: function (event, player) {
				const numa = Math.random();
				return numa < 0.49 && player.countCards("h") < player.hp;
			},
			content: function () {

				lib.jlX.playVoice("voice/jl_guohuai_jingce1");
				player.draw(2);
			},
		},
		jl_sunluban: {
			charlotte: true,
			forced: false,
			locked: true,
			prompt: "是否发动【骄矜】？",
			prompt2: "令此次伤害-1",
			trigger: {
				player: "damageBegin3",
			},
			filter: function (event, player) {
				var numa = Math.random();
				if (numa > 0.26) return false;
				return event.source && event.source != player;
			},
			content: function () {
				lib.jlX.playVoice("voice/jl_sunluban_jiaoyin1");

				trigger.num--;
			},
		},
		jl_caoyingewss: {
			charlotte: true,
			trigger: {
				player: "damageBefore",
			},
			frequent: true,
			forced: true,
			content: function () {
				var numb = [1, 2].randomGet();
				trigger.num += numb;
			},
		},
		// ==================== 新将灵 ====================
		jl_shenluxun: {
			charlotte: true,
			locked: true,
			group: ["jl_shenluxun_junlue", "jl_shenluxun_zhanhuo"],
			subSkill: {
				junlue: {
					name: "军略",
					audio: false,
					forced: false,
					locked: true,
					mark: true,
					marktext: "军",
					prompt2:
						"当你造成或受到伤害后，你有90%的概率获得1~2个“军略”标记并摸1~2张牌（最多5个标记）。",
					intro: { name: "军略", content: "mark" },
					// 用 global 时机 + 参与判定，一次伤害的「造成」与「受到」只结算一遍（自伤不会算两次）
					trigger: { global: "damageEnd" },
					filter(event, player) {
						return (
							player.isAlive() &&
							(event.player == player || event.source == player) &&
							Math.random() < 0.9
						);
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 标记数与摸牌数取同一个随机数；满 5 时标记不再增加但摸牌照常
						const num = [1, 2].randomGet();
						const added = Math.min(num, JUNLUE_MAX - player.countMark(JUNLUE));
						if (added > 0) {
							player.addMark(JUNLUE, added);
						}
						await player.draw(num);
					},
				},
				zhanhuo: {
					name: "绽火",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"出牌阶段结束时，你有90%的概率可以移去全部“军略”标记，横置并弃置一名角色装备区里的所有牌，然后弃置其与“军略”数量相等的手牌并对其造成等量的火焰伤害。",
					trigger: { player: "phaseUseEnd" },
					// 标记数与概率同属触发条件，一律写在 filter；check 只作为 AI/托管的是否发动判定
					filter(event, player) {
						return player.countMark(JUNLUE) > 0 && Math.random() < 0.9;
					},
					check(event, player) {
						return game.hasPlayer(current => get.attitude(player, current) < 0 && current.countCards("he") > 0);
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const num = player.countMark(JUNLUE);
						player.clearMark(JUNLUE);

						const { targets } = await player
							.chooseTarget({
								prompt: "###绽火###选择一名角色",
								ai: target => (get.attitude(player, target) < 0 ? target.countCards("he") + 1 : -1),
							})
							.forResult();
						const target = targets && targets[0];
						if (!target) {
							return;
						}

						// 横置并弃置其装备区里的所有牌
						player.line(target, "red");
						await target.link(true);
						const equips = target.getDiscardableCards(player, "e");
						if (equips.length) {
							await target.discard({ cards: equips, discarder: player });
						}

						// 弃置与军略数量相等的手牌（可弃不足则全弃），伤害固定按军略数量结算
						const want = Math.min(num, target.countDiscardableCards(player, "h"));
						if (want > 0) {
							await player
								.discardPlayerCard({
									target,
									position: "h",
									selectButton: [want, want],
									forced: true,
									filterButton: card => lib.filter.canBeDiscarded(card, player, target),
									prompt: "###绽火###弃置" + want + "张手牌",
								})
								.forResult();
						}
						await target.damage({ source: player, num, nature: "fire" });
					},
				},
			},
		},
		jl_zhaoxiang: {
			charlotte: true,
			locked: true,
			group: ["jl_zhaoxiang_fanghun", "jl_zhaoxiang_fuhan"],
			subSkill: {
				fanghun: {
					name: "芳魂",
					audio: false,
					forced: false,
					locked: true,
					usable: 3,
					prompt2:
						"当你使用或打出的【杀】或【闪】进入弃牌堆时，你有90%的概率可以获得此牌，然后你可以弃置一名其他角色至多3张牌，并摸1~3张牌，再对其造成1点伤害。（每回合限触发3次）",
					trigger: { global: "cardsDiscardAfter" },
					// 「每回合限触发3次」交给引擎 usable：stat 在每个角色回合开始时清零，且只在点「确定」后才计数
					filter(event, player) {
						return player.isAlive() && fanghunCards(event, player).length > 0 && Math.random() < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 引擎的发动询问就是第一次「是否获得此牌」；这里重新取一次，防止牌已被别人拿走
						const cards = fanghunCards(trigger, player);
						if (!cards.length) {
							return;
						}
						await player.gain(cards, "gain2");

						const { bool } = await player
							.chooseBool({
								prompt: "###芳魂###是否弃置一名其他角色至多3张牌，摸1~3张牌并对其造成1点伤害",
								ai: () =>
									game.hasPlayer(
										current => current != player && get.attitude(player, current) < 0 && current.hasDiscardableCards(player, "he"),
									),
							})
							.forResult();
						if (!bool) {
							return;
						}

						const { targets } = await player
							.chooseTarget({
								prompt: "###芳魂###选择一名其他角色",
								// chooseTarget 的目标过滤键是 filterTarget(card, player, target)，写成 filter 会被静默忽略
								filterTarget: (_card, _player, target) => target != player && target.hasDiscardableCards(player, "he"),
								ai: target => target.countDiscardableCards(player, "he"),
							})
							.forResult();
						const target = targets && targets[0];
						// 无可弃之牌则摸牌与伤害一并不执行
						if (!target || !target.hasDiscardableCards(player, "he")) {
							return;
						}

						await player
							.discardPlayerCard({
								target,
								position: "he",
								selectButton: [1, 3],
								filterButton: card => lib.filter.canBeDiscarded(card, player, target),
								prompt: "###芳魂###弃置至多3张牌",
							})
							.forResult();
						await player.draw([1, 2, 3].randomGet());
						await target.damage({ source: player, num: 1 });
					},
				},
				fuhan: {
					name: "扶汉",
					audio: false,
					forced: false,
					locked: true,
					usable: 3,
					prompt2:
						"当你造成或受到伤害后，有85%的概率可以随机获得一个蜀国武将技能直到你的回合结束。若你已因此获得3个技能，则改为回复1点体力并摸两张牌（每回合限触发3次）",
					// 与军略同款：global 时机 + 参与判定，一次伤害的造成与受到只算一次
					trigger: { global: "damageEnd" },
					filter(event, player) {
						return (
							player.isAlive() &&
							(event.player == player || event.source == player) &&
							Math.random() < 0.85
						);
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 名单里可能留着上一回合已被引擎收回的技能，先按 tempSkills 自愈剔除
						const held = (player.storage[FUHAN] || []).filter(skill => player.tempSkills[skill] != undefined);
						player.storage[FUHAN] = held;
						const pool = held.length >= FUHAN_MAX ? [] : shuSkillPool(player);
						// 已满 3 个、或池子里没有可拿的技能，都走回血分支
						if (!pool.length) {
							await player.recover({ num: 1 });
							await player.draw(2);
							return;
						}
						const skill = pool.randomGet();
						// addTempSkill 到期是硬 removeSkill，所以池子已排除 charlotte/fixed 这类收不回的技能
						player.addTempSkill(skill, { player: "phaseEnd" });
						if (player.tempSkills[skill] != undefined) {
							held.push(skill);
							player.popup(skill, "yellow");
						}
					},
				},
			},
		},
		jl_sunce: {
			charlotte: true,
			locked: true,
			group: ["jl_sunce_zhiba", "jl_sunce_jiang"],
			subSkill: {
				zhiba: {
					name: "制霸",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"结束阶段，你有90%的概率可以和一名其他角色拼点。若你赢，你随机获得其一张手牌且视为你对其使用一张【决斗】；若你没赢，你获得双方拼点的牌并摸一张牌。",
					trigger: { player: "phaseEnd" },
					filter(event, player) {
						// 拼点要求双方都有手牌（canCompare 已含「不能以自己为对象」），没人可拼就不弹询问
						return player.isAlive() && Math.random() < 0.9 && game.hasPlayer(target => player.canCompare(target));
					},
					check(event, player) {
						return game.hasPlayer(target => get.attitude(player, target) < 0 && player.canCompare(target));
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const { targets } = await player
							.chooseTarget({
								prompt: "###制霸###与一名其他角色拼点",
								filterTarget: (_card, _player, target) => player.canCompare(target),
								ai: target => (get.attitude(player, target) < 0 ? 10 - target.countCards("h") : -1),
							})
							.forResult();
						const target = targets && targets[0];
						if (!target || !player.canCompare(target)) {
							return;
						}

						// preserve=lose：这两张拼点牌归本技能取回，别的「拼点后」技能见到该标记会让路
						const result = await player
							.chooseToCompare(target)
							.set("preserve", "lose")
							.forResult();
						// 拼点牌是 result.player / result.target；bool 为真即孙策赢，点数相同（tie）算没赢
						if (typeof result.bool != "boolean") {
							return;
						}

						if (result.bool) {
							const hs = target.getCards("h");
							if (hs.length) {
								await player.gain(hs.randomGet(), "gain2");
							}
							// 【决斗】本身没有距离限制；目标不是决斗的合法目标（免疫决斗等）则跳过
							if (player.canUse("juedou", target)) {
								await player.useCard({ name: "juedou", isCard: true }, target, ZHIBA);
							}
							return;
						}

						const back = [result.player, result.target].filterInD("d");
						if (back.length) {
							await player.gain(back, "gain2");
						}
						await player.draw(1);
					},
				},
				jiang: {
					name: "激昂",
					audio: false,
					forced: false,
					locked: true,
					usable: 2,
					prompt2:
						"当你使用或被使用伤害类锦囊牌或红色【杀】后（指定或成为目标后），你有85%的概率摸1~2张牌（每回合限两次）。",
					// 指定目标后（使用者视角）与成为目标后（目标视角），官方激昂同款时机
					trigger: { player: "useCardToPlayered", target: "useCardToTargeted" },
					filter(event, player, name) {
						if (!player.isAlive() || !jiangCards(event.card)) {
							return false;
						}
						// 这两个时机引擎是按目标逐个触发的，多目标锦囊取第一个目标那次算一次
						if (name == "useCardToPlayered") {
							if (!(event.player == player && event.isFirstTarget)) {
								return false;
							}
						} else if (!(event.player != player && event.target == player)) {
							// 被使用视角排除「孙策自己使用的牌把他自己也算作目标」（决斗），保证一次使用只响一次
							return false;
						}
						return Math.random() < 0.85;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						await player.draw([1, 2].randomGet());
					},
				},
			},
		},
		jl_daqiao: {
			charlotte: true,
			locked: true,
			group: ["jl_daqiao_guose", "jl_daqiao_liuli"],
			subSkill: {
				guose: {
					name: "国色",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"出牌阶段开始时，你有85%的概率可摸一张方块牌并可以此牌当【乐不思蜀】使用，且可以弃置场上一张【乐不思蜀】。",
					trigger: { player: "phaseUseBegin" },
					filter(event, player) {
						return player.isAlive() && Math.random() < 0.85;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 牌堆里从上往下第一张方块牌（cardPile2 只搜牌堆；cardPile 会连带搜弃牌堆）
						const diamond = get.cardPile2(card => get.suit(card) == "diamond");
						if (diamond) {
							await player.gain(diamond, "gain2");
						}

						// viewAs 通道：贴到目标判定区的就是这张方块实体牌，但按乐不思蜀结算/识别
						if (diamond) {
							const vcard = get.autoViewAs({ name: "lebu" }, [diamond]);
							const canLebu = () => game.hasPlayer(target => player.canUse(vcard, target));
							if (canLebu()) {
								const { bool } = await player
									.chooseBool({ prompt: "###国色###是否以这张方块牌当【乐不思蜀】使用", ai: () => canLebu() })
									.forResult();
								if (bool) {
									const { targets } = await player
										.chooseTarget({
											prompt: "###国色###选择一名其他角色",
											filterTarget: (_card, _player, target) => player.canUse(vcard, target),
											ai: target => (get.attitude(player, target) < 0 ? 1 : -1),
										})
										.forResult();
									const target = targets && targets[0];
									if (target && player.canUse(vcard, target)) {
										await player.useCard(vcard, [diamond], target, GUOSE);
									}
								}
							}
						}

						// 弃置场上一张乐不思蜀（含自己判定区那张）：像使用牌那样点角色选目标，选完有确认按钮
						const holders = lebuHolders();
						if (holders.length) {
							const { bool } = await player
								.chooseBool({ prompt: "###国色###是否弃置场上一张【乐不思蜀】", ai: () => holders.includes(player) })
								.forResult();
							if (bool) {
								const { targets } = await player
									.chooseTarget({
										prompt: "###国色###选择弃置谁判定区里的【乐不思蜀】",
										filterTarget: (_card, _player, target) => target.getCards("j").some(card => get.name(card) == "lebu"),
										ai: target => (target == player ? 5 : -1),
									})
									.forResult();
								const holder = targets && targets[0];
								if (holder) {
									const lebu = holder.getCards("j").find(card => get.name(card) == "lebu");
									if (lebu) {
										await holder.discard({ cards: [lebu], discarder: player });
									}
								}
							}
						}
					},
				},
				liuli: {
					name: "流离",
					audio: false,
					forced: false,
					locked: true,
					usable: 2,
					prompt2:
						"成为【杀】的目标后，你有85%的概率可弃置一张牌将此【杀】转移给你攻击范围内的一名其他角色并摸一张牌（不能是【杀】的使用者，每回合限触发两次）。",
					// 官方流离同款时机：必须在杀结算前改掉目标
					trigger: { target: "useCardToTarget" },
					filter(event, player) {
						if (get.name(event.card) != "sha" || !player.hasCards("he")) {
							return false;
						}
						// 得有可接目标：在大乔攻击范围内、不是杀的使用者也不是大乔自己、且对该杀是合法目标
						const movable = game.hasPlayer(
							current =>
								player.inRange(current) &&
								current != event.player &&
								current != player &&
								lib.filter.targetEnabled(event.card, event.player, current),
						);
						if (!movable) {
							return false;
						}
						return Math.random() < 0.85;
					},
					async cost(event, trigger, player) {
						// 选牌与选目标在同一对话框里完成，取消则不进入 content、也不占用 usable 次数
						event.result = await player
							.chooseCardTarget({
								position: "he",
								filterCard: lib.filter.cardDiscardable,
								filterTarget: (_card, _current, target) =>
									player.inRange(target) &&
									target != player &&
									target != trigger.player &&
									!!lib.filter.targetEnabled(trigger.card, trigger.player, target),
								ai1: () => 1,
								ai2: target => (get.attitude(player, target) < 0 ? 1 : -1),
								prompt: "###流离###弃置一张牌，将此【杀】转移给你攻击范围内的一名其他角色",
								source: trigger.player,
								card: trigger.card,
							})
							.forResult();
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const target = event.targets && event.targets[0];
						const used = trigger.getParent();
						if (!target || !used) {
							return;
						}
						// 把这张杀的目标从自己换成新目标，再弃掉作为代价的牌
						used.triggeredTargets2?.remove(player);
						used.targets.remove(player);
						used.targets.push(target);
						await player.discard({ cards: event.cards });
						await player.draw(1);
					},
				},
			},
		},
		jl_simayiyi: {
			charlotte: true,
			locked: true,
			group: ["jl_simayiyi_yizuo", "jl_simayiyi_zhengwei"],
			subSkill: {
				yizuo: {
					name: "懿佐",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"准备阶段，你有85%的概率对一名其他角色造成随机点数的伤害并获得其若干张牌，总数为6。",
					// 准备阶段开始时 = phaseZhunbeiBegin（phaseBegin 是「回合开始后」的插入时机，不是准备阶段）
					trigger: { player: "phaseZhunbeiBegin" },
					filter(event, player) {
						return player.isAlive() && game.hasPlayer(target => target != player) && Math.random() < 0.85;
					},
					check(event, player) {
						return game.hasPlayer(target => target != player && get.attitude(player, target) < 0);
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const { targets } = await player
							.chooseTarget({
								prompt: "###懿佐###对一名其他角色造成伤害并获得其牌（两者总数为6）",
								filterTarget: (_card, _player, target) => target != player,
								ai: target => (get.attitude(player, target) < 0 ? target.countCards("he") - target.hp : -1),
							})
							.forResult();
						const target = targets && targets[0];
						if (!target || target == player) {
							return;
						}

						// 优先按目标的牌数取值：拿牌数在 0~min(牌数,6) 间等概率随机，伤害取剩下的 6-拿牌数
						const take = Math.floor(Math.random() * (Math.min(target.countCards("he"), YIZUO_TOTAL) + 1));
						const num = YIZUO_TOTAL - take;
						if (num > 0) {
							await target.damage({ source: player, num });
						}
						// 打死就不拿牌；能拿时由司马一一自己挑（不足则按实际张数）
						const want = target.isAlive() ? Math.min(take, target.countCards("he")) : 0;
						if (want > 0) {
							await player
								.gainPlayerCard({
									target,
									position: "he",
									selectButton: [want, want],
									forced: true,
									filterButton: card => lib.filter.canBeGained(card, player, target),
									prompt: "###懿佐###获得" + get.translation(target) + "的" + want + "张牌",
								})
								.forResult();
						}
					},
				},
				zhengwei: {
					name: "拯危",
					audio: false,
					forced: false,
					locked: true,
					usable: 1,
					prompt2:
						"每回合限一次，当你获得牌时，你有90%的概率令至多两名角色各摸与你获得牌等量牌（最多为5）。",
					// 引擎里摸牌就是 player.gain(cards, "draw")（content.ts:10746-10760），所以 gain 时机连摸牌一起命中；
					// 「获得牌」按三国杀术语要排除摸牌，判父事件是不是 draw。注意 getParent(name) 找不到返回的是 {}（真值），不能直接取布尔。
					trigger: { player: "gainAfter" },
					filter(event, player) {
						if (!player.isAlive() || !Array.isArray(event.cards) || !event.cards.length) {
							return false;
						}
						const parent = event.getParent();
						if (parent && parent.name == "draw") {
							return false;
						}
						return Math.random() < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 被触发的 gain 事件在 trigger 上（event 是技能事件，没有 cards）
						const cards = trigger && Array.isArray(trigger.cards) ? trigger.cards : [];
						if (!cards.length) {
							return;
						}
						const num = Math.min(cards.length, ZHENGWEI_MAX);
						const { targets } = await player
							.chooseTarget({
								prompt: "###拯危###令至多两名角色各摸" + num + "张牌",
								selectTarget: [1, 2],
								filterTarget: (_card, _player, target) => target.isAlive(),
								ai: target => get.attitude(player, target),
							})
							.forResult();
						for (const target of targets || []) {
							await target.draw(num);
						}
					},
				},
			},
		},
		jl_shenlvmeng: {
			charlotte: true,
			locked: true,
			group: ["jl_shenlvmeng_shelie", "jl_shenlvmeng_gongxin", "jl_shenlvmeng_shelie_clean"],
			subSkill: {
				shelie: {
					name: "涉猎",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"摸牌阶段，你有90%的概率额外随机获得弃牌堆中每种花色的牌各一张，这些牌本回合不计入手牌上限。",
					// 摸牌阶段开始时：摸牌数已定、还没摸牌（phaseDrawBegin1/2 → 才 player.draw(num)），所以是「额外」拿
					trigger: { player: "phaseDrawBegin2" },
					filter(event, player) {
						return player.isAlive() && discardPerSuit().length > 0 && Math.random() < 0.9;
					},
					check(event, player) {
						return discardPerSuit().length > 0;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const cards = discardPerSuit();
						if (!cards.length) {
							return;
						}
						await player.gain(cards, "gain2");
						// addGaintag 只给已在自己区域里的牌打标记，必须在拿完之后调用；标记顺带做视觉提示
						player.addGaintag(cards, SHELIE_TAG);
						// 记在本回合的 stat 里：stat 每个回合开始都会换新对象，所以「本回合」会自然失效
						player.getStat()[SHELIE] = cards;
					},
					mod: {
						// 不计入弃牌阶段的手牌上限
						ignoredHandcard(card, player) {
							const list = player.getStat()[SHELIE];
							if (Array.isArray(list) && list.includes(card)) {
								return true;
							}
						},
						// 弃牌阶段也不允许把这些牌弃掉，保证「不计入上限」真的留在手里
						cardDiscardable(card, player, name) {
							if (name != "phaseDiscard") {
								return;
							}
							const list = player.getStat()[SHELIE];
							if (Array.isArray(list) && list.includes(card)) {
								return false;
							}
						},
					},
				},
				shelie_clean: {
					name: "涉猎·收",
					audio: false,
					forced: true,
					popup: false,
					// 回合结束把本回合的「涉猎」标记移去，免得和下一回合新拿的混在一起分不清
					trigger: { player: "phaseEnd" },
					filter(event, player) {
						const list = player.getStat()[SHELIE];
						if (Array.isArray(list) && list.length) {
							return true;
						}
						return player.getCards("he").some(card => card.hasGaintag(SHELIE_TAG));
					},
					content: async function (event, trigger, player) {
						// removeGaintag 不带 cards 时只清手牌，这里把手牌+装备区里带标记的都算上（涉猎拿到的装备可能被装上）
						const cards = player.getCards("he").filter(card => card.hasGaintag(SHELIE_TAG));
						// stat 里那批可能已被顺走/拆走给了别人，牌身上的标记要一并摘掉，免得别人手里留着「涉猎」字样
						const list = player.getStat()[SHELIE];
						if (Array.isArray(list)) {
							cards.addArray(list);
						}
						player.removeGaintag(SHELIE_TAG, cards);
					},
				},
				gongxin: {
					name: "攻心",
					audio: false,
					forced: false,
					locked: true,
					usable: 3,
					prompt2:
						"出牌阶段，你使用牌指定其他角色为目标后，有90%的概率观看其中一个目标的手牌，然后获得其中一张牌（每回合限三次）。",
					// 与激昂同一时机（使用者视角的指定目标后），一次使用只响一次
					trigger: { player: "useCardToPlayered" },
					filter(event, player, name) {
						if (!player.isAlive() || name != "useCardToPlayered" || event.player != player || !event.isFirstTarget) {
							return false;
						}
						return gongxinTargets(event, player).length > 0 && Math.random() < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						const candidates = gongxinTargets(trigger, player);
						if (!candidates.length) {
							return;
						}
						let target = candidates[0];
						// 多目标时由神吕蒙挑要观看谁；只有一个候选就直接进入观看
						if (candidates.length > 1) {
							const { targets } = await player
								.chooseTarget({
									prompt: "###攻心###观看其中一个目标的手牌",
									filterTarget: (_card, _player, current) => candidates.includes(current),
									ai: current => current.countCards("h"),
								})
								.forResult();
							target = targets && targets[0];
							if (!target) {
								return;
							}
						}

						const cards = target.getCards("h");
						if (!cards.length) {
							return;
						}
						// 观看与选牌合成一个对话框：摊开对方手牌，点一张就获得（取消则只看牌）
						const { links } = await player
							.chooseCardButton({
								cards,
								select: 1,
								forced: false,
								prompt: "###攻心###获得" + get.translation(target) + "的一张手牌",
								ai: button => get.value(button.link, player),
							})
							.forResult();
						const picked = links && links[0];
						if (picked) {
							await player.gain(picked, "gain2");
						}
					},
				},
			},
		},
		jl_jidabao: {
			charlotte: true,
			locked: true,
			group: ["jl_jidabao_qiba", "jl_jidabao_jianren"],
			subSkill: {
				qiba: {
					name: "气霸",
					audio: false,
					forced: false,
					locked: true,
					usable: 3,
					prompt2:
						"当你造成或受到伤害后，你有80%的概率可以令至多两名角色各摸一张牌（每回合限3次）。",
					// 与军略同款：global 时机 + 参与判定，一次伤害的「造成」与「受到」只结算一遍（自伤不会算两次）
					trigger: { global: "damageEnd" },
					filter(event, player) {
						return player.isAlive() && (event.player == player || event.source == player) && Math.random() < 0.8;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 所有存活角色（含自己）里选 1~2 人，各摸一张；「至多两名」靠点取消提前结束
						const { targets } = await player
							.chooseTarget({
								prompt: "###气霸###令至多两名角色各摸一张牌",
								selectTarget: [1, 2],
								filterTarget: (_card, _player, target) => target.isAlive(),
								ai: target => get.attitude(player, target),
							})
							.forResult();
						for (const target of targets || []) {
							await target.draw(1);
						}
					},
				},
				jianren: {
					name: "坚韧",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"当你进入濒死状态时，你有90%的概率回复体力至4点并摸三张牌。（每局游戏限一次）。",
					// 进入濒死时（官方涅槃等同款时机）；回复到正体力后，濒死事件会自行结束、跳过求桃
					trigger: { player: "dying" },
					filter(event, player) {
						// 「每局游戏限一次」：标记只在 content 里写，故 90% 失败与点取消都不消耗本局机会
						if (player.storage[JIANREN]) {
							return false;
						}
						return Math.random() < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						player.storage[JIANREN] = true;
						// 「回复体力至4点」：recoverTo 即 recover(4-当前体力)，引擎天然封顶到体力上限（上限不足 4 时回到上限）
						await player.recoverTo(4);
						await player.draw(3);
					},
				},
			},
		},
		jl_guoxiaoye: {
			charlotte: true,
			locked: true,
			group: ["jl_guoxiaoye_lengfeng", "jl_guoxiaoye_jiayi", "jl_guoxiaoye_jiayi_miss"],
			subSkill: {
				lengfeng: {
					name: "冷锋",
					audio: false,
					forced: false,
					locked: true,
					usable: 3,
					prompt2:
						"每回合限三次，当你造成伤害后，你有80%的概率回复1点体力并摸一张牌。",
					// 官方「造成伤害后」惯用时机：source 角色只在自己造成伤害时命中，一次伤害只结算一遍
					trigger: { source: "damageEnd" },
					filter(event, player) {
						return player.isAlive() && Math.random() < 0.8;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						await player.recover(1);
						await player.draw(1);
					},
				},
				jiayi: {
					name: "嘉翼",
					audio: false,
					forced: false,
					locked: true,
					prompt2:
						"准备阶段，你有50%的概率摸两张牌且本回合使用【杀】次数+1。然后重复执行上述效果X次（X为连续没有触发的回合数+1）。",
					// 准备阶段开始时（与懿佐同款时机）
					trigger: { player: "phaseZhunbeiBegin" },
					filter(event, player) {
						return player.isAlive() && Math.random() < 0.5;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						// 「重复执行上述效果X次」：X = 连续未触发回合数 + 1；成功先执行 1 组、再追发 X 组（共 1+X 组）
						const streak = player.storage[JIAYI] || 0;
						const total = 1 + (streak + 1);
						player.addTempSkill(JIAYI_BUFF, { player: "phaseEnd" });
						player.storage[JIAYI_BUFF] = (player.storage[JIAYI_BUFF] || 0) + total;
						player.storage[JIAYI] = 0;
						player.storage[JIAYI + "_hit"] = true;
						for (let i = 0; i < total; i++) {
							await player.draw(2);
						}
					},
				},
				jiayi_miss: {
					name: "嘉翼·蓄",
					audio: false,
					forced: true,
					popup: false,
					// 本回合未触发（50% 判定失败或点取消）→ 连败 +1；触发时主技能已把连败清零
					trigger: { player: "phaseEnd" },
					content: async function (event, trigger, player) {
						if (!player.storage[JIAYI + "_hit"]) {
							player.storage[JIAYI] = (player.storage[JIAYI] || 0) + 1;
						}
						delete player.storage[JIAYI + "_hit"];
					},
				},
				jiayi_buff: {
					name: "嘉翼·势",
					audio: false,
					mark: true,
					marktext: "翼",
					locked: true,
					// 临时技能：到期移除时清掉本回合累计的加值（实际加值记在 storage，见 mod.cardUsable）
					onremove: true,
					intro: { name: "嘉翼", content: "本回合内使用【杀】的次数上限+#。" },
					mod: {
						cardUsable(card, player, num) {
							if (card.name == "sha") {
								return num + (player.storage[JIAYI_BUFF] || 0);
							}
						},
					},
				},
			},
		},
		// 猪猪侠（2026-09-27 新增）：糖果 / 亢掌；亢掌的弃牌部分拆到 kangzhang_qi，实现「伤害结算后再弃牌」
		jl_zhuzhuxia: {
			charlotte: true,
			locked: true,
			group: ["jl_zhuzhuxia_tangguo", "jl_zhuzhuxia_kangzhang", "jl_zhuzhuxia_kangzhang_qi"],
			subSkill: {
				tangguo: {
					name: "糖果",
					audio: false,
					forced: false,
					locked: true,
					usable: 2,
					prompt2: "每回合限两次，你使用牌指定自己为目标时，有90%的概率摸2~4张牌。",
					trigger: { player: "useCard" },
					filter(event, player) {
						// 「指定自己为目标」：装备牌的使用目标视为自己（官方规则），其余牌看目标里是否包含自己。
						// 先判是否满足条件再掷点，避免无谓消耗随机数
						const selfTarget =
							(event.card && get.type(event.card) == "equip") || (event.targets || []).includes(player);
						if (!selfTarget) return false;
						return Math.random() < 0.9;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						await player.draw(2 + Math.floor(Math.random() * 3));
					},
				},
				kangzhang: {
					name: "亢掌",
					audio: false,
					forced: false,
					locked: true,
					usable: 2,
					prompt2:
						"每回合限两次，你对距离2以内的其他角色造成伤害时，有85%的概率伤害+1，且该角色随机弃置1~3张手牌。",
					trigger: { source: "damageBegin1" },
					filter(event, player) {
						// 注意：伤害事件上没有 target —— 受伤者是 event.player、来源是 event.source
						// （引擎 player.damage() 只设 next.player / next.source；同扩展〖削发〗亦用 event.player）
						const target = event.player;
						if (!player.isAlive() || !target || target == player) return false;
						if (!target.isAlive() || player.distanceTo(target) > 2) return false;
						return Math.random() < 0.85;
					},
					content: async function (event, trigger, player) {
						lib.jlX.playVoice("voice/" + event.name + "1");
						trigger.num += 1;
						// 「伤害结算后再弃牌」：给本次伤害打标记，由 kangzhang_qi 在 damageEnd 处理
						// （引擎伤害流程：damageBegin1..4 → 扣血结算 → damage 触发 → 濒死结算 → damageEnd）
						trigger.jlZhuzhuxiaKangzhang = true;
					},
				},
				kangzhang_qi: {
					// 亢掌的收尾部分：不占「每回合限两次」次数、不重复播报语音
					name: "亢掌·弃",
					audio: false,
					forced: true,
					popup: false,
					locked: true,
					trigger: { source: "damageEnd" },
					filter(event) {
						return !!event.jlZhuzhuxiaKangzhang;
					},
					content: async function (event, trigger, player) {
						delete trigger.jlZhuzhuxiaKangzhang;
						const target = trigger.player; // 受伤者（伤害事件无 target 字段）
						// 伤害被完全抵消（num 归零）或目标已阵亡则不弃牌
						if (!target || !target.isAlive() || !trigger.num || !target.countCards("h")) return;
						const num = Math.min(1 + Math.floor(Math.random() * 3), target.countCards("h"));
						await target.discard(target.getCards("h").randomGets(num));
					},
				},
			},
		},
	};

	// 概率类 filter 会被引擎在触发排序中反复调用（filterTrigger），
	// 缓存同一事件下的随机数，避免重复判定导致技能在触发选择时随机消失
	const jlRandomCaches = new WeakMap();
	const stableRandomFilter = function (filter) {
		const wrapped = function (event, player, name, indexedData) {
			if (!event || typeof event != "object") {
				return filter.call(this, event, player, name, indexedData);
			}
			let cache = jlRandomCaches.get(event);
			if (!cache) {
				cache = new WeakMap();
				jlRandomCaches.set(event, cache);
			}
			let random = cache.get(filter);
			if (random === undefined) {
				random = Math.random();
				cache.set(filter, random);
			}
			const originRandom = Math.random;
			Math.random = function () {
				return random;
			};
			try {
				return filter.call(this, event, player, name, indexedData);
			} finally {
				Math.random = originRandom;
			}
		};
		// 保留原始 filter 引用：静态检查/调试时能看到真正的判定代码（包装后 toString 只剩包装体）
		wrapped.originalFilter = filter;
		return wrapped;
	};
	const wrapRandomFilter = function (obj) {
		for (const key in obj) {
			const info = obj[key];
			if (!info || typeof info != "object") continue;
			if (typeof info.filter == "function" && Function.prototype.toString.call(info.filter).includes("Math.random")) {
				info.filter = stableRandomFilter(info.filter);
			}
			if (info.subSkill) wrapRandomFilter(info.subSkill);
		}
	};
	wrapRandomFilter(jlSkillList);

	const jlTranslate = {
		levelBuffXf: "等阶特权",
		levelBuffXf_info: "新服五阶点数体系：按等阶获得可分配特权点数（一阶0/二阶10/三阶30/四阶60/五阶110）。特权：重获生机、免减一伤、武力盖世、粮多牌足。",
	};
	const addSkillTranslate = function (fullName, info) {
		if (!jlTranslate[fullName] && typeof info.name == "string") jlTranslate[fullName] = info.name;
		if (info.subSkill) {
			for (const sub in info.subSkill) addSkillTranslate(fullName + "_" + sub, info.subSkill[sub]);
		}
	};
	for (const key in jlname) {
		const info = jlname[key];
		const skill = jlSkillList["jl_" + key];
		if (!skill) continue;
		skill.mark = true;
		skill.marktext = info.name.startsWith("神") && info.name.length > 2 ? info.name[1] : info.name[0];
		skill.intro = {
			name: "当前将灵",
			mark: function (dialog, player, storage) {
				// 立绘统一 161×277：必须写死 width/height——否则首次点开「灵」标记时图片还没加载完，
				// 引擎按 0 高度测量内容，卡片只会露出一截；写死后首次即可正确展开
				dialog.addSmall('<img src="' + layoutPath + "image/character_full/jl_imgf_" + key + '.png" width="161" height="277">');
				// 名称与品级同色（都取该将灵的品级色），品级写法与详情卡/将灵列表一致：S→SA、A→AA
				dialog.addText(
					'<span style="color:' + (qualityColor[jlQuality[key]] || qualityColor.a) + '">' +
						info.name + "(" + jlDetailGradeText(key) + ")</span>"
				);
			},
		};
		jlTranslate["jl_" + key] = info.name;
		// 首行品级与详情卡/将灵列表一致（S→SA、A→AA）
		let str = "将灵" + info.name + "(" + jlDetailGradeHTML(key) + ")，拥有技能\n";
		// 技能名：颜色改为与将灵品级同色（原为紫色）；带 data-jl="键:序号" 使其可点击——
		// 移动端没有悬停，靠 document 上的事件委托弹出完整文本（<abbr> 的悬停提示保留给桌面端）。
		// 注意：原先包了一层 <ins>（浏览器默认给实线下划线），<abbr title> 也自带虚线下划线，
		// 这里一律去掉装饰，只用品级色 + 手型光标表示可点
		let jlSkillIndex = 0;
		for (const s in info.skill) {
			str +=
				'<span class="jlskill" data-jl="' + key + ":" + jlSkillIndex++ + '" style="color:' + jlQualityColorOf(key) + ';cursor:pointer">' +
				'<abbr style="text-decoration:none" title="' + s + "：" + info.skill[s] + '">' + s + "</abbr></span>\n";
		}
		jlTranslate["jl_" + key + "_info"] = str;
	}
	for (const key in jlSkillList) addSkillTranslate(key, jlSkillList[key]);

	//-------------------------- 将灵技能保护 --------------------------
	// 将灵在正式服语义上“外挂”于武将：将灵技能不会被任何方式获得、失效或失去。
	// fixed：不被 removeSkill/失去技能/清空技能移除，且不进入可获取技能列表；
	// superCharlotte：clearSkills(true) 时保留；charlotte/persevereSkill：兼容多数“禁用/失去技能”效果的过滤条件。
	// 注意：会被 addTempSkill 临时加入的技能必须列入下方名单，否则会因无法到期移除而永久残留。
	const jlTempSkills = [
		"jl_caochun_count1", "jl_caochun_count2", "jl_caochun_count3", "jl_caochun_count4",
		"jl_caochun_count5", "jl_caochun_count6", "jl_caochun_count7", "jl_caochun_count8",
		"jl_caochun_count9", "jl_caoyingewss", "jl_guansuo_buff1", "jl_guansuo_buff2",
		"jl_guanyu_buff", "jl_huaman_mansi_mark", "jl_lvbu_buff", "jl_nianshou_count1",
		"jl_nianshou_count2", "jl_shencaocao_count1", "jl_shencaocao_count2", "jl_shencaocao_range",
		"jl_xiaosha_gui", "jl_xiaosha_sha", "jl_yuanshao_x", "jl_zhangfei_buff",
		"jl_zhangfei_count1", "jl_zhangfei_count2", "jl_zhangfei_count3", "jl_zhangxingcai_buff",
		"jl_zhangyi_buff", "jl_zhangqiying_count1", "jl_zhangqiying_count2", "jl_zhangqiying_count3",
		"jl_zhangqiying_count4", "jl_zhouyi_mangqing2", "jl_zhouyi_mangqing3",
		"jl_guoxiaoye_jiayi_buff",
	];
	const jlProtectedSkills = new Set();
	const protectJlSkill = function (fullName, info) {
		if (!info || typeof info != "object") {
			return;
		}
		info.charlotte = true;
		info.persevereSkill = true;
		info.superCharlotte = true;
		if (!jlTempSkills.includes(fullName)) {
			info.fixed = true;
		}
		jlProtectedSkills.add(fullName);
		if (info.subSkill) {
			for (const key in info.subSkill) {
				protectJlSkill(fullName + "_" + key, info.subSkill[key]);
			}
		}
	};
	for (const key in jlSkillList) {
		protectJlSkill(key, jlSkillList[key]);
	}
	// 兼容过滤条件不完善的技能禁用（如山海志异【熬汤】【铁骑】会禁用包含受保护技能在内的全部技能），
	// 在引擎唯一的禁用入口统一拦截，确保将灵技能永不失效
	if (typeof lib.element?.Player?.prototype?.disableSkill == "function") {
		const jlDisableSkill = lib.element.Player.prototype.disableSkill;
		lib.element.Player.prototype.disableSkill = function (skill, skills) {
			if (Array.isArray(skills)) {
				const list = skills.filter(function (name) {
					return !jlProtectedSkills.has(name);
				});
				if (!list.length) {
					return this;
				}
				return jlDisableSkill.call(this, skill, list);
			}
			if (typeof skills == "string" && jlProtectedSkills.has(skills)) {
				return this;
			}
			return jlDisableSkill.apply(this, arguments);
		};
	}

	//-------------------------- 设置菜单 --------------------------
	// 队友/电脑出战将灵列表（不含“无”：是否启用由对应开关控制）
	const jlItems = {};
	for (const key in jlname) {
		jlItems[key] = jlHeadHTML(key) + jlname[key].name + "(" + jlQualityHTML(key) + ")";
	}
	// 玩家出战将灵 A/B/C 列表：额外提供“无”，用于单独关闭某个受控角色的将灵
	const jlItemsWithNone = Object.assign({ nothing: "无" }, jlItems);
	let jlListHTML = '<div style="border:1px solid white;text-align:left"><font size=2px>';
	for (const key in jlname) {
		const info = jlname[key];
		// 将灵列表与详情卡同一套品级写法（S→SA、A→AA）；设置菜单的下拉项仍是单字母
		jlListHTML += "<li>" + info.name + "(" + jlDetailGradeHTML(key) + ")";
		for (const s in info.skill) jlListHTML += "<br>" + s + info.skill[s];
		jlListHTML += "<br>";
	}
	jlListHTML += "</font></div>";
	const levelItem = {
		"1": "一阶(0点)",
		"2": "二阶(10点)",
		"3": "三阶(30点)",
		"4": "四阶(60点)",
		"5": "五阶(110点)",
	};

	return {
		name: EXT_NAME,
		//-------------------------- 开局部署 --------------------------
		content: function (config, pack) {
			// 开局最优先捕获原始 game.me（firstDo 先于所有玩家处理；
			// 否则挑战模式单人控制的 autoswap 会在开局中途改写 game.me，导致队友被误判成玩家）
			lib.skill._lvJlCapture = {
				firstDo: true,
				trigger: { global: "gameStart" },
				forced: true,
				popup: false,
				content: async function (event, trigger, player) {
					lib.jlX.me = game.me;
					// 兜底：清理旧存档等历史数据里可能残留的将灵技能禁用记录（新数据已由 disableSkill 拦截）
					for (const current of game.players || []) {
						for (const skill in current.disabledSkills) {
							if (jlProtectedSkills.has(skill)) {
								delete current.disabledSkills[skill];
							}
						}
					}
				},
			};
			lib.skill._lvJlBegin = {
				trigger: { global: "gameStart" },
				forced: true,
				unique: true,
				filter: function (event, player) {
					if (!jlEnabled()) return false;
					return player == (lib.jlX.me || game.me);
				},
				content: async function (event, trigger, player) {
					if (!jlEnabled()) return;
					applyLevel(player, lib.jlX.conf("levelChoose"));
					if (lib.jlX.conf("jianglingMe") !== false) {
						const skill = getJlSkill(lib.jlX.conf("jianglingChooseA"));
						if (skill) player.addSkill(skill);
					}
					const startDraw = player.storage.jlStartDraw || 0;
					if (startDraw > 0) await player.draw(startDraw);
				},
			};
			lib.skill._lvJlBeginFd = {
				trigger: { global: "gameStart" },
				forced: true,
				unique: true,
				filter: function (event, player) {
					if (!jlEnabled()) return false;
					const me = lib.jlX.me || game.me;
					return player != me && player.isFriendOf(me);
				},
				content: async function (event, trigger, player) {
					if (!jlEnabled()) return;
					// 单人控制开启时我方由玩家全程操作，同侧其他角色视为“自己”，套用玩家设置
					if (get.config("single_control")) {
						applyLevel(player, lib.jlX.conf("levelChoose"));
						if (lib.jlX.conf("jianglingMe") !== false) {
							// 玩家控制的角色顺序：玩家自己为第 1 个（A），其余同侧角色按座位顺序为第 2、3、…个（B / C，第 3 个及以后均用 C）
							const me = lib.jlX.me || game.me;
							const index = [me].concat(me.getFriends()).indexOf(player);
							const chooseKey = index <= 0 ? "jianglingChooseA" : index == 1 ? "jianglingChooseB" : "jianglingChooseC";
							const skill = getJlSkill(lib.jlX.conf(chooseKey));
							if (skill) player.addSkill(skill);
						}
					} else {
						if (lib.jlX.conf("levelFd")) applyLevel(player, lib.jlX.conf("levelChooseFd"));
						if (lib.jlX.conf("jianglingFd")) {
							const skill = getJlSkill(lib.jlX.conf("jianglingChooseFd"));
							if (skill) player.addSkill(skill);
						}
					}
					const startDraw = player.storage.jlStartDraw || 0;
					if (startDraw > 0) await player.draw(startDraw);
				},
			};
			lib.skill._lvJlBeginAi = {
				trigger: { global: "gameStart" },
				forced: true,
				unique: true,
				filter: function (event, player) {
					if (!jlEnabled()) return false;
					const me = lib.jlX.me || game.me;
					return player != me && !player.isFriendOf(me);
				},
				content: async function (event, trigger, player) {
					if (!jlEnabled()) return;
					if (lib.jlX.conf("levelAi")) applyLevel(player, lib.jlX.conf("levelChooseAi"));
					if (lib.jlX.conf("jianglingAi")) {
						const skill = getJlSkill(lib.jlX.conf("jianglingChooseAi"));
						if (skill) player.addSkill(skill);
					}
					const startDraw = player.storage.jlStartDraw || 0;
					if (startDraw > 0) await player.draw(startDraw);
				},
			};
		},
		editable: false,
		precontent: function (config) {},
		config: {
			shuoming: {
				name: '<div class="hth_menu">▶扩展说明</div>',
				clear: true,
				onclick: function () {
					if (this.hth_more == undefined) {
						var more = ui.create.div(
							".hth_more",
							'<div style="border: 1px solid white;text-align:left"><font size=2px>' +
								"将灵X：新一代将灵扩展" +
								"<br>设置玩家/队友/敌对AI的出战将灵与武将等阶后，开局自动获得对应加成。" +
								"<br>武将等阶采用新服五阶体系：按等阶获得特权点数（一阶0/二阶10/三阶30/四阶60/五阶110），开局分配四项特权；四阶初始手牌+1，五阶初始手牌+2、体力上限+1。" +
								"</font></div>"
						);
						this.parentNode.insertBefore(more, this.nextSibling);
						this.hth_more = more;
						this.innerHTML = '<div class="hth_menu">▼扩展说明</div>';
					} else {
						this.parentNode.removeChild(this.hth_more);
						delete this.hth_more;
						this.innerHTML = '<div class="hth_menu">▶扩展说明</div>';
					}
				},
			},
			liebiao: {
				name: '<div class="hth_menu">▶将灵列表</div>',
				clear: true,
				onclick: function () {
					if (this.hth_more == undefined) {
						var more = ui.create.div(".hth_more", jlListHTML);
						this.parentNode.insertBefore(more, this.nextSibling);
						this.hth_more = more;
						this.innerHTML = '<div class="hth_menu">▼将灵列表</div>';
					} else {
						this.parentNode.removeChild(this.hth_more);
						delete this.hth_more;
						this.innerHTML = '<div class="hth_menu">▶将灵列表</div>';
					}
				},
			},
			fengeKuo: {
				name: '<b><p align=center><span style="font-size:18px">扩展设置</span></b>',
				clear: true,
				nopointer: true,
			},
			onlyBoss: {
				name: "仅在挑战模式启用",
				intro: "开启后，本扩展的将灵与武将等阶特权只在挑战模式中生效（身份、国战等其他模式不受影响）",
				init: false,
			},
			fengeMe: {
				name: '<b><p align=center><span style="font-size:18px">玩家设置</span></b>',
				clear: true,
				nopointer: true,
			},
			jianglingMe: {
				name: "玩家将灵",
				intro: "玩家拥有出战将灵加成<br>（关闭时不会获得将灵技能）",
				init: true,
			},
			jianglingChooseA: {
				name: "玩家出战将灵A",
				intro: "玩家控制的第1个角色（玩家自己）的出战将灵，选择“无”则不获得将灵",
				init: "lingju",
				item: Object.assign({}, jlItemsWithNone),
				textMenu: jlTextMenu,
			},
			jianglingChooseB: {
				name: "玩家出战将灵B",
				intro: "玩家控制的第2个角色的出战将灵，选择“无”则不获得将灵（单人控制开启时生效）",
				init: "lingju",
				item: Object.assign({}, jlItemsWithNone),
				textMenu: jlTextMenu,
			},
			jianglingChooseC: {
				name: "玩家出战将灵C",
				intro: "玩家控制的第3个及以后角色的出战将灵，选择“无”则不获得将灵（单人控制开启时生效）",
				init: "lingju",
				item: Object.assign({}, jlItemsWithNone),
				textMenu: jlTextMenu,
			},
			levelChoose: {
				name: "玩家武将等阶",
				intro:
					"设置玩家武将的等阶（新服五阶体系）按等阶获得可分配特权点数：<br><li>一阶：0点。<br><li>二阶：10点。<br><li>三阶：30点。<br><li>四阶：60点、初始手牌+1。<br><li>五阶：110点、初始手牌+2、体力上限+1。<br>特权：重获生机、免减一伤（需重获生机≥1）、武力盖世、粮多牌足（需武力盖世≥1）。",
				init: "5",
				item: Object.assign({}, levelItem),
			},
			fengeFd: {
				name: '<b><p align=center><span style="font-size:18px">我方人机设置</span></b>',
				clear: true,
				nopointer: true,
			},
			jianglingFd: {
				name: "队友将灵",
				intro: "队友拥有出战将灵加成<br>（单人控制开启时队友视为自己，套用玩家的出战将灵）",
				init: false,
			},
			jianglingChooseFd: {
				name: "队友出战将灵",
				intro: "设置队友的出战将灵，可获得对应的技能加成",
				init: "lingju",
				item: Object.assign({}, jlItems),
				textMenu: jlTextMenu,
			},
			levelFd: {
				name: "队友等阶",
				intro: "队友武将享受等阶特权加成<br>（单人控制开启时队友视为自己，套用玩家的武将等阶）",
				init: false,
			},
			levelChooseFd: {
				name: "队友武将等阶",
				intro:
					"设置队友武将的等阶（新服五阶体系）按等阶获得可分配特权点数：<br><li>一阶：0点。<br><li>二阶：10点。<br><li>三阶：30点。<br><li>四阶：60点、初始手牌+1。<br><li>五阶：110点、初始手牌+2、体力上限+1。<br>特权：重获生机、免减一伤（需重获生机≥1）、武力盖世、粮多牌足（需武力盖世≥1）。",
				init: "5",
				item: Object.assign({}, levelItem),
			},
			levelXinfFdAuto: {
				name: "队友等阶手动加点",
				intro: "开启后由玩家为队友选择加点；关闭时自动分配",
				init: false,
			},
			fengeAi: {
				name: '<b><p align=center><span style="font-size:18px">敌方人机设置</span></b>',
				clear: true,
				nopointer: true,
			},
			jianglingAi: {
				name: "敌方将灵",
				intro: "电脑拥有出战将灵加成",
				init: false,
			},
			jianglingChooseAi: {
				name: "敌方出战将灵",
				intro: "设置电脑的出战将灵，可获得对应的技能加成",
				init: "lingju",
				item: Object.assign({}, jlItems),
				textMenu: jlTextMenu,
			},
			levelAi: {
				name: "敌方等阶",
				intro: "电脑武将享受等阶特权加成",
				init: false,
			},
			levelChooseAi: {
				name: "敌方武将等阶",
				intro:
					"设置电脑武将的等阶（新服五阶体系）按等阶获得可分配特权点数：<br><li>一阶：0点。<br><li>二阶：10点。<br><li>三阶：30点。<br><li>四阶：60点、初始手牌+1。<br><li>五阶：110点、初始手牌+2、体力上限+1。<br>特权：重获生机、免减一伤（需重获生机≥1）、武力盖世、粮多牌足（需武力盖世≥1）。",
				init: "5",
				item: { "1": "一阶(0点)", "2": "二阶(10点)", "3": "三阶(30点)", "4": "四阶(60点)", "5": "五阶(110点)" },
			},
		},
		help: {},
		package: {
			character: { character: {}, translate: {} },
			card: { card: {}, translate: {}, list: [] },
			skill: { skill: jlSkillList, translate: jlTranslate },
			version: "0.9.0beta",
			intro: "<font color = #F82828>本扩展开源免费，严禁倒卖！</font>",
			author: "pryusnut<br>原作者：Rebbit、失名、ankhspirit等<br>版本：0.9.0beta",
		},
		files: { character: [], card: [], skill: [] },
	};
});
