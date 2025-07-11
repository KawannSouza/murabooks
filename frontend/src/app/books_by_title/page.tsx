'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { BookX, Search } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

export default function BooksByTitle() {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState<any[]>([]);

  const handleSearch = () => {
    if (!title.trim()) return;

    const cleanTitle = title.trim();

    fetch(`http://localhost:5000/api/v1/books/title/${encodeURIComponent(cleanTitle)}`)
      .then(async (res) => {

        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Erro ${res.status}: ${text}`)
        }

        return res.json()
      })
      .then(data => {

        setBooks(data)
      })
      .catch(error => toast.error("Erro ao Pesquisar Livro. Tente Novamente!"))
  }

  return (
    <main className="flex flex-col ml-60 p-4 gap-6">

      <h1 className="text-white bg-blue-600 rounded-md font-bold text-3xl text-center w-70">
        Pesquise um Livro
      </h1>

      <div className="flex items-center gap-4">

        <Input
          placeholder="Digite o nome do título do livro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Button onClick={handleSearch} className='pointer'>
          <Search />
        </Button>
      </div>

      <ul className="grid grid-cols-3 gap-4 mt-8 justify-center">
        {books.length === 0 && (
          <p className="flex gap-2">Livro não Encontrado! <BookX /></p>
        )}
        {books.map((book: any, index) => (

          <li key={`${book.title}-${book.author}-${index}`}>
            
            <Card className="p-4 h-30">
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </main>
  )
}