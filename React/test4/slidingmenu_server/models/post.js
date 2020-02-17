/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    tableName: 'post',
    timestamps: true,
    paranoid: true
  });
};