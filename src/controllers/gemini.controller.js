const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai')
const ApiKey = 'AIzaSyAPB87x4QC_0lxUVO6HzCLd7OFCIYXDERk'
const generativeAI = new GoogleGenerativeAI(ApiKey)


exports.sendResponse = catchAsync(async (req, res, next) => {
    try {

        const { history, message } = req.body


        if (!history && message) {
            return next(new AppError("Please provide history and message", 400))
        }

        const model = generativeAI.getGenerativeModel({  model: "gemini-1.5-flash",
        systemInstruction:"your name is Israel and your are a medical doctor that answers only medical related questions."})

        const chat = model.startChat({
            History: history,
        })

        const msg = message

        const result = await chat.sendMessage(msg)

        const response = await result.response;

        const text = response.text()

        res.status(200).json(text)
    } catch (error) {

        return next(new AppError(error.message, 500))

    }
})

