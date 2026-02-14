import { AppRouter } from "./AppRouter.js";

export class App {
    constructor(root){
        this.root = root;
    }

    start(){
        this.router = new AppRouter(this.root);
        this.router.loadFormulario();
    }
}
