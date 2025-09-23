import { Model, type Optional } from 'sequelize';
import type { Donation } from './donation.model.js';
import type { CampaignQuestion } from './campaignQuestion.model.js';
interface DonationAnswerAttributes {
    id: string;
    donationId: string;
    questionId: string;
    answerValue: string;
}
interface DonationAnswerCreationAttributes extends Optional<DonationAnswerAttributes, "id"> {
}
declare class DonationAnswer extends Model<DonationAnswerAttributes, DonationAnswerCreationAttributes> implements DonationAnswerAttributes {
    id: string;
    donationId: string;
    questionId: string;
    answerValue: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    donation?: Donation;
    question?: CampaignQuestion;
}
export { DonationAnswer };
//# sourceMappingURL=donationAnswer.model.d.ts.map