import { createPost } from "./create.js";

const TEST_ITEM = {
  title: "testTitle",
  body: "Test Body",
  media: "mediaURL",
  tags: "tagTest",
};

/**
 * A mock fetch function that fetches successfully
 * @returns {Promise<object>} A promise that resolves to the test item
 * @example
 * global.fetch = jest.fn(() => fetchSuccess())
 */
function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_ITEM),
  });
}

/**
 * A mock fetch function that fetches unsuccessfully
 * @param {number} status The status code to return
 * @param {string} statusText The status text to return
 * @returns {Promise<object>} A promise that resolves to the test item
 * @example
 * global.fetch = jest.fn(() => fetchFailure(500, "Internal Server Error"))
 */
function fetchFailure(status = 404, statusText = "Error") {
  return Promise.resolve({
    ok: false,
    status,
    statusText,
  });
}

describe("createPost", () => {
  it("Returns a valid item object when new post is created", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const item = await createPost();
    expect(item).toEqual(TEST_ITEM);
  });

  it("Should throw an error if fetch faild", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(createPost()).rejects.toThrow(Error);
  });
});
