// ダメージの計算関係

// 攻撃力キャップ
export function sqrtcap(x, cap){
	return x > cap ? cap + Math.sqrt(x - cap) : x;
}

// 上の逆関数
export function inv_sqrtcap(y, cap){
	return y > cap ? (y - cap) * (y - cap) + cap : y;
}

