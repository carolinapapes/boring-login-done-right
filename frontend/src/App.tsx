import { LoginSection } from "./features/login/components/LoginSection";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <section className="w-full max-w-95 space-y-6 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
        </div>

        <LoginSection />
      </section>
    </main>
  );
}
