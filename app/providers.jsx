// "use client";

// import { GoogleOAuthProvider } from "@react-oauth/google";

// export default function Providers({ children }) {
//     return (
//         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//             {children}
//         </GoogleOAuthProvider>
//     );
// }
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }) {
    return (
        <GoogleOAuthProvider clientId="509482865609-kkcnqatpc8sg91tnval0gp94sm8b417h.apps.googleusercontent.com">
            {children}
        </GoogleOAuthProvider>
    );
}
