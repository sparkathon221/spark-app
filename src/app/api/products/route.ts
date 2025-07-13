
// app/api/your-endpoint/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

// Handle GET requests
export async function GET(request: Request) {
	// Example: extract search params
	const { searchParams } = new URL(request.url)
	const ids = searchParams.getAll('id');
	const prisma = new PrismaClient();
	const result = await prisma.product.findMany({
		where: {
			product_id: {
				in: ids
			}
		}
	})
	return NextResponse.json({ products: result })
}
