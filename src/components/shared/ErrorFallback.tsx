import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const errorMessage =
    error instanceof Error ? error.message : String(error ?? "Unknown error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-destructive">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Try again
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
