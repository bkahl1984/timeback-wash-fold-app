export function removeDotsFromEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    const cleanedLocal = localPart.replace(/\./g, '');
    return `${cleanedLocal}@${domain}`;
}
