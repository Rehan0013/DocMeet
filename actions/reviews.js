"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Submits a new review for an appointment
 */
export async function submitReview(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const appointmentId = formData.get("appointmentId");
  const rating = parseInt(formData.get("rating"), 10);
  const comment = formData.get("comment");

  if (!appointmentId || !rating) {
    throw new Error("Appointment ID and rating are required");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  try {
    // 1. Find the appointment and verify it belongs to the user and is COMPLETED
    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Verify the user is the patient of this appointment
    const patientUser = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (appointment.patientId !== patientUser.id) {
      throw new Error("You are not authorized to review this appointment");
    }

    if (appointment.status !== "COMPLETED") {
      throw new Error("Reviews can only be submitted for completed appointments");
    }

    // 2. Check if a review already exists (one review per appointment)
    const existingReview = await db.review.findUnique({
      where: {
        appointmentId: appointmentId,
      },
    });

    if (existingReview) {
      throw new Error("A review has already been submitted for this appointment");
    }

    // 3. Create the review
    const review = await db.review.create({
      data: {
        appointmentId,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        rating,
        comment,
      },
    });

    revalidatePath("/");
    revalidatePath(`/doctor/${appointment.doctorId}`);
    
    return { success: true, review };
  } catch (error) {
    console.error("Failed to submit review:", error);
    throw new Error(error.message || "Failed to submit review");
  }
}

/**
 * Gets top 10 reviews (rating >= 4) for the homepage carousel
 */
export async function getTopReviews() {
  try {
    const reviews = await db.review.findMany({
      where: {
        rating: {
          gte: 4,
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        patient: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        doctor: {
          select: {
            name: true,
          },
        },
      },
    });

    return { reviews };
  } catch (error) {
    console.error("Failed to fetch top reviews:", error);
    return { reviews: [], error: "Failed to fetch top reviews" };
  }
}

/**
 * Gets top reviews for a specific doctor (rating >= 4)
 */
export async function getDoctorReviews(doctorId) {
  try {
    const reviews = await db.review.findMany({
      where: {
        doctorId,
        rating: {
          gte: 4,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        patient: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return { reviews };
  } catch (error) {
    console.error("Failed to fetch doctor reviews:", error);
    return { reviews: [], error: "Failed to fetch reviews" };
  }
}
