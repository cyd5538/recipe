export const navItems = [
  { href: "/", text: "홈", authRequired: "all" },
  { href: "/users", dynamic: true, text: "마이 페이지", authRequired: true },
  { href: "/write", text: "글 쓰기", authRequired: true },
  { href: "/login", text: "로그인", authRequired: false },
  { href: "/signup", text: "회원가입", authRequired: false },
  { text: "로그아웃", authRequired: true },
];