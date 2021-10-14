// import axios from "axios";

/**
 * 封装百度定位
 */
export let getCurrentCity = () => {
  // 根据定位去拿城市的名称和id
  let city = JSON.parse(localStorage.getItem("location"));
  if (!city) {
    // 本地没有就去请求
    return new Promise((resolve, reject) => {
      var myCity = new window.BMapGL.LocalCity();
      myCity.get((res) => {
        // let details = await axios.get("http://api-haoke-dev.itheima.net/area/info?name='res.name'");
        let city = {
          label: "北京",
          value: '"AREA|88cff55c-aaa4-e2e0"',
        };
        localStorage.setItem("location", JSON.stringify(city));
        resolve(city);
      });
    });
  } else {
    // 有就直接拿来用
    return  Promise.resolve(city)
  }
};
