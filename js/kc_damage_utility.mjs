// �_���[�W�̌v�Z�֌W

// �U���̓L���b�v
export function sqrtcap(x, cap){
	return x > cap ? cap + Math.sqrt(x - cap) : x;
}

// ��̋t�֐�
export function inv_sqrtcap(y, cap){
	return y > cap ? (y - cap) * (y - cap) + cap : y;
}

