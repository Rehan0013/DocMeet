import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const createTransporter = async () => {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.CLIENT_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.CLIENT_REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (options) => {
  try {
    const transporter = await createTransporter();
    const result = await transporter.sendMail({
      from: `"DocMeet" <${process.env.EMAIL_USER}>`,
      ...options,
    });
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2D3FE2;">Welcome to DocMeet, ${user.name}!</h2>
      <p>We're thrilled to have you join our community. Your journey to better healthcare starts here.</p>
      <p>With DocMeet, you can easily book appointments with top doctors, manage your health records, and receive quality care from the comfort of your home.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/doctors" style="display: inline-block; padding: 10px 20px; background-color: #2D3FE2; color: white; text-decoration: none; border-radius: 5px;">Explore Doctors</a>
      <p style="margin-top: 20px; font-size: 0.8em; color: #777;">Best regards,<br>The DocMeet Team</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: "Welcome to DocMeet!",
    html,
  });
};

export const sendAppointmentBookingEmail = async (appointment, doctor, patient) => {
  const commonHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2D3FE2;">Appointment Confirmed!</h2>
      <p>An appointment has been successfully booked.</p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Doctor:</strong> ${doctor.name}</p>
        <p><strong>Patient:</strong> ${patient.name}</p>
        <p><strong>Time:</strong> ${new Date(appointment.startTime).toLocaleString()}</p>
      </div>
      <p>Please ensure you are ready 5 minutes before the scheduled time.</p>
      <p style="margin-top: 20px; font-size: 0.8em; color: #777;">Best regards,<br>The DocMeet Team</p>
    </div>
  `;

  // Send to Patient
  await sendEmail({
    to: patient.email,
    subject: "Appointment Confirmation - DocMeet",
    html: commonHtml,
  });

  // Send to Doctor
  await sendEmail({
    to: doctor.email,
    subject: "New Appointment Booked - DocMeet",
    html: commonHtml,
  });

  // Send to Admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `[ADMIN] New Appointment: ${patient.name} with ${doctor.name}`,
    html: commonHtml,
  });
};

export const sendAppointmentCompletionEmail = async (appointment, doctor, patient) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #2D3FE2;">Consultation Completed</h2>
      <p>Dear ${patient.name}, your appointment with ${doctor.name} has been marked as completed.</p>
      <p>We hope you had a productive session. You can view your session notes in your dashboard.</p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Notes:</strong> ${appointment.notes || "No notes provided."}</p>
      </div>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments" style="display: inline-block; padding: 10px 20px; background-color: #2D3FE2; color: white; text-decoration: none; border-radius: 5px;">View Appointment</a>
      <p style="margin-top: 20px; font-size: 0.8em; color: #777;">Thank you for choosing DocMeet.</p>
    </div>
  `;

  // Send to Patient
  await sendEmail({
    to: patient.email,
    subject: "Your Consultation is Complete - DocMeet",
    html,
  });

  // Send to Admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `[ADMIN] Appointment Completed: ${patient.name} with ${doctor.name}`,
    html,
  });
};

export const sendAppointmentReminderEmail = async (appointment, user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #E2AD2D;">Appointment Reminder</h2>
      <p>Dear ${user.name}, this is a reminder for your upcoming appointment.</p>
      <div style="background: #fff8e1; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Time:</strong> ${new Date(appointment.startTime).toLocaleString()}</p>
      </div>
      <p>Please be available on the platform at the scheduled time.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments" style="display: inline-block; padding: 10px 20px; background-color: #E2AD2D; color: white; text-decoration: none; border-radius: 5px;">Join Session</a>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: "Reminder: Upcoming Appointment - DocMeet",
    html,
  });
};

export const sendPaymentConfirmationEmail = async (user, plan, credits) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #4CAF50;">Payment Confirmed</h2>
      <p>Dear ${user.name}, your payment for the <strong>${plan}</strong> plan has been successfully processed.</p>
      <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Credits Added:</strong> ${credits}</p>
        <p><strong>New Balance:</strong> ${user.credits + credits}</p>
      </div>
      <p>You can now use these credits to book appointments.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/doctors" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Book Now</a>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject: "Payment Confirmed: Credits Added - DocMeet",
    html,
  });
};
