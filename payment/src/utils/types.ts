export interface IPromocode {
  code: string;
  type: string;
  isActive: boolean;
  value: number;
  expiresAt: Date;
}

export interface IPromoCodeUsage {
  promocode: string;
  usedBy: string;
  usedAt: Date;
  deleted: boolean;
}
