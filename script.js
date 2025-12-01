// script.js

document.addEventListener("DOMContentLoaded", function () {
    // ===== 日付ブロック（.date-block）クリック → モーダルを開く =====
    const dateBlocks = document.querySelectorAll(".date-block");

    dateBlocks.forEach((block) => {
        block.addEventListener("click", () => {
            const modalId = block.dataset.modal;   // data-modal="modal2" → "modal2"
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";      // .modal を表示
            }
        });
    });

    // ===== ×ボタンでモーダルを閉じる =====
    const closeButtons = document.querySelectorAll(".modal .close");

    closeButtons.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            const modal = closeBtn.closest(".modal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // ===== 背景（黒い部分）クリックで閉じる =====
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    // ===== 全モーダルにページ送り機能を付与 =====
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        setupModalPagination(modal);
    });
});

/**
 * 1つのモーダル内で、.modal-page を「前へ」「次へ」で切り替える
 * - .modal-page のあるモーダルだけ動く
 * - ボタンやページ番号要素が揃っていない場合はスキップ
 */
function setupModalPagination(modal) {
    const pages = modal.querySelectorAll(".modal-page");
    if (pages.length === 0) return; // ページがないモーダルはスキップ

    const prevBtn = modal.querySelector(".prev-page");
    const nextBtn = modal.querySelector(".next-page");
    const currentPageLabel = modal.querySelector("#currentPage1");
    const totalPageLabel = modal.querySelector("#totalPage1");

    // 必要な部品がないとページ送りは実装されない
    if (!prevBtn || !nextBtn || !currentPageLabel || !totalPageLabel) {
        return;
    }

    let currentIndex = 0; // 0番目（1ページ目）

    // 総ページ数を表示
    totalPageLabel.textContent = pages.length.toString();

    function updatePages() {
        // すべてのページの中から今のページだけ表示
        pages.forEach((page, index) => {
            page.style.display = index === currentIndex ? "block" : "none";
        });

        // ページ番号表示（人間は1から数える）
        currentPageLabel.textContent = (currentIndex + 1).toString();

        // ボタン制御
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === pages.length - 1;
    }

    // 最初の状態
    updatePages();

    // 次へ
    nextBtn.addEventListener("click", () => {
        if (currentIndex < pages.length - 1) {
            currentIndex++;
            updatePages();
        }
    });

    // 前へ
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updatePages();
        }
    });
}

