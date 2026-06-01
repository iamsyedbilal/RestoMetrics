import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Big 404 */}
        <h1 className="text-7xl font-bold tracking-tight text-primary">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold">Page not found</h2>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Soft card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs text-muted-foreground">
            You may have typed the wrong URL or followed a broken link.
          </p>
        </div>

        {/* Action */}
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          Go back home
        </Link>
      </div>
    </div>
  );
}
