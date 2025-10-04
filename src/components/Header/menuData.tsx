import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Kami",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Artikel",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Kontak",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Kegiatan",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Event Kajian - Trust Is Lam",
        path: "/trust-islam",
        newTab: true,
      },
      {
        id: 42,
        title: "Kegiatan Lainnya",
        path: "/",
        newTab: false,
      },
    ],
  },
  {
    id: 5,
    title: "Halaman",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog Grid Page",
        path: "/blog",
        newTab: false,
      },
      {
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 46,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;
