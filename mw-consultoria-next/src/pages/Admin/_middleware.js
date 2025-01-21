import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies.token; // Verifica o token de autenticação

  if (!token) {
    // Redireciona para login se não estiver autenticado
    return NextResponse.redirect("/login");
  }

  return NextResponse.next();
}
