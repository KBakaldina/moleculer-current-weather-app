/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const app = new Vue({
	el: '#app',

	data() {
		return {
			menu: [
				{ id: 'home', caption: 'Home' },
				{ id: 'weather', caption: 'Current weather service' },
			],

			page: 'home',

			requests: {
				weather: [
					{
						id: 'in', action: 'weather.temperature', rest: '/api/weather/temperature',
						fields: [
							{ field: 'city', label: 'City', type: 'text', paramType: 'param', model: 'cityAName' },
						],
						response: null, status: null, duration: null,
					},
					{
						id: 'diff', action: 'weather.temperatureDiff', rest: '/api/weather/temperature/diff',
						fields: [
							{ field: 'cityA', label: 'City A', type: 'text', paramType: 'param', model: 'cityAName' },
							{ field: 'cityB', label: 'City B', type: 'text', paramType: 'param', model: 'cityBName' },
						],
						response: null, status: null, duration: null,
					},
				],
			},

			fields: {
				cityAName: 'Antananarivo',
				cityBName: 'Moscow',
			},

			services: [],
			actions: {},
		};
	},

	computed: {
		filteredServices() {
			return this.services.filter(svc => !svc.name.startsWith('$'));
		},
	},

	methods: {
		changePage(page) {
			this.page = page;
		},

		humanize(ms) {
			return ms > 1500 ? (ms / 1500).toFixed(2) + ' s' : ms + ' ms';
		},

		getFieldValue(field) {
			return this.fields[field.model];
		},

		setFieldValue(field, newValue) {
			if (field.type == 'number')
				this.fields[field.model] = Number(newValue);
			else
				this.fields[field.model] = newValue;
		},

		getServiceActions(svc) {
			return Object.keys(svc.actions)
				.map(name => this.actions[name])
				.filter(action => !!action);
		},

		getActionParams(action, maxLen) {
			if (action.action && action.action.params) {
				const s = Object.keys(action.action.params).join(', ');
				return s.length > maxLen ? s.substr(0, maxLen) + '…' : s;
			}
			return '-';
		},

		callAction: function (item) {
			const startTime = Date.now();

			let url = item.rest;
			const method = item.method || 'GET';
			let body = null;
			let params = null;
			if (item.fields) {
				body = {};
				params = {};
				item.fields.forEach(field => {
					const value = this.getFieldValue(field);
					if (field.paramType == 'body')
						body[field.field] = value;
					else if (field.paramType == 'param')
						params[field.field] = value;
					else if (field.paramType == 'url')
						url = url.replace(':' + field.field, value);
				});

				if (body && method == 'GET') {
					body = null;
				}
				if (params) {
					url += '?' + new URLSearchParams(params).toString();
				}
			}

			return fetch(url, {
				method,
				body: body ? JSON.stringify(body) : null,
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(function(res) {
				item.status = res.status;
				item.duration = Date.now() - startTime;
				return res.json().then(json => {
					item.response = json;
					if (item.afterResponse)
						return item.afterResponse(json);
				});
			}).catch(function (err) {
				item.status = 'ERR';
				item.duration = Date.now() - startTime;
				item.response = err.message;
			});

		},

		req: function (url, params) {
			return fetch(url, { method: 'GET', body: params ? JSON.stringify(params) : null })
				.then(function(res) {
					return res.json();
				});
		},
	},
});
