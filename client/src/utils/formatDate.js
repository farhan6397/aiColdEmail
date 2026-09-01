/**
 * Format Date / Timestamp string to Indian Standard Time (IST - Asia/Kolkata)
 * Example Output: "02 Sep 2026, 12:41 AM IST"
 */
export const formatIST = (dateString, includeTime = true) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const formatted = date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            ...(includeTime && {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        });
        return includeTime ? `${formatted} IST` : formatted;
    } catch (error) {
        return new Date(dateString).toLocaleString();
    }
};

export default formatIST;
