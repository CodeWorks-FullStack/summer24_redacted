
import { CaseFilesController } from "./controllers/CaseFilesController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [CaseFilesController],
    view: 'app/views/AgentsView.html'
  }
])