const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger/swagger.yaml');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const transferRoutes = require('./routes/transfer.routes');
const balanceRoutes = require('./routes/balance.routes');
const historyRoutes = require('./routes/history.routes');
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');

app.use('/api/transfers', transferRoutes);
app.use('/api/accounts', balanceRoutes);
app.use('/api/transactions', historyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);

module.exports = app;
