export default function Footer() {
  return (
    <footer className="bg-depth-1 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Daeya Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
