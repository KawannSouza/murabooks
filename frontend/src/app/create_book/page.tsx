'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast, ToastContainer } from 'react-toastify'

const formatSlug = (text: string) => {
  return text.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function CreateBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [authorBio, setAuthorBio] = useState('')
  const [authors, setAuthors] = useState('')
  const [publisher, setPublisher] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateBook = () => {
    if (!title || !author) {
      setMessage('Título e Autor são obrigatórios')
      return
    }

    const author_slug = formatSlug(author)

    const bookData = {
      title,
      author,
      author_slug,
      author_bio: authorBio,
      authors,
      publisher,
      synopsis,
    }

    fetch('http://localhost:5000/api/v1/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Erro ${res.status}: ${text}`)
        }
        return res.json()
      })
      .then(data => {
        toast.success("Livro adicionado com sucesso!")
        setTitle('')
        setAuthor('')
        setAuthorBio('')
        setAuthors('')
        setPublisher('')
        setSynopsis('')
      })
      .catch(error => toast.error("Erro ao adicionar Livro!"))
  }

  return (
    <main className="flex flex-col ml-60 p-4 gap-6">
      
      <h1 className="text-white bg-blue-600 rounded-md font-bold text-3xl text-center w-70">
        Adicione um Livro
      </h1>

      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <Input
        placeholder="Biografia do Autor"
        value={authorBio}
        onChange={(e) => setAuthorBio(e.target.value)}
      />

      <Input
        placeholder="Outros Autores"
        value={authors}
        onChange={(e) => setAuthors(e.target.value)}
      />

      <Input
        placeholder="Editora"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />

      <Input
        placeholder="Sinopse"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
      />

      <Button onClick={handleCreateBook}>Criar Livro</Button>

      <ToastContainer />
    </main>
  )
}