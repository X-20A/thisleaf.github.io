
KnapsackItem.prototype = {
	name  : "",
	price : 0,
	weight: 0,
	// �ő��
	max_count: Infinity,
	// �ޔ�p
	max_count_orig: Infinity,
	// �I��D��x
	priority: 0,
	// �Ăяo�����Ŏ��R�Ɏg����ϐ�
	tag: null,
	// ���̃f�[�^�����̂��߂̃f�[�^
	index_orig: 0,
	restore_tag: null,
	
	toString: KnapsackItem_toString
};


KnapsackSolution.prototype = {
	counts  : null,
	price   : 0,
	weight  : 0,
	clone   : KnapsackSolution_clone,
	toString: KnapsackSolution_toString
};


// KnapsackItem ------------------------------------------------------------------------------------
function KnapsackItem(name, price, weight, max_count, priority){
	this.name = name;
	this.price = price;
	this.weight = weight;
	if (isFinite(max_count)) this.max_count = max_count;
	if (isFinite(priority)) this.priority = priority;
}

function KnapsackItem_toString(){
	var str = this.name + "(" + this.price + "/" + this.weight + ", max " + this.max_count + ", " + this.priority + ")";
	return str;
}


// KnapsackSolution --------------------------------------------------------------------------------
function KnapsackSolution(len){
	if (isFinite(len)) {
		this.counts = new Array;
		for (var i=0; i<len; i++) this.counts[i] = 0;
	}
}

function KnapsackSolution_clone(){
	var obj = new KnapsackSolution(0);
	obj.counts = this.counts.concat();
	obj.price = this.price;
	obj.weight = this.weight;
	return obj;
}

function KnapsackSolution_toString(){
	var str = "(";
	if (this.counts) str += this.counts.join(", ");
	str += "), price = " + this.price + ", weight = " + this.weight;
	return str;
}


// knapsack ----------------------------------------------------------------------------------------
function gcd(x, y){
	while (y != 0) {
		var r = x % y;
		x = y;
		y = r;
	}
	return x;
}


function preserve_indices(items){
	for (var i=0; i<items.length; i++) {
		items[i].index_orig = i;
	}
}

function restore_indices(items, subarray){
	if (subarray) {
		for (var i=0; i<items.length; i++) {
			items[i].restore_tag = subarray[i];
		}
	}
	
	items.sort(function (a, b){ return a.index_orig - b.index_orig; });
	
	for (var i=0; i<items.length; i++) {
		delete items[i].index_orig;
		
		if (subarray) {
			subarray[i] = items[i].restore_tag;
			delete items[i].restore_tag;
		}
	}
}


// �i�b�v�T�b�N��������
// weight ���v�� max_weight �ȉ����� price ���ő�ɂȂ���̂�T��
// items: KnapsackItem �̔z��A�v�Z���Ƀ\�[�g�����\��������
// max_weight: �ő�d��
// �߂�l: �I�𐔂̔z��̔z��
function solve_knapsack(items, max_weight){
	var dynamic_cache = new Object;
	var len = items.length;
	// check
	// weight > 0
	for (var i=0; i<len; i++) {
		if (!(items[i].weight > 0 && items[i].price >= 0)) return null;
	}
	
	// �D��x��������
	items.sort(_priority_greater);
	// i .. len - 1 �̖��x���傫�������p�ӂ��Ă���
	var d_subitems = new Array;
	for (var i=0; i<items.length; i++) {
		d_subitems[i] = items.slice(i);
		d_subitems[i].sort(_density_greater);
	}
	
	// �v�Z
	
	// �d���ɂ��āA���񐔂Ŋ����Ă������ƂŌv�Z�ʂ����炷����
	var wsc = true;
	var weight_scale;
	var original_max_weight;
	
	if (wsc) {
		original_max_weight = max_weight;
		
		weight_scale = Math.abs(items[0].weight);
		for (var i=1; i<items.length; i++) {
			weight_scale = gcd(weight_scale, Math.abs(items[i].weight));
		}
		
		for (var i=0; i<items.length; i++) items[i].weight /= weight_scale;
		max_weight = Math.floor(max_weight / weight_scale);
	}
	
	var obj;
	//if (0) {
/*
		// ���I�v��@
		// max_weight ���傫���Ė��ʂ�������
		for (var i=0; i<len-1; i++) {
			for (var j=0; j<=max_weight; j++) {
				_dynamic(i, j);
			}
		}
		obj = _dynamic(len - 1, max_weight);
*/
		
	//} else {
		// ���}����@
		obj = _branch();
	//}
	
	
	if (wsc) {
		for (var i=0; i<items.length; i++) items[i].weight *= weight_scale;
		obj.weight *= weight_scale;
		max_weight = original_max_weight;
	}
	
	return obj;
	
	
	function _branch(){
		var cur = new KnapsackSolution(len);
		var max = new KnapsackSolution(len);
		return _branch_sub(cur, max, 0, max_weight);
	}
	
	function _branch_sub(cur, max_sol, pos, space){
		var max_price = max_sol.price;
		var imax = Math.floor(space / items[pos].weight);
		if (imax > items[pos].max_count) imax = items[pos].max_count;
		
		for (var i=imax; i>=0; i--) {
			// pos �Ԗڂ� i ���₵�ă`�F�b�N
			var dp = i * items[pos].price;
			
			if (pos < len - 1) {
				var dw = i * items[pos].weight;
				var sp = space - dw;
				
				cur.counts[pos] += i;
				cur.price += dp;
				cur.weight += dw;
				
				// �×~�@�ɂ���E
				var upper = _branch_greedy_price(cur, pos + 1, sp);
				
				if (upper > max_price) {
					// �ċA�@�[���͕ϐ��̐��܂łȂ̂ŁA���������I�[�o�[�t���[���Ȃ��͂�
					var temp = _branch_sub(cur, max_sol, pos + 1, sp);
					if (temp.price > max_price) {
						max_sol = temp;
						max_price = temp.price;
					}
				}
				
				cur.counts[pos] -= i;
				cur.price -= dp;
				cur.weight -= dw;
				
			} else {
				var price = cur.price + dp;
				
				if (price > max_price) { // == �����Ȃ���ΑO�̕����D��x�����Ȃ�͂�
					max_sol = cur.clone();
					max_sol.counts[pos] += i;
					max_sol.price = price;
					max_sol.weight += i * items[pos].weight;
					max_price = price;
				}
			}
		}
		
		return max_sol;
	}
	
	function _branch_greedy_price(cur, pos, space){
		var price = cur.price;
		var subs = d_subitems[pos]; // pos .. len-1����d���傫���ق�����\�[�g����Ă���
		
		for (var i=pos; i<len; i++) {
			var j = i - pos;
			// �핢�ł���ŏ���
			var c = Math.ceil(space / subs[j].weight);
			if (c > subs[j].max_count) c = subs[j].max_count;
			
			if (c > 0) {
				var cw = c * subs[j].weight;
				
				if (space <= cw) {
					// �c���i�Ŗ��߂�
					price += space * subs[j].price / subs[j].weight;
					space = 0;
					break;
					
				} else {
					// �S��
					price += subs[j].price * c;
					space -= cw;
				}
			}
		}
		return price;
	}
	
	/* // priority���Ή�
	// ���I�v��@
	// pos�Ԗڂ܂ł̗v�f�Ɍ��肵�ĉ������߂�
	function _dynamic(pos, space){
		var hash = pos + "," + space;
		if (dynamic_cache.hasOwnProperty(hash)) return dynamic_cache[hash];
		
		var sol = null;
		// ������鐔�ő�
		var cmax = Math.floor(space / items[pos].weight);
		if (cmax > remains[pos]) cmax = remains[pos];
		
		if (pos <= 0) {
			sol = new KnapsackSolution(len);
			sol.price = items[0].price * cmax;
			sol.weight = items[0].weight * cmax;
			sol.counts[0] = cmax;
			
		} else {
			var max_price = -Infinity;
			
			// �v�f����������邩
			for (var c=0; c<=cmax; c++) {
				var dw = c * items[pos].weight;
				var dp = c * items[pos].price;
				var sp = space - dw;
				
				// ��d�Ń\�[�g����Ă���̂ŁApos�̗v�f�𑝂₷��upper�͉������Ă����͂�
				var upper = _dynamic_greedy_price(pos - 1, sp) + dp;
				if (upper <= max_price) break;
				
				var temp = _dynamic(pos - 1, sp);
				var price = temp.price + dp;
				
				if (price > max_price) {
					sol = temp.clone();
					sol.price = price;
					sol.weight += dw;
					sol.counts[pos] = c;
					max_price = price;
				}
			}
		}
		
		dynamic_cache[hash] = sol;
		return sol;
	}
	
	// �×~�@�ōő�price��Ԃ�
	function _dynamic_greedy_price(pos, free){
		if (free <= 0) return 0;
		
		var price = 0;
		for (var i=0; i<=pos; i++) {
			if (remains[i] > 0) {
				// ��d���傫���ق�����\�[�g����Ă���
				// �S�ē��ꂽ�ꍇ�̏d��
				var iw = remains[i] * items[i].weight;
				
				if (free <= iw) {
					// �c���i�Ŗ��߂�
					price += free * items[i].price / items[i].weight;
					free = 0;
					break;
				} else {
					// �S��
					price += items[i].price * remains[i];
					free -= items[i].weight * remains[i];
				}
			}
		}
		
		return price;
	}
	*/
	
	// ��d���傫��������~���Ƀ\�[�g
	function _density_greater(a, b){
		var da = a.price / a.weight;
		var db = b.price / b.weight;
		
		var c = db - da;
		// �D��x
		if (c == 0) c = b.priority - a.priority;
		// �A���S���Y����A��̏d�����傫������O�ɂ����ق�������
		if (c == 0) c = b.weight - a.weight;
		if (c == 0) c = a.name > b.name ? 1 : a.name == b.name ? 0 : -1;
		return c;
	}
	
	// �D��x���
	function _priority_greater(a, b){
		// �D��x�~��
		var c = b.priority - a.priority;
		if (c == 0) c = _density_greater(a, b);
		return c;
	}
}


// min_weight �ȏ�𖞂����g�ݍ��킹�̂����Aprice �ŏ��̂��̂�T��
// �]����ǂ��ő剻���邩�ƍl����΃i�b�v�T�b�N���ɋA�������
// ���Ȃ��� null
function solve_conjugate_knapsack(items, min_weight){
	var len = items.length;
	
	var wsum = 0;
	for (var i=0; i<len; i++) {
		// check
		if (!(items[i].weight > 0 && items[i].price >= 0)) return null;
	}
	
	for (var i=0; i<len; i++) {
		// ������
		// �I������鐔�́u1��ނ����I�񂾏ꍇ�̌��v�𒴂��Ȃ�
		var ub = Math.ceil(min_weight / items[i].weight);
		items[i].max_count_orig = items[i].max_count;
		if (items[i].max_count > ub) items[i].max_count = ub;
		
		// �D��x�̔��]
		items[i].priority = -items[i].priority;
		
		wsum += items[i].weight * items[i].max_count;
	}
	
	var sol = null;
	
	if (wsum >= min_weight) {
		// �]��̍ő剻
		var mod = solve_knapsack(items, wsum - min_weight);
		
		// �ϊ�
		sol = new KnapsackSolution(len);
		for (var i=0; i<len; i++) {
			sol.counts[i] = items[i].max_count - mod.counts[i];
			sol.price += items[i].price * sol.counts[i];
			sol.weight += items[i].weight * sol.counts[i];
		}
	}
	
	// �߂�
	for (var i=0; i<len; i++) {
		items[i].max_count = items[i].max_count_orig;
		delete items[i].max_count_orig;
		
		items[i].priority = -items[i].priority;
	}
	
	return sol;
}



