# Angular Imageslider

## Description

A slim image slider that can be easily integrated with Angular applications.

## Features

- AngularJS compability;
- Navigation controllers and keyboard mapping;
- Download button for each image.

## Installation

```
bower install angular-imageslider
```

## Usage

```
<script>
	angular.module("demo", ["ngImageslider"]);

	angular.module("demo")
		.controller("demoCtrl", function() {
			vm = this;
			vm.pictureList = [
				{
					url: "path/to/pictures/01.jpg",
					thumb: "path/to/pictures/thumbs/01.jpg"
				},
				{
					url: "path/to/pictures/02.jpg",
					thumb: "path/to/pictures/thumbs/02.jpg"
				},
				{
					url: "path/to/pictures/03.jpg",
					thumb: "path/to/pictures/thumbs/03.jpg"
				}
			];
		});
</script>

<div ng-controller="demoCtrl as vm">
	<div imageslider="vm.pictureList">
		<div ng-repeat="picture in vm.pictureList">
			<a href="javascript:;" imageslider-trigger="{{$index}}">
				<img ng-src="{{picture.thumb}}" />
			</a>
		</div>
	</div>
</div>
```

### imageslider

Directive parent that expects the the list of images, and each image object **must** include the property _url_. 

### imageslider-trigger

Directive child that defines a trigger to open the slider on the image which the index is related to.