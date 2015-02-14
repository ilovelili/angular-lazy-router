angular.module('ngRouteExt', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        var origWhen = $routeProvider.when;
        var origOtherwise = $routeProvider.otherwise;

        $routeProvider.when = function (path, route) {
            return origWhen.call(this, path, transform(route));
        };

        $routeProvider.otherwise = function (route) {
            return origOtherwise.call(this, transform(route));
        };

        function transform(route) {
            route = angular.copy(route);

            if ($routeProvider.baseUrl && route.templateUrl && route.templateUrl[0] != '/') {
                route.templateUrl = $routeProvider.baseUrl + '/' + route.templateUrl;
            }

            if ($routeProvider.baseUrl && route.controllerUrl && route.controllerUrl[0] != '/') {
                route.controllerUrl = $routeProvider.baseUrl + '/' + route.controllerUrl;
            }

            if (route.controllerUrl) {
                if (!route.resolve) route.resolve = {};
                route.controller = ngRouteExtController(route.resolve);
                route.resolve['ngRouteExtActualCtrl'] = ngRouteExtResolve(route.controllerUrl);
            }

            return route;
        }

        function ngRouteExtController(resolve) {
            var dependencies = ['$injector', 'ngRouteExtActualCtrl', '$scope'];

            for (var key in resolve) {
                if (resolve.hasOwnProperty(key)) {
                    dependencies.push(key);
                }
            }

            var controller = function ($injector, ngRouteExtActualCtrl) {
                var locals = {};
                for (var i = 2; i < dependencies.length; i++) {
                    locals[dependencies[i]] = arguments[i];
                }
                $injector.invoke(ngRouteExtActualCtrl, this, locals);
            };

            controller.$inject = dependencies;

            return controller;
        }

        function ngRouteExtResolve(url) {
            var resolve = function ($q) {
                return $q(function (resolve, reject) {
                    require([url], resolve, reject);
                });
            };
            resolve.$inject = ['$q'];
            return resolve;
        }
    }])
;