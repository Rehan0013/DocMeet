"use client";

import { useEffect, useState } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, History } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DoctorAppointmentsList() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments(activeTab);
  }, [activeTab]);

  const appointments = data?.appointments || [];

  return (
    <Card className="border-emerald-900/20">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-7">
        <CardTitle className="text-xl font-bold text-white flex items-center">
          {activeTab === "upcoming" ? (
            <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
          ) : (
            <History className="h-5 w-5 mr-2 text-emerald-400" />
          )}
          {activeTab === "upcoming" ? "Upcoming" : "Past"} Appointments
        </CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-muted/30 w-full md:w-auto">
            <TabsTrigger value="upcoming" className="flex-1 md:flex-none">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="flex-1 md:flex-none">Past</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground animate-pulse">Loading appointments...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="DOCTOR"
                refetchAppointments={() => fetchAppointments(activeTab)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/10 rounded-lg border border-dashed border-emerald-900/20">
            {activeTab === "upcoming" ? (
              <>
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-20" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No upcoming appointments
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  You don&apos;t have any scheduled appointments yet. Make sure
                  you&apos;ve set your availability.
                </p>
              </>
            ) : (
              <>
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-20" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No previous record
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  You haven&apos;t completed any appointments yet.
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
