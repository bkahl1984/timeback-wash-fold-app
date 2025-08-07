export function generateConfirmationNumber(prefix = "TB"): string {
    const timestamp = Date.now().toString(36); // base36 timestamp
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-char random
    return `${prefix}-${timestamp}-${randomPart}`;
}
