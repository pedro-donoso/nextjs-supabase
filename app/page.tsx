import Hero from "@/components/hero-section";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-4 px-4 bg-red-800 pt-4 pb-4">
        <h2 className="font-medium text-xl mb-4 text-center text-white">
          Título
        </h2>
        <div className="flex justify-center">
          <div className="p-4 max-w-4xl w-full text-center bg-white rounded-md shadow-md">
            <p className="text-gray-700 text-lg mb-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              laudantium nulla quaerat sed, similique esse doloribus omnis
              accusamus quibusdam error excepturi necessitatibus qui ea ab?
              Velit, dolorem maiores enim, quasi, explicabo nam qui aspernatur
              assumenda temporibus aperiam repellendus officia eius? Accusantium
              libero saepe quod soluta voluptatem, magni iusto labore vel
              reprehenderit id necessitatibus hic voluptates esse non laborum
              cum, provident quae iste sunt est? Repudiandae.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
