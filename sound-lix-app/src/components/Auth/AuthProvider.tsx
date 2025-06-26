"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/state/hooks";
import { getUser } from "@/app/actions/dbAction";
import { User } from "@/models/data";
import { setSignIn, setSignOut } from "@/app/state/slices/authSlice";
import AuthModal from "./AuthModal";
import { setAuthModal } from "@/app/state/slices/notificationSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authModal = useAppSelector((state) => state.notification.authModal);
  const user = useAppSelector((state) => state.authentication.user);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const tokenResult = await authUser.getIdTokenResult();
        const nowUTC = new Date().getTime();
        const expTime = new Date(tokenResult.expirationTime).getTime();
        if (expTime < nowUTC) {
          await signOut(auth);
        } else {
          const user: User = await getUser({
            filter: "id",
            value: authUser.uid,
          });
          dispatch(setSignIn(user));
          setIsOpen(false);
        }
      } else if (user.role === "User") {
        dispatch(setSignOut());
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
