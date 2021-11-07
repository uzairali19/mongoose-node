const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end('Will send all the leaders');
  })
  .post((req, res, next) => {
    res.end(
      'Will add the information to the request body ' +
        req.body.name +
        ' With details: ' +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on leaders');
  })
  .delete((req, res, next) => {
    res.end('Deleting all the leaders');
  });

leaderRouter
  .route('/:leaderId')
  .get((req, res, next) => {
    res.end('The fetched leader is: ' + req.params.leaderId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('Cannot add request to the leader:  ' + req.params.leaderId);
  })
  .put((req, res, next) => {
    res.write(
      'The updated leader is: \n' +
        req.params.leaderId +
        '  with the name: \n' +
        req.body.name +
        '  And the description as: \n' +
        req.body.description +
        '\n'
    );
    res.end('PUT is updated all leaders' + req.params.leaderId);
  })
  .delete((req, res, next) => {
    res.end('Deleting all the data from the leader: ' + req.params.leaderId);
  });

module.exports = leaderRouter;
