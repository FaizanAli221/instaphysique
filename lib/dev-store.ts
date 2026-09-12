export interface StoredLead {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
  agreeTerms: boolean;
  source: string;
  ip?: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  // eslint-disable-next-line no-var
  var _devLeadStore: StoredLead[] | undefined;
}

export const devLeads: StoredLead[] = global._devLeadStore ?? [];
global._devLeadStore = devLeads;
