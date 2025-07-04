
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
}

interface EditBookDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookUpdated: (book: Book) => void;
}

const EditBookDialog = ({ book, open, onOpenChange, onBookUpdated }: EditBookDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price.toString(),
        stock: book.stock.toString()
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.category || !formData.price || !formData.stock) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive"
      });
      return;
    }

    if (book) {
      const updatedBook = {
        ...book,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock)
      };

      onBookUpdated(updatedBook);
      onOpenChange(false);
      
      toast({
        title: "Berhasil",
        description: "Data buku berhasil diperbarui"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Buku</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Judul Buku</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Masukkan judul buku"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-author">Penulis</Label>
            <Input
              id="edit-author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Masukkan nama penulis"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Kategori</Label>
            <select
              id="edit-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih kategori</option>
              <option value="Fiction">Fiction</option>
              <option value="Technology">Technology</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
              <option value="Biography">Biography</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-price">Harga (IDR)</Label>
            <Input
              id="edit-price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Masukkan harga buku"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-stock">Stok</Label>
            <Input
              id="edit-stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="Masukkan jumlah stok"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
