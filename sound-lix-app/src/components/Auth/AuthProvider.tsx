"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { getUser } from "@/app/actions/dbAction";
import { User } from "@/models/data";
import { setSignIn } from "@/app/state/slices/authSlice";
import AuthModal from "./AuthModal";
import { setAuthModal } from "@/app/state/slices/notificationSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authModal = useAppSelector((state) => state.notification.authModal);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user: User = await getUser(authUser.uid);
        dispatch(setSignIn(user));
        setIsOpen(false); // Close modal after sign-in
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(authModal.show);
  }, [authModal.show]);

  return (
    <>
      {isOpen && (
        <AuthModal
          text={
            authModal.isDownload
              ? "Log in to download songs for free"
              : "Log in to create your favorite playlists"
          }
          imgage={authModal.image}
          onClose={() =>
            dispatch(
              setAuthModal({ show: false, image: "", isDownload: false })
            )
          }
        />
      )}
      {children}
    </>
  );
};

export default AuthProvider;
