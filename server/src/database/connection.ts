import { createConnection } from "typeorm";

createConnection().then(() => console.log('🗃️ Successfully connected to database')) // procura por um arquivo 'ormconfig.json' na raiz pra pegar os dados necessários