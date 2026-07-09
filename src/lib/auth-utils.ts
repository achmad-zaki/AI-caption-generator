export function getPendingOtpKey(email: string) {
    return `captionai-pending-otp:${email}`;
}
