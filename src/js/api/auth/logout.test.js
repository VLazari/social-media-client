import { logout } from "./logout.js";
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const TEST_PROFILE = {
  name: "testName",
  email: "email@noroff.no",
  banner: "bannerURL",
  token: "testTocken",
  avatar: "avatarURL",
};

localStorage.setItem("token", JSON.stringify(TEST_PROFILE.token));
localStorage.setItem("profile", JSON.stringify(TEST_PROFILE));

describe("Cleare storage", () => {
  it("Returns null if token was cleared from local storage after logout", () => {
    logout();
    const item = JSON.parse(localStorage.getItem("token"));
    expect(item).toEqual(null);
  });

  it("Returns null if profile was cleared from local storage after logout", () => {
    logout();
    const item = JSON.parse(localStorage.getItem("profile"));
    expect(item).toEqual(null);
  });
});
