export default function CenteredLayout({ children, withBackground = false }) {
  return (
    <div className="flex items-center justify-center p-4 w-full min-h-screen">
      <div
        className={`w-full max-w-[600px] sm:max-w-[500px] lg:max-w-[600px] h-auto ${
          withBackground ? "bg-[rgba(217,217,217,0.1)] shadow-md" : ""
        } rounded-2xl flex items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-6 w-full px-4 sm:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
