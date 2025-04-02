import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
	const token = req.headers.authorization || ''.replace(/Bearer\s?/,'')

	if (token){
		try {
			const decoded = jwt.verify(token, process.env.SWT_SECRET)

			req.userId = decoded.id

		} catch (error) {
			return res.json({
				message: 'Нет доступа.',
			})
		}
	} else {
		return res.json({
			message: 'Нет доступа.',
		})
	}
}