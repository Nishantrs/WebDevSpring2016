/**
 * Created by NishantRatnakar on 3/17/2016.
 */

module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.put("/api/assignment/:formId/form", updateFields);

    function fieldsForFormId(req, res)
    {

        console.log("................................");
        console.log("In Field Services... fieldsForFormId");

        var formId = req.params.formId;
        fieldModel
            .findFieldsByFormId(formId)
            .then(function(doc)
            {
                res.json(doc.fields);

            },function(err)
            {
                res.status(400).send(err);

            });
    }

    function getFieldById(req, res) {
        //var formId;
        //var fieldId;
        //var field;
        //formId = req.params.formId;
        //fieldId = req.params.fieldId;
        //field = fieldModel.findField(formId, fieldId);
        //res.json(field);
    }

    function deleteFieldById(req, res)
    {

        console.log("................................");
        console.log("In Field Services... deleteFieldById");

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteFieldById(formId, fieldId)
        .then(function(doc)
        {
            res.json(doc.fields);

        },function(err)
        {
            res.status(400).send(err);

        });

    }

    function addFieldToForm(req, res)
    {

        console.log("................................");
        console.log("In Field Services... Add form");

        var field = req.body;
        var formId = req.params.formId;

        fieldModel.addFieldToForm(formId, field)
        .then(function(doc)
        {
            res.json(doc);

        },function(err)
        {
            res.status(400).send(err);

        });
    }

    function updateFieldById(req, res)
    {
        var field = req.body;
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        fieldModel.updateFieldById(formId, fieldId, field)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFields (req, res)
    {
               var formId = req.params.formId;
                var startIndex = req.query.startIndex;
                var endIndex = req.query.endIndex;

                if(startIndex && endIndex) {
                    fieldModel
                        .sortField(formId, startIndex, endIndex)
                        .then(
                            function(stat) {
                                return fieldModel.fieldsForFormId(formId);
                            },
                            function(err) {
                                res.status(400).send(err);
                            }
                        )
                        .then(
                            function(form) {
                                res.json(form.fields);
                           },
                            function(err) {
                                res.status(400).send(err);
                            }
                        );
                }
    }
};
