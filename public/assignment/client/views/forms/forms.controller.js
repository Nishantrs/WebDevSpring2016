/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, $rootScope, $location, FormService, UserService)
    {

        var vm =this;
        vm.addForm = addForm;
        vm.updateForm=updateForm;
        vm.deleteForm=deleteForm;
        vm.selectForm=selectForm;


        var user = null;
        $scope.fmessage = null;
        $scope.selectedForm = [];



        function init()
        {
            console.log("forms.controller.js");

            vm.fTitle = null;

            console.log("before request");

            UserService.getCurrentUser()
                .then(function(response)
                {
                    var loggedUser = response.data;

                    console.log(loggedUser);

                    if(loggedUser)
                    {
                        user = loggedUser;

                        FormService.findAllFormsForUser(user._id)
                            .then(renderForms);
                    }
                },function(err)
                {
                    console.log(err);
                });

            console.log("after request");
        }

        init();

        function renderForms(response)
        {
            console.log(response.data);
            if(response.data)
            {
                vm.userForms = response.data;

            }
        }




        function addForm(formTitle)
        {
            console.log(formTitle);
            if(formTitle != null)
            {
                var newForm = {"_id": null, "title": formTitle, "userId": user._id};

                FormService.createFormForUser(user._id, newForm)
                    .then(init);

                //vm.fTitle = null;
                $scope.fmessage = "Form added!!!";

            }
            else
            {
                $scope.fmessage = "Please enter name of the form.";
            }
        }




        function updateForm(formTitle)
        {

            if(formTitle != null)
            {
               if($scope.selectedForm != null)
               {
                   var updatedForm = {
                       "_id": $scope.selectedForm._id,
                       "title": formTitle,
                       "userId": $scope.selectedForm.userId,
                       "fields": $scope.selectedForm.fields
                   };

                   FormService.updateFormById(updatedForm._id, updatedForm)
                       .then(init);

                   //vm.fTitle = null;
                   $scope.selectedForm = null;
                   $scope.fmessage = "Form updated!!!"
               }
                else
               {
                   $scope.fmessage = "Please select a form to update from the list below.";
               }
            }
            else
            {
                $scope.fmessage = "Please select a form to update.";
            }
        }

        function deleteForm(index)
        {
            FormService.deleteFormById(vm.userForms[index]._id)
                .then(init);
            $scope.fmessage = "Form deleted!!!"
        }

        function selectForm(index)
        {
            //declaration of global variable selectedForm
            $scope.selectedForm = vm.userForms[index];
            vm.fTitle = $scope.selectedForm.title;
        }




    }
})();
