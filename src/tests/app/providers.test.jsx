import React, { useEffect } from "react";
import { screen, waitFor, render } from "@testing-library/react";
import Providers from "../../app/providers.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../../app/features/auth/authSlice";

function PingAuth() {
  const dispatch = useDispatch();
  const email = useSelector((s) => s.auth.user?.email || "");
  useEffect(() => {
    dispatch(loggedIn({ id: "u1", email: "dispatch@acme.com" }));
  }, [dispatch]);
  return <div data-testid="whoami">{email}</div>;
}

it("provides a working Redux store to children", async () => {
  render(
    <Providers>
      <PingAuth />
    </Providers>
  );

  await waitFor(() =>
    expect(screen.getByTestId("whoami")).toHaveTextContent("dispatch@acme.com")
  );
});
