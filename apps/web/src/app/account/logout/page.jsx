import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            See You Soon!
          </h1>
          <p className="text-gray-600 mb-8">Thanks for visiting ToyTopia</p>

          <button
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
