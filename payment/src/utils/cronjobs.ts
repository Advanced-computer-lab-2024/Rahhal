import { getAllPromocodes, updatePromocode } from "@/services/promocode-service";


export default async function dailyUpdate() {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);
    await getAllPromocodes().then(async (promocodes) => {
        promocodes.forEach(async (promocode) => {
            if (promocode.expiresAt < currentDate) {
                await updatePromocode(promocode._id.toString(), { isActive: false });
            }
        });
    });
}