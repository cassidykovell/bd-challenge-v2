import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../../shopify.server";
import db from "../../db.server"; // Import your database

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { productId } = params;
  const reviews = await db.review.findMany({ where: { productId } }); // Fetch reviews for the product
  return { reviews };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { productId } = params;
  const formData = new URLSearchParams(await request.text());
  const review = formData.get("review");
  const rating = parseInt(formData.get("rating") || "0", 10);

  await db.review.create({
    data: {
      productId,
      review,
      rating,
    },
  });

  return new Response(null, { status: 201 }); 
};
