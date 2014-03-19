'use strict'

angular.module("BHF", ["ngRoute"])
    .config(function($routeProvider, $httpProvider){
    
        $routeProvider
            .when('/index', {
                templateUrl: "views/index.html",
                controller: "C_index"
            })
            .when('/report', {
                templateUrl: "views/report.html",
                controller: "C_report"
            })
            .when('/project/:id', {
                templateUrl: "views/project.html",
                controller: "C_project"
            })
            .when('/projectsort/:sort', {
                templateUrl: "views/project-sort.html",
                controller: "C_project_sort"
            })

        $routeProvider.otherwise({      
            redirectTo: '/index'            
        })
        
        $httpProvider.defaults.transformRquest = function(obj){
            var str=[];
            for(var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
            }
            return str.join("&");
        }

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
}).run(function($rootScope){
})
