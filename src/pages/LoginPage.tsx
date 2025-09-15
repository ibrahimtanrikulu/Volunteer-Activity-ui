import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 
import Password from "../components/Form/Password";
import Text from "../components/Form/Text";

const schema = z.object({
  email: z.string().email("Geçerli bir e-posta girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    // TODO: Burada API'ye bağlanacağız (login)
    // const { access } = await login(values);
    // await auth.login(access);
    console.log("Login form values:", values);
    nav("/events"); // şimdilik başarı kabul
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">Giriş Yap</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Text
          label="E-posta"
          placeholder="ornek@mail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Password
          label="Şifre"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
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