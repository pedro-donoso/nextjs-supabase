import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-2 items-center bg-slate-800 pt-2">
      <div className="flex gap-2 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://observatorio.tec.mx/wp-content/uploads/2022/05/votodemocracia.jpeg" // Reemplaza con la URL del logotipo de Supabase
            alt="Supabase Logo"
            className="h-40"
          />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <img
            src="https://institutoeducaccion.org/wp-content/uploads/2023/02/IMG_7007-1.jpg" // Reemplaza con la URL del logotipo de Next.js
            alt="Next.js Logo"
            className="h-40"
          />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Titulo{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Resaltado
        </a>{" "}
        y{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Resaltado
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/50 to-transparent my-2" />
    </div>
  );
}
