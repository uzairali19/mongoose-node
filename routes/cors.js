const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptionsDelegate = (req, callback) => {
  const corsOptions = {
    origin: false,
  };

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
