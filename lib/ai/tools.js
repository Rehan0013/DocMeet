import { db } from "../prisma.js";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * Tool to fetch doctors from Prisma based on specialty
 */
export const doctorSearchTool = tool(
  async ({ specialty }) => {
    try {
      const doctors = await db.user.findMany({
        where: {
          role: "DOCTOR",
          verificationStatus: "VERIFIED",
          specialty: specialty,
        },
        select: {
          id: true,
          name: true,
          specialty: true,
          experience: true,
          imageUrl: true,
          description: true,
        },
        take: 4,
        orderBy: {
          name: "asc",
        },
      });

      if (doctors.length === 0) {
        return "No verified doctors found for this specialty currently.";
      }

      return JSON.stringify(doctors);
    } catch (error) {
      console.error("Error in doctorSearchTool:", error);
      return "Error fetching doctors. Please try again later.";
    }
  },
  {
    name: "doctor_search",
    description: "Search for available doctors by their specialty (e.g., Cardiology, Dermatology, etc.). Returns a list of doctors with their names, IDs, and specialties.",
    schema: z.object({
      specialty: z.string().describe("The medical specialty to search for."),
    }),
  }
);
