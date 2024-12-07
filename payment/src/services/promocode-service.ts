import { IPromocode } from "@/utils/types";
import * as promocodeRepository from "@/database/repositories/promocode-repository";
import { isHisBirthday } from "@/utils/axios-instances";

export async function getAllPromocodes() {
    return promocodeRepository.getAllPromocodes();
}

export async function createPromocode(promocode: IPromocode) {
    promocode.code = promocode.code.toUpperCase();
    return promocodeRepository.createPromocode(promocode);
}

export async function updatePromocode(id: string, promocode: Partial<IPromocode>) {
    if (promocode.code)
        promocode.code = promocode.code.toUpperCase();
    return promocodeRepository.updatePromocode(id, promocode);
}

export async function deletePromocode(id: string) {
    return promocodeRepository.deletePromocode(id);
}

export async function applyPromocode(id: string, code: string) {
    code = code.toUpperCase();
    let promocode;
    if (code == "HBD" + (new Date()).toLocaleDateString('en', { year: '2-digit' })) {
        if (!(await isHisBirthday(id))) {
            throw new Error("Promocode is not found");
        }
        promocode = {
            type: "percentage",
            value: 25,
            uses: 1
        }
    }
    else {
        promocode = await promocodeRepository.findPromocode({ code: code });
        if (!promocode) {
            throw new Error("Promocode is not found");
        }
        if (!promocode.isActive) {
            throw new Error("Promocode is not active");
        }
        if (promocode.expiresAt < new Date()) {
            throw new Error("Promocode is expired");
        }
    }

    const usedByUser = await promocodeRepository.findPromocodeUsage({ promocode: code, usedBy: id, deleted: false });
    if (usedByUser && usedByUser.length > promocode.uses) {
        throw new Error("Promocode already used");
    }

    return {
        type: promocode.type,
        value: promocode.value,
        description: promocode.type == "percentage" ? `${promocode.value}% off your order` : `Free shipping on your order`
    }
}

export async function usePromocode(id: string, code: string) {
    code = code.toUpperCase();
    const promocode = await applyPromocode(id, code);
    await promocodeRepository.createPromocodeUsage(code, id);
    return promocode;
}

