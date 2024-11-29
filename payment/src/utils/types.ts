export interface IPromocode {
    code: String;
    type: String;
    isActive: Boolean;
    value: Number;
    expiresAt: Date;
}

export interface IPromoCodeUsage {
    promocode: String;
    usedBy: String;
    usedAt: Date;
    deleted: Boolean;
}
