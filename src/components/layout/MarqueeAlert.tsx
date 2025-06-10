import { Shell } from "lucide-react";

export default function MarqueeAlert() {
  const message = (
    <>
      <Shell className="w-5 h-5 mx-4 flex-shrink-0" />
      <span className="font-semibold">
        Somnia Indonesia Community
      </span>
      <Shell className="w-5 h-5 mx-4 flex-shrink-0" />
      <span className="font-semibold">
        Follow us on Twitter and join our Discord community today!
      </span>
    </>
  );

  return (
    <div className="bg-secondary text-accent overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <div className="flex items-center" key={i}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}
