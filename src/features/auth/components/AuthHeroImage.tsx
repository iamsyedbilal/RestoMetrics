import { useState } from "react";

const images = Array.from({ length: 9 }, (_, i) => `/images/img-${i + 1}.jpg`);

export default function AuthHeroImage() {
  const [randomImage] = useState(
    () => images[Math.floor(Math.random() * images.length)],
  );

  return (
    <div className="relative hidden lg:block min-h-screen overflow-hidden">
      <img
        src={randomImage}
        alt="Restaurant"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-20 left-8 right-8 text-white">
        <h2 className="text-4xl font-bold leading-tight">
          Grow Your Restaurant Business
        </h2>

        <p className="mt-3 max-w-md text-lg text-white/80">
          Analytics, reservations and customer insights in one place.
        </p>
      </div>
    </div>
  );
}
