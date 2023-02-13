/**
 * 接口返回的数据
 */
export interface responseData {
	code: number;
	data: Array<any> | any;
	msg: string;
}

/**
 * 数据字典列表
 */
export interface dictValueList {
	value: Array<dictValue>;
}

/**
 * 数据字典值
 */
export interface dictValue {
	label: string;
	value: number;
}
