import type { TourDetails } from "@/entities/tour/model/types";
import { getTourStatusClassName } from "@/entities/tour/lib/get-tour-status-classname";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/components/ui/card";
import { getToursList } from "@/server/repositories/tours.repository";
import {getTourStatusLabel} from "@/entities/tour/lib/get-tour-status-label";
import {formatDateTime} from "@/shared/lib/format/date";

export default async function DashboardPage() {
    const tours: TourDetails[] = await getToursList();
    const now = new Date();

    const totalTours = tours.length;

    const activeTours = tours.filter((tour) => {
        const start = new Date(tour.startDateTime);
        const end = new Date(tour.finishDateTime);

        return start <= now && end >= now;
    }).length;

    const upcomingTours = tours.filter((tour) => {
        const start = new Date(tour.startDateTime);
        return start > now;
    }).length;

    const completedTours = tours.filter((tour) => {
        const end = new Date(tour.finishDateTime);
        return end < now;
    }).length;

    const totalRevenue = tours.reduce((sum, tour) => {
        const price = Number(tour.tourPrice ?? 0);
        return sum + (Number.isNaN(price) ? 0 : price);
    }, 0);

    const recentTours = [...tours]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

    const stats = [
        { title: "Total Tours", value: totalTours },
        { title: "Active Tours", value: activeTours },
        { title: "Upcoming Tours", value: upcomingTours },
        { title: "Completed Tours", value: completedTours },
    ];

    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
                <p className="text-sm text-muted-foreground">
                    Here is a quick overview of your tourism CRM.
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>Recent Tours</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {recentTours.length === 0 ? (
                            <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                                No tours yet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentTours.map((tour) => (
                                    <div
                                        key={tour.id}
                                        className="rounded-lg border p-4 transition-colors hover:bg-muted/40"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0 space-y-1">
                                                <div className="truncate font-medium">
                                                    {tour.tourName}
                                                </div>

                                                <div className="felx gap-4">
                                                   <span className="text-sm text-muted-foreground">{formatDateTime(tour.startDateTime)}</span>
                                                   <span className="text-sm text-muted-foreground">{formatDateTime(tour.finishDateTime)}</span>
                                                </div>

                                                <div className="text-sm text-muted-foreground">
                                                    Tourists: {tour.touristsCount} · Duration:{" "}
                                                    {tour.durationMinutes} min · Price: $
                                                    {tour.tourPrice}
                                                </div>
                                            </div>

                                            <span
                                                className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getTourStatusClassName(
                                                    tour.status
                                                )}`}
                                            >
                                                {getTourStatusLabel(tour.status)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div>
                            <div className="text-sm text-muted-foreground">
                                Total Revenue
                            </div>
                            <div className="text-3xl font-bold">
                                ${totalRevenue.toFixed(2)}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Dashboard is now connected to real tours data.</p>
                            <p>Next we can add timeline, staff widgets, and audit activity.</p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}