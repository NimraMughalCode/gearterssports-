"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/ReduxToolkit/CategoriesSlice";

const CATEGORIES_VIEWED_KEY = "categories-grid-viewed";

export default function CategoriesGrid() {
    const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();


   const { categories, loading, fetched } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
     if (!fetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, fetched]);

  useEffect(() => {
    if (localStorage.getItem(CATEGORIES_VIEWED_KEY) === "true") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          localStorage.setItem(CATEGORIES_VIEWED_KEY, "true");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`bg-black text-white p-6 md:p-16 transition-all duration-1000 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <h1 className="text-center mb-10 text-3xl md:text-4xl font-bold text-white leading-tight">
        Our <span className="text-[#FCA600]">Categories</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => router.push(`/categoryproducts?category=${cat.title}`)}
            className="
              bg-[#111]
              p-6
              rounded-2xl
              w-full
              max-w-[200px]
              flex flex-col
              items-center
              text-center
              shadow-lg
              border border-[#FCA600]/20
              hover:border-[#FCA600]
              hover:shadow-[#FCA600]/40
              hover:scale-[1.05]
              transition
              duration-300
              cursor-pointer
            "
          >
            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-[#FCA600] shadow-md">
              <img src={cat.img_src} alt={cat.title} className="w-full h-full object-cover" />
            </div>

            <p className="mt-4 text-lg sm:text-xl font-semibold">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
