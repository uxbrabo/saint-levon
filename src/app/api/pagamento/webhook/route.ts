import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/pagamento/webhook
 *
 * Recebe notificações do gateway quando um pagamento é confirmado,
 * cancelado ou expirado. Usar para atualizar status do pedido no banco
 * e disparar e-mail de confirmação.
 *
 * TODO por gateway:
 *   Mercado Pago → validar x-signature header
 *   Stripe       → validar Stripe-Signature com stripe.webhooks.constructEvent()
 *   PagSeguro    → validar notificationCode via GET na API deles
 *
 * Variável necessária:
 *   WEBHOOK_SECRET=...  (fornecido pelo gateway no painel deles)
 */

export async function POST(req: NextRequest) {
  const gateway = process.env.GATEWAY;

  try {
    const body = await req.json();
    console.log(`[webhook/${gateway}]`, JSON.stringify(body, null, 2));

    // ─── Mercado Pago ───────────────────────────────────────────────
    if (gateway === "mercadopago") {
      // TODO: validar assinatura + buscar pagamento na API do MP
      // const { type, data } = body;
      // if (type === "payment") {
      //   const payment = await mercadopago.payment.get(data.id);
      //   if (payment.status === "approved") {
      //     await confirmarPedido(payment.external_reference);
      //   }
      // }
    }

    // ─── Stripe ─────────────────────────────────────────────────────
    if (gateway === "stripe") {
      // TODO: validar Stripe-Signature
      // const sig = req.headers.get("stripe-signature")!;
      // const event = stripe.webhooks.constructEvent(body, sig, process.env.WEBHOOK_SECRET!);
      // if (event.type === "checkout.session.completed") {
      //   await confirmarPedido(event.data.object.metadata?.orderId);
      // }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[webhook]", err);
    return NextResponse.json({ error: "Webhook error." }, { status: 400 });
  }
}

// GET necessário para verificação inicial do endpoint pelo Mercado Pago
export async function GET() {
  return NextResponse.json({ status: "webhook endpoint active" });
}
