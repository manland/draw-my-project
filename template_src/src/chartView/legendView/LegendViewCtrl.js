angular.module('app').controller('LegendViewCtrl', [
	'$scope', 'LegendViewService', 'ConstantsService',
	function($scope, legendViewService, constantsService) {

		$scope.isAngularjsType = constantsService.getType() === 'angularjs';
		$scope.isJavaType = constantsService.getType() === 'java';

	}
]);