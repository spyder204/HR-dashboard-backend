const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Employees = require('../models/employees');
const { application } = require('express');



const employeeRouter = express.Router();

employeeRouter.use(bodyParser.json());

employeeRouter.route('/')
.get((req, res, next)=>{
    console.log('Employee list request received.');
    //res.end('Showing the employee list.');
    Employees.find({})
    .then((emp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emp);
    },(err)=>nexr(err))
    .catch((err)=>next(err)); 
})
.post((req, res, next)=>{
    console.log('Adding new employee details.');
    Employees.create(req.body)
    .then((emp)=>{
        console.log('New employee details added to the database.');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        Employees.find({}, (emp)=>{res.json(emp);});
    },(err)=>next(err))
    .catch((err)=>next)
   
})
.put((req, res, next)=>{
    console.log('Invalid operation.');
    res.statusCode=403;
   
})
.delete((req, res, next)=>{
    console.log('Operation not allowed. Requires admin access!');
   
   
});

employeeRouter.route('/:empId')
.get((req, res, next)=>{ // res object modified in app.all is the parameter here
   // res.end(`Showing the details of ${req.params.empId} to you`);
    Employees.findById(req.params.empId)
    .then((emp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emp); 

    },(err)=>next(err))
    .catch((err)=>next(err))
  })
  
  .post((req, res, next)=>{  // runs after app.all if there is a POST require
    res.statusCode=403; //means operation not supported on a particular dish
    res.end('Invalid operation');
  })
  
  .put((req, res, next)=>{
  
    //res.write(`updating the Employee info of ${req.params.empId}\n`);// used to add a line to the reply message
    Employees.findByIdAndUpdate(req.params.empId, {
        $set: req.body
    }, { new: true })
    .then((emp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emp);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  
  .delete((req, res, next)=>{
   Employees.findByIdAndRemove(req.params.empId)
    .then((emp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(emp);
    }, (err) => next(err))
    .catch((err) => next(err));

  });
  


module.exports = employeeRouter;
