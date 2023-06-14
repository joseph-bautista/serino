exports.up = function (queryInterface, DataTypes) {
    return queryInterface.createTable('money_values', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      treasure_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'treasures',
            key: 'id',
        },
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  };
  
  exports.down = function (queryInterface) {
    return queryInterface.dropTable('money_values');
  };
  