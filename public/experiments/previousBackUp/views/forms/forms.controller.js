/**
 * Created by NishantRatnakar on 2/28/2016.
 */


"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, $rootScope, $location, FormService)
    {


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.fTitle = null;
        $scope.fmessage = null;
        $scope.selectedForm = null;

        var user = $rootScope.currentUser;



        getCurrentUserForms(user);

        function getCurrentUserForms(cUser)
        {
            var getForms = function(cUserForms)
            {
                $scope.userForms = cUserForms
            };

            FormService.findAllFormsForUser(user._id,getForms)
        }


        function addForm(formTitle)
        {
            console.log(formTitle);
            if(formTitle != null)
            {
                var newForm = {"_id": null, "title": formTitle, "userId": null};

                var newFormList = function(nform)
                {

                    var getForms = function(cUserForms)
                    {
                        $scope.userForms = cUserForms;
                    };

                    FormService.findAllFormsForUser(user._id, getForms);   //use getCurrentUserForms(user); instead
                };

                FormService.createFormForUser(user._id, newForm, newFormList);
                $scope.fTitle = null;
                $scope.fmessage = "Form added!!!"

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
                       "userId": $scope.selectedForm.userId
                   };

                   var updatedFormList = function(uform)
                   {
                       var getForms = function(cUserForms)
                       {
                           $scope.userForms = cUserForms;
                       };

                       FormService.findAllFormsForUser(user._id, getForms);
                   };

                   FormService.updateFormById(updatedForm._id, updatedForm, updatedFormList);

                   $scope.fTitle = null;
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

            var updatedFormList = function(forms)
            {
                var getForms = function(cUserForms)
                {
                    $scope.userForms = cUserForms;
                };

                FormService.findAllFormsForUser(user._id, getForms);
            };

            FormService.deleteFormById($scope.userForms[index]._id, updatedFormList);
            $scope.fmessage = "Form deleted!!!"
        }

        function selectForm(index)
        {
            //declaration of global variable selectedForm
            $scope.selectedForm = $scope.userForms[index];
            $scope.fTitle = $scope.selectedForm.title;
        }




    }
})();
