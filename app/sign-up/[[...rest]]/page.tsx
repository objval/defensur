import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white shadow-xl rounded-2xl border-0",
            headerTitle: "font-[family-name:var(--font-heading)] text-2xl",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border-border hover:bg-muted",
            formButtonPrimary: "bg-brand-navy hover:bg-brand-navy/90",
            footerActionLink: "text-brand-sky hover:text-brand-sky/80",
          },
        }}
        routing="path"
        path="/sign-up"
      />
    </div>
  )
}
