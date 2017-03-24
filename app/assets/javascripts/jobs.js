// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var jobBoard = angular.module('jobBoard', ['ngResource']);

jobBoard.factory("Job", function($resource) {
  return $resource("jobs/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
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

  $scope.saveEditJob = function() {
    edittedJob = $scope.jobs[$scope.jobToEditIndex];
    Job.update(edittedJob, $scope.jobToEdit);
  }

  $scope.deleteJob = function(index) {
    job = $scope.jobs[index];
    Job.delete(job);
    $scope.jobs.splice(index, 1);
  }
});
