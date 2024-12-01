import { getAllfilteredPromocodes } from "@/database/repositories/promocode-repository";
import { getAllPromocodes, updatePromocode } from "@/services/promocode-service";


export default async function dailyUpdate() {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);
    await getAllfilteredPromocodes({ isActive: true }).then(async (promocodes) => {
        promocodes.forEach(async (promocode) => {
            if (promocode.expiresAt < currentDate) {
                await updatePromocode(promocode._id.toString(), { isActive: false });
            }
        });
    });
}