
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


ng-route with lazy load

contact me: route666@live.cn


Example

<!doctype html>
<html ng-app="app">
<head>
    <title>angular-route-ext demo</title>
</head>
<body>
    <div ng-view></div>
    <script src="bower_components/requirejs/require.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-route-ext/angular-route-ext.js"></script>
    <script src="app.js"></script>
</body>
</html>

// app.js
angular.module('app', ['ngRouteExt'])
    .config(['$routeProvider', function ($routeProvider) {
        // base url for templateUrl & controllerUrl (not required)
        $routeProvider.baseUrl = 'app';
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controllerUrl: 'home/home.controller.js'
            })
            .when('/demo', {
                templateUrl: 'demo/demo.html',
                controllerUrl: 'demo/demo.controller.js',
                resolve: {
                    data: function () {
                        return 'demo data';
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
    }])
;


// demo.controller.js
define(function () {
    return ['$scope', 'data', DemoCtrl];
    ////////////
    function DemoCtrl($scope, data) {
        /* ... */
    }
});
