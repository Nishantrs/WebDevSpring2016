/**
 * Created by NishantRatnakar on 2/28/2016.
 */

"use strict";

(function(){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        //var forms = [];
        //
        //forms =
        //    [
        //    {"_id": "000", "title": "Contacts", "userId": 123},
        //    {"_id": "010", "title": "ToDo",     "userId": 123},
        //    {"_id": "020", "title": "CDs",      "userId": 234}
        //    ];

        //Function declarations
        var api = {

            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById: findFormById
        };

        return api;

        //Function implementation
        //function createFormForUser(userId, form, callback)
        //{
        //    form._id = (new Date).getTime();
        //    form.userId = userId;
        //    forms.push(form);
        //    callback(form);
        //}

        function createFormForUser(userId, formObj)
        {
            return $http({
                method: 'POST',
                url: '/api/assignment/user/' + userId + '/form',
                data: formObj
            });
        }

        //function findAllFormsForUser(userId, callback)
        //{
        //    var userForms = [];
        //
        //    for (var i=0; i < forms.length; i++)
        //    {
        //        if (forms[i].userId == userId)
        //        {
        //            userForms.push(forms[i]);
        //        }
        //    }
        //    callback(userForms);
        //}

        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        //function deleteFormById(formId, callback)
        //{
        //    for(var i=0; i < forms.length; i++)
        //    {
        //        if(forms[i]._id == formId)
        //        {
        //            forms.splice(i,1);
        //            break;
        //        }
        //    }
        //    callback(forms);
        //}

        function deleteFormById(formId)
        {
            return $http.delete("/api/assignment/form/" + formId);
        }


        //function updateFormById(formId, newForm, callback)
        //{
        //    for(var i=0; i < forms.length; i++)
        //    {
        //        if(forms[i]._id == formId)
        //        {
        //            forms[i] = newForm;
        //            callback(forms[i]);
        //            break;
        //        }
        //    }
        //
        //}

        function updateFormById(formId, newForm)
        {
            return $http({
                method: 'PUT',
                url: '/api/assignment/form/' + formId,
                data: newForm
            });
        }

        function findFormById(formId)
        {

            return $http.get("/api/assignment/form/" + formId);
        }


    }
})();