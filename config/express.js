const express = require('express');
const config = require('config');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
    const app = express();
    app.set('port', process.env.PORT || config.get('server.port'));
    app.use(cors());
    app.use(express.json());
    consign({ cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
};

