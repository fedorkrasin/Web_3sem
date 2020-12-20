const pageModel = {
    students: []
};

const studentsApp = angular.module('studentsApp', []);
studentsApp.controller('studentController', function($scope, $http) {
    $scope.model = pageModel;
    $http.get('/json')
        .then(function success(response) {
            $scope.model.students = response.data.students;
            $scope.averageMark = $scope.updateAverageMark();
        }, function error(response){
            console.log("Error");
            console.log("Response status: " + response.status);
        }
    );
    $scope.updateData = function() {
        $http.post('/json', {students: $scope.model.students})
        .then(function success(response) {
            if (response.data) {
                console.log('Post Data Submitted Successfully!');
            }
        }, function error(response){
            console.log("Error");
            console.log("Response status: " + response.status);
        })
    };
    $scope.updateAverageMark = function () {
        let sum = 0;
        for (const item of $scope.model.students) {
            sum += +item.averageMark;
        }
        return +sum / $scope.model.students.length;
    };
    $scope.averageMark = 0;  
    $scope.studentToEdit = null;
    $scope.addStudent = function(student) {
        if ($scope.studentToEdit) {
            const index = $scope.model.students.indexOf($scope.studentToEdit);
            $scope.model.students.splice(index, 1, $scope.student);
            $scope.studentToEdit = null;
        } else {
            $scope.model.students.push({
                'name': student.name,
                'surname': student.surname,
                'age': student.age,
                'averageMark': +student.averageMark,
            });
        }
        $scope.averageMark = $scope.updateAverageMark();
        $scope.updateData();
        $scope.student = { 'name': '', 'surname': '', 'age': null, 'averageMark': null };
    };
    $scope.editStudent = function(student) {
        $scope.studentToEdit = student;
        $scope.student = { 'name': student.name, 'surname': student.surname, 'age': student.age, 'averageMark': student.averageMark };
    };
    $scope.deleteStudent = function(student) {
        const index = $scope.model.students.indexOf(student);
        $scope.model.students.splice(index, 1);
        $scope.averageMark = $scope.updateAverageMark();
        $scope.updateData();
    };
});