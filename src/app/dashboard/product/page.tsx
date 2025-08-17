"use client"
import { getSubCategory } from "@/redux/actions/category";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useMemo, useState } from "react";
import { JSX } from "react/jsx-runtime";

export default function ProductsPage(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getSubCategory())
  }, [])

  interface Product {
    id: string;
    mainCategory: string;
    subCategory: string;
    productName: string;
    price: number;
    image: string;
    description: string;
  }

  // --- Constants ---
  const LS_KEY = "products:v2"; // bump key because schema changed
  const MAIN_CATEGORIES = ["Electronics", "Apparel", "Home"] as const;
  const SUB_CATEGORIES: Record<(typeof MAIN_CATEGORIES)[number], string[]> = {
    Electronics: ["Laptops", "Mobiles", "Accessories"],
    Apparel: ["T-Shirts", "Jeans", "Shoes"],
    Home: ["Kitchen", "Furniture", "Decor"],
  };

  // --- Utils ---
  function uid() {
    return (
      Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8)
    ).toUpperCase();
  }

  function loadProducts(): Product[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Product[]) : [];
    } catch {
      return [];
    }
  }

  function saveProducts(products: Product[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(products));
  }

  // --- State ---
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [form, setForm] = useState<Omit<Product, "id">>({
    mainCategory: MAIN_CATEGORIES[0],
    subCategory: SUB_CATEGORIES[MAIN_CATEGORIES[0]][0],
    productName: "",
    price: 0,
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<
    "productName_asc" | "productName_desc" | "price_asc" | "price_desc"
  >("productName_asc");
  const [error, setError] = useState<string>("");

  // Persist
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) setProducts(loadProducts());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Derived
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = products.filter((p) =>
      [p.productName, p.mainCategory, p.subCategory, p.description]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    );

    switch (sort) {
      case "productName_asc":
        items = items.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "productName_desc":
        items = items.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "price_asc":
        items = items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price_desc":
        items = items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
    }
    return items;
  }, [products, query, sort]);

  // Handlers
  function resetForm() {
    setForm({
      mainCategory: MAIN_CATEGORIES[0],
      subCategory: SUB_CATEGORIES[MAIN_CATEGORIES[0]][0],
      productName: "",
      price: 0,
      image: "",
      description: "",
    });
    setEditingId(null);
    setError("");
  }

  function validate(): string {
    if (!form.productName.trim()) return "Product name is required";
    if (form.price === undefined || isNaN(Number(form.price)))
      return "Valid price is required";
    if (Number(form.price) < 0) return "Price cannot be negative";
    if (!form.mainCategory) return "Main category is required";
    if (!form.subCategory) return "Sub category is required";
    if (!form.image.trim()) return "Image URL is required";
    return "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { id: editingId, ...form } : p))
      );
    } else {
      const newProduct: Product = { id: uid(), ...form };
      setProducts((prev) => [newProduct, ...prev]);
    }
    resetForm();
  }

  function handleEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      mainCategory: p.mainCategory,
      subCategory: p.subCategory,
      productName: p.productName,
      price: p.price,
      image: p.image,
      description: p.description,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  }

  return (
    <div className="min-h-screen" style={{ background: "#111827" }}>
      <div className="mx-auto max-w-6xl p-6 text-slate-100">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
          <button
            onClick={() => {
              if (!confirm("Clear ALL products? This cannot be undone.")) return;
              setProducts([]);
            }}
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800 active:scale-[.99]"
            title="Clear all products"
          >
            Clear All
          </button>
        </header>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 shadow-sm">
              <div className="border-b border-slate-800 p-4">
                <h2 className="font-semibold">
                  {editingId ? "Edit product" : "Add a product"}
                </h2>
                {error && (
                  <p className="mt-2 rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-200">
                    {error}
                  </p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Main Category</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                    value={form.mainCategory}
                    onChange={(e) => {
                      const mc = e.target.value as (typeof MAIN_CATEGORIES)[number];
                      setForm((f) => ({
                        ...f,
                        mainCategory: mc,
                        subCategory: SUB_CATEGORIES[mc][0],
                      }));
                    }}
                  >
                    {MAIN_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Sub Category</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
                    value={form.subCategory}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, subCategory: e.target.value }))
                    }
                  >
                    {SUB_CATEGORIES[form.mainCategory as keyof typeof SUB_CATEGORIES].map(
                      (sc) => (
                        <option key={sc} value={sc}>
                          {sc}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Product Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                    value={form.productName}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, productName: e.target.value }))
                    }
                    placeholder="e.g., Mechanical Keyboard"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      step="1"
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, price: Number(e.target.value) }))
                      }
                      placeholder="e.g., 49.99"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                      value={form.image}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Optional details"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-900 shadow hover:opacity-90 active:scale-[.99]"
                  >
                    {editingId ? "Save Changes" : "Add Product"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-2xl border border-slate-700 px-4 py-2 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List & Controls */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex-1">
                <input
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="Search by name, category, description..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-400">Sort</label>
                <select
                  className="rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-slate-500"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                >
                  <option value="productName_asc">Name A–Z</option>
                  <option value="productName_desc">Name Z–A</option>
                  <option value="price_asc">Price Low → High</option>
                  <option value="price_desc">Price High → Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.productName}
                        className="h-16 w-16 flex-none rounded-xl object-cover border border-slate-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold leading-tight truncate">{p.productName}</h3>
                      <p className="text-sm text-slate-400 truncate">
                        {p.mainCategory} • {p.subCategory}
                      </p>
                      {p.description && (
                        <p className="mt-2 text-sm text-slate-300 line-clamp-3">{p.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{p.price.toFixed(2)}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="rounded-xl border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="rounded-xl bg-red-600 px-3 py-1.5 text-sm text-white hover:opacity-90"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
                No products yet. Use the form to add one.
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-slate-500">
          <p>Data is stored in your browser (localStorage). Refreshing or navigating away will keep it intact.</p>
        </footer>
      </div>
    </div>
  );
}
