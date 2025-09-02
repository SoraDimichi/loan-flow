interface LoadingScreenProps {
  loaderData?: {
    version?: string;
  };
}

export default function LoadingScreen({ loaderData }: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          {loaderData?.version && (
            <p className="text-gray-700 dark:text-gray-200">
              Version: {loaderData.version}
            </p>
          )}

          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-200">
            Loading application...
          </p>
        </div>
      </div>
    </div>
  );
}
