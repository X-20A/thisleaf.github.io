/*
�݌v�o���l�E�����ɕK�v�ȃS�[���h�̃e�[�u��
�o���l0���烌�x���� lv �ɂȂ邽�߂ɕK�v�Ȍo���l
  TOTALEXP_STAR2[lv - 1]  // ��2
���x���� lv �̃L��������������Ƃ��ɁA�f��1������������S�[���h
  GOLDCOST_TABLE1[lv - 1]
*/

// wiki�̃f�[�^�A�P���ɘa���Ƃ��Ă��������Ă�Ƃ��낪�E�E�E

// ��2 (��3)
var TOTALEXP_STAR2 = [
	0    , 33   , 67   , 126  , 209  , 323  , 475  , 664   , 895   , 1171  ,
	1494 , 1867 , 2293 , 2772 , 3309 , 3906 , 4561 , 5282  , 6067  , 6919  ,
	7840 , 8830 , 9895 , 11033, 12245, 13536, 14907, 16356 , 17889 , 19502 ,
	21204, 22990, 24864, 26829, 28883, 31029, 33269, 35604 , 38033 , 40563 ,
	43188, 45913, 48740, 51669, 54703, 57839, 61083, 64434 , 67892 , 71460 ,
	// 51-60 �i��
	75138, 78926, 82829, 86845, 90977, 95224, 99588, 104070, 108672, 113392
];

// ��3
var TOTALEXP_STAR3 = TOTALEXP_STAR2;

// ��4
var TOTALEXP_STAR4 = [
	0    , 34   , 71   , 133  , 225   , 354   , 522   , 733   , 991   , 1299  , 
	1662 , 2078 , 2556 , 3093 , 3694  , 4365  , 5101  , 5908  , 6789  , 7747  , 
	8781 , 9894 , 11088, 12367, 13730 , 15180 , 16719 , 18347 , 20070 , 21885 , 
	23796, 25803, 27912, 30119, 32427 , 34842 , 37359 , 39984 , 42715 , 45558 , 
	48510, 51574, 54752, 58047, 61456 , 64983 , 68631 , 72399 , 76287 , 80298 , 
	// 51-60 �i��
	84433, 88696, 93084, 97600, 102245, 107021, 111928, 116969, 122145, 127453
];

// ��5
var TOTALEXP_STAR5 = [
	0     , 34    , 75    , 140   , 241   , 382   , 568   , 801   , 1086  , 1427  , 
	1827  , 2290  , 2817  , 3413  , 4081  , 4822  , 5640  , 6537  , 7513  , 8574  , 
	9723  , 10956 , 12283 , 13701 , 15213 , 16823 , 18532 , 20340 , 22250 , 24267 , 
	26388 , 28618 , 30957 , 33409 , 35973 , 38652 , 41448 , 44361 , 47397 , 50553 , 
	53831 , 57235 , 60764 , 64422 , 68210 , 72127 , 76178 , 80362 , 84682 , 89136 , 
	93730 , 98465 , 103338, 108355, 113515, 118820, 124271, 129870, 135618, 141515, 
	// 61-70 �i��
	147564, 153765, 160122, 166635, 173302, 180127, 187111, 194256, 201563, 209032, 
	// 71-80 �J��
	216742, 224629, 232694, 240939, 249367, 257978, 266775, 275760, 284934, 294299
];

// ��6
var TOTALEXP_STAR6 = [
	0     , 34    , 75    , 144   , 249   , 395   , 586   , 828   , 1124  , 1477  , 
	1894  , 2373  , 2921  , 3543  , 4234  , 5005  , 5856  , 6785  , 7803  , 8905  , 
	10097 , 11381 , 12760 , 14235 , 15807 , 17480 , 19257 , 21137 , 23123 , 25219 , 
	27424 , 29743 , 32176 , 34725 , 37392 , 40177 , 43084 , 46114 , 49269 , 52551 , 
	55960 , 59500 , 63171 , 66975 , 70912 , 74986 , 79197 , 83548 , 88039 , 92673 , 
	97449 , 102371, 107440, 112657, 118022, 123540, 129208, 135030, 141007, 147140, 
	// 61-70 �i��
	153430, 159880, 166488, 173260, 180195, 187293, 194556, 201985, 209584, 217351, 
	// 71-80 �J��
	225369, 233571, 241958, 250533, 259297, 268252, 277400, 286743, 296283, 306022, // 71: wiki�ɂ�225359�Ƃ��邪�~�X���H
	// 81-100 ����˔j
	315961, 326103, 336449, 347002, 357763, 368734, 379917, 391304, 402916, 414746, 
	426795, 439066, 451560, 464279, 477225, 490400, 503806, 517444, 531317, 545426
];



// ����S�[���h
// �i���O
var GOLDCOST_TABLE1 = [
	100 , 200 , 270 , 340 , 410 , 480 , 550 , 620 , 690 , 760 , 
	830 , 900 , 970 , 1040, 1110, 1180, 1250, 1320, 1390, 1460, 
	1530, 1600, 1670, 1740, 1810, 1880, 1950, 2020, 2090, 2160, 
	2230, 2300, 2370, 2440, 2510, 2580, 2650, 2720, 2790, 2860, 
	2930, 3000, 3070, 3140, 3210, 3280, 3350, 3420, 3490, 3560, 
	3630, 3700, 3770, 3840, 3910, 3980, 4050, 4120, 4190, 4260
];

// �i���E�J�Ԍ�
var GOLDCOST_TABLE2 = [
	100 , 200 , 300 , 400 , 500 , 600 , 700 , 800 , 900 , 1000, 
	1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 
	2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 
	3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 
	4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 
	5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 
	6100, 6200, 6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 
	7100, 7200, 7300, 7400, 7500, 7600, 7700, 7800, 7900, 8000, 
	// ����˔j
	8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000, 
	8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000, 8000
];

// �ő僌�x��
// MAX_LEVELS[STAR - 2][growth]
var MAX_LEVELS = [
	// ��2���� [�i���O, �i����, �J�Ԍ�]
	// 0�͂Ȃ�
	[50, 60, 0],
	[50, 60, 0],
	[50, 60, 0],
	[60, 70, 80],
	[60, 70, 80]
];

// ����f�ޗp�萔
// ��2-6�͂��̂܂܂̐��l�Ȃ̂ŁA����ȊO�̒l���g��
var SPCARD_NAE      = 100;
var SPCARD_SOUKA    = 101;
var SPCARD_WAZAHANA = 102;
var SPCARD_GARDEN_SOUKA    = 103;
var SPCARD_GARDEN_WAZAHANA = 104;


var PRIORITY_GOLD     = 1;
var PRIORITY_EXP      = 2;
var PRIORITY_GOLD_ALL = 3;
var GREAT_NOTHING  = 1;
var GREAT_ONLYLAST = 2;
var GREAT_ALL      = 3;
var GREAT_NOTHING_MODIFY = 4;

function COMMENT_TO_NTH(n){ return "[" + n + "]�֐i��"; }
var COMMENT_COMPLETE = "���������I";
var COMMENT_LACK     = "�f�ޕs��";
var COMMENT_RECALC   = "�Čv�Z";
var COMMENT_POSSIBLY_COMPLETE = "���������H";



// �ԋR�m�����������Ƃ��̌o���l(�ʑ���)
function get_exp_as_feed(rarity, level){
	if (rarity < 2 || 6 < rarity) return 0;
	// �����l��1Lv���Ƃ̏㏸
	var base = [60, 180, 240, 300, 360];
	var delta = [12, 36, 30, 37.5, 45];
	return Math.ceil(base[rarity - 2] + delta[rarity - 2] * (level - 1));
}


// class -------------------------------------------------------------------------------------------
// �ԋR�m�܂��͑f��
FKGCard.prototype = {
	// ���O
	name: "",
	// �\���p���O�A�󕶎��Ȃ�name���g�p
	viewname: "",
	// ������v
	// null�̏ꍇ�͖�����
	same_element: false,
	// ���l�@�o���l���g���ƁA������v�̗L���ŉ��l���ς���Ă��܂��̂����܂����Ȃ̂�
	value_as_feed: 0,
	// ��b�o���l
	// �e��{�[�i�X�̂Ȃ��o���l�H
	basic_exp_as_feed: 0,
	// �D��x
	priority     : 0,
	// ���p�A���̃J�[�h����邽�߂̃R�X�g�Ȃǂ��H
	sell_gold    : 0,
	// �L�����y�[���{��
	exp_factor: 1,
	
	// �o���l
	// setFeedExp�Őݒ�
	// �������͂���Ă��Ȃ����̂Ƃ���
	exp_as_feed  : 0,
	
	setFeedExp: FKGCard_setFeedExp,
	toString  : FKGCard_toString,
};

Object.assign(FKGCard, {
	exp_less: FKGCard_exp_less,
	calcFeedExp: FKGCard_calcFeedExp,
});

// FKGCard�ɖ�������ǉ�������
FKGCardStack.prototype = {
	// FKGCard
	card : null,
	count: 0,
	allin: false,  // �S���g�p����
	clone: FKGCardStack_clone,
};

Object.assign(FKGCardStack, {
	exp_greater: FKGCardStack_exp_greater,
	duplicate  : FKGCardStack_duplicate  ,
	push       : FKGCardStack_push       ,
	pop        : FKGCardStack_pop        ,
	toCards    : FKGCardStack_toCards    ,
	fromCards  : FKGCardStack_fromCards  ,
	removeCards: FKGCardStack_removeCards,
	separateFixedStacks: FKGCardStack_separateFixedStacks,
});


// ���̋�����\��
PowerupOnce.prototype = {
	// �f�ރ��X�g (FKGCard[])
	materials: null,
	// �f�ނ�index �v�Z���ɖ���z������͖̂��ʂȂ̂�
	mat_begin: 0,
	mat_end  : 0,
	
	// ���̃Z�b�g�ɂ���
	// �Ǘ��ԍ�
	number: 0,
	// �����O
	before_experience: 0,
	before_level: 1,
	// �S�[���h
	gold_to_powerup: 0,
	// ������
	comment_succeed: "",
	// �听����
	comment_great  : "",
	
	// �z��ʂ�̏ꍇ
	suppose_great: false,
	gain_experience: 0,
	end_experience: 0,
	end_level: 1,
	
	// �\���p
	total_gold_to_powerup: 0,
	//total_gain_experience: 0,
	
	recalcExp: PowerupOnce_recalcExp,
	clone    : PowerupOnce_clone,
	setUnsupposedComment: PowerupOnce_setUnsupposedComment,
	toString : PowerupOnce_toString,
	
	__dummy__: null
};

Object.assign(PowerupOnce, {
	calcExp: PowerupOnce_static_calcExp,
});


// PowerupOnce �𕡐��W�߂�����
PowerupList.prototype = {
	// PowerupOnce�̔z��
	// ���C���A�z�肵���ݒ�ŋ��������ꍇ�̃��X�g�ŁA�A�����Ă���
	list: null,
	// �T�u
	sublist: null,
	
	// ���C���ʂ�ɋ������ꂽ�ꍇ�̒l
	gold_to_powerup: 0,
	gain_experience: 0,
	end_experience : 0,
	
	// �ړI���B�����ꂽ��(�ő�Lv�܂ŏオ�������ǂ����Ȃ�)
	completed   : false,
	use_sub     : false,
	comment_main: "(main)",
	comment_sub : "(sub)",
	
	// �g�������́A�c��������
	//used_stacks   : null,
	//residue_stacks: null,
	
	push_back: PowerupList_push_back,
	pop_back : PowerupList_pop_back,
	clone    : PowerupList_clone,
	
	setOnceComments: PowerupList_setOnceComments,
	setLastComment : PowerupList_setLastComment,
	getMaterials   : PowerupList_getMaterials,
	
	__dummy__: 0
};


FlowerFormData.prototype = {
	error: false,
	
	// ������
	rarity   : 0,
	growth   : 0,
	level    : 0,
	max_level: 0,
	next_exp : 0,
	total_exp: 0,
	
	// �f��
	stacks: null,
	cards : null,
	
	// ����̖��O
	special_names: null,
	
	// �I�v�V����
	exp_factor     : 1,
	search_priority: PRIORITY_GOLD,
	search_great   : GREAT_NOTHING,
	once_min_count : 0,
	
	// �v�Z�E�ϊ����ꂽ�f�[�^��
	exp_table : null,
	gold_table: null,
	goal_exp  : 0,
	level2    : -1, // �Čv�Z
	next_exp2 : -1, // �Čv�Z
};


// -------------------------------------------------------------------------------------------------
function FKGCard(name, same_elem, pri, basic_exp, gold){
	switch (arguments.length) {
	default:
	case 5: this.sell_gold = arguments[4];
	case 4: this.basic_exp_as_feed = arguments[3];
	case 3: this.priority = arguments[2];
	case 2: this.same_element = arguments[1];
	case 1: this.name = arguments[0];
	case 0: break;
	}
	this.setFeedExp();
}

function FKGCard_setFeedExp(){
	let e = this.basic_exp_as_feed;
	if (this.same_element) e *= 1.5;
	e *= this.exp_factor;
	
	// �b��
	// 15%�A�b�v�Ō덷���o���肷�邱�Ƃ�����
	const sc = 10000;
	e = Math.round(e * sc) / sc;
	//this.exp_as_feed = Math.floor(e);
	this.exp_as_feed = e;
	
	this.value_as_feed = this.same_element === null ? Math.floor(this.basic_exp_as_feed / 1.5) : this.basic_exp_as_feed;
	
/*
	this.exp_as_feed = this.same_element ? Math.floor(this.basic_exp_as_feed * 1.5) : this.basic_exp_as_feed;
	//this.value_as_feed = this.exp_as_feed;
	this.value_as_feed = this.same_element === null ? Math.ceil(this.basic_exp_as_feed / 1.5) : this.basic_exp_as_feed;
*/
}

function FKGCard_toString(){
	var str = this.same_element === null ? "" : this.same_element ? "������<br>" : "�ʑ���<br>";
	str += this.viewname ? this.viewname : this.name;
	return str;
}

// �o���l��������������
// ���o���l�͗D��x�����������O
function FKGCard_exp_less(a, b){
	var c = a.exp_as_feed - b.exp_as_feed;
	if (c == 0) c = b.priority - a.priority;
	return c;
}

function FKGCard_calcFeedExp(base, fit, factor){
	let e = base;
	if (fit) e *= 1.5;
	e *= factor;
	
	const sc = 10000;
	e = Math.round(e * sc) / sc;
	
	return e;
}


// -------------------------------------------------------------------------------------------------
function FKGCardStack(card, count, allin){
	if (card) this.card = card;
	if (count > 0) this.count = count;
	if (allin) this.allin = allin;
}

function FKGCardStack_clone(){
	var out = new FKGCardStack;
	Object.assign(out, this);
	return out;
}

// �o���l���傫��������
// ���o���l�͗D��x�����������O
function FKGCardStack_exp_greater(a, b){
	var c = b.card.exp_as_feed - a.card.exp_as_feed;
	if (c == 0) c = b.card.priority - a.card.priority;
	return c;
}

function FKGCardStack_duplicate(stacks){
	// stack�̔z��𕡐�����
	var arr = new Array;
	for (var i=0; i<stacks.length; i++) {
		arr[i] = stacks[i].clone();
	}
	return arr;
}

function FKGCardStack_push(stacks, card, create_new){
	for (var i=0; i<stacks.length; i++) {
		if (stacks[i].card == card) {
			stacks[i].count++;
			return true;
		}
	}
	if (create_new) {
		var s = new FKGCardStack(card, 1);
		stacks.push(s);
		return true;
	}
	return false;
}

function FKGCardStack_pop(stacks){
	for (var i=0; i<stacks.length; i++) {
		if (stacks[i].count > 0) {
			stacks[i].count--;
			return stacks[i].card;
		}
	}
	return null;
}

function FKGCardStack_toCards(stacks, zerofill){
	var cards = new Array;
	for (var i=0; i<stacks.length; i++) {
		for (var j=0; j<stacks[i].count; j++) {
			cards.push(stacks[i].card);
		}
		if (zerofill) stacks[i].count = 0;
	}
	return cards;
}

function FKGCardStack_fromCards(stacks, cards, create_new){
	CARDS:
	for (var k=0; k<cards.length; k++) {
		for (var i=0; i<stacks.length; i++) {
			if (stacks[i].card == cards[k]) {
				stacks[i].count++;
				continue CARDS;
			}
		}
		if (create_new) {
			var s = new FKGCardStack(cards[k], 1);
			stacks.push(s);
		}
	}
	return stacks;
}

function FKGCardStack_removeCards(stacks, cards){
	for (var k=0; k<cards.length; k++) {
		for (var i=0; i<stacks.length; i++) {
			if (stacks[i].card == cards[k]) {
				stacks[i].count--;
				break;
			}
		}
	}
	return stacks;
}

function FKGCardStack_separateFixedStacks(fixed_stacks, selective_stacks, stacks){
	for (var i=0; i<stacks.length; i++) {
		if (stacks[i].allin) {
			fixed_stacks.push(stacks[i]);
		} else {
			selective_stacks.push(stacks[i]);
		}
	}
}


// -------------------------------------------------------------------------------------------------
function PowerupOnce(){
}

function PowerupOnce_recalcExp(great){
/*
	// materials ����o���l���Čv�Z
	var sum = 0;
	for (var i=0; i<this.materials.length; i++) {
		var exp = this.materials[i].exp_as_feed;
		//if (great) exp = Math.floor(exp * 1.5); // �b��
		if (great) exp = exp * 1.5;
		sum += exp;
	}
	
	// ���̃A���S���Y���Ƃ̐������͖��`�F�b�N�c
	sum = Math.ceil(sum);
*/
	return PowerupOnce.calcExp(this.materials, 0, this.materials.length, great);
}

// static��
function PowerupOnce_static_calcExp(cards, begin, end, great){
	// �ꏏ�ɍ��������ꍇ�̌o���l���v�Z
	var sum = 0;
	for (var i=begin; i<end; i++) {
		var exp = cards[i].exp_as_feed;
		//if (great) exp = Math.floor(exp * 1.5); // �b��
		if (great) exp = exp * 1.5;
		sum += exp;
	}
	
	sum = Math.ceil(sum);
	return sum;
}

function PowerupOnce_clone(){
	var out = new PowerupOnce;
	Object.assign(out, this);
	if (this.materials) out.materials = this.materials.concat();
	return out;
}

function PowerupOnce_setSupposedComment(goal_exp, arg_succeed, arg_great){
	if (!this.suppose_great) {
		var exp = this.before_experience + this.recalcExp(false);
		this.comment_succeed = exp >= goal_exp ? arg_succeed : arg_great;
	} else {
		var exp = this.before_experience + this.recalcExp(true);
		this.comment_great = exp >= goal_exp ? arg_succeed : arg_great;
	}
}

function PowerupOnce_setUnsupposedComment(goal_exp, arg_succeed, arg_great){
	if (!this.suppose_great) {
		// �����Ȃ̂ő听���R�����g���Z�b�g
		var exp = this.before_experience + this.recalcExp(true);
		this.comment_great = exp >= goal_exp ? arg_succeed : arg_great;
	} else {
		var exp = this.before_experience + this.recalcExp(false);
		this.comment_succeed = exp >= goal_exp ? arg_succeed : arg_great;
	}
}

function PowerupOnce_toString(){
	var m = "[" + this.materials.join(",") + "](" + this.materials.length +") ";
	var a = [];
	if (this.suppose_great) a.push("�听��");
	a.push(this.gain_experience + "exp");
	a.push(this.gold_to_powerup + "gold");
	return m + a.join("/");
}


// -------------------------------------------------------------------------------------------------
function PowerupList(end_exp){
	this.list = new Array;
	this.sublist = new Array;
	this.end_experience = end_exp ? end_exp : 0;
}

function PowerupList_push_back(once, listnum){
	if (listnum == 2) {
		// sublist�ɒǉ�����
		this.sublist.push(once);
		
	} else {
		// list�ɒǉ�����
		this.gold_to_powerup += once.gold_to_powerup;
		this.gain_experience += once.gain_experience;
		this.end_experience  += once.gain_experience;
		this.list.push(once);
	}
}

function PowerupList_pop_back(listnum){
	var once = null;
	if (listnum == 2) {
		if (this.sublist.length > 0) {
			once = this.sublist.pop();
		}
	} else {
		if (this.list.length > 0) {
			once = this.list.pop();
			this.gold_to_powerup -= once.gold_to_powerup;
			this.gain_experience -= once.gain_experience;
			this.end_experience  -= once.gain_experience;
		}
	}
	return once;
}

function PowerupList_clone(){
	var out = new PowerupList;
	Object.assign(out, this);
	out.list = new Array;
	out.sublist = new Array;
	
	// deepcopy���Ȃ���
	// �������A�J�[�h�ɂ��Ă̓R�s�[���Ȃ�
	for (var i=0; i<this.list.length; i++) {
		out.list[i] = this.list[i].clone();
	}
	for (var i=0; i<this.sublist.length; i++) {
		out.sublist[i] = this.sublist[i].clone();
	}
	return out;
}

// �R�����g���Z�b�g
function PowerupList_setOnceComments(number, goal_exp, digressed_complete, digressed_recalc, last_complete, last_recalc){
	var list = number == 2 ? this.sublist : this.list;
	var count = number == 2 ? this.list.length : 0;
	
	for (var i=0; i<list.length; i++) {
		var once = list[i];
		var unsp_exp = once.before_experience + once.recalcExp(!once.suppose_great);
		var sp_key   =  once.suppose_great ? "comment_great" : "comment_succeed";
		var unsp_key = !once.suppose_great ? "comment_great" : "comment_succeed";
		
		if (i < list.length - 1) {
			once[sp_key] = COMMENT_TO_NTH(count + i + 2);
			
			var kome = unsp_exp >= goal_exp ? digressed_complete : digressed_recalc;
			if (kome !== null) once[unsp_key] = kome;
			
		} else {  // last
			var kome = once.end_experience >= goal_exp ? last_complete : last_recalc;
			if (kome !== null) once[sp_key] = kome;
			
			var kome = unsp_exp >= goal_exp ? last_complete : last_recalc;
			if (kome !== null) once[unsp_key] = kome;
		}
	}
}

function PowerupList_setLastComment(listnum, succeed, great){
	var list = listnum == 2 ? this.sublist : this.list;
	if (list.length >= 1) {
		var last = list[list.length - 1];
		if (succeed !== null) last.comment_succeed = succeed;
		if (great !== null) last.comment_great = great;
		return true;
	}
	return false;
}

function PowerupList_getMaterials(){
	var arr = new Array;
	for (var i=0; i<this.list.length; i++) {
		var mat = this.list[i].materials;
		for (var j=0; j<mat.length; j++) {
			arr.push(mat[j]);
		}
	}
	return arr;
}


// -------------------------------------------------------------------------------------------------
function FlowerFormData(){
	this.stacks = new Array;
}


