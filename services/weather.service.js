'use strict';

const axios = require('axios');
const { MoleculerError } = require('moleculer/src/errors');

module.exports = {
	name: 'weather',

	actions: {

		/**
		 * Get current temperature in a city
		 *
		 * @param {String} city - City name
		 */
		temperature: {
			params: {
				city: 'string',
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return await this.getTemperature(ctx.params.city);
			},
		},

		/**
		 * Get the difference in the current temperature of two cities
		 *
		 * @param {String} cityA - First city name
		 * @param {String} cityB - Second city name
		 */
		temperatureDiff: {
			rest: '/temperature/diff',
			params: {
				cityA: 'string',
				cityB: 'string',
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const payload = await this.getTemperatureDiff(ctx.params.cityA, ctx.params.cityB);
				return payload;
			},
		},

	},

	methods: {

		async getWeatherData(city) {
			const url = 'http://api.openweathermap.org/data/2.5/weather';
			return new this.Promise(function (resolve, reject) {
				axios
					.get(url, {
						params: {
							q: city,
							units: 'metric',
							appid: process.env.OPEN_WEATHER_API_KEY,
						},
					})
					.then(function (response) {
						return resolve(response.data);
					})
					.catch(function (error) {
						return reject(new MoleculerError(`${city}: ${error.response.data.message}`, error.response.status));
					});
			});
		},

		async getTemperature(city) {
			const { code, message: errorMessage, main } = await this.getWeatherData(city);

			const temperature = main && main.temp;
			const message = temperature ? `The current temperature in ${city} is ${temperature}°C` : errorMessage;
			const nodeID = this.broker.nodeID;

			return { temperature, message, code, nodeID };
		},

		async getTemperatureDiff(cityA, cityB) {
			if (cityA.toLowerCase() === cityB.toLowerCase()) {
				throw new MoleculerError('The cities should be different', 400);
			}

			const { temperature: temperatureA } = await this.getTemperature(cityA);
			const { temperature: temperatureB } = await this.getTemperature(cityB);

			const rawDiff = temperatureA - temperatureB;
			const diff = Math.abs(parseFloat(rawDiff).toFixed(2));
			const nodeID = this.broker.nodeID;
			let message;
			let warmerCity;
			let coolerCity;

			if (rawDiff === 0) {
				message = `The temperature in ${cityA} and ${cityB} is equal (${temperatureA}°C).`;
			} else {
				warmerCity = rawDiff > 0 ? cityA : cityB;
				coolerCity = rawDiff < 0 ? cityA : cityB;
				message = `${warmerCity} is warmer then ${coolerCity} by ${diff}°C.`;
			}

			return { diff, message, warmerCity, coolerCity, nodeID };
		},

	},

};
