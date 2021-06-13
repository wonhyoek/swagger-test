import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Low, JSONFileSync } from "lowdb";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


const PORT = process.env.PORT || 5000;


const adapter = new JSONFileSync("db.json");
const db = new Low(adapter);

db.data = { books: [] }

const options = {
	definition: {
        openapi: "3.0.0",
        components: {},
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js", "./swagger/*.yaml"]
};

const specs = swaggerJsDoc(options);



const app = express();

app.db = db

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));