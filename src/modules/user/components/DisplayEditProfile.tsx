// src/app/user/account/components/DisplayEditProfile.tsx
import React, { useState, useEffect } from "react"; // useEffect ditambahkan untuk logging
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProfileData = {
  fullName: string;
  phone: string;
  email: string;
  password?: string;
};

// Data awal yang mungkin Anda dapatkan dari API atau props
const fetchedInitialProfileData: ProfileData = {
  fullName: "John Doe",
  phone: "081234567890",
  email: "johndoe@example.com",
  password: "", // Biasanya password tidak diambil dari backend untuk ditampilkan
};

const DisplayEditProfile = () => {
  const [edit, setOnEdit] = useState(false);

  type ProfileData = {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  };

  const profileData: ProfileData = {
    fullName: "John Doe",
    phone: "081234567890",
    email: "johndoe@example.com",
    password: "12345678",
  };
  return (
    <>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 px-4 pt-2">
          <div>
            <Label className="font-bold " htmlFor="fullName">
              Nama Lengkap
            </Label>
            <Input
              type="text"
              id="fullName"
              defaultValue={profileData?.fullName}
              className="mt-2"
              disabled={!edit}
              placeholder="masukan nama lengkap"
            />
          </div>

          <div>
            <Label className="font-bold " htmlFor="phone">
              Nomor Telepon
            </Label>
            <Input
              type="tel"
              id="phone"
              disabled={!edit}
              defaultValue={profileData?.phone}
              className="mt-2"
              placeholder="masukan phone"
            />
          </div>

          <div>
            <Label className="font-bold " htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              disabled={!edit}
              defaultValue={profileData?.email}
              className="mt-2"
              placeholder="masukan email"
            />
          </div>
          <div>
            <Label className="font-bold " htmlFor="email">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              disabled={!edit}
              defaultValue={profileData?.password}
              className="mt-2"
            />
          </div>
        </form>
        <div className="m-4 btn-action flex gap-2">
          <Button
            onClick={() => setOnEdit(true)}
            className={`transition-all duration-300 ease-in-out transform px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 hover:shadow-md ${
              !edit
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            Edit
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={() => setOnEdit(false)}
              className={`transition-all duration-300 ease-in-out transform px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 hover:shadow-md ${
                edit
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              cancel
            </Button>
            <Button
              onClick={() => setOnEdit(false)}
              className={`transition-all duration-300 ease-in-out transform px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 hover:shadow-md ${
                edit
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              selesai
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
};
export default DisplayEditProfile;
