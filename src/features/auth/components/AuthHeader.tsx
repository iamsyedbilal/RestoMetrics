import { Link } from "react-router-dom";
import Logo from "../../../components/shared/Logo";

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
      <Logo />
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
