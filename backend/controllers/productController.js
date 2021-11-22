const Product = require("../models/Product");
const sendResponse = require("../utils/sendResponse");
const ErrorHandler = require("../utils/errorHandler");
const productController = {};
const catchAsync = require("../middlewares/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- Admin
productController.createProduct = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  return sendResponse(res, 200, true, product, false, "Successfully create product");
});

// Get All Product
productController.getAllProducts = catchAsync(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  return sendResponse(
    res,
    200,
    true,
    { products, productCount },
    false,
    "Successfully get all products"
  );
});

// Get Product DetailsButtonText
productController.getProductDetails = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found", 404));
  }

  return sendResponse(
    res,
    200,
    true,
    product,
    false,
    "Successfully get single product"
  );
});

// Update Product - Admin
productController.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidation: true,
    useFindAndModify: false,
  });
  return sendResponse(
    res,
    200,
    true,
    product,
    false,
    "Successfully update product by Id"
  );
});

// Delete Products
productController.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found", 404));
  }
  await product.remove();
  return sendResponse(
    res,
    200,
    true,
    null,
    false,
    "Successfully delete product from the DB"
  );
});

// Create New Review or Update reviews
productController.createReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user?._id,
    name: req.user?.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = await product.reviews.find(
    (rev) => rev.user?.toString() === req.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user?.toString() === req.user?._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  // await product.save({ validateBeforeSave: false });
  await Product.findByIdAndUpdate(req.body.productId, product, {
    new: true,
    runValidators: false,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews
productController.getProductReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  console.log(req.query);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Reviews
productController.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = productController;
