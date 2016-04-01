/**
 * Created by NishantRatnakar on 3/18/2016.
 */
var q = require("q");

module.exports = function (db, formModel, mongoose) {


    var api = {
        addFieldToForm: addFieldToForm,
        deleteFieldById: deleteFieldById,
        findField: findField,
        updateFieldById: updateFieldById,
        findFieldsByFormId: findFieldsByFormId,
        sortField: sortField
    };

    return api;

    function addFieldToForm(formId, field)
    {
        var deferred = q.defer();

        console.log("................................");
        console.log("In Field Model... Add form");


        formModel.findFormById(formId)
            .then(function(doc)
            {
                //need to write code to update the form update time.

                //console.log("................................");
                //console.log(doc);
                //console.log("................................");
                //console.log(field);
                doc.fields.push(field);

                //console.log("................................");
                //console.log("field pushed");
                doc.save(function(err, doc)
                {
                    //console.log("................................");
                    //console.log("Save operation performed");
                   if(err)
                   {
                       //console.log("................................");
                       //console.log(err);
                       deferred.reject(err);
                   }
                    else
                   {
                       //console.log("................................");
                       //console.log(doc);
                       deferred.resolve(doc);
                   }
                });
            },function(err)
            {
                deferred.reject(err);
                //res.status(400).send(err);
            });

        return deferred.promise;
    }

    function deleteFieldById(formId, fieldId)
    {


        var deferred = q.defer();

        formModel.findFormById(formId)
        .then(function(doc)
        {

            //need to write code to update the form update time.

            doc.fields.id(fieldId).remove();

            //console.log("................................");
            //console.log("field removed");
            doc.save(function(err, stats)
            {
                //console.log("................................");
                //console.log("delete operation performed");
                if(err)
                {
                    //console.log("................................");
                    //console.log(err);
                    deferred.reject(err);
                }
                else
                {
                    //console.log("................................");
                    //console.log(doc);
                    deferred.resolve(stats);
                }
            });
        },function(err)
        {
            deferred.reject(err);
            //res.status(400).send(err);
        });

        return deferred.promise;


    }

    function findField(formId, fieldId) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (f in fields) {
            if (fields[f]._id == fieldId) {
                return fields[f];
            }
        }
    }

    function findFieldsByFormId(formId)
    {
        console.log("................................");
        console.log("In Field Model... findFieldsByFormId");

        var deferred = q.defer();

        formModel.findFormById(formId)
        .then(function(doc)
        {
            deferred.resolve(doc);

        },function(err)
        {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    function updateFieldById(formId, fieldId, field)
    {
        console.log("................................");
        console.log("In Field Model... updateField");

        var deferred = q.defer();

        formModel.findFormById(formId)
        .then(function(doc)
        {

            //need to write code to update the form update time.

            var updatedField = doc.fields.id(fieldId);

            updatedField.label = field.label;
            updatedField.type = field.type;
            updatedField.placeholder = field.placeholder;
            updatedField.options = field.options;

            doc.save(function(err, doc)
            {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        },function(err)
        {

            deferred.resolve(err);
        });

        return deferred.promise;

    }


    function sortField(formId, startIndex, endIndex) {
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function(form){
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.markModified("fields");

                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });

                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }


};