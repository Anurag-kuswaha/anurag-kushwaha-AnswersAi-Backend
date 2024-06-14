const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        static associate(models) {
            Question.hasMany(models.userquestionmappings, {
                foreignKey: 'question_id',
            });
        }
    }
    Question.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        content: DataTypes.TEXT,
        result: DataTypes.JSONB,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        sequelize,
        modelName: 'questions',
    });
    return Question;
};
