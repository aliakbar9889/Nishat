// Home Component
import InfiniteMovingHeadings from "@/components/ui/motion";

export default function Home() {
  return (
    <main>
      <div className="w-full py-4 sm:py-10 bg-[#004D43] rounded-tl-3xl rounded-tr-3xl">
        <InfiniteMovingHeadings
          headings={[
            "WE ARE NISHAT WE ARE NISHAT WE ARE NISHAT",
          ]}
        />
      </div>
    </main>
  );
}