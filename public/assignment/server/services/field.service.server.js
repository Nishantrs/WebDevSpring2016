/**
 * Created by NishantRatnakar on 3/17/2016.
 */

module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

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
        var formId;
        var fieldId;
        var field;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        field = fieldModel.findField(formId, fieldId);
        res.json(field);
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

    function updateFieldById(req, res) {
        var fieldId;
        var formId;
        var field;
        var r;
        field = req.body;
        fieldId = req.params.fieldId;
        formId = req.params.formId;
        r = fieldModel.updateFieldById(formId, fieldId, field);
        res.json(r);
    }
};
