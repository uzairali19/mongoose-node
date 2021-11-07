const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the dishes');
  })
  .post((req, res, next) => {
    res.end(
      'Will add the information to the request body' +
        req.body.name +
        'With details:' +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on dishes');
  })
  .delete((req, res, next) => {
    res.end('Deleting all the dishes');
  });

dishRouter
  .route('/:dishId')
  .get((req, res, next) => {
    res.end('The fetched dish is: ' + req.params.dishId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('Cannot add request to the dish:  ' + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write(
      'The updated dish is: \n' +
        req.params.dishId +
        ' with the name: \n' +
        req.body.name +
        'And the description as: ' +
        req.body.description +
        '\n'
    );
    res.end('PUT is updated all dishes' + req.params.dishId);
  })
  .delete((req, res, next) => {
    res.end('Deleting all the data from the dish: ' + req.params.dishId);
  });

module.exports = dishRouter;
