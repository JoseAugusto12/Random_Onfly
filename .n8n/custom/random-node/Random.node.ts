import type {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
} from 'n8n-workflow';

class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		group: ['transform'],
		version: 1,
		description: 'Gera número randômico usando random.org',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		icon: 'file:random.svg',
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
					},
				],
				default: 'generate',
				description: 'Escolha a operação',
			},
			{
				displayName: 'Mínimo',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'Valor mínimo permitido',
			},
			{
				displayName: 'Máximo',
				name: 'max',
				type: 'number',
				default: 10,
				required: true,
				description: 'Valor máximo permitido',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		const min = this.getNodeParameter('min', 0) as number;
		const max = this.getNodeParameter('max', 0) as number;

		if (min > max) {
			throw new Error('O valor mínimo não pode ser maior que o valor máximo.');
		}

		if (operation === 'generate') {
			const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

			const result = await this.helpers.httpRequest({
				method: 'GET',
				url,
			});

			const randomNumber = parseInt(result as string, 10);

			return [this.helpers.returnJsonArray({ randomNumber })];
		}

		return [this.helpers.returnJsonArray({})];
	}
}

module.exports = { Random };
