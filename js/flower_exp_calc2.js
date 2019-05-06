
function powerup2_rearrangement(pl, base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count){
	let has_fixed = false;
	for (let i=0; i<stacks.length; i++) {
		// �\�[�g�p
		stacks[i].card.fixed = stacks[i].allin ? 1 : 0;
		
		if (stacks[i].allin && stacks[i].count > 0) {
			has_fixed = true;
		}
	}
	
	for (let pos=0; pos<pl.list.length; pos++) {
		let once = pl.list[pos];
		
		// LvMax��̋����̓X���[
		if (once.before_experience >= goal_exp) break;
		
		// �������̉�ő听���������������A���S�ɖ��ʂɂȂ��Ă��܂��J�[�h���������珜�O���Č����Ĕz�u����
		let great_end = once.before_experience + once.recalcExp(true);
		if (great_end < goal_exp) continue;
		
		// �Œ��O��
		let materials = once.materials.concat();
		materials.sort(function (a, b){
			let c = b.fixed - a.fixed;
			if (c == 0) c = FKGCard.exp_less(a, b);
			return c;
		});
		
		let removable = 0;
		for (let i=1; i<materials.length; i++) {
			// 0 .. i-1 ��i���̃J�[�h�ŋ������l����
			let gain_exp = PowerupOnce.calcExp(materials, 0, i, true);
			if (once.before_experience + gain_exp >= goal_exp) {
				removable = materials.length - i;
				break;
			}
		}
		if (removable == 0) continue;
		
		// �Ĕz�u
		// �Œ肪�I�������\�������邪����Ȃ̂Ŏd�l�Ƃ���
		let rearranges = materials.slice(-removable);
		rearranges.sort(FKGCard.exp_less);
		
		// ����͖����ɂȂ�
		for (let i=pos+1; i<pl.list.length; i++) {
			rearranges = rearranges.concat(pl.list[i].materials);
		}
		// once�܂ŏ��O
		while (pl.list.length > pos) {
			pl.pop_back(1);
		}
		
		// once���珜�O
		once.materials = materials.slice(0, -removable);
		once.materials.sort(FKGCard.exp_less);
		//once.mat_end -= removable;
		once.gold_to_powerup = gold_table[once.before_level - 1] * once.materials.length;
		once.total_gold_to_powerup = pl.gold_to_powerup + once.gold_to_powerup;
		once.gain_experience = once.recalcExp(true);
		once.end_experience = once.before_experience + once.gain_experience;
		//once.comment_succeed = COMMENT_TO_NTH(once.number + 1);
		
		pl.push_back(once, 1);
		
		
		let last_once = once;
		let end_exp = once.before_experience + once.recalcExp(false);
		let total_gold = pl.gold_to_powerup;
		let next_number = once.number + 1;
		
		while (rearranges.length > 0) {
			let materials = new Array;
			let gain_exp = 0;
			let ilim = Math.min(rearranges.length, 10);
			
			for (let i=0; i<ilim; i++) {
				materials.push(rearranges[i]);
				
				// �ő�܂ŋ�������Ă���Ȃ番������Ӗ��͂Ȃ��̂�
				if (end_exp < goal_exp) {
					let great_exp = PowerupOnce.calcExp(materials, 0, i + 1, true);
					if (end_exp + great_exp >= goal_exp) break;
				}
			}
			
			rearranges = rearranges.slice(materials.length);
			
			let once = new PowerupOnce;
			once.materials = materials;
			
			once.before_experience = end_exp;
			once.before_level = exp_to_level(end_exp, limit_level, exp_table);
			once.gold_to_powerup = gold_table[once.before_level - 1] * materials.length;
			total_gold += once.gold_to_powerup;
			once.total_gold_to_powerup = total_gold;
			once.suppose_great = false;
			
			once.gain_experience = once.recalcExp(false);
			end_exp += once.gain_experience;
			once.end_experience = end_exp;
			once.number = next_number++;
			
			pl.push_back(once, 2);
		}
		
		// �R�����g
		var p_comm = has_fixed ? COMMENT_POSSIBLY_COMPLETE : COMMENT_COMPLETE;
		pl.setOnceComments(1, goal_exp, null, null, p_comm, null);
		last_once.comment_succeed = COMMENT_TO_NTH(last_once.number + 1);
		pl.setOnceComments(2, goal_exp, p_comm, COMMENT_RECALC, COMMENT_COMPLETE, COMMENT_LACK);
		
		pl.use_sub = true;
		
		return true;
	}
	
	return false;
}



// �听���Ȃ�(�听���l��) x �S�[���h�D��
// �܂��听���Ȃ��Ōv�Z���邪�A�Ō�̕��ő听���ɂ��I�[�o�[�������܂�o�Ȃ��悤�ɒ�������
function calc_mingold_powerup2_of_s(base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count){
	// �x�[�X
	let pl = calc_mingold_powerup_of_s(base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count, GREAT_NOTHING);
	
	powerup2_rearrangement(pl, base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count);
	
	pl.comment_main = "�听���Ȃ�(�听���l��)<br>�z��ŗǒl";
	pl.comment_sub  = "�听���Ȃ�(�听���l��)<br>�z��ň��l";
	
	return pl;
}


// �听���Ȃ�(�听���l��) x �o���l�D��
function calc_minexp_powerup2_of_s(base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count){
	// �x�[�X
	let pl = calc_minexp_powerup_of_s(base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count, GREAT_NOTHING);
	
	powerup2_rearrangement(pl, base_exp, goal_exp, stacks, limit_level, exp_table, gold_table, once_min_count);
	
	pl.comment_main = "�听���Ȃ�(�听���l��)<br>�z��ŗǒl";
	pl.comment_sub  = "�听���Ȃ�(�听���l��)<br>�z��ň��l";
	
	return pl;
}


