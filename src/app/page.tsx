import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <Image
        src="/coach.png"
        alt="Coach Image"
        width={800}
        height={600}
        className="max-w-full h-auto object-contain"
        priority
      />
    </div>
  );
}