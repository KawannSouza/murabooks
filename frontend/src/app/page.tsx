'use client'

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react"

export default function Home() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Erro ao buscar livros:", error))
  }, [])

  return (
    <main className="ml-60 p-6">

      <h1 className="text-white bg-blue-600 rounded-md w-50 font-bold text-3xl text-center">
        Biblioteca
      </h1>

      <ul className="grid grid-cols-3 gap-4 mt-8">
        {books.map((book: any) => (

          <li key={book.id}>

            <Card className="p-4 h-30">
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}