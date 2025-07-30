import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      <Navbar />
      <div className="flex-grow h-full  pt-16 ">{children}</div>
    </div>
  );
}
