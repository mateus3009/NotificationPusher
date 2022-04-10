const webPush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const vapid   = require('./vapid.json');
const app     = express();
const port    = 3000;

webPush.setVapidDetails(
  'mailto:mateus3009@gmai.com',
  vapid.publicKey,
  vapid.privateKey
);

let subscriptions = [];

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  res.status(201).send('Subscription successful');
  console.log('Subscription successful');
  console.log(req.body);
});

app.post('/notify', (req, res) => {
  subscriptions.forEach(subscription => webPush.sendNotification(subscription, JSON.stringify(req.body)));
  res.status(202).send('Notified!');
  console.log('Notified!');
  console.log(req.body);
});

app.get('/subscriptions', (req, res) => res.json(subscriptions));

app.listen(port);
