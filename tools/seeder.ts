import { PrismaClient } from "@prisma/client";
import products from "../assets/db/dataset.json";
export interface Product {
	product_id: string,
	name: string,
	main_category: string,
	sub_category: string,
	image: string,
	link: string,
	ratings: string,
	no_of_ratings: string,
	discount_price: string,
	actual_price: string
}

const main = async () => {
	const client = new PrismaClient();
	const productDetails = products as Product[];
	console.log("started populating")
	await client.product.createMany({
		data: productDetails
	});
	console.log("population done")
}


main().catch((e) => {
	console.log("error " + e)
})
