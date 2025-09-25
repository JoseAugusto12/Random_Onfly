"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class Random {
    constructor() {
        this.description = {
            displayName: "Random",
            name: "random",
            group: ["transform"],
            version: 1,
            description: "Gera número aleatório usando random.org",
            defaults: { name: "Random" },
            inputs: ["main"],
            outputs: ["main"],
            icon: "file:random.svg",
            properties: [
                {
                    displayName: "Operation",
                    name: "operation",
                    type: "options",
                    options: [{ name: "True Random Number Generator", value: "generate" }],
                    default: "generate",
                    description: "Selecione a operação desejada",
                },
                {
                    displayName: "Mínimo",
                    name: "min",
                    type: "number",
                    default: 1,
                    description: "Número mínimo permitido",
                    required: true,
                },
                {
                    displayName: "Máximo",
                    name: "max",
                    type: "number",
                    default: 10,
                    description: "Número máximo permitido",
                    required: true,
                },
            ],
        };
    }

    async execute() {
        const operation = this.getNodeParameter("operation", 0);
        const minValue = this.getNodeParameter("min", 0);
        const maxValue = this.getNodeParameter("max", 0);

        if (minValue > maxValue) {
            throw new Error("O valor mínimo não pode ser maior que o valor máximo.");
        }

        if (operation === "generate") {
            const result = await this.helpers.httpRequest({
                method: "GET",
                url: `https://www.random.org/integers/?num=1&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`,
            });

            return [this.helpers.returnJsonArray({ randomNumber: parseInt(result, 10) })];
        }

        return [this.helpers.returnJsonArray({ message: "Nenhuma operação executada" })];
    }
}

module.exports = { Random };
