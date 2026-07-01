import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/pagamento/status?orderId=SL-123456
 *
 * Consulta o status atual de um pedido.
 * Útil na página de sucesso para confirmar o pagamento antes de exibir a mensagem.
 *
 * TODO: conectar ao banco de dados quando disponível.
 *   Por enquanto retorna "approved" para qualquer orderId válido (simulação).
 */

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "orderId obrigatório." }, { status: 400 });
  }

  // TODO: consultar banco de dados real
  // const order = await db.orders.findUnique({ where: { id: orderId } });
  // return NextResponse.json({ status: order?.status ?? "not_found" });

  return NextResponse.json({
    orderId,
    status: "approved",      // simulated
    simulated: !process.env.GATEWAY,
  });
}
