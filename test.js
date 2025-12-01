document.addEventListener("DOMContentLoaded", function () {
  // modal1 のページ送り専用
  const modal1 = document.getElementById("modal1");
  if (!modal1) return;

  const pages = modal1.querySelectorAll(".modal-page");
  const prevBtn = modal1.querySelector(".prev-page");
  const nextBtn = modal1.querySelector(".next-page");
  const currentPageLabel = document.getElementById("currentPage1");
  const totalPageLabel = document.getElementById("totalPage1");

  let currentIndex = 0; // 0番目のページからスタート

  // 総ページ数表示
  totalPageLabel.textContent = pages.length.toString();

  function updatePages() {
    pages.forEach((page, i) => {
      page.classList.toggle("active", i === currentIndex);
    });

    currentPageLabel.textContent = (currentIndex + 1).toString();

    // 一番前と一番後ろではボタンを無効化
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === pages.length - 1;
  }

  // 最初の状態
  updatePages();

  // 「次へ」ボタン
  nextBtn.addEventListener("click", function () {
    if (currentIndex < pages.length - 1) {
      currentIndex++;
      updatePages();
    }
  });

  // 「前へ」ボタン
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updatePages();
    }
  });
});

