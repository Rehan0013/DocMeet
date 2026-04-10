"use server";

import { db } from "@/lib/prisma";
import { sendAppointmentReminderEmail } from "@/lib/mail";
import { addHours, startOfHour, endOfHour } from "date-fns";

/**
 * Sweeps through upcoming appointments in the next 24 hours 
 * and sends reminders if they haven't been sent yet.
 * This can be called by a CRON job.
 */
export async function sendUpcomingReminders() {
  try {
    const now = new Date();
    const twentyFourHoursFromNow = addHours(now, 24);

    // Find all scheduled appointments starting within the next 24 hours 
    // that haven't had a reminder sent yet
    const appointments = await db.appointment.findMany({
      where: {
        status: "SCHEDULED",
        reminderSent: false,
        startTime: {
          gt: now,
          lte: twentyFourHoursFromNow,
        },
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    console.log(`Found ${appointments.length} appointments for reminder sweep.`);

    const results = [];

    for (const appointment of appointments) {
      try {
        // Send email to patient
        await sendAppointmentReminderEmail(appointment, appointment.patient);
        
        // Mark as sent
        await db.appointment.update({
          where: { id: appointment.id },
          data: { reminderSent: true },
        });

        results.push({ id: appointment.id, status: "sent" });
      } catch (error) {
        console.error(`Failed to send reminder for appointment ${appointment.id}:`, error);
        results.push({ id: appointment.id, status: "failed", error: error.message });
      }
    }

    return { success: true, processed: results.length, details: results };
  } catch (error) {
    console.error("Failed to process reminders:", error);
    return { success: false, error: error.message };
  }
}
