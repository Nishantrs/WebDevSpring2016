/**
 * Created by NishantRatnakar on 3/20/2016.
 */

"use strict";

(function () {
    angular
        .module('FormBuilderApp')
        .directive("sortFields", sortFields);

    function sortFields() {

        var start = null, end = null;

        function link(scope, element, attributes) {

            var fieldAxis = attributes.fieldAxis;
            $(element).sortable({

                axis: fieldAxis,
                start: function (event, ui) {
                    start = ui.item.index();
                    console.log("start= "+start);
                },

                stop: function (event, ui) {
                    end = ui.item.index();
                    console.log("end= "+end);
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        }
    }
})();