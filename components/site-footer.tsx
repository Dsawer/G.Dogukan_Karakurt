import { iconLinks, profile } from "@/lib/content";
import { IconLink } from "@/components/icon-link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-10 text-[13px] text-muted-foreground">
        <div className="flex flex-wrap gap-2">
          {iconLinks.map((link) => (
            <IconLink key={link.brand} link={link} />
          ))}
        </div>
        <p>
          © {year} {profile.name} · METU Civil Engineering — Construction Management
        </p>
        <p className="text-[12px] text-muted-foreground/80">
          Personal contact details (email, phone, address) are intentionally omitted
          from this site. Please reach out through LinkedIn for academic correspondence.
        </p>
      </div>
    </footer>
  );
}
