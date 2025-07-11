import { BookCopy, BookPlus, BookText, Search, UserRoundSearch } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">

            <aside className="fixed inset-y-0 left-0 z-10 w-60 border-r bg-background">

                <div className="flex items-center justify-center px-2 py-5">
                    <BookText className="text-blue-600"/>
                    <span className="font-bold text-2xl text-blue-600">MuraBooks</span>
                </div>

                <nav className="flex flex-col items-start gap-4 px-8 py-5">

                    <Link href="/" className="flex items-center gap-1">
                        <BookCopy className="h-5 w-5"/>
                        <span className="hover:pl-5 duration-300">Livros</span>
                    </Link>

                    <Link href="/books_by_title" className="flex items-center gap-1">
                        <Search className="h-5 w-5"/>
                        <span className="hover:pl-5 duration-300">Buscar Livros</span>
                    </Link>

                    <Link href="/books_by_author" className="flex items-center gap-1">
                        <UserRoundSearch className="h-5 w-5"/>
                        <span className="hover:pl-5 duration-300">Buscar por Autor</span>
                    </Link>

                    <Link href="create_book" className="flex items-center gap-1">
                        <BookPlus className="h-5 w-5"/>
                        <span className="hover:pl-5 duration-300">Adicionar</span>
                    </Link>
                </nav>
            </aside>
        </div>
    )
}