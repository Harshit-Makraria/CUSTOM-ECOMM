import { Hono } from 'hono';
import { verifyAuth } from '@hono/auth-js';
import { zValidator } from '@hono/zod-validator';
import db from '@/db/prisma';
import { z } from 'zod';

const shiprocketInsertSchema = z.object({
  pickup_postcode: z.string(),
  delivery_postcode: z.string(),
  weight: z.number(),
  declared_value: z.number(),
});

// Helper: Login to Shiprocket
async function srLogin() {
  const loginData = {
    email: "harshitmakraria10@gmail.com",
    password: "Harshit@11",
  };

  try {
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return { status: true, token: data.token };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    return { status: false, message: 'Login failed' };
  }
}

// Helper: Shipping Rate Calculation
async function srShippingRateCalculation(
  pickup_postcode: string,
  delivery_postcode: string,
  weight: number,
  declared_value: number,
) {
  try {
    const { status, token } = await srLogin();

    if (!status) {
      throw new Error('Failed to authenticate with Shiprocket');
    }

    const params = new URLSearchParams({
      pickup_postcode,
      delivery_postcode,
      weight: weight.toString(),
      cod: '1',
      declared_value: declared_value.toString(),
      rate_calculator: '1',
      blocked: '1',
      is_return: '0',
      is_web: '1',
      is_dg: '0',
      only_qc_couriers: '0',
    });

    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Rate Calculation Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return { status: true, message: 'Success', data };
  } catch (error) {
    return { status: false, message: 'Failed to calculate rates', error: (error as Error).message };
  }
}

// Routes

const app = new Hono()
  .get('/shiplogin', async (c) => {
  const data = await srLogin();
  return c.json({ data });
      })
   .get(
  "/shiprocket",
  verifyAuth(),
  
  zValidator("query", z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  })),
  async (c) => {
    const { page, limit } = c.req.valid("query");

    const data = await db.shippingRateCalculation.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { updatedAt: "desc" },
    });

    return c.json({ data });
  }
)
  .delete(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  async (c) => {
    const auth = c.get("authUser");
    const { id } = c.req.valid("param");

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const record = await db.shippingRateCalculation.findUnique({
      where: { id: id },
    });

    if (!record) {
      return c.json({ error: "Not found" }, 404);
    }

    const data = await db.shippingRateCalculation.delete({
      where: { id: id },
    });

    return c.json({ data: { id } });
  }
)
  .get(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  async (c) => {
    const auth = c.get("authUser");
    const { id } = c.req.valid("param");

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db.shippingRateCalculation.findFirst({
      where: { id: id },
    });

    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }

    return c.json({ data });
  }
)
.patch(
  "/:id",
  verifyAuth(),
  zValidator("param", z.object({ id: z.string() })),
  zValidator("json", shiprocketInsertSchema.partial()),
  async (c) => {
    const auth = c.get("authUser");
    const { id } = c.req.valid("param");
    const values = c.req.valid("json");

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const shippingRateCalculation = await db.shippingRateCalculation.findUnique({
      where: { id: id },
    });

    if (!shippingRateCalculation) {
      return c.json({ error: "Not found or Unauthorized" }, 404);
    }

    const data = await db.shippingRateCalculation.update({
      where: { id: id },
      data: { ...values, updatedAt: new Date() },
    });

    if (!data) {
      return c.json({ error: "Not found or Unauthorized" }, 404);
    }

    return c.json({ data });
  }
)
.post(
  "/",
  verifyAuth(),
  zValidator("json", shiprocketInsertSchema),
  async (c) => {
    const auth = c.get("authUser");
    const { pickup_postcode,weight,declared_value,delivery_postcode  } = c.req.valid("json");

    if (!auth.token?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }


    const data = await db.shippingRateCalculation.create({
        data: {
          pickup_postcode,
          weight,
          declared_value,
          delivery_postcode,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    });

    return c.json({ data });
  }
);

export default app;
