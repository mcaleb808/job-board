export const cookiesSetter = (cookieStore, user) => {
  const options = {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: user?.email ? 60 * 60 * 24 : 0,
  };

  cookieStore.set({
    name: "jb_id",
    value: user?.id,
    options,
  });

  cookieStore.set({
    name: "jb_user",
    value: user?.email,
    options,
  });
};

export const cookiesGetter = async (cookieStore) => {
  const idCookie = cookieStore.get("jb_id")?.value || null;
  const userCookie = cookieStore.get("jb_user")?.value || null;

  if (userCookie && userCookie) {
    return { id: idCookie, user: userCookie };
  } else {
    return { id: null, user: null };
  }
};
