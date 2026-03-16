export function getDurationMinutes(
    startDateTime: string,
    finishDateTime: string
): number {
    const start = new Date(startDateTime);
    const finish = new Date(finishDateTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(finish.getTime())) {
        return 0;
    }

    const diffMs = finish.getTime() - start.getTime();

    if (diffMs <= 0) {
        return 0;
    }

    return Math.floor(diffMs / (1000 * 60));
}