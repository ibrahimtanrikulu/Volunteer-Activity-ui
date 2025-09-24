import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "../components/Form/Password";
import Text from "../components/Form/Text";
import { Register } from "../services/auth";
const schema = z
  .object({
    role: z.string().min(1, "Rol seçimi zorunlu"),
    username: z.string().min(3, "Kullanıcı adı en az 3 karakter"),
    first_name: z.string().min(2, "İsim en az 2 karakter"),
    last_name: z.string().min(2, "Soyisim en az 2 karakter"),
    email: z.string().email("Geçerli bir e-posta girin"),
    password: z.string().min(6, "Şifre en az 6 karakter"),
    confirm: z.string().min(6, "Şifre tekrarı en az 6 karakter"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Şifreler eşleşmiyor",
    path: ["confirm"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const nav = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { role: "volunteer" } });

  const onSubmit = async (values: FormValues) => {   
    const { user } = await Register({
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,
      first_name: values.first_name,
      last_name: values.last_name,
    });
    console.log(user);
    
    nav("/login");
    };

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="mb-6 text-center text-2xl font-semibold">Kayıt Ol</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rol */}
        <div>
          <span className="mb-1 block text-sm font-medium">Rol</span>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => field.onChange("volunteer")}
                  className={`rounded-md border px-3 py-2 ${
                    field.value === "volunteer"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300"
                  }`}
                >
                  Gönüllü
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("org")}
                  className={`rounded-md border px-3 py-2 ${
                    field.value === "org"
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300"
                  }`}
                >
                  Kurum
                </button>
              </div>
            )}
          />
          {errors.role && (
            <span className="text-xs text-red-600">{errors.role.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Text
            label="İsim"
            placeholder="İbrahim"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <Text
            label="Soyisim"
            placeholder="Tanrıkulu"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
        </div>

        <Text
          label="Kullanıcı Adı"
          placeholder="ornek_kullanici"
          error={errors.username?.message}
          {...register("username")}
        />

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
        <Password
          label="Şifre (Tekrar)"
          placeholder="••••••••"
          error={errors.confirm?.message}
          {...register("confirm")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {isSubmitting ? "Gönderiliyor..." : "Kayıt Ol"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Zaten hesabın var mı?{" "}
        <Link className="font-medium text-gray-900 underline" to="/login">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
