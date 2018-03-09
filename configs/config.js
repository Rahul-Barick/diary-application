module.exports = {
    env: process.env.C_ENV || 'development',
    development: {
        base_url: "http://localhost:3000/",
        PORT: 3000,
        mongodb: {
            host: 'localhost',
            port: 27017,
            db: 'Diary',
            connection_options: {
                poolSize: 10
            }
        },
        session_secret: "DIARY",
        api_record_limit: 20        
    }
};