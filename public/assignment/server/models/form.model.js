/**
 * Created by NishantRatnakar on 3/16/2016.
 */

"use strict";

var q = require("q");

module.exports = function (db, mongoose) {

    //loading form schema for document structure validation against schema
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var Form = mongoose.model("Form", FormSchema);

    var api =
    {
     findFormsByUserId : findFormsByUserId,
     findFormById : findFormById,
     deleteFormById : deleteFormById,
     createForm : createForm,
     updateFormById : updateFormById,
        getAllForms : getAllForms
    };
    return api;


    function getAllForms()
    {
        console.log("In Model getAllForms");

        return Form.find();
    }

    function findFormsByUserId(userId)
    {
        console.log("In Model findFormsByUserId");

        return Form.find({userId: userId});
    }

    function findFormById(formId)
    {
        console.log("In Model findFormById");

        return Form.findById(formId);
    }

    function deleteFormById(formId)
    {

        console.log("In Model deleteFormById");

        return Form.remove({_id:formId});
    }

    function createForm(newForm)
    {
        console.log("In Model createForm");

        return Form.create(newForm);
    }

    function updateFormById(formId, form)
    {

        var deferred = q.defer();
        //verify whether this does not work
        //Form.update({_id:formId},
            //            {$set:form},
            //            function(err,stats)
            //            {
            //            return Form.find();
            //            });
        console.log("In Model updateFormById");

        Form
            .update({_id:formId},
                {$set:form},
                function(err,stats)
                {
                    if(stats)
                    {
                        Form.findById(formId,
                            function(err , form)
                            {
                                if (err)
                                {
                                    deferred.reject (err);
                                }
                                else
                                {
                                    console.log('after update');
                                    console.log(form);
                                    deferred.resolve(form);
                                }
                            });
                    }
                    else
                    {
                        deferred.reject(err);
                    }
                });

        return deferred.promise;
    }

};

//var forms = require('./form.mock.json');
//
//module.exports = function(app)
//{
//    var api =
//    {
//     findFormsByUserId : findFormsByUserId,
//     findFormById : findFormById,
//     deleteFormById : deleteFormById,
//     createForm : createForm,
//     updateFormById : updateFormById
//
//     //Form Field api
//     //findFormFieldsByFormId : findFormFieldsByFormId,
//     //addFormFieldByFormId : addFormFieldByFormId,
//     //findFormFieldById : findFormFieldById,
//     //updateFormFieldById : updateFormFieldById
//
//    };
//
//    return api;
//
//    function findFormsByUserId(userId)
//    {
//        console.log("In Model findFormsByUserId");
//
//            var formsFound = [];
//            for (var i in forms)  //var i = 0; forms.length; i++
//            {
//                if (forms[i].userId == userId)
//                {
//                    formsFound.push(forms[i]);
//                }
//            }
//            return formsFound;
//
//    }
//
//    function findFormById(formId)
//    {
//        console.log("In Model findFormById");
//
//        var formFound = null;
//        for (var i in forms)
//        {
//            if (forms[i]._id == formId)
//            {
//                formFound = forms[i];
//                break;
//            }
//        }
//        return formFound;
//    }
//
//    function deleteFormById(formId)
//    {
//
//        console.log("In Model deleteFormById");
//
//        for (var i in forms)
//        {
//            if (forms[i]._id == formId)
//            {
//                forms.splice(i, 1);
//                break;
//            }
//        }
//        return forms;
//    }
//
//    function createForm(newForm)
//    {
//        console.log("In Model createForm");
//
//        forms.push(newForm);
//
//        return forms;
//    }
//
//    function updateFormById(formId, form)
//    {
//        console.log("In Model updateFormById");
//
//        for (var i in forms)
//        {
//            if (forms[i]._id == formId)
//            {
//                forms[i] = form;
//                break;
//            }
//        }
//        return forms;
//    }
//
//
//    // Form Field function
//    //function findFormFieldsByFormId(formId)
//    //{
//    //
//    //    var fields = [];
//    //
//    //    for (var i in forms)
//    //    {
//    //        if (forms[i]._id == formId)
//    //        {
//    //            return forms[i].fields;
//    //        }
//    //    }
//    //    return fields;
//    //}
//    //
//    //function addFormFieldByFormId(formId, field)
//    //{
//    //
//    //    for (var i in forms)
//    //    {
//    //        if (forms[i]._id == formId)
//    //        {
//    //            forms[i].fields.push(field);
//    //            return forms[i].fields;
//    //        }
//    //    }
//    //}
//    //
//    //function findFormFieldById(formId, fieldId)
//    //{
//    //    var field = null;
//    //
//    //    for (var i in forms)
//    //    {
//    //        if (forms[i]._id == formId)
//    //        {
//    //            var fields = forms[i].fields;
//    //
//    //            for (var j in fields)
//    //            {
//    //                if (fields[j]._id == fieldId)
//    //                {
//    //                    field = fields[j];
//    //                }
//    //
//    //                //break;
//    //            }
//    //        }
//    //
//    //        break;
//    //    }
//    //    return field;
//    //}
//    //
//    //function updateFormFieldById(formId, fieldId, field)
//    //{
//    //    for (var i in forms)
//    //    {
//    //        if (forms[i]._id == formId)
//    //        {
//    //            var fields = forms[i].fields;
//    //
//    //            for (var j in fields)
//    //            {
//    //                if (fields[j]._id == fieldId)
//    //                {
//    //                    forms[i].fields[j] = field;
//    //                }
//    //
//    //                //break;
//    //            }
//    //        }
//    //        return forms[i];
//    //        break;
//    //    }
//    //}
//    //
//    //function deleteFormFieldById(formId, fieldId)
//    //{
//    //
//    //    for (var i = 0; forms.length; i++)
//    //    {
//    //        if (forms[i]._id === formId)
//    //        {
//    //            var fields = forms[i].fields;
//    //
//    //            for (var j = 0; fields.length; j++)
//    //            {
//    //                if (fields[j]._id === fieldId)
//    //                {
//    //                    forms[i].fields.splice(j, 1);
//    //
//    //                    return forms[i].fields;
//    //                }
//    //                break;
//    //            }
//    //
//    //        }
//    //        break;
//    //    }
//    //}
//};
