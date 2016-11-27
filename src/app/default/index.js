import { PhotosServiceName } from '../services/photos';
import { MapServiceName } from '../services/map';
import { MarkerServiceName } from '../services/markers';

const template = require('./default.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

console.log("caseyApi")
console.log("teting now")
// var caseyApi = config.caseyApi;

export const DefaultCtrl = [
  '$scope',
  PhotosServiceName,
  MapServiceName,
  MarkerServiceName,
  '$sce',
  class DefaultCtrl {
    constructor($scope, PhotosService, MapService, MarkerService, $sce) {
      $scope.friends =[];
      $scope.instaData = MapService.getInstaData();
      $scope.locationData = MapService.getLocationData();
      $scope.locations = MapService.getLocations();
      $scope.locationSet = MapService.getLocationSet();
      $scope.oms = MapService.getOms();

      MapService.initMap();
      $scope.instaData.length = 0;
      $scope.locationData.length = 0;
      //casey
      MapService.getData('https://api.instagram.com/v1/users/55870965/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=55870965.2c4aaae.e0dd1784350a44838eda4573296a5750');

      //aaron
      MapService.getData('https://api.instagram.com/v1/users/175690487/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=175690487.02eff85.ba29a57614cf43ddb14034f110153c76');

      //frenzone
      MapService.getData('https://api.instagram.com/v1/media/search?lat=21.2922381&lng=-157.8237538&distance=5000&callback=JSON_CALLBACK&access_token=4120053413.02eff85.2d5b2829f52046549e0f2a92ac0655c6');

      //renee
      MapService.getData('https://api.instagram.com/v1/users/1639523138/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=1639523138.02eff85.d94a89d9f62d4c04a42233a9675da020');

      //JP
      MapService.getData('https://api.instagram.com/v1/users/196312792/media/recent/?count=99&&callback=JSON_CALLBACK&access_token=196312792.0f4f10a.e1911280307a478fb82448f6d6282be8');

      $scope.map = MapService.getMap();
      $scope.setMapOnAll = MarkerService.setMapOnAll.bind(MarkerService, $scope.map);
      $scope.showMarkers = MarkerService.showMarkers.bind(MarkerService, $scope.map);
      $scope.clearMarkers = MarkerService.clearMarkers.bind(MarkerService);
      $scope.deleteMarkers = MarkerService.deleteMarkers.bind(MarkerService);

      $scope.centerMap = MarkerService.centerMap.bind(this, $scope.map, $scope.locationData);

      $scope.getUserPhotos = MarkerService.getUserPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.locationData, MapService.locations, MapService.locationSet, $scope.instaData);
      $scope.showAllPhotos = MarkerService.showAllPhotos.bind(MarkerService, $scope.map, MapService.oms, $scope.locationData, MapService.locations, MapService.locationSet, $scope.instaData);

      MapService.update = function () {
        $scope.instaData = this.instaData;
        $scope.locationData = this.locationData;
        $scope.locations = this.locations;
        $scope.locationSet = this.locationSet;
        $scope.oms = this.oms;
      };
      $scope.onChange = function (){
        var numberHours =(Math.round(($scope.inputTime/3600)) + " hours");
        if($scope.inputTime >= 86400){
          numberHours =(Math.round(($scope.inputTime/86400)) + " days");
        }
        $scope.inputTimeDisplay = numberHours + " ago";
      };

      $scope.logout = function (){
        localStorage.clear();
      };

      PhotosService.getFriends()
      .success((friends) => {
        $scope.friends = friends.data;
      });

      $scope.openNav = function(){
        let sideNav = document.getElementById("mySidenav");
        if(sideNav.style.width === "0px"){
          sideNav.style.width = "250px";
        }else{
          sideNav.style.width = "0px";
        }
      };

    }
  }

];