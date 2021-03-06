/**
 * Created by NishantRatnakar on 3/1/2016.
 */



"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, FormService, $routeParams) {
        var vm = this;
        vm.cField = null;
        vm.eField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.reorder = reorder;
        vm.sortField= sortField;
        vm.options =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];
        vm.selection = vm.options[0];
        vm.fieldOptions = null;
        var formId = "000";
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        var optionMap =
            [
                //{key: "Single Line Text Field", value: "TEXT"},
                //{key: "Multi Line Text Field", value: "TEXTAREA"},
                //{key: "Date Field", value: "DATE"},
                //{key: "Dropdown Field", value: "OPTIONS"},
                //{key: "Checkboxes Field", value: "CHECKBOXES"},
                //{key: "Radio Buttons Field", value: "RADIOS"}

                {key: "Single Line Text Field", value: "TEXT",label: "New text field"},
                {key: "Multi Line Text Field", value: "TEXTAREA",label: "New multi line text fiels"},
                {key: "Date Field", value: "DATE",label: "New date field"},
                {key: "Dropdown Field", value: "OPTIONS",label: "New dropdown"},
                {key: "Checkboxes Field", value: "CHECKBOXES", label: "New Checkbox",
                    options: [{"label": "option1", "value":"option_1"}]},
                {key: "Radio Buttons Field", value: "RADIOS",label: "New radio button",
                    options: [{"label": "option1", "value":"option_1"}]}
            ];

        function render(response)
        {
            vm.display = response.data;
            vm.fields = response.data;
        }

        function init()
        {
            FieldService
                .findFieldsByForm(formId)
                .then(render);
            FormService
                .findFormById(formId)
                .then(function (response)
                {
                    vm.form = response.data;
                })
        }
        init();

        function sendEdit(field)
        {
            vm.cField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }

        function reorder()
        {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);

        }

        function sortField(start, end)
        {
            FieldService
                .sortField(formId, start, end)
                .then(
                    function (response)
                    {
                        vm.fields = response.data;

                    },function (err)
                    {
                        vm.error = err;
                    });
        }

        function deleteField(field)
        {
            vm.cField = null;
            FieldService
                .deleteField(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType)
        {
            for (var k in optionMap) {
                console.log(optionMap[k].key + " " + optionMap[k].value);
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function translateLabel(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType){
                    return optionMap[k].label;
                }
            }
        }
        function translatePlaceholder(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType){
                    return optionMap[k].placeholder;
                }
            }
        }
        function translateOptions(fieldType) {
            for (var k in optionMap) {
                if (optionMap[k].key == fieldType){
                    return optionMap[k].options;
                }
            }
        }

        function addField(fieldType)
        {
            var field = {"label": translateLabel(fieldType), "type": translateFieldType(fieldType), "placeholder": translatePlaceholder(fieldType), "options": translateOptions(fieldType)};
            console.log(field);
            FieldService
                .createField(formId, field)
                .then(init);
        }


        function editField(field)
        {
            vm.eField = field;

            var isOption = !(vm.eField.type === 'TEXT' || vm.eField.type === 'TEXTAREA');

            if (isOption)
            {
                var optionList = [];
                var ol = vm.eField.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                console.log(optionList);
                vm.optionText = optionList.join("\n");
                console.log(vm.optionText);
            }
        }

        function commitEdit(field)
        {
            vm.eField = field;

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];
            if (isOption)
            {
                console.log(vm.optionText);
                var oa = vm.optionText;
                for (var o in oa)
                {
                    var a = oa[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                vm.eField.options = optionArray;

            }
            else {
            }
            console.log(vm.eField._id);
            FieldService
                .updateField(formId, vm.eField._id, vm.eField)
                .then(init);
            vm.eField = null;
        }

    }
})();