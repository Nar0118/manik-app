"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { canPreviewImageSource } from "@/lib/image-url";
import { formatPrice } from "@/lib/utils";

type Props = {
  initialProducts: Product[];
};

type ProductPayload = Omit<Product, "id" | "slug">;

const emptyForm: ProductPayload = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  price: 0,
  inStock: true,
  isFeatured: false,
};

export function AdminPanel({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductPayload>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [imagePreviewFailed, setImagePreviewFailed] = useState(false);

  const showImagePreview = useMemo(
    () => canPreviewImageSource(form.imageUrl) && !imagePreviewFailed,
    [form.imageUrl, imagePreviewFailed],
  );

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setImagePreviewFailed(false);
  }

  function openEdit(product: Product) {
    setEditingId(product.id);
    setImagePreviewFailed(false);
    setForm({
      title: product.title,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      price: product.price,
      inStock: product.inStock,
      isFeatured: product.isFeatured,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setActionError("");
    setIsSaving(true);

    const endpoint = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";
    const method = editingId ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    setIsSaving(false);

    if (!response.ok) {
      let message = "Save failed";
      try {
        const data = (await response.json()) as { error?: string };
        if (data.error) {
          message = data.error;
        }
      } catch {
        message = `Save failed (${response.status}). Are you logged in?`;
      }
      setActionError(message);
      return;
    }

    const product = (await response.json()) as Product;
    if (editingId) {
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? product : item)),
      );
    } else {
      setProducts((prev) => [product, ...prev]);
      openCreate();
    }
  }

  async function removeProduct(id: string) {
    setActionError("");
    const response = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      setActionError("Delete failed. Refresh and try again.");
      return;
    }
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900">
          {editingId ? "Update product" : "Create product"}
        </h2>
        {actionError ? <p className="mt-2 text-sm text-red-600">{actionError}</p> : null}
        <div className="mt-4 space-y-3 text-sm">
          <input
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <textarea
            required
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Description"
            className="h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            placeholder="Category"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            type="number"
            min={0}
            value={form.price}
            onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
            placeholder="Price"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-600">
              Image URL or data URL (base64)
            </label>
            <input
              required
              value={form.imageUrl}
              onChange={(event) => {
                setImagePreviewFailed(false);
                setForm({ ...form, imageUrl: event.target.value });
              }}
              placeholder="https://… or data:image/jpeg;base64,…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
            />
            {showImagePreview ? (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <p className="border-b border-slate-200 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                  Preview
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imageUrl.trim()}
                  alt=""
                  className="mx-auto max-h-48 w-full object-contain p-2"
                  onError={() => setImagePreviewFailed(true)}
                />
              </div>
            ) : null}
            {form.imageUrl.trim() && !canPreviewImageSource(form.imageUrl) ? (
              <p className="text-xs text-amber-700">
                Enter a valid <code className="rounded bg-amber-100 px-1">https://</code>{" "}
                image link or a{" "}
                <code className="rounded bg-amber-100 px-1">data:image/…;base64,…</code>{" "}
                string to see a preview.
              </p>
            ) : null}
            {imagePreviewFailed && canPreviewImageSource(form.imageUrl) ? (
              <p className="text-xs text-red-600">
                Could not load this image. Check the URL or data string.
              </p>
            ) : null}
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(event) => setForm({ ...form, inStock: event.target.checked })}
            />
            In stock
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })}
            />
            Featured
          </label>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            disabled={isSaving}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-white"
            type="submit"
          >
            {isSaving ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="rounded-lg border border-slate-300 px-4 py-2"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-100">
                <td className="px-4 py-3">{product.title}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => openEdit(product)}
                      className="font-medium text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
