import Link from "next/link";

export default function ButtonScroll() {
  return (
    <Link
      href="#home"
      scroll={true}
      className="px-4 py-2 mt-5 text-sky-50 bg-sky-400 hover:bg-sky-300 rounded-lg font-bold scroll-smooth"
    >
      Upload Your CV Now
    </Link>
  );
}
