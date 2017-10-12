let mockError;
const mockResponse = {
  ok: true,
  get: jest.genMockFunction(),
  toError: jest.genMockFunction(),
  body: { secure_url: 'https://www.image.com' }
};

const Request = {
  post: jest.genMockFunction().mockReturnThis(),
  field: jest.genMockFunction().mockReturnThis(),
  attach: jest.genMockFunction().mockReturnThis(),
  end: jest.genMockFunction().mockImplementation((callback) => {
    callback(mockError, mockResponse);
  }),
};

module.exports = Request;
