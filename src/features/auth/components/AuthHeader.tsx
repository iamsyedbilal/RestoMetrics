import { Link } from "react-router-dom";

type AuthHeaderProps = {
  heading: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
};

export default function AuthHeader({
  heading,
  subtitle,
  linkText,
  linkTo,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mb-6 flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
          <span className="text-primary-foreground font-bold">R</span>
        </div>

        <span className="text-xl font-semibold tracking-tight text-foreground">
          RestoMetrics
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {heading}
      </h1>

      <p className="mt-1 text-sm text-muted-foreground/90">
        {subtitle}{" "}
        <Link
          to={linkTo}
          className="font-medium text-primary hover:text-primary/80">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
