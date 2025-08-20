import Image from "next/image";
import NotificationBar from "../notification-bar/page";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  CircleUserRoundIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";

export default function Header() {
  return (
    <>
      <NotificationBar
        text="Ganhe 25% de desconto no seu primeiro pedido."
        link={{
          href: "/produtos",
          text: "Comprar Agora",
        }}
      />
      <header className="flex justify-between items-center py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-32">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={40}
              className="w-25 h-10"
            />
          </Link>
          <ul className="flex items-center gap-4 text-neutral-600">
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/produtos">Produtos</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-8">
          <Input
            className="placeholder:text-neutral-400 text-neutral-500 w-64"
            name="search"
            placeholder="Pesquisar produtos"
            icon={<SearchIcon className="w-4 h-4 text-neutral-400" />}
          />
          <div className="flex items-center gap-4">
            <Link href="/carrinho" className="cursor-pointer">
              <ShoppingCartIcon className="w-6 h-6 text-neutral-600" />
            </Link>
            <Link href="/login">
              <CircleUserRoundIcon className="w-6 h-6 text-neutral-600" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
