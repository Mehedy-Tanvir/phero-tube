let currentData = [];
let isLoaded = false;
const loadData = async () => {
  loading(isLoaded);
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  displayCategory(categories);
  defaultCardDisplay();
  isLoaded = true;
  loading(isLoaded);
};
const displayCategory = (categories) => {
  const tabContainerEl = document.getElementById("tab");
  categories.forEach((category) => {
    const tab = document.createElement("btn");
    tab.classList =
      "tab bg-[#25252526] text-[#252525B3] rounded text-[16px] font-medium";
    tab.innerText = `${category.category}`;
    tab.setAttribute(
      "onclick",
      `categoryClickHandler(this,${category.category_id})`
    );
    tabContainerEl.appendChild(tab);
  });
  tabContainerEl.children[0].classList.remove(
    "bg-[#25252526]",
    "text-[#252525B3]"
  );
  tabContainerEl.children[0].classList.add("bg-[#FF1F3D]", "text-white");
};
const categoryClickHandler = async (category, id) => {
  isLoaded = false;
  loading(isLoaded);
  const tabs = category.parentNode.children;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await response.json();

  const categoryData = data.data;
  currentData = categoryData;
  displayInCards(categoryData);

  for (let tab of tabs) {
    tab.classList.remove("bg-[#FF1F3D]", "text-white");
    tab.classList.add("bg-[#25252526]", "text-[#252525B3]");
  }
  category.classList.remove("bg-[#25252526]", "text-[#252525B3]");
  category.classList.add("bg-[#FF1F3D]", "text-white");
  isLoaded = true;
  loading(isLoaded);
};
const displayInCards = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const noData = document.getElementById("no-data");
  noData.innerHTML = "";
  if (data.length === 0) {
    noData.innerHTML = `<img class="w-[140px] h-[140px]" src="./Icon.png" alt="" srcset="" />
      <h1 class="text-[#171717] text-[32px] font-bold text-center mt-[32px]">
        Oops!! Sorry, There is no content here
      </h1>`;
  }

  data.forEach((item) => {
    let time = item.others.posted_date;
    const div = document.createElement("div");
    div.classList.add("card", "w-[312px]", "justify-self-center");
    div.innerHTML = `
    <figure class="relative">
            <img class="h-[200px] w-[312px]" src=${
              item.thumbnail
            } alt="Shoes" />
            ${
              time.length > 0
                ? ` <p
            class="text-white bg-[#171717] text-[10px] font-normal py-[4px] px-[5px] rounded absolute bottom-[16px] right-[16px]"
          >
            ${secondConvert(time)}
          </p>`
                : ""
            }
           
          </figure>

          <div class="flex gap-[12px] mt-[20px]">
            <img
              class="w-[40px] h-[40px] rounded-[50%]"
              src=${item.authors[0].profile_picture}
              alt=""
            />

            <div>
              <h2 class="text-[#171717] font-bold text-[16px]">
                ${item.title}
              </h2>
              <div class="flex gap-[9px]">
                <p class="text-[#171717B3] text-[14px] font-normal">
                  ${item.authors[0].profile_name}
                </p>
                
                ${
                  item.authors[0].verified
                    ? '<img src="./blue-tick.svg" alt="" />'
                    : ""
                }
              </div>
             
            <p class="text-[#171717B3] text-[14px] font-normal">${
              item.others.views
            } views</p>
            </div>
          </div>`;
    cardContainer.appendChild(div);
  });
};
const defaultCardDisplay = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/1000`
  );
  const data = await response.json();
  currentData = data.data;

  displayInCards(data.data);
};
const secondConvert = (second) => {
  const years = Math.floor(second / (24 * 3600 * 365.25));
  const days = Math.floor((second % (24 * 3600 * 365.25)) / (24 * 3600));
  const hours = Math.floor((second % (24 * 3600)) / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const remainingSeconds = second % 60;

  return `${years ? `${years} ${years > 1 ? "years" : "year"}` : ""} ${
    days ? `${days} ${days > 1 ? "days" : "day"}` : ""
  } ${hours ? `${hours} ${hours > 1 ? "hrs" : "hr"}` : ""} ${
    minutes ? `${minutes} ${minutes > 1 ? "mins" : "min"}` : ""
  }  ${second ? "ago" : ""}`;
};

const sortHandler = () => {
  currentData.sort(
    (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
  );
  displayInCards(currentData);
};

const loading = (isLoaded) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoaded) {
    loadingSpinner.classList.add("hidden");
  } else {
    loadingSpinner.classList.remove("hidden");
  }
};

loadData();
