"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="text-3xl tracking-wide text-[#2E3A2E]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            EL MORRO
          </h1>
          <p className="text-sm text-black/50 mt-1">Panel de Administración</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-black/70 block mb-1.5"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              disabled={isPending}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21] disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F36C21] hover:bg-[#e05e15] text-white rounded-xl py-3 font-semibold text-sm transition-colors disabled:opacity-60"
          >
            {isPending ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
