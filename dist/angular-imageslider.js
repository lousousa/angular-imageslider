(function() {
  angular.module("ngImageslider", []);

}).call(this);

(function() {
  var imagesliderCtrl;

  imagesliderCtrl = function() {
    var activate, close, keyDown, selectImage, vm;
    vm = this;
    selectImage = function(idx) {
      vm.slider.current = idx;
      angular.element(document.querySelector(".imgsld .imgsld-modal")).addClass("show");
      return true;
    };
    close = function() {
      angular.element(document.querySelector(".imgsld .imgsld-modal")).removeClass("show");
      return true;
    };
    keyDown = function(ev) {
      if (ev.keyCode === 27) {
        return vm.close();
      } else if (ev.keyCode === 37) {
        return vm.slider.prev();
      } else if (ev.keyCode === 39) {
        return vm.slider.next();
      }
    };
    activate = function() {
      vm.selectImage = selectImage;
      vm.close = close;
      return vm.keyDown = keyDown;
    };
    activate();
  };

  angular.module("ngImageslider").controller("imagesliderCtrl", imagesliderCtrl);

}).call(this);

(function() {
  var imageslider;

  imageslider = function($timeout, $compile, $window, $interval, $templateCache) {
    $templateCache.put("imageslider.html", '<div ng-keydown="vm.keyDown($event)" class="imgsld"> <div class="imgsld-modal"> <div class="imgsld-inner-modal"> <div class="imgsld-container-imagebox"><a href="javascript:;" ng-click="vm.close()" class="imgsld-button-close"><span class="icon-cancel-outline"></span></a> <picture class="imgsld-imagebox"> <div ng-hide="vm.slider.pictureList[vm.slider.current]._data.loaded" class="imgsld-cssload-container"> <div class="imgsld-cssload-double-torus"></div> </div><img ng-show="vm.slider.pictureList[vm.slider.current]._data.loaded" ng-src="{{vm.slider.pictureList[vm.slider.current].url}}" class="imgsld-img"/> </picture> </div> <div class="imgsld-container-wrapper"> <div class="imgsld-wrapper"> <div class="imgsld-inner-wrapper"><a href="javascript:;" ng-click="vm.slider.prev()" class="imgsld-button"><span class="icon-left-open-outline"></span></a><a href="{{vm.slider.pictureList[vm.slider.current].url}}" download="download" class="imgsld-button"><span class="icon-download-outline"></span></a><span class="imgsld-label">{{vm.slider.current + 1}} / {{vm.slider.pictureList.length}}</span><a href="javascript:;" ng-click="vm.slider.next()" class="imgsld-button"><span class="icon-right-open-outline"></span></a></div> </div> </div> </div> </div> <div class="imgsld-body"> <ng-transclude></ng-transclude> </div> </div>');
    return {
      restrict: "A",
      scope: {
        imageslider: "="
      },
      templateUrl: "imageslider.html",
      transclude: true,
      controller: "imagesliderCtrl as vm",
      link: function(scope, el, attr, ctrl) {
        ctrl.slider = {
          pictureList: scope.imageslider,
          current: 0,
          getNext: function() {
            return Math.min(this.current + 1, scope.imageslider.length - 1);
          },
          getPrev: function() {
            return Math.max(this.current - 1, 0);
          },
          next: function() {
            return this.current = this.getNext();
          },
          prev: function() {
            return this.current = this.getPrev();
          }
        };
        angular.forEach(ctrl.slider.pictureList, function(picture) {
          var interval;
          picture["_data"] = new Image();
          picture._data.src = picture.url;
          return interval = $interval(function() {
            if (picture._data.complete) {
              $interval.cancel(interval);
              return picture._data.loaded = true;
            }
          });
        });
        return $timeout(function() {
          var $imagebox, $wrapper, _setHeight;
          angular.forEach(el[0].querySelectorAll("[imageslider-trigger]"), function(trigger) {
            var imgIndex;
            imgIndex = parseInt(angular.element(trigger).attr("imageslider-trigger"));
            angular.element(trigger).attr("ng-click", "vm.selectImage(" + imgIndex + ")");
            return $compile(angular.element(trigger))(scope);
          });
          $imagebox = angular.element(el[0].querySelector(".imgsld-imagebox"));
          $wrapper = angular.element(el[0].querySelector(".imgsld-wrapper"));
          _setHeight = function() {
            $imagebox.css({
              height: ($window.innerHeight * .92) + "px"
            });
            return $wrapper.css({
              height: ($window.innerHeight * .08) + "px"
            });
          };
          _setHeight();
          return angular.element($window).on("resize", _setHeight);
        });
      }
    };
  };

  angular.module("ngImageslider").directive("imageslider", imageslider);

}).call(this);
