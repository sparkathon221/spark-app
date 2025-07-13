import { IPromptRequest } from "@/types/message";
import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
	api: {
		bodyParser: false, // Required to use formidable
	},
};
// Handle POST requests
const padding = (no: string): string => {
	const pad = 5;
	const n = no.length;
	if (n == pad) return no;
	else if (n < pad) {
		const padLength = pad - n;
		return '0'.repeat(padLength) + no;
	}
	else return no.substring(0, 6);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const form = formidable({
		multiples: true,                        // allow multiple files
		uploadDir: './public/uploads',         // where to store files
		keepExtensions: true,                  // preserve .jpg, .png, etc.
	});
	const totalResponse = randomInt(1, 5);
	const product_ids = [];
	for (let i = 0; i < totalResponse; i++) {
		var id = randomInt(99999);
		product_ids.push('P0' + padding(id.toString()));
	}


	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error('Parsing error:', err);
			return res.status(500).json({ error: 'Failed to parse form' });
		}

		console.log('Fields:', fields); // key-value pairs (JSON-like)
		console.log('Files:', files);   // uploaded file(s)

		res.status(200).json({
			totalResponse: totalResponse,
			product_ids: product_ids,
			responseMessage: "here are some recomended products",
			message: 'Upload received',
			fields,
			files,
		});
	});
}
