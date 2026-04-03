import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-display text-white mb-4">404</p>
        <p className="text-primary-500 mb-8">
          お探しのページは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="
            inline-block px-8 py-3
            border border-white/20 text-white text-sm tracking-wider uppercase
            hover:bg-white hover:text-primary-950
            transition-all duration-500
          "
        >
          Home
        </Link>
      </div>
    </div>
  );
}
