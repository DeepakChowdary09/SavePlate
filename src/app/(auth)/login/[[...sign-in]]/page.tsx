import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-emerald-500 hover:bg-emerald-400 text-black font-bold",
          },
        }}
      />
    </div>
  );
}
