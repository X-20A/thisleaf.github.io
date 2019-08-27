// データの保存関係


// 文字列をそのまま保存するフォームのID
const DIRECT_SAVE_FORMIDS = [
	"fleet_name",
	"HQ_level",
	"HQ_level_modify",
	"memo",
];


// デフォルトの値 (データオブジェクト)
const LOSDATA_FORM_DEFAULT = {
	HQ_level: "120",
};

// localStorageのキー
const LOSDATA_STORAGE_KEY = "losdata_record";

// データのバージョン
const LOSDATA_VERSION = 1;

// 現在保存されている編成
let losdata_record = new Array;


// 初期化 ------------------------------------------------------------------------------------------
function init_los_record(){
	DOM("load_button").addEventListener("click", ev_click_load_button);
	DOM("delete_button").addEventListener("click", ev_click_delete_button);
	DOM("fleet_name").addEventListener("input", ev_input_fleet_name);
	DOM("save_button").addEventListener("click", ev_click_save_button);
	DOM("allclear_button").addEventListener("click", ev_click_allclear_button);
	DOM("show_button_check").addEventListener("change", ev_change_show_button_check);
	
	refresh_otherbutton();
	
	// 読み込み
	load_losdata();
}


// event -------------------------------------------------------------------------------------------
// 編成の読み込み
function ev_click_load_button(e){
	let select = DOM("savelist");
	let data = losdata_record[select.value];
	
	if (data) {
		set_losdata_object(data);
		refresh_savebutton_state();
		save_losdata();
	}
}

// 編成の削除
function ev_click_delete_button(e){
	let select = DOM("savelist");
	if (!/^\d+$/.test(select.value)) return;
	
	let index = +select.value;
	
	if (index < losdata_record.length) {
		losdata_record.splice(index, 1);
		refresh_record_select();
		refresh_savebutton_state();
		save_losdata();
	}
}

// 編成名が変更された
function ev_input_fleet_name(e){
	refresh_savebutton_state();
}

// 編成の保存
function ev_click_save_button(e){
	let e_fleet_name = DOM("fleet_name");
	let name = trim_fleet_name(e_fleet_name.value);
	
	if (name == "") {
		console.log("編成の保存エラー: 編成名がありません");
		return;
	}
	
	let index = losdata_record.findIndex(x => x.fleet_name == name);
	if (index < 0) index = losdata_record.length;
	
	losdata_record[index] = get_losdata_object();
	refresh_record_select(name);
	refresh_savebutton_state();
	save_losdata();
}

// フォームをクリア
function ev_click_allclear_button(){
	DOM("fleet_name").value = "";
	DOM("memo").value = "";
	for (let i=1; i<=SHIP_COUNT_MAX; i++) {
		let e = DOM("ship_los_" + i);
		e.value = "";
	}
	for (let i=0; i<equipment_rows_show_count; i++) {
		equipment_rows[i].clear_form(true);
	}
	refresh_score();
	refresh_savebutton_state();
	save_losdata();
}

// 削除・クリアボタンの表示切り替え
function ev_change_show_button_check(){
	refresh_otherbutton();
}

function refresh_otherbutton(){
	let name = "hidden";
	if (DOM("show_button_check").checked) {
		DOM("delete_button").classList.remove(name);
		DOM("allclear_button").classList.remove(name);
	} else {
		DOM("delete_button").classList.add(name);
		DOM("allclear_button").classList.add(name);
	}
}


// 保存・読み込み ----------------------------------------------------------------------------------
// DOM上のデータ→データオブジェクト
function get_losdata_object(){
	let obj = new Object;
	
	// フォームの内容をそのまま取ってくる
	get_form_strings(obj, DIRECT_SAVE_FORMIDS);
	obj.fleet_name = trim_fleet_name(obj.fleet_name);
	
	// 艦娘
	obj.ship_los_strings = new Array;
	for (let i=1; i<=SHIP_COUNT_MAX; i++) {
		obj.ship_los_strings.push(DOM("ship_los_" + i).value);
	}
	
	// 装備
	obj.equiprow_count = equipment_rows_show_count;
	obj.equiprow_data = new Array;
	for (let i=0; i<equipment_rows_show_count; i++) {
		obj.equiprow_data.push(equipment_rows[i].get_json_object());
	}
	
	return obj;
}


// データオブジェクト→DOM上のデータ
function set_losdata_object(obj){
	if (!obj) obj = LOSDATA_FORM_DEFAULT;
	
	set_form_values(obj, DIRECT_SAVE_FORMIDS);
	let e_modify = DOM("HQ_level_modify");
	if (e_modify.selectedIndex < 0) e_modify.selectedIndex = 0;
	
	// 艦娘
	for (let i=1; i<=SHIP_COUNT_MAX; i++) {
		let str = obj.ship_los_strings && obj.ship_los_strings[i - 1];
		DOM("ship_los_" + i).value = str || "";
	}
	
	// 装備
	let count = +obj.equiprow_count || EQUIPMENT_ROW_DEFAULT;
	count = Math.min(Math.max(obj.equiprow_count, EQUIPMENT_ROW_MIN), EQUIPMENT_ROW_MAX);
	change_equiprow_count(count);
	
	for (let i=0; i<equipment_rows_show_count; i++) {
		if (obj.equiprow_data && obj.equiprow_data[i]) {
			equipment_rows[i].set_json_object(obj.equiprow_data[i]);
		} else {
			equipment_rows[i].clear_form(true);
		}
	}
	
	refresh_score();
}


// localStorage ------------------------------------------------------------------------------------
function save_losdata(){
	let json = JSON.stringify({
		record: losdata_record,
		working: get_losdata_object(),
		version: LOSDATA_VERSION,
	});
	
	localStorage.setItem(LOSDATA_STORAGE_KEY, json);
}


function load_losdata(){
	let json = localStorage.getItem(LOSDATA_STORAGE_KEY);
	
	// record が Array は保証される
	let record = new Array;
	let working = null;
	
	if (json) {
		let data = null;
		try {
			data = JSON.parse(json);
		} catch (err) {}
		
		if (data && data.record) {
			for (let i=0; i<data.record.length; i++) {
				record[i] = update_losdata_object(data.record[i], data.version);
			}
		}
		if (data && data.working) {
			working = update_losdata_object(data.working, data.version);
		}
	}
	
	losdata_record = record;
	refresh_record_select(working && trim_fleet_name(working.fleet_name));
	set_losdata_object(working);
	refresh_savebutton_state();
}


// データオブジェクトのバージョンアップがあれば
function update_losdata_object(obj, version){
	// とくにないです
	return obj;
}


// DOM操作/その他 ----------------------------------------------------------------------------------
// 保存された編成一覧を更新
function refresh_record_select(new_name){
	let select = DOM("savelist");
	let select_name = new_name || select.value;
	remove_children(select);
	
	losdata_record = losdata_record.filter(x => x && x.fleet_name);
	losdata_record.sort(function (a, b){
		return a.fleet_name < b.fleet_name ? -1 : a.fleet_name > b.fleet_name ? 1 : 0;
	});
	
	let names = losdata_record.map(x => x.fleet_name);
	let select_index = 0;
	
	for (let i=0; i<names.length; i++) {
		select.appendChild(new Option(names[i], i));
		if (names[i] == select_name) {
			select_index = i;
		}
	}
	
	if (names.length >= 1) {
		select.selectedIndex = select_index;
	}
}


// 保存ボタンの状態を更新
function refresh_savebutton_state(){
	let btn = DOM("save_button");
	let name = trim_fleet_name(DOM("fleet_name").value);
	
	let overwrite = losdata_record.find(x => x && x.fleet_name == name);
	btn.textContent = overwrite ? "保存(上書き)" : "保存(新規)";
	
	btn.disabled = (
		name == "" ? true  :
		!overwrite ? false :
		             losdata_equals(get_losdata_object(), overwrite)
	);
}


// 同値なデータオブジェクトを表しているか
function losdata_equals(a, b){
	// 横着
	return JSON.stringify(a) == JSON.stringify(b);
}


// 編成名をチェック
// 空文字が返った場合は保存不可とする
function trim_fleet_name(name){
	// 前後の空白は無効とする
	return String(name).replace(/^[\s　]+|[\s　]+$/g, "");
}


