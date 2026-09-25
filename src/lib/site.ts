export const SITE = {
  name: "REID PLUMBING",
  suffix: "LLC",
  phone: "+1 928-899-1366",
  tel: "tel:+19288991366",
  email: "reidplumbing928@gmail.com",
  mailto: "mailto:reidplumbing928@gmail.com",
};

export const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Before & After", id: "before-after" },
  { label: "Solutions", id: "solutions" },
  { label: "Contact", id: "contact" },
];

export const NAV_OFFSET = 104;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
