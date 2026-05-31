export default function AuthHeroImage() {
  return (
    <div className="relative hidden lg:grid grid-cols-3 grid-rows-3  overflow-hidden bg-black/5 h-full">
      {Array.from({ length: 9 }, (_, i) => (
        <img
          key={i}
          src={`/images/img-${i + 1}.jpg`}
          alt={`Food ${i + 1}`}
          className="cursor-pointer h-full w-full object-cover "
        />
      ))}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
}
