var jobBoard = angular.module('jobBoard', ['ngResource', 'templates']);

jobBoard.factory("Job", function($resource) {
  return $resource("jobs/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
});

jobBoard.directive('editModal', function() {
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
     controller: "jobsController"
   }
});

jobBoard.controller("jobsController", function($scope, Job) {
  $scope.jobs = Job.index();
  $scope.formClosed = true;

  $scope.sortBy = function(column) {
    switch (column) {
      case 'date':
        $scope.jobs = _.sortBy($scope.jobs, (job) => { return job.date; });
        break;
      case 'author':
        $scope.jobs = _.sortBy($scope.jobs, (job) => { return job.author; });
        break;
      case 'category':
        $scope.jobs = _.sortBy($scope.jobs, (job) => { return job.category; });
        break;
      case 'location':
        $scope.jobs = _.sortBy($scope.jobs, (job) => { return job.location; });
        break;
      case 'status':
        $scope.jobs = _.sortBy($scope.jobs, (job) => { return job.status; });
        break;
      default:
    }
  }

  $scope.statuses = [
    { id: 1, name: 'New', value: 'new' },
    { id: 2, name: 'Pending', value: 'pending' },
    { id: 3, name: 'Complete', value: 'complete' }
  ];

  $scope.locations = [
    { id: 1, name: 'Allston', value: 'allston' },
    { id: 2, name: 'Boston', value: 'boston' },
    { id: 3, name: 'Brookline', value: 'brookline' },
    { id: 4, name: 'Cambridge', value: 'cambridge' },
    { id: 5, name: 'Watertown', value: 'watertown' }
  ];

  $scope.categories = [
    { id: 1, name: 'Landscaping', value: 'landscaping' },
    { id: 2, name: 'Cleaning', value: 'cleaning' },
    { id: 3, name: 'Labor', value: 'labor' },
    { id: 4, name: 'Babysitting', value: 'babysitting' },
    { id: 5, name: 'Tutoring', value: 'tutoring' }
  ];

  $scope.openForm = function() {
    $scope.formClosed = false;
    $scope.newJob = {};
  }

  $scope.closeForm = function() {
    $scope.formClosed = true;
    $scope.newJob = {};
  }

  $scope.addJob = function() {
    job = Job.save($scope.newJob);
    $scope.jobs.push(job);
    $scope.newJob = {};
    $scope.formClosed = true;
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
