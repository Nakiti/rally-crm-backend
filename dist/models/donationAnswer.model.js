import { DataTypes, Model, TEXT, UUIDV4 } from 'sequelize';
import sequelize from '../config/database.js';
class DonationAnswer extends Model {
    id;
    donationId;
    questionId;
    answerValue;
    createdAt;
    updatedAt;
    // Association properties
    donation;
    question;
}
DonationAnswer.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    donationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "donations",
            key: "id"
        }
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "campaign_questions",
            key: "id"
        }
    },
    answerValue: {
        type: TEXT,
        allowNull: false
    }
}, {
    tableName: "donation_answers",
    sequelize,
    underscored: true
});
export { DonationAnswer };
//# sourceMappingURL=donationAnswer.model.js.map