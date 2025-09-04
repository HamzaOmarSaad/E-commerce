"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cartContext } from "@/context/cartContext";
import { ShoppingCart, CloseSquare, HamburgerMenu } from "iconsax-reactjs";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useContext(cartContext);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { status } = useSession();

  return (
    <>
      <div className="navbar fixed top-0 w-full bg-white z-50 shadow-sm">
        {/* Sale Banner */}
        {status === "authenticated" ? (
          ""
        ) : (
          <div className="sale bg-black w-full text-white text-center py-2 px-4">
            <p className="text-xs sm:text-sm">
              Sign up and get 20% off to your first order.
              <Link
                href="/register"
                className="underline ml-2 hover:text-gray-300"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        )}

        <div className="main-nav flex justify-between items-center p-4 container mx-auto">
          <div className="logo">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold hover:text-gray-700"
            >
              SHOP.CO
            </Link>
          </div>

          <div className="nav-links hidden md:flex gap-6">
            <Link
              href="/"
              className="hover:text-gray-600 transition-colors capitalize"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="hover:text-gray-600 transition-colors capitalize"
            >
              Category
            </Link>
            <Link
              href="/brands"
              className="hover:text-gray-600 transition-colors capitalize"
            >
              Brands
            </Link>
            <Link
              href="/wishlist"
              className="hover:text-gray-600 transition-colors capitalize"
            >
              Wishlist
            </Link>
          </div>

          {/* Right Side - Cart and Actions */}
          <div className="left-side flex gap-4 items-center">
            {/* Cart */}
            <div className="cart relative">
              <Link
                href="/cart"
                className="hover:opacity-70 transition-opacity"
              >
                <ShoppingCart
                  size="32"
                  color="#000"
                  className="sm:w-10 sm:h-10"
                />
              </Link>
              <span className="bg-black text-white text-xs rounded-full px-2 py-1 absolute -top-2 -right-2 min-w-[20px] text-center">
                {cart?.products?.length ||0}
              </span>
            </div>

            {/* Logout - Hidden on mobile */}
            {status === "loading" ? (
              <Skeleton className="h-3" />
            ) : status === "authenticated" ? (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="hidden sm:block hover:text-gray-600 transition-colors"
              >
                logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block hover:text-gray-600 transition-colors"
              >
                login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseSquare size="28" color="#000" />
              ) : (
                <HamburgerMenu size="28" color="#000" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100 capitalize"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100 capitalize"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Category
              </Link>
              <Link
                href="/brands"
                className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100 capitalize"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                href="/wishlist"
                className="hover:text-gray-600 transition-colors py-2 border-b border-gray-100 capitalize"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                className="hover:text-gray-600 transition-colors py-2 text-red-600"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
