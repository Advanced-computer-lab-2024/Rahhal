import { getAllUsers } from "@/services/user-service";
import { startOfDay, isSameDay } from "date-fns";
import { Role } from "@/utils/constants";
import publishNotification from "@/publishers/notification-publisher";

export default async function sendEmails() {

    const allUsers = await getAllUsers({ role: Role.tourist });
    allUsers.forEach((user) => {
        const today = startOfDay(new Date())
        const userBirthday = startOfDay(user.dob!)
        userBirthday.setFullYear(today.getFullYear())
        if (isSameDay(today, userBirthday)) {
            console.log(`Sending birthday notification to ${user.email}`)
            publishNotification({
                userId: user.id!,
                message: `Enjoy Promocode \n HBD${today.toLocaleDateString('en', { year: '2-digit' })} \nValid for 7 days!`
            })
        }
    })

}