"use client";

import WordMark from "@/components/WordMark";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import clsx from "clsx";
// import clsx from "clsx";

type NavBarProps = {
  settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      // Disable body scrolling when modal is open
      document.body.classList.add("overflow-hidden");
    } else {
      // Enable body scrolling when modal is closed
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <nav aria-label="NavBar" className="p-4 md:p-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between  py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <WordMark />
            <span className="sr-only">Gravity Home Page</span>
          </Link>
        </div>

        {/* Mobile Nav  */}

        <button
          type="button"
          className="mb-4 block p-2 text-3xl text-white md:hidden"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <MdMenu />
          <span className="sr-only">Open menu</span>
        </button>

        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-center gap-4 bg-[#070815]/95  pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 z-10 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="mt-8 grid justify-items-center gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </ButtonLink>
                );
              }

              return (
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav  */}

        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink field={item.link}>{item.label}</ButtonLink>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
