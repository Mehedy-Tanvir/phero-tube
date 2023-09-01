const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  console.log(data.data);
  const categories = data.data;
  displayCategory(categories);
};
const displayCategory = (categories) => {
  const tabContainerEl = document.getElementById("tab");
  categories.forEach((category) => {
    const tab = document.createElement("btn");
    tab.classList =
      "tab bg-[#25252526] text-[#252525B3] rounded text-[16px] font-medium";
    tab.innerText = `${category.category}`;
    tab.setAttribute("onclick", "categoryClickHandler(this)");
    tabContainerEl.appendChild(tab);
  });
  tabContainerEl.children[0].classList.remove(
    "bg-[#25252526]",
    "text-[#252525B3]"
  );
  tabContainerEl.children[0].classList.add("bg-[#FF1F3D]", "text-white");
};
const categoryClickHandler = (category) => {
  const tabs = category.parentNode.children;

  for (let tab of tabs) {
    tab.classList.remove("bg-[#FF1F3D]", "text-white");
    tab.classList.add("bg-[#25252526]", "text-[#252525B3]");
  }
  category.classList.remove("bg-[#25252526]", "text-[#252525B3]");
  category.classList.add("bg-[#FF1F3D]", "text-white");
};
loadData();
