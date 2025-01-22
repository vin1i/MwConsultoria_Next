import React, { useState, useEffect } from "react";
import Link from "next/link";
import { JSDOM } from "jsdom";

// Função para extrair meta tags
const extractMetaTags = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const metaTags = Array.from(document.querySelectorAll("meta")).reduce(
      (tags, meta) => {
        const name =
          meta.getAttribute("name") ||
          meta.getAttribute("property") ||
          meta.getAttribute("itemprop");
        const content = meta.getAttribute("content");

        if (name && content) {
          tags[name] = content;
        }

        return tags;
      },
      {}
    );

    return {
      title:
        document.title || metaTags["og:title"] || metaTags["twitter:title"],
      description:
        metaTags.description ||
        metaTags["og:description"] ||
        metaTags["twitter:description"],
      image:
        metaTags.image || metaTags["og:image"] || metaTags["twitter:image"],
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes da URL:", error);
  }
};

// Componente LinkPreview
const LinkPreview = ({ url }) => {
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchMetaData = async () => {
      const data = await extractMetaTags(url);
      setMetaData(data);
    };

    fetchMetaData();
  }, [url]);

  if (!metaData) {
    return <p>Carregando informações do link...</p>;
  }

  return (
    <Link
      href={url}
      target="_blank"
      className="flex items-center gap-4 p-4 bg-gray-100 border rounded-lg shadow-lg hover:shadow-xl"
    >
      <div className="w-40 h-40 flex-shrink-0">
        <img
          src={metaData.image || "/placeholder.png"}
          alt="Prévia do Link"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold">{metaData.title || "Sem título"}</h3>
        <p className="text-gray-600 line-clamp-3">
          {metaData.description || "Descrição não disponível"}
        </p>
        <span className="text-sm text-gray-400">{url}</span>
      </div>
    </Link>
  );
};

export default LinkPreview;
