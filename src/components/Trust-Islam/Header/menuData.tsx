import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    path: "/#beranda",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Acara",
    path: "/#tentang",
    newTab: false,
  },
  {
    id: 33,
    title: "Detail Acara",
    path: "/#detail",
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
        path: "/",
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
];
export default menuData;
