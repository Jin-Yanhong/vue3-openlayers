import { dictValue, dictValueList } from "@/type";

/**
 *
 * @param collection 翻译需要对照的数据
 * @param value 待翻译的值
 * @param collectionField 对照集合中的字段 默认 'value'
 * @param collectionLabel 对照集合中的字段名称 默认 'label'
 * @returns
 */
export function fieldTranslate(
  collection: Array<dictValue>,
  value: number,
  collectionField: keyof dictValue = "value",
  collectionLabel: keyof dictValue = "label"
) {
  if (collection && value && value.toString().length) {
    if (Object.prototype.toString.call(collection) === "[object Array]") {
      const checked = collection.find((ele: dictValue) => {
        return ele[collectionField] == value;
      });
      const tips = (checked && checked[collectionLabel]) || "Error";
      return tips;
    } else {
      console.log(
        "fieldTranslate Error: the type of the first parameter must be array!"
      );
      return "";
    }
  } else {
    console.log("fieldTranslate Error: please check function parameters!");
    return "";
  }
}
export function getDate(dateStr: string) {
  const date = dateStr ? new Date(dateStr) : new Date();
  return {
    date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
      date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
    }:${date.getMinutes()}:${date.getSeconds()}`,
    imageIndex: date.getDay() + 1,
  };
}

export const bitToMbit = (bit: number): number =>
  Number((bit / 1024 / 1024).toFixed(2));

/**
 *
 * @param {string | number} timestamp 需要转化的时间戳
 * @param { string } timestamp 需要转化的时间戳
 * @returns
 */
export function dateFormatter(time: any, pattern?: string): string {
  const dateTime: string = new Date(time).toJSON();
  new Date(+new Date(dateTime) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  if (arguments.length === 0 || !time) {
    return "";
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time.replace(new RegExp(/-/gm), "/");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const timeStr = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result, key: keyof typeof formatObj) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    }
  );
  return timeStr;
}

export function getStorage(key: string): string {
  const str: string = window.localStorage.getItem(key) ?? "";
  try {
    if (str) {
      return JSON.parse(str)[key];
    } else {
      return "";
    }
  } catch (error: any) {
    return "";
  }
}

export function setStorage(key: string, value: any): void {
  const str = JSON.stringify({
    [key]: value,
  });
  window.localStorage.setItem(key, str);
}

export function clearStorage(): void {
  window.localStorage.clear();
}
