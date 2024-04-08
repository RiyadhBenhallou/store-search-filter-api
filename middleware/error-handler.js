const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err.message)
  return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

export default errorHandlerMiddleware