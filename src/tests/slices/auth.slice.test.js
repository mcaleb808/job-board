import reducer, {
  authLogin,
  authRegister,
  authLogout,
} from "../../app/features/auth/authSlice";

const initial = { user: null, status: "idle", error: null };

function mockFetchOnce(payload, { status = 200 } = {}) {
  return vi.spyOn(global, "fetch").mockResolvedValueOnce(
    new Response(JSON.stringify(payload), {
      status,
      headers: { "Content-Type": "application/json" },
    })
  );
}

describe("auth slice", () => {
  it("handles login thunk success", async () => {
    mockFetchOnce({ id: "u1", email: "a@b.com" });
    const state = structuredClone(initial);

    // simulate reducer transitions
    let s = reducer(state, { type: authLogin.pending.type });
    expect(s.status).toBe("loading");

    const payload = { id: "u1", email: "a@b.com" };
    s = reducer(s, { type: authLogin.fulfilled.type, payload });
    expect(s.status).toBe("succeeded");
    expect(s.user).toEqual(payload);
  });

  it("handles register thunk error", async () => {
    mockFetchOnce({ message: "Registration failed" }, { status: 400 });
    const s = reducer(initial, {
      type: authRegister.rejected.type,
      error: { message: "Registration failed" },
    });
    expect(s.status).toBe("failed");
    expect(s.error).toBe("Registration failed");
  });

  it("handles logout fulfilled", () => {
    const loggedIn = { user: { id: "u1" }, status: "idle", error: null };
    const s = reducer(loggedIn, { type: authLogout.fulfilled.type });
    expect(s.user).toBe(null);
  });
});
