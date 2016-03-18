/**
 * Created by NishantRatnakar on 3/17/2016.
 */

"use strict";

module.exports = function(app)
{
    //GET /api/assignment/form/:formId/field
    //returns an array of fields belonging to a form object whose id is equal to the formId path parameter
    //GET /api/assignment/form/:formId/field/:fieldId
    //returns a field object whose id is equal to the fieldId path parameter and belonging to a form object whose id is equal to the formId path parameter
    //DELETE /api/assignment/form/:formId/field/:fieldId
    //removes a field object whose id is equal to the fieldId path parameter and belonging to a form object whose id is equal to the formId path parameter
    //POST /api/assignment/form/:formId/field
    //creates a new field whose properties are the same as the field object embedded in the request's body and the field belongs to a form whose id is equal to the formId path parameter. The field object's id is initially null since it is a new record. The id of the new form field should be set dynamically using Node.js guid or node-uuid libraries. These will eventually be set by the database when they are inserted into a collection
    //PUT /api/assignment/form/:formId/field/:fieldId
    //updates a field object whose id is equal to the fieldId path parameter and belonging to a form object whose id is equal to the formId path parameter so that its properties are the same as the property values of the field object embedded in the request's body

    app.get("/api/assignment/form/:formId/field", findFormFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function findFormFieldsByFormId(res, req)
    {
        var formId = req.params.formId;

        formModel
            .findFormFieldsByFormId(formId)
            .then(function(formFields)
            {
                res.json(formFields);
            });
    }


};
