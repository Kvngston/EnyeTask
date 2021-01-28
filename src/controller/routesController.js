const httpGot = require('got')

const routes = {

    getRates: async (req, res) => {
        const base = req.query.base;
        const currency = req.query.currency;

        if (!base) return res.status(400).json({status: 'Bad Request', message: 'Base Parameter cannot be null'})
        if (!currency) return res.status(400).json({status: 'Bad Request', message: 'Currency Parameter cannot be null'})


        try {
            const exchangeResponse = await httpGot.get(`https://api.exchangeratesapi.io/latest?base=${base.trim().toUpperCase()}&symbols=${currency.trim().toUpperCase()}`);

            if (!exchangeResponse){
                return res.status(500).json({status: 'Bad Request', message: 'Something went wrong'})
            }

            if (exchangeResponse.statusCode === 400){
                const {error} = exchangeResponse.body
                return res.status(400).json({status: 'Bad Request', message: error})
            }

            const {date, rates} = JSON.parse(exchangeResponse.body);
            return res.json({
                result: {
                    base,
                    date,
                    rates
                }
            });

        }catch (e){
            return res.status(400).json({status: 'Bad Request', message: e.message})
        }

    }

}

module.exports = routes