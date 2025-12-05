export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Global Info Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Explora el mundo desde tu pantalla
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}