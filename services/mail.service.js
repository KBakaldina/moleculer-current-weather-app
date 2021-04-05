'use strict';

const nodemailer = require('nodemailer');

module.exports = {

	name: 'mail',

	methods: {

		// TODO: check why emails are sent but not received
		// TODO: move transporter to settings
		// TODO: add persistence
		async send(to, subject, text) {
			const from = 'Test Moleculer Weather App';
			const testAccount = await nodemailer.createTestAccount();
			const transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: testAccount.user,
					pass: testAccount.pass,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			const info = await transporter.sendMail({ from, to, subject, text });

			this.logger.info(info);
		},

	},

};
