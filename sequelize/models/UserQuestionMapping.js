'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserQuestionMapping extends Model {

        static associate(models) {

            UserQuestionMapping.belongsTo(models.users, {
                foreignKey: { name: "user_id", allowNull: false, type: DataTypes.UUID, },
            });
            UserQuestionMapping.belongsTo(models.questions, {
                foreignKey: { name: "question_id", allowNull: false, type: DataTypes.UUID, },
            });
        }
    }
    UserQuestionMapping.init({}, {
        sequelize,
        modelName: 'userquestionmappings',
    });


    return UserQuestionMapping;
};
