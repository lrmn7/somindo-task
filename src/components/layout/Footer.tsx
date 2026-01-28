export default function Footer() {
  return (
    <footer className="bg-primary text-center text-accent p-4 mt-12 border-t-2 border-primary">
      <p className="mb-2">
        Made with 💛 by{" "}
        <a
          href="https://lrmn.link"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline transition-colors"
        >
          L RMN
        </a>
      </p>
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Somindo. All rights reserved.
      </p>
    </footer>
  );
}