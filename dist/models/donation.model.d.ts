import { Model, type Optional } from 'sequelize';
import type { Campaign } from './campaign.model.js';
import type { Designation } from './designation.model.js';
import type { DonorAccount } from './donorAccount.model.js';
import type { Organization } from './organization.model.js';
import type { DonationAnswer } from './donationAnswer.model.js';
interface DonationAttributes {
    id: string;
    organizationId: string;
    campaignId: string;
    donorAccountId: string;
    designationId: string;
    amount: number;
    stripeChargeId: string;
    status: string;
}
interface DonationCreationAttributes extends Optional<DonationAttributes, "id"> {
}
declare class Donation extends Model<DonationAttributes, DonationCreationAttributes> implements DonationAttributes {
    id: string;
    organizationId: string;
    campaignId: string;
    donorAccountId: string;
    designationId: string;
    amount: number;
    stripeChargeId: string;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    campaign?: Campaign;
    designation?: Designation;
    donorAccount?: DonorAccount;
    organization?: Organization;
    answers?: DonationAnswer[];
}
export { Donation };
//# sourceMappingURL=donation.model.d.ts.map