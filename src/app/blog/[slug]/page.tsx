import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";
import { posts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado — SAINT LEVON" };
  return {
    title: `${post.titulo} — SAINT LEVON Blog`,
    description: post.resumo,
  };
}

function renderMarkdown(text: string) {
  const lines = text.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-display mt-10 text-2xl font-bold uppercase text-fg">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-display mt-6 text-lg font-bold uppercase text-fg">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="text-body mt-4 font-semibold text-fg">{line.slice(2, -2)}</p>);
    } else if (line.startsWith("- ")) {
      const listItems = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(<li key={i} className="text-body text-secondary">{lines[i].trim().slice(2)}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} className="mt-4 flex flex-col gap-2 pl-4 list-disc list-outside">{listItems}</ul>);
      continue;
    } else if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i].trim().split("|").filter(Boolean).map(c => c.trim());
        if (!cells.every(c => c.match(/^-+$/))) {
          rows.push(cells);
        }
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left">
            <thead><tr>{rows[0]?.map((h, j) => <th key={j} className="text-label px-6 py-4 text-secondary bg-surface">{h}</th>)}</tr></thead>
            <tbody>{rows.slice(1).map((row, r) => <tr key={r} className={r % 2 === 0 ? "" : "bg-surface"}>{row.map((cell, j) => <td key={j} className="text-body px-6 py-4 text-sm text-secondary">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems = [];
      while (i < lines.length && lines[i].trim().match(/^\d+\. /)) {
        listItems.push(<li key={i} className="text-body text-secondary">{lines[i].trim().replace(/^\d+\. /, "")}</li>);
        i++;
      }
      elements.push(<ol key={`ol-${i}`} className="mt-4 flex flex-col gap-2 pl-4 list-decimal list-outside">{listItems}</ol>);
      continue;
    } else {
      elements.push(<p key={i} className="text-body mt-4 text-secondary">{line}</p>);
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.categoria);

  return (
    <main>
      <Section ariaLabel={post.titulo} className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <nav aria-label="Trilha de navegação" className="text-label flex items-center gap-2 text-secondary">
            <Link href="/blog" className="hover:text-fg transition-colors duration-200">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg truncate">{post.categoria}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <span className="text-label text-secondary">{post.categoria} · {post.leitura} de leitura</span>
            <h1 className="font-display mt-3 text-3xl font-black uppercase tracking-tight text-fg md:text-5xl">
              {post.titulo}
            </h1>
            <p className="text-subhead mt-4 text-secondary">{post.subtitulo}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-label text-fg">{post.autor}</span>
              <span className="text-label text-secondary">·</span>
              <time className="text-label text-secondary">
                {new Date(post.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </time>
            </div>
          </div>

          <div className="mt-10 aspect-video max-h-[520px] overflow-hidden rounded-3xl">
            <div className="relative h-full w-full">
              <Image
                src={post.imagem}
                alt={post.imagemAlt}
                fill
                priority
                sizes="(min-width: 1440px) 1200px, 90vw"
                className="object-cover grayscale"
              />
            </div>
          </div>

          <div className="mt-12 max-w-2xl">
            {renderMarkdown(post.conteudo)}
          </div>

          <div className="mt-16 border-t border-line pt-12">
            <p className="text-label text-secondary">Compartilhe</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.titulo} — ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta rounded-full border border-line px-5 py-2.5 text-fg transition-colors hover:border-fg"
              >
                WhatsApp
              </a>
              <a
                href={`https://instagram.com/saintlevon`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta rounded-full border border-line px-5 py-2.5 text-fg transition-colors hover:border-fg"
              >
                @saintlevon
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold uppercase text-fg">Leia também</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group block overflow-hidden rounded-3xl border border-line bg-surface">
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={r.imagem} alt={r.imagemAlt} fill sizes="(min-width: 640px) 45vw, 100vw"
                        className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
                    </div>
                    <div className="p-6">
                      <span className="text-label text-secondary">{r.categoria}</span>
                      <h3 className="font-display mt-2 text-lg font-bold uppercase text-fg group-hover:underline underline-offset-4">
                        {r.titulo}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
