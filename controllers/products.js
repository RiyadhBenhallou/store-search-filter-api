import Product from '../models/product.js'

const getAllProductsStatic = async (req, res) => {
  const products =  await Product.find({})
  res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, field, limit, min_price, max_price, page } = req.query
  let { sort } = req.query
  let queryObj = {}
  let fieldStr = ''
  let limitCount;
  if (featured) {
    queryObj.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObj.company = company
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' }
  }
  if (min_price && !isNaN(parseInt(min_price))) {
    queryObj.price = { ...queryObj.price,  $gte: parseInt(min_price) }
  }
  if (max_price && !isNaN(parseInt(max_price))) {
    queryObj.price = { ...queryObj.price, $lte: parseInt(max_price) }
  }
  if (sort) {
    sort = sort.replace(',', ' ')
  } else {
    sort = '-createdAt'
  }
  if (field) {
    fieldStr = field.replace(',', ' ') + ' -_id'
  }
  if (limit) {
    limitCount = limit
  }
  // if(limit && page) {
  //   res.status(400).json({ error: 'You can only use one of limit or page' })
  // }
  if (page) {
    const products = await Product.find(queryObj).sort(sort).select(fieldStr).skip(4 * page - 4).limit(limit ? limit : 4)
    res.status(200).json({ nbHits: products.length, products })
    return;
  }


  
  const products = await Product.find(queryObj).sort(sort).select(fieldStr).limit(limitCount)
  res.status(200).json({ nbHits: products.length, products })
}

export { getAllProductsStatic, getAllProducts }