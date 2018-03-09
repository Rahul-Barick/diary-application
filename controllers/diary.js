const http_status = require('../helpers/http_status.js');
const models = require('../models');
const config = require('../configs/config.js');
const ObjectID = require('mongodb').ObjectID;
const bluebird = require('bluebird');

module.exports = {
	add_view: ((req, res, next) => {
		let render_data = {};
		render_data.created = req.query.created || null;
		render_data.error_message = req.query.error_message || null;
		res.render('diary_add', render_data);
	}),
	add: ((req, res, next) => {
		let filter = {};
		filter.title = req.body.title;
		filter.description = req.body.description.trim();
		filter.date = req.body.date;
		models.diary.create(filter, function (err, diary) {
			if (err) {
				res.redirect(config[config.env].base_url + 'notes/add?error_message=' + err.message);
			}
			res.redirect(config[config.env].base_url + 'notes/add?created=Note Added Successfully');
		});
	}),
	add_note_view: ((req, res, next) => {
		let render_data = {};
		render_data.created = req.query.created || null;
		render_data.error_message = req.query.error_message || null;
		res.render('notes_add', render_data);
	}),
	list: ((req, res, next) => {
		let render_data = {};
		let filter = {};
		res.render('notes_list', render_data);
	}),
	get_all: ((req, res, next) => {
		let filter = {};
		if (req.body.search.value) {
			try {
				var search_val = JSON.parse(req.body.search.value);
			} catch (e) {
				return new Error(e);
			}

			if (search_val && search_val.title) {
				filter.title = new RegExp(search_val.title, "i");
			}
			if (search_val && search_val.description) {
				filter.description = new RegExp(search_val.description, "i");
			}
			if (search_val && search_val.date) {
				filter.date = new RegExp(search_val.date, "i");
			}
		}

		Promise.all([get_notes_count(filter), search_notes(filter, req.body)])
			.then((values) => {
				var response_json = {
					"draw": req.body.draw,
					"recordsTotal": values[0],
					"recordsFiltered": values[0],
					"data": values[1]
				};
				http_status.OK(res, response_json);
			})
			.catch((e) => {
				http_status.INTERNAL_SERVER_ERROR(res, e);
			})
	})
}

function get_notes_count(filter) {
	return new Promise((resolve, reject) => {
		models.diary.count(filter, ((err, count) => {
			if (err) {
				reject(err)
			}
			resolve(count)
		}))
	})
}

function search_notes(filter, req_body) {
	return new Promise((resolve, reject) => {
		models.diary.search(filter, {}, req_body.start, req_body.length, ((err, notes) => {
			if (err) {
				reject(err)
			}
			resolve(notes)
		}))
	})
}