import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { oAuthProxy } from "better-auth/plugins";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  baseURL: process.env.APP_URL, //APP_URL=http:localhost:3000
  trustedOrigins: [process.env.APP_URL!, "https://your-frontend.vercel.app"],

  //user additional field
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: "CUSTOMER",
        required: false,
      },
      phone: {
        type: 'string',
        defaultValue: '',
        required: false,
      },
      dob: {
        type: 'string',
        required: false,
      },
    }
  },

  //...other options
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: false,

    sendVerificationEmail: async ({ user, url }) => {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY!,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "FoodHub",
            email: process.env.BREVO_SENDER_EMAIL!,
          },
          to: [
            {
              email: user.email,
              name: user.name,
            },
          ],
          subject: "Verify your FoodHub email",
          htmlContent: `
        <!DOCTYPE html>
        <html>
          <body>
            <h2>Welcome to FoodHub 🍴</h2>

            <p>Hello ${user.name},</p>

            <p>
              Thank you for creating a FoodHub account.
              Please verify your email address.
            </p>

            <a
              href="${url}"
              style="
                display: inline-block;
                padding: 12px 20px;
                background: #16a34a;
                color: white;
                text-decoration: none;
                border-radius: 6px;
              "
            >
              Verify Email
            </a>

            <p>
              If you did not create this account, you can ignore this email.
            </p>
          </body>
        </html>
      `,
        }),
      });

      if (!response.ok) {
        const error = await response.text();

        console.error("Brevo email error:", error);

        throw new Error("Failed to send verification email");
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
  },

  // account: { skipStateCookieCheck: true }, // solved redirect issue
  advanced: {
    cookies: {
      session_token: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
      state: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
    },
  },

  plugins: [oAuthProxy()],
});
