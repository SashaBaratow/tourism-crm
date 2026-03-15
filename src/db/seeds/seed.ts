import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { managers, staff, cars, tours, tourStaffAssignments } from "../schema";
import * as schema from "../schema";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
    console.log("Seeding started...");

    await db.insert(managers).values([
        {
            firstName: "Admin",
            lastName: "Manager",
            email: "admin@local.test",
            phone: "+996700000001",
            login: "admin",
            passwordHash: "temp_hash_here",
            activeStatus: true,
        },
    ]).onConflictDoNothing();

    await db.insert(staff).values([
        {
            role: "guide",
            firstName: "Aibek",
            lastName: "Turgunov",
            age: 30,
            language: "English",
            salary: "50000",
            phone: "+996700000101",
            status: "active",
            notes: "Senior guide",
        },
        {
            role: "driver",
            firstName: "Nurlan",
            lastName: "Asanov",
            age: 41,
            language: "Russian",
            salary: "45000",
            phone: "+996700000102",
            status: "active",
            notes: "Experienced mountain driver",
        },
        {
            role: "cook",
            firstName: "Elina",
            lastName: "Bekova",
            age: 35,
            language: "Russian",
            salary: "40000",
            phone: "+996700000103",
            status: "active",
            notes: "Camp meals specialist",
        },
    ]);

    const allStaff = await db.query.staff.findMany();

    const driver = allStaff.find((item) => item.role === "driver");
    const guide = allStaff.find((item) => item.role === "guide");
    const cook = allStaff.find((item) => item.role === "cook");

    if (!driver || !guide || !cook) {
        throw new Error("Required seeded staff not found");
    }

    await db.insert(cars).values([
        {
            driverId: driver.id,
            mark: "Toyota",
            model: "Sequoia",
            licensePlate: "01KG123ABC",
            placesCount: 6,
            notes: "Main SUV",
            isActive: true,
        },
    ]);

    await db.insert(tours).values([
        {
            tourName: "Issyk-Kul Weekend Tour",
            startDatetime: new Date("2026-03-20T08:00:00"),
            finishDatetime: new Date("2026-03-22T20:00:00"),
            durationMinutes: 3600,
            touristsCount: 8,
            tourPrice: "25000",
            status: "planned",
            description: "Weekend tour to Issyk-Kul",
            notes: "Need hotel confirmation",
        },
    ]);

    const allTours = await db.query.tours.findMany();
    const currentTour = allTours[0];

    if (!currentTour) {
        throw new Error("Seeded tour not found");
    }

    await db.insert(tourStaffAssignments).values([
        {
            tourId: currentTour.id,
            staffId: guide.id,
            assignmentRole: "guide",
        },
        {
            tourId: currentTour.id,
            staffId: driver.id,
            assignmentRole: "driver",
        },
        {
            tourId: currentTour.id,
            staffId: cook.id,
            assignmentRole: "cook",
        },
    ]);

    console.log("Seeding completed.");
    await client.end();
}

seed().catch(async (error) => {
    console.error("Seeding failed:", error);
    await client.end();
    process.exit(1);
});