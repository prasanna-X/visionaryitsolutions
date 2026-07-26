export async function sendEmail(to: string, subject: string, body: string) {
  // TODO: integrate Resend / SendGrid / SMTP
  console.log(`Email to ${to}: ${subject}`);
}
