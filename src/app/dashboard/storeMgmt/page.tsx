"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast-manager"
import Product from "@/model/product"

const mainCategoryOptions = ["Gaming", "Electronics", "Apparel"]
const subCategoryOptions = {
  Gaming: ["Console", "Accessories", "Games"],
  Electronics: ["Phones", "Laptops", "Audio"],
  Apparel: ["T-Shirts", "Hoodies", "Shoes"],
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  const [form, setForm] = useState<Omit<Product, "id" | "price" | "image"> & { price: string; image: string }>({
    mainCategory: "",
    subCategory: "",
    productName: "",
    price: "",
    image: "",
    description: "",
  })

  const { addToast } = useToast()

useEffect(() => {
  try {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  } catch (error) {
    console.error("Failed to load products from localStorage:", error)
    localStorage.removeItem("products") // Clear corrupted data
  }
}, [])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const openDialog = (product?: Product) => {
    if (product) {
      setForm({
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
        productName: product.productName,
        price: product.price.toString(),
        image: product.image,
        description: product.description,
      })
      setEditingProductId(product.id)
    } else {
      setForm({
        mainCategory: "",
        subCategory: "",
        productName: "",
        price: "",
        image: "",
        description: "",
      })
      setEditingProductId(null)
    }
    setDialogOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && /image\/(jpeg|png|webp)/.test(file.type)) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    } else {
      addToast({ type: "error", message: "Please upload a valid image (JPG, PNG, or WEBP)." })
    }
  }

  const handleSave = () => {
    const { mainCategory, subCategory, productName, image, description, price } = form

    if (!mainCategory || !subCategory || !productName.trim() || !image || !description.trim()) {
      addToast({ type: "error", message: "Please fill in all fields." })
      return
    }

    const numericPrice = parseFloat(price)
    if (isNaN(numericPrice)) {
      addToast({ type: "error", message: "Please enter a valid price." })
      return
    }

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId ? { ...p, ...form, price: numericPrice, id: p.id } : p
        )
      )
      addToast({ type: "success", message: "Product updated successfully!" })
    } else {
      const newProduct: Product = {
        ...form,
        id: Date.now().toString(),
        price: numericPrice,
      }
      setProducts((prev) => [newProduct, ...prev])
      addToast({ type: "success", message: "Product added successfully!" })
    }

    setDialogOpen(false)
    setEditingProductId(null)
    setForm({
      mainCategory: "",
      subCategory: "",
      productName: "",
      price: "",
      image: "",
      description: "",
    })
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    addToast({ type: "delete", message: "Product deleted." })
  }

  function handleEdit(id: string): void {
    const product = products.find((p) => p.id === id)
    if (product) {
      openDialog(product)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-white">Product Manager</h1>
        <Button onClick={() => openDialog()}>Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
               <Card key={product.id} className="relative bg-zinc-900 border border-white text-white">
            <div className="absolute top-2 right-2">
              <span className="bg-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                {product.mainCategory}
              </span>
            </div>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {product.subCategory}
                </span>
              </div>
              <p className="text-md font-bold text-yellow-300 mb-1">${product.price}</p>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 p-4">
              <Button variant="outline" className="text-white border-white" onClick={() => handleEdit(product.id)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(product.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-white">{editingProductId ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-white">
            {/* Main Category Dropdown */}
            <select
              value={form.mainCategory}
              onChange={(e) =>
                setForm({ ...form, mainCategory: e.target.value, subCategory: "" })
              }
              className="bg-gray-800 text-white p-2 rounded border border-gray-600"
            >
              <option value="">Select Main Category</option>
              {mainCategoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Sub Category Dropdown */}
            <select
              value={form.subCategory}
              onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
              disabled={!form.mainCategory}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600"
            >
              <option value="">Select Sub Category</option>
              {(subCategoryOptions[form.mainCategory as keyof typeof subCategoryOptions] || []).map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            <Input placeholder="Product Name" value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })} />

            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <Input placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="text-white file:bg-gray-700 file:text-white file:rounded file:px-4 file:py-2 file:border-none"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" className="text-white" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingProductId ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductManager
