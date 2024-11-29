import Promocode, { PromocodeUsage } from "@/database/models/Promocode";
import { IPromocode, IPromoCodeUsage } from "@/utils/types";

export async function getAllPromocodes() {
    return Promocode.find();
}

export async function createPromocode(promocode: IPromocode) {
    const newPromocode = new Promocode(promocode);
    return newPromocode.save();
}

export async function updatePromocode(id: string, promocode: Partial<IPromocode>) {
    return Promocode.findByIdAndUpdate(id, promocode, { new: true, runValidators: true });
}

export async function deletePromocode(id: string) {
    const promocode = await Promocode.findByIdAndDelete(id);
    await PromocodeUsage.updateMany({ promocode: promocode?.code }, { deleted: true });
}


export async function findPromocode(filter: Partial<IPromocode>) {
    return Promocode.findOne(filter);
}

export async function findPromocodeUsage(filter: Partial<IPromoCodeUsage>) {
    return PromocodeUsage.findOne(filter);
}

export async function createPromocodeUsage(promocode: string, usedBy: string) {
    const newPromocodeUsage = new PromocodeUsage({ promocode, usedBy });
    return newPromocodeUsage.save();
}
