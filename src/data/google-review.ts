export interface GoogleReviewItem {
  id: string;
  reviewerName: string;
  rating: number;
  text?: string;
  reviewUrl: string;
  publishedAt?: string;
  source: "google";
  isVerified: boolean;
  avatarPlaceholder?: string;
}

export interface GoogleTrustData {
  businessName: string;
  rating: number;
  maxRating: number;
  reviewCount: number;
  googleReviewUrl: string;
  googleProfileLabel: string;
  eyebrow: string;
  heading: string;
  headingAccent?: string;
  subheading: string;
  featuredReview: GoogleReviewItem;
  trustPrinciples: {
    id: string;
    text: string;
    description: string;
  }[];
}

export const googleTrustData: GoogleTrustData = {
  businessName: "VANIX",
  rating: 5.0,
  maxRating: 5,
  reviewCount: 1,
  googleReviewUrl: "https://g.page/r/CdHx_pdIrAxwEAE/review",
  googleProfileLabel: "Google Business Profile",
  eyebrow: "GOOGLE VERIFIED FEEDBACK",
  heading: "TRUST BUILT ON",
  headingAccent: "REAL EXPERIENCES.",
  subheading: "See genuine feedback from customers who have experienced VANIX.",
  featuredReview: {
    id: "gov-rev-1",
    reviewerName: "Verified Google Customer",
    rating: 5,
    text: "Read our genuine customer feedback on Google.",
    reviewUrl: "https://g.page/r/CdHx_pdIrAxwEAE/review",
    publishedAt: "Verified Customer Review",
    source: "google",
    isVerified: true,
  },
  trustPrinciples: [
    {
      id: "tp-1",
      text: "Official Google Business Profile",
      description: "Directly linked to verified Google Maps presence",
    },
    {
      id: "tp-2",
      text: "Real Customer Feedback",
      description: "Unfiltered genuine experiences submitted on Google",
    },
    {
      id: "tp-3",
      text: "Transparent Service Process",
      description: "Milestone-driven clarity across all digital deliverables",
    },
    {
      id: "tp-4",
      text: "Direct Business Communication",
      description: "Direct access to technical lead and strategy specialists",
    },
  ],
};
