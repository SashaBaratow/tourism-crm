type DashboardHeaderProps = {
    title?: string;
    description?: string;
};

export function DashboardHeader(
    {
        title = "Dashboard",
        description,
    }: DashboardHeaderProps) {
    return (
        <header className="border-b bg-white px-6 py-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description ? (
                    <p className="text-sm text-muted-foreground">{description}</p>
                ) : null}
            </div>
        </header>
    );
}