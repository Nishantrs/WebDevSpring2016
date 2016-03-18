/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";

var forms = require('./form.mock.json');

module.exports = function(app)
{
    var api =
    {
     findFormsByUserId : findFormsByUserId,
     findFormById : findFormById,
     deleteFormById : deleteFormById,
     createForm : createForm,
     updateFormById : updateFormById,

     //Form Field api
     findFormFieldsByFormId : findFormFieldsByFormId

    };

    return api;

    function findFormsByUserId(userId)
    {
            var formsFound = [];
            for (var i = 0; forms.length; i++)
            {
                if (forms[i].userId === userId)
                {
                    formsFound.push(forms[i]);
                }
            }
            return formsFound;

    }

    function findFormById(formId)
    {
        var formFound = null;
        for (var i = 0; forms.length; i++)
        {
            if (forms[i]._id === formId)
            {
                formFound = forms[i];
                break;
            }
        }
        return formFound;
    }

    function deleteFormById(formId)
    {
        for (var i = 0; forms.length; i++)
        {
            if (forms[i]._id === formId)
            {
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    function createForm(newForm)
    {
        forms.push(newForm);

        return forms;
    }

    function updateFormById(formId, form)
    {
        for (var i = 0; forms.length; i++)
        {
            if (forms[i]._id === formId)
            {
                forms[i] = form;
                break;
            }
        }
        return forms;
    }


    // Form Field function
    function findFormFieldsByFormId(formId)
    {

    }
};
