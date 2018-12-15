<template>
  <div>airCondition</div>
</template>

<script>
// import axios from "axios";
import data from "../data/weather.json";

export default {
  data() {
    return {
      mapInfo: {}
    };
  },
  methods: {
    success(pos) {
      var crd = pos.coords;

      console.log("Your current position is:");
      console.log("Latitude : " + crd.latitude);
      console.log("Longitude: " + crd.longitude);
      console.log("More or less " + crd.accuracy + " meters.");
    },
    error(err) {
      console.warn("ERROR(" + err.code + "): " + err.message);
    },
    getGeolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            // 성공
            console.log("------------position--------------", position);
            resolve(position);
          },
          error => {
            // 실패
            console.log("------------error--------------", error);
            reject(error);
          },
          {
            timeout: 1000
          }
        );
      });
    },
    searchCoordinateToAddress(latlng) {
      console.log("naver.maps : ", naver.maps);

      var tm128 = naver.maps.TransCoord.fromLatLngToTM128(latlng);

      infoWindow.close();

      naver.maps.Service.reverseGeocode(
        {
          location: tm128,
          coordType: naver.maps.Service.CoordType.TM128
        },
        function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("Something Wrong!");
          }

          var items = response.result.items,
            htmlAddresses = [];

          for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
            item = items[i];
            addrType = item.isRoadAddress ? "[도로명 주소]" : "[지번 주소]";

            htmlAddresses.push(i + 1 + ". " + addrType + " " + item.address);
          }

          infoWindow.setContent(
            [
              '<div style="padding:10px;min-width:200px;line-height:150%;">',
              '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
              htmlAddresses.join("<br />"),
              "</div>"
            ].join("\n")
          );

          infoWindow.open(map, latlng);
        }
      );
    },
    searchAddressToCoordinate(address) {
      naver.maps.Service.geocode(
        {
          address: address
        },
        function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert("Something Wrong!");
          }

          var item = response.result.items[0],
            addrType = item.isRoadAddress ? "[도로명 주소]" : "[지번 주소]",
            point = new naver.maps.Point(item.point.x, item.point.y);

          infoWindow.setContent(
            [
              '<div style="padding:10px;min-width:200px;line-height:150%;">',
              '<h4 style="margin-top:5px;">검색 주소 : ' +
                response.result.userquery +
                "</h4><br />",
              addrType + " " + item.address + "<br />",
              "</div>"
            ].join("\n")
          );

          map.setCenter(point);
          infoWindow.open(map, point);
        }
      );
    },
    initGeocoder() {
      // map.addListener("click", function(e) {
      //   searchCoordinateToAddress(e.coord);
      // });
      // $("#address").on("keydown", function(e) {
      //   var keyCode = e.which;
      //   if (keyCode === 13) {
      //     // Enter Key
      //     searchAddressToCoordinate($("#address").val());
      //   }
      // });
      // $("#submit").on("click", function(e) {
      //   e.preventDefault();
      //   searchAddressToCoordinate($("#address").val());
      // });
      // searchAddressToCoordinate("정자동 178-1");
    }
  },
  created() {
    this.getGeolocation()
      .then(result => {
        this.mapInfo = result;
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  mounted() {
    this.searchCoordinateToAddress(37.3595704, 127.105399);

    //this.searchAddressToCoordinate("강남구");
    // axios
    //   .get("../data/weather.json")
    //   .then(res => {
    //     console.log("res : ", res);
    //   })
    //   .catch(err => {
    //     console.log("err : ", err);
    //   });
    //console.log("data : ", data);
    // navigator.geolocation.getCurrentPosition(
    //   function(suc) {
    //     console.log("suc :", suc);
    //   },
    //   function(err) {
    //     console.log("err!!! : ", err);
    //   },
    //   {
    //     timeout: 1000
    //   }
    // );
    // let vm = this;
    // console.log(
    //   " test : ",
    //   navigator.geolocation.getCurrentPosition(vm.success, vm.error)
    // );
    // .then(res => {
    //   console.log("success : ", res);
    // })
    // .catch(err => {
    //   console.log("error : ", err);
    // });
  }
};
</script>

<style>
</style>
