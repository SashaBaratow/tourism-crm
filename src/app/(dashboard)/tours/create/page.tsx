import { CreateTourForm } from "@/features/tour/create-tour/ui/CreateTourForm";

export default function CreateTourPage() {
    return (
        <div className="space-y-6 container mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Create tour</h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the basic information to create a new tour.
                </p>
            </div>

            <CreateTourForm />
        </div>
    );
}