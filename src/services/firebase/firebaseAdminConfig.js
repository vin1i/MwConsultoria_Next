import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Obtém o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Monta o path até o JSON de credenciais
const serviceAccountPath = path.join(
  __dirname,
  "../../../serviceAccountKey/mwconsultoria-e14e4-firebase-adminsdk-mjjla-e759c413f0.json"
);

// Carrega o conteúdo do arquivo JSON
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Inicializa o Firebase Admin com a credencial
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Opcional:  databaseURL: "https://SEU_PROJETO.firebaseio.com"
  });
}

// Exporta uma instância do Firestore para uso
export const dbAdmin = admin.firestore();
