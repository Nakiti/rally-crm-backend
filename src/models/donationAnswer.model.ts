import { DataTypes, DATE, Model, Optional, TEXT, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

interface DonationAnswerAttributes {
    id: string;
    donationId: string;
    questionId: string;
    answerValue: string;
}

class DonationAnswer extends Model<DonationAnswerAttributes> implements DonationAnswerAttributes {
    public id!: string;
    public donationId!: string;
    public questionId!: string;
    public answerValue!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
            model: "Donation",
            key: "id"
        }
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "CampaignQuestion",
            key: "id"
        }
    },
    answerValue: {
        type: TEXT,
        allowNull: false
    }
}, {
    tableName: "donation_answers",
    sequelize
})

export {DonationAnswer}