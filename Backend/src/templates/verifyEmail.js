export const verifyEmailTemplate = (username, emailVerificationToken) => `
    <div>
        <h1>Welcome to Perplexity</h1>

        <p>
            Hi <strong>${username}</strong>,
        </p>

        <p>
            Thank you for registering with <strong>Perplexity</strong>.
            We're excited to have you on board!
        </p>

        <p>
            Please verify your email address to activate your account.
        </p>

        <p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
                Verify Email Address
            </a>
        </p>

        <p>
            This verification link will expire in 15 minutes.
        </p>

        <p>
            If you didn't create an account with us, you can safely
            ignore this email.
        </p>

        <p>
            Best regards,<br>
            <strong>Perplexity Team</strong>
        </p>

        <hr>

        <p>
            This is an automated email. Please do not reply to this message.
        </p>

        <p>
            © 2026 Perplexity. All rights reserved.
        </p>
    </div>
`;