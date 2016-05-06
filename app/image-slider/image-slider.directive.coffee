imageslider = ($timeout, $compile, $window, $interval, $location)->
	{
		restrict: "A"
		scope: {
			imageslider: "="
		}
		templateUrl: "#{$location.$$absUrl}image-slider/image-slider.html"
		transclude: true
		controller: "imagesliderCtrl as vm"	
		link: (scope, el, attr, ctrl)->
			ctrl.slider = {
				pictureList: scope.imageslider
				current: 0
				getNext: ->
					Math.min @.current + 1, scope.imageslider.length - 1
				getPrev: ->
					Math.max @.current - 1, 0
				next: ->
					@.current = @.getNext()
				prev: ->
					@.current = @.getPrev()
			}

			angular.forEach ctrl.slider.pictureList, (picture)->
				picture["_data"] = new Image()
				picture._data.src = picture.url
				interval = $interval ->
					if picture._data.complete
						$interval.cancel interval
						picture._data.loaded = true

			$timeout ->
				angular.forEach el[0].querySelectorAll("[imageslider-trigger]"), (trigger)->
					imgIndex = parseInt angular.element(trigger).attr("imageslider-trigger")
					angular.element(trigger).attr("ng-click", "vm.selectImage(#{imgIndex})")
					$compile(angular.element(trigger))(scope)
				
				$imagebox = angular.element document.querySelector ".imgsld .imgsld-imagebox"
				$wrapper = angular.element document.querySelector ".imgsld .imgsld-wrapper"
				
				_setHeight = ->
					$imagebox.css {height: ($window.innerHeight * .92) + "px"}
					$wrapper.css {height: ($window.innerHeight * .08) + "px"}
				_setHeight()

				angular.element($window)
					.on "resize", _setHeight
	}

angular.module "ngImageslider"
	.directive "imageslider", imageslider