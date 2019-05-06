// ���낢��ȃy�[�W�Ŏg����֐��̂܂Ƃ�

// ���̃t�@�C���Ŏg����N���X --------------------------------------------------------------------
// �t�H�[���̕�����Ȃǂ̕ϊ�����
ConvertResult.prototype = {
	value: 0,
	error: false,
	empty: false,
	message: null,
	
	good   : ConvertResult_good,
	get    : ConvertResult_get,
	valueOf: ConvertResult_valueOf
};

ConvertResult.good = ConvertResult_static_good;


function ConvertResult(){
	switch (arguments.length) {
	default:
	case 4: this.message = arguments[3];
	case 3: this.empty = arguments[2];
	case 2: this.error = arguments[1];
	case 1: this.value = arguments[0];
	case 0: break;
	}
}

function ConvertResult_good(){
	return !this.empty && !this.error;
}

function ConvertResult_get(def){
	return this.good() ? this.value : def;
}

function ConvertResult_valueOf(){
	return this.value;
}

function ConvertResult_static_good(x){
	return x && x.good();
}


// �ėp�֐� ----------------------------------------------------------------------------------------
// 2�����ɂ��āA�߂��ɂ��邩
function is_near(x, y, d){
	return Math.abs(x - y) <= d;
}

// xor (boolean)
// �܂� != �Ȃ�ł�����
function xor(a, b){
	return (a ? 1 : 0) != (b ? 1 : 0);
}


// �Ă��[�Ƃȕϊ��֐�
// x�Ƃ�flen���傫���Ȃ�Ƃ��܂��ϊ��ł��Ȃ�����
function float_to_string(x, flen, dir){
	if (!(flen >= 0)) flen = 0;
	
	var scaler = Math.pow(10, flen);
	x *= scaler;
	x  = dir > 0 ? Math.ceil(x) : dir < 0 ? Math.floor(x) : Math.round(x);
	x /= scaler;
	var str = String(x);
	
	if (flen > 0) {
		var fill = 0;
		if (/^\-?\d+\.(\d+)$/.test(str)) {
			fill = flen - RegExp.$1.length;
			
		} else if (/^\-?\d+$/.test(str)) {
			str += ".";
			fill = flen;
		}
		for (var i=0; i<fill; i++) str += "0";
	}
	return str;
}


// ����id�̒ǉ�
// �v�f��ǉ������Ƃ���id���ς���Ă��܂���������Ȃ��͔̂�������
function add_autoid(json, begin){
	for (var i=0; i<json.length; i++) {
		if (json[i] && !json[i].hasOwnProperty("id")) {
			json[i].id = begin++;
		}
	}
	return json;
}

// id -> �f�[�^ �̃}�b�v���쐬
// json: id���v���p�e�B�Ɏ��I�u�W�F�N�g(�f�[�^)�̔z��
function makemap_by_id(json){
	var map = new Object;
	for (var i=0; i<json.length; i++) {
		if (json[i] && json[i].hasOwnProperty("id")) {
			if (map.hasOwnProperty(json[i].id)) {
				// �d���̌x��
				console.log("warning: id���d�����Ă��܂�(" + json[i].id + ")");
			}
			map[json[i].id] = json[i];
		}
	}
	return map;
}

// name��
function makemap_by_name(json){
	var map = new Object;
	for (var i=0; i<json.length; i++) {
		if (json[i] && json[i].hasOwnProperty("name")) {
			if (map.hasOwnProperty(json[i].name)) {
				// �d���̌x��
				console.log("warning: name���d�����Ă��܂�(" + json[i].name + ")");
			}
			map[json[i].name] = json[i];
		}
	}
	return map;
}

// id����Q��
// �擪���珇�Ɍ��Ă������߁A��������̃f�[�^���Q�Ƃ���ꍇ�͏�̊֐��ŃI�u�W�F�N�g��������ق�������
function get_param_by_id(json, id){
	for (var i=0; i<json.length; i++) {
		if (json[i] && json[i].hasOwnProperty("id") && json[i].id == id) {
			return json[i];
		}
	}
	return null;
}

// name��
function get_param_by_name(json, name){
	for (var i=0; i<json.length; i++) {
		if (json[i] && json[i].hasOwnProperty("name") && json[i].name == name) {
			return json[i];
		}
	}
	return null;
}

// x���U�������ꍇ�ɗ�O�𓊂���
function assert(x, message){
	if (!x) {
		if (!message) message = "assertion failed!";
		throw new Error(message);
	}
	return x;
}



// DOM�֌W -----------------------------------------------------------------------------------------
// jQuery �ɂ� $ ���Ă������炵���ˁH
function DOM(id){
	return document.getElementById(id);
}


function create_input(type, id, name, className, value){
	var e = document.createElement("input");
	switch (arguments.length) {
	default:
	case 5: e.value = value;
	case 4: e.className = className;
	case 3: e.name = name;
	case 2: e.id = id;
	case 1: e.type = type;
	case 0: break;
	}
	return e;
}


function create_select(id, className){
	var e = document.createElement("select");
	switch (arguments.length) {
	default:
	case 2: e.className = className;
	case 1: e.id = id;
	case 0: break;
	}
	return e;
}


function create_cell(tag, text, colspan, rowspan, className){
	var e = document.createElement(tag);
	switch (arguments.length) {
	default:
	case 5: e.className = className;
	case 4: e.rowSpan = rowspan;
	case 3: e.colSpan = colspan;
	case 2: e.textContent = text;
	case 1:
	case 0: break;
	}
	return e;
}

function create_html_cell(tag, html, colspan, rowspan, className){
	var e = document.createElement(tag);
	switch (arguments.length) {
	default:
	case 5: e.className = className;
	case 4: e.rowSpan = rowspan;
	case 3: e.colSpan = colspan;
	case 2: e.innerHTML = html;
	case 1:
	case 0: break;
	}
	return e;
}


function create_row(cells, className){
	var tr = document.createElement("tr");
	if (cells) {
		for (var i=0; i<cells.length; i++) {
			tr.appendChild(cells[i]);
		}
	}
	if (className) tr.className = className;
	return tr;
}


// �q�m�[�h�����ׂč폜
function remove_children(elem){
	while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	}
}


// select�̃N���X��I�𒆂�option�̃N���X�ɂ���
function option_class_inheritancer(ev){
	var e = ev.srcElement;
	if (e.selectedIndex >= 0) {
		e.className = e.options[e.selectedIndex].className;
	}
}


// �X�^�C���̓��I�ύX
// id=style_changer ��style�v�f���K�v
// �Â��X�^�C���͏㏑�������
function change_style(selector, text){
	var style = document.getElementById("style_changer");
	if (!style) return;
	
	var sheet = style.sheet;
	var css = selector + "{" + text + "}";
	
	for (var i=0; i<sheet.cssRules.length; i++) {
		if (sheet.cssRules[i].selectorText == selector) {
			sheet.deleteRule(i);
			break;
		}
	}
	sheet.insertRule(css, 0);
}

// �����񂩂琔�l�ւ̕ϊ�
// �߂�l�� ConvertResult
// �t�H�[���̓ǂݎ��Ȃǂ�
function formstr_to_int(value, empty_value, error_value){
	var res = new ConvertResult;
	
	if (/^[\+\-]?\d+$/.test(value)) {
		res.value =  parseInt(value, 10);
		
	} else if (value === "") {
		res.empty = true;
		if (arguments.length >= 2) res.value = empty_value;
		
	} else {
		res.error = true;
		if (arguments.length >= 3) res.value = error_value;
	}
	return res;
}

function formstr_to_float(value, empty_value, error_value){
	var res = new ConvertResult;
	
	if (/^[\+\-]?\d+(?:\.\d+)?$/.test(value)) {
		res.value = parseFloat(value);
		
	} else if (value === "") {
		res.empty = true;
		if (arguments.length >= 2) res.value = empty_value;
		
	} else {
		res.error = true;
		if (arguments.length >= 3) res.value = error_value;
	}
	return res;
}


// �������̎Q�Ƃ�W�J
// str: �W�J���镶����
function unescape_charref(str){
	if (!unescape_charref.element) {
		unescape_charref.element = document.createElement("pre");
	}
	return str.replace(/&(?:\w+|#\d+);/g, function (x){
		unescape_charref.element.innerHTML = x;
		return unescape_charref.element.textContent;
	});
}


// checkbox, radio�̂�
function get_form_checks(obj, ids){
	for (var i=0; i<ids.length; i++) {
		var e = document.getElementById(ids[i]);
		if (e) {
			obj[ids[i]] = e.checked;
		}
	}
	return obj;
}

function get_form_check(id){
	return DOM(id).checked;
}

function get_form_ints(obj, empty_value, error_value, ids){
	for (var i=0; i<ids.length; i++) {
		var e = document.getElementById(ids[i]);
		if (e) {
			obj[ids[i]] = formstr_to_int(e.value, empty_value, error_value);
		}
	}
	return obj;
}

function get_form_int(id){
	return formstr_to_int(DOM(id).value);
}

function get_form_floats(obj, empty_value, error_value, ids){
	for (var i=0; i<ids.length; i++) {
		var e = document.getElementById(ids[i]);
		if (e) {
			obj[ids[i]] = formstr_to_float(e.value, empty_value, error_value);
		}
	}
	return obj;
}

function get_form_float(id){
	return formstr_to_float(DOM(id).value);
}

function get_form_strings(obj, ids){
	for (var i=0; i<ids.length; i++) {
		var e = document.getElementById(ids[i]);
		if (e) {
			obj[ids[i]] = e.value;
		}
	}
	return obj;
}

function set_form_values(obj, ids){
	for (var i=0; i<ids.length; i++) {
		var e = document.getElementById(ids[i]);
		if (e) {
			if (e.tagName == "INPUT" && e.type == "checkbox") {
				e.checked = obj[ids[i]];
			} else {
				e.value = obj[ids[i]];
			}
		}
	}
}


function add_error_class(id){
	var e = DOM(id);
	e.classList.add(FORM_ERROR_CLASSNAME);
}

function clear_error_class(id){
	var e = DOM(id);
	e.classList.remove(FORM_ERROR_CLASSNAME);
}



