import remoteLoad from "./remoteLoad";
const { AMapCDN, AMapUiCDN } = require("@/plugins/cdn");

/**
 * 函数防抖
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */

export function debounce(func, delay, immediate = false) {
  let timer,
    context = this;
  return (...args) => {
    if (immediate) {
      func.apply(context, args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * 根据path路径返回对应的name名字
 * @param {Array} route
 * @param {String} path
 * @return {String}
 */

export function getRouteName(route, path) {
  if (!path) return "";
  let arr = route.filter((item) => item.path == path);
  if (arr.length > 0) {
    return arr[0].meta.title;
  } else {
    console.log(123);
  }
}

/**
 * 获取geoJson数据  通过高德获取    递归获取区县geoJson
 * @param  {string} adcode  行政区code
 * @param  {string} childAdcode 区县级行政区code
 * @return {Array}
 */
export function getGeoJson(adcode, childAdcode = "") {
  return new Promise((resolve, reject) => {
    if (window.AMap && window.AMapUI) {
      insideFun(adcode, childAdcode);
    } else {
      remoteLoad(AMapCDN).then(() => {
        if (window.AMap) {
          remoteLoad(AMapUiCDN).then(() => {
            if (window.AMapUI) {
              insideFun(adcode, childAdcode);
            } else {
              console.error("AMapUI获取失败");
            }
          });
        } else {
          console.error("AMap获取失败");
        }
      });
    }
    function insideFun(adcode, childAdcode) {
      // eslint-disable-next-line
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          let Json = areaNode.getSubFeatures();
          if (Json.length === 0) {
            let parent = areaNode._data.geoData.parent.properties.acroutes;
            insideFun(parent[parent.length - 1], adcode);
            return;
          }

          if (childAdcode) {
            Json = Json.filter((item) => {
              return item.properties.adcode == childAdcode;
            });
          }
          let mapJson = {
            features: Json,
          };
          resolve(mapJson);
        });
      });
    }
  });
}

/**
 * 转换JSON  导出
 * @param  {Array}
 * @return {Array}
 */

export function formatJson(arr, filterVal) {
  return arr.map((v) => filterVal.map((j) => v[j].toString()));
}
