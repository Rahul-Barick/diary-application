var HTTPStatus = require('http-status');

module.exports = {
    OK: ((res, data) => {
        res.status(HTTPStatus.OK).json(data);
    }),
    NOT_FOUND: ((res) => {
        res.status(HTTPStatus.NOT_FOUND).json({message: HTTPStatus[404]});
    }),
    INTERNAL_SERVER_ERROR: ((res, data) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(data);
    }),
    BAD_REQUEST:  ((res, data) => {
        res.status(HTTPStatus.BAD_REQUEST).json(data);
    }),
    FORBIDDEN:  ((res, data) => {
        res.status(HTTPStatus.FORBIDDEN).json(data);
    }),
    UNAUTHORIZED:  ((res, data) => {
        res.status(HTTPStatus.UNAUTHORIZED).json(data);
    })
};