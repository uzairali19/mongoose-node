const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promos = require('../models/promo');
const promoRouter = express.Router();
const authenticate = require('../authenticate');

promoRouter.use(bodyParser.json());

promoRouter
  .route('/')
  .get((req, res, next) => {
    Promos.find({})
      .then(
        (promos) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promos);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promos.create(req.body)
      .then(
        (promo) => {
          console.log('Promo Created ', promo);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT is not supported on /promotions');
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promos.remove({})
      .then(
        (promos) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promos);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route('/:promoId')
  .get((req, res, next) => {
    Promos.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Cannot add request to the promotion:  ' + req.params.promoId);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = promoRouter;
