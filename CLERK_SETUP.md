# Clerk Authentication Setup

Your app is now configured to use Clerk authentication with Google OAuth. Here's what you need to do to complete the setup:

## 1. Clerk Dashboard Configuration

Go to your Clerk Dashboard (https://dashboard.clerk.com) and:

### Enable Google OAuth
1. Navigate to "User & Authentication" → "Social Connections"
2. Enable "Google" as a social provider
3. Add your OAuth credentials (or use Clerk's development keys for testing)

### Configure Redirect URLs
Add these redirect URLs in your Clerk dashboard under "Paths":
- For development: `exp://localhost:8081` (or your Expo dev URL)
- For production: Your app's custom scheme `quraanmatch2://`

## 2. Environment Variables

Your `.env` file already has:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2FudGVkLW9hcmZpc2gtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA
```

Make sure this key is valid and matches your Clerk application.

## 3. Test the Flow

1. Start your app: `npx expo start --clear`
2. Click "Continue with Google" or "Launch App" from the landing page
3. You should be redirected to the sign-in screen at `/Auth/sign-in`
4. Try signing in with Google OAuth or email/password

## Current Navigation Flow

```
Landing (/) 
  → Click "Continue with Google" or "Launch App"
  → Auth screens (/Auth/sign-in or /Auth/sign-up)
    → Google OAuth button (top)
    → OR email/password form (below)
  → After successful auth → Main app (/(tabs))
```

## Auth Protection

The `AuthProtection` component in `app/_layout.tsx` handles:
- Redirecting signed-in users away from auth screens to the main app
- Redirecting non-signed-in users trying to access protected routes back to landing

## Troubleshooting

If Google OAuth doesn't work:
1. Verify Google is enabled in Clerk dashboard
2. Check redirect URLs are configured correctly
3. Make sure `expo-web-browser` is installed (already in your package.json)
4. For web, ensure your Clerk app allows the web domain
