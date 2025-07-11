'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { BookX, Search } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'

  const formatSlug = (text: string) => {
    return text.trim().toLowerCase().replace(/\s+/g, '-')
  }

export default function Books() {
  const [author, setAuthor] = useState('')
  const [books, setBooks] = useState([])

  const handleSearch = () => {
    if (!author) return

    const slug = formatSlug(author)

    fetch(`http://localhost:5000/api/v1/books/author/${encodeURIComponent(slug)}`)
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
      .catch(error => toast.error("Erro ao Buscar Livros!"))
  }

  return (
    <main className="flex flex-col ml-60 p-4 gap-6">

      <h1 className="text-white bg-blue-600 rounded-md font-bold text-3xl text-center w-120">
        Encontre um Livro pelo Autor!
      </h1>

      <div className="flex items-center gap-4">

        <Input
          placeholder="Digite o nome do autor (ex: Yvonne Vera)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Button onClick={handleSearch} className='pointer'>
          <Search />
        </Button>
      </div>

      <ul className="grid grid-cols-3 gap-4 mt-8 justify-center">
        {books.length === 0 && (
          <p className="flex gap-2">Livro não Encontrado! <BookX /></p>
        )}
        {books.map((book: any) => (

          <li key={book.id || `${book.title}-${book.author}`}>

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