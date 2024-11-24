import crypto from 'crypto';
import { User } from '../models/User';

export function generateReferralCode(length: number = 8): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
    .toUpperCase();
}

export async function processReferral(referrerId: number, referredId: number): Promise<void> {
  try {
    // Use findOne with proper type
    const referrer = await User.findOne({ telegramId: referrerId });
    const referred = await User.findOne({ telegramId: referredId });

    if (referrer && referred) {
      referrer.coins += 1000; // Referral bonus
      referrer.referrals += 1;
      referred.coins += 500; // Bonus for new user

      await referrer.save();
      await referred.save();
    }
  } catch (error) {
    console.error('Referral process error:', error);
  }
}
