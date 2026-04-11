import { getDoctorById, getAvailableTimeSlots } from "@/actions/appointments";
import { getDoctorReviews } from "@/actions/reviews";
import { DoctorProfile } from "./_components/doctor-profile";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage({ params }) {
  const { id } = await params;

  try {
    // Fetch doctor data, available slots, and reviews in parallel
    const [doctorData, slotsData, reviewsData] = await Promise.all([
      getDoctorById(id),
      getAvailableTimeSlots(id),
      getDoctorReviews(id),
    ]);

    return (
      <DoctorProfile
        doctor={doctorData.doctor}
        availableDays={slotsData.days || []}
        reviews={reviewsData.reviews || []}
      />
    );
  } catch (error) {
    console.error("Error loading doctor profile:", error);
    redirect("/doctors");
  }
}
