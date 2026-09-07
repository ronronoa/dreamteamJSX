import Spinner from "./widgets/Spinner";

/**
 * loading screen spinner
 */
export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <Spinner size={48} />
    </div>
  );
}
