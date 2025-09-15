import { DataTypes, Model, TEXT, UUIDV4, type Optional } from 'sequelize';
import sequelize from '../config/database.js';
import type { Donation } from './donation.model.js';
import type { CampaignQuestion } from './campaignQuestion.model.js';

interface DonationAnswerAttributes {
    id: string;
    donationId: string;
    questionId: string;
    answerValue: string;
}

interface DonationAnswerCreationAttributes extends Optional<DonationAnswerAttributes, "id"> {}

class DonationAnswer extends Model<DonationAnswerAttributes, DonationAnswerCreationAttributes> implements DonationAnswerAttributes {
    public id!: string;
    public donationId!: string;
    public questionId!: string;
    public answerValue!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Association properties
    public donation?: Donation;
    public question?: CampaignQuestion;
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
})

export {DonationAnswer}