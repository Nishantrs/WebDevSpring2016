/**
 * Created by NishantRatnakar on 3/17/2016.
 */

"use strict";

module.exports = function(app, formModel)
{

    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);


    function findFormsByUserId(req, res)
    {
        console.log("In server services findFormsByUserId");

        var userId = req.params.userId;

        formModel
            .findFormsByUserId(userId)
            .then(function(forms)
            {
                res.json(forms);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(formModel.findFormsByUserId(userId));
    }

    function findFormById(req, res)
    {
        console.log("In server services findFormById");

        var formId = req.params.formId;

        formModel
            .findFormById(formId)
            .then(function(form)
            {
                res.json(form);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(formModel.findFormById(formId));
    }

    function deleteFormById(req, res)
    {

        console.log("In server services deleteFormById");

        var formId = req.params.formId;

        formModel
            .deleteFormById(formId)
            .then(function(forms)
            {
                res.send(200);
                //res.json(forms);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(formModel.deleteFormById(formId));

    }

    function createFormByUserId(req, res)
    {
        console.log("In server services createFormByUserId");

        var newForm = req.body;
        var userId = req.params.userId;

        newForm.userId = userId;

        //newForm._id = uuid.v1(); //time based id created.
        newForm.fields = [];

        formModel
            .createForm(newForm)
            .then(function (forms)
            {
                res.send(200);
                //res.json(forms);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(formModel.createForm(newForm));
    }

    function updateFormById(req, res)
    {

        console.log("In server services updateFormById");

        var formId = req.params.formId;
        var formObj = req.body;

        formModel
            .updateFormById(formId, formObj)
            .then(function(form)
            {
                //res.send(200);
                res.json(form);
            },
                function(err)
                {
                    res.status(400).send(err);
                });

        //res.json(formModel.updateFormById(formId, formObj));

    }


};