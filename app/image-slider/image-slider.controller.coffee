imagesliderCtrl = ->
	vm = @

	selectImage = (idx)->
		vm.slider.current = idx
		angular.element document.querySelector(".imgsld .imgsld-modal")
			.addClass "show"
		return true		

	close = ->
		angular.element document.querySelector(".imgsld .imgsld-modal")
			.removeClass "show"
		return true

	keyDown = (ev)->
		if ev.keyCode is 27 # ESC
			vm.close()
		else if ev.keyCode is 37 # ARROW LEFT
			vm.slider.prev()
		else if ev.keyCode is 39 # ARROW RIGHT
			vm.slider.next()

	activate = ->
		vm.selectImage = selectImage
		vm.close = close
		vm.keyDown = keyDown

	activate()
	return

angular.module "ngImageslider"
	.controller "imagesliderCtrl", imagesliderCtrl