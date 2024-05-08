export function formatDate(dateString: string): string {
    // Parse the input date string
    const date = new Date(dateString);

    // Format the date to "day month year" using toLocaleDateString
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}