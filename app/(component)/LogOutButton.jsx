import { useSetRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import { useRouter } from "next/navigation";

const KLogoutButton = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-400 rounded-md shadow-lg m-2 font-playpan font-medium"
    >
      Logout
    </button>
  );
};

export default KLogoutButton;
