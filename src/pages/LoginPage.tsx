// src/pages/LoginPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import Password from "../components/Form/Password";
import Text from "../components/Form/Text";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  username: z.string().min(1, "Kullanıcı adı zorunlu"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const nav = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => { 
    const { user } = await login({ username: values.username, password: values.password }); 
    setUser(user);
    nav("/events");
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">Giriş Yap</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Text label="Kullanıcı Adı" placeholder="ornekKullanici" error={errors.username?.message} {...register("username")} />
        <Password label="Şifre" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
        <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white disabled:opacity-60">
          {isSubmitting ? "Gönderiliyor..." : "Giriş"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Hesabın yok mu?{" "}
        <Link className="font-medium text-gray-900 underline" to="/register">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}
