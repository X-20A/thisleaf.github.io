
const MAX_MATERIAL_COUNT = 1000;
const SHOW_DEBUG_BUTTON = false;

// �o���l�A�b�v���Ԃ͎����Ōo���l�{�����Z�b�g
// �X�V���߂�ǂ��Ȃ��
const special_exp_factor_begin = new Date("2019/02/18");
const special_exp_factor_end = new Date("2019/04/08 14:00");
const special_exp_factor = 1.15;



document.addEventListener("DOMContentLoaded", flower_pageinit);


// �y�[�W�̏����� ----------------------------------------------------------------------------------
function flower_pageinit(){
	function _set_change_ev(id, ev_func){
		var e = DOM(id);
		if (e) e.addEventListener("change", ev_func);
	}
	function _set_minmax(id){
		var e = DOM(id);
		if (e) {
			e.min = 0;
			e.max = MAX_MATERIAL_COUNT;
		}
	}
	
	// ���A���e�B
	_set_change_ev("rarity", ev_change_rarity);
	// �i���x
	_set_change_ev("growth_immature", ev_change_growth);
	_set_change_ev("growth_upgrowth", ev_change_growth);
	_set_change_ev("growth_florescence", ev_change_growth);
	_set_change_ev("limit_level", ev_change_growth);
	// ����Lv/����Lv�܂�/�݌v�o���l
	_set_change_ev("current_level", ev_change_level);
	_set_change_ev("next_exp", ev_change_next);
	_set_change_ev("total_exp", ev_change_total);
	// �f��
	var postids = [
		"m_m5", "m_m20", "m_m100",
		"o_m5", "o_m20", "o_m100",
		"o_amp"
	];
	for (var i=0; i<postids.length; i++) {
		_set_change_ev("count_" + postids[i], ev_change_materials);
		_set_change_ev("allin_" + postids[i], ev_change_materials);
		_set_minmax("count_" + postids[i]);
	}
	
	// �I�v�V����
	var oids = [
		"exp_factor",
		"priority_gold", "priority_exp", "priority_gold_all",
		"great_nothing", "great_onlylast", "great_nothing_modify", // "great_all",
		"once_min_count"
	];
	for (var i=0; i<oids.length; i++) {
		_set_change_ev(oids[i], ev_change_options);
	}
	
	// �t�H�[���̏�����
	var exp_factor = DOM("exp_factor");
	
	if (exp_factor && exp_factor.value == "") { // F5�̂Ƃ��͂��̂܂܂ɂȂ�
		var time = (new Date).getTime();
		if (special_exp_factor_begin.getTime() <= time && time < special_exp_factor_end.getTime()) {
			exp_factor.value = special_exp_factor;
		} else {
			exp_factor.value = "1";
		}
	}
	
	// ������͗�������������
	function _sp(char){
		var e_rarity = DOM("special_" + char + "_rarity");
		if (e_rarity) {
			remove_children(e_rarity);
			for (var i=2; i<=6; i++) {
				e_rarity.appendChild(new Option("��" + i, i));
			}
			e_rarity.appendChild(new Option("�i�[�G"    , SPCARD_NAE     ));
			e_rarity.appendChild(new Option("�L��������", SPCARD_SOUKA   ));
			e_rarity.appendChild(new Option("�L�����Z��", SPCARD_WAZAHANA));
			e_rarity.appendChild(new Option("����(�뉀)", SPCARD_GARDEN_SOUKA   ));
			e_rarity.appendChild(new Option("�Z��(�뉀)", SPCARD_GARDEN_WAZAHANA));
			e_rarity.selectedIndex = 0;
			e_rarity.addEventListener("change", ev_change_special_rarity);
		}
		// ������Ńt�H�[���̗L���������Z�b�g
		set_special_exp(char);
		
		_set_change_ev("special_" + char + "_level", ev_change_special_level);
		_set_change_ev("special_" + char + "_exp", ev_change_special_exp);
		_set_change_ev("count_m_sp_" + char, ev_change_materials);
		_set_change_ev("allin_m_sp_" + char, ev_change_materials);
		_set_change_ev("count_o_sp_" + char, ev_change_materials);
		_set_change_ev("allin_o_sp_" + char, ev_change_materials);
		_set_minmax("count_m_sp_" + char);
		_set_minmax("count_o_sp_" + char);
	}
	
	_sp("A");
	_sp("B");
	_sp("C");
	_sp("D");
	set_total_feed_exp();
	
	// �f�o�b�O�p�{�^����
	var btn = DOM("show_debug");
	if (btn) {
		btn.addEventListener("click", ev_show_debug);
	}
	show_debug_tools(SHOW_DEBUG_BUTTON);
	
	ev_change_rarity();
	
	console.log("�ł��I");
}



// �C�x���g�֐� ------------------------------------------------------------------------------------
// ���A�x���ύX���ꂽ
function ev_change_rarity(){
	// �i���x���`�F�b�N����
	modify_growth();
	// ����Lv/����Lv�܂ł��Z�b�g
	set_nextexp();
	// �œK���v�Z
	main_optimization();
}

// �i���x���ύX���ꂽ
function ev_change_growth(){
	modify_growth();
	set_nextexp();
	main_optimization();
}

// ���x�����ύX���ꂽ
function ev_change_level(){
	// ����Lv�܂ł̌o���l�����Z�b�g
	modify_next(true);
	set_totalexp();
	main_optimization();
}

// ����Lv�܂ł��ύX���ꂽ
function ev_change_next(){
	set_totalexp();
	main_optimization();
}

// �݌v�o���l���ύX���ꂽ
function ev_change_total(){
	set_nextexp();
	main_optimization();
}

// �f�ނ̂����ꂩ���ύX���ꂽ
function ev_change_materials(){
	set_total_feed_exp();
	main_optimization();
}

// ����f�ނ̃��A�x���ύX���ꂽ
function ev_change_special_rarity(e){
	if (/special_([A-Z])_rarity/.test(e.target.id)) {
		set_special_exp(RegExp.$1);
		set_total_feed_exp();
		main_optimization();
	}
}

// ����f�ނ̃��x��
function ev_change_special_level(e){
	if (/special_([A-Z])_level/.test(e.target.id)) {
		set_special_exp(RegExp.$1);
		set_total_feed_exp();
		main_optimization();
	}
}

// �I�v�V�����̂����ꂩ���ύX���ꂽ
function ev_change_options(){
	main_optimization();
}

// ����̌o���l���ύX���ꂽ
function ev_change_special_exp(e){
	set_fit_exp(e.target);
	set_total_feed_exp();
	main_optimization();
}

// �f�o�b�O�p�̕\���؂�ւ�
function ev_show_debug(){
	var input = DOM("priority_gold_all");
	show_debug_tools(input.disabled);
}


// DOM����Ɗe��v�Z -------------------------------------------------------------------------------
function get_growth(){
	var growth = DOM("growth_immature").checked ? 0 : DOM("growth_upgrowth").checked ? 1 : 2;
	return growth;
}

function get_max_level(rarity, growth){
	var max_level = 0;
	
	if (rarity == 6 && growth == 2) {
		// ����˔j
		// 5���݂����A�ЂƂ܂��t�H�[���̃��x�����g�p����(80-100)
		max_level = formstr_to_int(DOM("limit_level").value).value;
		max_level = Math.min(Math.max(max_level, 80), 100);
		
	} else {
		max_level = MAX_LEVELS[rarity - 2][growth];
	}
	
	return max_level;
}

// �i���x�̃`�F�b�N�ƏC��
// ���A�x�ύX�Ȃǂ��ꗂ��o��\��������
// ���łɍő�Lv���C��
function modify_growth(){
	var rarity = formstr_to_int(DOM("rarity").value).value;
	//var immature = DOM("growth_immature");
	var upgrowth = DOM("growth_upgrowth");
	var florescence = DOM("growth_florescence");
	var limit = DOM("limit_level");
	var lv = DOM("current_level");
	
	if (rarity == 6) {
		// ����̐ݒ�
		_state(florescence, false, false);
		_state(limit, false, false);
		limit.min = 80;
		limit.max = 100;
		
	} else if (rarity == 5) {
		// ����˔j�Ȃ�(readonly)
		_state(florescence, false, false);
		_state(limit, false, true);
		// �J�Ԍ���`�F�b�N���Ă���ꍇ�̂ݏC��
		// ���̂����i���x���ύX���ꂽ�ꍇ�ɂ����̊֐����Ăяo��
		if (florescence.checked && limit.value != "80") limit.value = 80;
		
	} else {
		// ����˔j�A�J�ԂȂ�
		_state(florescence, true, false);
		_state(limit, true, false);
		if (florescence.checked) upgrowth.checked = true;
	}
	
	// �ő�Lv
	var growth = get_growth();
	var max = get_max_level(rarity, growth);
	lv.max = max;
	
	var lv_value = formstr_to_int(DOM("current_level").value);
	if (lv_value.good() && lv_value > max) {
		lv.value = max;
	}
	
	function _state(input, disabled, readonly){
		input.disabled = disabled;
		input.readOnly = readonly;
		// parent �� label
		var parent = input.parentElement;
		if (disabled) {
			parent.classList.add("disabled");
		} else {
			parent.classList.remove("disabled");
		}
	}
}

// ����Lv����A����Lv�܂ł��C��
function modify_next(reset){
	var next_exp = DOM("next_exp");
	var lv = formstr_to_int(DOM("current_level").value);
	
	if (!lv.good()) return;
	
	var rarity = formstr_to_int(DOM("rarity").value).value;
	var growth = get_growth();
	var max_level = get_max_level(rarity, growth);
	
	if (lv.value > max_level || lv.value <= 0) return;
	
	if (lv.value == max_level) {
		// �ő�Lv
		next_exp.max = 0;
		next_exp.value = 0;
		
	} else {
		var exp_table = get_exp_table(rarity, growth);
		var next_max = exp_table[lv.value] - exp_table[lv.value - 1];
		var next = formstr_to_int(next_exp.value);
		
		next_exp.max = next_max;
		
		if (!next.good() || next.value > next_max || reset) {
			next_exp.value = next_max;
		}
	}
}


// �݌v�o���l������Lv/����Lv�܂�
function set_nextexp(){
	var rarity = formstr_to_int(DOM("rarity").value).value;
	var growth = get_growth();
	var max_level = get_max_level(rarity, growth);
	
	if (max_level <= 0) return;
	
	var total_exp = formstr_to_int(DOM("total_exp").value);
	if (!total_exp.good() || total_exp.value < 0) return;
	
	var exp_table = get_exp_table(rarity, growth);
	
	var lv = index_in_ascending(total_exp.value, exp_table) + 1;
	if (lv > max_level) lv = max_level;
	
	var next = 0;
	if (lv < max_level) next = exp_table[lv] - total_exp.value;
	
	DOM("current_level").value = lv;
	modify_next(false); // max���Z�b�g����
	DOM("next_exp").value = next;
}


// ����Lv/����Lv�܂Ł��݌v�o���l
function set_totalexp(){
	var lv = formstr_to_int(DOM("current_level").value);
	var next = formstr_to_int(DOM("next_exp").value);
	
	if (!lv.good() || !next.good() || lv.value <= 0 || next.value < 0) return;
	
	var rarity = formstr_to_int(DOM("rarity").value).value;
	var growth = get_growth();
	var max_level = get_max_level(rarity, growth);
	
	if (lv.value > max_level) return;
	
	var exp_table = get_exp_table(rarity, growth);
	var total;
	if (lv.value < max_level) {
		total = exp_table[lv.value] - next.value;
	} else {
		total = exp_table[lv.value - 1];
	}
	
	DOM("total_exp").value = total;
}


// ���A�x�E���x������o���l���Z�b�g
// ���łɃt�H�[���̒������s��
function set_special_exp(char){
	var e_rarity = DOM("special_" + char + "_rarity");
	var e_level  = DOM("special_" + char + "_level");
	var e_exp    = DOM("special_" + char + "_exp");
	
	var rarity = formstr_to_int(e_rarity.value).value;
	
	if (rarity == SPCARD_NAE) {
		// �i�[�G
		e_level.value = 1; // �Ƃ肠����
		e_level.disabled = true;
		e_level.parentElement.classList.add("disabled");
		e_exp.readOnly = false;
		
	} else if ( rarity == SPCARD_SOUKA || rarity == SPCARD_WAZAHANA ||
		rarity == SPCARD_GARDEN_SOUKA || rarity == SPCARD_GARDEN_WAZAHANA )
	{
		// ���ԁE�Z��
		var exp = (
			rarity == SPCARD_SOUKA        ? 1800     :
			rarity == SPCARD_WAZAHANA     ? 720      :
			rarity == SPCARD_GARDEN_SOUKA ? 1800 / 4 : 720 / 4
		);
		
		e_level.value = 1;
		e_level.disabled = true;
		e_level.parentElement.classList.add("disabled");
		e_exp.value = exp;
		e_exp.readOnly = true;
		
	} else if (2 <= rarity && rarity <= 6) {
		// �ʏ�
		// ���x������̃Z�b�g�@�S��60�ł����Ȃ����������c
		var level_raw = formstr_to_int(e_level.value, 1, 1);
		var max   = MAX_LEVELS[rarity - 2][0];
		var level = Math.min(Math.max(level_raw.value, 1), max);
		var exp   = get_exp_as_feed(rarity, level);
		
		e_level.max = max;
		if (!level_raw.good() || level != level_raw.value) {
			e_level.value = level;
		}
		e_level.disabled = false;
		e_level.parentElement.classList.remove("disabled");
		e_exp.value = exp;
		e_exp.readOnly = true;
		
	} else {
		console.log("�J�[�h�̎�ނ��s���ł�");
		return;
	}
	
	set_fit_exp(e_exp);
}


function set_fit_exp(e_input){
	var exp = formstr_to_int(e_input.value);
	
	if (exp.good()) {
		var e = DOM(e_input.id + "_same");
		//if (e) e.textContent = Math.floor(exp.value * 1.5) + " exp";
		if (e) {
			e.textContent = (exp.value * 1.5) + " exp";
		}
	}
}


function set_total_feed_exp(){
	var e_cell = DOM("total_feed_exp");
	if (!e_cell) return;
	
	var form = load_from_document();
	var sum = 0;
	var fit_sum = 0;
	
	for (var i=0; i<form.stacks.length; i++) {
		var c = form.stacks[i].count;
		
		if (c > 0) {
			var card = form.stacks[i].card;
			sum += card.exp_as_feed * c;
			
			if (card.same_element === false) {
				// ������v�ɂ��Čv�Z
				card.same_element = true;
				card.setFeedExp();
				fit_sum += card.exp_as_feed * c;
			} else {
				fit_sum += card.exp_as_feed * c;
			}
		}
	}
	
	var text = sum + " exp";
	if (sum != fit_sum) {
		text += " (������v "+ fit_sum +" exp)";
	}
	e_cell.textContent = text;
}


// �f�o�b�O�p�̕\��
// �ꉞ nothrow ��
function show_debug_tools(show){
	var input = DOM("priority_gold_all");
	var button = DOM("show_debug");
	
	if (input && button) {
		if (show) {
			input.disabled = false;
			input.parentElement.style.display = "inline";
			button.textContent = "�f�o�b�O�p���B��";
			
		} else {
			if (input.checked) {
				var gold = DOM("priority_gold");
				if (gold) {
					gold.checked = true;
					main_optimization();
				}
			}
			input.disabled = true;
			input.parentElement.style.display = "none";
			button.textContent = "�f�o�b�O�p��\��";
		}
	}
}


// �t�H�[���̃f�[�^��ǂݍ���
function load_from_document(){
	var out = new FlowerFormData;
	
	function _load(e, noerror, func){
		if (e) {
			var a = func(e.value);
			if (a.good()) return a.value;
		}
		if (!noerror) out.error = true;
		return 0;
	}
	function _int  (e, noerror){ return _load(e, noerror, formstr_to_int  ); }
	function _float(e, noerror){ return _load(e, noerror, formstr_to_float); }
	
	// ��{
	out.rarity    = _int(DOM("rarity"));
	out.growth    = get_growth();
	out.level     = _int(DOM("current_level", true));
	out.max_level = get_max_level(out.rarity, out.growth);
	out.next_exp  = _int(DOM("next_exp", true));
	out.total_exp = _int(DOM("total_exp"));
	
	// �I�v�V����
	out.exp_factor      = _float(DOM("exp_factor"));
	out.search_priority = DOM("priority_gold").checked ? PRIORITY_GOLD : DOM("priority_exp").checked ? PRIORITY_EXP : PRIORITY_GOLD_ALL;
	out.search_great    =
		DOM("great_nothing" ).checked ? GREAT_NOTHING  :
		DOM("great_onlylast").checked ? GREAT_ONLYLAST :
		DOM("great_nothing_modify").checked ? GREAT_NOTHING_MODIFY :
			GREAT_ALL;
	out.once_min_count  = _int(DOM("once_min_count"));
	
	// �f��
	var safety_limit = MAX_MATERIAL_COUNT; // �ő吔�E���߂̓G���[
	function _stack(card, count_id, allin_id){
		var count = _int(DOM(count_id));
		if (count > safety_limit) {
			out.error = true;
			count = safety_limit;
		}
		return new FKGCardStack(card, count, DOM(allin_id).checked);
	}
	
	var c = 0;
	out.stacks[c++] = _stack(new FKGCard("�}�j��5��"  , true ,  50, 720 ), "count_m_m5"  , "allin_m_m5"  );
	out.stacks[c++] = _stack(new FKGCard("�}�j��20��" , true ,  60, 1800), "count_m_m20" , "allin_m_m20" );
	out.stacks[c++] = _stack(new FKGCard("�}�j��100��", true ,  70, 4800), "count_m_m100", "allin_m_m100");
	out.stacks[c++] = _stack(new FKGCard("�A���v���D" , null , 200, 1080), "count_o_amp" , "allin_o_amp" );
	out.stacks[c++] = _stack(new FKGCard("�}�j��5��"  , false,  10, 720 ), "count_o_m5"  , "allin_o_m5"  );
	out.stacks[c++] = _stack(new FKGCard("�}�j��20��" , false,  20, 1800), "count_o_m20" , "allin_o_m20" );
	out.stacks[c++] = _stack(new FKGCard("�}�j��100��", false,  30, 4800), "count_o_m100", "allin_o_m100");
	// ����
	var chars = "A,B,C,D".split(",");
	var nae_count = 0;
	out.special_names = new Array;
	
	for (var i=0; i<chars.length; i++) {
		var r = _int(DOM("special_" + chars[i] +"_rarity"));
		var sp_name = "";
		
		if (r == SPCARD_NAE) {
			sp_name = "�i�[�G";
			if (nae_count++ >= 1) {
				// ��ʂ�����
				sp_name += "ABCD".charAt(i);
			}
		} else if (r == SPCARD_SOUKA) {
			sp_name = "�L��������";
		} else if (r == SPCARD_WAZAHANA) {
			sp_name = "�L�����Z��";
		} else if (r == SPCARD_GARDEN_SOUKA) {
			sp_name = "����(�뉀)";
		} else if (r == SPCARD_GARDEN_WAZAHANA) {
			sp_name = "�Z��(�뉀)";
		} else if (2 <= r && r <= 6) {
			sp_name = "��" + r;
			sp_name += "(Lv" + _int(DOM("special_" + chars[i] +"_level")) + ")";
		}
		out.special_names.push(sp_name);
		
		var sp_exp = _int(DOM("special_" + chars[i] + "_exp"));
		if (sp_exp > 0) {
			var card1 = new FKGCard("����" + chars[i], true , i * 10 + 100, sp_exp);
			card1.viewname = sp_name;
			out.stacks[c++] = _stack(card1, "count_m_sp_" + chars[i], "allin_m_sp_" + chars[i]);
			
			var card2 = new FKGCard("����" + chars[i], false, i * 10 + 15 , sp_exp);
			card2.viewname = sp_name;
			out.stacks[c++] = _stack(card2, "count_o_sp_" + chars[i], "allin_o_sp_" + chars[i]);
		}
	}
	
	// �����ĂȂ�����
	out.cards = new Array;
	for (var i=0; i<c; i++) {
		out.cards.push(out.stacks[i].card);
	}
	
	// �t�H�[���̃f�[�^����v�Z
	if (!out.error) {
		out.exp_table  = get_exp_table(out.rarity, out.growth);
		out.gold_table = get_goldcost_table(out.rarity, out.growth);
		out.goal_exp   = out.exp_table[out.max_level - 1];
		
		out.level2    = exp_to_level(out.total_exp, out.max_level, out.exp_table);
		out.next_exp2 = out.level2 == out.max_level ? 0 : out.exp_table[out.level2] - out.total_exp;
	}
	
	return out;
}


// �t�H�[������ǂݎ���čœK���A���ʂ�\������
function main_optimization(){
	var form = load_from_document();
	
	if (!form.error) {
		var upl = calc_optimized(form);
		
		if (upl) {
			set_result(form, upl);
		} else {
			clear_result();
		}
	} else {
		clear_result();
	}
}


// �œK�Ȃ��̂�T������
// �߂�l: PowerupList
function calc_optimized(form){
	var uplist = null;
	
	// �o���l�A�b�v��K�p
	var stacks = FKGCardStack.duplicate(form.stacks);
	
	if (form.exp_factor > 1) {
		// �v�Z�덷���
		// ���͂�1%���݂Ƃ���
//		let factor100 = Math.round(form.exp_factor * 100);
		
		for (var i=0; i<stacks.length; i++) {
			var card = stacks[i].card;
			card.exp_factor = form.exp_factor;
//			card.basic_exp_as_feed = card.basic_exp_as_feed * factor100 / 100;
			card.setFeedExp();
		}
	}
	
	// �听���͊e�f�ނ��ƂɌo���l1.5�{�؂�̂ĂŎb��Ή�
	// 1��̌o���l���v��1.5�{�����肦�邳��H
	
	if (form.search_great == GREAT_NOTHING) {
		// �听���Ȃ�
		if (form.search_priority == PRIORITY_GOLD) {  // �S�[���h�D��
			uplist = calc_mingold_powerup_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		} else if (form.search_priority == PRIORITY_EXP) {  // �o���l�D��
			uplist = calc_minexp_powerup_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		} else if (form.search_priority == PRIORITY_GOLD_ALL) {  // �S�[���h�D��(�S�T��)
			var begin = new Date;
			uplist = calc_mingold_powerup_of_s_all(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
			var end = new Date;
			
			if (1) {
				// debug�p�@�����ȕ��Ɖ����ς��Ȃ������`�F�b�N
				var fast_uplist = calc_mingold_powerup_of_s_fast(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
				var ts_uplist = calc_mingold_powerup_of_s_TS(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
				
				if (fast_uplist.gold_to_powerup != uplist.gold_to_powerup || ts_uplist.gold_to_powerup != uplist.gold_to_powerup) {
					console.log( "�S�[���h����ʂ��Ⴄ���ۂ��I",
						"����:", fast_uplist.gold_to_powerup,
						"/ �S�T:", uplist.gold_to_powerup,
						"/ TS:", ts_uplist.gold_to_powerup
					);
				}
				
				if (0) {
					// ���Ԃ��v��
					var lc = 10;
					var t1 = new Date;
					for (var i=0; i<lc; i++) {
						calc_mingold_powerup_of_s_fast(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
					}
					var t2 = new Date;
					for (var i=0; i<lc; i++) {
						calc_mingold_powerup_of_s_TS(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
					}
					var t3 = new Date;
					// fast, ts, all
					console.log("time(x"+ lc +"):", t2.getTime() - t1.getTime(), t3.getTime() - t2.getTime(), (end.getTime() - begin.getTime()) * lc);
				}
			}
		}
		
		if (uplist) {
			uplist.comment_main = "�听���Ȃ�";
		}
		
	} else if (form.search_great == GREAT_ONLYLAST) {
		// ���X�g�̂ݑ听��
		if (form.search_priority == PRIORITY_GOLD) {
			uplist = calc_mingold_lastgreat_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		} else if (form.search_priority == PRIORITY_EXP) {
			uplist = calc_minexp_lastgreat_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		}
		
		if (uplist) {
			uplist.use_sub = true;
			uplist.comment_main = "�Ōゾ���听��<br>�z��ŗǒl";
			uplist.comment_sub  = "�Ōゾ���听��<br>�z��ň��l";
		}
		
	} else if (form.search_great == GREAT_NOTHING_MODIFY) {
		// �听���Ȃ�(�听���l��)
		if (form.search_priority == PRIORITY_GOLD) {
			uplist = calc_mingold_powerup2_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		} else if (form.search_priority == PRIORITY_EXP) {
			uplist = calc_minexp_powerup2_of_s(form.total_exp, form.goal_exp, stacks, form.max_level, form.exp_table, form.gold_table, form.once_min_count);
		}
		
	} else if (form.search_great == GREAT_ALL) {
		// ���ׂđ听��
		// �������Ȃ��Ă�����ˁc
	}
	
	if (!uplist) {
		console.log("�T�����@���s���Ȃ̂ł�"); // �������͑f�ނȂ���?
	}
	
	return uplist;
}


function set_outline(form, uplist){
	var table = DOM("outline_table");
	
	while (table.tBodies.length > 0) {
		table.removeChild(table.tBodies[0]);
	}
	
	//console.log(uplist.list, form);
	table.appendChild(_list_to_tbody(uplist.list, uplist.comment_main));
	
	if (uplist.use_sub) {
		var ls = uplist.list.concat(uplist.sublist);
		if (ls.length >= 1) {
			// �Ō�̂��̂͐����Ōv�Z������
			var last = ls[ls.length - 1] = ls[ls.length - 1].clone();
			last.suppose_great = false;
			last.gain_experience = last.recalcExp(false);
			last.end_experience = last.before_experience + last.gain_experience;
		}
		table.appendChild(_list_to_tbody(ls, uplist.comment_sub));
	}
	
	return;
	
	
	function _list_to_tbody(list, comment){
		var tbody = document.createElement("tbody");
		
		var last_once  = list.length >= 1 ? list[list.length - 1] : null;
		var est_exp    = last_once ? last_once.end_experience : form.total_exp;
		var est_level  = exp_to_level(est_exp, form.max_level, form.exp_table);
		var est_next   = est_level == form.max_level ? 0 : form.exp_table[est_level] - est_exp;
		var exceed_exp = est_exp - form.exp_table[form.max_level - 1];
		
		var info_obj = new Object;
		function _infokey(name, elem){
			return name + "\t" + (elem === true ? "1" : elem === false ? "0" : "-1");
		}
		function _add_info(name, elem){
			var key = _infokey(name, elem);
			info_obj[key] = _cards_info(list, name, elem);
		}
		function _get_info(name, elem){
			return info_obj[_infokey(name, elem)];
		}
		_add_info("�}�j��5��", true);
		_add_info("�}�j��20��", true);
		_add_info("�}�j��100��", true);
		_add_info("�}�j��5��", false);
		_add_info("�}�j��20��", false);
		_add_info("�}�j��100��", false);
		_add_info("�A���v���D", null);
		_add_info("����A", true);
		_add_info("����B", true);
		_add_info("����C", true);
		_add_info("����D", true);
		_add_info("����A", false);
		_add_info("����B", false);
		_add_info("����C", false);
		_add_info("����D", false);
		
		var total_exp = 0;
		var total_fit_exp = 0;
		for (var i in info_obj) {
			total_exp += info_obj[i].exp;
			total_fit_exp += info_obj[i].fit_exp;
		}
		// �덷������ƕ����񂪒����Ȃ��Ă��܂��̂�
		const sc = 100;
		total_exp = Math.round(total_exp * sc) / sc;
		total_fit_exp = Math.round(total_fit_exp * sc) / sc;
		
		var total_exp_text = total_exp;
		if (total_fit_exp != total_exp) total_exp_text += "<br>(" + total_fit_exp + ")";
		
		function _numcell(cell, number, numtext){
			if (numtext) {
				cell.innerHTML = numtext;
			} else {
				cell.textContent = number;
			}
			
			cell.classList.add("number");
			if (number < 0) cell.classList.add("minus");
			else if (number == 0) cell.classList.add("zero");
			else if (number > 0) cell.classList.add("plus");
			return cell;
		}
		
		
		var comment_span = 3;
		
		tbody.appendChild(create_row([
			create_html_cell("th", comment, comment_span, 2, "comment"),
			create_cell("th", "Lv"),
			create_cell("th", "����Lv�܂�"),
			create_cell("th", "�݌v�o���l"),
			create_cell("th", "�]��o���l"),
			create_cell("th", "������p"),
			create_cell("th", "�f�ލ��v")
		], "header"));
		
		tbody.appendChild(create_row([
			create_cell("td", est_level),
			create_cell("td", est_next),
			create_cell("td", est_exp),
			_numcell(create_cell("td", "", 1, 1, "exceed"), exceed_exp),
			_numcell(create_cell("td"), last_once ? last_once.total_gold_to_powerup : 0),
			_numcell(create_cell("td"), total_exp, total_exp_text)
		]));
		
		tbody.appendChild(create_row([
			create_cell("th", "�g�p�f��"),
			create_cell("th", "�}�j��5��"),
			create_cell("th", "�}�j��20��"),
			create_cell("th", "�}�j��100��"),
			create_cell("th", "�A���v���D"),
			create_cell("th", form.special_names[0]), // "����A"
			create_cell("th", form.special_names[1]), // "����B"
			create_cell("th", form.special_names[2]), // "����C"
			create_cell("th", form.special_names[3]), // "����D"
		], "width_set material_header"));
		
		tbody.appendChild(create_row([
			create_cell("th", "������", 1, 1, "material_header"),
			_numcell(create_cell("td"), _get_info("�}�j��5��", true).count),
			_numcell(create_cell("td"), _get_info("�}�j��20��", true).count),
			_numcell(create_cell("td"), _get_info("�}�j��100��", true).count),
			create_cell("td", "�|", 1, 1, "empty"),
			_numcell(create_cell("td"), _get_info("����A", true).count),
			_numcell(create_cell("td"), _get_info("����B", true).count),
			_numcell(create_cell("td"), _get_info("����C", true).count),
			_numcell(create_cell("td"), _get_info("����D", true).count)
		]));
		
		tbody.appendChild(create_row([
			create_cell("th", "�ʑ���", 1, 1, "material_header"),
			_numcell(create_cell("td"), _get_info("�}�j��5��", false).count),
			_numcell(create_cell("td"), _get_info("�}�j��20��", false).count),
			_numcell(create_cell("td"), _get_info("�}�j��100��", false).count),
			_numcell(create_cell("td"), _get_info("�A���v���D", null).count),
			_numcell(create_cell("td"), _get_info("����A", false).count),
			_numcell(create_cell("td"), _get_info("����B", false).count),
			_numcell(create_cell("td"), _get_info("����C", false).count),
			_numcell(create_cell("td"), _get_info("����D", false).count),
		]));
		
		return tbody;
	}
	
	function _cards_info(list, subname, same_element){ // list: once�̔z��
		var info = {count: 0, exp: 0, fit_exp: 0};
		for (var i=0; i<list.length; i++) {
			var arr = list[i].materials;
			for (var j=0; j<arr.length; j++) {
				if (arr[j].name.indexOf(subname) >= 0 && arr[j].same_element === same_element) {
					info.count++;
					
					// �L�����y�[���{���̂Ȃ��l
					let exp = FKGCard.calcFeedExp(arr[j].basic_exp_as_feed, arr[j].same_element, 1);
					info.exp += exp;
					
					if (arr[j].same_element === false) {
						exp = FKGCard.calcFeedExp(arr[j].basic_exp_as_feed, true, 1);
					}
					info.fit_exp += exp;
				}
			}
		}
		return info;
	}
}


function clear_result(){
	var table = DOM("process_table");
	if (table.tHead) table.removeChild(table.tHead);
	while (table.tBodies.length > 0) {
		table.removeChild(table.tBodies[0]);
	}
	
	var table = DOM("outline_table");
	while (table.tBodies.length > 0) {
		table.removeChild(table.tBodies[0]);
	}
}

// uplist: PowerupList
function set_result(form, uplist){
	clear_result();
	
	// �����ߒ�
	var table = DOM("process_table");
	var show_limit = 50;
	var show_count = 0;
	
	table.appendChild(make_once_thead(form));
	
	for (var i=0; i<uplist.list.length; i++) {
		if (show_count >= show_limit) break;
		table.appendChild(make_once_tbody(uplist.list[i], form.max_level, form.exp_table, false));
		show_count++;
	}
	
	for (var i=0; i<uplist.sublist.length; i++) {
		if (show_count >= show_limit) break;
		table.appendChild(make_once_tbody(uplist.sublist[i], form.max_level, form.exp_table, true));
		show_count++;
	}
	
	var total = uplist.list.length + uplist.sublist.length;
	if (show_count >= show_limit && show_count < total) {
		var text = "��������̂ňȉ��͏ȗ�����܂����c�c(�S" + uplist.list.length + "��";
		if (uplist.sublist.length >= 1) {
			text += "+" + uplist.sublist.length + "��";
		}
		text += ")";
		
		var tbody = document.createElement("tbody");
		tbody.appendChild(create_row([create_cell("td", text, 5+4+4)], "omit"));
		table.appendChild(tbody);
	}
	
	set_outline(form, uplist);
}


function make_once_thead(form){
	var text = "";
	text += "��" + form.rarity + "(";
	text += form.growth == 0 ? "���i��" : form.growth == 1 ? "�i���ς�" : "�J��";
	text += ") Lv" + form.level2;
	if (form.next_exp2 > 0) {
		text += "/Next" + form.next_exp2;
	} else if (form.next_exp2 == 0) {
		text += "(MAX)";
	}
	text += " ����̋���";
	
	// ����˔j�̌x��
	if (form.growth == 2 && form.max_level > 80 && form.max_level - form.level2 > 5) {
		text += "<br>���ӁF����˔j��Lv80���B��A5Lv���Ƃɍs���܂��B�v�Z���ʂ͐������Ȃ������c�c";
	}
	
	var thead = document.createElement("thead");
	thead.appendChild(create_row([create_html_cell("th", text, 5+4+4)]));
	return thead;
}

// once: PowerupOnce
function make_once_tbody(once, limit_level, exp_table, extra_row){
	var base_exp = once.before_experience;
	
	var tbody = document.createElement("tbody");
	
	// header
	tbody.appendChild( create_row([
		create_cell("th", "["+ once.number +"]", 5, 1, "number" + (extra_row ? " extra" : "")),
		create_cell("th", "����", 4, 1, "succeed"),
		create_cell("th", "�听��", 4, 1, "great")
	], "header") );
	
	var h2cells = [
		create_cell("td", "Lv"),
		create_cell("td", "����Lv�܂�"),
		create_cell("td", "�݌v�o���l"),
		create_cell("td", "", 1, 2, "empty"),
		create_cell("td", "������p"),
		create_cell("td", "Lv"),
		create_cell("td", "����Lv�܂�"),
		create_cell("td", "�݌v�o���l"),
		create_cell("td", "�ő�Lv�܂�"),
		create_cell("td", "Lv"),
		create_cell("td", "����Lv�܂�"),
		create_cell("td", "�݌v�o���l"),
		create_cell("td", "�ő�Lv�܂�")
	];
	
	for (var i=0; i<h2cells.length; i++) {
		if (h2cells[i].textContent != "") {
			h2cells[i].classList.add("header2");
		}
		if (5 <= i && i <= 8) {
			h2cells[i].classList.add("succeed");
		} else if (i >= 9) {
			h2cells[i].classList.add("great");
		}
	}
	
	tbody.appendChild(create_row(h2cells, "width_set"));
	
	var base_level = exp_to_level(base_exp, limit_level, exp_table);
	var base_next = base_level == limit_level ? 0 : exp_table[base_level] - base_exp;
	
	var limit_exp = exp_table[limit_level - 1];
	
	let gold_cell = create_cell("td", once.gold_to_powerup, 1, 1, "hint_text");
	gold_cell.title = (once.gold_to_powerup / once.materials.length) + " x" + once.materials.length;
	
	var cells_1 = [
		create_cell("td", base_level),
		create_cell("td", base_next),
		create_cell("td", base_exp),
		gold_cell
	];
	var cells_2 = [];
	var cells_3 = [];
	
	once.materials.sort(function (a, b){
		var c = a.exp_as_feed - b.exp_as_feed;
		if (c == 0) c = b.priority - a.priority;
		return c;
	});
	
	function _material_cell(once, pos){
		var td = create_cell("td");
		td.classList.add("material");
		if (pos < once.materials.length) {
			td.innerHTML = once.materials[pos].toString();
			td.classList.add(
				once.materials[pos].same_element ? "fit" :
				once.materials[pos].same_element === null ? "noelement" :
				"different"
			);
		} else {
			td.classList.add("empty");
		}
		return td;
	}
	
	for (var i=0; i<5; i++) {
		var p2 = i % 5;
		var p3 = p2 + 5;
		cells_2.push(_material_cell(once, p2));
		cells_3.push(_material_cell(once, p3));
	}
	
	for (var i=0; i<2; i++) {
		var great = i == 1;
		
		var gain_exp = once.recalcExp(great);
		var est_exp = base_exp + gain_exp;
		var est_level = exp_to_level(est_exp, limit_level, exp_table);
		var est_next = est_level == limit_level ? 0 : exp_table[est_level] - est_exp;
		
		var remain_exp = limit_exp - est_exp;
		
		var next_text = "";
		if (!great && once.comment_succeed != "") {
			next_text = once.comment_succeed;
		} else if (great && once.comment_great != "") {
			next_text = once.comment_great;
		}
		
		cells_1.push(create_cell("td", est_level));
		cells_1.push(create_cell("td", est_next));
		cells_1.push(create_cell("td", est_exp));
		cells_1.push(create_cell("td", remain_exp, 1, 1, remain_exp < 0 ? "overexp" : remain_exp == 0 ? "justexp" : ""));
		
		var class2 = (great ? "great" : "succeed") + " header2";
		cells_2.push(create_cell("td", "�l���o���l", 1, 1, class2));
		cells_2.push(create_cell("td", "�݌v��p", 1, 1, class2));
		cells_2.push(create_html_cell("td", next_text, 2, 2));
		
		cells_3.push(create_cell("td", "+" + gain_exp));
		cells_3.push(create_cell("td", once.total_gold_to_powerup));
	}
	
	tbody.appendChild(create_row(cells_1));
	tbody.appendChild(create_row(cells_2));
	tbody.appendChild(create_row(cells_3));
	
	return tbody;
}




