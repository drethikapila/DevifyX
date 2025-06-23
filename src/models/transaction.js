'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define associations here later if needed
    }
  }
  
  Transaction.init({
    fromAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true // For external transfers, this can be null
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false // should be 'internal' or 'external'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};
