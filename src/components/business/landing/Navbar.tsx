'use client';

import React, { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/business/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/business/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { encodeImagePath } from "@/utils/imagePath";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/business/ui/dropdown-menu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname !== "/business") {
      window.location.href = `/business#${id}`;
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "الأسعار", id: "pricing" },
    { name: "المطورين (API)", id: "developers" },
    { name: "المدونة", id: "blog" },
  ];

  const productLinks = [
    { name: "الرسائل النصية SMS", href: "/business/products/sms" },
    { name: "واتساب أعمال API", href: "/business/products/whatsapp" },
    { name: "O-Time برنامج الموارد البشرية", href: "/business/products/o-time" },
    { name: "Gov Gate", href: "/business/products/gov-gate" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || pathname !== "/business" ? "bg-[#E8DCCB]/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Right: Logo */}
        <Link href="/" className="flex items-center gap-2 -my-2">
          {/* Logo - maximized size using negative margins to extend beyond navbar padding */}
          <Image 
            src={encodeImagePath("/logo/شعار المدار1-0٢.png")} 
            alt="Orbit Logo" 
            width={300} 
            height={300} 
            className="h-20 md:h-28 lg:h-36 w-auto object-contain" 
          />
        </Link>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-[#7A1E2E] transition-colors outline-none cursor-pointer">
                المنتجات
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-[#7A1E2E]/10 z-50">
              {productLinks.map((product) => (
                <DropdownMenuItem key={product.name} asChild>
                  <Link href={product.href} className="w-full cursor-pointer hover:bg-[#7A1E2E]/5 hover:text-[#7A1E2E]">
                    {product.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-sm font-medium text-slate-700 hover:text-[#7A1E2E] transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Left: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="font-medium text-[#7A1E2E] hover:text-[#7A1E2E] hover:bg-[#7A1E2E]/10">
            تسجيل الدخول
          </Button>
          <Button className="bg-[#7A1E2E] hover:bg-[#601824] text-white font-bold shadow-lg shadow-[#7A1E2E]/20">
            ابدأ بـ 50 رسالة مجانية
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-[#7A1E2E]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#E8DCCB] border-l border-[#7A1E2E]/20">
              <div className="flex flex-col gap-6 mt-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#7A1E2E] border-b border-[#7A1E2E]/20 pb-2">المنتجات</h4>
                  {productLinks.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="block text-base font-medium text-slate-800 hover:text-[#7A1E2E]"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
                
                <div className="h-px bg-[#7A1E2E]/20 my-2" />
                
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-lg font-medium text-slate-800 hover:text-[#7A1E2E]"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="h-px bg-[#7A1E2E]/20 my-2" />
                
                <Button variant="outline" className="w-full justify-start border-[#7A1E2E] text-[#7A1E2E] hover:bg-[#7A1E2E]/10 bg-transparent">
                  تسجيل الدخول
                </Button>
                <Button className="w-full bg-[#7A1E2E] text-white hover:bg-[#601824]">ابدأ بـ 50 رسالة مجانية</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};



