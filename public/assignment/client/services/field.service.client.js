/**
 * Created by NishantRatnakar on 3/18/2016.
 */


"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http) {

        var api = {
            createField: createField,
            findField: findField,
            findFieldsByForm: findFieldsByForm,
            deleteField: deleteField,
            updateField: updateField,
            sortField: sortField
        };

        return api;

        function createField (formId, field) {
            console.log("In field.service.client.js");
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function findField (formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByForm (formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function sortField(formId, startIndex, endIndex)
        {

            console.log("in field service client");
            return $http.put("/api/assignment/"+formId+"/form?startIndex="+startIndex+"&endIndex="+endIndex);
        }

    }
})();