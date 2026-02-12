export function formatMoeda(valor: number, moeda: "BRL" | "USD" | "EUR" = "BRL") {
  const simbolos = { BRL: "R$", USD: "US$", EUR: "€" };
  return `${simbolos[moeda]} ${valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatData(data: string) {
  return new Date(data + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
