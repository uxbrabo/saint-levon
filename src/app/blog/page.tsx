import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — SAINT LEVON",
  description: "Surf, streetwear, praia e lifestyle. Conteúdo real de quem vive no meio disso tudo.",
};


function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const [destaque, ...resto] = posts;

  return (
    <main>
      <Section ariaLabel="Blog SAINT LEVON" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">Conteúdo</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
              Blog
            </h1>
            <p className="text-body mt-4 text-secondary">
              Surf, streetwear e praia — contado por quem vive, não por quem observa.
            </p>
          </div>

          <Link href={`/blog/${destaque.slug}`} className="group mt-12 block">
            <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden lg:aspect-auto">
                <Image
                  src={destaque.imagem}
                  alt={destaque.imagemAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="text-label text-secondary">{destaque.categoria} · {destaque.leitura} de leitura</span>
                <h2 className="font-display mt-3 text-2xl font-black uppercase text-fg md:text-3xl group-hover:underline underline-offset-4">
                  {destaque.titulo}
                </h2>
                <p className="text-body mt-4 text-secondary">{destaque.resumo}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-label text-fg">{destaque.autor}</span>
                  <span className="text-label text-secondary">·</span>
                  <time className="text-label text-secondary">{formatDate(destaque.data)}</time>
                </div>
              </div>
            </div>
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resto.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-3xl border border-line bg-surface">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.imagem}
                      alt={post.imagemAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-label text-secondary">{post.categoria} · {post.leitura}</span>
                    <h2 className="font-display mt-2 text-lg font-bold uppercase text-fg group-hover:underline underline-offset-4">
                      {post.titulo}
                    </h2>
                    <p className="text-body mt-2 text-sm text-secondary line-clamp-2">{post.resumo}</p>
                    <time className="text-label mt-4 block text-secondary">{formatDate(post.data)}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold uppercase text-fg">Novidades na sua caixa</h2>
                <p className="text-body mt-2 text-secondary">Posts novos, lançamentos e drops exclusivos. Sem spam.</p>
              </div>
              <a
                href="https://wa.me/5581989056181?text=Quero receber as novidades da SAINT LEVON"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta shrink-0 rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
              >
                Receber novidades
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
