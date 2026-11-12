import { useEffect } from "react";
import { siteConfig } from "../../lib/config.js";

function upsertMeta(attribute, key, content) {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function removeMeta(attribute, key) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default function PageMeta({
  title,
  description,
  path = "/",
  image = "/images/og.png",
  imageAlt = "Asset 13 LTD — Building Better Living, Creating Lasting Value",
  type = "website",
  noindex = false
}) {
  const url = `${siteConfig.siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`;

  useEffect(() => {
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", imageAlt);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertLink("canonical", url);

    if (image === "/images/og.png") {
      upsertMeta("property", "og:image:width", "1200");
      upsertMeta("property", "og:image:height", "630");
    } else {
      removeMeta("property", "og:image:width");
      removeMeta("property", "og:image:height");
    }

    if (noindex) {
      upsertMeta("name", "robots", "noindex");
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, url, image, imageUrl, imageAlt, type, noindex]);

  return null;
}
