import { BiLoaderAlt } from "react-icons/bi";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center text-3xl text-zinc-50 font-bold bg-black/80">
      <BiLoaderAlt className="animate-spin mr-3" />{" "}
      <p className="">Loading...</p>
    </div>
  );
};
