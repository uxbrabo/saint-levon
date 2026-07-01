import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/pagamento/criar
 *
 * Recebe os dados do pedido e cria uma sessão de pagamento no gateway.
 *
 * TODO: substituir o bloco "SIMULAÇÃO" pelo SDK do gateway escolhido:
 *   - Mercado Pago: import MercadoPagoConfig, Preference from 'mercadopago'
 *   - Stripe:       import Stripe from 'stripe'
 *   - PagSeguro:    import pagseguro from 'pagseguro-sdk' (ou REST direto)
 *
 * Variáveis de ambiente necessárias (.env.local):
 *   GATEWAY=mercadopago | stripe | pagseguro
 *   MP_ACCESS_TOKEN=...          (Mercado Pago)
 *   STRIPE_SECRET_KEY=sk_...     (Stripe)
 *   PAGSEGURO_TOKEN=...          (PagSeguro)
 */

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

export interface CreatePaymentBody {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: "pix" | "credit_card" | "boleto";
}

export async function POST(req: NextRequest) {
  try {
    const body: CreatePaymentBody = await req.json();
    const gateway = process.env.GATEWAY;

    // ─── Gateway não configurado: simula resposta de sucesso ────────────
    // Remove este bloco quando integrar o gateway real.
    if (!gateway) {
      const orderNumber = `SL-${Math.floor(100000 + Math.random() * 900000)}`;
      return NextResponse.json({
        success: true,
        simulated: true,
        orderNumber,
        message: "Pedido simulado — configure GATEWAY no .env para ativar pagamentos reais.",
      });
    }

    // ─── Mercado Pago ────────────────────────────────────────────────────
    if (gateway === "mercadopago") {
      // TODO: descomentar quando instalar: npm install mercadopago
      //
      // import { MercadoPagoConfig, Preference } from "mercadopago";
      // const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
      // const preference = new Preference(client);
      // const result = await preference.create({
      //   body: {
      //     items: body.items.map((i) => ({
      //       id: i.id,
      //       title: i.name,
      //       unit_price: i.price,
      //       quantity: i.quantity,
      //     })),
      //     payer: { name: body.customer.name, email: body.customer.email },
      //     back_urls: {
      //       success: `${process.env.NEXT_PUBLIC_URL}/checkout/sucesso`,
      //       failure: `${process.env.NEXT_PUBLIC_URL}/checkout/falha`,
      //     },
      //     auto_return: "approved",
      //     notification_url: `${process.env.NEXT_PUBLIC_URL}/api/pagamento/webhook`,
      //   },
      // });
      // return NextResponse.json({ success: true, checkoutUrl: result.init_point });
      return NextResponse.json({ error: "Mercado Pago: instale o SDK e descomente o código acima." }, { status: 501 });
    }

    // ─── Stripe ──────────────────────────────────────────────────────────
    if (gateway === "stripe") {
      // TODO: descomentar quando instalar: npm install stripe
      //
      // import Stripe from "stripe";
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card", "pix", "boleto"],
      //   line_items: body.items.map((i) => ({
      //     price_data: {
      //       currency: "brl",
      //       product_data: { name: i.name },
      //       unit_amount: Math.round(i.price * 100),
      //     },
      //     quantity: i.quantity,
      //   })),
      //   mode: "payment",
      //   success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      //   customer_email: body.customer.email,
      // });
      // return NextResponse.json({ success: true, checkoutUrl: session.url });
      return NextResponse.json({ error: "Stripe: instale o SDK e descomente o código acima." }, { status: 501 });
    }

    return NextResponse.json({ error: `Gateway '${gateway}' não suportado.` }, { status: 400 });
  } catch (err) {
    console.error("[pagamento/criar]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
