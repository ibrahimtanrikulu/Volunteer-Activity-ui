import { useForm, type SubmitHandler } from "react-hook-form";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  role: "volunteer" | "org";
};

const DUMMY_USER: User = {
  first_name: "İbrahim",
  last_name: "Tanrıkulu",
  email: "ibrahim@example.com",
  role: "volunteer",
};

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  role: "volunteer" | "org";
};

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: DUMMY_USER,
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log("Profil güncellendi (dummy):", values);
    alert("Profil bilgileri güncellendi (dummy). Konsolu kontrol et!");
    reset(values);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profilim</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* İsim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ad</label>
            <input
              {...register("first_name", { required: "Ad gerekli" })}
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.first_name && (
              <span className="text-xs text-red-600">{errors.first_name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Soyad</label>
            <input
              {...register("last_name", { required: "Soyad gerekli" })}
              className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-indigo-100"
            />
            {errors.last_name && (
              <span className="text-xs text-red-600">{errors.last_name.message}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            {...register("email", { required: "E-posta gerekli" })}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        {/* Rol */}
        <div>
          <label className="block text-sm font-medium mb-1">Rol</label>
          <select
            {...register("role", { required: "Rol gerekli" })}
            className="w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="volunteer">Gönüllü</option>
            <option value="org">Kurum</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-indigo-600 text-white px-4 py-2 font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
}