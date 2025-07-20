// Data storage for donations and support features
export interface Donation {
  id: string;
  fromUserId: string;
  fromUsername: string;
  toUserId: string;
  toUsername: string;
  amount: number;
  message: string;
  timestamp: number;
  type: 'donation' | 'like' | 'reaction';
}

export interface DonationStats {
  totalDonations: number;
  totalAmount: number;
  topDonator: string;
  recentDonations: Donation[];
}

// Mock data storage
export let donations: Donation[] = [];
export let donationStats: DonationStats = {
  totalDonations: 0,
  totalAmount: 0,
  topDonator: '',
  recentDonations: []
};

// Donation amounts for different actions
export const DONATION_AMOUNTS = {
  like: 0.50,
  reaction: 0.25,
  donation_small: 5,
  donation_medium: 10,
  donation_large: 25
};

// Functions to manage donations
export const createDonation = (
  fromUserId: string,
  fromUsername: string,
  toUserId: string,
  toUsername: string,
  amount: number,
  message: string = '',
  type: 'donation' | 'like' | 'reaction' = 'donation'
) => {
  const newDonation: Donation = {
    id: Date.now().toString(),
    fromUserId,
    fromUsername,
    toUserId,
    toUsername,
    amount,
    message,
    timestamp: Date.now(),
    type
  };

  donations.push(newDonation);
  
  // Update stats
  donationStats.totalDonations += 1;
  donationStats.totalAmount += amount;
  donationStats.recentDonations.unshift(newDonation);
  
  // Keep only last 10 recent donations
  if (donationStats.recentDonations.length > 10) {
    donationStats.recentDonations = donationStats.recentDonations.slice(0, 10);
  }

  return newDonation;
};

export const simulateLikeDonation = (
  fromUserId: string,
  fromUsername: string,
  toUserId: string,
  toUsername: string
) => {
  return createDonation(
    fromUserId,
    fromUsername,
    toUserId,
    toUsername,
    DONATION_AMOUNTS.like,
    '¡Me gusta tu música! 👍',
    'like'
  );
};

export const simulateReactionDonation = (
  fromUserId: string,
  fromUsername: string,
  toUserId: string,
  toUsername: string,
  emoji: string
) => {
  return createDonation(
    fromUserId,
    fromUsername,
    toUserId,
    toUsername,
    DONATION_AMOUNTS.reaction,
    `Reacción: ${emoji}`,
    'reaction'
  );
};

export const getDonationsForUser = (userId: string) => {
  return donations.filter(d => d.toUserId === userId);
};

export const getTotalDonationsForUser = (userId: string) => {
  return donations
    .filter(d => d.toUserId === userId)
    .reduce((total, donation) => total + donation.amount, 0);
};

export const getTopDonators = (limit: number = 5) => {
  const donatorTotals = donations.reduce((acc, donation) => {
    if (!acc[donation.fromUserId]) {
      acc[donation.fromUserId] = {
        userId: donation.fromUserId,
        username: donation.fromUsername,
        total: 0,
        count: 0
      };
    }
    acc[donation.fromUserId].total += donation.amount;
    acc[donation.fromUserId].count += 1;
    return acc;
  }, {} as Record<string, any>);

  return Object.values(donatorTotals)
    .sort((a: any, b: any) => b.total - a.total)
    .slice(0, limit);
};
