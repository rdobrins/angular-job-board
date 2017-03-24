var jobBoard = angular.module('jobBoard', ['ngResource', 'templates']);

jobBoard.factory("Job", function($resource) {
  return $resource("jobs/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
});

jobBoard.directive('myModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   }
});

jobBoard.directive('jobForm', function() {
   return {
     restrict: 'A',
     scope: {
       job: '=',
     },
     templateUrl: "jobForm.html",
   }
});

jobBoard.controller("jobsController", function($scope, Job) {
  $scope.jobs = Job.index();

  $scope.addJob = function() {
    job = Job.save($scope.newJob);
    $scope.jobs.push(job);
    $scope.newJob = {};
  }

  $scope.editJob = function(index) {
    job = $scope.jobs[index];
    $scope.jobToEditIndex = index;
    $scope.jobToEdit = job;
  }

  $scope.saveJob = function() {
    edittedJob = $scope.jobs[$scope.jobToEditIndex];
    Job.update(edittedJob, $scope.jobToEdit);
    $scope.dismiss();
  }

  $scope.deleteJob = function(index) {
    job = $scope.jobs[index];
    Job.delete(job);
    $scope.jobs.splice(index, 1);
  }
});
