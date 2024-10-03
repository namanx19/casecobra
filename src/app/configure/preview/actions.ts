"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("Configuration not found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;

  async function convertINRtoUSD(amountINR: number): Promise<number> {
    const fallbackRate = 1 / 84; // 1 USD = 84 INR
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_KEY}/latest/USD`
      );
      const data = await response.json();

      if (data.result === "success") {
        const inrToUsdRate = 1 / data.conversion_rates.INR;
        return amountINR * inrToUsdRate;
      } else {
        console.warn("Using fallback exchange rate due to API error");
        return amountINR * fallbackRate;
      }
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
      console.warn("Using fallback exchange rate");
      return amountINR * fallbackRate;
    }
  }


  let priceINR = BASE_PRICE;
  if (material === "polycarbonate") {
    priceINR += PRODUCT_PRICES.material.polycarbonate;
  }
  if (finish === "textured") {
    priceINR += PRODUCT_PRICES.finish.textured;
  }

  const priceUSD = await convertINRtoUSD(priceINR);

  let order: Order | undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configId,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: priceINR / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "usd",
      unit_amount: Math.round(priceUSD),
    },
  });

  console.log(user.id);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "IN"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  });

  return { url: stripeSession.url };
};
