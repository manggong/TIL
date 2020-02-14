/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('posthashtag', {
    post_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'post',
        key: 'post_no'
      }
    },
    hashtag_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'hashtag',
        key: 'hashtag_no'
      }
    }
  }, {
    tableName: 'posthashtag',
    timestamps: false,
  });
};